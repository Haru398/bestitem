const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-apple-pencil-pro',
  category: '디지털/가전',
  title: '작업 효율을 극대화하는 새로운 혁신! 애플펜슬 프로(Apple Pencil Pro) 핵심 기능 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\Apple 애플펜슬 프로',
  backupDir: 'D:\\정식서버업로드전용폴더\\Apple 애플펜슬 프로',
  link: 'https://link.coupang.com/a/e6WTYk1xg4',
  iframe: '<iframe src="https://coupa.ng/cnPdF7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.png', '3.png', '4.png'],
  intro: '아이패드를 생산성 도구로 활용하는 창작자와 학생들에게 애플펜슬은 없어서는 안 될 필수 아이템입니다. 그동안 애플펜슬 2세대가 오랜 시간 사랑받아 왔지만, 드디어 2024년, 완전히 새로운 차원의 편의성과 기능을 탑재한 \'애플펜슬 프로(Apple Pencil Pro)\'가 등장했습니다. 기존의 필기감을 뛰어넘어, 사용자의 미세한 제스처까지 인식하여 창작의 한계를 넓혀주는 애플펜슬 프로만의 혁신적인 4가지 핵심 기능과 변경점들을 상세히 파헤쳐보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 눈에 띄는 혁신은 단연 \'스퀴즈(Squeeze)\' 제스처입니다. 애플펜슬 프로의 본체를 가볍게 쥐어짜듯 누르면, 화면에 즉각적으로 도구 팔레트가 팝업됩니다. 기존처럼 화면 구석의 메뉴를 일일이 터치할 필요 없이, 필기나 드로잉 중에도 펜의 색상, 굵기, 도구 종류를 순식간에 변경할 수 있어 작업 속도와 효율성이 비약적으로 상승합니다.' },
    { img: '2.png', text: '정교한 드로잉을 요구하는 일러스트레이터와 디자이너를 위해 \'배럴 롤(Barrel Roll)\' 기능이 새롭게 추가되었습니다. 펜슬 내부에 탑재된 자이로스코프 센서가 펜슬을 돌리는 각도를 정밀하게 인식하여, 마치 실제 만년필이나 브러시를 쥐고 돌려가며 사용하는 것처럼 다양한 형태의 선 굵기와 방향을 완벽하게 제어할 수 있습니다.' },
    { img: '3.png', text: '디지털 기기의 한계를 극복한 \'햅틱 피드백\' 기능은 사용자 경험을 한 단계 끌어올립니다. 스퀴즈 제스처를 사용하거나 도구를 전환할 때, 그리고 화면의 스마트 도형과 정렬될 때 미세하고 정교한 진동을 손끝으로 전달합니다. 화면을 보지 않고도 내 명령이 정확하게 인식되었음을 직관적으로 느낄 수 있어, 더욱 몰입감 있는 작업 환경을 제공합니다.' },
    { img: '4.png', text: '애플 기기 사용자라면 누구나 공감할 \'펜슬 분실\'의 두려움이 이제 완벽하게 사라집니다. 애플펜슬 최초로 \'나의 찾기(Find My)\' 기능을 공식 지원하여, 소파 틈새나 복잡한 가방 속에 펜슬이 섞여 있더라도 아이폰의 나의 찾기 앱을 통해 펜슬의 정확한 위치를 실시간으로 추적하고 손쉽게 찾아낼 수 있습니다.' }
  ],
  outro: '애플펜슬 프로는 단순한 필기 도구를 넘어, 사용자의 의도를 가장 직관적이고 빠르게 화면에 구현해 내는 완벽한 창작 파트너입니다. 강력한 스퀴즈 제스처와 배럴 롤, 섬세한 햅틱 피드백, 그리고 안심할 수 있는 나의 찾기 기능까지. 아이패드 에어 M2 또는 아이패드 프로 M4 모델을 사용하신다면, 애플펜슬 프로는 여러분의 창의력을 극대화해 줄 가장 탁월한 선택이 될 것입니다.',
  summary: '작업 효율을 극대화하는 새로운 혁신! 애플펜슬 프로(Apple Pencil Pro) 핵심 기능 분석'
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
