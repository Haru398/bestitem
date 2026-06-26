const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-golden-ratio-rice',
  category: '식품',
  title: '유명 맛집 밥맛의 비밀! 정미소김씨 황금비율 프리미엄 쌀 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\[25년산]황금비율쌀 - 맛집들이 인정한 쌀! 완벽한 균형! 프리미엄 블렌딩쌀! 정미소김씨 상등급 GAP인증시설 도정!',
  backupDir: 'D:\\정식서버업로드전용폴더\\[25년산]황금비율쌀 - 맛집들이 인정한 쌀! 완벽한 균형! 프리미엄 블렌딩쌀! 정미소김씨 상등급 GAP인증시설 도정!',
  link: 'https://link.coupang.com/a/eNLR7YXU04',
  iframe: '<iframe src="https://coupa.ng/cnAodQ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png'],
  intro: '식당에서 밥을 먹다 보면 유난히 윤기가 촤르르 흐르고 찰진 밥맛에 감탄한 적이 있으실 겁니다. 똑같은 반찬을 먹어도 밥이 맛있으면 그날의 식사는 평소보다 훨씬 만족스럽게 느껴지기 마련인데요. 과연 그 유명한 맛집들은 어떤 특별한 쌀을 사용하는 걸까요? 우리 집 식탁에서도 유명 한정식집 부럽지 않은 훌륭한 밥맛을 재현하고 싶은 분들을 위해, 깐깐한 입맛을 자랑하는 외식업계 사장님들의 비밀 무기로 통하는 **정미소김씨 황금비율 프리미엄 블렌딩 쌀**을 집중적으로 파헤쳐 보겠습니다.\n\n이 쌀은 단일 품종의 아쉬운 점을 완벽하게 보완하기 위해 쌀 전문가들이 수많은 테스트를 거쳐 찾아낸 최적의 배합 비율로 탄생했습니다. 갓 도정한 25년산 햅쌀의 신선함과 상등급 품질이 만나 어떤 요리와도 환상적인 궁합을 자랑하는 황금비율 블렌딩 쌀만의 독보적인 맛과 풍미의 비결을 자세하게 분석해 드리겠습니다.',
  sections: [
    { img: '1.png', text: '이 제품의 핵심 경쟁력은 바로 \'완벽한 균형을 자랑하는 블렌딩 기술\'에 있습니다. 찰기가 뛰어난 품종과 고소한 단맛을 지닌 품종 등 각기 다른 쌀의 장점만을 추출하여 황금 비율로 배합했습니다. 덕분에 밥을 지었을 때 너무 질거나 퍽퍽하지 않고, 한국인이 가장 선호하는 쫀득한 식감과 씹을수록 배어 나오는 은은한 단맛의 밸런스를 완벽하게 맞춰냅니다. 밥맛에 예민한 미식가들의 입맛까지 사로잡는 비결이 바로 이 배합 기술입니다.' },
    { img: '2.png', text: '품질에 대한 신뢰도 역시 타의 추종을 불허합니다. 농산물 우수관리 인증인 GAP 시설에서 엄격하고 위생적인 공정을 거쳐 도정된 상등급 쌀만을 고집합니다. 밥을 지었을 때 눈으로 먼저 확인되는 맑고 투명한 쌀알의 자태는 상등급 쌀만의 특권이며, 잡질이나 부서진 쌀알이 거의 없어 밥의 윤기를 한층 더 돋보이게 만들어 줍니다. 우리 가족이 매일 먹는 주식인 만큼 안전하고 깨끗한 품질은 기본 중의 기본입니다.' },
    { img: '3.png', text: '언제 주문하더라도 항상 신선한 밥맛을 유지할 수 있도록 \'주문 당일 도정 시스템\'을 원칙으로 하고 있습니다. 쌀은 도정되는 순간부터 공기와 접촉하여 서서히 산화가 진행되고 수분이 증발하기 때문에, 갓 도정한 쌀일수록 밥맛이 뛰어난 것은 당연한 이치입니다. 정미소김씨는 가장 맛있는 상태의 쌀을 식탁까지 안전하게 전달하기 위해 철저한 재고 관리와 당일 도정 발송 시스템을 고수하며 햅쌀의 풍미를 지켜내고 있습니다.' },
    { img: '4.png', text: '어떤 요리와 곁들여도 훌륭한 조화를 이루는 범용성 또한 매력적입니다. 흰쌀밥 그대로 김치 하나만 얹어 먹어도 꿀맛일 뿐만 아니라, 비빔밥, 볶음밥, 덮밥 등 다양한 레시피에 활용했을 때 각 재료의 맛을 해치지 않고 든든하게 받쳐주는 베이스 역할을 완벽하게 수행합니다. 매일 먹어도 질리지 않는 찰진 식감 덕분에 평범했던 집밥의 퀄리티를 수직 상승시켜 주는 마법 같은 식재료라 할 수 있습니다.' }
  ],
  outro: '매일 세 번 마주하는 일상적인 식탁의 품격을 결정짓는 것은 결국 기본 중의 기본인 \'밥맛\'입니다. 단일 품종의 한계를 뛰어넘어 최적의 찰기와 단맛, 윤기를 찾아낸 **정미소김씨 황금비율 프리미엄 블렌딩 쌀**과 함께라면 우리 집 식탁도 맛집으로 변신할 수 있습니다. GAP 인증 시설에서 당일 도정한 상등급 25년산 햅쌀의 신선하고 깊은 풍미를 통해, 사랑하는 가족들과 함께 따뜻하고 맛있는 한 끼의 행복을 만끽해 보시길 바랍니다.',
  summary: '유명 맛집 밥맛의 비밀! 정미소김씨 황금비율 프리미엄 쌀 분석'
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
  if (row['폴더이름'] === '[25년산]황금비율쌀 - 맛집들이 인정한 쌀! 완벽한 균형! 프리미엄 블렌딩쌀! 정미소김씨 상등급 GAP인증시설 도정!') {
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
