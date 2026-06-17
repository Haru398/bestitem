const fs = require('fs');
const html = fs.readFileSync('tistory.html', 'utf8');

const regex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (src.includes('blog.kakaocdn.net/dn') && !src.includes('thumb/')) {
    console.log(src);
  }
}
