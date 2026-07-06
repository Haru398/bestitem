const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-domestic-radish-1ea',
  category: '식품',
  title: '시원하고 달큼한 국물 맛의 비법, 산지 직송 국내산 무 영양 성분 및 보관법',
  sourceDir: 'D:\\정식홈페이지자동화\\국내산 무, 1개입, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\국내산 무, 1개입, 1개',
  link: 'https://link.coupang.com/a/e7LvnCcCWG',
  iframe: '<iframe src="https://coupa.ng/cnPwAn" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '가을과 겨울을 지나며 땅속의 영양분을 듬뿍 머금고 자라난 \'무\'는 우리 밥상에서 결코 빠질 수 없는 든든한 식재료입니다. 아삭한 식감은 물론 끓일수록 우러나는 시원하고 달큼한 국물 맛 덕분에 찌개, 조림, 국, 무침 등 한국인의 소울푸드에 감초 역할을 톡톡히 해냅니다. 하지만 겉보기엔 다 똑같아 보이는 무라도, 어디서 어떻게 자랐느냐에 따라 단맛과 수분감에서 엄청난 차이가 납니다. 청정 지역의 비옥한 토양에서 햇살을 받고 건강하게 자라난 신선한 \'산지 직송 국내산 무\'의 매력과 영양 성분, 그리고 싱싱함을 오래 유지하는 보관 꿀팁까지 자세히 알아봅니다.',
  sections: [
    { img: '1.jpg', text: '천연 소화제라 불리는 풍부한 디아스타아제: 예로부터 선조들은 고기나 밀가루 음식을 먹고 속이 더부룩할 때 동치미 국물을 마시며 소화를 시켰습니다. 무 특유의 알싸하면서도 시원한 맛을 내는 성분 중에는 전분을 분해하는 효소인 \'디아스타아제(Diastase)\'가 아주 풍부하게 들어있기 때문입니다. 특히 국내산 무는 수분과 소화 효소 함량이 뛰어나 천연 소화제 역할을 톡톡히 해내며, 잦은 외식과 더부룩한 속으로 고생하는 현대인들의 위장 건강을 편안하게 달래주는 착한 식재료입니다.' },
    { img: '2.jpg', text: '비타민 C 듬뿍, 면역력 지킴이: 하얀 무의 속살에는 우리가 생각하는 것보다 훨씬 많은 양의 비타민 C가 숨겨져 있습니다. 특히 겨울철에 수확하는 무는 사과보다 비타민 C 함량이 높아 예로부터 \'겨울 산삼\'이라고 불리기도 했습니다. 껍질 부위에 비타민 C가 가장 많이 집중되어 있으므로, 흙을 깨끗이 씻어낸 뒤 껍질째 조리하거나 얇게 채 썰어 샐러드나 생채로 섭취하면 감기 예방과 겨울철 면역력을 높이는 데 탁월한 효과를 볼 수 있습니다.' },
    { img: '3.jpg', text: '어떤 요리와도 찰떡궁합, 활용도 만점 식재료: 국내산 무 특유의 아삭함과 달큼한 즙은 어떤 조리법과도 완벽한 조화를 이룹니다. 소고기 뭇국이나 어묵탕에 큼직하게 썰어 넣으면 국물의 깊고 시원한 감칠맛을 극한으로 끌어올려 주며, 고등어나 갈치 등 생선 밑에 깔고 졸이면 생선의 비린내를 싹 잡아주면서 양념이 쏙 배어들어 밥도둑이 따로 없습니다. 고춧가루에 조물조물 버무린 아삭한 무생채는 비빔밥 재료로도 손색이 없는 만능 식재료입니다.' },
    { img: '4.jpg', text: '오래오래 싱싱하게, 올바른 무 보관 꿀팁: 신선한 무를 구입했다면 보관법이 생명입니다. 잎(무청)이 달려있는 무라면 잎이 수분을 계속 빼앗아 가기 때문에 구입 즉시 칼로 무청을 잘라내야 무의 수분 증발을 막을 수 있습니다. 표면의 흙은 씻어내지 말고, 신문지나 키친타월로 꼼꼼하게 돌돌 만 다음 비닐 팩에 밀봉하여 냉장고 채소 칸에 세워서 보관해 보세요. 무가 밭에서 자라던 방향 그대로 세워두면 아삭함과 단맛을 훨씬 오랫동안 싱싱하게 유지할 수 있습니다.' }
  ],
  outro: '신선한 산지 직송 국내산 무는 평범한 요리도 특별하게 만들어주는 마법 같은 힘을 가졌습니다. 소화를 돕고 면역력을 키워주는 건강한 영양 성분부터, 끓이면 끓일수록 우러나는 특유의 달큼하고 깊은 감칠맛까지 버릴 것이 하나도 없는 완벽한 채소입니다. 장바구니 물가가 부담스러운 요즘, 저렴하면서도 밥상을 가장 풍성하게 채워주는 국내산 무 하나로 오늘 저녁 따뜻한 소고기 뭇국이나 매콤한 생선조림을 끓여 가족들의 입맛을 돋워보시는 것은 어떨까요?',
  summary: '시원하고 달큼한 국물 맛의 비법, 산지 직송 국내산 무 영양 성분 및 보관법'
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
