const db = require('better-sqlite3')('dev.db');

const post = db.prepare(`SELECT * FROM posts WHERE title LIKE '%LG 휘센 오브제컬렉션 에어컨%' ORDER BY createdAt DESC LIMIT 1`).get();

if (post) {
  let newContent = post.content;
  
  // Replace the HTML img tags with Markdown image syntax
  newContent = newContent.replace(/<img\s+src="([^"]+)"\s+alt="([^"]+)"[^>]*\/>/g, '![$2]($1)');
  
  const stmt = db.prepare(`UPDATE posts SET content = @content WHERE id = @id`);
  stmt.run({ content: newContent, id: post.id });
  console.log('Fixed image rendering in LG AC post');
} else {
  console.log('Post not found');
}
