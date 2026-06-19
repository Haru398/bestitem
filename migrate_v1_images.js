const Database = require('better-sqlite3');

const oldDb = new Database('./dev.db.backup_20260619_143129');
const newDb = new Database('./dev.db');

const oldPosts = oldDb.prepare('SELECT id, additionalImages FROM posts').all();

const insertSec = newDb.prepare(`
  INSERT INTO post_sections (postId, sectionOrder, image, imageAlt, text, qualityScore, createdAt, updatedAt)
  VALUES (@postId, @sectionOrder, @image, '', '', 100, @now, @now)
`);

newDb.exec('BEGIN TRANSACTION');
for (const p of oldPosts) {
  if (p.additionalImages) {
    try {
      const imgs = JSON.parse(p.additionalImages);
      let order = 1;
      for (const img of imgs) {
        try {
          insertSec.run({
            postId: p.id,
            sectionOrder: order,
            image: img,
            now: new Date().toISOString()
          });
        } catch (e) {
          if (!e.message.includes('UNIQUE')) console.error(e);
        }
        order++;
      }
    } catch (e) {
      console.error('Failed to parse additionalImages for', p.id);
    }
  }
}
newDb.exec('COMMIT');
console.log('Restored old body images into post_sections!');
