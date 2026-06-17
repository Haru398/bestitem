const fs = require('fs');
const path = require('path');
const https = require('https');
const db = require('better-sqlite3')('dev.db');

const imageUrls = [
  'https://thumbnail8.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/e60b2eb3-42e1-451e-848e-d98ec144f8d2.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/4fb7a2e2-eb02-4ec0-b851-f404612e69b5.jpg',
  'https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/65f419c8-d1d8-4f81-8b9a-43cfbd85d96a.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/9dbf4228-dbd1-4db3-bc12-61a7a00d0263.jpg',
  'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2023/08/11/17/1/e2260ff0-0c9f-43e4-84c1-4cd4a32b21c4.jpg'
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.coupang.com/'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const writeStream = fs.createWriteStream(filepath);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => reject(err));
    });
  });
};

async function main() {
  const uploadDir = path.join(__dirname, 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const localPaths = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const filename = `tissue_new_${i}.jpg`;
    const filepath = path.join(uploadDir, filename);
    try {
      await downloadImage(imageUrls[i], filepath);
      localPaths.push(`/uploads/${filename}`);
      console.log(`Downloaded ${imageUrls[i]} to ${filepath}`);
    } catch (e) {
      console.error(e.message);
    }
  }

  if (localPaths.length > 0) {
    db.prepare(`
      UPDATE posts
      SET 
        imageUrl = ?,
        additionalImages = ?
      WHERE id = '8'
    `).run(localPaths[0], JSON.stringify(localPaths.slice(1)));
    console.log('Database updated with local image paths.');
  }
}

main().catch(console.error);
