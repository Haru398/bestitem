const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-apple-airpods-4-anc',
  category: '가전/디지털',
  title: '오픈형의 한계를 뛰어넘다! Apple 2024 에어팟 4세대 노이즈 캔슬링 모델 상세 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\Apple 2024 에어팟 4 액티브 노이즈 캔슬링 블루투스 이어폰',
  backupDir: 'D:\\정식서버업로드전용폴더\\Apple 2024 에어팟 4 액티브 노이즈 캔슬링 블루투스 이어폰',
  link: 'https://link.coupang.com/a/e0xH7CGD7I',
  iframe: '<iframe src="https://coupa.ng/cnKCEx" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '인이어 이어폰 특유의 귀를 꽉 막는 먹먹함이 싫어 오픈형 이어폰만을 고집하는 분들이 많습니다. 하지만 오픈형 이어폰은 구조적 한계로 인해 주변 소음 차단이 불가능하다는 치명적인 단점이 있었습니다. 애플이 새롭게 선보인 \'Apple 2024 에어팟 4세대 액티브 노이즈 캔슬링(ANC)\' 모델은 이러한 오랜 고정관념을 완벽하게 깨부수며 등장했습니다. 편안한 오픈형 디자인을 유지하면서도 프로 모델에 버금가는 강력한 노이즈 캔슬링을 구현해 낸 혁신적인 신제품, 에어팟 4세대가 오픈형 무선 이어폰 시장의 판도를 어떻게 바꾸고 있는지 지금부터 상세하게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 혁신적인 특징은 단연 \'오픈형 디자인에 적용된 액티브 노이즈 캔슬링\'입니다. 실리콘 이어팁이 없이 귀에 살짝 얹어지는 편안한 착용감을 제공하면서도, 주변의 시끄러운 소음을 획기적으로 줄여줍니다. 비행기 엔진 소리나 붐비는 출퇴근길의 지하철 소음을 효과적으로 차단하여, 먹먹함 없이 음악에만 온전히 몰입할 수 있는 놀라운 경험을 선사합니다.' },
    { img: '2.jpg', text: '에어팟 프로 라인업에만 탑재되던 \'강력한 H2 칩셋\'이 드디어 4세대 일반 모델에도 이식되었습니다. 이 압도적인 성능의 칩셋은 초당 48,000번이나 주변 소음을 분석하고 제어하여 노이즈 캔슬링의 완성도를 극대화할 뿐만 아니라, 통화 중 상대방의 목소리를 또렷하게 분리해 내는 \'음성 분리\' 기능까지 완벽하게 지원하여 시끄러운 환경에서도 깔끔한 통화 품질을 보장합니다.' },
    { img: '3.jpg', text: '사용자의 편의성을 극대화한 \'적응형 오디오\' 기능도 주목할 만합니다. 고요한 도서관에서 갑자기 시끄러운 공사장 옆을 지나갈 때, 사용자가 일일이 모드를 변경할 필요 없이 환경 소음의 변화를 감지하여 노이즈 캔슬링의 강도를 실시간으로 자동 조절해 줍니다. 또한 누군가와 대화를 시작하면 자동으로 음악 볼륨을 낮춰주는 \'대화 인지\' 기능이 적용되어 이어폰을 뺄 필요가 없습니다.' },
    { img: '4.jpg', text: '애플의 기술력이 집약된 새로운 \'어쿠스틱 아키텍처\'가 적용되어 음질 또한 큰 폭으로 향상되었습니다. 왜곡을 최소화한 전용 맞춤형 드라이버가 뿜어내는 깊고 묵직한 베이스와 선명한 고음의 밸런스가 매우 뛰어나며, 머리의 움직임을 동적으로 추적하는 \'개인 맞춤형 공간 음향\' 기술이 더해져 마치 콘서트홀 한가운데 서 있는 듯한 풍부하고 입체적인 사운드를 즐길 수 있습니다.' },
    { img: '5.jpg', text: '충전 케이스의 변화도 눈에 띕니다. 이전 세대 대비 부피가 무려 10%나 줄어들어 주머니에 넣어도 전혀 티가 나지 않는 극강의 휴대성을 자랑합니다. 작아진 크기에도 불구하고 배터리 효율은 더욱 좋아져 케이스 포함 최대 30시간의 넉넉한 재생 시간을 제공하며, 마침내 범용성이 뛰어난 USB-C 포트가 적용되어 충전 스트레스에서 완전히 해방되었습니다.' },
    { img: '6.jpg', text: '인체공학적 데이터 분석을 통해 새롭게 설계된 \'유니버설 핏\'은 전 세계 수많은 사람들의 귀 모양을 3D 매핑하여 가장 편안한 각도와 형태를 찾아냈습니다. 장시간 착용해도 귀에 압박감이 느껴지지 않으며, 격렬한 런닝이나 헬스장 운동 중에도 쉽게 빠지지 않는 안정적인 착용감을 제공합니다. IP54 등급의 방진/방수 기능이 더해져 땀이나 가벼운 비로부터 기기를 안전하게 보호해 줍니다.' }
  ],
  outro: '오픈형 이어폰의 궁극적인 지향점을 보여주는 제품입니다. \'편안한 착용감\'과 \'노이즈 캔슬링\'이라는, 공존할 수 없을 것 같았던 두 마리 토끼를 완벽하게 잡아낸 \'Apple 2024 에어팟 4세대 ANC\' 모델은 실리콘 이어팁의 답답함을 견디지 못하는 분들에게 축복과도 같은 선택지입니다. 오픈형 특유의 탁 트인 개방감과 주변 소음이 사라진 나만의 몰입감 넘치는 사운드 공간을 동시에 누려보시길 강력하게 추천합니다.',
  summary: '오픈형의 한계를 뛰어넘다! Apple 2024 에어팟 4세대 노이즈 캔슬링 모델 상세 분석'
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
  if (row['폴더이름'] === 'Apple 2024 에어팟 4 액티브 노이즈 캔슬링 블루투스 이어폰') {
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
