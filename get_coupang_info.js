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
  const url = process.argv[2];
  if (!url) {
    console.log("No URL provided");
    process.exit(1);
  }
  
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  try {
    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    await new Promise(r => setTimeout(r, 5000));
    
    const title = await page.evaluate(() => {
        const titleEl = document.querySelector('h2.prod-buy-header__title');
        return titleEl ? titleEl.innerText : document.title;
    });
    
    console.log('Product Title:', title);

    const imageUrls = await page.evaluate(() => {
      // First try to get main product images
      let imgs = Array.from(document.querySelectorAll('.prod-image__items img, .prod-image__detail'));
      
      if(imgs.length === 0) {
          imgs = Array.from(document.querySelectorAll('.product-detail-content-inside img, #productDetail img'));
      }
      
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
    
    console.log('Found Coupang detail URLs count:', imageUrls.length);
    
    // Download first 5 images
    let downloaded = [];
    for (let i = 0; i < Math.min(5, imageUrls.length); i++) {
      try {
        const ext = imageUrls[i].split('.').pop().split('?')[0] || 'jpg';
        const filepath = `public/images/product_new_${i+1}.jpg`;
        await downloadImage(imageUrls[i], filepath);
        console.log(`Downloaded ${filepath}`);
        downloaded.push(filepath);
      } catch(e) {
        console.error("Error downloading", e);
      }
    }
    
    // write result to json
    fs.writeFileSync('product_info.json', JSON.stringify({title, images: downloaded}));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
