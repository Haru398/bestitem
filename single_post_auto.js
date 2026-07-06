const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-k2-safety-shoes',
  category: '패션/잡화',
  title: '현장 작업자를 위한 완벽한 발 보호, 케이투세이프티 안전화 K2-67S 내구성 및 착화감 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\케이투세이프티 안전화 K2-67S',
  backupDir: 'D:\\정식서버업로드전용폴더\\케이투세이프티 안전화 K2-67S',
  link: 'https://link.coupang.com/a/e61RywS6yi',
  iframe: '<iframe src="https://coupa.ng/cnPg7M" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '건설 현장, 물류 창고, 공장 등 크고 작은 산업 재해의 위험이 도사리고 있는 작업 현장에서 작업자의 안전을 지켜주는 가장 기본적이고 필수적인 장비는 바로 \'안전화\'입니다. 무거운 물체가 떨어지거나 날카로운 못을 밟는 아찔한 순간, 발을 완벽하게 보호해 주어야만 큰 부상을 막을 수 있습니다. 수많은 안전 장비 브랜드 중에서도 압도적인 인지도와 기술력을 자랑하는 K2 Safety의 베스트셀러 \'케이투세이프티 안전화 K2-67S\'는 탁월한 안전성과 일반 운동화 못지않은 편안한 착화감으로 현장 작업자들 사이에서 \'국민 안전화\'로 불리고 있습니다. 이 제품이 왜 오랫동안 현장 필수템으로 사랑받고 있는지 그 기능적 우수성을 철저히 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '강력한 발가락 보호 토캡과 미끄럼 방지 아웃솔: 안전화의 본질은 첫째도 안전, 둘째도 안전입니다. K2-67S의 앞코 부분에는 외부의 강력한 충격이나 무거운 낙하물로부터 발가락이 으스러지는 것을 완벽하게 방어해 주는 견고한 \'스틸 토캡(Steel Toe Cap)\'이 내장되어 있습니다. 또한 기름기가 많거나 물기가 있는 미끄러운 바닥에서도 훌륭한 접지력을 발휘하는 내유성, 내마모성 특수 고무 아웃솔을 적용하여 미끄러짐으로 인한 2차 사고를 효과적으로 예방해 줍니다. 한국산업안전보건공단(KOSHA)의 엄격한 안전 인증 마크를 획득하여 품질에 대한 신뢰도를 한층 높였습니다.' },
    { img: '2.jpg', text: '장시간 작업에도 피로를 덜어주는 경량성과 통기성: 안전화는 투박하고 무겁다는 편견을 완벽하게 깨트린 제품입니다. 기존 강철 방탄 소재 대비 무게를 혁신적으로 줄인 경량 방탄 내답판을 사용하여, 하루 8시간 이상 딱딱한 현장을 누벼야 하는 작업자들의 발목과 무릎에 가해지는 피로도를 현저히 낮췄습니다. 갑피 부분에는 공기 순환이 원활한 최고급 천연 소가죽과 매쉬 소재를 적절히 믹스 매치하여 땀 배출을 돕고 쾌적한 착화감을 제공하며, 측면에 적용된 편리한 지퍼 디자인 덕분에 신발을 신고 벗는 과정조차 매우 간편합니다.' }
  ],
  outro: '케이투세이프티 안전화 K2-67S는 척박한 작업 환경 속에서도 가족을 위해 묵묵히 구슬땀을 흘리는 근로자들의 든든한 발이 되어주는 진정한 작업 파트너입니다. 타협 없는 강력한 보호 기능은 물론, 장시간 착용 시의 편안함까지 세심하게 고려된 인체공학적 설계는 K2 브랜드만의 독보적인 노하우를 증명합니다. 거친 현장에 나서는 나 자신을 위해, 혹은 땀 흘려 일하는 사랑하는 가족의 안전을 위해 내구성 좋고 발이 편한 K2 안전화를 적극 추천해 드립니다.',
  summary: '현장 작업자를 위한 완벽한 발 보호, 케이투세이프티 안전화 K2-67S 내구성 및 착화감 분석'
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
const stmtSecWithImg = db.prepare('INSERT INTO post_sections (postId, sectionOrder, image, text, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
const stmtSecNoImg = db.prepare('INSERT INTO post_sections (postId, sectionOrder, text, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');

for (let i = 0; i < product.sections.length; i++) {
  const sec = product.sections[i];
  const imagePath = sec.img ? additionalImageUrls[i] : null;
  if (imagePath) {
    stmtSecWithImg.run(product.id, order++, imagePath, sec.text);
  } else {
    stmtSecNoImg.run(product.id, order++, sec.text);
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
  if (row['폴더이름'] === path.basename(product.sourceDir)) {
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
