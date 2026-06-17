const puppeteer = require('puppeteer');

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
    console.log('Navigating to Coupang Travel...');
    await page.goto('https://travel.coupang.com', { waitUntil: 'networkidle2' });
    
    console.log('Taking Step 1 screenshot...');
    await page.screenshot({ path: 'public/images/festa_step1_1781317461091.png' });
    
    console.log('Scrolling down for Step 2...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'public/images/festa_step2_1781317473312.png' });
    
    console.log('Scrolling further for Step 3...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'public/images/festa_step3_1781317482871.png' });

    console.log('Screenshots completed successfully!');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
})();
