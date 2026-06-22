const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-coupangbasic-toiletpaper',
  category: '생활용품',
  title: '먼지 없는 무형광 천연펄프! 쿠팡베이직 네추럴 3겹 롤화장지 30m 가성비 추천',
  sourceDir: 'D:\\정식홈페이지자동화\\쿠팡베이직 네추럴 3겹 천연펄프 롤화장지 30m',
  backupDir: 'D:\\정식서버업로드전용폴더\\쿠팡베이직 네추럴 3겹 천연펄프 롤화장지 30m',
  link: 'https://link.coupang.com/a/eM7NJDgIqy',
  iframe: '<iframe src="https://coupa.ng/cnz5WG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.png'],
  intro: '우리가 매일 화장실에서 사용하는 휴지, 피부에 직접 닿고 심지어 민감한 부위에 매일같이 쓰이는 제품인 만큼 아무것이나 저렴하다고 덥석 집을 수는 없습니다. 온 가족이 안심하고 사용할 수 있는 안전한 성분은 기본이고, 도톰한 두께감과 부드러운 촉감, 그리고 경제적인 부담까지 확 줄여줄 수 있는 진정한 가성비 휴지를 찾고 계셨나요? 그렇다면 압도적인 판매량과 수많은 소비자들의 생생한 리뷰로 검증된 휴지계의 갓성비 템, **쿠팡베이직 네추럴 3겹 천연펄프 롤화장지 30m**를 강력하게 추천합니다.\n\n불필요한 마케팅 비용과 유통 거품을 쫙 빼고 오직 품질에만 집중한 쿠팡베이직 라인업의 대표 주자인 이 제품은, 까다로운 공정을 거쳐 탄생한 100% 천연 펄프만을 사용하여 믿고 쓸 수 있습니다. 형광증백제 등 인체에 유해한 화학 성분을 철저하게 배제하여 연약한 아기 피부나 민감성 피부를 가진 분들도 트러블 걱정 없이 매일 안심하고 사용할 수 있습니다. 매번 휴지를 뜯을 때마다 흩날리던 불쾌한 먼지를 최소화하고, 피부에 닿는 자극을 현저히 줄인 이 기특한 롤화장지의 매력을 하나하나 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품을 자신 있게 추천하는 가장 큰 이유는 바로 피부 안전에 치명적인 \'형광증백제\'와 \'포름알데히드\' 등 유해 화학 물질이 단 한 방울도 들어가지 않은 \'100% 무형광 순수 천연펄프\'라는 점입니다. 하얗게 보이기 위해 인위적인 표백 처리를 하지 않아 펄프 고유의 자연스러운 색감을 띠고 있으며, 인공 향료나 색소 또한 철저히 배제하여 피부가 예민한 아이들이나 임산부들도 아무런 걱정 없이 편안하게 매일 사용할 수 있는 완벽한 안심 포뮬러를 자랑합니다.' },
    { img: '2.jpg', text: '화장실 휴지에서 가장 스트레스받는 부분 중 하나가 바로 휴지를 한 칸 뜯을 때마다 눈처럼 풀풀 날리는 미세먼지입니다. 쿠팡베이직 네추럴 화장지는 특수 마이크로 엠보싱 기술을 적용하여 펄프 결을 단단하게 잡아주어 먼지 날림을 획기적으로 줄였습니다. 비염이 있어 코를 자주 푸시는 분들이나 호흡기가 예민한 반려동물과 함께 생활하는 가정에서도 먼지로 인한 재채기나 눈 따가움 없이 아주 쾌적하고 깔끔하게 사용하실 수 있습니다.' },
    { img: '3.jpg', text: '얇아서 한 번 닦을 때마다 여러 칸을 칭칭 감아 써야 했던 기존 저가형 휴지들과는 차원이 다릅니다. 이 제품은 공기를 머금은 푹신한 \'3겹 레이어 구조\'로 이루어져 있어 단 두세 칸만으로도 도톰하고 쫀쫀한 탄력감을 선사합니다. 물기가 닿아도 쉽게 찢어지거나 손에 묻어나지 않는 뛰어난 흡수력과 내구성을 지녔으며, 피부에 닿는 순간 고급 각티슈를 쓰는 듯한 극강의 부드러움을 느낄 수 있습니다.' },
    { img: '4.png', text: '품질은 프리미엄급으로 올리고 가격은 깃털처럼 가볍게 낮췄습니다! 30m라는 넉넉하고 길쭉한 길이의 롤화장지가 무려 30롤이나 꽉꽉 채워져 있는 짐승 용량 패키지로, 4인 가족 기준으로도 한 번 쟁여두면 휴지 떨어질 걱정 없이 아주 든든하게 오랜 기간 사용할 수 있습니다. 고물가 시대에 가계 경제에 큰 보탬이 되는, 그야말로 압도적인 가성비를 자랑하는 우리 집 욕실 필수템입니다.' }
  ],
  outro: '매일 쓰는 생필품일수록 기본기가 탄탄하고 안전해야 합니다. 이름 없는 싸구려 휴지에 실망하셨거나, 쓸데없이 비싼 프리미엄 휴지 가격에 부담을 느끼셨던 분들에게 이 제품은 완벽한 타협점이 되어줄 것입니다. 100% 천연펄프의 건강함과 3겹의 도톰함, 그리고 미세먼지 억제력까지 모두 갖춘 **쿠팡베이직 네추럴 3겹 천연펄프 롤화장지 30m**! 지금 바로 로켓배송으로 현관 앞까지 빠르고 편안하게 받아보시고, 온 가족을 위한 안전하고 경제적인 화장실 라이프를 완성해 보세요.',
  summary: '먼지 없는 무형광 천연펄프! 쿠팡베이직 네추럴 3겹 롤화장지 30m 가성비 추천'
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
  if (row['폴더이름'] === '쿠팡베이직 네추럴 3겹 천연펄프 롤화장지 30m') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
