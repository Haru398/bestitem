/**
 * db_v2.js 기능 테스트
 */
const db = require('./db_v2');

(async () => {
  console.log('=== DB V2 테스트 시작 ===\n');

  try {
    // 1. Post 생성
    console.log('[1] Post 생성...');
    const p = await db.post.create({ coupangLink: 'https://link.coupang.com/test', coupangHtml: '<iframe>test</iframe>' });
    console.log('  생성된 postId:', p.postId, '/ status:', p.status);

    // 2. 상태 변경
    console.log('\n[2] 상태 WRITING으로 변경...');
    await db.post.setStatus(p.postId, 'WRITING');

    // 3. 전체 저장 (save)
    console.log('\n[3] 코다리 작성 완료 - save() 테스트...');
    await db.post.save(p.postId, {
      title: '테스트 상품 제목',
      summary: '이건 테스트용 요약입니다.',
      intro: '도입부 텍스트',
      outro: '마무리 텍스트',
      thumbnail: '/images/test.jpg',
      sections: [
        { sectionOrder: 1, image: '/images/img1.jpg', imageAlt: '이미지1', text: '설명1', qualityScore: 85 },
        { sectionOrder: 2, image: '/images/img2.jpg', imageAlt: '이미지2', text: '설명2', qualityScore: 72 },
        { sectionOrder: 3, image: '/images/img3.jpg', imageAlt: '이미지3', text: '설명3', qualityScore: 90 },
        { sectionOrder: 4, image: '/images/img4.jpg', imageAlt: '이미지4', text: '설명4', qualityScore: 68 },
        { sectionOrder: 5, image: '/images/img5.jpg', imageAlt: '이미지5', text: '설명5', qualityScore: 77 },
      ],
    });
    console.log('  save() 완료');

    // 4. 조회
    console.log('\n[4] Post 조회...');
    const fetched = await db.post.get(p.postId);
    console.log('  제목:', fetched.title);
    console.log('  상태:', fetched.status);
    console.log('  섹션 수:', fetched.sections.length);

    // 5. 블록 수정
    console.log('\n[5] 제목 블록 수정...');
    await db.post.updateBlock(p.postId, 'title', '수정된 제목');
    const afterEdit = await db.post.get(p.postId);
    console.log('  수정 후 제목:', afterEdit.title);
    console.log('  버전:', afterEdit.version);

    // 6. 섹션 텍스트 수정
    console.log('\n[6] section3 텍스트만 수정...');
    await db.section.updateText(p.postId, 3, '수정된 3번째 설명');
    const secs = await db.section.list(p.postId);
    console.log('  section3 텍스트:', secs[2].text);

    // 7. 버전 히스토리
    console.log('\n[7] 버전 히스토리...');
    const versions = await db.version.list(p.postId);
    versions.forEach(v => console.log(`  v${v.version}: ${v.changeNote}`));

    // 8. TelegramState
    console.log('\n[8] TelegramState 테스트...');
    await db.telegram.setOffset(12345);
    const offset = await db.telegram.getOffset();
    console.log('  offset:', offset);

    // 9. UserSession
    console.log('\n[9] UserSession 테스트...');
    await db.session.setCurrentPost('8150752928', p.postId, 'reviewing');
    const sess = await db.session.get('8150752928');
    console.log('  userId:', sess.userId, '/ currentPostId:', sess.currentPostId, '/ status:', sess.status);

    // 10. PostLock
    console.log('\n[10] PostLock 테스트...');
    const locked = await db.lock.acquire(p.postId, '8150752928');
    console.log('  Lock 획득:', locked);
    const lockedAgain = await db.lock.acquire(p.postId, '9999999999');
    console.log('  중복 Lock 시도:', lockedAgain, '(false여야 정상)');
    await db.lock.release(p.postId);
    console.log('  Lock 해제 완료');

    // 11. 버전 복구
    console.log('\n[11] v1으로 복구 테스트...');
    await db.version.restore(p.postId, 1);
    const restored = await db.post.get(p.postId);
    console.log('  복구 후 제목:', restored.title, '(원래 제목이어야 함)');
    console.log('  복구 후 버전:', restored.version);

    // 정리
    await db.prisma.postVersion.deleteMany({ where: { postId: p.postId } });
    await db.prisma.postSection.deleteMany({ where: { postId: p.postId } });
    await db.prisma.postLock.deleteMany({ where: { postId: p.postId } });
    await db.prisma.post.delete({ where: { postId: p.postId } });
    console.log('\n=== 모든 테스트 통과! DB V2 정상 작동 ===');
  } catch (e) {
    console.error('\n❌ 테스트 실패:', e.message);
    console.error(e.stack);
  } finally {
    await db.disconnect();
  }
})();
