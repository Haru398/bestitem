const fs = require('fs');
const https = require('https');
const content = fs.readFileSync('C:\\Users\\my\\.gemini\\antigravity\\brain\\73c79e9c-ef8b-48a2-a5a4-cc2eb473f107\\.system_generated\\steps\\2780\\content.md', 'utf8');

const urls = [];
const regex = /<img src="([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[1].includes('kakaocdn') && !match[1].includes('no-image-v1.png') && !urls.includes(match[1])) {
    urls.push(match[1]);
  }
}

const targetUrls = urls.slice(0, 5);
console.log('Downloading URLs:', targetUrls);

if(!fs.existsSync('public/images')) fs.mkdirSync('public/images', {recursive: true});

targetUrls.forEach((url, i) => {
  https.get(url, (res) => {
    const file = fs.createWriteStream('public/images/collagen_real_' + (i+1) + '.jpg');
    res.pipe(file);
    file.on('finish', () => file.close());
  });
});
