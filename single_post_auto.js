const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-maeil-soymilk-highprotein',
  category: '건강식품',
  title: '설탕 무첨가 식물성 단백질! 매일두유 고단백 플레인 190ml 성분 및 효능 추천',
  sourceDir: 'D:\\정식홈페이지자동화\\매일두유 고단백 플레인 두유, 190ml, 24개',
  backupDir: 'D:\\정식서버업로드전용폴더\\매일두유 고단백 플레인 두유, 190ml, 24개',
  link: 'https://link.coupang.com/a/eM73ULGoqy',
  iframe: '<iframe src="https://coupa.ng/cnz57c" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '바쁜 현대인들에게 가장 부족하기 쉬운 영양소가 바로 단백질입니다. 건강과 다이어트를 위해 단백질 보충의 필요성은 누구나 공감하지만, 매번 닭가슴살을 챙겨 먹거나 달고 느끼한 단백질 파우더를 물에 타 먹는 것은 생각보다 번거롭고 쉽게 물리기 마련입니다. 유당 불내증으로 우유조차 편하게 마시지 못하는 분들이라면 더욱 난감하셨을 텐데요. 이러한 고민을 단번에 해결해 줄 완벽한 솔루션, 대한민국 두유 1등 브랜드 매일유업에서 야심 차게 선보인 식물성 단백질의 결정체 **매일두유 고단백 플레인**을 자신 있게 추천합니다.\n\n이 제품은 단순히 맛으로 먹는 일반 두유가 아닙니다. 깐깐하게 엄선된 콩에서 추출한 순도 높은 식물성 단백질을 꽉꽉 채워 넣은 것은 물론, 다이어터들의 평생 숙제인 \'당류\'를 파격적으로 덜어내어 건강함의 본질에 가장 완벽하게 다가선 제품입니다. 아침 식사 대용, 운동 전후의 근육 회복, 그리고 출출한 오후의 건강한 영양 간식까지 우리의 일상을 든든하게 채워줄 매일두유 고단백 플레인의 놀라운 영양 성분과 핵심 효능을 지금부터 아주 상세하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 주목해야 할 핵심 스펙은 바로 압도적인 단백질 함량입니다. 시중에 판매되는 일반적인 두유의 단백질 함량이 1팩당 5~6g에 그치는 반면, 매일두유 고단백 플레인은 무려 달걀 2개 분량에 달하는 12g의 100% 식물성 단백질을 190ml 한 팩에 고스란히 담아냈습니다. 식물성 단백질은 동물성 단백질에 비해 지방과 콜레스테롤의 부담이 적어 평소 육류 섭취가 많은 현대인들의 영양 밸런스를 완벽하게 맞춰주는 핵심적인 역할을 수행합니다.' },
    { img: '2.jpg', text: '단백질 음료를 선택할 때 함량만큼이나 꼼꼼하게 따져보아야 할 것이 바로 \'당류\'입니다. 단맛을 내기 위해 설탕과 액상과당을 듬뿍 넣은 무늬만 다이어트 음료들이 넘쳐나는 가운데, 이 제품은 설탕 무첨가 원칙을 고수하여 당류에 대한 걱정을 원천 차단했습니다. 혈당 스파이크에 예민하신 분들이나 체중 감량을 목표로 엄격한 식단 관리를 하시는 다이어터분들도 하루에 여러 팩을 마셔도 전혀 죄책감을 느낄 필요가 없는 완벽한 무가당 음료입니다.' },
    { img: '3.jpg', text: '건강을 위해 맛을 포기해야 한다는 편견을 확실하게 깨부쉈습니다. 설탕이 들어가지 않아 자칫 밍밍하거나 비릿할 수 있는 콩 특유의 냄새를 매일유업만의 독자적인 탈취 공법으로 완벽하게 잡아냈습니다. 한 모금 마시는 순간 입안 가득 퍼지는 고소하고 진한 콩 본연의 풍미는 마치 진하게 내린 고급 두유를 마시는 듯한 착각을 불러일으킬 정도로 훌륭하며, 질리지 않는 깔끔하고 담백한 맛을 자랑합니다.' },
    { img: '4.jpg', text: '우유를 마시면 배가 꾸르륵거리고 가스가 차는 \'유당불내증\'을 앓고 계신 분들에게 이 제품은 한 줄기 빛과도 같습니다. 100% 식물성 원료인 대두만을 베이스로 사용하여 유당이 전혀 포함되어 있지 않기 때문에, 평소 우유 소화가 힘드셨던 분들도 속 편안하게 양질의 단백질을 섭취할 수 있습니다. 든든한 포만감 덕분에 바쁜 아침 출근길이나 등굣길에 공복을 달래주는 식사 대용으로도 전혀 손색이 없습니다.' },
    { img: '5.jpg', text: '매일 마시는 음료인 만큼 보관과 휴대의 편의성 또한 매우 중요합니다. 햇빛과 외부 공기를 완벽하게 차단해 주는 6겹의 멸균 테트라팩 포장 기술을 적용하여 방부제 없이도 실온에서 안전하고 장기적인 보관이 가능합니다. 슬림하고 콤팩트한 190ml 사이즈로 가방이나 주머니에 쏙 들어가, 헬스장, 회사, 캠핑장 등 언제 어디서나 간편하게 꺼내어 신선한 식물성 에너지를 즉각적으로 충전할 수 있습니다.' }
  ],
  outro: '건강 관리는 거창한 것이 아니라 매일 먹고 마시는 작은 습관에서부터 시작됩니다. 불필요한 당류는 덜어내고 꼭 필요한 식물성 단백질만을 꽉 채운 매일두유 고단백 플레인은 여러분의 건강한 라이프스타일을 위한 가장 든든한 조력자가 되어줄 것입니다. 까다로운 입맛과 엄격한 영양 기준을 모두 만족시키는 **매일두유 고단백 플레인 190ml**, 지금 바로 냉장고 한편에 든든하게 쟁여두시고 가족 모두의 건강한 내일을 위한 활기찬 하루를 시작해 보세요!',
  summary: '설탕 무첨가 식물성 단백질! 매일두유 고단백 플레인 190ml 효능 및 성분 추천'
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
  if (row['폴더이름'] === '매일두유 고단백 플레인 두유, 190ml, 24개') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
