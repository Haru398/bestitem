const db = require('better-sqlite3')('dev.db');
const rows = db.prepare("SELECT postId, createdAt FROM posts_v2 WHERE postId IN ('item-calobye-wpi', 'item-hetbahn-brownrice', 'item-bonappetit-catsand', 'item-ciao-churu-gourmet')").all();
console.log(rows);
