const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-logitech-g-pro-x-superlight-2',
  category: '가전/디지털',
  title: 'FPS 게임 장비의 끝판왕! 로지텍 G PRO X SUPERLIGHT 2 (지슈라 2) 무선 게이밍 마우스 상세 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\로지텍 PRO X SUPERLIGHT 2 무선 마우스 910-006',
  backupDir: 'D:\\정식서버업로드전용폴더\\로지텍 PRO X SUPERLIGHT 2 무선 마우스 910-006',
  link: 'https://link.coupang.com/a/e0x4r4LBKK',
  iframe: '<iframe src="https://coupa.ng/cnKCRF" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '찰나의 순간이 승패를 가르는 빡센 경쟁 게임 환경에서, 손과 혼연일체가 되는 마우스는 게이머에게 가장 중요한 무기입니다. 특히 발로란트나 오버워치 같은 하이퍼 FPS 유저들 사이에서 \'지슈라(G PRO X SUPERLIGHT)\'는 이미 전설적인 장비로 통하고 있습니다. 그리고 마침내, 전작의 아쉬운 점을 완벽하게 보완하고 완전히 새로운 차원의 성능으로 무장한 후속작 \'로지텍 G PRO X SUPERLIGHT 2(일명 지슈라 2)\'가 등장했습니다. 압도적인 초경량 설계와 차세대 센서로 무장한 이 제품이 왜 현재 최고의 무선 게이밍 마우스로 평가받는지, 상세한 스펙과 주요 특징을 하나하나 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 먼저 눈에 띄는 변화는 무려 60g이라는 경이로운 \'초경량 초정밀 디자인\'입니다. 전작보다 더욱 가벼워진 무게 덕분에 장시간 이어지는 치열한 게이밍 세션에서도 손목과 팔에 가해지는 피로감을 최소화할 수 있습니다. 무게는 줄었지만 내구성과 견고함은 그대로 유지되었으며, 매끄러운 바닥면 피트는 마우스 패드 위에서 저항감 없는 완벽한 슬라이딩과 브레이킹을 제공하여 원하는 곳에 정확히 에임을 맞출 수 있도록 돕습니다.' },
    { img: '2.jpg', text: '로지텍이 야심 차게 선보이는 차세대 \'HERO 2 센서\'가 탑재되어 마우스 추적 성능이 한계를 뛰어넘었습니다. 최대 32,000 DPI라는 경이로운 해상도와 500 IPS 이상의 추적 속도를 자랑하며, 사용자가 마우스를 들어 올리거나 기울일 때도 센서의 인식을 정밀하게 유지해 줍니다. 픽셀 단위의 미세한 움직임까지 놓치지 않고 그대로 게임 화면에 구현해 내어 압도적인 퍼포먼스 차이를 만들어냅니다.' },
    { img: '3.jpg', text: '무선 마우스의 핵심인 \'LIGHTSPEED 무선 기술\' 역시 한 단계 진화했습니다. 이전 세대 대비 더욱 안정적이고 빠른 무선 연결을 지원하여, 프로게이머들이 참여하는 오프라인 토너먼트 환경처럼 수많은 무선 신호가 혼재하는 극한의 환경에서도 끊김 없는 완벽한 응답성을 보장합니다. 유선 마우스보다 빠르다는 로지텍 무선 기술의 명성을 그대로 이어가며 플레이어에게 절대적인 신뢰감을 줍니다.' },
    { img: '4.jpg', text: '수많은 유저들의 요청이 드디어 반영되었습니다. 하단 충전 단자가 마침내 \'USB-C 타입\'으로 변경되어 범용성과 충전 편의성이 극대화되었습니다. 더 이상 전용 케이블을 찾을 필요 없이 스마트폰이나 다른 전자기기 충전 케이블로 손쉽게 충전할 수 있으며, 완충 시 무려 최대 95시간 동안 연속 사용이 가능한 짐승 같은 배터리 타임을 자랑합니다. 한 번 충전으로 주말 내내 게임에만 몰입할 수 있습니다.' }
  ],
  outro: '로지텍 G PRO X SUPERLIGHT 2 무선 마우스는 \'최고의 게이밍 마우스\'라는 타이틀에 가장 잘 어울리는 마스터피스입니다. 극강의 60g 초경량 무게, 흔들림 없는 LIGHTSPEED 무선 연결, 타의 추종을 불허하는 HERO 2 센서의 정밀함은 여러분의 게임 실력을 한 단계 더 끌어올려 줄 확실한 투자입니다. 승리를 갈망하는 진지한 게이머라면 더 이상 망설일 필요가 없습니다.',
  summary: 'FPS 게임 장비의 끝판왕! 로지텍 G PRO X SUPERLIGHT 2 (지슈라 2) 무선 게이밍 마우스 상세 분석'
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
