const fs = require('fs');
const dir = 'C:\\Users\\my\\.gemini\\antigravity\\brain\\0096a6d6-9821-41a9-86e2-7f03765275fa';
const files = fs.readdirSync(dir)
  .filter(f => f.startsWith('media__'))
  .map(f => ({ name: f, time: fs.statSync(dir + '\\' + f).mtime.getTime() }))
  .sort((a, b) => b.time - a.time)
  .slice(0, 10);
console.log(JSON.stringify(files, null, 2));
