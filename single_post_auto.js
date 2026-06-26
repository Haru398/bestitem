const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-smart-ai-glasses',
  category: '디지털',
  title: 'SF 영화가 현실로! 혁신적인 AI 스마트 안경 카메라 기능 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\스마트 안경 AI 안경 2K 카메라 800만 화소 1080P 녹화 스마트 손떨림 방지 100개국 이상 언어 번역 지원 AI대화 블루투스 5.3',
  backupDir: 'D:\\정식서버업로드전용폴더\\스마트 안경 AI 안경 2K 카메라 800만 화소 1080P 대화면 100개국어 블루투스',
  link: 'https://link.coupang.com/a/eNNSe7idNs',
  iframe: '<iframe src="https://coupa.ng/cnAo20" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '어릴 적 SF 영화나 첩보물에서나 보던, 안경을 쓰고 세상을 스캔하며 AI와 대화하는 장면이 마침내 우리의 일상 속 현실로 성큼 다가왔습니다. 그동안 스마트 안경이라고 하면 투박한 디자인이나 조악한 카메라 성능 때문에 얼리어답터들의 전유물로만 여겨졌지만, 최근 혁신적인 기술 발전과 함께 디자인과 실용성을 모두 잡은 제품들이 속속 등장하고 있는데요. 그중에서도 단연 돋보이는 가성비와 놀라운 스펙으로 무장한 화제의 아이템, **초고화질 AI 스마트 안경**을 소개합니다.\n\n이 제품은 겉보기엔 세련된 뿔테 안경과 다를 바 없지만, 안경테 안에는 2K 해상도를 지원하는 800만 화소의 초소형 카메라와 100개국 이상의 언어를 실시간으로 번역해 주는 인공지능 번역기, 그리고 최신 블루투스 5.3 기술까지 빈틈없이 집약되어 있습니다. 일상을 영화 속 한 장면으로 만들어 줄 이 놀라운 웨어러블 디바이스의 핵심 기능과 매력 포인트를 상세하게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 놀라운 기능은 안경테 정면에 감쪽같이 숨겨진 \'800만 화소의 2K 초고화질 카메라\'입니다. 스마트폰을 주머니에서 꺼낼 필요 없이, 내가 보고 있는 1인칭 시점의 생생한 순간을 1080P 해상도의 고화질 영상으로 즉시 녹화할 수 있습니다. 스마트 손떨림 방지 기능(EIS)이 탑재되어 자전거를 타거나 조깅을 하는 등 역동적인 활동 중에도 흔들림 없이 부드러운 영상을 담아내며, 여행 브이로그나 액션캠 대용으로 활용하기에 전혀 손색이 없습니다.' },
    { img: '2.jpg', text: '글로벌 시대에 필수적인 \'100개국 이상 언어 실시간 AI 번역 기능\'은 이 안경의 또 다른 핵심 무기입니다. 해외여행 중이거나 외국인 바이어와 미팅을 할 때, 상대방의 언어를 안경에 내장된 AI가 실시간으로 분석하여 자연스러운 자국어로 번역해 줍니다. 스마트폰 번역 앱을 켜고 상대방과 번갈아 가며 화면을 들여다보는 번거로움 없이, 상대방과 자연스럽게 눈을 맞추며 원활한 의사소통이 가능한 혁신적인 경험을 제공합니다.' },
    { img: '3.jpg', text: '최신 \'블루투스 5.3 칩셋\'을 탑재하여 스마트폰과의 무선 연결 안정성을 극대화했습니다. 끊김 없이 선명한 음질로 음악 감상은 물론 선명한 핸즈프리 통화가 가능하며, 안경테에 장착된 터치 패널을 가볍게 두드리는 것만으로 통화 수신, 음악 재생, 카메라 촬영, AI 음성 비서 호출 등 다양한 기능들을 직관적으로 제어할 수 있습니다. 일상생활에서 스마트폰을 꺼내는 빈도를 획기적으로 줄여주는 스마트한 핸즈프리 라이프를 선사합니다.' },
    { img: '4.jpg', text: '수많은 첨단 기술이 집약되어 있음에도 불구하고, \'일반 안경과 차이가 없는 가볍고 세련된 디자인\'을 유지한 점이 가장 큰 매력입니다. 투박하고 무거웠던 1세대 스마트 안경들의 단점을 완벽하게 극복하여 장시간 착용해도 콧대나 귀가 아프지 않은 편안한 착용감을 자랑합니다. 데일리룩에도 자연스럽게 어울리는 트렌디한 뿔테 디자인으로, 일상생활 속에서 전혀 위화감 없이 첨단 AI 라이프를 누릴 수 있습니다.' }
  ],
  outro: '스마트폰 이후 우리의 라이프스타일을 송두리째 바꿔놓을 차세대 웨어러블 디바이스의 혁신, 그 시작점에 바로 이 스마트 안경이 있습니다. 1인칭 시점의 생생한 2K 영상 녹화부터 실시간 AI 번역, 그리고 완벽한 핸즈프리 제어까지, 이 모든 첨단 기능을 하나의 안경에 담아낸 **초고화질 AI 스마트 안경**은 얼리어답터뿐만 아니라 일상의 편리함을 추구하는 모든 분들에게 강력히 추천하는 아이템입니다. 놀라운 기술의 발전을 직접 눈으로 확인해 보시길 바랍니다.',
  summary: 'SF 영화가 현실로! 혁신적인 AI 스마트 안경 카메라 기능 완벽 분석'
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
  if (row['폴더이름'] === '스마트 안경 AI 안경 2K 카메라 800만 화소 1080P 녹화 스마트 손떨림 방지 100개국 이상 언어 번역 지원 AI대화 블루투스 5.3') {
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
