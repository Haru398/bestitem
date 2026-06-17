const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const https = require('https');
const http = require('http');

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
    console.log("Navigating to Musinsa Standard...");
    // Search for '무신사 스탠다드 스웨트 쇼츠' (Musinsa Standard Sweat Shorts) which looks exactly like the product
    await page.goto('https://www.musinsa.com/search/musinsa/goods?q=%EB%AC%B4%EC%8B%A0%EC%82%AC+%EC%8A%A4%ED%83%A0%EB%8B%A4%EB%93%9C+%EC%8A%A4%EC%9B%A8%ED%8A%B8+%EC%87%BC%EC%B8%A0', { waitUntil: 'networkidle2' });
    
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
