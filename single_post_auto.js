const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-kleannara-daily-kitchen-towel',
  category: '생활용품',
  title: '주방의 필수템, 깨끗한나라 데일리 천연펄프 키친타월 흡수력 및 안전성 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\깨끗한나라 데일리 천연펄프 키친타월, 150매, 8개',
  backupDir: 'D:\\정식서버업로드전용폴더\\깨끗한나라 데일리 천연펄프 키친타월, 150매, 8개',
  link: 'https://link.coupang.com/a/e7J4Mm8sX6',
  iframe: '<iframe src="https://coupa.ng/cnPwpK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '음식을 조리하고, 튀기고, 식기를 닦아내는 주방은 우리 가족의 입으로 들어가는 모든 것이 만들어지는 가장 청결해야 할 공간입니다. 주방에서 행주 대신, 혹은 튀김 요리의 기름기를 뺄 때 빠지지 않고 등장하는 필수품이 바로 \'키친타월\'입니다. 하지만 식재료와 식기에 직접 닿는 키친타월을 단순히 가격만 보고 고르고 계시지는 않나요? 뛰어난 흡수력은 물론이고, 식재료에 닿아도 안심할 수 있는 안전성까지 입증되어 수많은 주부들의 \'주방 정착템\'으로 불리는 \'깨끗한나라 데일리 천연펄프 키친타월\'의 숨겨진 장점과 올바른 활용법을 꼼꼼하게 알려드립니다.',
  sections: [
    { img: '1.jpg', text: '100% 무형광 순수 천연펄프로 완성한 주방 안전성: 키친타월은 갓 튀긴 튀김의 기름기를 빼거나, 물기가 남은 프라이팬을 닦아내는 등 식재료 및 조리 도구와 떼려야 뗄 수 없는 관계입니다. 이 제품은 재생 펄프가 아닌 자연에서 온 100% 순수 천연펄프만을 고집하여 제작되었습니다. 특히 피부나 음식에 묻어날 경우 건강에 치명적일 수 있는 형광증백제, 포름알데히드, 인공 색소, 합성 향료 등을 완벽하게 배제하여, 뜨거운 튀김 요리를 바로 올려놓거나 과일의 물기를 닦을 때에도 환경호르몬 걱정 없이 100% 안심하고 사용할 수 있습니다.' },
    { img: '2.jpg', text: '기름기와 물기를 단숨에 빨아들이는 엠보싱 흡수력: 주방에서 펄펄 끓어넘친 국물이나 튀김 후 프라이팬에 흥건하게 남은 기름을 닦아낼 때 얇은 키친타월은 여러 장을 뜯어 써도 손에 다 묻어나기 일쑤입니다. 깨끗한나라 데일리 키친타월은 겹과 겹 사이에 촘촘하게 공기층을 형성하는 \'데시메트릭 엠보싱(Desimetric Embossing)\' 공법을 적용했습니다. 이 독보적인 엠보싱 패턴 덕분에 적은 양으로도 스펀지처럼 강력하게 수분과 유분을 흡수하여 주방의 찌든 때와 기름기를 단 한 번의 터치만으로 깔끔하게 제거해 줍니다.' },
    { img: '3.jpg', text: '젖어도 쉽게 찢어지지 않는 질긴 내구성: 키친타월로 싱크대의 물기를 닦거나 가스레인지를 청소하다 보면 종이가 물에 젖어 찢어지면서 휴지 조각이 사방에 들러붙는 낭패를 겪곤 합니다. 이 제품은 일반적인 화장지와 달리 섬유 조직을 탄탄하게 결합하는 특수 가공 처리를 거쳐, 물과 기름을 흠뻑 머금은 상태에서도 조직이 쉽게 풀리거나 찢어지지 않습니다. 설거지 후 식기의 물기를 닦아낼 때에도 휴지 먼지가 그릇에 남지 않아 더욱 위생적이고 쾌적한 주방 환경을 만들어 줍니다.' },
    { img: '4.jpg', text: '먼지 날림이 적어 쾌적한 주방 환경: 요리 중인 냄비나 프라이팬 주변에서 키친타월을 무심코 뜯다가 미세한 종이 먼지가 날려 음식 위로 떨어지는 경우가 있습니다. 깨끗한나라의 엄격한 품질 공정을 통과한 이 제품은 휴지 표면의 보풀과 먼지 발생을 최소화하여 조리 과정 중에도 마음 놓고 뜯어 사용할 수 있습니다. 위생이 최우선 되어야 할 주방에서 먼지 날림으로 인한 스트레스를 없애주며, 150매라는 넉넉한 용량으로 구성되어 가정뿐만 아니라 식당, 사무실 등에서도 부담 없이 사용할 수 있는 실용성을 갖췄습니다.' }
  ],
  outro: '깨끗한나라 데일리 천연펄프 키친타월은 \'주방 휴지는 다 똑같다\'라는 인식을 완전히 뒤집어주는 제품입니다. 입에 들어가는 식재료에 직접 닿아도 안심할 수 있는 100% 천연 성분, 기름 한 방울도 남기지 않는 탁월한 흡수력, 물에 젖어도 탄탄한 내구성까지 주방에서 요구하는 모든 까다로운 조건들을 완벽하게 충족시킵니다. 가족의 건강과 청결한 주방을 위한 가장 똑똑한 선택, 1등 브랜드 깨끗한나라의 데일리 키친타월을 주방 한편에 든든하게 구비해 보시길 적극 추천해 드립니다.',
  summary: '주방의 필수템, 깨끗한나라 데일리 천연펄프 키친타월 흡수력 및 안전성 완벽 분석'
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
