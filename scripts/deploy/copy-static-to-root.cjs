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

const managedBuildPaths = [
  '_next',
  'about',
  'articles',
  'category',
  'guide',
  'post',
  '404.html',
  'icon.png',
  'index.html',
  'robots.txt',
  'sitemap.xml',
];

for (const entry of managedBuildPaths) {
  const target = path.resolve(root, entry);
  if (path.dirname(target) !== root) {
    throw new Error(`저장소 루트 밖의 경로는 정리할 수 없습니다: ${target}`);
  }
  fs.rmSync(target, { recursive: true, force: true });
}

copyDirectory(output, root);
console.log('이전 정적 페이지를 정리하고 최신 빌드 결과를 저장소 루트에 복사했습니다.');
