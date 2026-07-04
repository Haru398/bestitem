const XLSX = require('xlsx');
const wb = XLSX.readFile('D:\\아이템몬스터 쿠팡전문성글\\ITEM.MONSTER_상품DB_최종.xlsx');
console.log('Sheets:', wb.SheetNames);
wb.SheetNames.forEach(sheetName => {
  const ws = wb.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  console.log('\n=== Sheet:', sheetName, '===');
  data.slice(0, 30).forEach((r, i) => console.log(i + ':', JSON.stringify(r)));
});
