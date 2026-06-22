const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dahyang-smoked-duck',
  category: '식품',
  title: '밥도둑 추천! 다향 훈제오리 슬라이스 400g 성분 및 솔직 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\다향 훈제오리 슬라이스, 400g, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\다향 훈제오리 슬라이스, 400g, 1개',
  link: 'https://link.coupang.com/a/eM8US8P5tk',
  iframe: '<iframe src="https://coupa.ng/cnz6Ht" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.jpg', '4.jpg'],
  intro: '매일 저녁 "오늘 뭐 먹지?" 고민하는 주부님들, 혹은 배달 음식에 지친 자취생 여러분! 냉장고에 쟁여두면 세상 든든한 초간단 밥도둑 아이템을 찾고 계신가요? 굽기만 해도 근사한 메인 요리가 뚝딱 완성되고, 부추무침이나 쌈무 하나만 곁들이면 유명 오리고기 전문점 부럽지 않은 만찬을 즐길 수 있는 마법의 식재료가 있습니다. 바로 대한민국 훈제오리 시장을 꽉 잡고 있는 믿고 먹는 브랜드, **다향 훈제오리 슬라이스 400g**입니다.\n\n불포화지방산이 풍부하여 \'찾아서라도 먹으라\'는 말이 있을 정도로 건강에 유익한 오리고기를 집에서 참나무 향 가득한 훈제로 간편하게 즐길 수 있다니, 이보다 완벽한 단백질 보충원이 또 있을까요? 까다로운 HACCP 인증 시설에서 깨끗하게 생산되어 남녀노소 누구나 안심하고 젓가락을 들 수 있는 다향 훈제오리만의 압도적인 맛의 비결과 100% 활용 꿀팁을 지금부터 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '다향 훈제오리 슬라이스가 오랫동안 사랑받는 가장 큰 비결은 바로 \'100% 국내산 무항생제 오리고기\'만을 고집한다는 점입니다. 엄격하게 관리되는 쾌적한 환경에서 건강하게 자란 최상급 오리만을 엄선하여 사용하기 때문에 고기 자체의 신선도는 물론이고 식감부터가 남다릅니다. 질기거나 퍽퍽함 없이 입안에서 부드럽게 씹히는 고품질 오리고기의 진수를 제대로 느낄 수 있습니다.' },
    { img: '2.png', text: '오리고기 특유의 잡내를 잡고 풍미를 극대화하기 위해 다향만의 특제 비법인 \'국내산 참나무 훈연 방식\'을 적용했습니다. 인공적인 훈제 향이나 화학적인 보존료에 의존하지 않고, 진짜 참나무 톱밥을 태워 나오는 은은하고 깊은 스모크 향이 고기 속까지 쏙쏙 배어들어 있습니다. 팬에 굽는 순간 온 집안에 군침 도는 참나무 향이 퍼지며 식욕을 한껏 자극합니다.' },
    { img: '3.jpg', text: '바쁜 현대인들에게 조리 과정이 복잡한 식재료는 아무리 맛있어도 손이 가지 않습니다. 이 제품은 이미 먹기 좋은 최적의 두께인 3~4mm로 슬라이스 되어 있어 칼이나 도마를 꺼낼 필요조차 없습니다. 프라이팬에 툭 털어 넣고 노릇하게 굽기만 하거나, 전자레인지 혹은 에어프라이어에 데우기만 하면 단 3분 만에 근사한 일품요리가 완성되는 극강의 편리함을 자랑합니다.' },
    { img: '4.jpg', text: '400g의 용량은 2~3인 가구가 한 끼 식사로 푸짐하게 즐기기에 아주 완벽한 사이즈입니다. 애매하게 남아서 냉장고 구석에서 방치될 일 없이 한 번 뜯어서 남김없이 맛있게 비워낼 수 있습니다. 남은 기름에 김치와 밥을 볶아 화룡점정 볶음밥으로 마무리하거나, 월남쌈, 샌드위치, 샐러드 등 다양한 레시피에 찰떡같이 어우러져 무궁무진한 요리 활용도를 보여줍니다.' }
  ],
  outro: '입맛 없는 날, 혹은 갑자기 손님이 찾아왔을 때 냉장고에서 꺼내기만 하면 요리 고수로 만들어주는 든든한 치트키! 신선한 국내산 오리고기와 참나무 훈연의 깊은 풍미가 빚어낸 완벽한 조화, **다향 훈제오리 슬라이스 400g**으로 오늘 저녁 식탁을 푸짐하고 건강하게 채워보세요. 밥투정하는 아이들도, 입맛 까다로운 어른들도 젓가락을 멈추지 못하게 만들 최고의 밥도둑을 지금 당장 장바구니에 담아두시길 강력히 추천합니다.',
  summary: '가성비 반찬 추천! 다향 훈제오리 슬라이스 400g 솔직 리뷰'
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
  if (row['폴더이름'] === '다향 훈제오리 슬라이스, 400g, 1개') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
