const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const watchDir = path.join(__dirname, 'ai_jobs');
const triggerFile = path.join(watchDir, 'build.trigger');

if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir);
}

console.log("=========================================");
console.log("🤖 AI 무인 자동화 데몬(Daemon) 실행 중...");
console.log("이제 권한 팝업 없이 백그라운드에서 자동으로 포스팅과 배포가 진행됩니다.");
console.log("이 창을 닫지 마시고 백그라운드에 켜두세요!");
console.log("=========================================\n");

setInterval(() => {
  if (fs.existsSync(triggerFile)) {
    console.log(`[${new Date().toLocaleTimeString()}] AI의 작업 지시가 감지되었습니다! 자동화를 시작합니다...`);
    try {
      // 트리거 파일 삭제
      fs.unlinkSync(triggerFile);
      
      console.log("1. single_post_auto.js 실행 중...");
      execSync('node single_post_auto.js', { stdio: 'inherit' });
      
      console.log("2. Next.js 빌드 중 (npm run build)...");
      execSync('npm run build', { stdio: 'inherit', shell: 'cmd.exe' });
      
      console.log("3. 정적 파일 복사 중 (xcopy)...");
      execSync('xcopy /s /y /e /q out\\* .', { stdio: 'inherit', shell: 'cmd.exe' });
      
      console.log("4. 깃허브 배포 중 (git push)...");
      execSync('git add -A', { stdio: 'inherit' });
      execSync('git commit -m "feat: [자동화 데몬] AI 포스팅 자동 배포 완료"', { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      
      console.log(`[${new Date().toLocaleTimeString()}] 🎉 모든 작업이 성공적으로 완료되었습니다!\n대기 중...`);
    } catch (err) {
      console.error(`[${new Date().toLocaleTimeString()}] ❌ 작업 중 오류 발생:`, err.message);
    }
  }
}, 3000); // 3초마다 감시
