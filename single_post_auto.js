const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-comet-yoga-mat',
  category: '스포츠/레저',
  title: '층간소음 방지와 관절 보호! 홈트 필수품 코멧 NBR 10mm 두꺼운 요가매트 추천',
  sourceDir: 'D:\\정식홈페이지자동화\\코멧 NBR 10mm 요가매트',
  backupDir: 'D:\\정식서버업로드전용폴더\\코멧 NBR 10mm 요가매트',
  link: 'https://link.coupang.com/a/e6YyhC3ND2',
  iframe: '<iframe src="https://coupa.ng/cnPeTK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '최근 집에서 유튜브 영상을 보며 운동을 즐기는 \'홈트족\'이 늘어나면서 가장 먼저 준비해야 할 필수 아이템으로 요가매트가 손꼽히고 있습니다. 하지만 시중에 판매되는 얇은 매트들은 무릎 통증을 유발하거나 층간소음을 제대로 막아주지 못해 이웃 간의 갈등 원인이 되기도 합니다. 이런 단점들을 완벽하게 보완하여 두툼한 두께감과 푹신한 쿠셔닝으로 홈트 입문자부터 숙련자까지 모두 만족시키는 \'코멧 NBR 10mm 요가매트\'의 특장점과 소재 분석을 진행해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '홈트레이닝 시 가장 신경 쓰이는 부분은 점프 동작이나 아령을 내려놓을 때 발생하는 \'층간소음\'과 단단한 바닥에 닿는 관절의 충격입니다. 코멧 요가매트는 무려 10mm에 달하는 최적의 두께로 제작되어, 마치 침대 매트리스 위에 올라선 듯한 극강의 푹신함을 제공합니다. 플랭크나 윗몸일으키기 등 맨몸 운동 시 무릎, 척추, 팔꿈치에 가해지는 압력을 부드럽게 분산시켜 통증을 예방하고, 아파트 층간소음 걱정 없이 마음껏 운동에 집중할 수 있는 환경을 만들어 줍니다.' },
    { img: '2.jpg', text: '이 제품은 뛰어난 복원력과 내구성을 자랑하는 프리미엄 \'NBR(니트릴부타디엔고무)\' 소재로 제작되었습니다. 일반적인 PVC 매트에 비해 훨씬 가볍고 부드러우면서도 밀도가 높아, 무거운 아령을 올려두거나 강하게 밟아도 자국이 남지 않고 금세 원래 형태로 복원됩니다. 또한 땀이 떨어져도 매트 내부로 스며들지 않는 생활 방수 코팅 처리가 되어 있어, 운동 후 물티슈나 마른 수건으로 가볍게 닦아주기만 하면 언제나 위생적이고 청결하게 관리할 수 있습니다.' }
  ],
  outro: '코멧 NBR 10mm 요가매트는 관절이 약한 초보자부터 격렬한 유산소 운동을 즐기는 숙련자까지 모두를 만족시키는 홈트레이닝의 든든한 기초 공사와 같습니다. 압도적인 쿠션감으로 몸을 보호하고, 이웃의 눈치를 보지 않고 자유롭게 운동할 수 있는 완벽한 방음 효과를 선사합니다. 집안의 작은 공간을 나만의 프라이빗 헬스장으로 바꾸고 싶다면, 가성비와 성능을 모두 잡은 코멧 요가매트가 가장 현명한 선택이 될 것입니다.',
  summary: '층간소음 방지와 관절 보호! 홈트 필수품 코멧 NBR 10mm 두꺼운 요가매트 추천'
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
