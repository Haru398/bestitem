const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    const widgetUrl = 'https://coupa.ng/cnpmT9';
    console.log("Navigating to widget:", widgetUrl);
    
    await page.goto(widgetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const imgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src && src.includes('coupangcdn.com'));
    });
    console.log("Widget Images:", JSON.stringify(imgs, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
