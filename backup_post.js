const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function backupPost(postId) {
  const backupRoot = 'D:\\정식서버업로드전용폴더';
  const targetDir = path.join(backupRoot, postId);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. 빌드된 HTML 파일 백업 (out/post/postId)
  const htmlSrcDir = path.join(__dirname, 'out', 'post', postId);
  if (fs.existsSync(htmlSrcDir)) {
    copyFolderSync(htmlSrcDir, targetDir);
    console.log(`✅ [${postId}] HTML 파일 백업 완료 -> ${targetDir}`);
  } else {
    console.log(`❌ [${postId}] 빌드된 HTML 폴더를 찾을 수 없습니다: ${htmlSrcDir}`);
  }

  // 2. 사용된 이미지 폴더 백업 (public/images/...)
  // 제노벤의 경우 zenoben 이라는 폴더를 사용함. postId로 유추하거나, 여기서는 하드코딩 또는 모두 복사
  let imgDirName = postId.replace('POST-', '').toLowerCase();
  const imgSrcDir = path.join(__dirname, 'public', 'images', imgDirName);
  
  if (fs.existsSync(imgSrcDir)) {
    const targetImgDir = path.join(targetDir, 'images');
    copyFolderSync(imgSrcDir, targetImgDir);
    console.log(`✅ [${postId}] 이미지 파일 백업 완료 -> ${targetImgDir}`);
  } else {
    // 혹시 다른 폴더에 있다면 무시
  }
}

const args = process.argv.slice(2);
const postId = args[0] || 'POST-ZENOBEN';
backupPost(postId);
