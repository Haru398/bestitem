const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-haepyo-olive-oil',
  category: '식품',
  title: '지중해의 건강함을 식탁에, 해표 압착 올리브유 900ml 등급 및 활용법 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\해표 압착 올리브유, 900ml, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\해표 압착 올리브유, 900ml, 1개',
  link: 'https://link.coupang.com/a/e615jbjWp2',
  iframe: '<iframe src="https://coupa.ng/cnPhhD" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.png', '3.png', '4.png'],
  intro: '최근 건강한 식습관을 추구하는 사람들 사이에서 지중해식 식단이 큰 주목을 받으면서, 그 식단의 핵심인 \'올리브유\'에 대한 관심이 그 어느 때보다 뜨겁습니다. 올리브유는 단순한 조미료를 넘어 각종 항산화 성분과 불포화지방산이 풍부하게 함유된 \'마시는 황금\'으로 불립니다. 하지만 시중에 판매되는 수많은 올리브유 중 어떤 제품을 선택해야 할지 막막할 때, 대한민국 주부들이 오랜 시간 가장 믿고 선택해 온 브랜드가 바로 \'해표\'입니다. 최상급 올리브 열매의 신선함을 그대로 짜낸 \'해표 압착 올리브유 900ml\'의 놀라운 영양 성분, 까다로운 제조 공정, 그리고 샐러드부터 파스타까지 건강하고 맛있게 즐기는 100% 활용법을 꼼꼼하게 짚어보겠습니다.',
  sections: [
    { img: '1.jpg', text: '스페인산 100% 프리미엄 엑스트라 버진 등급: 올리브유를 고를 때 가장 먼저 확인해야 할 것은 바로 \'등급\'입니다. 해표 압착 올리브유는 세계적인 올리브 산지로 유명한 스페인 안달루시아 지방에서 태양을 듬뿍 받고 자란 최상급 올리브만을 엄선하여 사용합니다. 수확 직후 화학적 정제 과정을 일절 거치지 않고 오직 물리적인 힘(냉압착 방식)으로만 처음 짜낸 최고 등급인 \'엑스트라 버진(Extra Virgin)\' 오일로, 산도가 0.8% 이하로 매우 낮아 올리브 특유의 짙은 향긋함과 쌉싸름한 풀향을 가장 완벽하게 느낄 수 있습니다.' },
    { img: '2.png', text: '혈관 건강을 지키는 불포화지방산 올레산의 힘: 동물성 지방에 주로 포함된 포화지방산과 달리, 올리브유의 약 70~80%는 체내에서 유익한 작용을 하는 단일 불포화지방산인 \'올레산(Oleic Acid)\'으로 이루어져 있습니다. 올레산은 혈관 속에 쌓이는 나쁜 콜레스테롤(LDL) 수치는 낮추고, 반대로 혈관 청소부 역할을 하는 착한 콜레스테롤(HDL) 수치는 높여주어 고혈압, 동맥경화 등 심혈관계 질환을 예방하는 데 탁월한 효과를 발휘합니다. 매일 아침 공복에 한 스푼씩 섭취하는 것만으로도 내 몸을 위한 훌륭한 건강 습관이 됩니다.' },
    { img: '3.png', text: '가열하지 않고 생으로 즐기는 완벽한 레시피: 엑스트라 버진 올리브유는 발연점이 낮아 고온에서 튀기거나 볶는 요리보다는 열을 가하지 않고 생으로 섭취할 때 본연의 영양소와 풍미를 가장 잘 즐길 수 있습니다. 신선한 양상추, 토마토, 모차렐라 치즈를 곁들인 카프레제 샐러드에 발사믹 식초와 함께 듬뿍 뿌려 드시거나, 갓 구운 바게트 빵을 찍어 먹는 식전 빵 소스로 활용해 보세요. 또한 완성된 알리오 올리오 파스타나 감바스 위에 마지막으로 한 바퀴 둘러주면 풍미가 폭발하는 마법 같은 맛의 변화를 경험하실 수 있습니다.' },
    { img: '4.png', text: '주방의 든든한 조력자, 900ml 실속 대용량: 올리브유는 공기나 빛에 자주 노출되면 산패되기 쉬우므로 보관이 매우 중요합니다. 해표 압착 올리브유는 산화를 최소화할 수 있는 안전한 용기에 담겨 있으며, 900ml라는 넉넉한 대용량 사이즈로 출시되어 요리를 자주 하는 가정이나 대가족 식단에서도 부담 없이 팍팍 사용할 수 있는 압도적인 가성비를 자랑합니다. 믿을 수 있는 국내 굴지의 식품 전문 기업 해표의 철저한 품질 관리를 거쳤기에 맛과 안전성 모두 100% 신뢰할 수 있는 주방의 필수템입니다.' }
  ],
  outro: '해표 압착 올리브유 900ml는 바쁜 현대인들의 식탁에 지중해의 따뜻한 햇살과 건강함을 그대로 선물해 주는 귀중한 식재료입니다. 단순히 음식을 볶고 지지는 용도를 넘어, 요리의 풍미를 한 차원 높여주고 우리 몸의 혈관 건강까지 알뜰하게 챙겨주는 진정한 웰빙 식품의 대명사라 할 수 있습니다. 매일 먹는 샐러드 한 접시, 빵 한 조각에 해표 엑스트라 버진 올리브유를 곁들여 맛있고 우아하게 나의 건강을 지키는 습관을 지금 바로 시작해 보시길 적극 추천합니다.',
  summary: '지중해의 건강함을 식탁에, 해표 압착 올리브유 900ml 등급 및 활용법 완벽 분석'
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
