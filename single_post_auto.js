const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-goodmeatchop-beef',
  category: '식품',
  title: '가성비 호주산 우홍두깨살 1kg으로 질기지 않은 아이 반찬 소고기 장조림 만들기',
  sourceDir: 'D:\\정식홈페이지자동화\\굿미트찹 호주산 우홍두깨 장조림용 덩어리 (냉동), 1개, 1kg',
  backupDir: 'D:\\정식서버업로드전용폴더\\굿미트찹 호주산 우홍두깨 장조림용 덩어리 (냉동), 1개, 1kg',
  link: 'https://link.coupang.com/a/eTF1WpnIvA',
  iframe: '<iframe src="https://coupa.ng/cnFrDk" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '매일매일 어떤 반찬을 올려야 할지 고민이 깊어지는 요즘, 짭조름하고 달달한 소고기 장조림 하나만 냉장고에 든든하게 채워두면 마음이 한결 편안해집니다. 특히 아이가 있는 집이라면 영양 만점 단백질 반찬으로 이만한 게 없는데요. 마트에서 한우를 집어 들자니 치솟는 물가에 선뜻 손이 가지 않고, 양껏 만들자니 비용이 부담스러울 때 완벽한 대안이 되어줄 가성비 끝판왕 식재료, **굿미트찹 호주산 우홍두깨 장조림용 덩어리육(냉동 1kg)**을 소개합니다.\n\n이 제품은 넓고 맑은 호주의 대자연에서 자란 건강한 소고기 중에서도 지방이 적고 결이 살아있어 장조림으로 만들기 가장 이상적인 부위인 \'홍두깨살\'만을 엄선하여 넉넉한 1kg 대용량으로 담아냈습니다. 누린내 없이 깔끔한 고기 맛은 물론, 푹 끓여내면 결대로 부드럽게 찢어지는 식감 덕분에 치아가 약한 어르신들이나 밥투정하는 아이들도 질기지 않게 맛있게 즐길 수 있는데요. 냉동실에 쟁여두면 마음까지 든든해지는 이 훌륭한 식재료의 매력을 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 돋보이는 장점은 단연 \'지방이 적고 살코기가 꽉 찬 홍두깨살 본연의 담백함\'입니다. 찌개나 구이용 고기와 달리, 장조림은 끓일 때 기름기가 적어야 국물이 굳었을 때 하얗게 뜨는 기름막을 최소화할 수 있고 텁텁함 없이 깔끔한 감칠맛을 낼 수 있습니다. 이 제품은 장조림에 가장 최적화된 살코기 부위만을 덩어리째 제공하여 핏물을 빼고 끓여내기만 하면 누구나 훌륭한 밑반찬을 완성할 수 있습니다.' },
    { img: '2.jpg', text: '식비 부담을 확 덜어주는 \'압도적인 1kg 대용량과 미친 가성비\'를 자랑합니다. 반찬가게에서 작은 플라스틱 통에 담긴 장조림을 몇 만 원씩 주고 사 먹기엔 너무나 아쉽지만, 이 제품을 활용하면 메추리알이나 꽈리고추, 표고버섯 등 냉장고 파먹기용 자투리 채소를 듬뿍 넣고 온 가족이 일주일 내내 푸짐하게 먹을 수 있는 대용량 장조림을 아주 저렴한 가격에 뚝딱 만들어 낼 수 있습니다.' },
    { img: '3.jpg', text: '냉동육임에도 불구하고 \'체계적인 급속 동결 공법과 진공 포장\'을 통해 신선육 못지않은 뛰어난 육질과 보존성을 자랑합니다. 도축 직후 가장 신선한 상태에서 빠르게 얼리고 공기와의 접촉을 완벽히 차단하여 고기 본연의 풍부한 육즙과 영양소를 그대로 가둬두었습니다. 냉장고 파티셜이나 찬물에 담가 서서히 해동해 주면, 끓였을 때 고기가 퍽퍽해지거나 부서지지 않고 결대로 예쁘고 쫄깃하게 찢어집니다.' },
    { img: '4.jpg', text: '요리의 활용도 역시 무궁무진합니다. 덩어리 고기이기 때문에 기본 장조림은 물론이고, 결 반대 방향으로 얇게 슬라이스하여 뜨끈한 소고기뭇국이나 육개장을 끓일 때 넣어도 깊고 진한 고깃국물을 우려낼 수 있습니다. 장조림을 한솥 끓여둔 뒤, 바쁜 아침 갓 지은 뜨거운 밥 위에 찢어 올리고 참기름 한 방울과 계란 노른자를 톡 떨어뜨려 비벼 먹는 소고기 버터 간장 비빔밥은 아이들이 가장 환호하는 치트키 레시피입니다.' }
  ],
  outro: '치솟는 장바구니 물가 속에서 식비는 절약하면서도 식탁의 퀄리티는 포기할 수 없는 스마트한 주부님들이라면, **굿미트찹 호주산 우홍두깨 장조림용 고기**는 선택이 아닌 필수입니다. 핏물만 살짝 빼고 간장 양념에 뭉근하게 끓여내면, 한 번의 수고로움으로 일주일치 반찬 걱정을 완벽하게 덜어주는 마법을 경험하실 수 있습니다. 든든한 1kg 대용량 덩어리육으로 우리 가족의 입맛을 사로잡을 단짠단짠 밥도둑 장조림을 오늘 저녁 식탁에 올려보시길 강력히 추천합니다.',
  summary: '가성비 호주산 우홍두깨살 1kg으로 질기지 않은 아이 반찬 소고기 장조림 만들기'
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
  if (row['폴더이름'] === '굿미트찹 호주산 우홍두깨 장조림용 덩어리 (냉동), 1개, 1kg') {
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
