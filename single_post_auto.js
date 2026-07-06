const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-pulmuone-water-label-free-2l',
  category: '식품',
  title: '지구를 살리는 깨끗한 습관, 풀무원샘물 무라벨 2L 생수 미네랄 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\풀무원샘물 무라벨, 2L, 24개',
  backupDir: 'D:\\정식서버업로드전용폴더\\풀무원샘물 무라벨, 2L, 24개',
  link: 'https://link.coupang.com/a/e7KO7kaV52',
  iframe: '<iframe src="https://coupa.ng/cnPwuX" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg'],
  intro: '우리 몸의 70%를 차지하는 물은 단순한 갈증 해소를 넘어 건강을 유지하는 가장 기본적인 필수 요소입니다. 하지만 매일 마시는 생수를 고를 때 수원지가 어디인지, 미네랄 함량은 어느 정도인지 꼼꼼하게 따져보고 구매하는 분들은 생각보다 많지 않습니다. 온 가족이 매일 안심하고 마실 수 있는 맑고 깨끗한 수질은 물론이고, 매번 분리수거할 때마다 번거로웠던 비닐 라벨까지 깔끔하게 없애 환경까지 생각한 \'풀무원샘물 무라벨 2L\'가 최근 스마트한 소비자들 사이에서 폭발적인 인기를 끌고 있습니다. 천혜의 자연이 빚어낸 맑은 물방울의 비밀과 무라벨 생수가 가져다주는 일상 속 편리함에 대해 자세히 알아봅니다.',
  sections: [
    { img: '1.jpg', text: '수원지부터 남다른 천연 미네랄워터의 맑은 맛: 물맛의 핵심은 결국 물을 끌어올리는 \'수원지\'의 환경에 달려 있습니다. 풀무원샘물은 화강암 지대의 촘촘한 자연 필터를 거치며 오랜 시간 동안 자연스럽게 정화된 맑은 천연 암반수만을 담아냅니다. 이 과정에서 칼슘, 마그네슘, 칼륨 등 우리 몸에 꼭 필요한 천연 미네랄 성분이 물속에 풍부하게 녹아들어, 마실 때마다 목 넘김이 아주 부드럽고 특유의 깔끔하고 청량한 물맛을 선사합니다. 깐깐한 수질 검사를 통과한 안전한 물이므로 면역력이 약한 아이들이나 어르신들도 안심하고 매일 마실 수 있습니다.' },
    { img: null, text: '분리수거의 번거로움을 날려버린 완벽한 무라벨 에코 패키지: 페트병을 버릴 때마다 비닐 라벨을 칼로 뜯어내느라 짜증 났던 경험이 한 번쯤 있으실 겁니다. 이 제품은 이름 그대로 페트병 겉면의 비닐 라벨을 과감하게 없앤 친환경 \'무라벨(Label-Free)\' 패키징을 적용했습니다. 다 마신 빈 병은 가볍게 발로 밟아 납작하게 찌그러뜨린 뒤 플라스틱 수거함에 바로 쏙 던져 넣기만 하면 분리수거가 끝납니다. 불필요한 비닐 폐기물을 줄여 지구의 환경 보호에 동참할 수 있을 뿐만 아니라, 가사 노동의 시간까지 획기적으로 줄여주는 1석 2조의 똑똑한 제품입니다.' },
    { img: null, text: '넉넉한 2L 용량과 24개 대용량 박스의 압도적인 든든함: 요리를 하거나 차를 끓일 때, 그리고 여름철 물 소비량이 급격히 늘어날 때면 500ml 생수로는 턱없이 부족함을 느낍니다. 2L의 넉넉한 대용량은 온 가족이 함께 식수를 해결하거나 국물 요리를 할 때 아낌없이 팍팍 쓰기에 가장 완벽한 사이즈입니다. 특히 무거운 생수를 마트에서 낑낑대며 들고 올 필요 없이, 24개들이 대용량 박스로 문 앞까지 편리하게 배송받아 베란다나 다용도실에 차곡차곡 쌓아두면 든든한 식수 창고가 완성되어 물이 떨어질 걱정 없이 안심하고 생활할 수 있습니다.' }
  ],
  outro: '풀무원샘물 무라벨 2L는 우리가 매일 마시는 물의 본질적인 가치인 \'깨끗함\'에 완벽하게 충실하면서도, 라벨을 없애는 작은 혁신을 통해 환경과 소비자의 편리함까지 모두 잡아낸 훌륭한 생수입니다. 화강암이 걸러낸 맑고 부드러운 천연 미네랄 암반수를 매일 마시는 건강한 습관은 비싼 영양제를 챙겨 먹는 것 이상의 가치가 있습니다. 번거로운 분리수거에서 해방되어 일상의 여유를 되찾고, 문 앞까지 배송되는 24개의 든든함으로 온 가족의 수분 충전을 똑똑하게 책임져 보시길 바랍니다.',
  summary: '지구를 살리는 깨끗한 습관, 풀무원샘물 무라벨 2L 생수 미네랄 성분 분석'
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

let imgIdx = 0;
for (let i = 0; i < product.sections.length; i++) {
  const sec = product.sections[i];
  if (sec.img) {
    stmtSecWithImg.run(product.id, order++, additionalImageUrls[imgIdx++], sec.text);
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
