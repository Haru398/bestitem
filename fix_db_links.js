const db = require('better-sqlite3')('dev.db');

try {
  // Add column
  db.prepare('ALTER TABLE posts ADD COLUMN coupangLink TEXT').run();
  console.log('Added coupangLink column.');
} catch(e) {
  console.log('Column might already exist:', e.message);
}

const posts = db.prepare('SELECT id, content FROM posts').all();
let updated = 0;

for (const p of posts) {
  // Try to find a link that looks like https://link.coupang.com/...
  const match = p.content.match(/https:\/\/link\.coupang\.com\/[^\)\s"]+/);
  if (match) {
    db.prepare('UPDATE posts SET coupangLink = ? WHERE id = ?').run(match[0], p.id);
    updated++;
  }
}

console.log(`Updated ${updated} posts with coupangLink extracted from content.`);
