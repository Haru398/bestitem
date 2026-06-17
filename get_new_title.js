const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.coupang.com/vp/products/8643232780', { waitUntil: 'networkidle2' });
    
    const title = await page.evaluate(() => {
      const el = document.querySelector('.prod-buy-header__title');
      return el ? el.textContent.trim() : 'Title not found';
    });
    
    console.log("Title:", title);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
