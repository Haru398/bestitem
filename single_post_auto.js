const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dyson-digital-slim',
  category: '가전',
  title: '손목 부담 없는 프리미엄 청소! 다이슨 디지털 슬림 무선 청소기 추천',
  sourceDir: 'D:\\정식홈페이지자동화\\다이슨 디지털 슬림 무선 청소기',
  backupDir: 'D:\\정식서버업로드전용폴더\\다이슨 디지털 슬림 무선 청소기',
  link: 'https://link.coupang.com/a/eNaLkh5vqK',
  iframe: '<iframe src="https://coupa.ng/cnz7RF" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png'],
  intro: '집안일의 큰 비중을 차지하는 청소 시간, 조금이라도 더 편하고 효율적으로 끝내고 싶은 마음은 누구나 똑같습니다. 하지만 기존의 프리미엄 청소기들은 강력한 흡입력을 얻는 대신 무거운 무게로 인해 손목과 어깨에 무리를 주는 경우가 많았습니다. 매일 반복되는 청소가 고된 노동처럼 느껴지신다면, 가벼움과 강력한 퍼포먼스를 동시에 만족시키는 타협 없는 혁신, **다이슨 디지털 슬림 무선 청소기**를 만나보실 때입니다.\n\n이 제품은 이름에서 알 수 있듯 기존 모델 대비 크기와 무게를 획기적으로 줄이면서도 다이슨 특유의 압도적인 청소 성능은 그대로 유지한 스마트한 가전입니다. 여성이나 노약자도 한 손으로 번쩍 들어 올릴 수 있을 만큼 가벼운 1.9kg의 초경량 무게는 천장이나 높은 선반 위 청소까지 거뜬하게 만들어줍니다. 청소의 패러다임을 바꿀 다이슨 디지털 슬림만의 차별화된 성능과 매력적인 기능들을 자세히 살펴보겠습니다.',
  sections: [
    { img: '1.png', text: '다이슨 디지털 슬림의 가장 눈에 띄는 특징은 바로 \'기존 V11 모델 대비 30% 작아지고 30% 가벼워진 본체\'입니다. 콤팩트한 사이즈와 1.9kg에 불과한 가벼운 무게 덕분에 장시간 청소에도 손목에 전해지는 피로감이 현저히 적습니다. 특히 한국인의 평균 체형에 맞게 인체공학적으로 설계된 짧고 가벼운 완드는 바닥 청소뿐만 아니라 소파 밑, 침대 밑, 커튼 위 등 손이 닿기 힘든 구석구석까지 자유롭게 움직이며 청소할 수 있는 쾌적한 환경을 제공합니다.' },
    { img: '2.png', text: '무게가 가벼워졌다고 해서 흡입력까지 타협하지 않았습니다. 최대 120,000rpm으로 회전하는 작고 강력한 다이슨 하이퍼디미엄 모터와 11개의 고효율 싸이클론 기술이 결합되어, 미세한 먼지부터 눈에 보이는 큰 입자의 쓰레기까지 놓치지 않고 강력하게 빨아들입니다. 작지만 매서운 흡입력은 카펫 속 깊숙이 박힌 반려동물의 털이나 미세먼지까지 깔끔하게 제거하여 언제나 쾌적한 실내 공기를 유지해 줍니다.' },
    { img: '3.png', text: '스마트폰처럼 한눈에 청소기의 상태를 파악할 수 있는 LCD 스크린이 탑재되어 사용 편의성을 극대화했습니다. 현재 청소 모드(일반, 미디엄, 부스트)와 남은 사용 시간, 필터 유지보수 시기, 심지어 이물질 막힘 알림까지 실시간으로 디스플레이에 표시되어 더욱 직관적이고 효율적인 청소가 가능합니다. 또한 원터치로 먼지통을 비울 수 있는 위생적인 포인트 앤 슈트 메커니즘을 적용하여 먼지에 손을 대지 않고도 깔끔하게 뒷정리를 마칠 수 있습니다.' }
  ],
  outro: '매일 하는 청소, 더 이상 손목에 무리를 주며 고생할 필요가 없습니다. 압도적인 가벼움으로 청소의 시작과 끝을 가뿐하게 만들어주면서도, 당신이 기대하는 프리미엄 청소기의 강력한 흡입력은 고스란히 담아냈습니다. 청소 시간을 노동이 아닌 가벼운 산책처럼 바꿔줄 **다이슨 디지털 슬림 무선 청소기**와 함께 스마트하고 쾌적한 라이프스타일을 완성해 보세요. 뛰어난 실용성과 성능을 모두 갖춘 훌륭한 선택이 될 것입니다.',
  summary: '손목 부담 없는 프리미엄 청소! 다이슨 디지털 슬림 무선 청소기 추천'
};

function sanitizeString(str) {
  return str.replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
}

const publicImgDir = path.join(__dirname, 'public', 'images');

const thumbnailExt = path.extname(product.images[0]);
const thumbnailFilename = sanitizeString(product.id) + '_thumb' + Date.now() + thumbnailExt;
const thumbnailDest = path.join(publicImgDir, thumbnailFilename);
fs.copyFileSync(path.join(product.sourceDir, product.images[0]), thumbnailDest);
const thumbnailUrl = '/images/' + thumbnailFilename;

const additionalImageUrls = [];
const additionalImages = product.images.slice(1);

for (let i = 0; i < additionalImages.length; i++) {
  const ext = path.extname(additionalImages[i]);
  const filename = sanitizeString(product.id) + '_' + i + '_' + Date.now() + ext;
  const dest = path.join(publicImgDir, filename);
  fs.copyFileSync(path.join(product.sourceDir, additionalImages[i]), dest);
  additionalImageUrls.push('/images/' + filename);
  
  if (product.sections[i]) {
    product.sections[i].imagePath = '/images/' + filename;
  }
}

const stmtPost = db.prepare(`
  INSERT INTO posts_v2 (postId, title, category, summary, thumbnail, coupangLink, coupangHtml, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
`);

stmtPost.run(
  product.id,
  product.title,
  product.category,
  product.summary,
  thumbnailUrl,
  product.link,
  product.iframe
);

const stmtIntro = db.prepare('INSERT INTO post_sections (postId, sectionOrder, text, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
stmtIntro.run(product.id, 0, product.intro);

let order = 1;
const stmtSec = db.prepare('INSERT INTO post_sections (postId, sectionOrder, image, text, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
for (const sec of product.sections) {
  if (sec.imagePath) {
    stmtSec.run(product.id, order++, sec.imagePath, sec.text);
  }
}

const stmtOutro = db.prepare('INSERT INTO post_sections (postId, sectionOrder, text, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
stmtOutro.run(product.id, order++, product.outro);

if (!fs.existsSync(product.backupDir)) {
  fs.mkdirSync(product.backupDir, { recursive: true });
}

const files = fs.readdirSync(product.sourceDir);
for (const file of files) {
  fs.copyFileSync(path.join(product.sourceDir, file), path.join(product.backupDir, file));
  fs.unlinkSync(path.join(product.sourceDir, file));
}
fs.rmdirSync(product.sourceDir);
console.log('Processed:', product.id);

const wb = xlsx.readFile('D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

for (let row of data) {
  if (row['폴더이름'] === '다이슨 디지털 슬림 무선 청소기') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');

if (fs.existsSync('.next')) {
  fs.rmSync('.next', { recursive: true, force: true });
}
console.log('Cleaned .next directory via JS');
