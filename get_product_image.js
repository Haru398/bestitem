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
    console.log('Navigating...');
    await page.goto('https://link.coupang.com/a/exZsKZ94fI', { waitUntil: 'networkidle2', timeout: 30000 });
    
    await new Promise(r => setTimeout(r, 2000));
    
    const imageInfo = await page.evaluate(() => {
      const mainImg = document.querySelector('.prod-image__detail') || document.querySelector('.prod-image-item img');
      if (mainImg) return mainImg.src;
      
      const imgs = Array.from(document.querySelectorAll('img'));
      let largest = null;
      let maxArea = 0;
      for (const img of imgs) {
         const area = img.width * img.height;
         if (area > maxArea && area > 40000 && img.src.startsWith('http')) {
             maxArea = area;
             largest = img;
         }
      }
      return largest ? largest.src : null;
    });

    console.log('Found main image URL:', imageInfo);

    if (imageInfo) {
      const viewSource = await page.goto(imageInfo);
      const buffer = await viewSource.buffer();
      require('fs').writeFileSync('public/images/banana_real_1.png', buffer);
      console.log('Saved main image as banana_real_1.png');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
