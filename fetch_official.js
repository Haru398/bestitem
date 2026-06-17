const https = require('https');

const options = {
  hostname: 'www.coupang.com',
  path: '/vp/products/7355024928',
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log("OFFICIAL_IMG:", match[1]);
    } else {
      console.log("OFFICIAL_IMG: NOT_FOUND");
    }
  });
}).on('error', e => console.error(e));
