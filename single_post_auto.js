const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-apple-airpods-pro-3',
  category: '가전/디지털',
  title: '무선 이어폰의 새로운 기준, Apple 2025 에어팟 프로 3세대 완벽 구매 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\Apple 2025 에어팟 프로 3 USB-C 블루투스 이어폰',
  backupDir: 'D:\\정식서버업로드전용폴더\\Apple 2025 에어팟 프로 3 USB-C 블루투스 이어폰',
  link: 'https://link.coupang.com/a/e0xBrAovbE',
  iframe: '<iframe src="https://coupa.ng/cnKCz1" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  intro: '무선 이어폰 시장의 트렌드를 선도하며 전 세계인들의 귓가를 책임지고 있는 애플의 에어팟 시리즈. 그중에서도 압도적인 노이즈 캔슬링 성능과 독보적인 생태계 연동성을 자랑하는 프로 라인업의 최신작, \'Apple 2025 에어팟 프로 3세대 USB-C\' 모델이 출시되었습니다. 이전 세대에서 아쉬웠던 점들을 완벽하게 보완하고, 드디어 많은 유저들이 염원하던 USB-C 포트까지 탑재하며 완전체로 거듭났습니다. 단순한 이어폰을 넘어 일상을 더욱 스마트하고 윤택하게 만들어주는 에어팟 프로 3세대의 업그레이드된 성능과 놀라운 디테일들을 지금부터 낱낱이 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 눈에 띄는 변화는 단연 \'USB-C 포트\'의 도입입니다. 그동안 아이폰, 아이패드, 맥북은 모두 USB-C 규격을 사용하면서도 에어팟만 라이트닝 케이블을 고집하여 사용자들의 원성이 잦았는데요. 이제는 에어팟 프로 3세대 하나만 있으면 집이든 여행지든 케이블 하나로 모든 애플 기기를 충전할 수 있는 진정한 케이블 통합의 자유로움을 누릴 수 있게 되었습니다.' },
    { img: '2.jpg', text: '에어팟 프로의 핵심 아이덴티티인 \'액티브 노이즈 캔슬링(ANC)\' 성능은 이전 세대 대비 최대 2배 더 강력해졌습니다. 최신 H2 칩셋의 압도적인 연산 능력을 바탕으로, 지하철의 거친 소음이나 비행기 엔진 소리, 심지어 식당의 웅성거림까지 더욱 완벽하게 차단합니다. 귓속에 꽂는 순간 주변 세상이 음소거되는 마법 같은 고요함을 경험하실 수 있습니다.' },
    { img: '3.jpg', text: '강력해진 H2 칩은 노이즈 캔슬링뿐만 아니라 \'적응형 주변음 허용 모드\'도 한 차원 끌어올렸습니다. 주변 소리를 자연스럽게 들려주는 동시에, 공사장 사이렌 소리나 차량 경적 같은 크고 불쾌한 소음만 초당 48,000번 모니터링하여 실시간으로 줄여줍니다. 길을 걸을 때 안전을 확보하면서도 청력을 보호할 수 있는 스마트한 기능입니다.' },
    { img: '4.jpg', text: '오디오 품질의 진화도 빼놓을 수 없습니다. 새로운 맞춤형 다이내믹 드라이버와 앰프가 조화를 이뤄, 깊고 풍부한 베이스부터 맑고 청아한 고음까지 전 대역에 걸쳐 놀랍도록 선명한 사운드를 들려줍니다. 특히 동영상 시청 시 고개를 돌려도 소리의 방향이 유지되는 \'개인 맞춤형 공간 음향\' 기술은 마치 영화관 한가운데 앉아있는 듯한 극한의 몰입감을 선사합니다.' },
    { img: '5.jpg', text: '본체 하단 스템 부분의 \'터치 제어\' 기능이 추가되어 조작이 훨씬 직관적이고 편리해졌습니다. 이전처럼 꾹 눌러서 재생/정지를 하는 것은 물론이고, 이제는 위아래로 가볍게 스와이프 하는 것만으로도 스마트폰을 꺼내지 않고 볼륨을 미세하게 조절할 수 있습니다. 운동 중이거나 양손에 짐을 들고 있을 때 그 진가를 발휘하는 유용한 디테일입니다.' },
    { img: '6.jpg', text: '이어폰을 자주 잃어버리는 분들을 위해 \'나의 찾기\' 기능도 대폭 강화되었습니다. 충전 케이스 하단에 스피커가 내장되어, 잃어버렸을 때 큰 소리를 내어 위치를 쉽게 찾을 수 있도록 도와줍니다. 또한 U1 칩이 탑재되어 아이폰 화면을 통해 케이스의 방향과 거리를 \'정밀 탐색\'으로 정확하게 안내받을 수 있어 분실의 두려움에서 완전히 해방될 수 있습니다.' },
    { img: '7.jpg', text: '배터리 효율과 내구성도 완벽합니다. 이어폰 단독으로 최대 6시간, 케이스 포함 시 최대 30시간의 넉넉한 재생 시간을 제공하며, 케이스와 이어폰 양쪽 모두 IP54 등급의 방진/방수 기능을 갖추었습니다. 비 오는 날이나 땀을 많이 흘리는 헬스장에서도 고장 걱정 없이 안심하고 사용할 수 있어 진정한 데일리 무선 이어폰으로서의 조건을 모두 갖추었습니다.' }
  ],
  outro: '스마트폰 시장에서 아이폰이 굳건한 입지를 자랑하듯, 무선 이어폰 시장에서 에어팟 프로의 위상은 독보적입니다. 가격대가 다소 높다고 느껴질 수 있지만, 극강의 노이즈 캔슬링 성능과 애플 생태계가 주는 마약 같은 연동성, 그리고 USB-C 탑재로 완성된 편의성을 경험해 본다면 결코 후회 없는 투자가 될 것입니다. 오직 나만의 고요한 사운드 공간이 필요하시다면, 진일보한 성능으로 돌아온 \'Apple 2025 에어팟 프로 3세대\'를 지금 바로 만나보세요.',
  summary: '무선 이어폰의 새로운 기준, Apple 2025 에어팟 프로 3세대 완벽 구매 가이드'
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
  if (row['폴더이름'] === 'Apple 2025 에어팟 프로 3 USB-C 블루투스 이어폰') {
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
