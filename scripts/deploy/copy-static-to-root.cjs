const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const output = path.join(root, 'out');

if (!fs.existsSync(path.join(output, 'index.html'))) {
  console.error('out/index.html이 없습니다. 먼저 npm run build를 실행하세요.');
  process.exit(1);
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);

    if (entry.isDirectory()) copyDirectory(from, to);
    else fs.copyFileSync(from, to);
  }
}

copyDirectory(output, root);
console.log('정적 빌드 결과를 저장소 루트에 복사했습니다. 기존 파일은 삭제하지 않았습니다.');
