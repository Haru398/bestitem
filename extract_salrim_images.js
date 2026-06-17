const fs = require('fs');
const html = fs.readFileSync('salrim.html', 'utf8');

const regex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (src.includes('web/product') && !src.includes('tiny')) {
    console.log(src.startsWith('//') ? 'https:' + src : src);
  }
}
