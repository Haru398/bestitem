const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-domestic-new-potato-500g',
  category: '식품',
  title: '포슬포슬한 식감이 예술! 영양 만점 산지 직송 국내산 햇감자 요리법 및 효능',
  sourceDir: 'D:\\정식홈페이지자동화\\국내산 햇 감자, 500g, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\국내산 햇 감자, 500g, 1개',
  link: 'https://link.coupang.com/a/e7LCIKghFs',
  iframe: '<iframe src="https://coupa.ng/cnPwA7" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '햇살을 듬뿍 받고 갓 캐낸 \'햇감자\'는 그 어떤 식재료와도 비교할 수 없는 부드럽고 포슬포슬한 식감과 고소한 풍미를 자랑합니다. 탄수화물뿐만 아니라 비타민과 칼륨 등 몸에 좋은 영양분이 가득 차 있어 \'땅속의 사과\'라고 불리며 전 세계인들의 식탁을 책임져온 든든한 구황작물이기도 합니다. 특히 묵은 감자에서는 절대 느낄 수 없는 햇감자 특유의 얇은 껍질과 촉촉한 수분감은 별다른 양념 없이 찌기만 해도 완벽한 영양 간식이 됩니다. 청정 자연에서 정성껏 재배하여 우리 집 식탁까지 신선하게 배송되는 \'산지 직송 국내산 햇감자\'의 놀라운 영양 성분과 100% 활용할 수 있는 다양한 요리 꿀팁을 소개합니다.',
  sections: [
    { img: '1.jpg', text: '비타민 C와 칼륨의 보고, 땅속의 사과: 감자는 탄수화물 덩어리라는 오해를 받기 쉽지만, 사실 사과보다 무려 3배나 많은 비타민 C를 함유하고 있는 영양 만점 채소입니다. 특히 감자에 들어있는 비타민 C는 전분에 둘러싸여 있어 열을 가해 찌거나 볶아도 쉽게 파괴되지 않는다는 엄청난 장점이 있습니다. 또한 나트륨 배출을 돕는 칼륨 성분이 아주 풍부하게 들어있어 맵고 짠 음식을 즐겨 먹는 한국인들의 식단에서 붓기를 빼주고 혈압을 안정시켜 주는 매우 중요한 역할을 담당합니다.' },
    { img: '2.jpg', text: '껍질이 얇고 수분이 꽉 찬 리얼 햇감자의 매력: 갓 수확한 햇감자는 수개월 동안 저장고에 머물렀던 묵은 감자와는 차원이 다른 맛과 식감을 선사합니다. 손으로 살짝만 문질러도 훌렁 벗겨질 만큼 껍질이 매우 얇아 껍질째 조리하기 좋으며, 과육 안에 수분을 흠뻑 머금고 있어 삶았을 때 퍽퍽함 없이 입안에서 부드럽게 녹아내리는 \'포슬포슬함\'의 극치를 보여줍니다. 청정 지역의 비옥한 황토에서 자란 100% 국내산 햇감자만을 엄선하여 배송하므로 믿고 드실 수 있습니다.' },
    { img: '3.jpg', text: '찌개부터 조림, 간식까지 버릴 게 없는 만능 식재료: 감자는 어떤 요리법과 만나느냐에 따라 무궁무진한 변신이 가능합니다. 큼직하게 썰어 고추장찌개나 카레에 넣으면 국물을 걸쭉하고 진하게 만들어 주며, 얇게 채 썰어 기름에 달달 볶아낸 감자채 볶음은 아이들이 가장 좋아하는 밑반찬 1순위입니다. 또한 비 오는 날 강판에 쓱쓱 갈아 바삭하게 부쳐낸 감자전, 십자 모양으로 칼집을 내어 오븐에 구워낸 버터구이 통감자 등 500g 한 봉지만 있으면 온 가족의 입맛을 사로잡는 근사한 식탁이 뚝딱 완성됩니다.' }
  ],
  outro: '국내산 햇감자는 저렴한 가격으로 우리 식탁을 가장 풍성하게 채워주는 자연의 위대한 선물입니다. 갓 캐내어 흙 내음이 살아있는 신선한 감자 본연의 고소하고 달큰한 맛은 인공 조미료로는 절대 흉내 낼 수 없는 건강한 풍미를 선사합니다. 포슬포슬하게 쪄서 소금이나 설탕에 콕 찍어 먹는 추억의 간식부터, 매콤한 닭볶음탕 속에서 포근하게 부서지는 감자까지! 영양과 맛을 모두 꽉 잡은 산지 직송 국내산 햇감자로 오늘 저녁 맛있는 요리를 준비해 보세요.',
  summary: '포슬포슬한 식감이 예술! 영양 만점 산지 직송 국내산 햇감자 요리법 및 효능'
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
