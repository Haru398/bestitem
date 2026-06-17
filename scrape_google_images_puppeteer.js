const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const query = encodeURIComponent('로열스테디 우양산');
  const url = 'https://www.google.com/search?q=' + query + '&tbm=isch';
  console.log("Navigating to", url);
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Extract images
  const images = await page.evaluate(() => {
    // Select all images inside the results container
    const imgs = Array.from(document.querySelectorAll('img'));
    const urls = [];
    for(const img of imgs) {
      let src = img.src || img.getAttribute('data-src');
      if (src && src.startsWith('http') && !src.includes('googlelogo') && !src.includes('favicon')) {
        urls.push(src);
      }
    }
    return urls;
  });

  // Unique and take top 6
  const unique = [...new Set(images)].slice(0, 6);
  console.log(JSON.stringify(unique, null, 2));
  
  await browser.close();
})();
