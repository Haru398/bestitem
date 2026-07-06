const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-post-protein-bar',
  category: '식품',
  title: '바쁜 현대인을 위한 맛있는 에너지 충전, 포스트 단백질바 500g 영양 성분 및 섭취 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\포스트 단백질바, 500g, 2개',
  backupDir: 'D:\\정식서버업로드전용폴더\\포스트 단백질바, 500g, 2개',
  link: 'https://link.coupang.com/a/e6Y8M1zF4S',
  iframe: '<iframe src="https://coupa.ng/cnPfgF" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '건강과 체력 관리에 대한 관심이 높아지면서, 바쁜 일상 속에서도 간편하게 단백질을 섭취할 수 있는 프로틴 바(Protein Bar)의 인기가 꾸준히 상승하고 있습니다. 과거의 단백질 바가 퍽퍽하고 맛이 없다는 편견을 깨고, 최근에는 뛰어난 맛과 훌륭한 영양 밸런스를 동시에 갖춘 제품들이 대거 출시되고 있습니다. 그중에서도 시리얼 명가 \'포스트(Post)\'에서 선보인 \'포스트 단백질바 500g\'은 고소한 견과류와 달콤한 초콜릿의 조화로 남녀노소 누구나 부담 없이 즐길 수 있는 대표적인 영양 간식입니다. 본 글에서는 포스트 단백질바의 주요 영양 성분, 칼로리 정보, 그리고 일상생활 속에서 200% 활용할 수 있는 효과적인 섭취 방법을 상세히 분석해 드립니다.',
  sections: [
    { img: '1.jpg', text: '핵심 영양소 단백질의 든든한 함량: 근육의 생성과 유지, 그리고 기초 대사량 증가에 필수적인 영양소인 단백질은 매일 꾸준히 섭취해야 합니다. 포스트 단백질바는 바 1개당 삶은 달걀 2개 분량에 해당하는 풍부한 단백질을 함유하고 있어, 운동 전후는 물론이고 일상생활 중 부족해지기 쉬운 단백질을 쉽고 빠르게 보충할 수 있습니다. 닭가슴살이나 단백질 파우더를 따로 챙겨 먹기 번거로운 직장인이나 학생들에게 최적의 대안이 될 수 있습니다.' },
    { img: '2.jpg', text: '고소한 견과류와 초콜릿의 완벽한 풍미: 건강식품은 맛이 없다는 선입견을 완벽하게 지워버릴 만큼 뛰어난 식감과 맛을 자랑합니다. 땅콩, 아몬드, 호두 등 불포화지방산이 풍부한 다양한 견과류가 듬뿍 들어있어 씹을수록 고소한 풍미가 입안 가득 퍼지며, 부드럽고 달콤한 초콜릿 코팅이 겉을 감싸고 있어 퍽퍽함 없이 기분 좋은 달콤함을 선사합니다. 다이어트 중 달콤한 간식이 생각날 때 죄책감 없이 즐길 수 있는 훌륭한 대체 식품입니다.' },
    { img: '3.jpg', text: '언제 어디서나 즐기는 극강의 휴대성: 개별 포장(Individually Wrapped) 방식으로 제작되어 가방이나 주머니에 쏙 들어가는 콤팩트한 사이즈를 자랑합니다. 아침 식사를 거르고 출근하는 직장인의 든든한 아침 대용식, 등산이나 자전거 라이딩 등 야외 아웃도어 활동 시 급격하게 소진된 에너지를 빠르게 채워주는 행동식, 늦은 밤 야근이나 공부 중에 찾아오는 허기를 달래주는 야식 등 상황에 구애받지 않고 언제 어디서나 간편하게 포장을 뜯어 바로 섭취할 수 있습니다.' },
    { img: '4.jpg', text: '포만감을 오래 유지하는 식이섬유 함유: 단순히 단백질만 들어있는 것이 아니라, 장 건강에 도움을 주고 소화를 촉진하는 식이섬유가 함께 함유되어 있어 한 개만 먹어도 오랜 시간 든든한 포만감이 유지됩니다. 불필요한 군것질이나 과식을 방지하는 데 도움을 주어 체중 감량을 목표로 하는 다이어터들의 식단 관리에도 매우 유용하게 활용될 수 있습니다.' },
    { img: '5.jpg', text: '합리적인 500g 대용량 2팩 세트 구성: 500g 박스 패키지가 2개로 묶여 있는 넉넉한 대용량 구성으로 뛰어난 가성비를 제공합니다. 가족 구성원 모두가 함께 즐기는 영양 간식으로 식탁 위에 올려두거나, 사무실 탕비실에 비치하여 동료들과 에너지를 나누기에도 부족함이 없습니다. 보관 시에는 직사광선을 피하고 서늘한 곳에 두는 것이 초콜릿 코팅의 녹음을 방지하고 바삭한 식감을 오래 유지하는 비결입니다.' }
  ],
  outro: '포스트 단백질바 500g은 바쁜 현대인들이 놓치기 쉬운 단백질과 견과류의 영양을 한 손에 쏙 들어오는 바(Bar) 형태로 압축해 놓은 스마트한 영양 간식입니다. 뛰어난 맛, 풍부한 영양소, 간편한 휴대성, 그리고 합리적인 대용량 구성까지 어느 것 하나 빠지지 않는 장점을 갖추고 있습니다. 활력 넘치는 하루를 위해 가방 속에 포스트 단백질바를 챙기고, 언제 어디서든 맛있고 건강하게 에너지를 충전해 보시길 적극 추천합니다.',
  summary: '바쁜 현대인을 위한 맛있는 에너지 충전, 포스트 단백질바 500g 영양 성분 및 섭취 가이드'
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
