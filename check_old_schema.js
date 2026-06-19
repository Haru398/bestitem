const Database = require('better-sqlite3');
const sqlite = new Database('./dev.db.backup_20260619_143129');

const row = sqlite.prepare('SELECT * FROM posts LIMIT 1').get();
console.log('Old post structure:', row);
