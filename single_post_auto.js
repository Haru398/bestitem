const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-cocacola-zero',
  category: '식품',
  title: '칼로리 부담 없는 짜릿함! 코카콜라 제로 350ml 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\코카콜라 제로, 350ml, 24개',
  backupDir: 'D:\\정식서버업로드전용폴더\\코카콜라 제로, 350ml, 24개',
  link: 'https://link.coupang.com/a/eTErHDmIO4',
  iframe: '<iframe src="https://coupa.ng/cnFqkK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '기름진 음식을 먹을 때나 나른한 오후에 유독 생각나는 톡 쏘는 탄산음료! 하지만 마음껏 마시자니 솟아오르는 칼로리와 엄청난 당분 함량 때문에 머뭇거리신 적 많으실 텐데요. 건강과 체중 관리에 신경 쓰는 현대인들의 이러한 고민을 완벽하게 해결해 줄 구세주, 전 세계가 사랑하는 짜릿한 그 맛 그대로를 유지하면서 칼로리는 쏙 뺀 **코카콜라 제로 350ml**를 소개합니다.\n\n이 제품은 오리지널 코카콜라 특유의 상쾌한 목 넘김과 강렬한 탄산감은 그대로 보존하면서, 설탕을 대체하는 감미료를 사용하여 제로 칼로리와 제로 슈거를 구현해 낸 혁신적인 음료입니다. 다이어트 중에도 죄책감 없이 달콤하고 짜릿한 휴식을 즐길 수 있어 탄산 마니아들의 절대적인 지지를 받고 있는데요. 냉장고에 쟁여두면 든든한 코카콜라 제로만의 압도적인 매력 포인트들을 하나씩 자세히 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '제로 탄산음료의 핵심은 단연 \'오리지널의 맛을 얼마나 완벽하게 구현해 냈는가\'에 있습니다. 코카콜라 제로는 설탕이 들어있지 않음에도 불구하고, 코카콜라 특유의 독보적인 캐러멜 풍미와 짜릿한 탄산의 청량감을 놀라울 정도로 훌륭하게 재현해 냈습니다. 밍밍하거나 인공적인 단맛이 강했던 초기 제로 음료들의 단점을 완벽하게 보완하여, 눈을 감고 마시면 오리지널과 구분하기 힘들 정도로 깊고 풍부한 맛을 선사합니다.' },
    { img: '2.jpg', text: '다이어터나 식단 관리를 하시는 분들에게 가장 환영받는 \'제로 칼로리(0kcal) & 제로 슈거(0g Sugar)\' 스펙을 자랑합니다. 피자, 치킨, 햄버거 등 칼로리가 높은 배달 음식을 먹을 때 곁들여 마셔도 음료로 인한 추가적인 칼로리 섭취가 전혀 없어 죄책감을 덜어줍니다. 당류 섭취에 민감한 분들이나 혈당 관리가 필요하신 분들도 혈당 스파이크 걱정 없이 달콤하고 시원한 탄산의 매력을 마음껏 즐길 수 있습니다.' },
    { img: null, text: '언제 어디서나 가장 맛있게 즐길 수 있는 \'황금 용량 350ml 페트(PET) 디자인\'이 적용되었습니다. 캔 제품의 경우 한 번 따면 다 마셔야 하거나 탄산이 금방 날아가는 단점이 있고, 1.5L 대용량은 혼자 마시기엔 양이 너무 많아 냉장고에 보관하다 김이 빠져버리기 일쑤인데요. 350ml 용량은 뚜껑을 닫아 탄산을 보존할 수 있으면서도, 한두 번에 가장 신선하고 맛있게 비워낼 수 있어 최적의 만족감을 제공합니다.' },
    { img: null, text: '가장 합리적인 소비를 위한 \'24개입 대용량 박스 구성\'으로 뛰어난 가성비를 자랑합니다. 무거운 음료수를 마트에서 낑낑대며 들고 올 필요 없이 현관문 앞까지 편안하게 배송받을 수 있으며, 낱개로 편의점에서 구매할 때보다 훨씬 저렴한 가격에 냉장고를 든든하게 채울 수 있습니다. 손님맞이용, 캠핑이나 야외 나들이용, 혹은 사무실 탕비실용 등 다양한 목적으로 활용하기 좋은 최고의 구성입니다.' }
  ],
  outro: '탄산음료는 마시고 싶지만 칼로리가 걱정되어 망설이셨던 날들은 이제 안녕입니다. 오리지널 코카콜라의 대체 불가한 짜릿함과 톡 쏘는 상쾌함을 그대로 유지하면서, 칼로리와 당분은 과감하게 덜어낸 **코카콜라 제로 350ml**! 맛있는 음식과 함께할 때, 혹은 스트레스를 시원하게 날려버리고 싶을 때 망설임 없이 선택할 수 있는 최고의 리프레시 음료로 여러분의 일상에 가벼운 활력을 더해보시길 강력히 추천합니다.',
  summary: '칼로리 걱정 없는 짜릿함! 코카콜라 제로 350ml 완벽 분석'
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
  if (row['폴더이름'] === '코카콜라 제로, 350ml, 24개') {
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
