const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-chillx-cloud-insole',
  category: '패션잡화',
  title: '오래 서 있어도 발 편한 인체공학적 구름 깔창 추천, ChillX 기능성 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\ChillX 1+1 푹신한 신발 깔창 인체공학 발편한 푹신한 구름 깔창',
  backupDir: 'D:\\정식서버업로드전용폴더\\ChillX 1+1 푹신한 신발 깔창 인체공학 발편한 푹신한 구름 깔창',
  link: 'https://link.coupang.com/a/e7KYR4Q9F6',
  iframe: '<iframe src="https://coupa.ng/cnPwvQ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '3.jpg', '5.jpg', '7.jpg', '9.jpg'],
  intro: '현대인들에게 족저근막염이나 발의 피로감은 마치 숙명처럼 따라다니는 고질병 중 하나입니다. 장시간 서서 일하는 서비스직 종사자, 매일 무거운 가방을 메고 통학하는 학생, 혹은 주말마다 등산과 골프를 즐기는 분들까지 많은 사람들이 딱딱한 신발 바닥 때문에 고통을 호소합니다. 비싼 기능성 운동화로 매번 교체하기엔 비용이 부담된다면, 신발 속에 깔아주는 것만으로도 차원이 다른 쿠션감을 선사하는 \'깔창\'이 완벽한 해결책이 될 수 있습니다. 1+1 구성으로 가성비까지 완벽하게 챙긴 \'ChillX 인체공학 푹신한 구름 깔창\'이 어떻게 우리 발의 피로를 혁신적으로 줄여주는지 그 과학적인 원리와 장점을 상세히 분석해 드립니다.',
  sections: [
    { img: '1.jpg', text: '무너진 아치를 탄탄하게 받쳐주는 인체공학적 3D 설계: 우리 발은 평평하지 않고 가운데가 움푹 파인 \'아치(Arch)\' 형태를 띠고 있습니다. 이 아치가 무너지면 걸을 때 발생하는 충격이 고스란히 무릎과 허리로 전달되어 심각한 피로감을 유발합니다. ChillX 구름 깔창은 단순한 스펀지가 아니라, 발바닥의 굴곡을 그대로 재현한 3D 입체 디자인으로 설계되었습니다. 발의 아치를 빈틈없이 채워주고 탄탄하게 지지해 주어 장시간 걷거나 서 있어도 발바닥에 가해지는 압력을 골고루 분산시켜 줍니다.' },
    { img: '3.jpg', text: '구름 위를 걷는 듯한 압도적인 충격 흡수 소재: 발뒤꿈치는 보행 시 체중의 하중을 가장 먼저, 그리고 가장 강하게 받는 부위입니다. 이 깔창의 뒤꿈치 부분에는 외부 충격을 획기적으로 흡수하고 튕겨내는 고탄성 벌집 구조의 충격 흡수 패드가 내장되어 있습니다. 딱딱한 아스팔트나 시멘트 바닥을 걸을 때 뼈와 관절로 전달되는 찌릿한 충격을 패드가 1차적으로 흡수하여 완화해 주므로, 제품의 이름 그대로 마치 폭신폭신한 구름 위를 걷는 듯한 편안한 착화감을 제공합니다.' },
    { img: '5.jpg', text: '땀이 차지 않는 뛰어난 통기성과 쾌적함: 아무리 푹신해도 바람이 통하지 않아 발에 땀이 차고 냄새가 난다면 좋은 깔창이라 할 수 없습니다. 이 제품은 표면에 촘촘한 에어홀(통풍구)이 설계되어 있으며, 땀을 빠르게 흡수하고 건조시키는 고기능성 메쉬 소재를 겉감으로 채택했습니다. 신발 속의 덥고 습한 공기는 밖으로 배출하고 외부의 시원한 공기를 순환시켜 주어 무더운 여름철이나 격렬한 스포츠 활동 중에도 발을 항상 쾌적하고 뽀송하게 유지시켜 줍니다.' },
    { img: '7.jpg', text: '내 발 사이즈에 딱 맞게 잘라 쓰는 맞춤형 커팅 선: 사람마다 발의 크기와 미세한 형태가 다르기 때문에 기성품 깔창이 내 신발에 완벽하게 맞지 않을 수 있습니다. 하지만 ChillX 깔창의 뒷면에는 사이즈별로 정확하게 재단할 수 있는 가이드라인(커팅 선)이 선명하게 그려져 있습니다. 자신이 평소 즐겨 신는 운동화나 구두의 기존 깔창을 꺼내어 이 제품 위에 겹쳐 올린 뒤, 선을 따라 가위로 쓱싹 잘라주기만 하면 내 발과 신발에 1mm의 오차도 없이 딱 맞는 나만의 맞춤형 기능성 깔창이 완성됩니다.' },
    { img: '9.jpg', text: '가족과 함께 쓸 수 있는 압도적인 가성비의 1+1 구성: 기능성 깔창 하나에 수만 원을 호가하는 타사 제품들과 달리, ChillX는 파격적인 1+1 구성으로 판매되어 압도적인 가성비를 자랑합니다. 한 세트를 구매하면 총 두 쌍의 깔창을 받아볼 수 있으므로, 매일 번갈아 신는 운동화와 구두에 각각 하나씩 넣어두거나 부부, 연인, 부모님과 함께 나누어 쓰기에도 아주 좋습니다. 비싼 신발을 새로 사는 대신, 저렴한 비용으로 헌 신발을 최고급 기능성 화로 업그레이드할 수 있는 가장 스마트한 소비입니다.' }
  ],
  outro: 'ChillX 1+1 푹신한 인체공학 구름 깔창은 발바닥의 통증과 다리의 피로감으로 고통받는 모든 분들에게 한 줄기 빛이 되어줄 혁신적인 아이템입니다. 아치를 지지하는 3D 입체 설계, 뒤꿈치를 보호하는 벌집 패드, 쾌적함을 유지하는 통기성 에어홀까지 발이 원하는 모든 기능을 완벽하게 담아냈습니다. 하루 종일 서서 일하시거나 걷는 양이 많은 분들, 그리고 족저근막염 초기 증상으로 발바닥 쿠션이 절실한 분들이라면 망설이지 말고 지금 바로 신발 속에 구름 한 점을 깔아보시길 강력하게 추천합니다.',
  summary: '오래 서 있어도 발 편한 인체공학적 구름 깔창 추천, ChillX 기능성 분석'
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
