const Database = require('better-sqlite3');
const sqlite = new Database('./dev.db.backup_20260619_143129');

try {
  console.log('Old DB Posts count:', sqlite.prepare('SELECT count(*) as c FROM posts').get().c);
} catch (e) {
  console.log('posts table not found or error:', e.message);
}
