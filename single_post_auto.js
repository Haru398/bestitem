const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dyson-v8-fluffy',
  category: '가전',
  title: '강력한 흡입력의 다이슨 V8 플러피 무선 청소기 장단점 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\다이슨 V8 플러피 무선 청소기',
  backupDir: 'D:\\정식서버업로드전용폴더\\다이슨 V8 플러피 무선 청소기',
  link: 'https://link.coupang.com/a/eNaTHgFWKa',
  iframe: '<iframe src="https://coupa.ng/cnz7Xa" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '집안 곳곳에 쌓인 먼지를 치울 때마다 무거운 유선 청소기의 코드를 꼽고 빼기를 반복하며 지치신 적이 있으신가요? 최근 수많은 프리미엄 무선 청소기들이 쏟아져 나오고 있지만, 100만 원을 훌쩍 넘는 부담스러운 가격 때문에 구매를 망설이는 분들이 적지 않습니다. 그렇다면 다이슨의 독보적인 기술력은 고스란히 누리면서 합리적인 가격대까지 갖춘 진정한 가성비 모델을 만나보실 차례입니다. 바로 수많은 사용자들에게 검증된 영원한 스테디셀러, **다이슨 V8 플러피 무선 청소기**입니다.\n\n이 제품은 최신형 하이엔드 모델은 아니지만, 일반 가정집의 일상적인 청소를 완벽하게 커버하고도 남는 강력한 모터 성능과 다이슨만의 혁신적인 먼지 분리 기술을 탑재하여 꾸준한 사랑을 받고 있습니다. 부담 없는 가격대로 다이슨 입문자들에게 폭발적인 인기를 끌고 있는 V8 플러피만의 핵심 스펙과 뛰어난 가성비 포인트를 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '다이슨 V8 플러피의 심장에는 분당 최대 110,000번 회전하며 매서운 흡입력을 만들어내는 다이슨 디지털 모터 V8이 탑재되어 있습니다. 한국식 마루나 장판 바닥에 특화된 소프트 롤러 클리너 헤드와 만나면 시너지가 폭발하는데, 부드러운 우븐 나일론과 정전기 방지 카본 파이버 필라멘트가 눈에 잘 보이지 않는 미세한 생활 먼지부터 머리카락, 큰 부스러기까지 한 번의 스침만으로도 깨끗하게 빨아들입니다.' },
    { img: '2.jpg', text: '오랜 시간 쾌적한 환경을 유지해 주는 배터리 성능 또한 발군입니다. 페이드 프리(Fade-free) 방식의 6셀 리튬 이온 배터리를 장착하여, 배터리가 방전되기 직전까지도 처음 켰을 때와 동일한 강력한 흡입력을 흔들림 없이 유지합니다. 일반 모드 기준으로 최대 40분간 연속 사용이 가능하여 30평대 아파트 정도는 중간에 충전할 필요 없이 한 번에 여유롭게 대청소를 마무리할 수 있습니다.' },
    { img: '3.jpg', text: '청소기 내부에서 빨아들인 미세먼지가 다시 밖으로 새어 나온다면 청소하는 의미가 없겠죠. 다이슨 V8 플러피는 알레르기 유발 물질이나 0.3 마이크론 크기의 미세한 먼지 입자를 무려 99.97%까지 가두는 완벽한 밀폐형 여과 시스템을 갖추고 있습니다. 청소기 배기구를 통해 뿜어져 나오는 공기가 우리가 숨 쉬는 실내 공기보다 더 깨끗할 정도로 정화되어 배출되므로, 어린아이나 반려동물이 있는 가정에서도 안심하고 사용할 수 있습니다.' },
    { img: '4.jpg', text: '일상적인 바닥 청소뿐만 아니라, 집 안 구석구석 다양한 환경에 맞춰 사용할 수 있도록 풍성한 툴 구성품을 기본으로 제공합니다. 버튼 하나만 누르면 가벼운 핸디형 청소기로 변신하여, 창틀이나 소파 틈새, 천장 모서리, 심지어 차량 내부 세차 시에도 유용하게 활용할 수 있습니다. 콤비네이션 툴과 크레비스 툴 등 적재적소에 맞는 툴을 교체해 가며 빈틈없는 입체적인 청소가 가능합니다.' },
    { img: '5.jpg', text: '사용자의 위생까지 고려한 스마트한 먼지통 비움 시스템도 빼놓을 수 없습니다. 먼지통 상단의 레버를 위로 당기기만 하면 바닥 뚜껑이 열리면서 내부의 먼지와 머리카락이 아래로 툭 떨어지는 포인트 앤 슈트(Point and shoot) 방식을 채택했습니다. 이물질에 직접 손을 대거나 먼지가 풀풀 날리는 것을 방지하여 청소의 마무리까지 깔끔하고 위생적입니다.' },
    { img: '6.jpg', text: '벽걸이형 도킹 스테이션을 활용하면 청소기의 보관과 충전을 동시에 해결할 수 있습니다. 자리를 많이 차지하지 않는 슬림한 디자인 덕분에 거실 한편이나 베란다 등 자투리 공간에 깔끔하게 거치해 둘 수 있으며, 청소가 필요할 때 언제든 바로 뽑아서 사용할 수 있어 집안일의 동선을 획기적으로 줄여줍니다. 자주 사용하는 툴 2개도 함께 꽂아둘 수 있어 보관의 편의성을 높였습니다.' }
  ],
  outro: '굳이 비싼 최신형 모델을 고집할 필요가 있을까요? 일상적인 실내 청소에 꼭 필요한 압도적인 흡입력, 쾌적한 미세먼지 차단 필터, 그리고 다양한 툴을 통한 높은 활용도까지! 꼭 필요한 핵심 기능들만 알차게 담아내면서 가격의 거품은 쏙 뺀 **다이슨 V8 플러피 무선 청소기**는 가장 합리적이고 스마트한 선택이 될 것입니다. 다이슨만의 프리미엄 청소 경험을 가장 부담 없이 시작해 볼 수 있는 절호의 기회를 지금 만나보시길 강력하게 권해드립니다.',
  summary: '강력한 가성비 무선 청소기 추천! 다이슨 V8 플러피 장단점 분석'
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
  if (row['폴더이름'] === '다이슨 V8 플러피 무선 청소기') {
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
