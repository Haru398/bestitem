const Database = require('better-sqlite3');
const db = new Database('dev.db');

let guides = db.prepare('SELECT id, content FROM guides WHERE id IN (?, ?)').all('guide-rtx5060-review-2025', 'guide-sapphire-rx7600-pulse-oc-2026');

for (const guide of guides) {
  let newContent = guide.content;
  
  // Update RX 7600 YouTube ID
  if (guide.id === 'guide-sapphire-rx7600-pulse-oc-2026') {
    newContent = newContent.replace('QLvVHwtFGUo', 'TXqd5MEwjVA');
  }

  // Update RTX 5060 YouTube ID (just in case)
  if (guide.id === 'guide-rtx5060-review-2025') {
    newContent = newContent.replace('dXOY92OrwFs', 'TXqd5MEwjVA'); // use same generic one for test
  }
  
  // Replace the heading
  newContent = newContent.replace(/## 쿠팡 파트너스 최저가 확인/g, '## 실시간 최저가 확인하기');
  newContent = newContent.replace(/## 쿠팡 최저가 확인하기/g, '## 실시간 최저가 확인하기');
  
  db.prepare('UPDATE guides SET content = ? WHERE id = ?').run(newContent, guide.id);
}

console.log('✅ DB updated successfully.');
db.close();
