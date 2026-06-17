const https = require('https');
const query = encodeURIComponent('에버콜라겐 타임 비오틴');
const url = 'https://search.naver.com/search.naver?where=image&sm=tab_jum&query=' + query;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [];
    const regex = /data-source="([^"]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if (match[1].startsWith('http')) {
        urls.push(match[1]);
      }
    }
    console.log(JSON.stringify([...new Set(urls)].slice(0, 7), null, 2));
  });
}).on('error', console.error);
