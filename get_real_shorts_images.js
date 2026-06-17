const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  try {
    const url = 'https://search.naver.com/search.naver?where=image&sm=tab_jum&query=' + encodeURIComponent('버닝몬스터 반바지 모델');
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const imgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.image_thumb img'))
        .map(img => img.src || img.getAttribute('data-src'))
        .filter(src => src && src.startsWith('http') && !src.includes('data:image'))
        .slice(0, 5);
    });
    
    console.log(JSON.stringify(imgs, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
