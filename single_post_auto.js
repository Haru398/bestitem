const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-jarrow-dophilus-probiotics',
  category: '건강식품',
  title: '장 건강 필수템! 자로-도필러스 100억 유산균 성분 및 효능 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\재로우 자로-도필러스 EPS 다이제스티브 프로바이오틱 유산균 100억 베지 캡슐, 120정, 4개',
  backupDir: 'D:\\정식서버업로드전용폴더\\재로우 자로-도필러스 EPS 다이제스티브 프로바이오틱 유산균 100억 베지 캡슐, 120정, 4개',
  link: 'https://link.coupang.com/a/eM8OCIBw1k',
  iframe: '<iframe src="https://coupa.ng/cnz6DT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.png', '4.jpg'],
  intro: '배에 가스가 차서 종일 더부룩하고, 시원하게 화장실을 가지 못해 묵직한 아랫배 때문에 고생하신 적 있으신가요? 맵고 짠 자극적인 음식과 스트레스, 그리고 불규칙한 식습관에 시달리는 현대인들에게 장 건강의 적신호는 흔한 일상이 되었습니다. 우리의 장 속에는 면역 세포의 70% 이상이 집중되어 있어, 장이 건강하지 못하면 만성 피로부터 각종 트러블까지 연쇄적인 문제가 발생하게 됩니다. 이처럼 무너진 장내 환경을 근본적으로 되살려줄 글로벌 베스트셀러, 전 세계 수많은 소비자의 장 건강을 책임져 온 **재로우(Jarrow) 자로-도필러스 EPS 다이제스티브 프로바이오틱 100억 유산균**을 자신 있게 소개합니다.\n\n수많은 유산균 제품이 넘쳐나는 시장 속에서 이 제품이 오랜 시간 굳건하게 판매 1위를 지킬 수 있었던 이유는 단순한 마케팅이 아닌 \'압도적인 기술력\'과 \'확실한 체감 효과\'에 있습니다. 아무리 좋은 균주를 많이 먹어도 위산에 녹아 장까지 살아서 가지 못하면 무용지물입니다. 이 제품은 장에 도달하기 전까지 절대 녹지 않는 특허받은 장용성 캡슐 코팅 기술을 적용하여 무려 100억 마리의 유익균을 장 끝까지 안전하게 살려 보냅니다. 당신의 쾌변과 가벼운 아침을 되찾아줄 자로-도필러스 유산균만의 핵심 성분과 특별한 효능을 지금부터 낱낱이 분석해 드리겠습니다.',
  sections: [
    { img: '1.jpg', text: '자로-도필러스의 가장 핵심적인 기술력은 바로 이름에도 명시되어 있는 \'EPS(EntericGuard Proprietary System)\' 장용성 코팅 기술입니다. 일반적인 캡슐은 강한 위산과 담즙산에 의해 장에 도달하기도 전에 유산균이 대부분 사멸하고 마는데, 이 특수 코팅 캡슐은 위액의 공격을 완벽하게 방어하고 오직 장의 환경에서만 사르르 녹도록 설계되었습니다. 덕분에 100억 마리라는 넉넉한 보장균이 장 끝까지 안전하게 살아서 도달하여 튼튼하게 장벽에 정착합니다.' },
    { img: '2.jpg', text: '단순히 균의 마리 수만 많은 것이 아니라 균주의 퀄리티가 다릅니다. 이 제품은 세계 3대 유산균 원료사 중 하나로 꼽히는 듀폰 다니스코, 랄망, 로셀 등의 최상급 프리미엄 균주만을 깐깐하게 엄선하여 배합했습니다. 락토바실러스, 비피도박테리움 등 총 8가지의 다양한 핵심 유익균주가 최적의 비율로 혼합되어 있어 소장과 대장을 아우르는 전반적인 장내 미생물 생태계를 건강하게 복원시켜 줍니다.' },
    { img: '3.png', text: '유산균을 보관할 때마다 냉장고에 넣어야 하는 번거로움 때문에 꾸준히 챙겨 먹는 것을 실패하신 경험이 있으실 겁니다. 이 제품은 실온 보관이 가능한 특별한 패키징 기술과 개별 PTP 알루미늄 블리스터 포장이 적용되어 있습니다. 공기와 습기, 그리고 빛을 완벽하게 차단하여 상온에서도 유산균의 생존율을 극대화했기 때문에, 책상 위나 가방 속에 간편하게 휴대하며 언제 어디서든 잊지 않고 챙겨 먹을 수 있습니다.' },
    { img: '4.jpg', text: '소화력이 약하거나 알레르기에 예민하신 분들도 마음 편히 드실 수 있도록 불필요한 성분은 과감하게 덜어냈습니다. 우유나 유제품을 소화하지 못하는 유당불내증 환자분들도 안전하게 섭취할 수 있는 100% 비건(베지) 캡슐로 만들어졌으며, 글루텐과 인공색소, 방부제 등을 철저하게 배제하여 장이 몹시 예민한 분들이나 임산부도 자극 없이 매우 순하게 섭취할 수 있는 착한 포뮬러를 자랑합니다.' }
  ],
  outro: '매일 아침 화장실 가는 시간이 두렵거나, 식사 후 찾아오는 더부룩함 때문에 소화제에 의존하고 계시나요? 우리의 건강 척도를 좌우하는 장 건강은 꾸준하고 검증된 유산균 섭취에서부터 시작됩니다. 과학적으로 입증된 프리미엄 균주와 강력한 장용성 코팅 기술이 결합된 **재로우 자로-도필러스 EPS 100억 유산균**으로 오늘부터 장내 유익균을 든든하게 채워주세요. 120정 4개의 대용량 패키지로 온 가족의 쾌장과 활력 넘치는 일상을 완성해 보시길 강력히 추천합니다.',
  summary: '장 건강 필수템! 자로-도필러스 100억 유산균 성분 및 효능 리뷰'
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
  if (row['폴더이름'] === '재로우 자로-도필러스 EPS 다이제스티브 프로바이오틱 유산균 100억 베지 캡슐, 120정, 4개') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
