const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-narangd-cider-zero-245ml-30ea',
  category: '식품',
  title: '칼로리 제로! 톡 쏘는 탄산의 정석 나랑드사이다 제로 245ml 후기',
  sourceDir: 'D:\\정식홈페이지자동화\\나랑드사이다 제로, 245ml, 30개',
  backupDir: 'D:\\정식서버업로드전용폴더\\나랑드사이다 제로, 245ml, 30개',
  link: 'https://link.coupang.com/a/e7KRNvYE1s',
  iframe: '<iframe src="https://coupa.ng/cnPwu9" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '최근 건강과 다이어트에 대한 관심이 높아지면서, 식음료 시장에서 \'제로 칼로리\' 열풍이 그 어느 때보다 뜨겁습니다. 햄버거나 치킨, 피자 같은 기름진 배달 음식을 먹을 때 톡 쏘는 탄산음료의 유혹을 뿌리치기란 쉽지 않습니다. 이럴 때 죄책감 없이 짜릿한 탄산의 청량감을 그대로 즐길 수 있는 최고의 대안이 바로 \'나랑드사이다 제로\'입니다. 설탕, 칼로리, 색소, 보존료까지 무려 4가지를 완전히 빼버린 깔끔한 성분과, 한 번에 마시기 딱 좋은 245ml 캔 30개입 대용량 구성의 장점을 자세히 파헤쳐 보겠습니다. 다이어터 유지어터라면 절대 놓칠 수 없는 꿀템입니다.',
  sections: [
    { img: '1.jpg', text: '4 ZERO 시스템! 칼로리, 설탕, 색소, 보존료 전면 무첨가: 나랑드사이다 제로가 오랜 시간 사랑받는 가장 큰 이유는 단순히 칼로리만 낮은 것이 아니라 건강에 해로운 요소들을 완벽하게 배제한 \'4 ZERO\' 원칙 때문입니다. 혈당을 급격하게 올리는 설탕을 쏙 빼고 체내에 흡수되지 않는 대체 당을 사용하여 0kcal를 구현해 냈으며, 인공 색소나 보존료조차 단 한 방울도 들어가지 않았습니다. 혈당 관리로 인해 식단에 각별히 신경 써야 하는 당뇨 환자분들이나, 식후 치솟는 혈당 스파이크가 두려운 365일 다이어터들도 물 대신 마음 편히 마실 수 있는 진정한 의미의 \'건강한 탄산음료\'입니다.' },
    { img: '2.jpg', text: '레몬 농축액이 선사하는 깔끔하고 청량한 뒷맛: 기존의 제로 음료 특유의 인공적이고 텁텁한 뒷맛을 싫어하는 분들이 꽤 많습니다. 하지만 나랑드사이다는 상큼한 레몬 농축액을 첨가하여 사이다 본연의 맑고 깔끔한 맛을 완벽하게 재현했습니다. 한 모금 마시면 입안을 강하게 때리는 짜릿한 탄산과 함께 은은한 레몬 향이 퍼지면서 갈증이 순식간에 해소됩니다. 기름진 삼겹살이나 매콤한 떡볶이 등 자극적인 배달 음식에 곁들여 마시면 입안의 텁텁함을 싹 씻어내어 완벽한 밸런스를 맞춰주며, 과일청을 섞어 에이드로 만들어 먹기에도 가장 훌륭한 베이스 음료입니다.' },
    { img: null, text: '탄산이 빠지기 전 딱 끝내는 최적의 용량 245ml: 커다란 1.5L 페트병 사이다를 사두면, 처음 한 잔만 톡 쏘고 나중에는 김이 다 빠져 설탕물처럼 변해버려 결국 버리게 되는 경우가 허다합니다. 이 제품은 한 손에 쏙 들어오는 귀여운 245ml 미니 캔 사이즈로, 탄산이 빠지기 전 한 번에 원샷으로 비워내기에 가장 완벽한 황금 용량입니다. 식사할 때 1인당 딱 1캔씩 꺼내 먹으면 남길 일이 없어 위생적이고 탄산의 강렬한 짜릿함을 매번 100% 신선하게 즐길 수 있습니다. 미니 사이즈라 냉장고 구석 공간에 쟁여두기도 아주 수월합니다.' },
    { img: null, text: '30캔 대용량 쟁여두기! 매일 마셔도 부담 없는 가성비: 제로 음료를 편의점에서 매번 낱개로 구매하면 그 비용도 만만치 않습니다. 245ml 캔이 무려 30개나 꽉꽉 들어찬 이 대용량 박스는 오프라인 마트보다 훨씬 저렴한 온라인 최저가 수준의 압도적인 가성비를 자랑합니다. 펜트리나 베란다 서늘한 곳에 한 박스 든든하게 쟁여두고, 퇴근 후 샤워를 마친 뒤나 한여름 갈증이 밀려올 때마다 시원하게 냉장된 캔을 하나씩 꺼내 먹는 소소한 행복을 누려보세요. 손님 대접용이나 홈 파티용 음료로도 손색이 없습니다.' }
  ],
  outro: '나랑드사이다 제로 245ml 30캔 세트는 다이어트와 탄산음료의 즐거움을 동시에 잡고 싶은 분들에게 주저 없이 추천하는 궁극의 치트키입니다. 0칼로리의 가벼움에 청량한 레몬 맛이 더해져 어떤 음식과도 찰떡궁합을 자랑하며, 한 번에 비우기 좋은 미니 사이즈라 김빠질 걱정도 전혀 없습니다. 한여름 냉장고 안을 가장 든든하게 채워줄 나랑드사이다 한 박스로, 칼로리 스트레스 없이 매일매일 시원하고 톡 쏘는 상쾌함을 만끽하시길 바랍니다.',
  summary: '칼로리 제로! 톡 쏘는 탄산의 정석 나랑드사이다 제로 245ml 후기'
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

let imgIdx = 0;
for (let i = 0; i < product.sections.length; i++) {
  const sec = product.sections[i];
  if (sec.img) {
    const imagePath = additionalImageUrls[imgIdx++];
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
