const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = 'D:\\서버구축폴더\\bestitem';

function run(cmd, opts = {}) {
  console.log('>>> ' + cmd);
  try {
    const result = execSync(cmd, { 
      cwd,
      encoding: 'utf8',
      timeout: 120000,
      ...opts
    });
    if (result?.trim()) console.log(result.trim());
    return result;
  } catch(e) {
    console.error('오류:', e.message);
    throw e;
  }
}

(async () => {
  console.log('=== 자동 배포 시작 ===');

  try {
    // 현재 브랜치 확인
    const branch = run('git rev-parse --abbrev-ref HEAD').trim();
    console.log('현재 브랜치:', branch);

    // main 브랜치에서 작업
    if (branch !== 'main') {
      run('git checkout main');
    }

    // 새 파일들 스테이징
    run('git add images/ -A');
    run('git add dev.db');

    // 변경사항 있는지 확인
    try {
      run('git diff --staged --quiet');
      console.log('변경사항 없음 - 배포 스킵');
      console.log(JSON.stringify({ success: true, message: '변경사항 없음' }));
      process.exit(0);
    } catch(e) {
      // 변경사항 있음 - 계속 진행
    }

    // 커밋
    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    run(`git commit -m "auto-post: ${timestamp}"`);

    // push
    run('git push origin main');

    console.log('✅ 배포 완료!');
    console.log(JSON.stringify({ 
      success: true, 
      message: '배포 완료',
      url: 'https://item.monster',
      timestamp 
    }));

  } catch(e) {
    console.error('❌ 배포 실패:', e.message);
    console.log(JSON.stringify({ success: false, error: e.message }));
    process.exit(1);
  }
})();
