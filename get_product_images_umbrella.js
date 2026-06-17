const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  try {
    await page.goto('https://link.coupang.com/a/eylHxixo2m', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Scroll down to trigger lazy loaded images
    for(let i=0; i<5; i++) {
        await page.evaluate(() => window.scrollBy(0, 1000));
        await new Promise(r => setTimeout(r, 1000));
    }
    
    const imgs = await page.evaluate(() => {
      // Find thumbnail carousel images
      const thumbImgs = Array.from(document.querySelectorAll('.prod-image__item img, .prod-image-carousel__item img, .sub-type-image, .prod-image__detail'))
                        .map(img => img.src)
                        .filter(src => src && src.startsWith('http') && !src.includes('base64'));
                        
      // Find detail images
      const detailImgs = Array.from(document.querySelectorAll('.product-detail-content img, .vendor-item img, .detail-item img'))
                         .map(img => img.dataset.src || img.src)
                         .filter(src => src && src.startsWith('http') && !src.includes('base64'));
                         
      return [...new Set([...thumbImgs, ...detailImgs])];
    });
    console.log(JSON.stringify(imgs, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
