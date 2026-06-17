const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Emulate mobile device
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');

  try {
    console.log('Navigating to Coupang link...');
    await page.goto('https://link.coupang.com/a/exZsKZ94fI', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait an extra 3 seconds for dynamic content
    await new Promise(r => setTimeout(r, 3000));
    
    const title = await page.title();
    console.log('Page Title:', title);

    // Extract text content from body for context
    const bodyText = await page.evaluate(() => {
      // Get all text from body
      return document.body.innerText.substring(0, 1500); // Get first 1500 chars
    });
    
    console.log('Body Text Snippet:', bodyText);
    
    // Generate timestamp for filenames
    const ts = Date.now();
    
    console.log('Taking Step 1 screenshot...');
    await page.screenshot({ path: `public/images/new_item_step1_${ts}.png` });
    
    console.log('Scrolling down for Step 2...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `public/images/new_item_step2_${ts}.png` });
    
    console.log('Scrolling further for Step 3...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `public/images/new_item_step3_${ts}.png` });

    console.log('Screenshots completed successfully!');
    console.log(`TS_VALUE:${ts}`);
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
})();
