/**
 * item.monster 미리보기 서버
 * 포트: 3000
 * 
 * 실행: node preview_server.js
 * 접속: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'dev.db');
const IMAGES_DIR = path.join(__dirname, 'images');

let db;
try {
  const Database = require('better-sqlite3');
  db = new Database(DB_PATH);
} catch(e) {
  console.error('❌ DB 로드 실패:', e.message);
}

function getLatestPost() {
  if (!db) return null;
  try {
    return db.prepare('SELECT * FROM posts ORDER BY createdAt DESC LIMIT 1').get();
  } catch(e) {
    return null;
  }
}

function getAllPosts() {
  if (!db) return [];
  try {
    return db.prepare('SELECT id, title, category, createdAt, imageUrl FROM posts ORDER BY createdAt DESC LIMIT 20').all();
  } catch(e) {
    return [];
  }
}

function getPostById(id) {
  if (!db) return null;
  try {
    return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  } catch(e) {
    return null;
  }
}

function markdownToHtml(text) {
  if (!text) return '';
  return text
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.)/m, '<p>$1')
    + '</p>';
}

const server = http.createServer((req, res) => {
  // 이미지 파일 서빙
  if (req.url.startsWith('/images/')) {
    const filename = req.url.replace('/images/', '');
    const filepath = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(filepath)) {
      const ext = path.extname(filename).toLowerCase();
      const mimeTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'image/jpeg' });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  // 특정 포스팅 보기
  if (req.url.startsWith('/post/')) {
    const id = decodeURIComponent(req.url.replace('/post/', ''));
    const post = getPostById(id);
    if (!post) {
      res.writeHead(404);
      res.end('포스팅을 찾을 수 없습니다.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderPostPage(post));
    return;
  }

  // 메인 페이지 (목록 + 최신 미리보기)
  if (req.url === '/' || req.url === '') {
    const latest = getLatestPost();
    const allPosts = getAllPosts();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderMainPage(latest, allPosts));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

function renderMainPage(post, allPosts) {
  const listHtml = allPosts.map(p => `
    <a href="/post/${encodeURIComponent(p.id)}" class="post-item ${post && p.id === post.id ? 'active' : ''}">
      ${p.imageUrl ? `<img src="${p.imageUrl}" onerror="this.style.display='none'">` : '<div class="no-img">📦</div>'}
      <div class="post-info">
        <div class="post-title">${p.title || '제목 없음'}</div>
        <div class="post-meta">${p.category || ''} · ${new Date(p.createdAt).toLocaleString('ko-KR')}</div>
      </div>
    </a>
  `).join('');

  const contentHtml = post ? markdownToHtml(post.content) : '<p class="empty">아직 저장된 포스팅이 없습니다.</p>';
  const imgHtml = post && post.imageUrl ? `<img class="thumb" src="${post.imageUrl}" alt="썸네일">` : '';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>item.monster 포스팅 미리보기</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Malgun Gothic', sans-serif; background: #0f0f0f; color: #e0e0e0; display: flex; height: 100vh; overflow: hidden; }
  
  /* 사이드바 */
  .sidebar { width: 320px; background: #1a1a1a; border-right: 1px solid #333; display: flex; flex-direction: column; overflow: hidden; }
  .sidebar-header { padding: 20px; background: #111; border-bottom: 1px solid #333; }
  .sidebar-header h1 { font-size: 16px; color: #ff6b35; }
  .sidebar-header p { font-size: 12px; color: #888; margin-top: 4px; }
  .post-list { overflow-y: auto; flex: 1; }
  .post-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid #222; text-decoration: none; color: #e0e0e0; cursor: pointer; transition: background 0.2s; }
  .post-item:hover, .post-item.active { background: #252525; }
  .post-item img, .post-item .no-img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #333; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .post-title { font-size: 13px; font-weight: 600; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .post-meta { font-size: 11px; color: #666; margin-top: 4px; }
  
  /* 메인 콘텐츠 */
  .main { flex: 1; overflow-y: auto; padding: 40px; }
  .preview-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #333; }
  .preview-badge { background: #ff6b35; color: white; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
  .preview-title { font-size: 26px; font-weight: 700; line-height: 1.3; color: #fff; }
  .thumb { max-width: 100%; max-height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 28px; }
  
  .content { max-width: 780px; line-height: 1.9; font-size: 15px; color: #ccc; }
  .content h1 { font-size: 22px; color: #fff; margin: 28px 0 12px; }
  .content h2 { font-size: 18px; color: #fff; margin: 24px 0 10px; padding-left: 12px; border-left: 3px solid #ff6b35; }
  .content h3 { font-size: 15px; color: #ddd; margin: 18px 0 8px; }
  .content p { margin: 12px 0; }
  .content a { color: #ff6b35; text-decoration: none; font-weight: 600; }
  .content a:hover { text-decoration: underline; }
  .content strong { color: #fff; }
  iframe { max-width: 100%; border-radius: 8px; margin: 16px 0; }

  .status-bar { position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; border-top: 1px solid #333; padding: 10px 24px; font-size: 12px; color: #888; display: flex; justify-content: space-between; }
  .status-ok { color: #4ade80; }
  .empty { color: #555; text-align: center; padding: 60px 0; font-size: 18px; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-header">
    <h1>🛒 item.monster</h1>
    <p>포스팅 미리보기 · 최근 20개</p>
  </div>
  <div class="post-list">${listHtml || '<div style="padding:20px;color:#555;font-size:13px">저장된 포스팅 없음</div>'}</div>
</div>
<div class="main">
  ${post ? `
  <div class="preview-header">
    <span class="preview-badge">DRAFT 미리보기</span>
    <h2 class="preview-title">${post.title || '제목 없음'}</h2>
  </div>
  ${imgHtml}
  <div class="content">${contentHtml}</div>
  ` : '<div class="empty">📭 저장된 포스팅이 없습니다</div>'}
</div>
<div class="status-bar">
  <span>🟢 <span class="status-ok">미리보기 서버 실행 중</span> · http://localhost:3000</span>
  <span>마지막 갱신: ${new Date().toLocaleString('ko-KR')} · <a href="/" style="color:#666">새로고침</a></span>
</div>
<script>
  // 30초마다 자동 새로고침
  setTimeout(() => location.reload(), 30000);
</script>
</body>
</html>`;
}

function renderPostPage(post) {
  const contentHtml = markdownToHtml(post.content);
  const imgHtml = post.imageUrl ? `<img class="thumb" src="${post.imageUrl}" alt="썸네일">` : '';
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>${post.title} - 미리보기</title>
<style>
  body { font-family: 'Malgun Gothic', sans-serif; background: #0f0f0f; color: #ccc; max-width: 820px; margin: 0 auto; padding: 40px 20px 80px; }
  h1 { color: #fff; font-size: 26px; margin-bottom: 20px; }
  .thumb { max-width: 100%; max-height: 320px; object-fit: cover; border-radius: 12px; margin-bottom: 28px; }
  .content h2 { color: #fff; font-size: 18px; margin: 24px 0 10px; padding-left: 12px; border-left: 3px solid #ff6b35; }
  .content h3 { color: #ddd; font-size: 15px; margin: 18px 0 8px; }
  .content p { margin: 12px 0; line-height: 1.9; }
  .content a { color: #ff6b35; font-weight: 600; }
  .back { color: #666; text-decoration: none; font-size: 13px; display: inline-block; margin-bottom: 24px; }
  .back:hover { color: #ff6b35; }
</style>
</head>
<body>
  <a class="back" href="/">← 목록으로</a>
  <h1>${post.title || '제목 없음'}</h1>
  ${imgHtml}
  <div class="content">${contentHtml}</div>
</body>
</html>`;
}

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   item.monster 미리보기 서버 실행 중!            ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  주소: http://localhost:${PORT}                      ║`);
  console.log('║                                                  ║');
  console.log('║  / → 최신 포스팅 미리보기 + 목록                ║');
  console.log('║  30초마다 자동 새로고침                          ║');
  console.log('║                                                  ║');
  console.log('║  ⚠️ 이 창 닫으면 미리보기가 안됩니다!           ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
});
