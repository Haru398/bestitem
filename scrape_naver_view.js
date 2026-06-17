const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const query = encodeURIComponent('로열스테디 우양산');
  const url = 'https://search.naver.com/search.naver?where=view&sm=tab_jum&query=' + query;
  console.log("Navigating to", url);
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Extract images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.api_txt_lines.total_tit ~ .thumb_area img, .thumb_area img, .detail_box img'));
    const urls = [];
    for(const img of imgs) {
      let src = img.src || img.getAttribute('data-src');
      if (src && src.startsWith('http') && !src.includes('favicon')) {
        urls.push(src);
      }
    }
    return urls;
  });

  const unique = [...new Set(images)].slice(0, 6);
  console.log(JSON.stringify(unique, null, 2));
  
  await browser.close();
})();
