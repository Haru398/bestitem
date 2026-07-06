const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-lifecombine-mens-belt',
  category: '패션잡화',
  title: '가성비 끝판왕 남자 정장 벨트 추천, 라이프컴바인 1+1 가죽 허리띠 디테일 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\라이프컴바인 1+1 남성벨트 남자 허리띠 정장 가죽',
  backupDir: 'D:\\정식서버업로드전용폴더\\라이프컴바인 1+1 남성벨트 남자 허리띠 정장 가죽',
  link: 'https://link.coupang.com/a/e7K6F2joHs',
  iframe: '<iframe src="https://coupa.ng/cnPwxb" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '3.jpg', '5.jpg', '7.jpg', '9.jpg'],
  intro: '성공적인 비즈니스 룩을 완성하는 데 있어 \'벨트\'는 넥타이 구두만큼이나 중요한 역할을 차지합니다. 아무리 값비싼 정장을 차려입었더라도 허리춤에 낡고 해진 벨트를 매고 있다면 전체적인 스타일과 신뢰도를 떨어뜨리는 원인이 됩니다. 하지만 매일 정장을 입는 직장인들의 경우 벨트의 마모 속도가 빨라 주기적으로 교체해 주어야 하는데, 고가의 브랜드 제품을 매번 구매하기엔 경제적인 부담이 큽니다. 이러한 남성들의 현실적인 고민을 완벽하게 해결해 주며 직장인 커뮤니티에서 \'가성비 끝판왕\'으로 입소문 난 제품이 있습니다. 고급스러운 가죽 소재에 1+1이라는 파격적인 구성까지 갖춘 \'라이프컴바인 남성 정장 벨트\'의 매력적인 디테일을 하나하나 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '어떤 정장에도 찰떡같이 어울리는 모던 클래식 디자인: 남자 벨트의 생명은 유행을 타지 않는 깔끔하고 클래식한 디자인입니다. 라이프컴바인 정장 벨트는 군더더기 없이 심플하게 떨어지는 라인과 절제된 미학의 무광 버클을 채택하여, 포멀한 블랙 정장부터 세미 캐주얼한 네이비 슬랙스까지 어떤 착장에도 완벽하게 녹아듭니다. 화려한 로고나 장식을 배제하여 튀지 않으면서도 은은한 고급스러움을 풍기기 때문에 20대 사회 초년생의 첫 출근 룩부터 40대 중년 직장인의 데일리 오피스 룩까지 전 연령대를 아우르는 폭넓은 소화력을 자랑합니다.' },
    { img: '3.jpg', text: '오래 매어도 갈라짐 없는 탄탄한 내구성의 프리미엄 인조가죽: 저가형 벨트를 구매했다가 한두 달 만에 가죽 겉면이 흉하게 벗겨지거나 구멍 주변이 찢어져 버린 경험, 남성분들이라면 누구나 한 번쯤 있으실 겁니다. 이 제품은 리얼 가죽의 부드러운 질감을 그대로 재현하면서도 스크래치와 오염에 훨씬 강한 프리미엄 인조 가죽 소재를 사용하여 제작되었습니다. 매일 앉았다 일어났다를 반복하는 험한 직장 생활 속에서도 가죽이 쉽게 갈라지거나 주름지지 않아 오랫동안 처음 샀을 때의 깔끔한 컨디션을 유지할 수 있습니다.' },
    { img: '5.jpg', text: '누구나 손쉽게 허리둘레에 맞춰 자를 수 있는 맞춤형 핏: 사람마다 체형이 다르고 뱃살이 나오는 정도가 다르기 때문에 기성품 벨트는 구멍 위치가 애매하게 안 맞는 경우가 많습니다. 라이프컴바인 벨트는 버클 뒷면에 위치한 고정 핀을 위로 젖혀 가죽 스트랩을 쉽게 분리할 수 있도록 설계되었습니다. 벨트가 자신의 허리둘레보다 길다면, 가위로 필요한 만큼 스트랩 끝부분을 싹둑 잘라낸 뒤 다시 버클에 끼워 고정하기만 하면 됩니다. 번거롭게 수선집에 갈 필요 없이 집에서 단 1분 만에 내 몸에 딱 맞는 맞춤 벨트를 완성할 수 있습니다.' },
    { img: '7.jpg', text: '정교한 마감 처리와 부드러운 버클 착용감: 벨트를 착용하고 풀 때 버클이 뻑뻑하거나 핀이 구멍에 잘 들어가지 않으면 아침 출근길마다 은근한 스트레스가 됩니다. 이 제품은 핀 버클 방식을 채택하여 누구나 직관적이고 빠르게 벨트를 체결할 수 있으며, 버클의 모서리 부분을 부드럽게 라운드 처리하여 피부에 닿거나 옷감에 쓸릴 때 발생할 수 있는 손상을 최소화했습니다. 또한 스트랩 측면을 매끄럽게 감싸는 기리메(엣지코트) 마감 처리를 아주 꼼꼼하게 진행하여 제품의 전체적인 완성도와 퀄리티를 한층 끌어올렸습니다.' },
    { img: '9.jpg', text: '하나 사면 하나 더! 압도적인 경제성의 1+1 혜택: 매일 정장을 입는 남성에게 벨트는 소모품입니다. 라이프컴바인은 놀랍게도 벨트 하나 가격에 하나를 더 얹어주는 1+1 혜택을 제공하여 가성비의 정점을 찍었습니다. 블랙과 브라운 색상을 각각 하나씩 교차 선택하여 정장과 구두 색상에 맞춰 번갈아 가며 코디할 수 있으며, 혹은 가장 활용도가 높은 블랙 2개를 선택하여 하나는 집에, 하나는 사무실이나 차에 두고 비상용으로 활용하기에도 완벽합니다.' }
  ],
  outro: '라이프컴바인 1+1 남성벨트는 \'저렴한 벨트는 티가 난다\'라는 편견을 보기 좋게 깨뜨리며, 실용성과 디자인을 모두 충족시킨 스마트한 비즈니스 아이템입니다. 유행을 타지 않는 모던한 버클 디자인, 튼튼하고 고급스러운 가죽 텍스처, 그리고 1+1이라는 압도적인 혜택까지 더해져 매일 출근하는 남편이나 남자친구를 위한 부담 없는 실속 선물용으로도 더할 나위 없이 훌륭합니다. 비싼 브랜드 이름값 대신 합리적인 가격과 확실한 품질을 원하신다면 이 제품이 완벽한 정답이 되어줄 것입니다.',
  summary: '가성비 끝판왕 남자 정장 벨트 추천, 라이프컴바인 1+1 가죽 허리띠 디테일 분석'
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
