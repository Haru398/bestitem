// Prisma 7 adapter 확인
const pc = require('@prisma/client');
console.log('exports:', Object.keys(pc).slice(0, 20));

// better-sqlite3 adapter 확인
try {
  const { PrismaLibSQL } = require('@prisma/adapter-libsql');
  console.log('libsql 있음');
} catch(e) {
  console.log('libsql 없음');
}

// 직접 db 접근 시도
const { PrismaClient } = pc;
const Database = require('better-sqlite3');
try {
  // Prisma 7 SQLite: adapter 방식
  const { PrismaBetterSQLite3 } = require('@prisma/adapter-better-sqlite3');
  console.log('better-sqlite3 adapter 있음');
} catch(e) {
  console.log('better-sqlite3 adapter 없음:', e.message);
}

// 현재 node_modules에서 찾기
const fs = require('fs');
const adapters = fs.readdirSync('./node_modules').filter(d => d.includes('adapter'));
console.log('설치된 adapter:', adapters);
