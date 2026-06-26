const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-homeglow-waterproof',
  category: '생활용품',
  title: '장마철 필수템! 홈글로우 프리미엄 투명 방수제 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\BEST 상품 홈글로우 프리미엄 침투형 투명 방수제, 1개, 500g',
  backupDir: 'D:\\정식서버업로드전용폴더\\BEST 상품 홈글로우 프리미엄 침투형 투명 방수제, 1개, 500g',
  link: 'https://link.coupang.com/a/eNLBqR7IAu',
  iframe: '<iframe src="https://coupa.ng/cnAobM" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '여름 장마철만 다가오면 천장이나 벽면, 베란다 구석에서 스멀스멀 피어오르는 곰팡이와 뚝뚝 떨어지는 물방울 때문에 스트레스 받으시는 분들이 많습니다. 눈에 띄는 누수를 방치하면 건물 내부는 물론 소중한 가구들까지 망가뜨리는 원인이 되기 때문에 초기에 확실하게 차단하는 것이 무엇보다 중요합니다. 하지만 막상 방수 공사를 하려니 큰 비용과 복잡한 시공 과정이 부담스럽게 느껴질 수 있는데요. 붓 하나로 칠하기만 하면 끝나는 혁신적인 솔루션, **홈글로우 프리미엄 침투형 투명 방수제**를 소개합니다.\n\n이 제품은 기존의 탁하고 지저분한 방수제들과 달리 바른 듯 안 바른 듯 투명하게 마감되어 인테리어를 해치지 않는 것이 특징입니다. 갈라진 틈새 사이로 미세하게 스며들어 물 샐 틈 없는 강력한 보호막을 형성해 주는 홈글로우 투명 방수제만의 놀라운 침투력과 간편한 시공 방법에 대해 상세하게 알아보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 방수제의 가장 큰 장점은 제품명에서도 알 수 있듯이 타일이나 시멘트, 벽돌 등 기존 마감재의 질감과 색상을 그대로 살려주는 \'투명한 마감력\'입니다. 욕실 타일 틈새나 베란다, 외벽 등에 칠해도 흉한 얼룩이나 자국이 남지 않고 깔끔하게 건조되기 때문에 시공 후의 미관을 전혀 해치지 않습니다. 집안 어디든 물이 새는 곳이라면 인테리어 훼손 걱정 없이 안심하고 사용할 수 있는 것이 핵심 경쟁력입니다.' },
    { img: '2.jpg', text: '겉면만 임시방편으로 덮어주는 일반 방수제와는 차원이 다른 기술력을 적용했습니다. 미세한 균열이나 틈새 깊숙한 곳까지 나노 단위로 침투하여 투명한 방수막을 겹겹이 형성하는 구조로, 근본적인 누수 원인을 완벽에 가깝게 차단해 줍니다. 강력한 접착력과 내수성을 바탕으로 한 번 시공해 두면 오랜 기간 동안 비바람과 습기에도 쉽게 떨어지거나 부식되지 않고 튼튼하게 유지됩니다.' },
    { img: '3.jpg', text: '전문적인 기술이나 값비싼 시공 도구가 전혀 필요하지 않아 누구나 쉽게 셀프 시공이 가능합니다. 물이 새는 곳의 물기와 먼지를 깨끗하게 닦아내고 완전히 건조시킨 다음, 동봉된 붓을 이용해 액상 형태의 방수제를 슥슥 발라주기만 하면 시공이 끝납니다. 500g의 넉넉한 용량으로 넓은 면적을 커버할 수 있으며, 초보자도 전문가 못지않은 훌륭한 방수 마감을 경험할 수 있습니다.' },
    { img: '4.jpg', text: '실내뿐만 아니라 가혹한 외부 환경에서도 버틸 수 있도록 우수한 내후성을 갖췄습니다. 뜨거운 여름의 직사광선이나 한겨울의 매서운 추위 속에서도 칠해진 방수막이 쉽게 갈라지거나 변형되지 않아 사계절 내내 든든한 방패막이 되어 줍니다. 화장실 바닥, 외벽 균열, 지붕 누수 등 장소와 부위를 가리지 않고 맹활약하는 만능 해결사로서 집 안팎의 골칫거리를 속 시원하게 해결해 줄 것입니다.' }
  ],
  outro: '매번 비가 올 때마다 불안한 마음에 양동이를 받쳐두고 한숨짓던 날들은 이제 끝내셔도 좋습니다. 누구나 쉽게 칠할 수 있는 간편함과 틈새 깊숙이 스며드는 강력한 침투력, 그리고 마감재의 아름다움을 지켜주는 투명함까지 삼박자를 모두 갖춘 **홈글로우 프리미엄 침투형 투명 방수제**가 다가오는 장마철의 걱정을 덜어드립니다. 500g 한 통으로 우리 집의 취약한 곳들을 단단하게 보수하고 뽀송뽀송한 일상을 되찾아 보세요.',
  summary: '장마철 필수템! 홈글로우 프리미엄 투명 방수제 성분 분석'
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
  if (row['폴더이름'] === 'BEST 상품 홈글로우 프리미엄 침투형 투명 방수제, 1개, 500g') {
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
