const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-mocha-cnt-gold-mild',
  category: '식품',
  title: '국민 커피의 정석! 모카씨엔티 골드 마일드 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\모카씨엔티 골드 마일드 커피믹스',
  backupDir: 'D:\\정식서버업로드전용폴더\\모카씨엔티 골드 마일드 커피믹스',
  link: 'https://link.coupang.com/a/eTEEQX8FeC',
  iframe: '<iframe src="https://coupa.ng/cnFqva" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '식후에 마시는 달콤한 커피 한 잔은 피로를 싹 가시게 해주는 직장인들의 소중한 오아시스입니다. 수많은 카페 브랜드와 다양한 커피 제품들이 넘쳐나는 시대지만, 유독 노란색 스틱 커피만큼은 언제 어디서나 변함없이 우리 곁을 지키며 독보적인 사랑을 받고 있는데요. 부드러운 향과 질리지 않는 달콤함으로 대한민국 국민 커피의 자리를 굳건히 지키고 있는 절대 강자, **모카씨엔티 골드 마일드 커피믹스**를 소개합니다.\n\n이 제품은 최적의 비율로 블렌딩된 고급 원두와 부드러운 크리머, 그리고 달콤한 설탕이 황금 비율을 이루어 누구나 호불호 없이 즐길 수 있는 맛을 완성해 냈습니다. 사무실 탕비실부터 가정집 식탁, 캠핑장까지 한국인이 머무는 곳이라면 어디에나 하나쯤 구비되어 있을 정도로 압도적인 대중성을 자랑하는데요. 오랫동안 변함없는 맛으로 우리의 일상에 소소한 위로를 전해주는 골드 마일드 커피믹스의 비결을 하나씩 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '골드 마일드가 오랫동안 사랑받을 수 있었던 가장 큰 비결은 단연 \'황금 비율이 만들어낸 극강의 부드러움\'입니다. 전문가들의 수많은 테스트를 거쳐 탄생한 원두, 크리머, 설탕의 절묘한 배합은 쓴맛이나 텁텁함 없이 입안에 착 감기는 부드러운 풍미를 선사합니다. 식사 후 입가심이 필요할 때나 스트레스로 인해 달달한 위로가 필요할 때, 이 완벽한 비율의 한 잔이면 잃어버렸던 활력을 금세 되찾을 수 있습니다.' },
    { img: '2.jpg', text: '누구나 쉽게 취향에 맞춰 즐길 수 있는 \'편리한 이지컷(Easy Cut) 시스템과 설탕 조절 기능\'도 빼놓을 수 없는 장점입니다. 가위 없이도 손으로 가볍게 톡 뜯어낼 수 있는 이지컷 기술을 적용하여 바쁜 아침에도 빠르고 간편하게 커피를 탈 수 있습니다. 또한, 스틱 하단부를 손가락으로 누르면 쏟아져 나오는 설탕의 양을 조절할 수 있어, 달달한 맛을 선호하는 분부터 깔끔한 블랙에 가까운 맛을 원하는 분까지 각자의 입맛에 완벽하게 맞춰 드실 수 있습니다.' },
    { img: '3.jpg', text: '따뜻하게 마셔도, 차갑게 마셔도 변함없는 \'뛰어난 용해성과 깊은 풍미\'를 자랑합니다. 쌀쌀한 아침에는 따뜻한 물에 녹여 향긋한 아로마를 음미하며 하루를 시작하고, 무더운 여름에는 소량의 뜨거운 물에 커피를 녹인 후 얼음과 찬물을 듬뿍 넣어 시원하고 달콤한 아이스커피(일명 냉커피)로 즐기기에 완벽합니다. 계절과 날씨에 구애받지 않고 언제나 최고의 만족감을 선사하는 올라운더 음료입니다.' },
    { img: '4.jpg', text: '탕비실이나 펜션, 캠핑장 등 여럿이 모이는 곳이라면 선택이 아닌 필수로 쟁여둬야 할 \'압도적인 가성비와 넉넉한 대용량 구성\'을 자랑합니다. 대용량 박스로 구비해 두면 마트에서 낱개 상자를 여러 번 구매하는 번거로움과 비용을 크게 절약할 수 있으며, 한 번 사두면 오랫동안 든든하게 꺼내 먹을 수 있습니다. 손님이 방문했을 때 빠르게 대접하기에도 이보다 더 훌륭하고 호불호 없는 접대용 음료는 찾기 힘듭니다.' }
  ],
  outro: '트렌드가 빠르게 변하고 화려한 프리미엄 커피들이 쏟아져 나와도, 결국 우리가 가장 편안하게 찾는 맛은 익숙하고 다정한 \'그 맛\'입니다. 완벽한 황금 비율이 선사하는 부드러움과 달콤함으로 대한민국 국민들의 휴식 시간을 책임져 온 **모카씨엔티 골드 마일드 커피믹스**! 지친 하루 끝에 혹은 나른한 오후에, 언제 어디서든 따뜻한 위로와 활력을 전해주는 노란 스틱의 마법으로 여러분의 일상에 달콤한 여유를 더해보시길 강력히 추천합니다.',
  summary: '국민 커피의 정석! 모카씨엔티 골드 마일드 완벽 분석'
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
  if (row['폴더이름'] === '모카씨엔티 골드 마일드 커피믹스') {
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
