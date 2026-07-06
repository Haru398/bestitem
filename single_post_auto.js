const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-freshine-ugly-apple-3kg',
  category: '식품',
  title: '맛은 일품 가성비는 최고! 프레샤인 못난이사과 당도 및 효능 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\프레샤인 못난이사과, 3kg, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\프레샤인 못난이사과, 3kg, 1개',
  link: 'https://link.coupang.com/a/e7KVadaYYS',
  iframe: '<iframe src="https://coupa.ng/cnPwvw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '아침에 먹는 사과는 \'금(金)사과\'라는 말이 있을 정도로 우리 몸에 이로운 대표적인 과일입니다. 하지만 매일 챙겨 먹고 싶어도 요즘처럼 하늘 높은 줄 모르고 치솟는 과일 값 앞에서는 선뜻 장바구니에 담기가 망설여집니다. 가격 부담 없이 맛있는 사과를 매일 즐기고 싶은 분들을 위해 완벽한 대안으로 떠오른 제품이 있습니다. 겉모습은 조금 투박할지 몰라도 꽉 찬 과육과 달콤한 과즙만큼은 최고 등급 사과 부럽지 않은 \'프레샤인 못난이사과 3kg\'입니다. 흠집 사과에 대한 편견을 완전히 깨부수는 프레샤인 못난이사과의 압도적인 가성비와 달콤한 매력, 그리고 사과가 우리 몸에 주는 놀라운 건강 효능까지 자세히 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '겉모습에 속지 마세요, 당도는 정품 사과 그대로: \'못난이 사과\'라고 하면 맛이 없거나 덜 익은 사과일 것이라는 편견을 갖기 쉽습니다. 하지만 프레샤인 못난이사과는 재배 과정에서 나뭇가지에 살짝 긁히거나 모양이 완벽한 둥근 형태가 아닐 뿐, 맑은 햇살과 바람을 맞고 자라 당도와 영양분은 일반 정품 사과와 100% 동일합니다. 칼로 반을 가르는 순간 단단한 과육 속에서 달콤한 과즙이 뚝뚝 떨어지며, 한 입 베어 물면 입안 가득 퍼지는 진한 사과 향이 겉모습에 대한 아쉬움을 단숨에 날려버립니다.' },
    { img: '2.jpg', text: '가계부를 웃게 하는 압도적인 가성비의 3kg 구성: 매일 아침 식사 대용으로 사과를 깎아 먹거나 아이들 간식으로 챙겨주다 보면 사과 소비량이 만만치 않습니다. 이 제품은 모양이 예쁘지 않다는 이유만으로 유통 마진을 대폭 낮춰, 아주 저렴하고 합리적인 가격에 무려 3kg의 넉넉한 양을 제공합니다. 비싼 백화점 사과 하나 살 돈으로 온 가족이 일주일 내내 배불리 먹을 수 있을 만큼 가성비가 뛰어나며, 장바구니 물가에 지친 주부님들의 경제적인 부담을 확실하게 덜어주는 효자 상품입니다.' },
    { img: '3.jpg', text: '식이섬유 펙틴과 비타민의 보고, 아침 사과의 놀라운 효능: 사과 껍질 바로 밑에는 식이섬유의 일종인 \'펙틴(Pectin)\'이 아주 풍부하게 함유되어 있습니다. 펙틴은 장운동을 활발하게 촉진하여 배변 활동을 돕고 장 내 유익균을 증식시키는 데 탁월한 효과가 있어 다이어트와 변비 예방에 최고로 꼽힙니다. 또한 사과에 듬뿍 들어있는 비타민 C와 유기산 성분은 밤새 쌓인 피로 물질을 분해하고 칙칙해진 피부에 생기를 불어넣어 주므로, 바쁜 아침 커피 대신 사과 한 개를 챙겨 먹는 습관이 최고의 보약이 될 수 있습니다.' },
    { img: '4.jpg', text: '샐러드부터 잼까지, 부담 없이 즐기는 다양한 활용법: 못난이 사과의 가장 큰 장점은 가격이 저렴해 어떤 요리에도 아낌없이 팍팍 활용할 수 있다는 점입니다. 바쁜 아침 믹서기에 사과와 당근, 케일 등을 함께 넣고 갈아 마시는 건강 주스용으로 가장 인기가 높으며, 카레를 끓일 때 잘게 썰어 넣으면 은은한 천연 단맛이 카레의 풍미를 한층 끌어올려 줍니다. 또한 남은 사과를 잘게 다져 설탕과 함께 졸여 수제 사과잼을 만들면, 식빵이나 요거트에 곁들여 먹는 훌륭한 디저트로 변신합니다.' }
  ],
  outro: '프레샤인 못난이사과 3kg은 \'보기 좋은 떡이 먹기도 좋다\'라는 속담을 통쾌하게 반박하는 훌륭한 과일입니다. 비록 겉모습에 작은 흠집이 있을지언정, 그 속에는 농부의 땀방울이 맺힌 꽉 찬 달콤함과 우리 몸을 건강하게 깨워주는 자연의 에너지가 온전히 담겨 있습니다. 매일 아침 사과 한 개로 시작하는 건강한 습관을 실천하고 싶지만 가격이 부담스러우셨다면, 맛과 가성비를 모두 꽉 잡은 프레샤인 못난이사과를 선택해 보시길 적극 추천해 드립니다.',
  summary: '맛은 일품 가성비는 최고! 프레샤인 못난이사과 당도 및 효능 완벽 분석'
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
