const https = require('https');

const options = {
  hostname: 'link.coupang.com',
  path: '/a/eEbASMimUm',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    // Handle redirect
    const url = new URL(res.headers.location);
    const opts2 = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(opts2, (res2) => {
      let data = '';
      res2.on('data', d => data += d);
      res2.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          console.log("IMAGE_URL:", match[1]);
        } else {
          console.log("IMAGE_URL: NOT_FOUND");
        }
      });
    }).on('error', e => console.error(e));
  } else {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log("IMAGE_URL:", match[1]);
      } else {
        console.log("IMAGE_URL: NOT_FOUND");
      }
    });
  }
}).on('error', e => console.error(e));
