const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-qcy-anc-earphone',
  category: '가전/디지털',
  title: 'QCY 노이즈 캔슬링 블루투스 이어폰 완벽 분석 및 가성비 이어폰 추천 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\QCY 노이즈 캔슬링 블루투스 이어폰',
  backupDir: 'D:\\정식서버업로드전용폴더\\QCY 노이즈 캔슬링 블루투스 이어폰',
  link: 'https://link.coupang.com/a/eTIOHf6iwS',
  iframe: '<iframe src="https://coupa.ng/cnFtVk" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '블루투스 무선 이어폰이 일상 필수품이 된 요즘, 노이즈 캔슬링 기능이 탑재된 프리미엄 모델들은 가격대가 상당히 높아 구매가 망설여지곤 합니다. 이럴 때 가장 합리적인 대안으로 떠오르는 브랜드가 바로 압도적인 가성비를 자랑하는 QCY입니다. 오늘은 만원대의 놀라운 가격에도 불구하고 수준급의 액티브 노이즈 캔슬링(ANC) 기능과 뛰어난 음질을 갖춰 \'대륙의 실수\'를 넘어 \'가성비 제왕\'으로 불리는 QCY 노이즈 캔슬링 블루투스 이어폰에 대해 상세하게 분석해 보겠습니다. 학생부터 직장인까지 누구나 만족할 수 있는 이 제품의 숨겨진 장점들을 하나씩 살펴보시죠.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 무기이자 구매의 핵심 이유인 \'액티브 노이즈 캔슬링(ANC)\' 기능입니다. 이 가격대에서는 찾아보기 힘든 최대 43dB 깊이의 소음 차단 성능을 보여주며, 지하철이나 버스의 시끄러운 엔진 소음, 카페의 웅성거리는 백색소음을 마법처럼 지워줍니다. 음악이나 인강에 온전히 몰입하고 싶을 때 이 기능 하나만으로도 제품 가격 이상의 가치를 충분히 체감하실 수 있습니다.' },
    { img: '2.jpg', text: '소음 차단뿐만 아니라 \'주변 소리 듣기(트랜스페어런시) 모드\'도 지원합니다. 이어폰을 귀에서 빼지 않고도 편의점에서 결제하거나 안내 방송을 들어야 할 때 주변 환경음을 자연스럽게 증폭시켜 들려줍니다. 출퇴근길 횡단보도를 건널 때처럼 주변 상황 인지가 필요한 순간에 매우 유용하며, 6개의 빔포밍 마이크가 탑재되어 통화 시에도 내 목소리를 상대방에게 또렷하게 전달해 줍니다.' },
    { img: '3.jpg', text: '음질 또한 기대 이상입니다. 대형 10mm 바이오 진동판 다이내믹 드라이버를 탑재하여 베이스가 풍부하게 울리면서도 고음역이 찢어지지 않는 균형 잡힌 V자형 사운드를 튜닝해 냈습니다. K-Pop, 힙합, 발라드 등 어떤 장르를 들어도 무난하고 대중적인 소리를 들려주며, QCY 전용 앱을 연동하면 본인의 취향에 맞게 이퀄라이저(EQ)를 커스텀하여 더욱 만족스러운 사운드를 세팅할 수 있습니다.' },
    { img: '4.jpg', text: '아무리 가성비가 좋아도 착용감이 불편하면 손이 가지 않겠죠. 이 모델은 수천 번의 인체공학적 테스트를 거쳐 동양인의 귀 구조에 가장 잘 맞게 설계된 유선형 바디를 채택했습니다. 장시간 착용해도 귀 안쪽에 압박감이 적으며, 격렬한 런닝이나 헬스장 운동 중에도 쉽게 빠지지 않는 뛰어난 밀착력을 자랑합니다. 기본 제공되는 3가지 사이즈의 실리콘 이어팁으로 나만의 최적 핏을 찾을 수 있습니다.' },
    { img: '5.jpg', text: '무선 이어폰의 핵심인 배터리 타임 역시 훌륭합니다. 최신 저전력 블루투스 칩셋이 적용되어 이어폰 단독으로 최대 7시간, 충전 케이스를 포함하면 무려 최대 30시간에 달하는 긴 재생 시간을 보장합니다. 하루 3~4시간씩 사용한다고 가정했을 때, 일주일에 단 한 번만 충전해도 충분할 정도로 배터리 효율이 좋습니다. C타입 고속 충전을 지원하여 급할 때 10분 충전만으로도 약 1시간 이상 재생이 가능합니다.' },
    { img: '6.jpg', text: '마지막으로 일상생활의 편의성을 높여주는 소소한 디테일들입니다. 이어폰을 귀에서 빼면 음악이 일시 정지되고, 다시 꽂으면 재생되는 \'착용 감지 센서\'가 내장되어 있어 매우 편리합니다. 또한 IPX5 등급의 생활 방수를 지원하여 운동 중 흐르는 땀이나 갑작스럽게 내리는 가벼운 비로부터 기기를 안전하게 보호해 줍니다. 굳이 비싼 제품을 고집할 필요 없이, 이 제품 하나면 일상적인 용도로 차고 넘치는 성능을 경험하실 수 있습니다.' }
  ],
  outro: '프리미엄 무선 이어폰이 부담스러우셨던 분들, 헬스장 전투용 이어폰이나 출퇴근 인강 시청용 서브 이어폰이 필요하셨던 분들에게 QCY 노이즈 캔슬링 이어폰은 더 이상 고민할 필요가 없는 최고의 선택지입니다. 저렴한 가격에 노이즈 캔슬링의 신세계를 경험해 보고 싶으시다면, 이 압도적인 가성비의 이어폰을 통해 조용하고 평화로운 나만의 사운드 공간을 만들어보시길 강력하게 권장합니다.',
  summary: 'QCY 노이즈 캔슬링 블루투스 이어폰 완벽 분석 및 가성비 이어폰 추천 가이드'
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
  if (row['폴더이름'] === 'QCY 노이즈 캔슬링 블루투스 이어폰') {
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
