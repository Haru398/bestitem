const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-paige-aideen-skirt',
  category: '패션',
  title: '데이트룩 완벽 코디! 여성용 페이지 에이딘 스커트 매력 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\페이지 여성용 AIDEEN SKIRT',
  backupDir: 'D:\\정식서버업로드전용폴더\\페이지 여성용 AIDEEN SKIRT',
  link: 'https://link.coupang.com/a/eNPRRSgvrE',
  iframe: '<iframe src="https://coupa.ng/cnApuc" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png'],
  intro: '완연한 봄기운이 느껴지는 요즘, 옷장 앞에서 가장 오랜 시간을 고민하게 만드는 아이템은 단연 \'스커트\'입니다. 너무 짧으면 활동하기 불편하고, 핏이 어중간하면 다리가 짧아 보이기 십상이라 내 체형에 완벽하게 맞는 인생 치마를 찾기란 여간 까다로운 일이 아닌데요. 디자인의 화려함보다 실루엣의 우아함으로 시선을 사로잡는 프리미엄 데님 브랜드 페이지(PAIGE)의 숨겨진 베스트셀러, **여성용 에이딘 스커트(AIDEEN SKIRT)**를 소개합니다.\n\n이 제품은 글로벌 패션 피플들의 사랑을 받는 프리미엄 브랜드답게 과한 디테일 없이도 입는 순간 여성스러움과 세련미를 동시에 발산하는 완벽한 핏을 자랑합니다. 캐주얼한 스니커즈부터 우아한 스틸레토 힐까지 어떤 신발과 매치하느냐에 따라 180도 다른 분위기를 연출할 수 있는 마법 같은 활용도를 보여주는데요. 올봄 당신의 옷차림에 품격을 더해 줄 페이지 에이딘 스커트의 매력 포인트를 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '이 스커트의 가장 큰 매력은 다리 라인을 가장 아름답게 보여주는 \'황금 비율의 미디-미니 기장감\'입니다. 무릎 위로 살짝 올라오는 절묘한 길이감이 허벅지의 군살은 가려주면서 종아리는 한층 길고 슬림해 보이게 만들어 주는데요. 키가 아담한 체형부터 큰 체형까지 누구나 입는 순간 완벽한 하체 비율을 완성할 수 있어, 데이트룩이나 중요한 약속이 있는 날 실패 확률 0%를 자랑하는 든든한 아이템입니다.' },
    { img: '2.png', text: '프리미엄 브랜드 페이지(PAIGE)의 독보적인 기술력이 녹아든 \'우아한 A라인 실루엣\'은 착용자의 움직임에 따라 자연스럽게 퍼지며 로맨틱한 무드를 자아냅니다. 허리는 잘록하게 잡아주면서 골반 라인을 따라 부드럽게 떨어지는 핏 덕분에, 하체 통통족의 단점은 완벽하게 커버하고 장점만을 부각시켜 줍니다. 과하게 타이트하지 않아 장시간 의자에 앉아 있어야 하는 직장인들의 오피스룩으로도 전혀 손색이 없습니다.' },
    { img: '3.png', text: '오래 입어도 변형이 없는 \'하이퀄리티 패브릭\'을 사용하여 브랜드 특유의 고급스러운 무드를 완성했습니다. 탄탄하면서도 유연하게 늘어나는 소재 덕분에 몸의 움직임에 따라 편안하게 늘어나며, 하루 종일 착용해도 구김이 잘 가지 않아 항상 깔끔한 실루엣을 유지합니다. 세탁 후에도 쉽게 늘어지거나 핏이 망가지지 않아 한 철 입고 버리는 옷이 아닌, 옷장에 오래 두고 꺼내 입을 수 있는 클래식한 가치를 선사합니다.' },
    { img: '4.png', text: '베이직하고 세련된 디자인 덕분에 \'계절을 타지 않는 무한한 스타일링\'이 가능합니다. 봄과 가을에는 셔츠나 블라우스와 매치하여 하객룩이나 데이트룩을 완성하고, 여름에는 가벼운 반팔 티셔츠와 스니커즈를 매치해 경쾌한 꾸안꾸룩을 연출할 수 있습니다. 어떤 상의와 코디해도 찰떡같이 어울리는 놀라운 소화력 덕분에 코디 고민을 덜어주는 만능 스커트 역할을 톡톡히 해냅니다.' }
  ],
  outro: '트렌드가 아무리 빠르게 변해도, 변하지 않는 우아함과 클래식한 핏을 자랑하는 기본 스커트 하나쯤은 옷장에 반드시 필요합니다. 체형 커버는 물론, 당신의 실루엣을 가장 아름답게 빛내줄 **페이지 여성용 에이딘 스커트**는 프리미엄 브랜드의 가치를 몸소 증명하는 최고의 아이템입니다. 올 시즌, 어떤 상의를 입을지 고민될 때 주저 없이 꺼내 입을 수 있는 완벽한 스커트로 당신만의 로맨틱한 스타일링을 완성해 보시길 추천합니다.',
  summary: '데이트룩 완벽 코디! 여성용 페이지 에이딘 스커트 매력 분석'
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
  if (row['폴더이름'] === '페이지 여성용 AIDEEN SKIRT') {
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
