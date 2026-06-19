const db = require('./db_v2'); // wait, db_v2 is my API wrapper. It uses better-sqlite3.
const Database = require('better-sqlite3');
const sqlite = new Database('./dev.db');

try {
  console.log('Posts count:', sqlite.prepare('SELECT count(*) as c FROM posts').get().c);
} catch (e) {
  console.log('posts table not found or error:', e.message);
}

try {
  console.log('Posts V2 count:', sqlite.prepare('SELECT count(*) as c FROM posts_v2').get().c);
} catch (e) {
  console.log('posts_v2 table not found or error:', e.message);
}
