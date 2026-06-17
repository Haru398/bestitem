const https = require('https');
const http = require('http');
const fs = require('fs');

const url = 'https://search.daum.net/search?w=img&q=' + encodeURIComponent('깨끗한나라 순수 시그니처 롤화장지 -브라운');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [];
    const fallbackRegex = /(https?:\/\/[^\s"']+\.(?:jpg|png|jpeg))/ig;
    let match;
    while ((match = fallbackRegex.exec(data)) !== null) {
        let src = match[1];
        if (!src.includes('.js') && !src.includes('daum_og.png') && !src.includes('logo') && !src.includes('profile')) {
            urls.push(src);
        }
    }

    const uniqueUrls = [...new Set(urls)].slice(5, 10); // get the next 5
    console.log("Found URLs:", uniqueUrls);

    let count = 0;
    uniqueUrls.forEach((u, i) => {
      const client = u.startsWith('https') ? https : http;
      client.get(u, (imgRes) => {
        const file = fs.createWriteStream(`public/images/real_tissue_new_${i+1}.jpg`);
        imgRes.pipe(file);
        file.on('finish', () => {
          file.close();
          count++;
          if (count === uniqueUrls.length) {
            console.log("Successfully downloaded 5 NEW REAL images.");
          }
        });
      });
    });
  });
}).on('error', (e) => console.error(e));
