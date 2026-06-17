const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://www.google.com/search?q=%EC%9C%84%EB%8B%89%EC%8A%A4+%EC%A0%9C%EC%8A%B5%EA%B8%B0+DXTE120-MPK+coupangcdn&tbm=isch', { waitUntil: 'networkidle2' });
    
    // Wait for images to load
    await page.waitForSelector('img');
    
    const imageUrl = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      for (const img of imgs) {
        if (img.src && img.src.startsWith('http') && !img.src.includes('google')) {
          return img.src;
        }
      }
      return null;
    });
    
    console.log("GOOGLE_IMG:", imageUrl);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
})();
