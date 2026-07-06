const fs = require('fs');
const path = require('path');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const wb = xlsx.readFile('D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
let found = false;
data.forEach((row, idx) => {
  if (idx > 0 && row[0] && row[4] !== 'O') {
    const dirPath = path.join('D:\\정식홈페이지자동화', row[0]);
    if (fs.existsSync(dirPath) && !found) {
      console.log('--- TARGET ---');
      console.log('Row: ' + idx);
      console.log('Folder: ' + row[0]);
      console.log('Link: ' + row[1]);
      console.log('Iframe: ' + row[2]);
      found = true;
    }
  }
});
if (!found) console.log('NO_VALID_TARGET_FOUND');
throw new Error("ABORT_DAEMON_INTENTIONALLY");
