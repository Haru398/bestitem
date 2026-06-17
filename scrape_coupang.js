const https = require('https');

const options = {
  hostname: 'www.coupang.com',
  path: '/vp/products/5449205688',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try to find thumbnail images in the HTML
    const thumbMatches = data.match(/image\/vendor_inventory\/[^"]+/g);
    if(thumbMatches) {
       console.log('Vendor images:');
       const unique = [...new Set(thumbMatches)];
       unique.slice(0,10).forEach(m => console.log('https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/' + m));
    }
    
    const rsMatches = data.match(/image\/rs_quotation_api\/[^"]+/g);
    if(rsMatches) {
       console.log('RS images:');
       const unique = [...new Set(rsMatches)];
       unique.slice(0,10).forEach(m => console.log('https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/' + m));
    }

  });
}).on('error', (e) => console.error(e));
