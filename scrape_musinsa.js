const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const https = require('https');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
    console.log("Navigating to Musinsa...");
    await page.goto('https://www.musinsa.com/search/musinsa/goods?q=%EB%B2%84%EB%AE%A4%EB%8B%A4%ED%8C%AC%EC%B8%A0', { waitUntil: 'networkidle2' });
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const urls = [];
      for (let img of imgs) {
        let src = img.src || img.getAttribute('data-src');
        if (src && src.startsWith('https://image.msscdn.net') && src.includes('goods')) {
          urls.push(src);
        }
        if (urls.length >= 5) break;
      }
      return urls;
    });
    
    console.log('Musinsa URLs:', imageUrls);
    for (let i = 0; i < imageUrls.length; i++) {
      await downloadImage(imageUrls[i], `public/images/real_shorts_${i+1}.jpg`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
