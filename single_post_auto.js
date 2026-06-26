const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-ezviz-bc1c-cctv',
  category: '디지털',
  title: '선 없는 자유로움! 이지비즈 무선 실외용 홈캠 CCTV 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\이지비즈 BC1C 무선 배터리 메모리 내장 CCTV 홈캠 실외용',
  backupDir: 'D:\\정식서버업로드전용폴더\\이지비즈 BC1C 무선 배터리 메모리 내장 CCTV 홈캠 실외용',
  link: 'https://link.coupang.com/a/eNN3k3PpNQ',
  iframe: '<iframe src="https://coupa.ng/cnAo4A" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.png', '3.png', '4.jpg'],
  intro: '최근 전원주택이나 단독주택뿐만 아니라 농막, 창고, 심지어 캠핑장에서도 보안에 대한 중요성이 크게 대두되고 있습니다. 하지만 실외에 CCTV를 설치하려고 하면 전원 선을 끌어오는 복잡한 배선 작업과 전문가의 비싼 시공 비용 때문에 포기하는 경우가 많은데요. 이러한 골칫거리들을 완벽하게 해결하며 실외 보안 시장의 판도를 뒤바꾸고 있는 혁신적인 제품, 바로 **이지비즈(EZVIZ) BC1C 완전 무선 배터리 실외용 CCTV**입니다.\n\n이 제품은 이름 그대로 골치 아픈 전원 선도, 영상을 저장할 별도의 NVR(녹화기) 장비도 필요 없는 100% 무선 홈캠입니다. 한 번 충전으로 무려 270일간 지속되는 괴물 같은 대용량 배터리와 32GB 내장 메모리를 탑재하여, 원하는 곳 어디든 피스 몇 개만 박으면 설치가 끝나는 마법 같은 편의성을 자랑하는데요. 복잡한 설치 과정 없이 우리의 소중한 자산을 안전하게 지켜줄 이지비즈 BC1C의 놀라운 기능들을 하나씩 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 혁신은 단연 \'선이 전혀 필요 없는 100% 무선 시스템\'입니다. 무려 10,400mAh의 압도적인 대용량 리튬 배터리를 탑재하여, 완충 시 최장 270일(약 9개월) 동안 충전 스트레스 없이 사용할 수 있습니다. 전원 콘센트 위치에 얽매일 필요 없이 현관문 앞, 마당 펜스, 차고지, 심지어 전기가 들어오지 않는 농막이나 텃밭 등 내가 원하는 어느 곳이든 자유롭게 설치할 수 있는 압도적인 공간 활용성을 제공합니다.' },
    { img: '2.png', text: '별도의 SD카드를 추가로 구매하거나 매달 요금이 나가는 클라우드 서비스를 구독할 필요가 없습니다. 기기 자체에 \'32GB의 넉넉한 eMMC 스토리지 메모리가 내장\'되어 있어, 움직임이 감지될 때마다 고화질의 영상을 안전하고 빠르게 기기 내부에 저장합니다. 스마트폰 앱을 통해 언제 어디서든 저장된 녹화 영상을 끊김 없이 돌려볼 수 있으며, 메모리 용량이 꽉 차면 오래된 영상부터 순차적으로 덮어쓰며 무한 루프 녹화를 진행합니다.' },
    { img: '3.png', text: '보안 카메라의 핵심인 감시 기능 역시 탁월합니다. 단순히 화질만 좋은 것이 아니라, 어두운 칠흑 같은 밤에도 대낮처럼 선명한 컬러 영상을 제공하는 \'스마트 컬러 야간 비전\' 기능을 탑재했습니다. 2개의 내장형 스포트라이트 조명이 움직임을 감지하는 순간 주변을 환하게 밝혀주어, 불청객의 옷 색깔이나 자동차 번호판 등 결정적인 단서들을 놓치지 않고 생생하게 포착해 내는 강력한 야간 경비 능력을 자랑합니다.' },
    { img: '4.jpg', text: '야외 환경에 설치하는 기기인 만큼 비바람과 먼지를 견뎌내는 내구성은 필수입니다. 이지비즈 BC1C는 혹독한 기상 조건에도 끄떡없는 \'IP66 등급의 강력한 방수/방진 설계\'가 적용되어 있습니다. 폭우가 쏟아지는 장마철이나 먼지가 흩날리는 공사 현장, 심지어 영하의 매서운 겨울 추위 속에서도 고장 없이 365일 24시간 묵묵하게 우리 집과 재산을 지켜주는 든든한 파수꾼 역할을 수행합니다.' }
  ],
  outro: '복잡한 배선 공사와 비싼 설치비 때문에 실외 CCTV 설치를 망설이셨나요? 전원 선도, 추가 메모리 카드도 필요 없이 오직 와이파이(Wi-Fi) 연결만으로 완벽한 보안 시스템을 구축할 수 있는 **이지비즈 BC1C 무선 배터리 CCTV**가 정답입니다. 270일 지속되는 압도적인 배터리와 선명한 컬러 야간 비전, 그리고 눈비에도 끄떡없는 IP66 방수 방진까지! 100% 완전 무선의 자유로움과 강력한 보안 성능을 지금 바로 경험해 보시길 강력히 추천합니다.',
  summary: '선 없는 자유로움! 이지비즈 무선 실외용 홈캠 CCTV 분석'
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
  if (row['폴더이름'] === '이지비즈 BC1C 무선 배터리 메모리 내장 CCTV 홈캠 실외용') {
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
