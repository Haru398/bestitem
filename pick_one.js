const XLSX = require('xlsx');
const EXCEL_PATH = 'D:\\아이템몬스터 쿠팡전문성글\\ITEM.MONSTER_상품DB_최종.xlsx';

function pickProduct() {
  const wb = XLSX.readFile(EXCEL_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const available = data.slice(1).filter(row => {
    const name = row[0];
    const usable = row[4];
    const count = row[2] || 0;
    // 지난번에 올린 RTX 5060 제외 (이미 추천횟수가 올라갔을수도 있지만 확실히 하기 위해)
    return name && (usable === 'Y' || usable === undefined) && count === 0 && !name.includes('RTX 5060');
  });

  if (available.length > 0) {
    const picked = available[Math.floor(Math.random() * available.length)];
    console.log(JSON.stringify({ name: picked[0], iframe: picked[1] || '' }));
  } else {
    console.log(JSON.stringify({ error: 'No items available' }));
  }
}

pickProduct();
