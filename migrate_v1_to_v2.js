const Database = require('better-sqlite3');
const fs = require('fs');

const oldDb = new Database('./dev.db.backup_20260619_143129');
const newDb = new Database('./dev.db');

// 1. Delete all test posts except POST-ZENOBEN
newDb.prepare("DELETE FROM posts_v2 WHERE postId != 'POST-ZENOBEN'").run();

// 2. Fetch old posts
const oldPosts = oldDb.prepare('SELECT * FROM posts').all();

// 3. Insert into posts_v2
const insertStmt = newDb.prepare(`
  INSERT INTO posts_v2 (
    postId, status, version, category, title, summary, thumbnail, 
    intro, outro, coupangLink, coupangHtml, errorInfo, lastFailedStatus, 
    views, createdAt, updatedAt
  ) VALUES (
    @postId, @status, @version, @category, @title, @summary, @thumbnail,
    @intro, @outro, @coupangLink, @coupangHtml, @errorInfo, @lastFailedStatus,
    @views, @createdAt, @updatedAt
  )
`);

for (const p of oldPosts) {
  try {
    insertStmt.run({
      postId: p.id,
      status: 'PUBLISHED',
      version: 1,
      category: p.category || '생활용품',
      title: p.title || '',
      summary: p.content || '',
      thumbnail: p.imageUrl || '',
      intro: '',
      outro: '',
      coupangLink: p.coupangLink || '',
      coupangHtml: p.coupangIframe || '',
      errorInfo: '',
      lastFailedStatus: '',
      views: p.views || 0,
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (e) {
    if (e.message.includes('UNIQUE constraint failed')) {
      // ignore duplicates
    } else {
      console.error(e);
    }
  }
}
console.log(`Migrated ${oldPosts.length} old posts to V2.`);

// 4. Update ZENOBEN thumbnail path
newDb.prepare("UPDATE posts_v2 SET thumbnail = '/images/zenoben/thumbnail.png' WHERE postId = 'POST-ZENOBEN'").run();

// Rename file
try {
  fs.renameSync('public/images/zenoben/썸네일.png', 'public/images/zenoben/thumbnail.png');
} catch(e) {}
