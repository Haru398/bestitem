const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-headandshoulders-coolmenthol',
  category: '생활용품',
  title: '비듬 각질 완벽 케어! 헤드앤숄더 쿨멘솔 샴푸 1.2L 대용량 효과 및 성분',
  sourceDir: 'D:\\정식홈페이지자동화\\헤드앤숄더 두피 토탈 솔루션 샴푸 쿨 멘솔, 1.2L, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\헤드앤숄더 두피 토탈 솔루션 샴푸 쿨 멘솔, 1.2L, 1개',
  link: 'https://link.coupang.com/a/eM8lyroFYi',
  iframe: '<iframe src="https://coupa.ng/cnz6jG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '날씨가 더워지거나 건조해질 때마다 어깨 위로 하얗게 떨어지는 불청객, 비듬 때문에 남몰래 스트레스받고 계신가요? 매일 아침 공들여 머리를 감아도 오후만 되면 정수리에서 올라오는 불쾌한 냄새와 견딜 수 없는 가려움증은 사회생활의 큰 골칫거리입니다. 단순한 세정을 넘어 근본적인 두피 환경 개선이 시급한 지금, 전 세계 비듬 샴푸 판매 1위라는 타이틀로 압도적인 제품력을 증명하고 있는 **헤드앤숄더 쿨 멘솔 샴푸 1.2L 대용량**을 강력하게 추천합니다.\n\n이 제품은 일시적으로 각질을 씻어내는 데 그치지 않고, 두피 트러블의 근본적인 원인을 타겟팅하여 건강하고 깨끗한 두피 생태계를 되찾아주는 \'두피 토탈 솔루션\'입니다. 한 번만 펌핑해도 풍성하고 조밀하게 일어나는 거품이 두피 모공 구석구석에 쌓인 노폐물과 피지를 말끔하게 청소해 주며, 천연 멘솔 성분이 선사하는 짜릿한 쿨링감은 한여름의 불쾌지수마저 단숨에 날려버릴 만큼 상쾌합니다. 비듬과 가려움의 굴레에서 당신을 구원해 줄 헤드앤숄더 쿨 멘솔 샴푸만의 압도적인 효능을 지금부터 상세히 분석해 드리겠습니다.',
  sections: [
    { img: '1.jpg', text: '일반 샴푸로는 쉽게 해결되지 않는 악성 비듬과 두피 각질을 잠재우는 핵심 비결은 바로 헤드앤숄더만의 축적된 두피 케어 기술력에 있습니다. 임상으로 입증된 강력한 비듬 완화 성분이 두피 장벽을 강화하고 피지 분비의 밸런스를 조절하여, 눈에 보이는 하얀 비듬은 물론이고 긁어도 긁어도 가시지 않던 지독한 두피 가려움증까지 단시간 내에 효과적으로 진정시켜 줍니다.' },
    { img: '2.jpg', text: '머리를 감는 순간 즉각적으로 느껴지는 \'-5도 체감 쿨링 이펙트\'는 이 샴푸의 가장 큰 매력 포인트입니다. 프리미엄 천연 멘솔 추출물이 듬뿍 함유되어 있어, 뜨겁게 열이 오른 정수리 두피의 온도를 시원하게 낮춰주고 하루 종일 쌓인 스트레스와 피로감까지 개운하게 씻어내는 기분 좋은 상쾌함을 선사합니다. 특히 땀을 많이 흘리는 여름철이나 운동 직후에 사용하면 그 진가를 200% 발휘합니다.' },
    { img: '3.jpg', text: '아무리 세정력이 좋아도 모발이 뻣뻣해진다면 매일 사용하기 꺼려지기 마련입니다. 헤드앤숄더 쿨 멘솔 샴푸는 강력한 두피 딥 클렌징 효과를 제공하면서도, 모발에 필요한 수분과 영양을 앗아가지 않는 최적의 수분 밸런스 포뮬러를 적용했습니다. 린스나 트리트먼트를 따로 사용하지 않아도 엉킴 없이 부드럽고 찰랑이는 머릿결을 유지할 수 있어 남녀노소 누구나 만족하며 사용할 수 있습니다.' },
    { img: '4.jpg', text: '피부와 가장 유사한 pH 약산성 처방으로 완성되어, 외부 자극에 민감해진 두피를 자극 없이 매우 순하고 부드럽게 세정합니다. 화학적인 자극을 최소화하여 두피 고유의 보호막은 지켜내고 씻어내야 할 오염 물질만을 스마트하게 분리해 내기 때문에, 매일 아침저녁으로 잦은 샴푸를 하시는 분들이나 두피가 예민하신 분들도 안심하고 데일리 케어용으로 팍팍 사용하실 수 있습니다.' },
    { img: '5.jpg', text: '샴푸를 자주 구매하는 번거로움과 경제적 부담을 확 줄여줄 짐승 용량! 무려 1.2L(1200ml)에 달하는 묵직한 대용량 패키지로 구성되어 있어 가성비 면에서 타의 추종을 불허합니다. 온 가족이 함께 펑펑 써도 몇 달은 든든하게 버틸 수 있으며, 욕실 한편에 무심하게 툭 얹어두는 것만으로도 휴지나 세제 못지않은 심리적인 든든함을 선사하는 우리 집 욕실의 필수 쟁여템입니다.' }
  ],
  outro: '매일 아침 샴푸를 하면서도 여전히 개운하지 않고 오후만 되면 두피가 가려워 신경 쓰이셨다면, 샴푸를 바꿀 때가 된 것입니다. 두피 모공 청소부터 비듬 완화, 그리고 짜릿한 쿨링감으로 완성되는 완벽한 마무리까지! 전 세계가 검증한 두피 케어 전문가 **헤드앤숄더 쿨 멘솔 샴푸 1.2L**와 함께 지긋지긋한 두피 스트레스와 영원히 작별하시고, 언제 어디서나 어깨를 활짝 펴고 당당한 일상을 되찾으시길 강력히 추천합니다.',
  summary: '비듬 각질 완벽 케어! 헤드앤숄더 쿨멘솔 샴푸 1.2L 대용량 성분 및 추천'
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
  if (row['폴더이름'] === '헤드앤숄더 두피 토탈 솔루션 샴푸 쿨 멘솔, 1.2L, 1개') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
