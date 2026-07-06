const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-kleenex-deco-soft-toilet-paper',
  category: '생활용품',
  title: '먼지 없는 도톰한 화장지 추천, 크리넥스 데코 앤 소프트 천연펄프 3겹 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\크리넥스 데코 앤 소프트 화이트 천연펄프 3겹 고급롤화장지',
  backupDir: 'D:\\정식서버업로드전용폴더\\크리넥스 데코 앤 소프트 화이트 천연펄프 3겹 고급롤화장지',
  link: 'https://link.coupang.com/a/e7JYlWQCnA',
  iframe: '<iframe src="https://coupa.ng/cnPwo0" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '우리가 매일 화장실에서, 식탁에서, 방 안에서 피부에 직접 닿게 사용하는 화장지. 아무 화장지나 저렴하다고 구매했다가 먼지가 날려 재채기를 하거나 얇아서 금방 찢어지는 불편함을 겪어본 적 있으실 겁니다. 연약한 피부에 닿는 만큼 성분과 두께, 그리고 먼지 발생량을 꼼꼼히 따져보고 골라야 합니다. 오랜 시간 대한민국 화장지 시장에서 굳건한 1위를 지키고 있는 프리미엄 브랜드 크리넥스의 시그니처 모델, \'크리넥스 데코 앤 소프트 화이트 천연펄프 3겹 고급롤화장지\'는 왜 수많은 가정에서 \'휴지는 무조건 크리넥스\'라고 극찬하는지 그 이유를 두께, 촉감, 성분 세 가지 측면에서 상세히 분석해 드립니다.',
  sections: [
    { img: '1.jpg', text: '100% 무형광 천연펄프로 완성한 안심 성분: 화장지는 민감한 부위에 직접 닿기 때문에 유해 물질 여부가 가장 중요합니다. 이 제품은 재생 펄프를 섞지 않고 오로지 자연에서 얻은 100% 순수 천연펄프만을 사용하여 제조되었습니다. 피부염을 유발할 수 있는 형광증백제와 인공 색소, 자극적인 향을 모두 완벽하게 배제한 무형광, 무색, 무향 제품으로, 어린아이의 연약한 피부나 비염 및 피부 알레르기가 있는 분들도 자극에 대한 걱정 없이 매일 안심하고 사용할 수 있습니다.' },
    { img: '2.jpg', text: '먼지 날림을 최소화한 깔끔한 사용감: 저가형 화장지를 사용할 때 가장 큰 스트레스는 휴지를 뜯을 때마다 공기 중으로 폴폴 날리는 미세한 먼지들입니다. 크리넥스 데코 앤 소프트는 크리넥스만의 독보적인 가공 기술력을 통해 휴지 표면의 미세 먼지와 보풀 발생을 혁신적으로 줄였습니다. 햇빛이 드는 창가에서 휴지를 뜯어보아도 먼지가 거의 날리지 않으며, 호흡기가 예민한 가족이 있는 집이나 먼지 청소에 민감한 깔끔한 성격의 주부님들에게 특히 만족도가 높은 프리미엄 화장지입니다.' },
    { img: '3.jpg', text: '흡수력과 경제성을 모두 잡은 도톰한 3겹 구조: 얇은 2겹 화장지는 조금만 수분을 머금어도 쉽게 찢어지고 손에 묻어 결국 한 번에 많은 양을 풀어서 낭비하게 됩니다. 반면 이 제품은 도톰하고 공기층이 풍부한 3겹 구조로 만들어져 한두 칸만 뜯어 사용해도 물기와 오염 물질을 빠르고 강력하게 흡수합니다. 찢어지거나 뚫릴 염려가 적어 헤프게 쓰지 않게 되므로 롤 하나를 훨씬 오랫동안 사용할 수 있어 장기적으로 볼 때 오히려 경제적이고 가성비가 뛰어납니다.' },
    { img: '4.jpg', text: '마이크로 엠보싱이 선사하는 구름 같은 부드러움: 아무리 두껍고 성분이 좋아도 피부에 닿는 촉감이 거칠면 좋은 화장지라 할 수 없습니다. 휴지 표면에 섬세하게 새겨진 마이크로 데코 엠보싱 패턴은 화장지 겹 사이사이에 쿠션감(공기층)을 형성하여 구름에 닿은 듯 극강의 부드러움을 선사합니다. 잦은 사용에도 피부에 미세한 스크래치나 붉어짐을 유발하지 않아 닦아내는 순간의 자극을 최소화했으며, 은은한 나뭇잎 패턴은 욕실 공간을 한층 고급스럽게 연출해 줍니다.' }
  ],
  outro: '크리넥스 데코 앤 소프트 화이트 천연펄프 3겹 화장지는 \'화장지가 다 거기서 거기지\'라는 편견을 깨고 프리미엄 화장지의 기준을 새롭게 정립한 제품입니다. 먼지 없는 깔끔함, 안심할 수 있는 100% 천연 성분, 그리고 기분 좋은 부드러움까지, 매일 반복되는 일상 속 작은 순간의 퀄리티를 확실하게 높여줍니다. 피부 건강을 생각하고 먼지 날림 없는 쾌적한 실내 환경을 원하신다면 우리 집 생필품 1순위로 크리넥스를 적극 추천해 드립니다.',
  summary: '먼지 없는 도톰한 화장지 추천, 크리넥스 데코 앤 소프트 천연펄프 3겹 분석'
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
