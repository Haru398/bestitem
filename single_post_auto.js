const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-happyhome-power-mat',
  category: '생활용품',
  title: '여름 모기 완벽 차단! 해피홈 블랙에디션 파워매트S 세트 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\해피홈 블랙에디션 파워매트S 리필 78p + 플러그형 훈증기 세트, 2세트',
  backupDir: 'D:\\정식서버업로드전용폴더\\해피홈 블랙에디션 파워매트S 리필 78p + 플러그형 훈증기 세트, 2세트',
  link: 'https://link.coupang.com/a/eNMKx3mIrQ',
  iframe: '<iframe src="https://coupa.ng/cnAomO" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png'],
  intro: '무더운 여름밤, 귓가를 맴도는 불쾌한 모기 소리 때문에 밤잠을 설쳐본 경험은 누구나 한 번쯤 있으실 겁니다. 시중에 나와 있는 다양한 모기 퇴치제 중에서도, 액체나 스프레이가 아닌 전통적인 매트형 훈증기는 특유의 안정감과 뛰어난 지속력으로 여전히 많은 분들의 사랑을 받고 있습니다. 하지만 매번 리필을 갈아 끼우는 번거로움이나 아쉬운 디자인 때문에 사용을 망설이셨다면, 유한양행에서 야심 차게 선보인 **해피홈 블랙에디션 파워매트S 세트**를 주목해 보시길 바랍니다.\n\n이 제품은 모기약 특유의 투박함을 벗어던지고 세련된 무광 블랙 컬러를 입어 인테리어 소품으로도 손색이 없는 감각적인 디자인을 자랑합니다. 78개의 넉넉한 리필 매트와 플러그형 훈증기 본체가 2세트나 포함된 역대급 짐승 용량 구성으로, 올여름 우리 집 모기 방어막을 든든하게 책임져 줄 해피홈 블랙에디션만의 독보적인 스펙을 낱낱이 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '가장 눈에 띄는 변화는 단연 \'시크하고 세련된 블랙 디자인\'입니다. 기존의 알록달록하고 촌스러웠던 모기 훈증기들과 달리, 무광의 깔끔한 블랙 컬러를 채택하여 침실, 거실, 아이 방 등 어떤 공간의 콘센트에 꽂아두어도 시각적으로 튀지 않고 자연스럽게 녹아듭니다. 인테리어에 민감한 분들도 부담 없이 꺼내놓고 사용할 수 있으며, 생활 공간의 품격을 한 단계 높여주는 모던한 감성을 선사합니다.' },
    { img: '2.png', text: '디자인뿐만 아니라 살충력과 사용 편의성 또한 대폭 업그레이드되었습니다. 새로워진 파워매트S 리필은 강력한 살충 성분을 머금고 있어 전원을 켜는 순간 공기 중으로 빠르고 고르게 퍼져나가 숨어있는 모기들까지 효과적으로 차단합니다. 또한, 기존 제품들보다 매트의 지속 시간이 길어져 한 장으로 하룻밤 내내 든든하게 모기의 접근을 막아주며, 매트가 하얗게 변색되어 교체 시기를 직관적으로 알려주기 때문에 관리가 매우 편리합니다.' },
    { img: '3.png', text: '안전성 측면에서도 유한양행의 깐깐한 품질 기준을 통과하여 믿을 수 있습니다. 인체에 미치는 영향을 최소화하면서도 모기에게만 치명적인 살충 성분을 엄선하여 배합하였으며, 훈증기 본체는 내열성이 뛰어난 안전 소재로 제작되어 장시간 꽂아두어도 과열로 인한 화재 위험을 방지합니다. 작동 중에는 은은한 LED 표시등이 점등되어 한밤중에도 작동 상태를 쉽게 확인할 수 있는 세심한 배려가 돋보입니다.' },
    { img: '4.png', text: '가장 놀라운 점은 무려 플러그형 훈증기 2개와 리필 매트 78장이 포함된 \'압도적인 가성비 구성\'입니다. 거실과 침실 등 여러 공간에 동시에 설치하여 완벽한 방어막을 구축할 수 있으며, 78장의 넉넉한 리필 매트는 매일매일 하나씩 사용하더라도 올여름 내내 모기 걱정 없이 쾌적한 밤을 보낼 수 있게 해 줍니다. 잦은 재구매의 번거로움과 경제적인 부담을 한 번에 덜어주는 최고의 실속 패키지라 할 수 있습니다.' }
  ],
  outro: '모기와의 끝없는 전쟁 속에서 디자인과 성능, 그리고 가성비까지 모두 잡고 싶다면 정답은 하나입니다. 우리 집 인테리어를 해치지 않는 모던한 블랙 감성과 하룻밤을 거뜬하게 책임지는 강력한 파워매트S의 조합, **해피홈 블랙에디션 세트**와 함께라면 올여름 모기 스트레스는 영원히 안녕입니다. 넉넉한 구성의 2세트를 거실과 침실에 꽂아두고, 사랑하는 가족들과 함께 모기 물릴 걱정 없는 꿀잠을 예약해 보세요.',
  summary: '여름 모기 완벽 차단! 해피홈 블랙에디션 파워매트S 세트 성분 분석'
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
  if (row['폴더이름'] === '해피홈 블랙에디션 파워매트S 리필 78p + 플러그형 훈증기 세트, 2세트') {
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
