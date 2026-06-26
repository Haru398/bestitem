const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-foryou-gaming-pc',
  category: '디지털',
  title: '가성비 게이밍 데스크탑 추천! 포유컴퓨터 조립 PC 풀세트 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\포유컴퓨터 게이밍 컴퓨터 풀세트 조립 PC 윈도우 모니터포함 본체 데스크탑',
  backupDir: 'D:\\정식서버업로드전용폴더\\포유컴퓨터 게이밍 컴퓨터 풀세트 조립 PC 윈도우 모니터포함 본체 데스크탑',
  link: 'https://link.coupang.com/a/eNNwrKs8ce',
  iframe: '<iframe src="https://coupa.ng/cnAoUS" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.jpg', '3.jpg', '4.jpg'],
  intro: '최신 고사양 게임을 끊김 없이 즐기고 싶거나 쾌적한 재택근무 환경을 구축하고 싶지만, 컴퓨터 부품에 대한 지식이 부족해 조립 PC 구매를 망설이시는 분들이 많습니다. CPU, 그래픽카드, 램 등 복잡한 부품 호환성을 일일이 따져가며 구매하고 윈도우 설치까지 직접 해야 하는 과정은 초보자에게 큰 진입 장벽으로 다가오기 때문인데요. 이런 분들을 위해 부품 조합부터 OS 설치, 심지어 모니터와 주변기기까지 완벽하게 세팅되어 배송되는 **포유컴퓨터 게이밍 조립 PC 풀세트**를 소개합니다.\n\n이 제품은 박스에서 꺼내 선만 꽂으면 즉시 게임과 작업을 시작할 수 있는 진정한 의미의 \'풀 패키지\'입니다. 다년간의 조립 PC 노하우를 가진 포유컴퓨터의 전문가들이 엄선한 최적의 부품 조합으로 뛰어난 가성비와 안정성을 동시에 잡았으며, 철저한 검수를 거쳐 출고되기 때문에 믿고 사용할 수 있습니다. 컴퓨터를 잘 모르는 컴알못도 안심하고 구매할 수 있는 포유컴퓨터 게이밍 풀세트의 스펙과 혜택을 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '가장 큰 장점은 바로 컴퓨터 본체 하나 가격에 \'완벽한 풀세트 구성\'을 제공한다는 점입니다. 고성능 게이밍 본체는 물론이고 선명한 화질을 자랑하는 모니터, 화려한 LED 감성을 더한 게이밍 키보드와 마우스 세트, 그리고 사운드바 스피커와 마우스 장패드까지 게임을 즐기기 위해 필요한 모든 장비가 박스 하나에 담겨 옵니다. 부품을 따로따로 알아보고 구매해야 하는 번거로움과 추가 비용의 부담을 완벽하게 해결해 주는 혜자로운 구성입니다.' },
    { img: '2.jpg', text: '본체의 성능을 좌우하는 핵심 부품들은 포유컴퓨터의 전문가들이 수많은 테스트를 거쳐 엄선한 \'황금 밸런스 조합\'으로 구성되어 있습니다. 강력한 멀티태스킹 능력을 자랑하는 최신 CPU와 인기 온라인 게임들을 쾌적하게 구동할 수 있는 외장 그래픽카드, 그리고 넉넉한 용량의 초고속 램과 SSD가 탑재되어 병목현상 없는 쾌적한 속도를 보장합니다. 롤, 피파온라인, 발로란트 등 인기 게임을 풀옵션으로 부드럽게 즐길 수 있는 뛰어난 가성비를 자랑합니다.' },
    { img: '3.jpg', text: '초보자들이 가장 어려워하는 \'정품 윈도우 11 운영체제 세팅\'이 기본으로 완료되어 출고된다는 것도 엄청난 메리트입니다. 복잡한 윈도우 설치 과정이나 번거로운 드라이버 업데이트를 직접 할 필요 없이, 택배를 받아 전원 케이블만 연결하면 즉시 게임을 다운받고 웹서핑을 즐길 수 있습니다. 완벽하게 최적화된 상태로 배송되므로 컴퓨터를 켜자마자 전문가가 세팅한 빠르고 쾌적한 환경을 경험할 수 있습니다.' },
    { img: '4.jpg', text: '온라인으로 조립 PC를 구매할 때 가장 걱정되는 \'배송 파손과 A/S 문제\'도 안심할 수 있습니다. 충격을 완벽하게 흡수하는 특수 2중 완충 포장 시스템을 적용하여 무거운 그래픽카드와 부품들이 흔들림 없이 안전하게 배송됩니다. 또한, 구매 후 문제가 발생하더라도 본사 직영의 체계적이고 친절한 A/S 지원을 받을 수 있어, 대기업 브랜드 PC 부럽지 않은 든든한 사후 관리를 보장받으며 마음 편히 사용할 수 있습니다.' }
  ],
  outro: '컴퓨터를 잘 몰라도 최신 게임을 렉 없이 즐기고 싶은 분들, 그리고 번거로운 세팅 과정 없이 즉시 사용할 수 있는 완벽한 PC 환경을 구축하고 싶은 분들에게 이보다 더 좋은 선택은 없습니다. 전문가가 엄선한 밸런스 좋은 부품 구성에 모니터와 게이밍 기어, 그리고 윈도우 세팅까지 모두 포함된 **포유컴퓨터 게이밍 풀세트**는 가격 대비 최고의 만족감을 선사합니다. 부품 호환성 고민은 전문가에게 맡기고, 여러분은 오직 쾌적한 게임 플레이에만 집중해 보시길 바랍니다.',
  summary: '가성비 게이밍 데스크탑 추천! 포유컴퓨터 조립 PC 풀세트 분석'
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
  if (row['폴더이름'] === '포유컴퓨터 게이밍 컴퓨터 풀세트 조립 PC 윈도우 모니터포함 본체 데스크탑') {
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
