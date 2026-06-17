const sharp = require('sharp');
const https = require('https');
const fs = require('fs');

const url = 'https://t3c.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/6042/001fe330d2ddfb71d6e8e7350c391b2c83c72be00364f8239df8e19d5d53.jpg';
const dest = 'temp.jpg';

https.get(url, (res) => {
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close(async () => {
      try {
        const image = sharp(dest);
        const metadata = await image.metadata();
        const w = metadata.width;
        const h = metadata.height;

        // 1: Left Model
        await sharp(dest).extract({ left: 0, top: 0, width: Math.floor(w/2), height: h }).toFile('public/images/real_shorts_1.png');
        // 2: Right Model
        await sharp(dest).extract({ left: Math.floor(w/2), top: 0, width: Math.floor(w/2), height: h }).toFile('public/images/real_shorts_2.png');
        // 3: Top half
        await sharp(dest).extract({ left: 0, top: 0, width: w, height: Math.floor(h/1.5) }).toFile('public/images/real_shorts_3.png');
        // 4: Bottom half
        await sharp(dest).extract({ left: 0, top: Math.floor(h/2), width: w, height: Math.floor(h/2) }).toFile('public/images/real_shorts_4.png');
        // 5: Center zoom
        const cw = Math.floor(w * 0.8);
        const ch = Math.floor(h * 0.8);
        await sharp(dest).extract({ left: Math.floor((w-cw)/2), top: Math.floor((h-ch)/2), width: cw, height: ch }).toFile('public/images/real_shorts_5.png');

        console.log("Successfully generated 5 real product crops using sharp.");
      } catch (e) {
        console.error("Sharp error:", e);
      }
    });
  });
});
