const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-gomgom-frozen-blueberry',
  category: '식품',
  title: '슈퍼푸드를 매일 식탁에, 곰곰 냉동 블루베리 1kg 세척법 및 영양 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\곰곰 냉동 블루베리, 1kg, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\곰곰 냉동 블루베리, 1kg, 1개',
  link: 'https://link.coupang.com/a/e6013CxNyS',
  iframe: '<iframe src="https://coupa.ng/cnPgyK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '현대인의 건강을 위협하는 각종 산화 스트레스와 노화로부터 우리 몸을 보호해 주는 항산화 식품에 대한 관심이 높아지고 있습니다. 미국 타임지가 선정한 세계 10대 슈퍼푸드 중 하나인 블루베리는 풍부한 안토시아닌과 비타민을 함유하여 시력 보호와 노화 방지에 탁월한 효능을 자랑합니다. 하지만 생블루베리는 보관 기간이 짧고 가격이 비싸 매일 챙겨 먹기에는 부담스러운 것이 사실입니다. 이에 대한 완벽한 대안으로, 갓 수확한 신선함을 그대로 얼려 보관의 편의성과 가성비를 모두 잡은 \'곰곰 냉동 블루베리 1kg\'가 큰 인기를 얻고 있습니다. 생과 못지않은 영양소 보존율과 다양한 활용법을 꼼꼼하게 파헤쳐 봅니다.',
  sections: [
    { img: '2.jpg', text: '안토시아닌이 풍부한 강력한 항산화 작용: 블루베리가 진한 보랏빛을 띠는 이유는 \'안토시아닌\'이라는 강력한 항산화 물질 때문입니다. 이 성분은 체내에 쌓인 활성산소를 제거하여 세포의 노화를 막고 뇌 기능 향상에 도움을 줍니다. 놀라운 사실은 블루베리를 냉동 보관할 경우 생과일 때보다 항산화 물질의 농도가 더욱 짙어지고 체내 흡수율이 높아진다는 연구 결과가 있다는 점입니다. 곰곰 냉동 블루베리는 수확 직후 급속 냉각 방식을 채택하여 이러한 영양소 파괴를 최소화하고 신선도를 최상으로 유지했습니다.' },
    { img: '3.jpg', text: '눈 건강과 면역력 증진을 위한 데일리 필수템: 장시간 스마트폰이나 컴퓨터 모니터를 들여다보는 현대인들은 안구 건조증과 시력 저하에 쉽게 노출됩니다. 블루베리에 다량 함유된 루테인과 비타민A 성분은 망막의 로돕신 재합성을 촉진하여 눈의 피로를 풀어주고 시력을 보호하는 데 탁월한 효과를 발휘합니다. 또한 식이섬유와 비타민C, 비타민E가 풍부하게 들어있어 환절기 면역력 저하를 예방하고 장 건강을 개선하여 변비 예방에도 긍정적인 도움을 줍니다.' },
    { img: '4.jpg', text: '흐르는 물에 가볍게 씻어 먹는 간편한 세척법: 냉동 과일을 섭취할 때 가장 많이 헷갈려 하시는 부분이 바로 세척 여부입니다. 곰곰 냉동 블루베리는 위생적인 공정을 거쳐 포장되지만, 섭취 전 체에 밭쳐 흐르는 미온수나 찬물에 10초 내외로 가볍게 헹구어 드시는 것을 권장합니다. 너무 오랫동안 물에 담가두면 수용성 색소인 안토시아닌과 단맛이 빠져나갈 수 있으므로 표면의 먼지나 살얼음만 살짝 씻어낸다는 느낌으로 세척하는 것이 가장 좋습니다.' },
    { img: '5.jpg', text: '스무디부터 베이킹까지 무궁무진한 레시피 활용법: 냉동 상태 그대로 우유나 요거트, 바나나 등과 함께 믹서기에 갈아 마시면 든든한 아침 식사 대용 스무디가 완성됩니다. 샐러드 위에 토핑으로 얹어 상큼함을 더하거나, 살짝 녹여 팬케이크, 와플, 시리얼과 함께 즐기면 훌륭한 브런치 메뉴가 됩니다. 또한 잼을 만들거나 베이킹 재료로 활용하기에도 손색이 없어, 1kg의 넉넉한 대용량 한 팩만 있으면 온 가족이 다양하고 맛있는 방법으로 슈퍼푸드의 영양을 매일 섭취할 수 있습니다.' }
  ],
  outro: '곰곰 냉동 블루베리 1kg은 바쁜 일상 속에서 과일을 챙겨 먹기 힘든 1인 가구나, 아이들의 건강한 간식을 고민하는 부모님들에게 최고의 선택지가 될 수 있습니다. 매일 아침 눈을 맑게 하고 몸을 가볍게 만들어주는 맛있는 블루베리 습관, 가성비와 품질이 검증된 곰곰 냉동 블루베리와 함께 시작해 보시는 것은 어떨까요? 냉동실에 넉넉히 쟁여두고 언제든 꺼내 먹을 수 있는 든든한 건강 비결을 직접 경험해 보시길 추천합니다.',
  summary: '슈퍼푸드를 매일 식탁에, 곰곰 냉동 블루베리 1kg 세척법 및 영양 성분 분석'
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
