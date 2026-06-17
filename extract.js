const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

  try {
    await page.goto('https://link.coupang.com/a/exrAylBX3s', { waitUntil: 'networkidle2' });
    
    // Wait a bit for JS to render the text
    await new Promise(r => setTimeout(r, 2000));
    
    // Extract visible text
    const text = await page.evaluate(() => document.body.innerText);
    console.log("EXTRACTED_TEXT_START");
    console.log(text);
    console.log("EXTRACTED_TEXT_END");
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
