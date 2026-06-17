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
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  try {
    const query = encodeURIComponent('버닝몬스터 6부 밴딩 반바지');
    const url = `https://search.shopping.naver.com/search/all?query=${query}`;
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for the item list to load
    await new Promise(r => setTimeout(r, 5000));
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const urls = [];
      for (let img of imgs) {
        let src = img.src || img.getAttribute('data-src');
        if (src && src.includes('shopping-phinf.pstatic.net') && !src.includes('clear.gif') && !urls.includes(src)) {
          urls.push(src);
        }
      }
      return urls;
    });
    
    console.log('Found Naver Shopping URLs:', imageUrls);
    
    for (let i = 0; i < Math.min(5, imageUrls.length); i++) {
      try {
        await downloadImage(imageUrls[i], `public/images/real_shorts_${i+1}.jpg`);
        console.log(`Downloaded real_shorts_${i+1}.jpg`);
      } catch (e) {
        console.error(`Failed to download image ${i+1}:`, e);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
