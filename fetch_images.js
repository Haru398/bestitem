const https = require('https');
const fs = require('fs');

const query = encodeURIComponent('깨끗한나라 순수 시그니처 롤화장지');
const url = `https://www.google.com/search?tbm=isch&q=${query}`;

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Some basic UA
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    let urls = [];
    while ((match = regex.exec(data)) !== null) {
      let src = match[1];
      if (src && src.startsWith('http')) {
        // filter out small icons
        if (!src.includes('images/branding')) {
            urls.push(src);
        }
      }
    }

    urls = [...new Set(urls)].slice(0, 5);
    console.log("Found URLs:", urls);

    if (!fs.existsSync('public/images')) {
        fs.mkdirSync('public/images', { recursive: true });
    }

    let count = 0;
    urls.forEach((u, i) => {
      https.get(u, (imgRes) => {
        const file = fs.createWriteStream(`public/images/product_new_${i+1}.jpg`);
        imgRes.pipe(file);
        file.on('finish', () => {
          file.close();
          count++;
          if (count === urls.length) {
            console.log("Successfully downloaded 5 images.");
          }
        });
      });
    });
  });
});
