const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-icerun-cool-scarf-neck-cooler-5ea',
  category: '스포츠/레저',
  title: '목에 두르는 에어컨! 아이스런 쿨스카프 넥쿨러 5개입 리얼 사용기',
  sourceDir: 'D:\\정식홈페이지자동화\\아이스런 쿨스카프 아이스 넥쿨러 쿨링 넥밴드 5개입',
  backupDir: 'D:\\정식서버업로드전용폴더\\아이스런 쿨스카프 아이스 넥쿨러 쿨링 넥밴드 5개입',
  link: 'https://link.coupang.com/a/e7LZx3o2Oy',
  iframe: '<iframe src="https://coupa.ng/cnPwDw" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '4.jpg', '5.jpg', '7.jpg'],
  intro: '사람의 체온을 가장 빠르고 효과적으로 낮추는 방법은 굵은 혈관이 지나가는 \'목\' 주변을 차갑게 식혀주는 것입니다. 숨이 턱턱 막히는 한여름, 야외에서 땀 흘려 일하시거나 레저 스포츠를 즐기시는 분들 사이에서 \'얼음 목걸이\'라 불리며 폭발적인 인기를 끌고 있는 제품이 있습니다. 바로 물에 담그기만 하면 냉매가 빵빵하게 부풀어 올라 장시간 시원함을 유지해 주는 \'아이스런 쿨스카프 넥쿨러\'입니다. 세탁하여 반영구적으로 사용할 수 있는 친환경 냉각 원리와 피부에 자극 없는 부드러운 소재, 그리고 가족이나 동료들과 함께 나누기 좋은 대용량 5개입 구성의 완벽한 가성비까지 모두 갖춘 이 제품의 매력을 낱낱이 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '물만 있으면 OK! 신비의 고분자 냉매 폴리머 기술: 아이스런 쿨스카프의 핵심 기술은 내부에 촘촘하게 들어있는 \'고분자 냉매 폴리머(Polymer)\' 알갱이에 있습니다. 평소에는 납작하고 가벼운 상태지만, 차가운 물에 3~5분 정도 푹 담가두면 수분을 스펀지처럼 흡수하여 통통하게 팽창합니다. 이렇게 팽창한 냉매가 목 주변의 열기를 흡수하면서 서서히 증발하는 기화열 원리를 통해 최대 10시간 이상 얼음장 같은 냉기를 지속적으로 방출합니다. 배터리 충전이나 냉동실이 필요 없이 수돗물이나 생수만 있으면 언제 어디서든 즉각적으로 시원함을 느낄 수 있는 초간편 시스템입니다.' },
    { img: '2.jpg', text: '100% 무독성 소재로 연약한 피부에도 안심: 목은 피부가 얇고 예민하여 까칠한 원단이나 화학물질이 닿으면 쉽게 붉어지고 트러블이 발생합니다. 이 제품은 피부 자극이 전혀 없는 부드러운 고급 순면(Cotton) 원단과 인체에 무해한 100% 무독성 냉매를 사용하여 제작되었습니다. 땀을 흠뻑 흘리는 격렬한 야외 활동 중에도 목에 쓸림 현상이 없으며, 끈적임 없이 쾌적한 촉감을 유지해 줍니다. 어린이 안전 인증까지 완벽하게 통과한 제품이므로 땀띠로 고생하는 아이들의 목에 둘러주기에도 아주 훌륭한 여름 필수템입니다.' },
    { img: '4.jpg', text: '세탁 후 무한 재사용이 가능한 친환경 반영구 수명: 한 번 쓰고 버리는 일회용 쿨팩이나 쿨패치는 환경 오염은 물론 비용적인 부담도 만만치 않습니다. 하지만 아이스런 넥쿨러는 오염되었을 때 가볍게 손세탁하여 그늘에 말려주면 내부의 냉매가 다시 원래의 납작한 상태로 돌아가며, 필요할 때 물에 담그면 언제든 새것처럼 다시 팽창합니다. 원단이 찢어지지 않는 이상 반영구적으로 무한 재사용이 가능하기 때문에 환경을 보호하는 것은 물론 여름철 유지비를 획기적으로 절약할 수 있는 아주 경제적인 친환경 아이템입니다.' },
    { img: '5.jpg', text: '남녀노소 누구나 딱 맞는 넉넉한 길이와 예쁜 디자인: 아무리 시원해도 착용감이 불편하거나 디자인이 투박하면 손이 가지 않게 마련입니다. 이 넥쿨러는 목에 한 바퀴 두르고도 리본을 묶을 수 있을 만큼 넉넉한 기장(약 100cm)으로 제작되어 체격이 큰 남성부터 어린아이들까지 누구나 조임 없이 편안하게 착용할 수 있습니다. 또한 스포티하고 세련된 패턴부터 심플한 단색까지 다양한 디자인 라인업을 갖추고 있어 밋밋한 등산복이나 골프웨어에 스타일리시한 포인트 액세서리 역할까지 톡톡히 해냅니다.' },
    { img: '7.jpg', text: '가족, 동료와 나누기 좋은 5개입 대용량 실속 세트: 뙤약볕 아래서 고생하는 현장 작업자분들이나 주말마다 단체로 등산을 즐기는 산악회 회원들에게 가장 환영받는 이유 중 하나는 바로 \'압도적인 가성비\'입니다. 이 제품은 시중의 단품 가격과 비교할 수 없을 정도로 저렴한 가격에 총 5개의 넥쿨러를 하나의 세트로 구성했습니다. 아빠의 건설 현장에 하나, 엄마의 주방에 하나, 아이들 체육 시간에 하나씩 온 가족이 사이좋게 나누어 쓰거나 땀에 젖었을 때 번갈아 가며 교체하기에 가장 완벽한 실속형 구성입니다.' }
  ],
  outro: '아이스런 쿨스카프 넥쿨러 5개입 세트는 다가오는 기록적인 폭염에 대비하는 가장 작지만 강력한 무기입니다. 전기나 배터리 없이 차가운 물 한 컵만으로 한여름 가마솥더위를 날려버릴 수 있는 이 놀라운 제품 하나면, 온열 질환의 두려움 없이 마음껏 야외 활동을 즐기실 수 있습니다. 시원함은 물론 피부 안전성, 반영구적 수명, 압도적인 5개입 가성비까지 모두 잡은 이 제품을 올여름 외출 필수품으로 강력하게 추천해 드립니다.',
  summary: '목에 두르는 에어컨! 아이스런 쿨스카프 넥쿨러 5개입 리얼 사용기'
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
