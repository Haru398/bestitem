const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\my\\.gemini\\antigravity\\brain\\73c79e9c-ef8b-48a2-a5a4-cc2eb473f107\\.system_generated\\steps\\2780\\content.md', 'utf8');

const urls = [];
const regex = /<img src="([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[1].includes('kakaocdn') && !match[1].includes('no-image-v1.png') && !urls.includes(match[1])) {
    urls.push(match[1]);
  }
}

console.log(JSON.stringify(urls, null, 2));
