const db = require('better-sqlite3')('dev.db');
const rows = db.prepare('SELECT id, title FROM guides ORDER BY createdAt DESC').all();
rows.forEach(g => console.log(g.id, '|', g.title));
db.close();
