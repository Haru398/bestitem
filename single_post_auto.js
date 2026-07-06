const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-ahc-masters-air-rich-sunstick',
  category: '뷰티/화장품',
  title: '보송한 마무리감의 끝판왕, AHC 마스터즈 에어리치 선스틱 자외선 차단 효과 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\AHC 마스터즈 에어리치 선스틱 SPF50+ PA++++, 14g, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\AHC 마스터즈 에어리치 선스틱 SPF50+ PA++++, 14g, 1개',
  link: 'https://link.coupang.com/a/e7J11crPNY',
  iframe: '<iframe src="https://coupa.ng/cnPwpn" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '3.jpg', '5.jpg', '7.jpg', '9.jpg'],
  intro: '강렬한 태양이 내리쬐는 여름철은 물론, 사계절 내내 피부 노화와 색소 침착을 막기 위해 \'자외선 차단제\'는 선택이 아닌 필수입니다. 하지만 자외선 차단제를 바를 때마다 느껴지는 특유의 끈적임과 답답함, 그리고 손에 묻혀가며 덧발라야 하는 번거로움 때문에 선크림 사용을 꺼려 하는 분들이 많습니다. 이러한 불편함을 완벽하게 해소하며 대한민국 선케어 시장을 뒤흔든 제품이 있습니다. 골프 여제 박세리 감독의 선케어 노하우가 집약된 \'AHC 마스터즈 에어리치 선스틱 SPF50+ PA++++\'가 바로 그 주인공입니다. 손대지 않고 쓱쓱 바르는 편리함부터 공기처럼 가벼운 밀착력까지, 이 제품이 왜 국민 선스틱으로 불리는지 그 이유를 철저히 파헤쳐 봅니다.',
  sections: [
    { img: '1.jpg', text: '국내 최고 수준의 강력한 자외선 차단 지수: 자외선 차단제를 고를 때 가장 먼저 확인해야 할 것은 단연 \'차단 지수\'입니다. 이 제품은 SPF50+ PA++++라는 국내 최고 수준의 강력한 자외선 차단 등급을 자랑합니다. 기미와 주근깨를 유발하는 자외선 B(UVB)는 물론, 피부 깊숙이 침투하여 주름과 탄력 저하(광노화)를 일으키는 자외선 A(UVA)까지 철벽 방어해 줍니다. 야외 스포츠를 즐기거나 장시간 햇빛에 노출되는 환경에서도 안심하고 피부를 보호할 수 있습니다.' },
    { img: '3.jpg', text: '공기처럼 가볍고 끈적임 없는 보송한 마무리감: 기존 선스틱의 가장 큰 단점으로 지적되던 유분기와 번들거림을 혁신적으로 개선했습니다. \'에어리치(Air-rich)\'라는 이름에 걸맞게 피부에 닿는 순간 공기처럼 얇고 투명하게 밀착되며, 바른 직후 기름종이를 얹어보아도 묻어남이 없을 정도로 산뜻하고 보송한 마무리감을 선사합니다. 피지 분비가 왕성한 지성 피부나 끈적이는 것을 극도로 싫어하는 남성분들도 스킨케어 마지막 단계에서 아무런 부담 없이 편안하게 사용할 수 있습니다.' },
    { img: '5.jpg', text: '손에 묻지 않는 편리함과 위생적인 사용법: 튜브형 선크림의 경우 짜서 손으로 펴 발라야 하기 때문에 밖에서 덧바르기 번거롭고 위생상으로도 찝찝할 때가 많습니다. 하지만 스틱 타입인 이 제품은 캡을 열고 아래 다이얼을 돌려 내용물을 꺼낸 뒤, 피부 결을 따라 쓱쓱 문질러주기만 하면 끝입니다. 손에 묻힐 필요가 전혀 없어 메이크업 전후나 야외 활동 중에도 수시로 덧바르기 매우 용이하며, 한 손에 쏙 들어오는 콤팩트한 14g 사이즈로 휴대성 또한 뛰어납니다.' },
    { img: '7.jpg', text: '물과 땀에 강한 지속력과 진정 스킨케어 성분: 뜨거운 여름날 흐르는 땀이나 휴가지의 물놀이 환경에서도 자외선 차단 효과가 씻겨나가지 않도록 강력한 워터프루프 및 스웨트프루프 효과를 탑재했습니다. 뿐만 아니라 칼라민, 병풀 추출물 등 자극받은 피부를 편안하게 진정시켜 주는 스킨케어 성분이 함유되어 있어, 자외선으로 인해 한껏 달아오르고 예민해진 피부 온도를 낮추고 다독이는 데 도움을 줍니다.' },
    { img: '9.jpg', text: '굴곡진 부위까지 완벽하게 커버하는 인체공학적 디자인: 선스틱의 단면이 일자가 아닌, 물방울 모양을 연상케 하는 곡선 형태로 디자인되었습니다. 이 세심한 인체공학적 설계 덕분에 이마, 볼 등 넓은 부위는 물론이고 콧볼 옆, 눈가, 턱 선 등 굴곡지고 후미진 부위까지 빈틈없이 밀착되어 자외선 차단제의 사각지대를 없앴습니다. 얼굴뿐만 아니라 목 뒷부분, 팔다리 등 바디에도 쉽게 펴 바를 수 있어 활용도가 매우 높습니다.' }
  ],
  outro: 'AHC 마스터즈 에어리치 선스틱은 \'자외선 차단제는 답답하다\'라는 오랜 편견을 완벽하게 부수고 쾌적한 선케어의 신세계를 열어준 독보적인 아이템입니다. 언제 어디서나 손쉽게 꺼내 쓱쓱 바를 수 있는 편리함, 기름기 없이 보송하게 유지되는 텍스처, 그리고 빈틈없는 강력한 자외선 방어력까지 모든 면에서 육각형의 밸런스를 갖추었습니다. 자외선으로부터 맑고 건강한 피부를 지키기 위한 가장 똑똑하고 간편한 습관, AHC 에어리치 선스틱을 파우치 속 필수템으로 적극 추천해 드립니다.',
  summary: '보송한 마무리감의 끝판왕, AHC 마스터즈 에어리치 선스틱 자외선 차단 효과 분석'
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
