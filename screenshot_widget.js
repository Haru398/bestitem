const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 120, height: 240 });
  
  try {
    await page.goto('https://coupa.ng/cnptap', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'widget.png' });
    console.log("Screenshot saved to widget.png");
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
