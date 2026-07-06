const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-comet-ice-box',
  category: '스포츠/레저',
  title: '캠핑의 질을 높이는 2in1 아이템! 코멧 테이블 아이스박스 27L 보냉력 및 활용성 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\코멧 테이블 아이스 박스 대용량 27L',
  backupDir: 'D:\\정식서버업로드전용폴더\\코멧 테이블 아이스 박스 대용량 27L',
  link: 'https://link.coupang.com/a/e6YCJYDZfM',
  iframe: '<iframe src="https://coupa.ng/cnPeWS" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '본격적인 캠핑과 피크닉 시즌이 다가오면서 가장 먼저 챙겨야 할 필수 장비는 단연 \'아이스박스(쿨러)\'입니다. 야외에서 신선한 식재료를 보관하고 시원한 음료를 즐기기 위해 넉넉한 용량과 확실한 보냉력은 기본입니다. 하지만 짐이 많아지는 캠핑의 특성상 부피만 차지하는 단순한 쿨러보다는 다용도로 활용할 수 있는 스마트한 제품이 대세로 떠오르고 있습니다. 아이스박스 본연의 기능에 미니 테이블 역할까지 더해져 캠핑족들 사이에서 최고의 가성비템으로 불리는 \'코멧 테이블 아이스박스 27L\'의 뛰어난 보냉력과 실용적인 구조를 집중적으로 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 눈에 띄는 혁신적인 특징은 뚜껑(상판) 부분에 숨겨져 있는 \'테이블 확장 기능\'입니다. 아이스박스 뚜껑을 뒤집어서 장착하거나 펼치면 컵홀더가 파여 있는 튼튼한 미니 테이블로 변신합니다. 짐을 줄이는 것이 관건인 미니멀 캠핑이나 가벼운 피크닉을 떠날 때, 무겁고 부피가 큰 캠핑 테이블을 따로 챙길 필요 없이 이 제품 하나만으로 음식과 음료를 안정적으로 올려두고 즐길 수 있어 공간 활용도와 편의성이 극대화됩니다.' },
    { img: '2.jpg', text: '아이스박스의 본질인 \'보냉력\' 역시 매우 뛰어납니다. 외부의 뜨거운 열기를 완벽하게 차단하고 내부의 냉기를 오랫동안 가둬두기 위해, 단열 효과가 우수한 고밀도 EPS(발포폴리스티렌) 폼을 벽면에 두껍게 충전했습니다. 얼음이나 아이스팩과 함께 내용물을 보관할 경우, 한여름 폭염 속 야외 환경에서도 최대 48시간 이상 얼음이 녹지 않고 시원함이 유지되어 1박 2일 캠핑 식재료 보관에 전혀 무리가 없습니다.' },
    { img: '3.jpg', text: '27L의 대용량 사이즈는 4인 가족이 먹을 식재료와 음료를 넉넉하게 수납할 수 있는 최적의 크기입니다. 2L 생수병을 세워서 보관할 수 있을 뿐만 아니라, 캔맥주, 과일, 육류 등을 차곡차곡 테트리스 하듯 효율적으로 적재할 수 있는 깊고 넓은 내부 공간을 자랑합니다. 용량 대비 무게가 가볍게 설계되어 있어 내용물을 가득 채운 상태에서도 성인이 무리 없이 들고 이동할 수 있습니다.' },
    { img: '4.jpg', text: '이동의 편의성을 고려한 인체공학적 디자인도 돋보입니다. 튼튼하고 그립감이 좋은 와이드 핸들(손잡이)이 장착되어 있어 무거운 하중도 안정적으로 지탱하며, 두 사람이 양쪽에서 함께 들 수 있도록 측면에도 보조 손잡이 홈이 파여 있습니다. 이동 중 뚜껑이 열려 내용물이 쏟아지는 사고를 방지하기 위해 락(Lock) 기능이 포함된 견고한 잠금장치를 적용하여 안전성을 한층 높였습니다.' },
    { img: '5.jpg', text: '디자인 역시 캠핑 감성에 완벽하게 녹아드는 세련된 샌드 베이지 톤과 카키 색상의 조합으로 제작되었습니다. 투박하고 촌스러운 원색의 일반 아이스박스와 달리, 최근 트렌드인 감성 캠핑 텐트 및 우드톤의 캠핑 기어들과 위화감 없이 고급스럽게 잘 어울립니다. 내외부 표면은 스크래치와 오염에 강한 무광 텍스처로 마감되어 흙먼지가 묻어도 물티슈로 가볍게 닦아내면 그만입니다.' },
    { img: '6.jpg', text: '사용자의 디테일한 니즈를 충족시키는 세심한 부가 기능들도 놓치지 않았습니다. 얼음이 녹아 생긴 물을 외부로 쉽게 배출할 수 있는 \'하단 배수 밸브\'가 기본 장착되어 있어, 무거운 아이스박스를 통째로 뒤집을 필요 없이 뚜껑만 열고 밸브를 돌려 간편하게 물을 뺄 수 있습니다. 이러한 세세한 기능들이 모여 야외에서의 번거로움을 최소화하고 오롯이 휴식에 집중할 수 있도록 도와줍니다.' }
  ],
  outro: '코멧 테이블 아이스박스 27L는 단순한 음식 보관함을 넘어 캠핑의 편의성을 극대화해주는 진정한 2in1 멀티 기어입니다. 넉넉한 수납력, 강력한 보냉 성능, 감성적인 디자인은 물론 짐을 줄여주는 테이블 기능까지 갖추어 흠잡을 데 없는 완벽한 가성비를 자랑합니다. 다가오는 주말, 가족이나 연인과 함께하는 피크닉과 캠핑을 계획하고 계신다면 이 제품 하나로 더욱 여유롭고 시원한 아웃도어 라이프를 즐겨보시길 추천합니다.',
  summary: '캠핑의 질을 높이는 2in1 아이템! 코멧 테이블 아이스박스 27L 보냉력 및 활용성 리뷰'
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
