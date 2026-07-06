const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-cool-doctor-cooling-tissue-large',
  category: '생활용품',
  title: '여름철 야외활동 필수템, 쿨박사 쿨링티슈 데오 시트 특대형 지속력 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\쿨박사 쿨링티슈 데오 쿨링 시트 타올 쿨스카프 특대형, 1개, 7매입',
  backupDir: 'D:\\정식서버업로드전용폴더\\쿨박사 쿨링티슈 데오 쿨링 시트 타올 쿨스카프 특대형, 1개, 7매입',
  link: 'https://link.coupang.com/a/e7LP5vh7sa',
  iframe: '<iframe src="https://coupa.ng/cnPwCC" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '4.jpg', '6.jpg', '7.jpg'],
  intro: '가만히 서 있기만 해도 등줄기를 타고 땀이 주르륵 흐르는 찜통 같은 한여름. 골프, 등산, 캠핑 등 잦은 야외활동이나 땡볕 아래서 일해야 하는 현장 근로자들에게 쏟아지는 땀과 불쾌한 체취는 견디기 힘든 고통입니다. 찝찝한 몸을 씻어내기 위해 당장 샤워실로 달려가고 싶지만 여건상 불가능할 때, 언제 어디서든 방금 찬물 샤워를 마친 듯한 극강의 상쾌함을 선사하는 혁신적인 아이템이 있습니다. 바로 한여름 무더위 극복의 1등 공신으로 떠오른 \'쿨박사 쿨링티슈 데오 쿨링 시트 타올 특대형\'입니다. 닦아내는 즉시 체감 온도를 확 낮춰주는 강력한 쿨링 효과와 특대형 사이즈가 주는 압도적인 편리함을 꼼꼼히 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '온몸을 한 장으로 끝내는 압도적인 특대형 사이즈: 시중에 판매되는 일반적인 쿨링 시트나 물티슈는 사이즈가 작아 성인 남성이 온몸의 땀을 닦아내려면 3~4장은 거뜬히 사용해야 하는 번거로움이 있습니다. 하지만 쿨박사 쿨링티슈는 일반 물티슈의 4배에 달하는 어마어마한 특대형 사이즈(가로 60cm, 세로 28cm)로 제작되었습니다. 마치 수건을 한 장 펼친 듯한 넉넉한 크기 덕분에, 단 한 장만 뜯어내어도 목, 등, 팔, 다리 등 땀이 많이 나는 전신을 한 번에 구석구석 시원하게 닦아낼 수 있어 가성비와 실용성을 모두 잡았습니다.' },
    { img: '2.jpg', text: '멘톨 성분이 선사하는 뼛속까지 시원한 강력 쿨링: 닦아내는 즉시 마치 얼음물로 샤워한 듯 피부 온도를 빠르게 낮춰주는 비결은 바로 고농축 \'멘톨(Menthol)\' 성분에 있습니다. 피부 표면의 열기를 즉각적으로 빼앗아 증발시키며, 닦아낸 후에도 시원한 쿨링감이 오랫동안 피부에 머물러 무더위로 인한 열사병과 온열 질환을 예방하는 데 큰 도움을 줍니다. 한여름 땡볕 아래서 골프 라운딩을 즐기거나 등산 정상에 올랐을 때, 이 티슈 한 장이면 에어컨 바람 부럽지 않은 짜릿한 상쾌함을 경험할 수 있습니다.' },
    { img: '4.jpg', text: '불쾌한 땀 냄새를 완벽히 잡는 데오도란트 효과: 여름철 땀이 마르면서 발생하는 퀴퀴하고 시큼한 냄새는 주변 사람들을 불쾌하게 만드는 주범입니다. 이 제품은 단순히 땀을 닦아내는 것을 넘어 강력한 \'데오도란트(Deodorant)\' 기능을 탑재하여 냄새의 원인균을 효과적으로 제거합니다. 끈적거리는 땀과 노폐물을 말끔히 씻어내고 그 자리에 산뜻한 플로럴 민트 향만을 남겨주어, 땀을 많이 흘린 후 대중교통을 이용하거나 밀폐된 공간에 들어가야 할 때 냄새 걱정을 완벽하게 덜어줍니다.' },
    { img: '6.jpg', text: '목에 두르면 쿨스카프로 변신하는 2in1 다용도 활용: 쿨박사 특대형 쿨링티슈만의 독보적인 활용법은 바로 \'쿨스카프\' 대용으로 사용할 수 있다는 점입니다. 땀을 닦아낸 후 시원하게 식은 티슈를 목이나 이마, 혹은 팔목에 무심하게 둘러주기만 하면, 멘톨의 쿨링 효과가 피부에 직접 닿으며 체온을 지속적으로 낮춰줍니다. 캠핑장이나 스포츠 경기장 등 야외 그늘에서 휴식을 취할 때 목에 한 장 두르고 있으면 더위를 잊고 쾌적한 컨디션을 유지할 수 있는 최고의 꿀팁입니다.' },
    { img: '7.jpg', text: '휴대하기 편안한 개별 포장 7매입 파우치: 언제 어디서나 필요할 때 꺼내 쓸 수 있도록 가방이나 파우치 속에 쏙 들어가는 콤팩트한 패키지로 디자인되었습니다. 한 팩에 특대형 티슈 7매가 들어 있어 부피를 많이 차지하지 않으며, 밀봉이 잘 되는 캡이나 스티커가 부착되어 있어 마지막 한 장을 쓸 때까지 쿨링 에센스가 마르지 않고 촉촉하게 유지됩니다. 골프백, 등산 가방, 차량 글러브 박스 등에 하나씩 상비해 두면 올여름 폭염도 두렵지 않은 가장 든든한 무기가 될 것입니다.' }
  ],
  outro: '쿨박사 쿨링티슈 데오 쿨링 시트 타올 특대형은 여름철 야외 활동의 질을 수직 상승시켜주는 마법 같은 필수템입니다. 온몸을 덮는 넉넉한 사이즈, 체감 온도를 영하로 낮추는 듯한 강력한 멘톨 쿨링, 땀 냄새를 지워버리는 데오도란트 효과까지 여름철 우리가 겪는 모든 불쾌함을 단 한 장의 티슈로 완벽하게 해결해 줍니다. 찌는 듯한 무더위 속에서도 언제나 방금 샤워한 듯 보송하고 상쾌한 기분을 유지하고 싶으시다면, 쿨박사 쿨링티슈를 올여름 쇼핑 리스트 1순위로 적극 추천해 드립니다.',
  summary: '여름철 야외활동 필수템, 쿨박사 쿨링티슈 데오 시트 특대형 지속력 분석'
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
