const db = require('better-sqlite3')('dev.db');
const posts = db.prepare('SELECT id, title, category, imageUrl, coupangLink, coupangIframe, createdAt FROM posts ORDER BY createdAt DESC').all();
console.log(JSON.stringify(posts, null, 2));
