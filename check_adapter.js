// adapter 내부 확인
const adapterMod = require('@prisma/adapter-better-sqlite3');
const key = Object.keys(adapterMod)[0];
const Cls = adapterMod[key];
console.log('class name:', key);
console.log('type:', typeof Cls);

// dist/index.js 의 createBetterSQLite3Client 주변 코드 확인
const fs = require('fs');
const src = fs.readFileSync('./node_modules/@prisma/adapter-better-sqlite3/dist/index.js', 'utf8');
// createBetterSQLite3Client 함수 주변
const idx = src.indexOf('createBetterSQLite3Client');
console.log('\ncreate 함수 주변:\n', src.substring(idx, idx + 400));
