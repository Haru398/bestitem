const db = require('better-sqlite3')('dev.db');

const post = db.prepare("SELECT id, content FROM posts WHERE id LIKE 'item-%' ORDER BY createdAt DESC LIMIT 1").get();

if (post) {
  // Remove markdown images
  const newContent = post.content.replace(/!\[.*?\]\(.*?\)/g, '');
  
  db.prepare('UPDATE posts SET content = ?, imageUrl = NULL WHERE id = ?').run(newContent, post.id);
  console.log('Removed broken images from DB');
}
