const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-gomgom-ham-fried-rice',
  category: '식품',
  title: '바쁜 아침 5분 만에 완성하는 든든한 한 끼 곰곰 냉동 햄야채 볶음밥 영양 성분 및 초간단 조리법 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\곰곰 햄야채 볶음밥 (냉동), 300g, 6개',
  backupDir: 'D:\\정식서버업로드전용폴더\\곰곰 햄야채 볶음밥 (냉동), 300g, 6개',
  link: 'https://link.coupang.com/a/eTGMnm8jvg',
  iframe: '<iframe src="https://coupa.ng/cnFsjJ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.jpg', '4.jpg'],
  intro: '1분 1초가 아쉬운 바쁜 출근길 아침이나 녹초가 되어 돌아온 늦은 저녁, 배는 고프지만 요리할 기력조차 없을 때 냉동실 문을 열고 가장 먼저 찾게 되는 구원 투수가 있습니다. 배달 음식을 기다리는 시간보다 훨씬 빠르고, 라면보다 훨씬 든든하며, 무엇보다 식비 절약에 탁월한 효과를 보여주는 가성비 끝판왕 식사 대용품, 바로 **곰곰 햄야채 볶음밥**입니다.\n\n이 제품은 갓 지은 밥처럼 고슬고슬한 밥알에 남녀노소 누구나 좋아하는 짭조름한 스모크 햄과 다양한 채소를 듬뿍 담아내어, 전자레인지나 프라이팬에 데우기만 하면 중국집 볶음밥 부럽지 않은 훌륭한 한 끼를 완성해 줍니다. 1인 가구의 쟁여템이자 육아맘들의 비상식량으로 사랑받는 곰곰 햄야채 볶음밥의 알찬 구성과 영양 성분, 그리고 맛있게 조리하는 초간단 꿀팁을 객관적인 시각에서 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '볶음밥의 생명은 질척이지 않고 밥알 하나하나가 살아있는 고슬고슬한 식감에 있습니다. 이 제품은 -40도 이하에서 빠르게 급속 동결하는 개별 급속 냉동(IQF) 공법을 적용하여, 밥알끼리 뭉치거나 수분이 빠져나가는 현상을 완벽하게 방지했습니다. 덕분에 해동 후 조리 시에도 방금 프라이팬에서 갓 볶아낸 듯한 수분감과 찰기를 그대로 유지하며, 입안에서 기분 좋게 흩어지는 정통 볶음밥의 식감을 생생하게 구현해 냅니다.' },
    { img: '2.png', text: '풍성한 재료 구성과 최적의 영양 밸런스가 이 제품의 가장 큰 차별점입니다. 값싼 재료로 대충 양만 채운 것이 아니라, 국내산 쌀을 베이스로 하여 돼지고기 함량이 높은 짭조름한 스모크 햄, 달콤한 스위트콘, 당근, 양파, 대파, 피망 등 6가지 이상의 다채로운 야채가 아낌없이 들어가 있습니다. 햄의 감칠맛과 야채의 아삭한 식감이 완벽한 조화를 이루며, 탄수화물과 단백질, 비타민을 한 번에 섭취할 수 있어 영양적인 측면에서도 훌륭합니다.' },
    { img: '3.jpg', text: '바쁜 현대인들에게 가장 매력적인 요소는 바로 \'초간단 조리 편의성\'입니다. 복잡한 해동 과정 없이 냉동 상태 그대로 전자레인지 전용 용기에 담아 약 4분(700W 기준)만 돌려주면 즉시 따뜻한 식사가 완성됩니다. 조금 더 풍미를 끌어올리고 싶다면, 달궈진 프라이팬에 식용유를 살짝 두르고 중불에서 약 3~4분간 볶아주면 됩니다. 프라이팬 조리 시 바닥에 살짝 눌은 누룽지 맛까지 더해져 한층 더 깊은 불맛을 즐길 수 있습니다.' },
    { img: '4.jpg', text: '1인분에 300g이라는 넉넉하고 든든한 용량 설계 또한 주목할 만합니다. 시중에 판매되는 일반 냉동 볶음밥들이 보통 200~250g 수준으로 성인 남성이 먹기엔 다소 부족한 감이 있는 반면, 곰곰 햄야채 볶음밥은 한 봉지만으로도 포만감을 느낄 수 있는 푸짐한 양을 자랑합니다. 여기에 계란 후라이를 하나 얹거나 케첩을 살짝 곁들이면 맛의 디테일이 살아나며, 총 6팩 세트 구성으로 냉동실에 채워두면 한 달 내내 든든합니다.' }
  ],
  outro: '매일 반복되는 식사 준비의 스트레스에서 벗어나고 싶다면 냉동실 한편에 반드시 구비해 두어야 할 완벽한 비상식량입니다. 밥하기 귀찮은 주말 점심, 출출한 밤 야식, 혹은 아이들 학원 가기 전 간식으로 그야말로 만능 엔터테이너 역할을 톡톡히 해냅니다. 합리적인 가격에 맛과 영양, 그리고 압도적인 조리 편의성까지 모두 잡은 **곰곰 냉동 햄야채 볶음밥**으로 여러분의 소중한 시간과 식비를 동시에 절약해 보시길 적극 권장합니다.',
  summary: '바쁜 아침 5분 만에 완성하는 든든한 한 끼 곰곰 냉동 햄야채 볶음밥 영양 성분 및 초간단 조리법 분석'
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
  if (row['폴더이름'] === '곰곰 햄야채 볶음밥 (냉동), 300g, 6개') {
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
