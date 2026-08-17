const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const file = path.join(root, 'content', 'scheduled', 'product-candidates.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const accessory = /(케이스|커버|필름|보호대|강화유리|파우치|스트랩|거치대|충전독|충전동|디지타이저|키스킨|스티커|마우스\s*피트|스케이트|교체용|호환|소모품|롤러브러시|롤러브러쉬|먼지봉투|리필|외부필터|면도날|클렌징\s*팟|메모리\s*카드|SD\s*카드|Care\s*Refresh|추가배터리|관세포함|일본어\s*설명서)/i;
const minimumPrice = {
  smartphone: 200000, tablet: 150000, laptop: 400000, smartwatch: 100000,
  tracker: 20000, audio: 50000, display: 100000, storage: 50000,
  input: 30000, webcam: 50000, charger: 20000, console: 180000,
  tv: 500000, projector: 200000, camera: 180000, drone: 180000,
  gimbal: 80000, vacuum: 150000, wetCleaner: 180000, robotVacuum: 300000,
  airCare: 90000, dehumidifier: 140000, laundry: 500000, dishwasher: 500000,
  refrigerator: 800000, cooking: 30000, blender: 50000, beverage: 100000,
  coffee: 70000, kettle: 20000, riceCooker: 100000, storageKitchen: 15000,
  hairCare: 70000, shaver: 80000, beautyDevice: 150000, oralCare: 50000,
  bikeComputer: 150000, outdoorPower: 250000, dashcam: 120000,
  carAccessory: 30000, petFeeder: 50000, petFountain: 30000,
  petCare: 30000, babyMonitor: 100000, sterilizer: 150000,
};

const kept = [];
const newlyRejected = [];
for (const candidate of data.selected) {
  const price = Number(candidate.productPrice || 0);
  const floor = minimumPrice[candidate.type] || 0;
  let reason = '';
  if (accessory.test(candidate.productName)) reason = '액세서리·호환품·해외 옵션 문구 감지';
  else if (floor && price && price < floor) reason = `본품 기준가격 미달(${price} < ${floor})`;
  if (reason) newlyRejected.push({ ...candidate, reason });
  else kept.push(candidate);
}

data.selected = kept.map((candidate, index) => ({ ...candidate, order: index + 1 }));
data.selectedCount = data.selected.length;
data.rejected.push(...newlyRejected);
data.cleanedAt = new Date().toISOString();
data.cleanRejectedCount = newlyRejected.length;
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Candidate cleanup: ${kept.length} kept, ${newlyRejected.length} newly rejected.`);
for (const item of newlyRejected) console.log(`REJECT ${item.query}: ${item.productName} (${item.reason})`);
