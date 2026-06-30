const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-msi-pro-b650m',
  category: '디지털',
  title: '강력한 전원부와 미친 가성비! MSI PRO B650M-A 메인보드 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\MSI PRO B650M-A',
  backupDir: 'D:\\정식서버업로드전용폴더\\MSI PRO B650M-A',
  link: 'https://link.coupang.com/a/eTFdoL81Uy',
  iframe: '<iframe src="https://coupa.ng/cnFqQC" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '최신 AMD 라이젠 7000 시리즈 또는 8000 시리즈 CPU로 새롭게 PC를 구성할 때, 시스템의 심장 역할을 하는 메인보드 선택은 성능과 안정성을 좌우하는 가장 중요한 요소입니다. 하지만 쏟아지는 B650 칩셋 보드들 사이에서 어떤 제품을 골라야 할지 막막하셨다면, 하드웨어 커뮤니티에서 가성비 끝판왕으로 입을 모아 칭찬하는 제품에 주목해 주시기 바랍니다. 탄탄한 전원부와 뛰어난 확장성으로 게이머와 전문가 모두를 만족시키는 **MSI PRO B650M-A**를 소개합니다.\n\n이 제품은 화려한 RGB 감성이나 불필요한 부가 기능을 덜어내고, 오직 \'메인보드의 본질적인 퍼포먼스와 내구성\'에 집중하여 가격 거품을 확 빼낸 실속형 모델입니다. 비즈니스 환경뿐만 아니라 고사양 게이밍 PC 조립 시에도 전혀 부족함이 없는 스펙을 자랑하여, 조립 PC 견적에 단골로 등장하는 베스트셀러인데요. 왜 수많은 소비자들이 MSI PRO B650M-A를 최고의 선택으로 꼽는지 그 압도적인 장점들을 하나씩 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '메인보드의 급을 나누는 가장 중요한 기준은 바로 CPU에 전력을 공급하는 전원부 설계입니다. 이 제품은 동급 가격대에서 보기 힘든 \'강력한 8+2+1 페이즈 전원부와 프리미엄 초크\'를 탑재하여, 하이엔드급 라이젠 CPU를 장착하더라도 전압 강하 없이 안정적이고 칼같은 전력을 공급합니다. 이를 통해 무거운 작업을 하거나 장시간 고사양 게임을 구동할 때도 시스템 다운 없이 최상의 퍼포먼스를 유지할 수 있습니다.' },
    { img: '2.jpg', text: '발열 제어 능력 또한 매우 탁월합니다. 전원부 모스펫에서 발생하는 열을 빠르게 식혀주기 위해 \'대형 알루미늄 방열판(히트싱크)과 M.2 쉴드 프로져(Shield Frozr)\'를 기본으로 제공합니다. 뜨거운 그래픽카드와 CPU 사이에서도 메인보드의 온도를 낮게 유지하여 스로틀링(성능 저하 현상)을 방지하며, 값비싼 고성능 NVMe SSD를 장착해도 발열로 인한 속도 저하 없이 쾌적한 데이터 전송 속도를 보장합니다.' },
    { img: '3.jpg', text: '미래를 대비한 \'최신 차세대 규격과 뛰어난 확장성\'을 완벽하게 지원합니다. 초고속 데이터 전송을 위한 PCIe 4.0 슬롯을 제공하여 최신 고성능 그래픽카드와 M.2 SSD의 잠재력을 100% 끌어낼 수 있으며, 최대 6400MHz 이상의 고클럭 DDR5 메모리 오버클럭을 안정적으로 지원하여 전체적인 시스템 반응 속도를 비약적으로 향상시킵니다. 4개의 램 슬롯을 통해 메모리 용량 업그레이드도 매우 용이합니다.' },
    { img: '4.jpg', text: '초보자도 쉽게 다룰 수 있는 \'직관적인 바이오스와 다양한 편의 기능\'이 돋보입니다. 클릭 바이오스 5를 통해 마우스 클릭만으로 손쉽게 PBO(자동 오버클럭)와 램 타이밍을 설정할 수 있으며, 시스템에 문제가 발생했을 때 직관적인 LED 불빛으로 고장 원인을 알려주는 EZ 디버그 LED 기능이 탑재되어 있어 셀프 조립에 도전하는 분들도 당황하지 않고 쉽게 문제를 진단하고 대처할 수 있습니다.' }
  ],
  outro: 'AM5 소켓을 지원하는 메인보드를 찾고 계시다면 더 이상 고민할 필요가 없습니다. 겉치레보다는 오직 탄탄한 기본기와 뛰어난 성능에 집중한 **MSI PRO B650M-A**는 한정된 예산으로 최고의 게이밍 및 작업용 PC를 구축하고자 하는 분들에게 완벽한 해답을 제시합니다. 든든한 전원부와 훌륭한 발열 제어 능력을 갖춘 MSI의 명작 보드와 함께, 여러분의 PC 시스템을 가장 안정적이고 강력하게 업그레이드해 보시길 강력히 추천합니다.',
  summary: '강력한 전원부와 미친 가성비! MSI PRO B650M-A 메인보드 완벽 분석'
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
  if (row['폴더이름'] === 'MSI PRO B650M-A') {
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
