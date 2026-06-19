const https = require('https');

const url = 'https://www.coupang.com/vp/products/9553422164?itemId=28505450194';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Language': 'ko-KR,ko;q=0.9',
    'Cookie': '',
  },
};

let body = '';
const req = https.get(url, options, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', d => body += d);
  res.on('end', () => {
    // Extract title
    const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/);
    if (titleMatch) console.log('Title:', titleMatch[1]);
    // Extract og:title
    const ogTitle = body.match(/og:title.*?content="([^"]+)"/);
    if (ogTitle) console.log('OG Title:', ogTitle[1]);
    // Extract og:image
    const ogImage = body.match(/og:image.*?content="([^"]+)"/);
    if (ogImage) console.log('OG Image:', ogImage[1]);
    // Extract product name from json
    const nameMatch = body.match(/"name"\s*:\s*"([^"]{10,100})"/);
    if (nameMatch) console.log('Product Name:', nameMatch[1]);
    // Save partial body for inspection
    require('fs').writeFileSync('product_page.html', body.substring(0, 20000));
    console.log('Saved first 20KB to product_page.html');
  });
});
req.on('error', e => console.error(e));
