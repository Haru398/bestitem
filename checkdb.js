const db = require('better-sqlite3')('dev.db');
const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table'").all();
console.log(JSON.stringify(schema, null, 2));

const latestItem = db.prepare("SELECT * FROM items ORDER BY createdAt DESC LIMIT 1").get();
console.log("\nLatest Item:", JSON.stringify(latestItem, null, 2));
