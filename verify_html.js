const fs = require('fs');
const html = fs.readFileSync('out/guide/guide-rtx5060-review-2025/index.html', 'utf8');
const has404 = html.includes('NEXT_HTTP_ERROR_FALLBACK;404');
const hasTitle = html.includes('MSI');
console.log('404 에러 포함 여부:', has404);
console.log('정상 콘텐츠 포함 여부:', hasTitle);
console.log('파일 크기:', html.length, 'bytes');
