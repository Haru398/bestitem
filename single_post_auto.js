const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-masmarulez-ecobag',
  category: '패션잡화',
  title: '가벼운 데일리백 추천! 마스마룰즈 래빗에코백 파우치 세트 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\마스마룰즈 남녀공용 래빗에코백 + 파우치 세트',
  backupDir: 'D:\\정식서버업로드전용폴더\\마스마룰즈 남녀공용 래빗에코백 + 파우치 세트',
  link: 'https://link.coupang.com/a/eM8us8XjKS',
  iframe: '<iframe src="https://coupa.ng/cnz6p9" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '무거운 가죽 가방에 어깨가 짓눌리고, 매번 옷에 맞춰 가방을 바꿔 드는 것이 번거롭게 느껴진 적 없으신가요? 특히 짐이 많은 학생이나 직장인들, 혹은 아이와 함께 외출해야 하는 부모님들에게는 수납력 좋고 가벼운 가방이 그 무엇보다 절실합니다. 어떤 룩에나 찰떡같이 어울리면서도 깃털처럼 가볍고 실용성까지 완벽하게 챙긴 진정한 데일리백을 찾고 계신다면, 남녀노소 누구에게나 사랑받는 캐주얼 아이템 **마스마룰즈 남녀공용 래빗에코백 + 파우치 세트**를 주목해 주시기 바랍니다.\n\n이 제품은 단순한 헝겊 쪼가리 같은 흔한 에코백과는 차원이 다릅니다. 귀엽고 유니크한 토끼 모양의 디자인으로 시선을 사로잡을 뿐만 아니라, 세트로 함께 구성된 실용적인 파우치 덕분에 가방 속에서 굴러다니는 작은 소지품들을 완벽하게 정리할 수 있습니다. 튼튼한 내구성과 트렌디한 감성을 동시에 충족시켜 주며, 사계절 내내 당신의 외출을 가볍고 산뜻하게 만들어 줄 마스마룰즈 래빗에코백 세트만의 독보적인 매력 포인트를 지금부터 상세하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 에코백의 가장 큰 매력은 시선을 확 사로잡는 사랑스러운 래빗 디자인과 뛰어난 스타일링 활용도에 있습니다. 과하게 튀지 않으면서도 은은한 포인트를 주는 토끼 귀 모양의 스트랩 디테일이 밋밋할 수 있는 데일리룩에 생기를 불어넣어 줍니다. 성별에 구애받지 않는 세련된 남녀공용 디자인으로 제작되어 커플 아이템으로도 손색이 없으며, 캐주얼한 청바지는 물론이고 포멀한 슬랙스나 원피스 등 어떤 착장에도 이질감 없이 자연스럽게 스며드는 엄청난 소화력을 자랑합니다.' },
    { img: '2.jpg', text: '디자인만 예쁜 것이 아닙니다. 15인치 노트북, 두꺼운 전공서적, 아이패드, 심지어 텀블러나 얇은 겉옷까지 모두 넉넉하게 들어가는 압도적인 수납력을 자랑합니다. 내부 공간이 넓게 통으로 빠져 있어 부피가 큰 짐도 쑥쑥 편하게 넣고 뺄 수 있으며, 일반적인 에코백들이 짐을 많이 넣으면 바닥이 쳐져 안 예쁜 반면 이 제품은 탄탄한 소재감이 형태를 어느 정도 유지해 주어 짐을 가득 채워도 자연스럽고 예쁜 핏을 연출할 수 있습니다.' },
    { img: '3.jpg', text: '에코백의 고질적인 단점인 \'가방 속 뒤죽박죽 현상\'을 완벽하게 해결해 줄 구세주, 바로 세트로 함께 제공되는 다용도 파우치입니다. 에코백과 동일한 소재와 컬러감으로 통일성을 주었으며, 립스틱이나 에어팟, 차 키, 영수증 등 가방 안에서 쉽게 길을 잃는 자잘한 소지품들을 깔끔하게 분리 수납할 수 있습니다. 파우치 자체의 퀄리티도 뛰어나서 가벼운 외출 시에는 파우치 단독으로 클러치처럼 활용하기에도 아주 좋습니다.' },
    { img: '4.jpg', text: '매일 들고 다니는 데일리 백인 만큼 원단의 퀄리티와 마감 처리가 매우 중요합니다. 너무 얇아서 쉽게 찢어지거나 오염되는 저가형 캔버스 원단이 아닌, 생활 오염과 마찰에 강한 탄탄하고 밀도 높은 프리미엄 원단을 사용하여 뛰어난 내구성을 자랑합니다. 손잡이 부분과 가방 본체가 연결되는 박음질 부분 또한 매우 견고하게 이중 처리되어 있어, 무거운 전공 서적이나 노트북을 넣고 매일같이 혹사시켜도 끊어짐이나 올 풀림 걱정 없이 오랜 기간 튼튼하게 사용할 수 있습니다.' }
  ],
  outro: '가볍고 편안하게 들 수 있으면서도 스타일은 절대 포기하고 싶지 않을 때, 마스마룰즈 래빗에코백은 당신의 가장 완벽한 선택지가 될 것입니다. 귀여운 디자인, 넉넉한 수납력, 튼튼한 내구성, 그리고 센스 있는 파우치 세트 구성까지! 모든 것을 다 갖추고도 합리적인 가격대를 유지하는 이 놀라운 데일리백으로 여러분의 매일매일 이어지는 외출을 더욱 가볍고 스타일리시하게 완성해 보시길 강력히 추천합니다.',
  summary: '가벼운 데일리백 추천! 마스마룰즈 래빗에코백 파우치 세트 리뷰'
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
  if (row['폴더이름'] === '마스마룰즈 남녀공용 래빗에코백 + 파우치 세트') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
