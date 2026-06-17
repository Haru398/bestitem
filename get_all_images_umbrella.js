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
    console.log("Navigating...");
    await page.goto('https://link.coupang.com/a/eylHxixo2m');
    
    // Wait for the redirect to settle
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log("Nav timeout ok"));
    await new Promise(r => setTimeout(r, 5000));
    
    // Simulate mobile scrolling to load more images
    for(let i=0; i<10; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight)).catch(e => {});
        await new Promise(r => setTimeout(r, 1000));
    }
    
    const imgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src || img.getAttribute('data-src') || '')
        .filter(src => src && (src.includes('thumbnail') || src.includes('vendor_inventory') || src.includes('coupangcdn')))
        .filter(src => !src.includes('base64') && !src.includes('lazy'));
    });
    console.log(JSON.stringify([...new Set(imgs)], null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
