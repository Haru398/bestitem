const fs = require('fs');
const path = require('path');

// Use Node.js Buffer approach to avoid path encoding issues
const src = path.join('C:/Users/my/.gemini/antigravity/brain/0096a6d6-9821-41a9-86e2-7f03765275fa', 'media__1781701665635.png');
const dest = path.join('D:/서버구축폴더/bestitem/public/images', 'hanil_ac_1.png');

try {
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
  console.log('✅ Copied thumbnail:', dest, '- Size:', data.length, 'bytes');
} catch(e) {
  console.error('Error:', e.message);
}
