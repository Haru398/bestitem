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
    await page.goto('https://link.coupang.com/a/exZsKZ94fI', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    const imgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src.includes('thumbnail') || src.includes('image.vendor') || src.includes('image11.coupangcdn.com') || src.includes('thumbnail.10x10.co.kr'))
        .filter(src => !src.includes('base64'));
    });
    console.log('Found Images:', imgs);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
