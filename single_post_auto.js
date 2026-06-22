const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-homelux-round-shelf',
  category: '가구인테리어',
  title: '공간 활용 끝판왕! 홈럭스 다용도 조립식 진열장 선반 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\홈럭스 모노 라운드 선반 다용도 조립식 진열장',
  backupDir: 'D:\\정식서버업로드전용폴더\\홈럭스 모노 라운드 선반 다용도 조립식 진열장',
  link: 'https://link.coupang.com/a/eM86KfOYHQ',
  iframe: '<iframe src="https://coupa.ng/cnz6Pd" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png'],
  intro: '방구석에 여기저기 널브러진 물건들 때문에 스트레스받고 계신가요? 수납공간이 부족해서 책상이나 바닥이 항상 너저분하다면, 지금 당장 필요한 것은 넓은 집으로 이사하는 것이 아니라 똑똑한 수납 아이템을 들이는 것입니다. 특히 좁은 원룸이나 자취방일수록 버려지는 틈새 공간을 입체적으로 활용하는 것이 핵심인데요. 답답해 보이지 않으면서도 엄청난 수납력을 자랑하며, 인테리어 효과까지 톡톡히 챙길 수 있는 완벽한 가성비 아이템, **홈럭스 모노 라운드 선반 다용도 조립식 진열장**을 강력하게 추천합니다.\n\n이 제품은 무겁고 투박한 일반 책장이나 철제 선반과는 달리, 어떤 공간에 두어도 스르르 스며드는 모던하고 깔끔한 디자인이 특징입니다. 복잡한 공구나 못질 없이 맨손으로 뚝딱 조립할 수 있어 1인 가구나 여성분들도 부담 없이 설치할 수 있으며, 주방, 욕실, 베란다, 거실 등 장소를 가리지 않고 다목적으로 활용할 수 있는 극강의 실용성을 자랑합니다. 당신의 어지러운 일상을 단숨에 정리해 줄 홈럭스 선반만의 독보적인 매력 포인트를 지금부터 하나하나 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '이 선반의 가장 큰 장점은 바로 누구나 쉽고 빠르게 완성할 수 있는 \'무볼트 100% 조립식 구조\'입니다. 드라이버나 전동 공구 등 복잡한 장비는 일절 필요하지 않으며, 각 기둥과 선반의 홈을 딱딱 맞춰서 맨손으로 끼워주기만 하면 순식간에 튼튼한 진열장이 뚝딱 완성됩니다. 이사를 가거나 가구 배치를 바꿀 때에도 힘들이지 않고 가볍게 해체할 수 있어 자취생들에게 이보다 완벽한 가구는 없습니다.' },
    { img: '2.png', text: '조립식이면 금방 부서지고 약할 것이라는 편견을 완벽하게 깨부쉈습니다. 가볍지만 견고한 프리미엄 PP(폴리프로필렌) 소재와 탄탄한 하중 분산 설계가 결합되어, 층당 무려 10kg 이상의 무거운 하중도 거뜬하게 버텨내는 엄청난 내구성을 자랑합니다. 두꺼운 전공 서적이나 무거운 주방 가전, 세탁 세제 등 부피가 크고 묵직한 물건들을 가득 올려두어도 선반이 휘거나 흔들리지 않아 안심하고 사용할 수 있습니다.' },
    { img: '3.png', text: '어느 공간에나 찰떡같이 어울리는 모던하고 미니멀한 디자인 또한 홈럭스 선반만의 놓칠 수 없는 매력입니다. 칙칙하고 저렴해 보이는 유광 플라스틱이 아닌, 세련된 무광 텍스처를 적용하여 고급스러움을 더했습니다. 날카로운 모서리 없이 부드럽게 떨어지는 라운드 마감 처리는 아이가 있는 집에서도 안전하게 사용할 수 있으며, 화이트, 그레이 등 군더더기 없는 베이직한 컬러로 출시되어 집안의 인테리어를 한층 더 깔끔하게 업그레이드해 줍니다.' },
    { img: '4.png', text: '물기와 습기에 매우 강한 특수 코팅 소재로 제작되어 장소의 제약 없이 집 안 구석구석 어디서든 활약합니다. 습기가 많은 욕실에 두고 샴푸나 수건을 정리하는 욕실 선반으로 사용해도 녹이 슬거나 곰팡이가 필 걱정이 없으며, 베란다에 두고 다육이나 화분을 올려두는 플랜테리어 진열장으로 활용하기에도 손색이 없습니다. 오염물이 묻어도 물티슈나 걸레로 슥 닦아내기만 하면 새것처럼 깔끔하게 관리할 수 있어 유지 보수 또한 매우 간편합니다.' },
    { img: '5.png', text: '사용자의 편의성을 극대화하기 위해 각 선반 층의 높이를 자유롭게 조절할 수 있는 스마트한 맞춤형 설계를 적용했습니다. 보관하려는 물건의 크기나 높이에 따라 기둥 블록을 추가하거나 빼서 단 사이의 간격을 내 마음대로 커스터마이징할 수 있습니다. 키가 큰 생수병이나 긴 부츠부터, 납작한 프라이팬이나 작은 소품들까지 남는 데드 스페이스 없이 공간을 200% 알차게 활용할 수 있습니다.' }
  ],
  outro: '정리의 기본은 물건들에게 각자의 자리를 찾아주는 것입니다. 바닥에 굴러다니던 물건들을 차곡차곡 홈럭스 선반 위로 올려두는 것만으로도 집안이 몰라보게 넓어지고 깨끗해지는 마법을 경험하실 수 있을 것입니다. 저렴한 가격 대비 압도적인 수납력과 내구성, 그리고 세련된 디자인까지 모두 갖춘 **홈럭스 모노 라운드 선반 다용도 조립식 진열장**으로 좁고 답답했던 공간에 숨결을 불어넣고 당신의 쾌적한 라이프스타일을 완성해 보세요. 지금 바로 장바구니에 담으시길 강력히 추천합니다!',
  summary: '공간 활용 끝판왕! 홈럭스 다용도 조립식 진열장 선반 리뷰'
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
  if (row['폴더이름'] === '홈럭스 모노 라운드 선반 다용도 조립식 진열장') {
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
