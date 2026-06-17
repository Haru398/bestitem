const https = require('https');
const fs = require('fs');

const url = 'https://www.coupang.com/vp/products/218520566';
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('coupang_source.html', data);
    console.log('Saved to coupang_source.html, length:', data.length);
    
    // Attempt to extract images
    const imgMatches = [...data.matchAll(/https?:\/\/[a-zA-Z0-9.-]*coupangcdn\.com[^"'\s\\]+/g)].map(m => m[0]);
    const validImgs = [...new Set(imgMatches)].filter(s => s.includes('.jpg') || s.includes('.png'));
    console.log('Valid Coupang images found:', validImgs);
  });
}).on('error', console.error);
