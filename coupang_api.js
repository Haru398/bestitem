const https = require('https');
const fs = require('fs');

// Coupang product image CDN - try common patterns for itemId 28505450194
const itemId = '28505450194';
const productId = '9553422164';

// Try getting the product JSON from Coupang's internal API
const apiUrl = `https://www.coupang.com/vp/products/${productId}/items/${itemId}`;

const options = {
  headers: {
    'User-Agent': 'CoupangApp/3.0 (Android)',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

https.get(apiUrl, options, (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      console.log('Product:', JSON.stringify(data, null, 2).substring(0, 2000));
    } catch(e) {
      // Try to find title in raw HTML
      const titleMatch = body.match(/"productName":\s*"([^"]+)"/);
      if (titleMatch) console.log('Product Name:', titleMatch[1]);
      const nameMatch = body.match(/"name":\s*"([^"]{5,100})"/);
      if (nameMatch) console.log('Name:', nameMatch[1]);
      fs.writeFileSync('api_response.txt', body.substring(0, 10000));
      console.log('Saved to api_response.txt, length:', body.length);
    }
  });
}).on('error', e => console.error(e));
