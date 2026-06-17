const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const https = require('https');
const http = require('http');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    const query = encodeURIComponent('버닝몬스터 밴딩 반바지 착샷');
    await page.goto(`https://www.google.com/search?tbm=isch&q=${query}`, { waitUntil: 'networkidle2' });
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const urls = [];
      for (let img of imgs) {
        const src = img.src || img.getAttribute('data-src');
        if (src && src.startsWith('http') && !src.includes('googlelogo') && !src.includes('gstatic.com/images/branding')) {
          urls.push(src);
        }
        if (urls.length >= 5) break;
      }
      return urls;
    });
    
    console.log('URLs:', imageUrls);
    for (let i = 0; i < imageUrls.length; i++) {
      await downloadImage(imageUrls[i], `public/images/real_shorts_${i+1}.jpg`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
