const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set User-Agent to avoid being blocked
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  const url = process.argv[2] || "https://link.coupang.com/a/eylHxixo2m";
  console.log(`Navigating to ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Extract images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.prod-image__items .prod-image__item img'));
    return imgs.map(img => {
      let src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src && src.startsWith('//')) {
        src = 'https:' + src;
      }
      return src;
    }).filter(src => src);
  });

  console.log("Extracted Images:", JSON.stringify(images, null, 2));
  await browser.close();
})();
