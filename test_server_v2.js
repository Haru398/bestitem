const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 3333,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataStr)
      }
    };
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3333${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log('=== Automation Server V2 Test ===');

  try {
    const health = await get('/health');
    console.log('[1] /health :', health.data);

    const create = await post('/post/create', { category: '테스트카테고리' });
    console.log('[2] /post/create :', create.data);
    const postId = create.data.postId;

    const save = await post('/post/save', {
      postId: postId,
      title: '서버 연동 테스트 제목',
      summary: '요약',
      intro: '도입',
      outro: '마무리',
      thumbnail: '',
      sections: [
        { sectionOrder: 1, image: '', imageAlt: '', text: '섹션1', qualityScore: 100 }
      ]
    });
    console.log('[3] /post/save :', save.data);

    const getPost = await get(`/post/get?postId=${postId}`);
    console.log('[4] /post/get :', getPost.data.post.title);

    const updateBlock = await post('/post/update-block', {
      postId: postId,
      block: 'title',
      value: '서버 연동 테스트 (수정)'
    });
    console.log('[5] /post/update-block :', updateBlock.data);

    const updateStatus = await post('/post/update-status', {
      postId: postId,
      status: 'REVIEW'
    });
    console.log('[6] /post/update-status :', updateStatus.data);

    const getPost2 = await get(`/post/get?postId=${postId}`);
    console.log('[7] 최종 상태 :', getPost2.data.post.status, '/ 제목:', getPost2.data.post.title, '/ 버전:', getPost2.data.post.version);

  } catch(e) {
    console.error('테스트 실패:', e.message);
  }
}

run();
