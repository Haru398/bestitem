const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-hansuwi-dehumidifier',
  category: '생활/주방',
  title: '옷장 곰팡이와 꿉꿉한 냄새 완벽 차단! 대용량 한수위 파워습기제거제 효과 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\한수위 파워습기제거제 대용량',
  backupDir: 'D:\\정식서버업로드전용폴더\\한수위 파워습기제거제 대용량',
  link: 'https://link.coupang.com/a/e6YhKa7wbc',
  iframe: '<iframe src="https://coupa.ng/cnPeIN" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '비가 자주 오는 장마철이나 환기가 어려운 겨울철, 옷장과 신발장을 열었을 때 확 풍기는 꿉꿉한 냄새와 옷가지에 피어난 곰팡이는 엄청난 스트레스를 유발합니다. 아무리 비싼 옷이라도 습기 관리를 제대로 하지 않으면 금세 망가지기 십상입니다. 제습기만으로는 커버하기 힘든 좁고 밀폐된 공간의 습기를 강력하게 빨아들이는 \'한수위 파워습기제거제 대용량\' 제품의 제습 원리와 흡수력, 그리고 경제적인 장점을 꼼꼼히 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 강력한 특징은 일반적인 제습제와 비교를 거부하는 압도적인 \'초대용량\' 사이즈입니다. 좁은 공간에 여러 개를 비치해야 했던 기존 소형 제습제들의 번거로움을 해결하기 위해, 한 번의 설치만으로도 몇 배의 수분을 흡수할 수 있는 넉넉한 용량을 자랑합니다. 넓은 드레스룸이나 두꺼운 겨울옷이 빼곡하게 걸려있는 대형 옷장, 통풍이 전혀 되지 않는 지하실 창고 등 덥고 습한 대형 공간에서도 강력한 제습 성능을 잃지 않습니다.' },
    { img: '2.jpg', text: '한수위 파워습기제거제는 최고급 \'고순도 염화칼슘\'을 사용하여 공기 중의 수분을 무서운 속도로 빨아들입니다. 미세한 구멍이 무수히 뚫려있는 최고급 투습막 기술을 적용하여 습기는 빠르게 흡수하면서도, 한 번 흡수된 물과 습기는 밖으로 절대 새어 나가지 않도록 완벽하게 차단합니다. 엎어지거나 기울어져도 내부의 액체가 흐르지 않아 고가의 가죽 가방이나 실크 의류 옆에 두어도 안심하고 사용할 수 있습니다.' },
    { img: '3.jpg', text: '단순히 습기만 제거하는 것에 그치지 않고, 악취의 원인이 되는 곰팡이균의 번식을 억제하는 탈취 효과까지 탁월합니다. 땀에 찌든 신발장 냄새, 오래된 옷장에서 나는 특유의 묵은내를 깔끔하게 잡아주어 쾌적한 실내 환경을 유지해 줍니다. 또한, 물이 가득 차면 버리기 쉽도록 설계된 편리한 분리배출 용기 디자인으로, 제습이 끝난 후 물만 버리고 케이스는 재활용할 수 있어 환경 보호에도 앞장서는 친환경적인 제품입니다.' }
  ],
  outro: '한수위 파워습기제거제 대용량은 눅눅한 실내 환경을 뽀송뽀송하게 바꿔주는 가장 확실하고 경제적인 솔루션입니다. 잦은 교체 없이 오래 사용할 수 있는 압도적인 대용량, 물넘침을 방지하는 안전한 투습막, 곰팡이 방지 탈취 기능까지 꼭 필요한 기능만을 꽉꽉 눌러 담았습니다. 습기와의 전쟁에서 승리하고 소중한 의류와 신발을 안전하게 보관하고 싶다면, 한수위 파워습기제거제가 완벽한 해답이 될 것입니다.',
  summary: '옷장 곰팡이와 꿉꿉한 냄새 완벽 차단! 대용량 한수위 파워습기제거제 효과 분석'
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
