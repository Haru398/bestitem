const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-puremax-kf94-mask',
  category: '생활용품',
  title: '장시간 착용해도 귀가 편안한 식약처 인증 퓨어맥스 KF94 대형 화이트 마스크 필터 구조 및 통기성 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\퓨어맥스 방역마스크 KF94 대형 화이트',
  backupDir: 'D:\\정식서버업로드전용폴더\\퓨어맥스 방역마스크 KF94 대형 화이트',
  link: 'https://link.coupang.com/a/eTGZbcElXM',
  iframe: '<iframe src="https://coupa.ng/cnFstG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '미세먼지와 황사, 그리고 각종 호흡기 질환으로부터 우리 몸을 보호하기 위해 마스크는 이제 외출 시 빼놓을 수 없는 필수품이 되었습니다. 하지만 하루 종일 마스크를 착용하다 보면 귀 뒷부분이 끊어질 듯 아프거나 숨쉬기가 답답해 두통까지 호소하는 경우가 빈번하게 발생합니다. 이러한 착용감의 불편함을 근본적으로 해결하면서도, 식약처 허가를 받아 완벽한 차단력을 자랑하는 **퓨어맥스 방역마스크 KF94 대형 화이트** 제품의 필터 구조와 인체공학적 설계 특징을 상세히 분석해 보겠습니다.\n\n이 제품은 단순히 외부 유해 물질을 막아내는 1차원적인 기능을 넘어, 사용자들의 실제 불편 사항인 \'호흡의 편안함\'과 \'장시간 착용 시의 통증 완화\'에 초점을 맞춰 개발되었습니다. 고효율의 차단 필터 기술과 피부 자극을 최소화한 소재의 결합을 통해, 매일 착용해야 하는 데일리 마스크의 새로운 기준을 제시하고 있습니다.',
  sections: [
    { img: '1.jpg', text: '방역 마스크의 핵심인 필터 성능부터 살펴보면, 이 제품은 황사와 미세먼지 등 입자성 유해 물질을 94% 이상 차단할 수 있는 \'식약처 허가 의약외품 KF94 등급\'을 획득했습니다. 정전기 필터를 포함한 4중 구조의 고효율 필터가 적용되어 외부 오염 물질을 완벽하게 걸러내면서도, 안면부의 호흡 공간을 입체적으로 확보하는 3D 입체 구조를 통해 마스크가 입술에 닿지 않아 숨쉬기가 매우 편안하고 립스틱 등 화장품이 묻어나는 것을 방지해 줍니다.' },
    { img: '2.jpg', text: '마스크 선택의 가장 중요한 기준인 착용감을 결정짓는 요소는 바로 이어밴드(귀끈)의 탄력성입니다. 이 제품은 장시간 착용 시 귀 통증을 유발하는 얇고 뻣뻣한 끈 대신, \'신축성이 뛰어나고 부드러운 고급 이어밴드\'를 채택하여 귀에 가해지는 압력을 효과적으로 분산시킵니다. 또한, 얼굴의 굴곡에 완벽하게 밀착되도록 돕는 기능성 코지지대가 내장되어 있어 김서림 현상을 방지하며 미세먼지가 틈새로 새어 들어오는 누설률을 최소화합니다.' }
  ],
  outro: '마스크는 하루 중 가장 오랜 시간 피부에 직접 닿고 호흡과 직결되는 제품인 만큼, 안전성과 착용감 어느 하나도 타협할 수 없습니다. 철저한 품질 관리를 통과한 식약처 인증 제품이자 편안한 이어밴드와 쾌적한 3D 입체 구조로 무장한 **퓨어맥스 방역마스크 KF94**는 출퇴근하는 직장인은 물론 대중교통을 이용하는 학생들에게 가장 든든한 방어막이 되어줄 것입니다. 미세먼지로부터 호흡기 건강을 안전하게 지키면서 쾌적한 착용감까지 챙기고 싶다면 이 제품을 적극 권장합니다.',
  summary: '장시간 착용해도 귀가 편안한 식약처 인증 퓨어맥스 KF94 대형 화이트 마스크 필터 구조 및 통기성 분석'
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
  if (row['폴더이름'] === '퓨어맥스 방역마스크 KF94 대형 화이트') {
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
