const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to Naver View...");
    await page.goto('https://search.naver.com/search.naver?where=view&sm=tab_jum&query=' + encodeURIComponent('로열스테디 우양산'), { waitUntil: 'networkidle2' });
    
    // Get the first blog link
    const blogLink = await page.evaluate(() => {
      const el = document.querySelector('.api_txt_lines.total_tit');
      return el ? el.href : null;
    });
    
    if(!blogLink) {
        console.log("No blog link found");
        return;
    }
    console.log("Found blog link:", blogLink);
    
    await page.goto(blogLink, { waitUntil: 'networkidle2' });
    
    // Naver blogs use iframes (mainFrame)
    let frame = page;
    const iframeElement = await page.$('#mainFrame');
    if (iframeElement) {
        frame = await iframeElement.contentFrame();
    }
    
    // Extract images from the blog post content
    const imgs = await frame.evaluate(() => {
      return Array.from(document.querySelectorAll('.se-main-container img'))
        .map(img => img.src || img.getAttribute('data-src'))
        .filter(src => src && src.startsWith('http') && !src.includes('sticker'));
    });
    
    console.log(JSON.stringify([...new Set(imgs)].slice(0, 5), null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
