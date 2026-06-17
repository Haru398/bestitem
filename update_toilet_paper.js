const db = require('better-sqlite3')('dev.db');

const additionalImages = [
  'https://thumbnail8.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/e60b2eb3-42e1-451e-848e-d98ec144f8d2.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/4fb7a2e2-eb02-4ec0-b851-f404612e69b5.jpg',
  'https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/65f419c8-d1d8-4f81-8b9a-43cfbd85d96a.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2023/08/11/17/1/9dbf4228-dbd1-4db3-bc12-61a7a00d0263.jpg'
];

db.prepare(`
  UPDATE posts
  SET 
    imageUrl = 'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2023/08/11/17/1/e2260ff0-0c9f-43e4-84c1-4cd4a32b21c4.jpg',
    additionalImages = ?
  WHERE id = '8'
`).run(JSON.stringify(additionalImages));

console.log('Post updated with 5 real images.');
