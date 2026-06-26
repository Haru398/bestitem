const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-haitai-gohyang-dumpling',
  category: '식품',
  title: '온 가족 맛있는 간식! 해태제과 고향만두 1.8kg 대용량 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\해태제과 고향만두 (냉동), 1.8kg, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\해태제과 고향만두 (냉동), 1.8kg, 1개',
  link: 'https://link.coupang.com/a/eNGfV4fHGe',
  iframe: '<iframe src="https://coupa.ng/cnAnup" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '비 오는 날 출출한 오후, 혹은 늦은 밤 야식이 당길 때 가장 먼저 생각나는 메뉴는 무엇인가요? 아마 냉동실 한 켠을 든든하게 채우고 있는 냉동 만두를 떠올리시는 분들이 많을 텐데요. 그중에서도 1987년 첫 출시 이후 30년이 넘는 세월 동안 대한민국 국민들의 입맛을 사로잡으며 명실상부한 \'국민 만두\'로 자리 잡은 제품이 있습니다. 바로 특유의 담백하고 고소한 맛으로 변함없는 사랑을 받고 있는 **해태제과 고향만두**입니다.\n\n세월이 흘러 수많은 프리미엄 만두들이 쏟아져 나오고 있지만, 돌고 돌아 결국 고향만두의 오리지널 맛을 찾게 된다는 분들이 적지 않습니다. 옛날 어머니가 빚어주시던 정겨운 맛을 그대로 재현해 내어 온 가족의 영양 간식부터 훌륭한 술안주까지 다방면으로 활약하고 있는 고향만두 1.8kg 대용량 제품의 핵심 매력을 집중적으로 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '고향만두가 오랫동안 사랑받을 수 있었던 비결은 질리지 않는 \'깔끔하고 담백한 만두소\'에 있습니다. 국내산 돼지고기를 듬뿍 넣어 풍부한 육즙과 고소한 맛을 살렸으며, 여기에 아삭아삭 씹히는 신선한 양배추, 양파, 부추, 대파 등 다양한 채소들을 조화롭게 배합했습니다. 너무 자극적이거나 기름지지 않고 담백한 맛의 밸런스를 훌륭하게 잡아내어 아이부터 어르신들까지 남녀노소 누구나 부담 없이 즐길 수 있습니다.' },
    { img: '2.jpg', text: '얇으면서도 쫄깃한 만두피 역시 빼놓을 수 없는 장점입니다. 고급 밀가루를 사용하여 진공 반죽 공법으로 찰지게 빚어낸 만두피는, 찌거나 구웠을 때 푹 퍼지지 않고 쫀득쫀득한 식감을 유지합니다. 특히 팬에 기름을 두르고 구워 먹을 때는 겉은 바삭하고 속은 촉촉한 이른바 \'겉바속촉\'의 진수를 보여주며 입 안 가득 기분 좋은 즐거움을 선사합니다.' },
    { img: '3.jpg', text: '어떤 조리법과 만나도 찰떡같이 어울리는 엄청난 활용도를 자랑합니다. 찜기에 쪄서 부드러운 찐만두로, 에어프라이어에 돌려 바삭한 군만두로, 얼큰한 라면이나 떡국에 넣어 푸짐하게 즐겨도 제격입니다. 특히 한 입에 쏙 들어가는 앙증맞은 크기 덕분에 떡볶이 국물에 찍어 먹는 튀김 대용이나, 탕수 만두 등 다양한 요리의 부재료로 활용하기에 최적화되어 있습니다.' },
    { img: '4.jpg', text: '1.8kg의 대용량 포장은 가성비를 따지는 현명한 소비자들에게 최고의 선택이 됩니다. 넉넉한 짐승 용량 덕분에 냉동실에 한 봉지 쟁여두면 든든함이 배가 되며, 대가족의 간식이나 친구들이 놀러 왔을 때 대접할 안줏거리로 오랫동안 아쉬움 없이 먹을 수 있습니다. 또한, 지퍼백 포장이 적용되어 있어 남은 만두를 보관할 때도 신선함을 오래 유지할 수 있는 세심한 배려가 돋보입니다.' }
  ],
  outro: '화려한 토핑이나 자극적인 맛을 앞세운 새로운 만두들이 쏟아져 나와도, 결국 우리가 그리워하는 것은 기본에 충실한 클래식한 맛입니다. 국내산 돼지고기와 신선한 야채가 듬뿍 들어가 담백하고 고소한 추억의 맛을 선사하는 **해태제과 고향만두**는 변함없는 퀄리티로 식탁을 풍성하게 만들어 줍니다. 1.8kg 대용량으로 온 가족이 둘러앉아 옛 추억을 나누며 맛있는 간식 타임을 즐겨보시길 바랍니다.',
  summary: '온 가족 맛있는 간식! 해태제과 고향만두 1.8kg 대용량 성분 분석'
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
  if (row['폴더이름'] === '해태제과 고향만두 (냉동), 1.8kg, 1개') {
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
