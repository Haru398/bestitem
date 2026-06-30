const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-gomgom-daepae-pork',
  category: '식품',
  title: '다양한 요리에 활용 가능한 가성비 만능 식재료 곰곰 냉동 대패 삼겹살 해동 및 레시피 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\곰곰 만능 대패 삼겹살 (냉동), 1kg, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\곰곰 만능 대패 삼겹살 (냉동), 1kg, 1개',
  link: 'https://link.coupang.com/a/eTHcWDS4Wq',
  iframe: '<iframe src="https://coupa.ng/cnFsET" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '치솟는 외식 물가로 인해 집에서 직접 요리를 해 먹는 홈쿡족이 늘어나면서, 어떤 요리에든 찰떡같이 어울리는 냉동 대패 삼겹살이 냉동실 필수 쟁여템으로 자리 잡았습니다. 굽기만 해도 메인 요리가 되고, 찌개나 볶음밥에 조금만 썰어 넣어도 풍미를 확 끌어올려 주는 마법의 식재료인 대패 삼겹살 중에서도 압도적인 판매량과 가성비를 자랑하는 **곰곰 냉동 만능 대패 삼겹살**의 매력과 최적의 조리 꿀팁을 객관적으로 분석해 보겠습니다.\n\n이 제품은 돼지고기 특유의 고소한 지방과 담백한 살코기가 황금 비율로 섞여 있어 구이, 볶음, 찌개, 덮밥 등 상상할 수 있는 거의 모든 돼지고기 요리에 전천후로 활용할 수 있습니다. 1kg이라는 대용량에도 불구하고 합리적인 가격대를 형성하고 있어 4인 가구의 넉넉한 식사는 물론 1인 가구의 한 달 식비 방어에도 탁월한 역할을 수행합니다.',
  sections: [
    { img: '1.jpg', text: '대패 삼겹살의 가장 큰 매력은 바로 얇은 두께에서 오는 \'빠른 조리 시간과 부드러운 식감\'입니다. 곰곰 대패 삼겹살은 너무 얇아서 과자처럼 부서지지도 않고 너무 두꺼워서 질기지도 않은, 불판이나 프라이팬에 올렸을 때 순식간에 야들야들하게 익어가는 최적의 두께인 2~3mm로 슬라이스 되어 있습니다. 성질 급한 한국인들에게 퇴근 후 긴 기다림 없이 즉각적인 고기 파티를 선사하는 훌륭한 장점을 지니고 있습니다.' },
    { img: '2.jpg', text: '신선도와 육질의 비밀은 가공 과정에 숨어있습니다. 이 제품은 돼지고기 원육을 수입 즉시 영하의 온도에서 급속 냉동하여 육즙의 손실을 최소화하고 신선함을 고스란히 가둬두었습니다. 냉동 고기 특유의 뻣뻣함이나 누린내를 효과적으로 잡았으며, 조리 시 살코기 사이사이에 녹아든 지방층이 고소한 풍미를 내어 씹을수록 감칠맛이 배가되는 특징을 보여줍니다.' },
    { img: '3.jpg', text: '보관과 사용의 편의성을 극대화한 \'대용량 실속 지퍼백 패키징\'이 돋보입니다. 1kg의 대용량 고기가 하나로 뭉쳐서 얼어있으면 해동과 소분이 매우 까다롭지만, 이 제품은 얇게 썰린 고기들이 비교적 쉽게 분리되도록 포장되어 있어 먹을 만큼만 조금씩 꺼내 쓰기에 매우 수월합니다. 남은 고기는 지퍼백을 꼭 닫아 다시 냉동실에 보관하면 되므로 위생과 신선도 유지 측면에서도 만점입니다.' },
    { img: '4.jpg', text: '활용도 200%를 자랑하는 대표적인 \'만능 꿀조합 레시피\'를 소개합니다. 첫 번째는 대패 삼겹살 볶음밥입니다. 고기를 바삭하게 구워 기름을 낸 뒤 김치와 밥을 넣고 볶아주면 전문점 볶음밥의 맛을 그대로 재현할 수 있습니다. 두 번째는 된장찌개나 김치찌개입니다. 국물 요리에 찌개용 고기 대신 대패 삼겹살을 한 줌 썰어 넣으면 얇은 고기 사이로 진한 국물이 쏙쏙 배어들어 훨씬 깊고 풍부한 고깃집 찌개의 맛을 완성합니다.' },
    { img: '5.jpg', text: '마지막으로 안전하고 맛있는 조리를 위한 \'올바른 해동 및 조리 팁\'입니다. 냉동 대패 삼겹살은 굳이 오랜 시간 해동할 필요 없이, 달궈진 프라이팬에 언 상태 그대로 올려 조리해도 무방합니다. 만약 핏물을 제거하고 싶다면 조리 하루 전날 냉장고로 옮겨 서서히 해동하는 것이 육즙 손실을 막는 가장 좋은 방법입니다. 또한, 구울 때 허브 솔트나 후추를 가볍게 뿌려주면 돼지고기의 풍미를 한층 더 끌어올릴 수 있습니다.' }
  ],
  outro: '냉동실 문을 열 때마다 어떤 요리를 해 먹을지 즐거운 고민을 하게 만드는 든든한 식재료입니다. 외식 대신 집에서 간편하고 맛있는 요리를 즐기고 싶다면, 압도적인 가성비와 훌륭한 육질을 자랑하는 **곰곰 만능 냉동 대패 삼겹살**을 장바구니에 꼭 담아보시길 추천합니다. 다양한 레시피에 무궁무진하게 활용할 수 있는 이 제품 하나만 있다면 오늘 저녁 메뉴 걱정은 완벽하게 사라질 것입니다.',
  summary: '다양한 요리에 활용 가능한 가성비 만능 식재료 곰곰 냉동 대패 삼겹살 해동 및 레시피 분석'
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
  if (row['폴더이름'] === '곰곰 만능 대패 삼겹살 (냉동), 1kg, 1개') {
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
