const Jimp = require('jimp');

(async () => {
  const url = 'https://t3c.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/6042/001fe330d2ddfb71d6e8e7350c391b2c83c72be00364f8239df8e19d5d53.jpg';
  
  try {
    const image = await Jimp.read(url);
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Crop 1: Left Model
    const img1 = image.clone();
    img1.crop(0, 0, Math.floor(width/2), height);
    await img1.writeAsync('public/images/real_shorts_1.png');

    // Crop 2: Right Model
    const img2 = image.clone();
    img2.crop(Math.floor(width/2), 0, Math.floor(width/2), height);
    await img2.writeAsync('public/images/real_shorts_2.png');

    // Crop 3: Top half (waist focus)
    const img3 = image.clone();
    img3.crop(0, 0, width, Math.floor(height/1.5));
    await img3.writeAsync('public/images/real_shorts_3.png');

    // Crop 4: Bottom half (leg focus)
    const img4 = image.clone();
    img4.crop(0, Math.floor(height/2), width, Math.floor(height/2));
    await img4.writeAsync('public/images/real_shorts_4.png');

    // Crop 5: Center zoom
    const img5 = image.clone();
    const cx = Math.floor(width * 0.1);
    const cy = Math.floor(height * 0.1);
    const cw = Math.floor(width * 0.8);
    const ch = Math.floor(height * 0.8);
    img5.crop(cx, cy, cw, ch);
    await img5.writeAsync('public/images/real_shorts_5.png');

    console.log("Successfully generated 5 real product crops.");
  } catch (err) {
    console.error("Error processing images:", err);
  }
})();
