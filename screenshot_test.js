const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 1024 });
  const url = process.argv[2] || "https://link.coupang.com/a/eylHxixo2m";
  console.log(`Navigating to ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));
  
  await page.screenshot({ path: 'coupang_stealth_screenshot.png', fullPage: true });
  console.log("Screenshot saved to coupang_stealth_screenshot.png");
  
  await browser.close();
})();
