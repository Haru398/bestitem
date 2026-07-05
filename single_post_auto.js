const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-nutricore-vitamin-d-1000iu',
  category: '건강식품',
  title: '화학첨가물 0%! 임산부도 안심하고 먹는 뉴트리코어 유기농 비타민D 1000IU 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\뉴트리코어 유기농 비타민D 1000 IU, 60정, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\뉴트리코어 유기농 비타민D 1000 IU, 60정, 1개',
  link: 'https://link.coupang.com/a/e6UPbxFwDk',
  iframe: '<iframe src="https://coupa.ng/cnPbX0" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '현대인의 약 90%가 비타민D 결핍을 겪고 있다는 사실, 알고 계셨나요? 실내 생활이 길어지고 자외선 차단제 사용이 일상화되면서 햇빛을 통한 자연적인 합성이 매우 어려워졌습니다. 비타민D는 칼슘 흡수와 뼈 건강을 유지하는 데 필수적일 뿐만 아니라 면역력과도 직결되는 중요한 영양소입니다. 수많은 영양제 중에서도 특히 임산부와 수유부, 그리고 위장이 예민한 분들에게 압도적인 지지를 받고 있는 \'뉴트리코어 유기농 비타민D 1000IU\' 제품이 왜 그토록 특별한지 꼼꼼하게 파헤쳐보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 큰 차별점은 100% 유기농 원료만을 고집했다는 점입니다. 화학비료, 농약, 제초제를 일절 사용하지 않은 자연 상태 그대로의 깨끗한 토양에서 자란 유기농 건조효모를 주원료로 사용하여 체내 흡수율과 생체 이용률을 극대화했습니다. 자연 유래 성분이기 때문에 식전, 식후 상관없이 언제 섭취해도 속쓰림이나 메스꺼움 없이 속이 편안한 것이 특징입니다.' },
    { img: '2.jpg', text: '제품 패키지를 살펴보면 \'NCS(No Chemical Solvent)\' 마크를 확인할 수 있습니다. 영양제를 만들 때 생산성을 높이거나 모양을 유지하기 위해 흔히 쓰이는 이산화규소, HPMC, 스테아린산마그네슘 등의 화학부형제를 0.1%도 첨가하지 않았습니다. 매일 꾸준히 먹어야 하는 영양제인 만큼, 체내에 화학 성분이 축적될 걱정 없이 안심하고 섭취할 수 있는 진정한 무첨가 제품입니다.' },
    { img: '3.jpg', text: '주원료뿐만 아니라 부원료까지 꼼꼼하게 유기농으로 채웠습니다. 유기농 베리 혼합 분말, 유기농 과일 혼합 분말, 그리고 유기농 채소 혼합 분말 등 총 51가지의 프리미엄 유기농 부원료가 배합되어 있어, 비타민D 보충과 동시에 현대인에게 부족하기 쉬운 다양한 식물성 영양소(파이토케미컬)의 시너지 효과까지 기대할 수 있습니다.' },
    { img: '4.jpg', text: '하루 단 1정 섭취만으로 식약처 1일 영양성분 기준치 대비 250%에 달하는 1000IU의 비타민D를 섭취할 수 있습니다. 특히 이 제품은 비타민D2가 아닌, 햇빛을 받았을 때 우리 몸에서 체내 합성되는 형태와 동일한 활성형 \'비타민D3\'를 사용하여 체내 흡수율을 한 단계 더 끌어올렸습니다. 골다공증 발생 위험 감소에 큰 도움을 줄 수 있는 이상적인 배합입니다.' },
    { img: '5.jpg', text: '위생적이고 안전한 PTP(Press Through Package) 개별 포장 방식을 채택하여 마지막 한 알까지 신선하게 섭취할 수 있습니다. 공기와 습기, 빛을 완벽하게 차단하여 산패와 변질을 막아주며, 외출이나 여행 시에도 파우치에 가볍게 챙겨 다닐 수 있어 바쁜 직장인들도 하루 한 번 꾸준한 영양 관리를 실천하기에 매우 편리합니다.' }
  ],
  outro: '뉴트리코어 유기농 비타민D 1000IU는 화학첨가물에 민감한 임산부부터 뼈가 약해지기 쉬운 갱년기 여성, 성장기 어린이, 그리고 햇빛을 보기 힘든 수험생과 직장인까지 온 가족이 믿고 먹을 수 있는 프리미엄 영양제입니다. 까다로운 유기농 인증과 NCS 무첨가 공법으로 완성된 이 제품으로, 내 몸을 위한 가장 안전하고 확실한 뼈 건강 관리를 시작해 보시기 바랍니다.',
  summary: '화학첨가물 0%! 임산부도 안심하고 먹는 뉴트리코어 유기농 비타민D 1000IU 성분 분석'
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
