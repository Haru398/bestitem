const https = require('https');

https.get('https://www.kurly.com/goods/5160867', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log("KURLY_IMG:", match[1]);
    } else {
      console.log("KURLY_IMG: NOT_FOUND");
    }
  });
}).on('error', e => console.error(e));
