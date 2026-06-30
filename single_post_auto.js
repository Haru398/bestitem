const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-beksul-canola-oil',
  category: '식품',
  title: '발연점이 높아 튀김 요리에 최적화된 백설 카놀라유 900ml 영양 성분 및 활용법 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\백설 카놀라유, 900ml, 2개',
  backupDir: 'D:\\정식서버업로드전용폴더\\백설 카놀라유, 900ml, 2개',
  link: 'https://link.coupang.com/a/eTHYmoSs8W',
  iframe: '<iframe src="https://coupa.ng/cnFtey" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '주방에서 요리할 때 가장 기본적이면서도 중요한 식재료 중 하나가 바로 식용유입니다. 계란프라이 같은 간단한 요리부터 명절 튀김 요리까지 매일 사용하는 만큼, 발연점과 영양 성분을 꼼꼼히 따져보고 선택해야 합니다. 그중에서도 맑고 투명한 빛깔과 뛰어난 가성비로 오랫동안 가정의 식탁을 책임져 온 대표 식용유인 **백설 카놀라유 900ml** 제품의 특징과 튀김 및 볶음 요리에 최적화된 이유를 상세히 분석해 보겠습니다.\n\n이 제품은 100% 캐나다산 유채씨만을 엄선하여 착유한 프리미엄 카놀라유로, 콜레스테롤이 전혀 들어있지 않아 식단 관리에 민감한 분들도 부담 없이 활용할 수 있습니다. 900ml 두 병 구성으로 제공되어 넉넉하게 사용할 수 있으며, 기름 특유의 무거운 냄새가 적어 식재료 본연의 맛과 향을 살리는 데 탁월한 성능을 발휘합니다.',
  sections: [
    { img: '1.jpg', text: '카놀라유의 가장 큰 영양학적 장점은 포화지방산의 비율이 시중에 판매되는 식용유 중 가장 낮다는 점입니다. 백설 카놀라유는 인체에 해로운 트랜스지방과 콜레스테롤이 0%이며, 체내에서 스스로 합성하지 못해 반드시 외부 음식으로 섭취해야 하는 필수 지방산인 \'오메가-3(알파리놀렌산)\'와 \'오메가-6(리놀레산)\'가 균형 있게 함유되어 있어 건강한 식단을 구성하는 데 도움을 줍니다.' },
    { img: '2.jpg', text: '요리 시 기름이 타지 않고 안전하게 요리할 수 있는 기준 온도를 의미하는 \'발연점\' 측면에서도 매우 우수합니다. 이 제품의 발연점은 무려 240도에 달하여, 높은 온도가 지속적으로 유지되어야 바삭함을 극대화할 수 있는 돈까스, 새우튀김, 치킨 등의 딥 프라잉(Deep-frying) 요리에 최적의 조건을 제공합니다. 고온에서도 기름이 쉽게 산화되거나 연기가 발생하지 않아 쾌적한 주방 환경을 유지할 수 있습니다.' },
    { img: '3.jpg', text: '튀김뿐만 아니라 일상적인 볶음이나 부침 요리에서도 진가를 발휘합니다. 올리브유와 달리 특유의 짙은 향취가 거의 없는 깔끔하고 담백한 맛을 지니고 있기 때문에, 재료 본연의 향을 해치지 않고 풍미를 조화롭게 섞어줍니다. 드레싱 베이스로 사용해도 손색이 없으며, 특히 부침개를 구울 때 넉넉히 두르면 가장자리는 바삭하고 속은 촉촉한 완벽한 겉바속촉 식감을 완성해 냅니다.' },
    { img: '4.jpg', text: '오랜 시간 주방 한편을 든든하게 지킬 수 있도록 설계된 패키지 또한 장점입니다. 900ml 대용량 두 병 구성으로 구성되어 튀김 요리 시 기름을 아낌없이 사용할 수 있으며, 빛이 쉽게 투과되지 않도록 디자인된 패키지는 직사광선에 의한 기름의 산패를 늦춰줍니다. 개봉 후에는 반드시 뚜껑을 꼭 닫아 서늘하고 그늘진 곳에 보관해야 마지막 한 방울까지 신선하게 사용할 수 있습니다.' }
  ],
  outro: '매일 가족들의 입에 들어가는 요리의 기본 베이스가 되는 만큼, 식용유의 선택은 결코 가볍지 않습니다. 믿을 수 있는 제조 공정과 100% 캐나다산 유채씨의 신선함, 그리고 무엇보다 고온 조리에도 끄떡없는 높은 발연점을 자랑하는 **백설 카놀라유 900ml**는 주방의 품격을 한 단계 올려줄 필수품입니다. 튀김부터 샐러드드레싱까지 활용도 200%의 가성비 넘치는 이 제품으로 건강하고 맛있는 요리를 시작해 보시기 바랍니다.',
  summary: '발연점이 높아 튀김 요리에 최적화된 백설 카놀라유 900ml 영양 성분 및 활용법 가이드'
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
  if (row['폴더이름'] === '백설 카놀라유, 900ml, 2개') {
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
