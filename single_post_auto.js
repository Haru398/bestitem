const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-tamsa-water',
  category: '식품',
  title: '온 가족이 믿고 마시는 안심 생수! 탐사 샘물 2L 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\탐사 샘물, 2L, 12개',
  backupDir: 'D:\\정식서버업로드전용폴더\\탐사 샘물, 2L, 12개',
  link: 'https://link.coupang.com/a/eTDRg7moyO',
  iframe: '<iframe src="https://coupa.ng/cnFpQk" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg'],
  intro: '우리 몸의 70%를 차지하며 건강 유지에 가장 필수적인 요소인 물, 매일 마시는 물인 만큼 어떤 생수를 선택할지 고민이 많으실 텐데요. 시중에 수많은 브랜드의 생수들이 쏟아져 나오지만, 수원지가 불분명하거나 미네랄 성분이 부족해 아쉬움을 느끼셨던 분들이라면 주목해 주시기 바랍니다. 까다로운 수질 검사를 통과하여 온 가족이 안심하고 마실 수 있는 맑고 깨끗한 프리미엄 생수, **탐사 샘물 2L**를 소개합니다.\n\n이 제품은 깨끗한 자연이 숨 쉬는 엄선된 청정 수원지에서 끌어올려 자연 그대로의 신선함과 풍부한 미네랄을 고스란히 담아낸 것이 특징입니다. 꼼꼼한 다중 여과 시스템을 거쳐 불순물은 완벽하게 제거하고 물 본연의 깔끔하고 부드러운 목 넘김만을 남겼는데요. 우리가 매일 마시는 물의 기준을 한 단계 높여줄 탐사 샘물만의 특별한 장점들을 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '생수를 고를 때 가장 중요하게 따져봐야 할 부분은 바로 \'수원지와 수질 관리 시스템\'입니다. 탐사 샘물은 환경부의 엄격한 수질 기준을 통과한 국내 청정 지역의 암반수를 취수하여 만들어집니다. 촘촘한 마이크로 필터링 공법과 자외선(UV) 살균 및 오존 처리 등 깐깐한 정수 시스템을 거치기 때문에, 눈에 보이지 않는 미세한 불순물이나 세균 걱정 없이 아이부터 어른까지 안심하고 깨끗한 물을 마실 수 있습니다.' },
    { img: null, text: '물은 단순히 갈증을 해소하는 것을 넘어, 체내 대사를 돕는 중요한 역할을 하는데요. 탐사 샘물에는 칼슘, 칼륨, 마그네슘, 불소 등 \'우리 몸에 꼭 필요한 필수 미네랄이 균형 있게 함유\'되어 있습니다. 인위적으로 첨가물을 넣은 것이 아닌 자연 상태의 암반수가 오랜 시간 동안 머금고 있던 미네랄 성분 덕분에, 물맛이 비리지 않고 은은한 단맛과 함께 부드러운 목 넘김을 선사하여 평소 물을 잘 마시지 않는 분들도 부담 없이 섭취하기 좋습니다.' },
    { img: null, text: '집에서 요리를 할 때나 커피를 내릴 때도 생수의 역할은 매우 중요합니다. 미네랄 밸런스가 뛰어난 탐사 샘물을 사용하여 밥을 지으면 쌀알에 수분이 고르게 스며들어 윤기가 흐르고 찰진 밥맛을 완성할 수 있으며, 찌개나 국물 요리의 깊은 감칠맛을 살려줍니다. 또한, 차를 우려내거나 원두커피를 내릴 때 특유의 잡내 없이 깔끔하게 향미를 끌어올려 주어 일상생활 곳곳에서 활용도가 매우 높습니다.' },
    { img: null, text: '탐사 샘물은 2L 대용량 페트병 12개 묶음으로 구성되어 있어 \'뛰어난 가성비와 편리함\'을 자랑합니다. 무겁게 마트에서 박스째로 낑낑대며 들고 올 필요 없이 집 앞까지 편하게 배송받을 수 있으며, 4인 가족 기준으로도 넉넉하게 마실 수 있는 대용량이라 자주 주문해야 하는 번거로움을 줄여줍니다. 냉장고에 시원하게 보관해 두고 물 마시는 습관을 기르기에 최적의 조건을 갖춘 제품입니다.' }
  ],
  outro: '매일 우리 몸을 채우는 생수, 아무거나 대충 고르지 마세요. 엄격한 수질 검사와 체계적인 정수 공정을 거쳐 자연의 맑고 깨끗함을 그대로 담아낸 **탐사 샘물 2L**는 당신과 가족의 건강한 수분 섭취를 위한 가장 탁월한 선택이 될 것입니다. 믿을 수 있는 품질과 부드러운 물맛, 그리고 집 앞까지 배송되는 편리함까지 모두 갖춘 탐사 샘물로 매일매일 상쾌하고 건강한 일상을 누려보시길 강력히 추천합니다.',
  summary: '온 가족이 믿고 마시는 안심 생수! 탐사 샘물 2L 완벽 분석'
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

// Since the DB already threw an error, it rolled back implicitly or didn't insert fully, but let's delete the partial post just in case
db.prepare('DELETE FROM posts_v2 WHERE postId = ?').run(product.id);
db.prepare('DELETE FROM post_sections WHERE postId = ?').run(product.id);

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
  const imagePath = sec.img && sec.img === '1.jpg' && additionalImageUrls.length > 0 ? additionalImageUrls[0] : null;
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
  if (row['폴더이름'] === '탐사 샘물, 2L, 12개') {
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
