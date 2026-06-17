const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    const widgetUrl = 'https://coupa.ng/cnptap';
    console.log("Navigating to widget:", widgetUrl);
    
    await page.goto(widgetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const data = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src && src.includes('coupangcdn.com'));
        
      const titleEl = document.querySelector('.title');
      const title = titleEl ? titleEl.textContent.trim() : 'Unknown Title';
      
      const priceEl = document.querySelector('.price');
      const price = priceEl ? priceEl.textContent.trim() : 'Unknown Price';
      
      return { imgs, title, price };
    });
    console.log("Widget Data:", JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
