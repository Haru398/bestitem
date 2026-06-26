const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-lenovo-ideapad-2025',
  category: '디지털',
  title: '가성비 끝판왕 노트북! 레노버 2025 아이디어패드 1 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\레노버 2025 아이디어패드 1 15IJL7 15.6 셀러론 N5100클라우드그레이 · 128GB · 4GB · WIN11 S · IdeaPad 1 15IJL7',
  backupDir: 'D:\\정식서버업로드전용폴더\\레노버 2025 아이디어패드 1 15IJL7 15.6 셀러론 N5100클라우드그레이 · 128GB · 4GB · WIN11 S · IdeaPad 1 15IJL7',
  link: 'https://link.coupang.com/a/eNQtMzk0Pc',
  iframe: '<iframe src="https://coupa.ng/cnApz2" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.jpg', '4.jpg'],
  intro: '유튜브 시청, 간단한 문서 작업, 혹은 아이들 온라인 강의용 노트북이 필요한데 100만 원이 훌쩍 넘는 고사양 제품을 사기엔 부담스러우셨나요? 그렇다고 너무 저렴한 이름 모를 브랜드 제품을 구매하자니 금방 고장 날까 걱정되는 분들을 위해, 글로벌 PC 브랜드 레노버(Lenovo)가 작정하고 출시한 역대급 가성비 모델을 소개합니다. 바로 학생과 직장인들의 지갑을 지켜줄 최적의 선택, **레노버 2025 아이디어패드 1 15IJL7**입니다.\n\n이 제품은 기본적으로 윈도우 11 정품 운영체제가 탑재되어 있어 컴퓨터를 잘 모르는 초보자도 배송받은 즉시 전원만 켜면 바로 사용할 수 있는 놀라운 편의성을 자랑합니다. 15.6인치의 시원시원한 대화면을 갖추고도 세련된 클라우드 그레이 컬러의 슬림한 디자인 덕분에 언제 어디서나 당당하게 꺼내놓을 수 있는데요. 거품을 쏙 뺀 가격에 일상생활에 꼭 필요한 필수 기능들만 알차게 담아낸 레노버 아이디어패드의 놀라운 성능과 장점들을 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '이 노트북의 가장 큰 메리트는 단연 \'윈도우 11(Windows 11) S 모드가 기본 탑재\'되어 있다는 점입니다. 저렴한 가성비 노트북들은 대부분 운영체제가 미포함된 프리도스(Free-DOS) 모델이라 윈도우를 별도로 구매하고 설치해야 하는 번거로움이 있는데요. 이 제품은 운영체제 구입 비용과 설치 수고를 완벽하게 덜어주어, 기계에 익숙하지 않은 부모님이나 학생들도 박스를 열자마자 바로 쾌적한 컴퓨팅 환경을 경험할 수 있습니다.' },
    { img: '2.png', text: '웹서핑, 동영상 시청, 오피스 작업 등 일상적인 용도에 최적화된 \'인텔 셀러론 N5100 쿼드코어 프로세서\'를 장착했습니다. 답답함 없는 준수한 처리 속도를 보여주며, 팬리스(Fan-less) 설계가 적용되어 도서관이나 독서실 등 조용한 공간에서도 냉각팬 소음 눈치 볼 필요 없이 마음 편하게 사용할 수 있습니다. 전력 효율성 또한 뛰어나 한 번 충전으로 배터리가 오래 지속되어 외출 시 어댑터를 챙기는 수고를 덜어줍니다.' },
    { img: '3.jpg', text: '콘텐츠 소비에 특화된 \'15.6인치 대화면 FHD 디스플레이\'를 탑재하여 탁 트인 시원한 시야감을 제공합니다. 스마트폰이나 작은 태블릿 화면으로 눈을 찡그리며 넷플릭스나 유튜브를 시청할 필요 없이, 큼직한 화면으로 몰입감 넘치는 영상을 즐길 수 있습니다. 화면 빛 반사를 줄여주는 안티글레어 패널이 적용되어 있어 장시간 모니터를 바라보며 문서 작업을 하거나 온라인 강의를 수강해도 눈의 피로도가 현저히 적습니다.' },
    { img: '4.jpg', text: '보안과 편의성을 동시에 잡은 \'프라이버시 셔터(Privacy Shutter)\' 기능도 빼놓을 수 없는 장점입니다. 웹캠 해킹이나 실수로 인한 사생활 노출이 걱정되신다면, 물리적인 셔터를 손가락으로 가볍게 밀어 카메라 렌즈를 완벽하게 가릴 수 있습니다. 화상 회의나 온라인 수업을 들을 때는 셔터를 열고, 평소에는 닫아두어 해킹의 위협으로부터 나의 소중한 일상을 안전하게 보호할 수 있는 스마트한 기능입니다.' }
  ],
  outro: '노트북으로 고사양 게임이나 전문적인 영상 편집을 할 것이 아니라면, 굳이 비싼 돈을 들여 오버스펙의 제품을 구매할 필요가 없습니다. 윈도우 11 정품 탑재, 15.6인치 대화면, 그리고 소음 없는 무소음 설계까지! 웹서핑, 문서 작업, 인강용으로 완벽한 가성비를 뽐내는 **레노버 2025 아이디어패드 1** 한 대면 충분합니다. 낭비 없는 합리적인 소비를 원하신다면 망설임 없이 선택해 보시길 강력히 추천합니다.',
  summary: '가성비 끝판왕 노트북! 레노버 2025 아이디어패드 1 완벽 분석'
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
  if (row['폴더이름'] === '레노버 2025 아이디어패드 1 15IJL7 15.6 셀러론 N5100클라우드그레이 · 128GB · 4GB · WIN11 S · IdeaPad 1 15IJL7') {
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
