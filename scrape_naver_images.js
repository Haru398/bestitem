const puppeteer = require('puppeteer');
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
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  try {
    const query = encodeURIComponent('버닝몬스터 와이드 6부 버뮤다팬츠');
    const url = `https://search.naver.com/search.naver?where=image&sm=tab_jum&query=${query}`;
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for images to load
    await page.waitForSelector('.image_thumb img');
    
    const imageUrls = await page.evaluate(() => {
      const imgs = document.querySelectorAll('.image_thumb img');
      const urls = [];
      for (let img of imgs) {
        let src = img.src || img.getAttribute('data-src');
        if (src && src.startsWith('http') && !src.includes('data:image')) {
          urls.push(src);
        }
        if (urls.length >= 5) break;
      }
      return urls;
    });
    
    console.log('Found image URLs:', imageUrls);
    
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
