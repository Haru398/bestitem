const db = require('better-sqlite3')('dev.db');
const cols = db.prepare('PRAGMA table_info(guides)').all();
console.log('guides columns:');
cols.forEach(c => console.log(' -', c.name, c.type));
db.close();
