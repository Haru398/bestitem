const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-seoulmilk-greek-yogurt',
  category: '식품',
  title: '꾸덕함의 정석! 서울우유 더진한 그릭요거트 100g 솔직 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\서울우유 더진한 그릭요거트, 100g, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\서울우유 더진한 그릭요거트, 100g, 1개',
  link: 'https://link.coupang.com/a/eM9JxB2Wqa',
  iframe: '<iframe src="https://coupa.ng/cnz7cu" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '건강한 식단 관리와 다이어트를 위해 많은 분들이 그릭 요거트를 찾고 있지만, 시중에 판매되는 수많은 제품 중 진짜 내 입맛에 맞는 완벽한 꾸덕함을 찾기란 쉽지 않습니다. 단맛이 너무 강하거나, 질감이 묽어서 실망했던 경험이 한 번쯤은 있으실 텐데요. 오직 우유 본연의 깊은 풍미와 숟가락에서 떨어지지 않는 압도적인 꾸덕함으로 수많은 다이어터와 건강식 마니아들의 정착템으로 등극한 제품이 있습니다. 바로 대한민국 유제품의 자존심, **서울우유 더진한 그릭요거트 100g**입니다.\n\n이 제품은 불필요한 첨가물을 싹 덜어내고, 질 좋은 국산 원유를 농축하여 크림치즈를 연상케 하는 묵직하고 쫀득한 텍스처를 완성했습니다. 과일이나 그래놀라를 곁들여 먹는 든든한 아침 식사 대용부터, 통밀빵에 듬뿍 발라 먹는 건강한 간식까지! 입안 가득 퍼지는 고소함과 건강함의 완벽한 밸런스를 자랑하는 서울우유 더진한 그릭요거트만의 대체 불가한 매력 포인트를 지금부터 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '더진한 그릭요거트의 가장 큰 매력은 바로 이름값 제대로 하는 \'크림치즈 수준의 극강의 꾸덕함\'입니다. 숟가락으로 듬뿍 퍼 올려서 거꾸로 뒤집어도 절대 떨어지지 않을 만큼 수분기를 쫙 빼고 밀도를 높였습니다. 입에 넣는 순간 일반 요거트에서는 절대 느낄 수 없는 묵직하고 쫀득한 텍스처가 입안을 가득 채우며, 씹을수록 농축된 우유 본연의 깊고 진한 고소함이 폭발합니다.' },
    { img: '2.jpg', text: '건강을 위해 먹는 그릭 요거트인 만큼 성분 확인은 필수입니다. 이 제품은 설탕이나 인공적인 감미료를 전혀 넣지 않은 순수한 무가당(플레인) 요거트로, 당류 섭취에 민감한 다이어터나 유지어터 분들도 안심하고 퍽퍽 퍼먹을 수 있습니다. 또한, 엄격한 품질 관리를 거친 서울우유 1등급 국산 원유만을 사용하여 원재료에 대한 신뢰도를 높였으며, 풍부한 단백질과 유산균이 듬뿍 담겨있어 장 건강과 영양 보충까지 한 번에 챙길 수 있는 완벽한 헬시푸드입니다.' },
    { img: '3.jpg', text: '순수한 플레인 맛의 꾸덕한 질감 덕분에 어떤 토핑을 곁들이냐에 따라 무궁무진한 맛의 변주가 가능합니다. 바삭한 그래놀라와 신선한 제철 과일, 달콤한 꿀이나 알룰로스를 살짝 뿌려주면 유명 카페 부럽지 않은 프리미엄 그릭요거트 볼이 뚝딱 완성됩니다. 또한 크림치즈를 완벽하게 대체할 수 있어 베이글이나 통밀 샌드위치에 듬뿍 발라 먹거나, 샐러드드레싱에 활용하는 등 일상 속 다양한 요리에 찰떡같이 어우러집니다.' }
  ],
  outro: '매일 아침 눈뜰 때마다 생각나는 건강하고 맛있는 습관! 묽고 밍밍한 가짜 그릭요거트에 지치셨다면, 압도적인 꾸덕함과 고소함으로 입맛을 사로잡을 진짜배기를 만나보실 차례입니다. 맛과 성분, 그리고 유제품 명가 서울우유의 믿을 수 있는 품질까지 모두 갖춘 **더진한 그릭요거트 100g**과 함께 당신의 식탁을 더 가볍고 건강하게 채워보세요. 깐깐한 다이어터 분들께 강력하게 추천하는 1등 인생 요거트, 지금 바로 장바구니에 담아보세요!',
  summary: '꾸덕함의 정석! 서울우유 더진한 그릭요거트 100g 솔직 리뷰'
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
  if (row['폴더이름'] === '서울우유 더진한 그릭요거트, 100g, 1개') {
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
