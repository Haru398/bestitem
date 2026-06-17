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
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' });

  try {
    const url = 'https://www.coupang.com/vp/products/8643232780';
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Custom wait instead of page.waitForTimeout
    await new Promise(r => setTimeout(r, 5000));
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('.product-detail-content-inside img, .subType-IMAGE img, #productDetail img');
      const urls = [];
      for (let img of imgs) {
        let src = img.src || img.getAttribute('data-src') || img.getAttribute('lazy-load');
        if (src && src.includes('coupangcdn') && !src.includes('clear.gif') && !src.includes('spinner.gif')) {
          if (src.startsWith('//')) src = 'https:' + src;
          if (!urls.includes(src)) urls.push(src);
        }
      }
      return urls;
    });
    
    console.log('Found Coupang detail URLs:', imageUrls);
    
    // Download first 5 images
    for (let i = 0; i < Math.min(5, imageUrls.length); i++) {
      try {
        await downloadImage(imageUrls[i], `public/images/real_shorts_${i+1}.jpg`);
        console.log(`Downloaded real_shorts_${i+1}.jpg`);
      } catch(e) {
        console.error("Error downloading", e);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
