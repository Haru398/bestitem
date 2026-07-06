const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-beaumonde-cooling-pad',
  category: '가구/인테리어',
  title: '열대야 극복을 위한 필수 침구, 보몽드 국내 제조 시원한 냉감패드 소재 및 쿨링 효과 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\보몽드 국내 제조 시원한 냉감패드',
  backupDir: 'D:\\정식서버업로드전용폴더\\보몽드 국내 제조 시원한 냉감패드',
  link: 'https://link.coupang.com/a/e6ZHMwC8kK',
  iframe: '<iframe src="https://coupa.ng/cnPfEk" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '지구 온난화로 인해 매년 여름철 폭염과 열대야 일수가 증가하면서, 수면의 질을 높여주는 여름용 기능성 침구에 대한 소비자들의 관심이 그 어느 때보다 뜨겁습니다. 단순히 얇은 이불을 덮는 것을 넘어, 피부에 닿자마자 체온을 낮춰주는 특수 \'냉감(Cooling)\' 소재를 적용한 패드가 여름 침구 시장의 필수템으로 자리 잡았습니다. 수많은 수입산 저가 제품들 사이에서 철저한 품질 관리와 뛰어난 내구성으로 굳건한 신뢰를 얻고 있는 \'보몽드 국내 제조 시원한 냉감패드\'의 혁신적인 쿨링 소재 원리와 세탁 관리 방법 등 구매 전 반드시 알아야 할 핵심 정보들을 상세히 안내해 드립니다.',
  sections: [
    { img: '1.jpg', text: '즉각적인 체열 흡수와 방출을 돕는 첨단 냉감 원사: 이 제품의 가장 큰 특징은 피부가 표면에 닿는 순간 시원함(접촉 냉감)을 느끼게 해주는 첨단 기능성 폴리에틸렌 원사를 100% 사용했다는 점입니다. 일반적인 면이나 리넨 소재와 달리 쿨링 원사는 열전도율이 매우 뛰어나, 수면 중 등이나 엉덩이에서 발생하는 체열을 빠르게 흡수하고 공기 중으로 즉각 방출합니다. 따라서 밤새 뒤척이거나 땀을 많이 흘리는 성인 및 기초 체온이 높은 어린아이들도 쾌적하고 보송보송한 환경에서 숙면을 취할 수 있도록 도와줍니다.' },
    { img: '2.jpg', text: '안심할 수 있는 100% 국내 제조의 뛰어난 품질과 내구성: 저렴한 단가를 위해 해외 공장에서 대량 생산되는 제품들과 달리, 보몽드 냉감패드는 원단 직조부터 꼼꼼한 봉제 마감에 이르기까지 전 공정이 100% 대한민국 국내에서 이루어집니다. 촘촘하고 정교한 다이아몬드 퀼팅 누빔 처리가 되어 있어 잦은 뒤척임에도 원단이 우는 현상을 방지하며, 모서리 부분의 바이어스 마감이 매우 튼튼하게 박음질 되어있어 오랜 기간 사용하여도 올이 쉽게 풀리지 않는 뛰어난 내구성을 자랑합니다. 피부에 직접 닿는 제품인 만큼 국내의 엄격한 유해 물질 테스트를 거쳐 안전성을 입증받았습니다.' },
    { img: '3.jpg', text: '미끄럼 방지 패드와 간편한 물세탁 관리법: 침대 매트리스 위에 올려놓고 사용할 때 패드가 이리저리 밀려 매일 아침 정리해야 하는 번거로움을 해결하기 위해, 패드 뒷면 전체에 고밀도 논슬립(Non-slip) 도트 처리를 꼼꼼하게 적용했습니다. 어떠한 움직임에도 침구의 형태가 견고하게 고정되어 편안함을 극대화합니다. 또한, 기능성 원단임에도 불구하고 까다로운 드라이클리닝 대신 가정용 세탁기를 이용한 기계 세탁(울코스, 찬물 단독 세탁 권장)이 가능하여 여름철 땀과 유분으로 오염된 패드를 항상 위생적이고 청결하게 관리할 수 있습니다.' }
  ],
  outro: '보몽드 국내 제조 시원한 냉감패드는 덥고 습한 여름철 불면증으로 고통받는 분들에게 쾌적한 수면 환경을 선사하는 최고의 해결책입니다. 검증된 국내 생산의 압도적인 퀄리티와 즉각적인 쿨링 효과, 그리고 세탁의 편의성까지 모두 갖춘 완벽한 여름 침구입니다. 매년 찾아오는 지독한 열대야를 대비하여 미리 기능성 냉감패드를 준비하시고, 에어컨 사용량은 줄이면서 건강하고 시원한 꿀잠을 청해보시길 적극 추천합니다.',
  summary: '열대야 극복을 위한 필수 침구, 보몽드 국내 제조 시원한 냉감패드 소재 및 쿨링 효과 완벽 분석'
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
