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
    const query = encodeURIComponent('버닝몬스터 와이드 6부 버뮤다팬츠');
    const url = `https://search.daum.net/search?w=img&nil_search=btn&DA=NTB&enc=utf8&q=${query}`;
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.waitForSelector('.thumb_img', { timeout: 10000 });
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('.thumb_img');
      const urls = [];
      for (let img of imgs) {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('original-src');
        if (src && src.startsWith('http') && !src.includes('data:image')) {
          urls.push(src);
        }
        if (urls.length >= 5) break;
      }
      return urls;
    });
    
    console.log('Found Daum image URLs:', imageUrls);
    
    for (let i = 0; i < imageUrls.length; i++) {
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
