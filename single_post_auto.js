const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-downy-mystique-1-05l',
  category: '생활용품',
  title: '5성급 호텔의 시그니처 향기! 다우니 초고농축 섬유유연제 미스티크 성분 및 지속력 완벽 분석',
  sourceDir: 'D:\\정식서버업로드전용폴더\\다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 본품, 1.05L, 3개',
  backupDir: 'D:\\정식서버업로드전용폴더\\다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 본품, 1.05L, 3개',
  link: 'https://link.coupang.com/a/e6UF3a',
  iframe: '<iframe src="https://coupa.ng/cnw2ch" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
  intro: '빨래 후에도 금방 날아가는 향기 때문에 고민이신가요? 특히 장마철이나 실내 건조를 할 때는 꿉꿉한 냄새가 옷에 배어 불쾌감을 주는 경우가 많습니다. 매일 입는 옷에서 고급스러운 호텔 침구의 향기가 난다면 일상의 질이 한층 올라갈 것입니다. 시중에 수많은 섬유유연제가 있지만, 독보적인 잔향과 우아한 향기로 많은 사랑을 받고 있는 \'다우니 초고농축 호텔 컬렉션 미스티크\'가 왜 그토록 특별한지 그 매력과 성분, 그리고 올바른 활용법까지 상세히 알아보겠습니다.',
  sections: [
    { img: '1.png', text: '향기의 퀄리티는 베이스 노트가 좌우합니다. 다우니 미스티크는 일반적인 섬유유연제와 달리 세계적인 퍼퓸 크리에이터들이 직접 조향에 참여하여 완성된 \'프리미엄 니치 향수\' 수준의 깊이감을 자랑합니다. 마치 5성급 호텔 로비에 들어섰을 때 느껴지는 우아하고 관능적인 튜베로즈와 샌달우드 향이 어우러져 세탁 후에도 고급스러운 분위기를 연출해 줍니다.' },
    { img: '2.png', text: '가장 주목할 만한 기술은 바로 \'향기 캡슐\'입니다. 다우니만의 독자적인 초미세 향기 캡슐 기술이 섬유 사이사이에 스며들어, 옷을 입고 활동하는 동안 가벼운 마찰이 일어날 때마다 캡슐이 톡톡 터지며 향기를 지속적으로 발산합니다. 이로 인해 아침에 입은 옷의 향기가 퇴근할 때까지 은은하게 유지되는 놀라운 지속력을 경험할 수 있습니다.' },
    { img: '3.png', text: '경제성 또한 빼놓을 수 없는 장점입니다. 일반 섬유유연제 대비 3배 농축된 \'초고농축\' 포뮬러를 적용하여, 기존 사용량의 3분의 1만 사용해도 충분한 유연 효과와 향기를 낼 수 있습니다. 1.05L 용량 3개 세트로 구성되어 있어 가성비가 뛰어나며, 소량 사용으로도 세탁물의 부드러움과 풍부한 잔향을 완벽하게 구현합니다.' },
    { img: '4.png', text: '민감한 피부를 가진 분들이라면 섬유유연제 선택에 신중할 수밖에 없습니다. 다우니 미스티크는 미세플라스틱, 색소, 방부제 등 피부에 자극을 줄 수 있는 유해 의심 성분들을 철저히 배제하고 피부 자극 테스트를 완료하여 온 가족의 의류나 수건, 침구류에도 안심하고 사용할 수 있는 안전한 성분 배합을 자랑합니다.' },
    { img: '5.png', text: '특히 수건이나 침구류 세탁 시 그 진가가 발휘됩니다. 빳빳해진 수건의 올을 부드럽게 살려주어 피부에 닿는 촉감을 개선할 뿐만 아니라, 정전기 방지 기능이 탁월하여 건조한 계절이나 먼지가 많은 날에도 옷감이 몸에 달라붙거나 먼지가 타는 현상을 효과적으로 막아줍니다.' },
    { img: '6.png', text: '실내 건조 시 발생하는 특유의 꿉꿉한 물비린내를 원천적으로 차단하는 탈취 및 소취 기능도 강력합니다. 햇볕에 말리기 어려운 장마철이나 통풍이 잘되지 않는 좁은 원룸에서 빨래를 건조하더라도, 눅눅한 냄새 대신 은은한 퍼퓸 향만이 가득 채워져 실내 방향제 역할까지 톡톡히 해냅니다.' }
  ],
  outro: '다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크는 단순한 섬유유연제를 넘어 당신의 일상에 프리미엄 호텔의 품격을 더해주는 향기 아이템입니다. 독보적인 잔향, 초고농축의 뛰어난 가성비, 그리고 안심할 수 있는 성분까지 모든 면에서 만족스러운 선택이 될 것입니다. 매일 입는 옷차림에 우아한 향기로 자신감을 불어넣어 보세요.',
  summary: '5성급 호텔의 시그니처 향기! 다우니 초고농축 섬유유연제 미스티크 성분 및 지속력 완벽 분석'
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

// Skipping dir copy/delete since it is already in backupDir
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
