const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto('https://link.coupang.com/a/exZsKZ94fI');
  
  // wait for the redirection to finish and meta tags to be populated
  await new Promise(r => setTimeout(r, 2000));
  
  const ogImage = await page.evaluate(() => {
    const meta = document.querySelector('meta[property="og:image"]');
    return meta ? meta.content : null;
  });
  console.log('OG_IMAGE:', ogImage);
  await browser.close();
})();
