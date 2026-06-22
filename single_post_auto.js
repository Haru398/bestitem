const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-domestic-iceberg-lettuce',
  category: '식품',
  title: '아삭아삭 신선한 국내산 양상추 1통 샐러드 보관법 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\국내산 양상추, 1통, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\국내산 양상추, 1통, 1개',
  link: 'https://link.coupang.com/a/eM9RawnUTQ',
  iframe: '<iframe src="https://coupa.ng/cnz7h9" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.png'],
  intro: '건강한 라이프스타일을 추구하는 현대인들에게 신선한 채소 섭취는 선택이 아닌 필수입니다. 그중에서도 풍부한 수분감과 특유의 아삭한 식감으로 샐러드부터 샌드위치까지 어디에나 빠지지 않는 감초 역할을 하는 채소가 있죠. 하지만 마트에서 샀을 때 잎이 시들어 있거나 속이 텅 비어 실망한 적이 한두 번이 아니시라고요? 그렇다면 밭에서 갓 따온 듯한 생생한 프레시함을 그대로 식탁 위까지 전달해 주는 **신선한 국내산 양상추 1통**을 주목해 주세요.\n\n양상추는 수분 함량이 무려 95%에 달해 칼로리가 매우 낮으면서도 포만감을 주어 다이어터들의 평생 동반자로 불립니다. 게다가 비타민C와 무기질이 풍부하여 피로 회복과 피부 미용에도 탁월한 효능을 지니고 있습니다. 매일 아침 우리 가족의 건강을 책임질 싱그러움의 결정체, 믿고 먹을 수 있는 100% 국내산 양상추의 압도적인 신선도와 200% 활용하는 꿀팁을 지금부터 낱낱이 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 양상추의 가장 큰 자랑거리는 까다로운 검수 과정을 거친 \'100% 최상급 국내산\'이라는 점입니다. 수입산 채소들이 긴 유통 과정을 거치며 신선도를 잃는 것과 달리, 우리 땅에서 맑은 물과 건강한 토양을 머금고 자라 수확 직후 가장 신선한 상태로 빠르게 배송됩니다. 포장을 뜯자마자 느껴지는 흙 내음과 싱그러운 푸른빛은 식재료에 대한 신뢰감을 팍팍 심어줍니다.' },
    { img: '2.jpg', text: '겉잎만 크고 속은 텅 빈 불량 양상추와는 차원이 다릅니다. 한 손으로 들었을 때 묵직함이 느껴질 정도로 속이 꽉 찬 결구를 자랑하며, 칼로 반을 가르는 순간 특유의 \'아삭!\'하는 경쾌한 소리와 함께 겹겹이 꽉 들어찬 뽀얀 속잎을 드러냅니다. 수분을 가득 머금고 있어 씹을수록 기분 좋은 청량감과 채소 본연의 은은한 단맛이 입안 가득 퍼지며 어떤 드레싱과도 완벽한 조화를 이룹니다.' },
    { img: '3.png', text: '양상추의 생명은 \'보관\'에 있습니다. 먹다 남은 양상추는 심지를 제거하고 그 자리에 물에 적신 키친타월을 채워 넣은 뒤 랩으로 꽁꽁 싸서 밀폐용기에 보관해 보세요. 이 간단한 방법 하나면 일주일이 지나도 방금 수확한 것처럼 잎 끝이 살아있는 신선함을 유지할 수 있습니다. 닭가슴살을 찢어 올린 다이어트 샐러드, 식빵 사이에 듬뿍 넣은 샌드위치, 고기와 함께 즐기는 쌈 채소 등 냉장고에 한 통만 있어도 든든한 만능 식재료입니다.' }
  ],
  outro: '매일 아침 피곤하고 무거운 몸을 깨우는 가장 쉽고 맛있는 방법은 바로 그릇 한가득 담아낸 신선한 샐러드 한 접시입니다. 밭에서 갓 수확한 싱그러운 에너지를 그대로 머금은 **신선한 국내산 양상추 1통**으로 지친 일상에 건강한 활력을 불어넣어 보세요. 속이 꽉 차고 아삭한 식감이 일품인 최고 품질의 양상추를 편안하게 집에서 받아보고 싶으시다면, 지금 바로 장바구니에 담으시길 강력하게 추천합니다!',
  summary: '아삭아삭 신선한 국내산 양상추 1통 샐러드 보관법 리뷰'
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
  if (row['폴더이름'] === '국내산 양상추, 1통, 1개') {
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
