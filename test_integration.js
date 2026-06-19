const db = require('./db_v2');
const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost', port: 3333, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(dataStr) }
    }, res => {
      let body = ''; res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject); req.write(dataStr); req.end();
  });
}

(async () => {
  console.log('=== 통합 테스트 (텔레그램 시뮬레이션) ===');
  try {
    // 1. "새글" 전송
    console.log('\n[유저] "새글 https://link.coupang.com/test" 전송');
    const cRes = await post('/post/create', { category: '생활용품', coupangLink: 'https://link.coupang.com/test' });
    const postId = cRes.postId;
    console.log(`[시스템] ${postId} 생성 완료. (상태: ${cRes.status})`);

    // 2. n8n 글쓰기 완료
    console.log('\n[n8n] 글쓰기 완료 후 저장');
    await post('/post/save', {
      postId,
      title: '테스트 브랜드 상품',
      summary: '테스트 요약',
      intro: '도입부입니다.',
      outro: '마무리입니다.',
      thumbnail: '',
      sections: [
        { sectionOrder: 1, image: '', imageAlt: '공식 이미지1', text: '공식 설명1', qualityScore: 100 },
        { sectionOrder: 2, image: '', imageAlt: '공식 이미지2', text: '공식 설명2', qualityScore: 100 }
      ]
    });
    console.log(`[시스템] 저장 완료. 상태를 REVIEW로 업데이트`);
    await post('/post/update-status', { postId, status: 'REVIEW' });

    // 3. "제목 수정"
    console.log('\n[유저] "제목 수정" -> "진짜 테스트 상품" 전송');
    await post('/post/update-block', { postId, block: 'title', value: '진짜 테스트 상품' });
    console.log('[시스템] 제목 수정 완료. (블록 단위 수정 작동 확인)');

    // 4. DB 검증
    const p = await db.post.get(postId);
    console.log('\n[DB 결과]');
    console.log(`- 제목: ${p.title}`);
    console.log(`- 상태: ${p.status}`);
    console.log(`- 블록 수: ${p.sections.length}개`);
    console.log(`- 버전: ${p.version}`);

    console.log('\n=== 통합 테스트 성공 ===');
    process.exit(0);
  } catch (e) {
    console.error('테스트 실패:', e.message);
    process.exit(1);
  }
})();
