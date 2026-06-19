const db = require('better-sqlite3')('dev.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('=== V2 DB 테이블 목록 ===');
tables.forEach(t => console.log(' -', t.name));

// 각 테이블 컬럼 확인
const v2tables = ['posts_v2', 'post_sections', 'post_versions', 'telegram_state', 'user_sessions', 'post_locks'];
v2tables.forEach(tbl => {
  try {
    const cols = db.prepare(`PRAGMA table_info(${tbl})`).all();
    console.log(`\n[${tbl}] ${cols.length}개 컬럼:`);
    cols.forEach(c => console.log(`  ${c.name} (${c.type})`));
  } catch(e) {
    console.log(`[${tbl}] 없음: ${e.message}`);
  }
});
