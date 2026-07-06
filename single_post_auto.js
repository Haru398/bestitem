const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-nivea-lip-care',
  category: '뷰티/화장품',
  title: '사계절 촉촉한 입술 관리의 정석, 국민 립밤 니베아 립케어 에센셜 보습력 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\니베아 립케어 에센셜 케어',
  backupDir: 'D:\\정식서버업로드전용폴더\\니베아 립케어 에센셜 케어',
  link: 'https://link.coupang.com/a/e61tsE9eTs',
  iframe: '<iframe src="https://coupa.ng/cnPgRh" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg'],
  intro: '건조한 찬 바람이 부는 겨울철은 물론이고, 에어컨 바람에 수분을 빼앗기기 쉬운 여름철 실내에서도 입술 관리는 필수입니다. 입술은 우리 피부 중 각질층이 가장 얇고 피지선이 없어 수분을 유지하는 능력이 현저히 떨어지기 때문에, 쉽게 트고 갈라지며 심하면 피가 나기도 합니다. 전 세계적으로 수십 년간 립밤의 대명사로 불리며 수많은 사람들의 파우치 속 필수템으로 자리 잡은 \'니베아(NIVEA)\'의 대표 베스트셀러, \'니베아 립케어 에센셜 케어\'의 탁월한 보습 성분과 입술 각질 진정 효과를 다각도로 분석하여 왜 아직까지도 대체 불가능한 1위 제품인지 상세히 알려드립니다.',
  sections: [
    { img: '1.jpg', text: '자연 유래 식물성 오일의 깊고 진한 보습 장벽: 니베아 에센셜 케어의 가장 강력한 무기는 바로 뛰어난 수분 유지력입니다. 피마자씨 오일, 호호바 씨 오일, 그리고 보습의 끝판왕이라 불리는 시어버터 등 자연에서 유래한 고농축 식물성 오일 성분이 듬뿍 함유되어 있습니다. 이 성분들이 입술 표면에 도톰하고 강력한 보습 보호막을 형성하여 체내 수분이 외부로 증발하는 것을 철저하게 차단해 주며, 한 번만 쓱 발라도 최대 24시간 동안 건조함 없이 촉촉하고 부드러운 입술 상태를 유지시켜 줍니다.' },
    { img: '2.jpg', text: '남녀노소 호불호 없는 무색무취의 깔끔한 사용감: 시중에 판매되는 일부 립밤들은 과도한 광택(번들거림)이나 인공적인 색상, 강한 과일 향 때문에 남성분들이나 향에 민감한 분들이 사용하기 꺼려지는 경우가 많습니다. 하지만 이 제품은 특유의 번들거림을 쏙 빼어 매트하면서도 쫀쫀하게 밀착되는 제형을 자랑합니다. 립스틱이나 틴트를 바르기 전 베이스로 사용해도 발색에 전혀 영향을 주지 않으며, 색상과 자극적인 향이 거의 없어 학생부터 직장인 남성까지 누구나 데일리로 부담 없이 바르기에 최적화되어 있습니다.' },
    { img: '3.jpg', text: '가성비와 휴대성을 모두 잡은 콤팩트한 디자인: 주머니나 미니 백에 쏙 들어가는 한 손 크기의 콤팩트한 사이즈로 언제 어디서나 입술이 건조함을 느낄 때 즉각적인 수분 공급이 가능합니다. 집, 사무실 책상, 자동차 등 손이 자주 가는 곳마다 하나씩 비치해 두기 좋을 만큼 훌륭한 가성비를 자랑하며, 부드러운 스틱 타입으로 손가락에 묻힐 필요 없이 위생적으로 바를 수 있어 더욱 실용적입니다. 환절기 갈라진 입술로 고통받고 계신다면 가장 기본적이고 확실한 해결책이 될 것입니다.' }
  ],
  outro: '니베아 립케어 에센셜 케어는 트렌드가 빠르게 변하는 뷰티 시장에서 흔들림 없이 오랫동안 사랑받아 온 클래식의 힘을 보여주는 제품입니다. 화려한 패키지나 인위적인 색소 대신, \'강력한 보습\'이라는 립밤의 가장 본질적인 기능에 집중하여 거칠어진 입술을 빠르게 진정시키고 본연의 매끄러움을 되찾아 줍니다. 찬 바람에 상처받은 입술을 위한 가장 완벽한 방패, 국민 립밤 니베아 에센셜 케어와 함께 사계절 내내 생기 있고 촉촉한 입술을 가꿔보시길 적극 권장합니다.',
  summary: '사계절 촉촉한 입술 관리의 정석, 국민 립밤 니베아 립케어 에센셜 보습력 완벽 분석'
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
