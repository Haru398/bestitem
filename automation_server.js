const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const db = require('./db_v2');

const PORT = process.env.AUTOMATION_SERVER_PORT || 3333;

function getPostData(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } 
      catch (e) { reject(new Error('Invalid JSON')); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  };

  try {
    if (req.method === 'GET' && pathname === '/health') return sendJson(200, { status: 'OK', v2: true });

    if (req.method === 'GET' && pathname === '/post/get') {
      const p = await db.post.get(parsedUrl.query.postId);
      if (!p) return sendJson(404, { error: 'Post 없음' });
      return sendJson(200, { success: true, post: p });
    }

    if (req.method === 'GET' && pathname === '/session/get') {
      const userId = parsedUrl.query.userId || '1';
      const s = await db.session.get(userId);
      return sendJson(200, { success: true, session: s });
    }

    // 텔레그램 중복 메시지 방지용 State 조회
    if (req.method === 'GET' && pathname === '/telegram/state') {
      const stmt = db.db.prepare('SELECT lastProcessedUpdateId FROM telegram_state WHERE id = 1');
      let state = stmt.get();
      if (!state) {
        db.db.prepare('INSERT INTO telegram_state (id, lastProcessedUpdateId, updatedAt) VALUES (1, 0, CURRENT_TIMESTAMP)').run();
        state = { lastProcessedUpdateId: 0 };
      }
      return sendJson(200, { success: true, offset: state.lastProcessedUpdateId + 1 });
    }

    if (req.method !== 'POST') return sendJson(405, { error: 'Method Not Allowed' });

    const data = await getPostData(req);

    // 텔레그램 State 업데이트
    if (pathname === '/telegram/state') {
      db.db.prepare('UPDATE telegram_state SET lastProcessedUpdateId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = 1').run(data.updateId);
      return sendJson(200, { success: true });
    }

    if (pathname === '/session/update') {
      const userId = data.userId || '1';
      await db.session.setCurrentPost(userId, data.postId, data.status || 'reviewing');
      return sendJson(200, { success: true, currentPostId: data.postId });
    }

    if (pathname === '/post/create') {
      const p = await db.post.create(data);
      const userId = data.userId || '1';
      await db.session.setCurrentPost(userId, p.postId, 'creating');
      return sendJson(200, { success: true, postId: p.postId, status: p.status });
    }

    if (pathname === '/post/save') {
      await db.post.save(data.postId, data);
      return sendJson(200, { success: true, postId: data.postId });
    }

    if (pathname === '/post/update-block') {
      const { postId, block, value, sectionOrder, userId = '1' } = data;
      const locked = await db.lock.acquire(postId, userId);
      if (!locked) return sendJson(423, { error: '다른 유저 또는 프로세스가 수정 중입니다.' });
      
      await db.post.setStatus(postId, 'EDITING');

      if (['title', 'summary', 'intro', 'outro', 'thumbnail'].includes(block)) {
        await db.post.updateBlock(postId, block, value);
      } else if (block === 'section' && sectionOrder) {
        if (value.text !== undefined && value.image === undefined) await db.section.updateText(postId, sectionOrder, value.text);
        else await db.section.updateFull(postId, sectionOrder, value);
      }

      await db.post.setStatus(postId, 'REVIEW');
      await db.lock.release(postId);
      
      return sendJson(200, { success: true });
    }

    if (pathname === '/post/update-status') {
      const { postId, status, errorInfo, lastFailedStatus } = data;
      if (status === 'ERROR') {
        await db.post.setError(postId, lastFailedStatus || 'WRITING', errorInfo || '');
      } else if (status === 'RETRY') {
        await db.post.clearError(postId);
      } else {
        await db.post.setStatus(postId, status);
      }
      return sendJson(200, { success: true });
    }

    if (pathname === '/post/version/restore') {
      await db.version.restore(data.postId, Number(data.version));
      return sendJson(200, { success: true });
    }

    if (pathname === '/deploy') {
      if (data.postId) {
        await db.post.setStatus(data.postId, 'DEPLOYING');
      }
      // 실제 배포 스크립트 실행
      return new Promise((resolve) => {
        exec('node auto_deploy.js', { cwd: process.cwd() }, async (error, stdout) => {
          if (error) {
            if (data.postId) await db.post.setError(data.postId, 'DEPLOYING', error.message);
            return resolve(sendJson(500, { success: false, error: error.message }));
          }
          if (data.postId) await db.post.setStatus(data.postId, 'PUBLISHED');
          resolve(sendJson(200, { success: true, stdout }));
        });
      });
    }

    return sendJson(404, { error: 'Not Found' });
  } catch (err) {
    console.error('API Error:', err.message);
    return sendJson(500, { success: false, error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`V2 Automation API Server running on port ${PORT}`);
});
