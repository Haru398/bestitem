const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-samyang-carbo-buldak',
  category: '식품',
  title: '매운맛 꿀조합! 삼양 까르보 불닭볶음면 105g 칼로리 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\불닭볶음면 까르보 큰컵 105g, 4개',
  backupDir: 'D:\\정식서버업로드전용폴더\\불닭볶음면 까르보 큰컵 105g, 4개',
  link: 'https://link.coupang.com/a/eM9segbOcm',
  iframe: '<iframe src="https://coupa.ng/cnz62A" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png'],
  intro: '스트레스받는 날엔 어김없이 매운 음식이 당기지만, 너무 자극적이기만 한 매운맛은 위장에 부담이 되고 다음 날 고생하기 일쑤입니다. 매콤함과 부드러움, 이 두 가지 상반된 매력을 동시에 충족시킬 수 있는 완벽한 메뉴가 없을까요? 오리지널 불닭볶음면의 폭발적인 매운맛은 살짝 중화시키면서, 진하고 고소한 크림의 풍미를 듬뿍 더해 이른바 \'맵찔이\'들도 눈물 콧물 없이 맛있게 즐길 수 있는 전설의 레시피! 바로 **삼양 까르보 불닭볶음면 큰컵 105g**입니다.\n\n출시 직후부터 품절 대란을 일으키며 수많은 유튜버와 인플루언서들의 먹방 단골 메뉴로 등극한 까르보 불닭은, 뻔한 볶음면 시장에 이탈리안 레스토랑의 고급스러운 터치를 더한 기념비적인 제품입니다. 한 번도 안 먹어본 사람은 있어도 한 번만 먹은 사람은 없다는 압도적인 중독성을 자랑하는 까르보 불닭볶음면만의 헤어 나올 수 없는 마력과, 맛을 200% 끌어올리는 환상의 꿀조합 레시피까지 지금부터 상세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '까르보 불닭이 수많은 경쟁 제품을 제치고 독보적인 사랑을 받는 이유는 바로 \'화끈한 매운맛과 부드러운 크림의 황금 밸런스\'에 있습니다. 오리지널 불닭 소스의 화끈한 감칠맛은 그대로 살리되, 모짜렐라 치즈 분말과 부드러운 크림 분말 스프가 어우러져 매운맛을 포근하게 감싸 안아줍니다. 입에 넣는 순간 고소함이 싹 퍼지고 끝 맛에 기분 좋은 매콤함이 톡 쏘듯 밀려와 질릴 틈 없이 젓가락질을 계속하게 만듭니다.' },
    { img: '2.png', text: '볶음면의 생명은 소스를 한껏 머금어 쫄깃하게 씹히는 면발입니다. 까르보 불닭볶음면은 일반 라면보다 도톰하고 쫄깃한 납작면 스타일의 면발을 채택하여, 꾸덕꾸덕한 크림소스가 면발 사이사이에 완벽하게 코팅됩니다. 덕분에 한 입 가득 후루룩 넘길 때마다 소스와 면이 겉돌지 않고 입안에서 완벽한 조화를 이루며 극강의 식감을 선사합니다.' },
    { img: '3.png', text: '스트링 치즈, 삼각김밥, 비엔나소시지 등 편의점에서 쉽게 구할 수 있는 재료들과 결합하면 그 맛이 배가되는 \'편의점 꿀조합 레시피\'의 절대 강자이기도 합니다. 특히 짭짤한 스트링 치즈를 찢어 올리고 전자레인지에 살짝 돌려주면, 꾸덕한 크림소스에 치즈의 풍미가 더해져 고급 레스토랑의 파스타 부럽지 않은 극강의 JMT(존맛탱) 요리로 재탄생합니다.' },
    { img: '4.png', text: '105g의 넉넉한 중량을 자랑하는 큰컵 사이즈는 야식이나 든든한 한 끼 식사로도 전혀 부족함이 없습니다. 물을 버리고 스프를 비비기만 하면 되는 간편한 조리 방식으로 언제 어디서든 손쉽게 즐길 수 있으며, 4개입 세트 구성으로 넉넉하게 구비해 두면 스트레스받는 날 언제든 나만의 힐링 푸드로 꺼내 먹을 수 있습니다. 핑크빛 화사한 패키지는 시각적인 즐거움까지 더해줍니다.' }
  ],
  outro: '매콤하고 고소한 맛의 끝없는 핑퐁 게임! 우울하거나 짜증 나는 날, 입안 가득 퍼지는 까르보 불닭의 부드러운 화끈함은 당신의 기분을 단숨에 끌어올려 줄 최고의 처방전이 될 것입니다. 한 번 빠지면 절대 헤어 나올 수 없는 마성의 꾸덕함, **삼양 까르보 불닭볶음면 큰컵 105g**을 지금 바로 장바구니에 담아 스트레스 없는 맛있는 하루를 즐겨보세요! 매운맛 초보자들에게도 강력히 추천합니다.',
  summary: '매운맛 꿀조합! 삼양 까르보 불닭볶음면 105g 칼로리 리뷰'
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
  if (row['폴더이름'] === '불닭볶음면 까르보 큰컵 105g, 4개') {
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
