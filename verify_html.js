const fs = require('fs');
const html = fs.readFileSync('out/guide/guide-rtx5060-review-2025/index.html', 'utf8');
console.log('404 에러 포함:', html.includes('NEXT_HTTP_ERROR_FALLBACK;404'));
console.log('iframe 렌더링됨:', html.includes('<iframe src="https://coupa.ng/cnKAQW"'));
console.log('테이블 렌더링됨:', html.includes('<table'));
console.log('파일 크기:', html.length, 'bytes');
