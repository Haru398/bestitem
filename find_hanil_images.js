const https = require('https');
const fs = require('fs');
const path = require('path');

// Coupang CDN thumbnail for product 9553422164
// Try to get product images from Coupang CDN
const productId = '9553422164';
const itemId = '28505450194';

// These are common Coupang CDN patterns for product images
const imageUrls = [
  // Try known Coupang thumbnail CDN format
  `https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/${productId}.jpg`,
  `https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/${itemId}.jpg`,
  // Try coocha (price comparison) - they have real Hanil product images
  'https://img1.coocha.co.kr/api/v2/imgproxy/image?url=https://image.11st.co.kr/aaa/c/4/4/7/6/0/2/d54e5.jpg',
];

// Better approach: Download from danawa or 11st
const danawa_url = 'https://img.danawa.com/prod_img/500000/000/000/img/10000000/hanil_spot_cooler_1.jpg';

// Real approach: Use the Hanil product images from their CDN via web search results
// Searching for product thumbnail from coupang
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://www.google.com/',
  }
};

// Try to get image from 11st which typically doesn't block
const urls = [
  'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/7313059278/B.jpg',
  'https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a33e/5a2a9d5e7cce5de7a12e5ff9b8e62e1e06c69c5e7e1742b5a5ec02bbbefb.jpg',
];

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(destPath).size;
          console.log(`Downloaded ${path.basename(destPath)}: ${size} bytes`);
          resolve(size);
        });
      } else {
        console.log(`Failed ${url}: ${res.statusCode}`);
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Try fetching a real image from 11st for this product
// Actually let me try the real Coupang CDN image URL patterns

// Let me check if the product page HTML is cached on Google
const googleCacheUrl = `https://webcache.googleusercontent.com/search?q=cache:https://www.coupang.com/vp/products/${productId}`;

https.get(googleCacheUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  console.log('Google cache status:', res.statusCode);
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const imgMatches = body.match(/https:\/\/thumbnail[^"']+\.(jpg|png)/g);
    if (imgMatches) {
      console.log('Found images:', imgMatches.slice(0, 5));
      fs.writeFileSync('found_images.json', JSON.stringify(imgMatches.slice(0, 10), null, 2));
    } else {
      console.log('No images found in cache');
      fs.writeFileSync('cache_response.html', body.substring(0, 5000));
    }
  });
}).on('error', e => {
  console.log('Error:', e.message);
});
