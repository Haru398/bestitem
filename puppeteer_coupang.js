const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://link.coupang.com/a/eEbASMimUm', { waitUntil: 'networkidle2' });
    const ogImage = await page.$eval('meta[property="og:image"]', el => el.content);
    console.log("PUPPETEER_IMG:", ogImage);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
})();
