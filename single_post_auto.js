const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-anamin-multivitamin',
  category: '헬스/건강식품',
  title: '활력 충전 완벽 해결! 아나민 프리미엄 골드 멀티비타민 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\아나민 프리미엄 골드 멀티비타민 비타민B 영양제 부원료 알부민 함유제품, 12개, 10정',
  backupDir: 'D:\\정식서버업로드전용폴더\\아나민 프리미엄 골드 멀티비타민 비타민B 영양제 부원료 알부민 함유제품, 12개, 10정',
  link: 'https://link.coupang.com/a/eNQhmXYcH6',
  iframe: '<iframe src="https://coupa.ng/cnApyi" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '아침에 눈을 뜨는 것이 천근만근 무겁고, 오후만 되면 쏟아지는 졸음과 무기력함에 커피만 찾고 계시지는 않나요? 현대인들은 바쁜 일상과 불규칙한 식습관으로 인해 우리 몸에 꼭 필요한 필수 영양소들을 제대로 섭취하기 어려운 경우가 많습니다. 만성적인 피로감을 날려버리고 하루 종일 지치지 않는 에너지를 선사해 줄 프리미엄 활력 부스터, **아나민 프리미엄 골드 멀티비타민**을 소개합니다.\n\n이 제품은 단순한 비타민 영양제를 넘어, 에너지 대사에 핵심적인 역할을 하는 고함량 비타민 B군을 베이스로 프리미엄 부원료인 알부민까지 아낌없이 담아낸 올인원 건강기능식품입니다. 면역력 저하, 체력 저하로 고생하는 직장인이나 수험생, 그리고 기력 회복이 필요한 부모님 세대까지 전 연령층의 건강을 책임지는 아나민 프리미엄 골드의 압도적인 성분 배합과 장점들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 강력한 무기는 바로 \'에너지 생성의 핵심, 고함량 비타민 B군 콤플렉스\'입니다. 탄수화물과 에너지 대사에 필요한 비타민 B1부터 단백질 및 아미노산 이용에 필요한 비타민 B6까지, 1일 영양성분 기준치를 훌쩍 뛰어넘는 고함량 비타민 B군을 체계적으로 배합했습니다. 섭취 후 체내에 빠르게 흡수되어 즉각적인 활력을 불어넣어 주며, 지치고 피로한 일상에 강력한 에너지 부스터 역할을 수행합니다.' },
    { img: '2.jpg', text: '타사 제품들과 차별화되는 아나민만의 독보적인 강점은 바로 \'프리미엄 부원료 알부민 함유\'입니다. 혈액 속 단백질의 50~60%를 차지하는 필수 아미노산 복합체인 알부민은 영양분 운반과 신진대사 촉진에 매우 중요한 역할을 하는데요. 고가의 원료라 일반 영양제에서는 쉽게 찾아보기 힘든 이 알부민을 부원료로 듬뿍 담아내어, 기력 회복과 체력 증진이 절실히 필요한 분들에게 차원이 다른 컨디션 회복 효과를 선사합니다.' },
    { img: '3.jpg', text: '비타민 B군 외에도 현대인에게 꼭 필요한 \'항산화 및 면역력 강화 성분\'들을 알차게 채웠습니다. 유해 산소로부터 세포를 보호하는 항산화 비타민 C, 뼈의 형성과 유지에 필수적인 비타민 D, 그리고 정상적인 면역 기능과 세포 분열에 필요한 아연까지 하루 한 알에 꽉꽉 눌러 담았습니다. 여러 종류의 영양제를 번거롭게 따로 챙겨 먹을 필요 없이, 이 제품 하나로 기초 건강 밸런스를 완벽하게 유지할 수 있습니다.' },
    { img: '4.jpg', text: '매일 꾸준히 섭취해야 하는 영양제인 만큼 \'목 넘김이 편안한 사이즈와 위생적인 개별 PTP 포장\'을 적용했습니다. 알약의 크기가 작아 남녀노소 누구나 부담 없이 넘길 수 있으며, 공기와 습기를 완벽하게 차단하는 개별 포장 덕분에 변질 우려 없이 마지막 한 알까지 신선하고 위생적으로 섭취할 수 있습니다. 12개 박스에 각각 10정씩 포장되어 있어 가방이나 파우치에 휴대하며 직장이나 학교 어디서든 간편하게 챙겨 먹기 좋습니다.' }
  ],
  outro: '매일 아침 찌뿌둥한 몸을 이끌고 힘겹게 하루를 시작하고 계신가요? 고함량 비타민 B군의 강력한 에너지 부스팅 효과와 프리미엄 알부민의 시너지 효과를 하나의 알약에 담아낸 **아나민 프리미엄 골드 멀티비타민**으로 지친 일상에 확실한 활력을 충전해 보세요. 소중한 내 몸을 위한 투자, 혹은 사랑하는 가족들의 건강을 챙기기 위한 센스 있는 선물로 이보다 더 완벽한 선택은 없을 것입니다.',
  summary: '활력 충전 완벽 해결! 아나민 프리미엄 골드 멀티비타민 완벽 분석'
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
  if (row['폴더이름'] === '아나민 프리미엄 골드 멀티비타민 비타민B 영양제 부원료 알부민 함유제품, 12개, 10정') {
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
