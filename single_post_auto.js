const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-anaparectin-joint-up',
  category: '건강',
  title: '활기찬 일상을 위한 관절 영양제! 아나파랙틴 관절엔 UP 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\아나파랙틴 관절엔 UP 19.2g, 40정, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\아나파랙틴 관절엔 UP 19.2g, 40정, 1개',
  link: 'https://link.coupang.com/a/eNFtuM5yQC',
  iframe: '<iframe src="https://coupa.ng/cnAnjs" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.png'],
  intro: '나이가 들면서 혹은 평소 무리한 운동이나 가사 노동으로 인해 뻣뻣하고 불편해지는 관절과 연골. 계단을 오르내리거나 앉았다 일어설 때마다 느껴지는 뻐근함은 겪어보지 않은 사람은 모르는 큰 고통입니다. 관절 연골은 한 번 닳으면 쉽게 재생되지 않기 때문에 평소 꾸준한 영양 공급과 관리가 무엇보다 중요합니다. 관절 건강 관리에 탁월한 성분 배합으로 많은 사람들의 든든한 버팀목이 되어주고 있는 프리미엄 관절 영양제, **아나파랙틴 관절엔 UP**을 집중 분석해 보겠습니다.\n\n이 제품은 단순히 한 가지 성분만 강조하는 것이 아니라, 관절과 연골 건강에 시너지를 낼 수 있는 엄선된 핵심 원료들을 과학적으로 배합하여 완성도 높은 포뮬러를 자랑합니다. 뻣뻣한 일상에 윤활유를 더해주고 활기찬 발걸음을 되찾아 줄 아나파랙틴 관절엔 UP만의 특별한 성분과 장점들을 꼼꼼하게 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '아나파랙틴 관절엔 UP의 핵심 원료는 단연 \'보스웰리아 추출물\'입니다. 보스웰리아는 인도 고산 지대의 극심한 온도차와 모래폭풍을 견뎌내고 자생하는 유향나무의 수액을 건조한 것으로, 관절 연골 건강에 도움을 줄 수 있는 귀한 식물성 원료입니다. 식약처로부터 기능성과 안전성을 인정받은 이 추출물이 듬뿍 담겨 있어 연골의 마모와 관절의 불편함을 개선하는 데 든든한 베이스가 되어줍니다.' },
    { img: '2.jpg', text: '보스웰리아 추출물과 함께 연골과 뼈 건강을 빈틈없이 채워주는 \'N-아세틸글루코사민(NAG)\'이 황금 비율로 배합되어 있습니다. NAG는 체내 연골 성분인 히알루론산과 콜라겐의 핵심 전구체로, 인체 내에 존재하는 성분과 동일한 구조를 가지고 있어 흡수율과 친화력이 매우 뛰어납니다. 꾸준한 섭취 시 관절의 윤활 작용을 돕고 연골 세포의 생성을 촉진하여 더욱 부드러운 움직임을 선사합니다.' },
    { img: '3.jpg', text: '여기에 뼈의 형성과 유지에 꼭 필요한 필수 영양소인 \'비타민D\'를 1일 영양성분 기준치 100% 충족하도록 더했습니다. 아무리 좋은 연골 영양 성분을 먹어도 이를 지탱하는 뼈가 약하다면 밑빠진 독에 물 붓기나 다름없습니다. 비타민D는 칼슘과 인이 흡수되고 이용되는 데 필수적인 성분으로 골다공증 발생 위험 감소에 도움을 주며, 관절과 뼈 건강을 입체적으로 관리할 수 있는 완벽한 시너지를 발휘합니다.' },
    { img: '4.jpg', text: '핵심 원료뿐만 아니라 꼼꼼하게 엄선한 부원료 배합에서도 프리미엄 영양제다운 면모가 돋보입니다. 초록입홍합 추출물, 상어 연골 추출물 분말, 해조 칼슘, 비타민C, 콜라겐 등 관절 건강과 활력 증진에 도움을 줄 수 있는 프리미엄 부원료들을 아낌없이 꽉 채워 넣어, 하루 두 알 섭취만으로도 빈틈없는 영양 케어가 가능하도록 세심하게 설계되었습니다.' },
    { img: '5.jpg', text: '성분이 아무리 뛰어나도 먹기 불편하면 매일 꾸준히 챙겨 먹기 힘든 것이 사실입니다. 아나파랙틴 관절엔 UP은 목 넘김이 편안한 초소형 정제 사이즈로 개발되어 평소 알약을 잘 삼키지 못하는 어르신들도 부담 없이 섭취할 수 있습니다. 특유의 불쾌한 냄새나 잔여감 없이 깔끔하게 넘길 수 있어 매일 매일의 섭취가 즐거운 건강한 습관으로 자리 잡을 수 있습니다.' },
    { img: '6.png', text: '휴대와 보관이 간편한 PTP 개별 포장 방식을 채택하여 산소와 습기로부터 정제를 안전하게 보호합니다. 외출 시나 여행 갈 때에도 필요한 만큼 똑 끊어서 위생적으로 파우치나 가방에 쏙 챙겨 다닐 수 있으며, 바쁜 현대인들의 라이프스타일까지 완벽하게 고려한 세심한 패키지 디자인이 돋보입니다.' }
  ],
  outro: '등산, 골프 등 활발한 야외 활동을 즐기시거나, 가사 노동으로 손목과 무릎이 뻣뻣하신 분, 혹은 노화로 인해 연골이 닳아 예전 같은 부드러움이 그리운 부모님을 위한 선물로 이보다 더 탁월한 선택은 없습니다. 식약처 인정 기능성 원료들의 과학적인 배합으로 관절 건강의 근본을 튼튼하게 다져주는 **아나파랙틴 관절엔 UP**과 함께, 매일 아침 가벼워진 발걸음과 활기 넘치는 일상을 선물해 보세요.',
  summary: '활기찬 일상을 위한 관절 영양제! 아나파랙틴 관절엔 UP 성분 및 효능 분석'
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
  if (row['폴더이름'] === '아나파랙틴 관절엔 UP 19.2g, 40정, 1개') {
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
