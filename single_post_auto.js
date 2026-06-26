const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-tcl-287l-fridge',
  category: '가전',
  title: '가성비 끝판왕! TCL 일반형 287L 2도어 냉장고 특징 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\TCL 일반형 287L 2도어 냉장고 방문설치',
  backupDir: 'D:\\정식서버업로드전용폴더\\TCL 일반형 287L 2도어 냉장고 방문설치',
  link: 'https://link.coupang.com/a/eNNdrsmdau',
  iframe: '<iframe src="https://coupa.ng/cnAoGP" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '1인 가구가 급증하고 실용성을 중시하는 미니멀 라이프가 대세로 떠오르면서, 주방 공간을 많이 차지하는 거대한 냉장고 대신 작지만 알찬 실속형 냉장고를 찾는 분들이 늘고 있습니다. 특히 원룸이나 오피스텔에 거주하는 자취생, 혹은 거실에 두고 쓸 세컨드 냉장고가 필요한 분들이라면 용량과 가격, 그리고 디자인까지 모두 만족시키는 제품을 찾기가 쉽지 않은데요. 이러한 소비자들의 니즈를 완벽하게 간파하고 놀라운 가성비로 무장하여 출시된 제품, 바로 **TCL 일반형 287L 2도어 냉장고**입니다.\n\n글로벌 가전 브랜드 TCL의 기술력이 집약된 이 제품은 287L라는 넉넉하면서도 부담 없는 용량에, 어디에나 잘 어울리는 깔끔한 디자인, 그리고 대기업 못지않은 체계적인 방문 설치 서비스까지 제공하여 1~2인 가구의 주방을 한층 스마트하게 업그레이드해 줄 최고의 선택지로 주목받고 있습니다. 합리적인 가격 속에 숨겨진 TCL 냉장고만의 탄탄한 기본기와 매력적인 기능들을 상세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 돋보이는 장점은 바로 \'효율적인 287L의 공간 활용성\'입니다. 상단은 자주 찾는 신선 식품을 보관하는 냉장실로, 하단은 넉넉한 냉동실로 구성된 클래식한 2도어 방식을 채택하여 사용이 매우 직관적입니다. 287L의 용량은 1~2인 가구가 일주일 치 식재료와 반찬, 음료 등을 넉넉하게 보관하기에 딱 알맞은 사이즈이며, 내부 선반 높낮이 조절이 자유로워 부피가 큰 수박이나 냄비 등도 공간의 낭비 없이 알차게 수납할 수 있습니다.' },
    { img: '2.jpg', text: '식재료의 신선도를 좌우하는 \'직냉식 냉각 시스템\'을 적용하여 본연의 기능에 충실했습니다. 차가운 냉기를 자연스럽게 순환시키는 직냉식 방식은 식재료의 수분 증발을 최소화하여 야채와 과일을 오랫동안 촉촉하고 싱싱하게 유지해 줍니다. 또한, 정밀한 온도 조절 다이얼을 통해 보관하는 식재료의 종류와 계절에 맞춰 최적의 냉장/냉동 온도를 간편하게 설정할 수 있어 맞춤형 신선 보관이 가능합니다.' },
    { img: '3.jpg', text: '미니멀리즘 인테리어에 완벽하게 부합하는 \'슬림하고 세련된 디자인\' 또한 놓칠 수 없는 매력 포인트입니다. 유행을 타지 않는 깔끔한 화이트 컬러와 군더더기 없이 매끄러운 플랫 도어 디자인은 원룸이나 좁은 주방, 심지어 거실이나 사무실에 두어도 전혀 위화감 없이 모던한 분위기를 연출합니다. 컴팩트한 폭과 깊이 덕분에 좁은 틈새 공간에도 쏙 들어가며, 손잡이가 외부로 돌출되지 않은 히든 핸들을 적용하여 동선의 방해 없이 깔끔함을 극대화했습니다.' },
    { img: '4.jpg', text: '가격 거품을 쫙 뺀 합리적인 가격대임에도 불구하고, 대기업 가전제품에서나 기대할 수 있는 \'전문 기사 방문 설치 서비스\'를 기본으로 제공합니다. 무거운 냉장고를 현관문 앞에 덩그러니 두고 가는 배송이 아니라, 전문 설치 기사님이 원하시는 날짜에 직접 방문하여 원하는 위치에 안전하게 배치하고 수평 조절부터 폐가전 수거(선택 시)까지 완벽하게 마무리해 줍니다. 배송부터 설치까지 스트레스 제로를 경험할 수 있습니다.' }
  ],
  outro: '거대한 크기와 비싼 가격의 양문형 냉장고가 부담스러우셨거나, 부족한 냉장 공간을 채워줄 든든한 서브 냉장고가 필요하시다면 더 이상 고민할 필요가 없습니다. 실속 있는 287L의 용량, 신선함을 지켜주는 탄탄한 냉각 성능, 공간을 살려주는 모던한 디자인, 그리고 친절한 방문 설치 서비스까지 모두 갖춘 **TCL 일반형 2도어 냉장고**는 그야말로 가성비의 끝판왕입니다. 똑똑한 소비로 주방의 품격을 높이고 더욱 신선하고 쾌적한 일상을 시작해 보시길 추천합니다.',
  summary: '가성비 끝판왕! TCL 일반형 287L 2도어 냉장고 특징 분석'
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
  if (row['폴더이름'] === 'TCL 일반형 287L 2도어 냉장고 방문설치') {
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
