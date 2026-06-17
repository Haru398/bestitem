const db = require('better-sqlite3')('dev.db');

// Find the latest post (which should be the White Dehumidifier)
const post = db.prepare('SELECT id, content FROM posts ORDER BY createdAt DESC LIMIT 1').get();

if (post) {
  // Replace the broken image with the 2nd image
  let newContent = post.content.replace('/images/white_dehumidifier_1.png', '/images/white_dehumidifier_2.png');
  
  const stmt = db.prepare('UPDATE posts SET content = @content, imageUrl = @imageUrl WHERE id = @id');
  stmt.run({
    id: post.id,
    content: newContent,
    imageUrl: '/images/white_dehumidifier_2.png'
  });
  console.log('Fixed broken image in DB');
} else {
  console.log('No post found');
}
