const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-tamsa-powerwash-detergent',
  category: '생활용품',
  title: '가성비 뛰어난 탁월한 세척력! 탐사 파워워시 대용량 액체세제 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\탐사 파워워시 액체세제 본품, 2.5L, 4개',
  backupDir: 'D:\\정식서버업로드전용폴더\\탐사 파워워시 액체세제 본품, 2.5L, 4개',
  link: 'https://link.coupang.com/a/eNFGWRTG4O',
  iframe: '<iframe src="https://coupa.ng/cnAnmb" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '빨래는 사계절 내내 끊이지 않는 집안일 중 하나입니다. 특히 가족 구성원이 많거나 땀을 많이 흘리는 여름철에는 하루가 멀다 하고 세탁기를 돌리게 되는데, 이럴 때마다 푹푹 줄어드는 세제 양을 보면 은근히 생활비에 부담이 되기 마련입니다. 그렇다고 가격만 저렴한 아무 세제나 썼다가는 찌든 때가 제대로 지워지지 않거나 옷감에 세제 찌꺼기가 남을까 봐 걱정되는 것이 주부들의 현실입니다. 이런 고민을 말끔하게 씻어줄 진정한 짐승 용량 가성비템, **탐사 파워워시 액체세제 본품 2.5L**를 소개합니다.\n\n이 제품은 이름에서부터 알 수 있듯 넉넉한 대용량에 강력한 세척력을 자랑하면서도 믿기 힘들 정도로 합리적인 가격대를 형성하여, 세탁세제 유목민들의 정착템으로 뜨거운 인기를 얻고 있습니다. 매일 쌓이는 빨랫감 앞에서도 더 이상 세제 값 걱정 없이 마음껏 펌핑할 수 있는 탐사 파워워시 액체세제의 뛰어난 세척 원리와 장점들을 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '탐사 파워워시 액체세제의 가장 강력한 무기는 바로 \'베이킹소다를 함유한 압도적인 세척력\'입니다. 예로부터 천연 세정제로 널리 쓰여 온 베이킹소다 성분이 함유되어 있어, 옷감 섬유 사이사이에 깊숙이 침투한 찌든 때와 불쾌한 냄새의 원인까지 말끔하게 분해해 줍니다. 땀 얼룩, 음식물 국물 등 지우기 까다로운 오염 물질도 시원하게 지워내어 갓 삶아 빤 듯 깨끗한 결과물을 확인할 수 있습니다.' },
    { img: '2.jpg', text: '피부에 직접 닿는 옷을 빠는 세제인 만큼 성분 또한 매우 중요합니다. 이 제품은 형광증백제를 비롯하여 파라벤, 트리클로산, MIT/CMIT 등 피부 자극이나 알레르기를 유발할 수 있는 유해 의심 성분 8가지를 깐깐하게 배제하고 만들어졌습니다. 덕분에 어른 옷은 물론이고 피부가 연약한 아이들의 옷까지 안심하고 세탁할 수 있는 순한 처방을 자랑하는 온 가족 안심 세제입니다.' },
    { img: '3.jpg', text: '드럼세탁기와 일반 통돌이 세탁기 모두에 사용할 수 있는 공용 세제로, 세탁기 종류에 맞춰 세제를 따로 구매할 필요가 없어 매우 실용적입니다. 또한 차가운 찬물에도 뭉침 없이 부드럽게 잘 녹아내리는 뛰어난 용해력을 갖추고 있어, 세제 찌꺼기가 옷감에 남거나 세탁조 벽에 눌어붙어 곰팡이를 유발하는 현상을 방지해 줍니다. 상쾌하고 은은하게 퍼지는 플로럴 향기는 세탁 후 기분까지 보송보송하게 만들어줍니다.' }
  ],
  outro: '매일 하는 빨래, 더 이상 비싼 세제 가격 때문에 스트레스받지 마세요. 2.5L라는 든든한 짐승 용량이 4개나 들어있는 구성으로 오랫동안 세제 떨어질 걱정 없이 쟁여두고 든든하게 사용할 수 있습니다. 유해 성분은 빼고 베이킹소다의 강력한 세정력은 꽉꽉 채워 넣은 **탐사 파워워시 액체세제**와 함께, 지갑은 가볍게 지키면서 온 가족의 옷을 깨끗하고 향기롭게 관리하는 똑똑한 살림의 지혜를 발휘해 보시길 권해드립니다.',
  summary: '가성비 뛰어난 탁월한 세척력! 탐사 파워워시 대용량 액체세제 분석'
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
  if (row['폴더이름'] === '탐사 파워워시 액체세제 본품, 2.5L, 4개') {
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
