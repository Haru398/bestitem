const Database = require('better-sqlite3');
const db = new Database('dev.db');

const row = db.prepare("SELECT content FROM guides WHERE id = 'guide-sapphire-rx7600-pulse-oc-2026'").get();
console.log(row.content);
