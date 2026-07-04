const XLSX = require('xlsx');
const EXCEL_PATH = 'D:\\아이템몬스터 쿠팡전문성글\\ITEM.MONSTER_상품DB_최종.xlsx';

const wb = XLSX.readFile(EXCEL_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

let updated = false;
for (let i = 1; i < data.length; i++) {
  if (data[i][0] === 'SAPPHIRE 라데온 RX 7600 PULSE OC D6 8GB') {
    data[i][2] = (data[i][2] || 0) + 1; // 추천 횟수 증가
    updated = true;
    break;
  }
}

if (updated) {
  const newWs = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets[wb.SheetNames[0]] = newWs;
  XLSX.writeFile(wb, EXCEL_PATH);
  console.log('✅ Excel updated.');
} else {
  console.log('Item not found in excel.');
}
