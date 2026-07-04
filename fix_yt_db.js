const Database = require('better-sqlite3');
const db = new Database('dev.db');

let guides = db.prepare('SELECT id, content FROM guides WHERE id IN (?, ?)').all('guide-rtx5060-review-2025', 'guide-sapphire-rx7600-pulse-oc-2026');

for (const guide of guides) {
  let newContent = guide.content;
  if (guide.id === 'guide-rtx5060-review-2025') {
    newContent = newContent.replace(
      /<iframe width="100%" height="315" src="https:\/\/www\.youtube\.com\/embed\?listType=search[^"]+"[^>]+><\/iframe>/g,
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/dXOY92OrwFs" frameborder="0" allowfullscreen></iframe>'
    );
  } else if (guide.id === 'guide-sapphire-rx7600-pulse-oc-2026') {
    newContent = newContent.replace(
      /<iframe width="100%" height="315" src="https:\/\/www\.youtube\.com\/embed\?listType=search[^"]+"[^>]+><\/iframe>/g,
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/QLvVHwtFGUo" frameborder="0" allowfullscreen></iframe>'
    );
  }
  
  db.prepare('UPDATE guides SET content = ? WHERE id = ?').run(newContent, guide.id);
  console.log('Updated YT embed for:', guide.id);
}

db.close();
