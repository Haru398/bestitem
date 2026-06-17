const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  console.log("Starting stealth browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1280, height: 800 });
  
  const url = process.argv[2] || "https://link.coupang.com/a/eylHxixo2m";
  console.log(`Navigating to ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait a bit to ensure redirect and JS execution
  await new Promise(r => setTimeout(r, 5000));
  
  console.log("Extracting images...");
  const images = await page.evaluate(() => {
    // Try different possible selectors for Coupang product images
    let imgs = Array.from(document.querySelectorAll('img.prod-image__detail, .prod-image__items img, #repImageContainer img'));
    
    // If not found, just grab all large images as fallback
    if (imgs.length === 0) {
      imgs = Array.from(document.querySelectorAll('img')).filter(img => {
        return img.width > 200 && img.height > 200;
      });
    }

    return imgs.map(img => {
      let src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src && src.startsWith('//')) {
        src = 'https:' + src;
      }
      return src;
    }).filter(src => src && src.includes('coupangcdn.com'));
  });

  // Deduplicate
  const uniqueImages = [...new Set(images)];

  console.log("Extracted Images:", JSON.stringify(uniqueImages, null, 2));
  
  // Save to file so we can read it easily
  fs.writeFileSync('extracted_images.json', JSON.stringify(uniqueImages, null, 2));
  
  await browser.close();
})();
