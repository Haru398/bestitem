const https = require('https');
https.get('https://www.couprice.co.kr/products/uv-blocking-wide-brim-sun-cap-8774813050', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^"]+)"/g);
    if(matches) {
      matches.forEach(m => {
        const urlMatch = m.match(/src="([^"]+)"/);
        if(urlMatch && urlMatch[1].includes('coupangcdn')) console.log(urlMatch[1]);
      });
    }
  });
});
