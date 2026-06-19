const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://www.coupang.com/vp/products/9553422164?itemId=28505450194', {
      waitUntil: 'domcontentloaded', timeout: 15000
    });
    
    const title = await page.title();
    console.log('Title:', title);
    
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content).catch(() => 'N/A');
    console.log('OG Title:', ogTitle);
    
    const ogImage = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'N/A');
    console.log('OG Image:', ogImage);
    
    const ogDesc = await page.$eval('meta[property="og:description"]', el => el.content).catch(() => 'N/A');
    console.log('OG Desc:', ogDesc);
    
    // Get product name from heading
    const h1 = await page.$eval('h1', el => el.innerText).catch(() => 'N/A');
    console.log('H1:', h1);
    
    // All images
    const imgs = await page.$$eval('img', els => els.slice(0,10).map(e => e.src));
    console.log('Images:', imgs);
    
  } catch(e) {
    console.error('Error:', e.message);
  }
  await browser.close();
})();
