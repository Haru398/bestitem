const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-gomgom-chicken-breast',
  category: '식품',
  title: '퍽퍽함 제로! 다이어트 필수템 곰곰 한입 닭가슴살 오리지널 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\곰곰 한입 닭가슴살 오리지널 (냉동)',
  backupDir: 'D:\\정식서버업로드전용폴더\\곰곰 한입 닭가슴살 오리지널 (냉동)',
  link: 'https://link.coupang.com/a/eTDXayljqu',
  iframe: '<iframe src="https://coupa.ng/cnFpVh" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '건강 관리나 체중 감량을 결심했을 때 가장 먼저 장바구니에 담게 되는 식재료, 바로 닭가슴살이죠. 하지만 특유의 퍽퍽한 식감과 비린내 때문에 금세 질려버리거나 억지로 씹어 삼키며 스트레스를 받은 경험, 한 번쯤 있으실 겁니다. 매일 먹어도 물리지 않는 촉촉함과 놀라운 가성비로 다이어터들 사이에서 쟁여놓고 먹는 필수템으로 입소문이 자자한 **곰곰 한입 닭가슴살 오리지널 (냉동)**을 소개합니다.\n\n이 제품은 기존 통 닭가슴살의 단점이었던 먹기 불편함과 질긴 식감을 완벽하게 개선하여, 바쁜 아침이나 운동 직후 간편하고 맛있게 단백질을 보충할 수 있도록 기획된 제품입니다. 엄선된 100% 국내산 닭고기만을 사용하여 안심할 수 있으며, 닭가슴살은 맛없다는 편견을 보기 좋게 깨뜨리는 부드러운 육질이 일품인데요. 한 번 맛보면 냉동실 한 켠을 든든하게 채워두게 된다는 곰곰 한입 닭가슴살의 매력 포인트를 하나씩 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 장점은 이름 그대로 \'칼질이 필요 없는 한입 크기\'로 손질되어 있다는 것입니다. 덩어리째 얼어있는 통 닭가슴살을 해동해서 직접 자르는 수고로움 없이, 포장을 뜯어 바로 조리할 수 있어 요리 시간을 획기적으로 단축해 줍니다. 샐러드 토핑으로 얹거나 카레, 볶음밥 등 다양한 다이어트 식단에 별도의 손질 없이 바로바로 활용할 수 있어 바쁜 직장인이나 자취생들에게 압도적인 편리함을 제공합니다.' },
    { img: '2.jpg', text: '퍽퍽함을 없애고 촉촉함을 극대화한 \'곰곰만의 특별한 숙성 공법\'이 적용되었습니다. 급속 동결(IQF) 방식을 사용하여 닭고기 본연의 수분과 육즙을 꽉 잡아주었기 때문에, 전자레인지에 가볍게 돌리거나 에어프라이어에 굽기만 해도 닭다리살 못지않은 부드럽고 야들야들한 식감을 자랑합니다. 닭 특유의 잡내가 전혀 나지 않아 비위가 약한 분들도 거부감 없이 맛있게 단백질 식단을 유지할 수 있습니다.' },
    { img: '3.jpg', text: '믿고 먹을 수 있는 \'100% 국내산 신선육\'만을 엄선하여 사용했습니다. 수입산 냉동육에서 흔히 느껴지는 푸석함이 없으며, HACCP(식품안전관리인증기준) 인증을 받은 철저하고 위생적인 시설에서 가공되어 온 가족이 안심하고 섭취할 수 있습니다. 자극적인 조미료 대신 담백한 오리지널 본연의 맛을 살려 나트륨 함량을 낮췄기 때문에 엄격하게 식단을 관리하는 분들에게도 최적화된 영양 성분을 제공합니다.' },
    { img: '4.jpg', text: '매일 챙겨 먹어야 하는 단백질인 만큼 \'부담 없는 압도적인 가성비와 편리한 개별 포장\'이 돋보입니다. 타 브랜드 제품 대비 저렴한 가격으로 고품질의 국내산 닭가슴살을 든든하게 구비할 수 있으며, 한 끼 식사로 알맞은 양이 위생적으로 개별 포장되어 있어 냉동실 공간을 효율적으로 사용할 수 있습니다. 도시락이나 간식으로 외출 시 가방에 하나씩 쏙 넣어 다니기에도 좋아 언제 어디서나 단백질 보충이 가능합니다.' }
  ],
  outro: '성공적인 다이어트와 근육 성장의 핵심은 결국 \'꾸준함\'에 있습니다. 아무리 영양 성분이 좋아도 맛이 없고 먹기 불편하다면 금방 포기하게 되죠. 극강의 부드러움과 손질의 번거로움을 완벽하게 없앤 **곰곰 한입 닭가슴살 오리지널**은 여러분의 식단 관리를 가장 든든하게 서포트해 줄 최고의 파트너입니다. 냉동실에 넉넉하게 쟁여두고 매일매일 맛있고 즐거운 건강 관리를 시작해 보시길 강력히 추천합니다.',
  summary: '퍽퍽함 제로! 다이어트 필수템 곰곰 한입 닭가슴살 오리지널 완벽 분석'
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

// Since the DB script is robust, we handle with or without images
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
  if (row['폴더이름'] === '곰곰 한입 닭가슴살 오리지널 (냉동)') {
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
