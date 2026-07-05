const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-playclean-mold-remover',
  category: '생활/주방',
  title: '욕실 실리콘 곰팡이 완벽 제거! 거품형 플레이클린 곰팡이제거제 원리와 사용법',
  sourceDir: 'D:\\정식홈페이지자동화\\플레이클린 초강력 곰팡이제거제, 4개, 500ml',
  backupDir: 'D:\\정식서버업로드전용폴더\\플레이클린 초강력 곰팡이제거제, 4개, 500ml',
  link: 'https://link.coupang.com/a/e6X3SdlLOK',
  iframe: '<iframe src="https://coupa.ng/cnPezF" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '환기가 어려운 겨울철이나 습도가 높은 장마철, 욕실과 베란다 구석구석 피어오르는 검은 곰팡이는 단순한 미관상 문제를 넘어 호흡기 질환과 알레르기의 주범이 됩니다. 시중에 수많은 청소 세제가 있지만, 실리콘이나 타일 줄눈에 깊게 뿌리내린 곰팡이를 뿌리 뽑기란 쉽지 않습니다. 문지르고 닦아내는 힘든 노동 없이, 뿌리기만 하면 검은 자국이 마법처럼 사라지는 강력한 세정력으로 입소문을 타고 있는 \'플레이클린 초강력 곰팡이제거제\'의 차별화된 성분과 탁월한 제거 효과를 집중적으로 분석해보겠습니다.',
  sections: [
    { img: '1.jpg', text: '플레이클린 곰팡이제거제의 가장 강력한 무기는 타사 제품 대비 월등히 높은 농도로 배합된 \'활성 염소산나트륨\' 성분입니다. 이 특수 성분이 곰팡이의 포자벽을 단숨에 파괴하고 내부의 단백질을 분해하여, 표면에 묻어있는 곰팡이뿐만 아니라 실리콘 깊숙이 박혀버린 시커먼 뿌리까지 완벽하게 녹여 없애줍니다. 아무리 문질러도 지워지지 않던 오래된 곰팡이 자국도 이 제품 앞에서는 흔적도 없이 사라집니다.' },
    { img: '2.jpg', text: '일반적인 액체형 스프레이 제품들은 뿌리자마자 벽면을 타고 줄줄 흘러내려 곰팡이와 접촉하는 시간이 짧고 세정력이 떨어지는 단점이 있었습니다. 하지만 플레이클린은 특수 고안된 \'초밀착 거품(폼) 분사 트리거\'를 채택했습니다. 쫀쫀하고 밀도 높은 거품이 벽면이나 천장, 경사진 타일 줄눈에 찰싹 달라붙어 흘러내리지 않고 오랜 시간 머물며 곰팡이 포자에 치명적인 살균 효과를 극대화합니다.' },
    { img: '3.jpg', text: '사용 방법 또한 혁신적으로 간편합니다. 솔이나 수세미를 들고 팔이 떨어져라 박박 문지를 필요가 전혀 없습니다. 곰팡이가 핀 부위에 충분히 거품을 분사한 뒤, 오염도에 따라 약 20분에서 1시간 정도 그대로 방치해 두기만 하면 됩니다. 시간이 지난 후 샤워기로 가볍게 물만 헹궈내면, 마법처럼 하얗게 변한 실리콘과 타일 줄눈을 확인할 수 있어 욕실 청소에 들어가는 시간과 체력을 획기적으로 줄여줍니다.' },
    { img: '4.jpg', text: '독한 락스 냄새에 머리가 아팠던 경험이 있으신가요? 플레이클린은 강력한 세정력을 유지하면서도 특유의 자극적인 염소 냄새를 최소화하는 독자적인 배합 비율을 찾아내어, 사용 시 눈이 따갑거나 호흡기가 불편한 증상을 대폭 완화했습니다. 또한 500ml 대용량 제품 4개가 한 세트로 구성되어 있어 욕실, 주방 싱크대, 세탁실, 베란다 창틀 등 집안 곳곳에 아낌없이 팍팍 사용할 수 있는 든든한 가성비를 자랑합니다.' }
  ],
  outro: '플레이클린 초강력 곰팡이제거제는 지긋지긋한 화장실 곰팡이와의 전쟁에 종지부를 찍어줄 최고의 청소 솔루션입니다. 흘러내리지 않는 초밀착 거품, 문지를 필요 없는 노터치 세정 방식, 강력한 뿌리 제거 효과까지 곰팡이 제거에 필요한 모든 요소를 완벽하게 갖추었습니다. 이 제품 하나면 힘든 청소 스트레스에서 벗어나 언제나 호텔 욕실처럼 눈부시게 깨끗하고 위생적인 공간을 유지하실 수 있습니다.',
  summary: '욕실 실리콘 곰팡이 완벽 제거! 거품형 플레이클린 곰팡이제거제 원리와 사용법'
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
