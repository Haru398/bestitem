const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
    executablePath: undefined
  });
  const page = await browser.newPage();
  
  // Set realistic headers
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
  
  // Go to coupang homepage first to get cookies
  await page.goto('https://www.coupang.com', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  
  // Now go to the product page
  await page.goto('https://www.coupang.com/vp/products/9553422164?itemId=28505450194', {
    waitUntil: 'domcontentloaded', timeout: 20000
  }).catch(e => console.log('Nav error:', e.message));
  
  await new Promise(r => setTimeout(r, 3000));
  
  const title = await page.title().catch(() => '');
  console.log('Title:', title);
  
  const content = await page.content();
  fs.writeFileSync('product_full.html', content.substring(0, 50000));
  
  // Try to get product name
  const productName = await page.evaluate(() => {
    const h1 = document.querySelector('h1.prod-buy-header__title');
    if (h1) return h1.innerText;
    const meta = document.querySelector('meta[property="og:title"]');
    if (meta) return meta.content;
    const title = document.querySelector('title');
    if (title) return title.innerText;
    return 'not found';
  });
  console.log('Product:', productName);
  
  await browser.close();
})();
