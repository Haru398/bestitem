const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-nongshim-yukgaejang',
  category: '식품',
  title: '국민 컵라면 추천! 농심 육개장 사발면 86g 솔직 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\육개장 사발면 86g, 6개',
  backupDir: 'D:\\정식서버업로드전용폴더\\육개장 사발면 86g, 6개',
  link: 'https://link.coupang.com/a/eM9hWWvrrg',
  iframe: '<iframe src="https://coupa.ng/cnz6Wq" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '비 오는 날, 캠핑장, 수영장, 혹은 늦은 밤 출출할 때 가장 먼저 생각나는 소울푸드가 있으신가요? 한국인이라면 열에 아홉은 주저 없이 컵라면을 외칠 것입니다. 수백 가지의 화려한 신제품들이 쏟아지는 치열한 라면 시장 속에서도, 무려 40년이 넘는 긴 세월 동안 굳건하게 판매 1위 자리를 지키며 남녀노소 모두의 입맛을 사로잡은 전설적인 베스트셀러가 있습니다. 바로 대한민국 국민 컵라면, **농심 육개장 사발면 86g**입니다.\n\n이 제품은 화려한 토핑이나 자극적이고 매운맛으로 승부하는 요즘 라면들과는 궤를 달리합니다. 얇고 꼬들꼬들한 면발과 깊고 진한 소고기 육수 베이스의 얼큰한 국물이 만들어내는 기가 막힌 밸런스는, 먹을 때마다 감탄을 자아내며 \'아는 맛이 가장 무섭다\'는 진리를 다시금 깨닫게 해줍니다. 출출함을 달래주는 가벼운 간식부터 김밥이나 삼각김밥과 곁들이는 든든한 한 끼 식사까지, 언제 어디서나 우리를 실망시키지 않는 농심 육개장 사발면만의 대체 불가한 매력을 지금부터 하나씩 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '육개장 사발면의 아이덴티티이자 대체 불가능한 매력은 바로 특유의 \'얇고 꼬들꼬들한 면발\'에 있습니다. 일반적인 컵라면보다 훨씬 얇게 뽑아낸 면발은 끓는 물을 붓고 단 3분이면 완벽하게 익어 바쁜 현대인들의 시간을 아껴줍니다. 면발 사이사이에 국물이 흠뻑 스며들어 씹을 때마다 얼큰한 육수의 감칠맛이 폭발하며, 다 먹을 때까지 쉽게 퍼지지 않고 탱글탱글한 식감을 유지하는 농심만의 압도적인 제면 기술력이 고스란히 담겨있습니다.' },
    { img: '2.jpg', text: '한국인의 소울을 건드리는 \'얼큰하고 시원한 국물 맛\' 역시 이 제품이 국민 컵라면으로 등극한 핵심 비결입니다. 진하게 우려낸 소고기 육수를 베이스로 하여 고춧가루의 칼칼함과 마늘의 알싸함을 황금 비율로 배합했습니다. 한 모금 마시는 순간 목구멍을 타고 넘어가는 깊고 진한 감칠맛은 전날 마신 술로 인한 숙취를 단숨에 풀어주는 해장용으로도 완벽하며, 찬밥을 훌훌 말아 먹으면 국물 한 방울까지 남길 수 없는 마성의 매력을 자랑합니다.' },
    { img: '3.jpg', text: '육개장 사발면의 뚜껑을 열었을 때 가장 먼저 반겨주는 앙증맞고 친숙한 \'회오리 모양 어묵(나루토마끼)\'과 큼직한 계란 스크램블 건더기는 먹는 재미를 한층 더해줍니다. 뜨거운 물에 부드럽게 풀어진 계란 건더기는 얼큰한 국물 맛을 부드럽게 중화시켜 주며, 쫄깃한 식감의 회오리 어묵은 시각적인 즐거움은 물론이고 라면 전체의 풍미를 한 단계 끌어올리는 감초 역할을 톡톡히 해냅니다.' },
    { img: '4.jpg', text: '86g이라는 부담 없는 중량은 어떤 상황에서도 완벽한 활용도를 보여줍니다. 출출한 오후 시간대에 과한 식사가 부담스러울 때 가볍게 즐기기 좋은 간식으로 안성맞춤이며, 김밥, 유부초밥, 삼각김밥 등 밥류와 함께 곁들일 때 양이 넘치지 않고 완벽한 밸런스를 맞춰주는 최고의 짝꿍입니다. 6개 묶음 세트로 구성되어 있어 가정집이나 사무실 팬트리에 든든하게 쟁여두기에도 제격입니다.' }
  ],
  outro: '트렌드가 빠르게 변하고 새로운 맛이 끊임없이 등장해도, 결국 우리가 다시 돌아가게 되는 종착지는 \'가장 익숙하고 맛있는 기본\'입니다. 얇은 면발이 호로록 넘어가는 경쾌한 소리, 얼큰한 국물이 선사하는 따뜻한 위로! 대한민국 라면 역사의 산증인이자 변치 않는 클래식, **농심 육개장 사발면 86g**과 함께라면 당신의 평범한 일상 속 소소한 출출함이 가장 완벽한 만족감으로 바뀔 것입니다. 컵라면의 절대 강자, 지금 바로 만나보세요!',
  summary: '국민 컵라면 추천! 농심 육개장 사발면 86g 솔직 리뷰'
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
  if (row['폴더이름'] === '육개장 사발면 86g, 6개') {
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
