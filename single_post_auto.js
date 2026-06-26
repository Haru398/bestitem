const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-linalucy-floral-perfume',
  category: '뷰티',
  title: '사랑스러운 플로럴 향! 리나루시 미스 퍼퓸 향수 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\리나루시 미스 플로럴 퍼퓸 향수 여자 사랑스러운 향기',
  backupDir: 'D:\\정식서버업로드전용폴더\\리나루시 미스 플로럴 퍼퓸 향수 여자 사랑스러운 향기',
  link: 'https://link.coupang.com/a/eNPwuK3lGm',
  iframe: '<iframe src="https://coupa.ng/cnApqK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png'],
  intro: '향기는 누군가의 첫인상을 결정짓고, 오랫동안 그 사람을 기억하게 만드는 강력한 힘을 가지고 있습니다. 수많은 향수들 중에서도 유독 지나가는 사람을 뒤돌아보게 만들고, 주변 사람들로부터 "무슨 향수 써요?"라는 질문을 받게 만드는 특별한 향기가 있는데요. 독보적인 사랑스러움과 우아함으로 SNS를 뜨겁게 달구며 2030 여성들의 인생 향수로 등극한 **리나루시 미스 플로럴 퍼퓸**을 소개합니다.\n\n이 제품은 뻔하고 흔한 인공적인 꽃향기가 아닌, 이슬을 머금은 새벽 장미 정원에 서 있는 듯한 생생하고 입체적인 향기를 선사합니다. 첫 향의 싱그러움부터 포근하게 남는 잔향까지, 시간의 흐름에 따라 드라마틱하게 변하는 매력적인 향취를 자랑하는데요. 데이트, 소개팅, 혹은 특별하게 보이고 싶은 날 나만의 무기가 되어줄 리나루시 미스 퍼퓸의 매혹적인 향수 노트를 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '리나루시 미스 플로럴 퍼퓸의 가장 큰 매력은 프랑스 그라스 지방의 수석 조향사가 섬세하게 디자인한 \'프리미엄 3단계 향수 노트\'에 있습니다. 탑 노트에서는 상큼하고 달콤한 피오니와 자몽 향이 톡톡 터지며 기분 좋은 첫인상을 남기고, 시간이 지날수록 미들 노트의 우아한 로즈와 자스민 향이 풍성하게 피어나며 여성스러움을 극대화합니다. 그리고 마지막 베이스 노트에서는 부드러운 화이트 머스크가 포근하게 피부를 감싸 안으며 잊을 수 없는 아련한 잔향을 남깁니다.' },
    { img: '2.png', text: '오 드 퍼퓸(Eau de Parfum) 등급의 부향률을 적용하여 \'하루 종일 지속되는 놀라운 지속력\'을 자랑합니다. 아침에 외출하기 전 손목이나 귀 뒤에 가볍게 한두 번 펌핑하는 것만으로도, 오후 늦게까지 은은한 잔향이 내 살내음처럼 자연스럽게 지속됩니다. 수시로 덧뿌릴 필요가 없어 가성비가 뛰어나며, 움직일 때마다 바람을 타고 은은하게 퍼지는 고급스러운 향기가 당신의 매력을 하루 종일 빈틈없이 지켜줍니다.' },
    { img: '3.png', text: '향수병 자체만으로도 훌륭한 오브제가 되는 \'고급스럽고 러블리한 바틀 디자인\'은 화장대 위를 환하게 밝혀줍니다. 투명하고 영롱한 유리 바틀 속에 찰랑이는 은은한 핑크빛 수색은 시각적인 만족감을 더해주며, 목 부분에 장식된 앙증맞은 리본 디테일이 사랑스러움을 완성합니다. 나를 위한 특별한 선물은 물론, 다가오는 기념일이나 생일을 맞은 여자친구, 아내, 혹은 소중한 지인에게 마음을 전하기 위한 선물용으로도 완벽한 선택이 될 것입니다.' }
  ],
  outro: '나만의 시그니처 향기를 찾지 못해 향수 유목민 생활을 하고 계셨다면, 이제 정착할 시간입니다. 달콤한 과일 향과 우아한 꽃향기, 그리고 포근한 머스크가 완벽한 하모니를 이루는 **리나루시 미스 플로럴 퍼퓸**은 당신의 평범한 일상을 영화 속 로맨틱한 한 장면으로 바꿔줄 것입니다. 과하지 않으면서도 은은하게 사람의 마음을 끌어당기는 사랑스러운 향기의 마법을 직접 피부로 경험해 보시길 강력히 추천합니다.',
  summary: '사랑스러운 플로럴 향! 리나루시 미스 퍼퓸 향수 완벽 분석'
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
  if (row['폴더이름'] === '리나루시 미스 플로럴 퍼퓸 향수 여자 사랑스러운 향기') {
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
