const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-razer-deathadder-v3-pro',
  category: '가전/디지털',
  title: '비대칭 게이밍 마우스의 정점! 레이저 데스애더 V3 프로 (Razer DeathAdder V3 Pro) 무선 마우스 완벽 해부',
  sourceDir: 'D:\\정식홈페이지자동화\\레이저 DeathAdder V3 Pro 마우스',
  backupDir: 'D:\\정식서버업로드전용폴더\\레이저 DeathAdder V3 Pro 마우스',
  link: 'https://link.coupang.com/a/e0yg46vYtM',
  iframe: '<iframe src="https://coupa.ng/cnKCYm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.jpg', '5.jpg', '6.jpg', '7.png'],
  intro: '수많은 프로게이머들이 \'인생 마우스\'로 꼽는 비대칭 게이밍 마우스의 전설, 레이저 데스애더(DeathAdder) 시리즈가 완전히 새로운 폼팩터와 압도적인 성능으로 진화하여 돌아왔습니다. 전 세계 천만 대 이상의 판매고를 올리며 e스포츠 역사상 가장 상징적인 마우스로 자리 잡은 데스애더 라인업의 최신작, \'레이저 데스애더 V3 프로(Razer DeathAdder V3 Pro)\'는 기존의 무거운 무게와 부피감을 혁신적으로 개선한 것이 특징입니다. 인체공학적 설계의 정수를 보여주는 완벽한 그립감부터, 초경량 63g의 날렵함까지 게이머의 한계를 시험하게 해 줄 데스애더 V3 프로의 모든 스펙을 집중적으로 분석해 보았습니다.',
  sections: [
    { img: '1.png', text: '기존 데스애더 유저들이 가장 환호할 만한 변화는 바로 \'디자인의 전면적인 재설계\'입니다. 세계 최고의 e스포츠 프로게이머들과의 긴밀한 협업을 통해, 기존 모델의 뭉툭했던 느낌을 덜어내고 그립감을 한층 더 섬세하게 다듬었습니다. 손바닥에 부드럽게 감기는 최적화된 비대칭 곡선은 장시간의 격렬한 게이밍 환경에서도 피로를 최소화하며, 팜 그립이나 클로 그립 등 어떤 파지법을 사용하더라도 손과 마우스가 하나가 된 듯한 궁극의 일체감을 선사합니다.' },
    { img: '2.png', text: '무게 역시 혁명적으로 가벼워졌습니다. 불필요한 군더더기를 모두 덜어낸 63g의 울트라 라이트급 초경량 설계는, 전작(V2 Pro) 대비 무려 25% 이상 가벼워진 수치입니다. 단순히 구멍을 뚫어 타공 마우스를 만드는 꼼수를 쓰지 않고, 매끄럽고 견고한 풀 커버 하우징을 유지하면서도 이토록 가벼운 무게를 구현해 냈다는 점은 레이저의 압도적인 기술력을 증명합니다. 덕분에 손목에 무리 없이 빠른 플릭 샷과 에임 트래킹이 가능해졌습니다.' },
    { img: '3.png', text: '마우스의 심장부에는 레이저가 자랑하는 최상위 센서, \'Focus Pro 30K 광학 센서\'가 탑재되었습니다. 최대 30,000 DPI와 750 IPS의 경이로운 추적 속도를 제공하며, 유리 표면을 포함한 그 어떤 마우스 패드 위에서도 픽셀 단위의 미세한 움직임을 완벽하게 인식합니다. AI 기반의 비대칭 컷오프 기능은 마우스를 들고 내릴 때의 센서 인식 높이를 사용자의 습관에 맞게 26단계로 미세 조정할 수 있어, 찰나의 에임 튀는 현상조차 원천 차단합니다.' },
    { img: '4.jpg', text: '레이저 \'HyperSpeed 무선 기술\'은 유선 마우스를 뛰어넘는 지연 없는 완벽한 무선 연결을 자랑합니다. 다른 무선 기기들의 간섭이 심한 PC방이나 오프라인 대회장에서도 신호 끊김 없이 안정적인 1ms 응답 속도를 유지합니다. 또한, 옵션으로 구매할 수 있는 \'HyperPolling Wireless Dongle\'을 연결하면 기존 1,000Hz 폴링 레이트를 무려 4배 빠른 4,000Hz(0.25ms)로 끌어올려, 상상을 초월하는 부드럽고 빠른 응답성을 경험할 수 있습니다.' },
    { img: '5.jpg', text: '버튼 클릭감 역시 대폭 개선되었습니다. 3세대 \'레이저 광학 마우스 스위치\'가 적용되어 물리적인 접점 부품 없이 빛으로 클릭을 인식합니다. 따라서 더블 클릭(더블 탭) 고장 문제가 발생할 확률을 0%로 줄였으며, 9천만 번의 엄청난 클릭 내구성을 자랑합니다. 클릭할 때마다 느껴지는 경쾌하고 쫀득한 반발력은 게임의 타격감을 한층 배가시켜 줍니다.' },
    { img: '6.jpg', text: '배터리 효율 또한 빼놓을 수 없는 장점입니다. 초경량 설계임에도 불구하고 전력 효율이 극대화되어 한 번의 완전 충전으로 최대 90시간 동안 연속 사용이 가능합니다. 최신 USB-C 타입 포트가 적용되어 빠르고 편리하게 충전할 수 있으며, 배터리가 부족한 급박한 상황에서도 충전 케이블을 꽂은 채로 이질감 없이 게임을 계속 플레이할 수 있습니다.' },
    { img: '7.png', text: '이 제품은 화려한 RGB 조명을 과감히 배제하고 오직 \'승리\'라는 본질적인 기능에만 100% 집중한 순수 성능 지향형 게이밍 기어입니다. 표면은 그립 테이프 없이도 미끄러짐을 방지해 주는 특수 코팅 마감 처리가 되어 있어 땀이 많은 유저들도 쾌적하게 사용할 수 있습니다. 승리를 향해 단 1%의 성능 향상도 놓치고 싶지 않은 진지한 게이머들에게, 데스애더 V3 프로는 다른 어떤 마우스로도 대체할 수 없는 최고의 선택이 될 것입니다.' }
  ],
  outro: '레이저 데스애더 V3 프로는 그립감, 무게, 센서 성능, 스위치 내구성 등 모든 측면에서 타협 없이 정점을 찍은 게이밍 마우스입니다. 특히 비대칭 마우스의 편안함을 선호하면서도 초경량 무선 마우스의 민첩함까지 동시에 원하는 하이퍼 FPS 유저들에게 이보다 더 완벽한 제품을 찾기란 쉽지 않을 것입니다. 여러분의 게임 라이프를 완전히 뒤바꿔 놓을 단 하나의 장비를 찾고 있다면 주저 없이 선택하시길 바랍니다.',
  summary: '비대칭 게이밍 마우스의 정점! 레이저 데스애더 V3 프로 (Razer DeathAdder V3 Pro) 무선 마우스 완벽 해부'
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
