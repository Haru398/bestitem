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

function backupAllPosts() {
  const backupRoot = 'D:\\정식서버업로드전용폴더';
  const postsDir = path.join(__dirname, 'out', 'post');
  
  if (!fs.existsSync(postsDir)) {
    console.log('out/post 폴더가 없습니다. 빌드를 먼저 진행해주세요.');
    return;
  }

  const posts = fs.readdirSync(postsDir);
  let count = 0;

  for (const postId of posts) {
    // 디렉토리인 경우만 (id)
    if (fs.lstatSync(path.join(postsDir, postId)).isDirectory()) {
      const targetDir = path.join(backupRoot, postId);
      
      // 이미 백업된 폴더도 덮어쓰기 (항상 최신본 유지)
      copyFolderSync(path.join(postsDir, postId), targetDir);
      
      // 이미지 폴더 백업 시도 (옵션)
      let imgDirName = postId.replace('POST-', '').toLowerCase();
      // 옛날글들은 item- 형태
      if (postId.startsWith('item-')) {
          imgDirName = postId.replace('item-', '').toLowerCase();
      }

      const imgSrcDir = path.join(__dirname, 'public', 'images', imgDirName);
      if (fs.existsSync(imgSrcDir)) {
        copyFolderSync(imgSrcDir, path.join(targetDir, 'images'));
      }
      count++;
    }
  }
  
  console.log(`총 ${count}개의 게시글 파일을 '${backupRoot}' 폴더에 개별적으로 백업 완료했습니다.`);
}

backupAllPosts();
