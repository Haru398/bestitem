const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(process.cwd(), 'images');

function downloadImage(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(imagesDir, filename);
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Referer': 'https://shopping.naver.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      }
    };
    const req = https.get(url, opts, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', d => chunks.push(d));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          if (buf.length > 5000) {
            fs.writeFileSync(dest, buf);
            console.log(`✅ ${filename}: ${buf.length} bytes`);
            resolve(true);
          } else {
            console.log(`❌ ${filename}: too small (${buf.length}b)`);
            resolve(false);
          }
        });
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        const location = res.headers.location;
        console.log(`↪️ Redirecting to: ${location}`);
        resolve(downloadImage(location, filename));
      } else {
        console.log(`❌ ${filename}: HTTP ${res.statusCode}`);
        res.resume();
        resolve(false);
      }
    });
    req.on('error', e => {
      console.log(`❌ ${filename}: ${e.message}`);
      resolve(false);
    });
  });
}

// Real Hanil portable AC images from various CDNs
// These are legitimate, publicly indexed product images from Korean shopping sites
const sources = [
  // Naver Shopping Product images - Hanil spot cooler (산업용 이동식에어컨)
  ['https://shopping-phinf.pstatic.net/main_8494213/84942131680.20240403095219.jpg', 'hanil_ac_2.png'],
  ['https://shopping-phinf.pstatic.net/main_8494213/84942131681.20240403095219.jpg', 'hanil_ac_3.png'],
  // 11번가 CDN
  ['https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/7547632890/B.jpg', 'hanil_ac_4.png'],
  // Kakao shopping / Daum
  ['https://t1.kakaocdn.net/thumb/T600x600/kakaoshopping/0EA_TiK2sR7TxtnAAFNe.jpg', 'hanil_ac_5.png'],
];

(async () => {
  let success = 0;
  for (const [url, fname] of sources) {
    const ok = await downloadImage(url, fname);
    if (ok) success++;
  }
  console.log(`\nDownloaded: ${success}/${sources.length}`);
  
  // Final check of all hanil images
  const files = fs.readdirSync(imagesDir).filter(f => f.startsWith('hanil_ac_'));
  console.log('All hanil images:', files);
  
  // Check which are missing
  const needed = ['hanil_ac_2.png', 'hanil_ac_3.png', 'hanil_ac_4.png', 'hanil_ac_5.png'];
  const missing = needed.filter(f => !files.includes(f));
  if (missing.length > 0) {
    console.log('Missing images:', missing);
  }
})();
