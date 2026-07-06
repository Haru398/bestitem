const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-yoplait-protein-strawberry-banana',
  category: '식품',
  title: '맛있게 채우는 단백질, 요플레 프로틴 요거트 딸기바나나 영양 성분 및 다이어트 식단 활용법',
  sourceDir: 'D:\\정식홈페이지자동화\\요플레 프로틴 요거트 딸기바나나',
  backupDir: 'D:\\정식서버업로드전용폴더\\요플레 프로틴 요거트 딸기바나나',
  link: 'https://link.coupang.com/a/e62dY0DQA0',
  iframe: '<iframe src="https://coupa.ng/cnPhnS" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.png'],
  intro: '최근 건강과 운동에 대한 관심이 높아지면서 이른바 \'단백질 열풍\'이 불고 있습니다. 하지만 시중에 판매되는 프로틴 음료 특유의 텁텁한 맛과 비린 향 때문에 꾸준히 섭취하기를 포기하는 분들도 적지 않습니다. 맛과 영양, 두 마리 토끼를 모두 잡을 수는 없을까요? 그 완벽한 해답으로 떠오른 제품이 바로 대한민국 떠먹는 요거트의 대명사 빙그레에서 출시한 \'요플레 프로틴 요거트 딸기바나나\'입니다. 우리가 사랑하는 달콤 상큼한 과일 요거트 본연의 맛은 그대로 유지하면서 고단백질을 꽉꽉 채워 넣은 이 혁신적인 제품의 영양 성분과 똑똑하게 활용하는 꿀팁을 전격 해부해 봅니다.',
  sections: [
    { img: '1.jpg', text: '계란 3개 분량의 압도적인 단백질 함량: 근육 성장에 필수적인 영양소인 단백질을 일상생활 속에서 간편하게 보충하는 것은 매우 중요합니다. 요플레 프로틴 한 병(또는 컵)에는 무려 계란 약 3개 분량(혹은 닭 가슴살 절반)에 해당하는 18g의 고함량 단백질이 들어있습니다. 바쁜 아침 식사 대용으로 섭취하거나, 헬스나 러닝 등 강도 높은 운동을 마친 후 손상된 근육을 회복하기 위한 프로틴 보충제로 활용하기에 손색이 없는 완벽한 스펙을 자랑합니다.' },
    { img: '2.jpg', text: '텁텁함 제로, 누구나 좋아하는 딸기바나나의 달콤함: 고단백 제품은 맛이 없다는 편견을 산산조각 내는 제품입니다. 남녀노소 누구나 호불호 없이 좋아하는 새콤달콤한 딸기와 부드러운 바나나의 환상적인 풍미를 그대로 살려냈습니다. 일반적인 단백질 쉐이크에서 느껴지는 특유의 분말 냄새나 입안에 남는 텁텁함이 전혀 없으며, 일반 요플레를 먹는 것처럼 상큼하고 부드러운 목 넘김 덕분에 아이들 영양 간식으로도 아주 훌륭합니다.' },
    { img: '3.jpg', text: '장 건강까지 생각한 유산균과 낮은 지방 함량: 다이어트를 하거나 식단을 관리할 때 단백질 못지않게 신경 쓰이는 것이 바로 지방과 칼로리입니다. 이 제품은 일반적인 요거트에 비해 지방 함량을 확 낮춰 칼로리 부담을 줄였으며, 장 내 유익균 증식과 원활한 배변 활동을 돕는 프로바이오틱스(유산균)가 풍부하게 함유되어 있습니다. 단백질 위주의 식단으로 인해 자칫 둔해질 수 있는 장 건강까지 한 번에 케어할 수 있는 스마트한 제품입니다.' },
    { img: '4.png', text: '시리얼, 그래놀라와 찰떡궁합인 건강한 레시피: 그냥 마셔도 훌륭하지만, 든든한 포만감을 원하신다면 약간의 응용이 필요합니다. 볼에 요플레 프로틴을 붓고 귀리나 통곡물로 만든 그래놀라, 혹은 무가당 시리얼을 듬뿍 얹어 드셔 보세요. 바삭바삭하게 씹히는 그래놀라의 식감과 요플레의 달콤함이 어우러져 고급스러운 브런치 카페의 요거트 볼 부럽지 않은 근사한 한 끼 식사가 완성됩니다. 바나나나 블루베리 등 생과일을 추가하면 비타민까지 섭취할 수 있어 더욱 완벽해집니다.' }
  ],
  outro: '빙그레 요플레 프로틴 요거트 딸기바나나는 맛있게 먹으면서 건강하게 단백질을 보충하고 싶은 현대인들의 니즈를 완벽하게 꿰뚫어 본 역작입니다. 운동 후 마시는 뻔한 프로틴 음료에 질리셨거나, 바쁜 아침 시간 식사 준비가 부담스러우시다면 이보다 더 좋은 선택지는 없을 것입니다. 다이어터들에게는 든든한 한 끼로, 아이들에게는 맛있는 영양 간식으로 온 가족이 함께 즐길 수 있는 요플레 프로틴으로 맛있는 건강 관리를 시작해 보시길 적극 추천합니다.',
  summary: '맛있게 채우는 단백질, 요플레 프로틴 요거트 딸기바나나 영양 성분 및 다이어트 식단 활용법'
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
