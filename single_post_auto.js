const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-jrcompany-cool-towel-blue',
  category: '스포츠/레저',
  title: '여름철 필수템 제이알컴퍼니 쿨타올 100% 활용법 및 원리 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\제이알컴퍼니 쿨타올 스포츠타올, 블루, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\제이알컴퍼니 쿨타올 스포츠타올, 블루, 1개',
  link: 'https://link.coupang.com/a/e7LHNC7kLA',
  iframe: '<iframe src="https://coupa.ng/cnPwBE" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '3.jpg', '5.jpg', '7.jpg', '9.jpg'],
  intro: '가만히 서 있기만 해도 등줄기에 땀이 흐르는 무더운 여름철, 야외 스포츠나 캠핑을 즐기시는 분들이라면 열사병과 온열 질환 예방에 각별한 주의가 필요합니다. 하지만 아무리 차가운 얼음물을 마셔도 정수리부터 내리쬐는 뜨거운 태양열을 식히기엔 역부족일 때가 많습니다. 이럴 때 물에 적셔 가볍게 털어주기만 하면 순식간에 차가워지는 마법의 아이템, \'제이알컴퍼니 쿨타올\'이 완벽한 해결책이 될 수 있습니다. 에어컨이 없는 야외 활동 시 체온을 즉각적으로 낮춰주어 한여름의 불쾌지수를 싹 날려버리는 냉감 스포츠 타월의 과학적 원리와 100% 활용하는 다양한 꿀팁을 지금부터 자세히 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '물만 있으면 OK! 신기한 기화열 냉각 원리: 쿨타올이 일반 수건과 가장 크게 다른 점은 바로 특수 제작된 \'냉감 원사\'를 사용했다는 것입니다. 수건을 물에 흠뻑 적신 뒤 물기를 꽉 짜고 공기 중에서 허공에 2~3회 탁탁 털어주면, 원단 조직 사이로 공기가 유입되면서 머금고 있던 수분이 매우 빠르게 증발하기 시작합니다. 이때 주변의 열을 빼앗아 가는 \'기화열\' 현상이 극대화되어 원단의 온도가 즉각적으로 영하 수준으로 떨어지는 차가움을 경험할 수 있습니다. 뜨거운 물을 적셔도 털어주기만 하면 금세 얼음장처럼 차가워지는 아주 과학적인 원리입니다.' },
    { img: '3.jpg', text: '뛰어난 통기성과 땀 흡수력으로 불쾌지수 제로: 아무리 차가워도 땀을 제대로 흡수하지 못해 피부에 끈적하게 달라붙는다면 좋은 스포츠 타월이 아닙니다. 제이알컴퍼니 쿨타올은 표면에 미세한 그물망(메쉬) 구조가 촘촘하게 얽혀 있어 통기성이 매우 뛰어나며, 이마나 목덜미에 흐르는 땀방울을 아주 빠르게 흡수하고 건조시킵니다. 장시간 목에 두르고 골프나 등산을 즐겨도 땀띠가 나거나 짓무를 걱정이 없으며, 수건이 미지근해졌다 싶으면 다시 한번 허공에 털어주기만 하면 냉감이 무한으로 반복 재생됩니다.' },
    { img: '5.jpg', text: '피부에 닿아도 안전한 부드러운 촉감과 무독성 소재: 야외 활동을 하다 보면 타월이 얼굴이나 목 같은 연약한 피부에 지속적으로 마찰될 수밖에 없습니다. 이 제품은 거칠고 뻣뻣한 일반 스포츠 타월과 달리 실크처럼 매우 부드럽고 유연한 촉감을 자랑하여 피부 자극을 최소화했습니다. 특히 화학적인 냉매 물질을 코팅하여 억지로 차갑게 만든 것이 아니라, 원단 고유의 물리적 구조만으로 냉감을 발생시키는 100% 친환경 무독성 소재이므로 피부가 예민한 어린아이들이나 어르신들도 안심하고 사용할 수 있습니다.' },
    { img: '7.jpg', text: '목에 묶거나 머리에 두르기 딱 좋은 넉넉한 사이즈: 쿨타올의 효과를 극대화하려면 체온을 조절하는 핵심 부위인 목덜미를 넓게 감싸주는 것이 가장 중요합니다. 이 제품은 목 전체를 두 바퀴 이상 여유롭게 감쌀 수 있는 아주 넉넉한 기장으로 제작되어 활동 중에 쉽게 풀리거나 흘러내리지 않습니다. 자전거를 탈 때 목에 단단히 묶어 바람을 맞거나, 테니스를 칠 때 머리에 두건처럼 둘러 땀이 눈으로 흘러내리는 것을 방지하는 등 상황에 맞게 100% 활용할 수 있는 완벽한 사이즈를 갖추었습니다.' },
    { img: '9.jpg', text: '등산, 캠핑, 헬스장까지 언제 어디서나 만능템: 가볍게 접으면 한 손에 쏙 들어올 만큼 부피가 작고 가벼워 휴대성이 매우 뛰어납니다. 짐이 많은 캠핑이나 백패킹을 떠날 때는 물론이고, 헬스장에서 러닝머신을 뛸 때, 뜨거운 불 앞에서 일하는 주방 요리사, 야외 건설 현장에서 땀 흘리는 작업자 분들까지 한여름 더위가 존재하는 모든 곳에서 필수템으로 활약합니다. 특히 보기만 해도 시원해지는 청량한 블루 컬러는 야외 스포츠 웨어와 아주 스포티하게 매치되어 스타일까지 완벽하게 살려줍니다.' }
  ],
  outro: '제이알컴퍼니 쿨타올은 단순히 땀을 닦는 용도를 넘어, 한여름의 찌는 듯한 폭염으로부터 우리 몸의 건강과 컨디션을 지켜주는 가장 경제적이고 스마트한 안전장비입니다. 물에 적시고 털어주는 단 3초의 마법 같은 행동만으로 에어컨 부럽지 않은 오싹한 시원함을 경험할 수 있습니다. 다가오는 올여름, 열대야에 잠 못 이루거나 땀 뻘뻘 흘리는 야외 스포츠를 계획 중이시라면 주저하지 말고 쿨타올 한 장을 준비해 완벽한 피서템으로 활용해 보시길 적극 추천합니다.',
  summary: '여름철 필수템 제이알컴퍼니 쿨타올 100% 활용법 및 원리 완벽 분석'
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
