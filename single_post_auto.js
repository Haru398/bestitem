const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-braun-series9-pro',
  category: '가전/디지털',
  title: '완벽한 절삭력과 피부 보호의 만남! 브라운 시리즈 9 PRO+ 전기면도기 심층 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\BRAUN 시리즈 9 PRO+ 울트라 씬 전기면도기',
  backupDir: 'D:\\정식서버업로드전용폴더\\BRAUN 시리즈 9 PRO+ 울트라 씬 전기면도기',
  link: 'https://link.coupang.com/a/eTJbriy4Oq',
  iframe: '<iframe src="https://coupa.ng/cnFueF" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '매일 아침 바쁜 출근 준비 시간, 남성들의 피부 컨디션을 좌우하는 가장 중요한 아이템은 단연 면도기입니다. 제대로 된 면도기 하나만 있어도 거뭇한 수염 자국 없이 깔끔한 인상을 남길 수 있으며, 불필요한 피부 트러블을 예방할 수 있습니다. 수많은 전기면도기 중에서도 독보적인 기술력으로 전 세계 남성들의 로망으로 자리 잡은 프리미엄 모델, \'브라운 시리즈 9 PRO+ 울트라 씬\'을 소개합니다. 브라운 역사상 가장 완벽한 면도기라고 극찬 받는 이 제품이 왜 하이엔드 면도기의 끝판왕으로 불리는지 그 놀라운 성능과 핵심 기술들을 하나씩 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 심장이라고 할 수 있는 \'5개의 특수화된 커팅 요소\'입니다. 서로 다른 역할을 수행하는 5개의 날이 유기적으로 움직이며, 직진형으로 자라지 않고 피부에 누워있거나 여러 방향으로 꼬인 까다로운 수염까지 단 한 번의 스트로크만으로 깔끔하게 포착하여 절삭합니다. 덕분에 여러 번 피부를 문지를 필요가 없어 면도 시간이 획기적으로 단축됩니다.' },
    { img: '2.jpg', text: '특히 이번 PRO+ 모델에서 새롭게 선보인 \'울트라 씬(Ultra-Thin) 프리시전 트리머\' 기능은 극강의 정밀함을 자랑합니다. 면도기 뒷면에 장착된 이 얇고 정교한 트리머를 사용하면 구레나룻이나 콧수염의 라인을 마치 바버샵에 온 것처럼 날렵하고 깔끔하게 정리할 수 있습니다. 닿기 힘든 인중이나 턱밑의 미세한 수염까지 완벽하게 케어해 주는 핵심 디테일입니다.' },
    { img: '3.jpg', text: '면도 시 가장 우려되는 피부 자극을 최소화하는 \'소닉 테크놀로지(Sonic Technology)\'가 탑재되어 있습니다. 1분에 무려 10,000번의 미세 진동을 일으켜 피부를 부드럽게 마사지하듯 수염을 세워주어, 칼날이 피부 표면에 직접 닿는 마찰을 극단적으로 줄여줍니다. 면도 후 흔히 겪는 따가움이나 붉어짐 현상이 확연히 줄어들어 민감성 피부를 가진 분들에게 구세주와 같은 기능입니다.' },
    { img: '4.jpg', text: '사용자의 편의성을 극대화한 \'오토센스(AutoSense) 기술\' 또한 놀랍습니다. 인공지능 센서가 사용자의 수염 밀도와 두께를 1초당 13번씩 실시간으로 파악하여 모터의 파워를 자동으로 조절합니다. 수염이 빽빽한 턱이나 인중 부위를 지날 때는 출력을 높여 강력하게 밀어주고, 숱이 적은 볼 부분에서는 부드럽게 전환되어 언제나 최적의 맞춤형 면도 경험을 제공합니다.' },
    { img: '5.jpg', text: '하이엔드 면도기답게 100% 방수 기능은 기본입니다. IPX8 등급의 완전 방수 설계로 건식 면도는 물론이고, 샤워를 하면서 쉐이빙 폼이나 젤을 사용한 상쾌한 습식 면도까지 완벽하게 지원합니다. 사용 후에는 흐르는 물에 가볍게 헹구기만 해도 잔여 수염이 쉽게 씻겨 내려가며, 고급스러운 충전 스탠드에 올려두면 위생적이고 우아하게 보관할 수 있습니다.' },
    { img: '6.jpg', text: '제품의 완성도를 방증하는 독일의 정밀한 장인 정신이 고스란히 담긴 세련된 디자인과 뛰어난 내구성입니다. 한 손에 착 감기는 인체공학적 그립감은 젖은 손으로 잡아도 미끄러지지 않으며, 티타늄 코팅이 적용된 트리머는 오랫동안 사용해도 처음과 같은 절삭력을 유지해 줍니다. 프리미엄 패키지 박스 구성으로 다가오는 기념일, 소중한 남편이나 남자친구를 위한 최고의 선물로 강력하게 추천합니다.' }
  ],
  outro: '단순히 수염을 깎는 행위를 넘어, 매일 아침의 시작을 품격 있게 만들어주는 완벽한 그루밍 파트너입니다. 타협 없는 절삭력, 피부를 보호하는 부드러움, 그리고 시선을 사로잡는 고급스러운 디자인까지 삼박자를 모두 갖춘 \'브라운 시리즈 9 PRO+ 울트라 씬\'은 투자한 금액 그 이상의 압도적인 만족감을 선사할 것입니다. 지금 바로 차원이 다른 프리미엄 면도의 신세계를 경험해 보세요.',
  summary: '완벽한 절삭력과 피부 보호의 만남! 브라운 시리즈 9 PRO+ 전기면도기 심층 분석'
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
  if (row['폴더이름'] === 'BRAUN 시리즈 9 PRO+ 울트라 씬 전기면도기') {
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
