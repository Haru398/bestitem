const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-bibigo-wang-gyoza',
  category: '식품',
  title: '냉동 만두의 기준을 바꾼 비비고 왕교자 1.715kg 맛의 비결 및 조리법 총정리',
  sourceDir: 'D:\\정식홈페이지자동화\\비비고 왕교자 (냉동), 1.715kg, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\비비고 왕교자 (냉동), 1.715kg, 1개',
  link: 'https://link.coupang.com/a/e608icw38S',
  iframe: '<iframe src="https://coupa.ng/cnPgC2" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '냉동실 문을 열었을 때 없으면 섭섭한 한국인의 소울푸드이자 든든한 비상식량, 바로 냉동 만두입니다. 수많은 브랜드가 치열하게 경쟁하는 냉동식품 시장에서 압도적인 시장 점유율 1위를 굳건히 지키며 \'만두의 대명사\'로 불리는 제품이 있습니다. 바로 CJ제일제당의 \'비비고 왕교자\'입니다. 출시 이후 누적 판매량 기록을 갈아치우며 해외에서도 K-푸드 열풍을 선도하고 있는 비비고 왕교자 1.715kg 대용량 제품의 독보적인 식감의 비밀, 신선한 재료 원칙, 그리고 에어프라이어부터 찜기까지 200% 맛있게 즐길 수 있는 다양한 조리법을 상세히 분석해 드립니다.',
  sections: [
    { img: '1.jpg', text: '전통 궁중 만두의 비법을 현대적으로 재해석: \'왕교자\'라는 이름은 조선시대 왕의 수라상에 오르던 귀한 음식인 \'미만두(해삼 모양의 만두)\'에서 영감을 받아 탄생했습니다. 전통적인 궁중 만두의 우아한 물결무늬 빚음새를 그대로 구현하여 찌거나 구웠을 때 만두피와 소의 비율이 가장 완벽하게 어우러지도록 설계되었습니다. 단순한 인스턴트식품이 아니라 한식의 정성과 철학을 담아낸 프리미엄 만두의 기준을 제시합니다.' },
    { img: '2.jpg', text: '육즙을 가득 가둔 고기 다이싱(Dicing) 공법: 일반적인 냉동 만두들이 원가를 낮추기 위해 돼지고기를 잘게 갈아서 사용하는 반면, 비비고 왕교자는 돼지고기를 큼직하게 썰어 넣는 다이싱(Dicing) 공법을 고집합니다. 이 공법 덕분에 만두를 한 입 베어 물었을 때 고기 본연의 풍부한 육즙이 입안 가득 터지며, 갈아 만든 고기에서는 결코 느낄 수 없는 쫄깃하고 훌륭한 씹는 식감을 경험할 수 있습니다. 이것이 바로 비비고 왕교자가 시판 만두 중 가장 뛰어난 맛을 자랑하는 핵심 비결입니다.' },
    { img: '3.jpg', text: '신선한 100% 국내산 돼지고기와 아삭한 야채의 조화: 좋은 요리의 기본은 훌륭한 식재료에서 출발합니다. 엄격한 품질 관리를 통과한 100% 신선한 국내산 돼지고기만을 사용하여 누린내나 잡내 없이 깔끔하고 담백한 고기 맛을 구현했습니다. 여기에 신선한 부추, 양파, 대파 등 각종 야채를 아낌없이 듬뿍 넣어, 고기의 감칠맛을 살려주는 동시에 씹을 때마다 아삭하게 씹히는 채소 특유의 단맛과 풍미가 기분 좋은 조화를 이룹니다.' },
    { img: '4.jpg', text: '진공 반죽으로 완성한 얇고 쫄깃한 황금 비율 만두피: 만두소 못지않게 만두의 맛을 결정짓는 중요한 요소가 바로 만두피입니다. 3천 번 이상 치댄 후 진공 상태에서 반죽하는 특수 공법을 적용하여, 속이 투명하게 비칠 정도로 얇으면서도 조리 시 쉽게 터지지 않는 극강의 쫄깃함을 자랑합니다. 찌면 부드럽고 촉촉하며, 프라이팬이나 에어프라이어에 구우면 과자처럼 바삭바삭한 식감으로 변신하여 어떤 조리법에도 완벽하게 어울립니다.' },
    { img: '5.jpg', text: '첨가물을 최소화한 3무(無) 안심 설계: 남녀노소, 특히 어린아이들이 즐겨 먹는 간식인 만큼 성분의 안전성에 심혈을 기울였습니다. 합성 향료, 수용성 안나토 색소, 아스파탐 등의 불필요한 첨가물을 과감하게 빼고 자연에서 유래한 건강한 원재료의 맛을 살리는 데 집중했습니다. 가족들의 밥상에 올리거나 출출한 밤 야식으로 즐기기에 부담이 적고 믿고 먹을 수 있는 안심 먹거리입니다.' },
    { img: '6.jpg', text: '1.715kg 대용량과 실패 없는 에어프라이어 조리법: 1.715kg의 넉넉한 대용량 포장으로 가성비가 뛰어나 냉동실에 구비해두면 마음까지 든든해집니다. 군만두, 찐만두, 만둣국 등 활용도가 무궁무진하지만, 최근 가장 인기 있는 조리법은 단연 에어프라이어 조리입니다. 냉동 상태의 만두 표면에 식용유를 살짝 바르거나 스프레이로 뿌린 후, 180도로 예열된 에어프라이어에서 약 15분간(중간에 한 번 뒤집기) 조리하면 겉은 바삭하고 속은 촉촉한 궁극의 \'겉바속촉\' 군만두를 집에서 간편하게 즐길 수 있습니다.' }
  ],
  outro: '비비고 왕교자 1.715kg은 바쁜 일상 속에서 한 끼 식사를 훌륭하게 책임지는 밥반찬이자, 시원한 맥주 한 잔에 곁들이기 좋은 최고의 안주입니다. 큼직하게 썬 국내산 돼지고기의 풍부한 육즙과 얇고 쫄깃한 만두피의 환상적인 하모니는 한번 맛보면 다른 만두로 돌아가기 힘들 만큼 매력적입니다. 냉동 만두의 차원을 한 단계 끌어올린 압도적인 퀄리티를 대용량의 합리적인 가격으로 직접 경험해 보시길 강력히 추천합니다.',
  summary: '냉동 만두의 기준을 바꾼 비비고 왕교자 1.715kg 맛의 비결 및 조리법 총정리'
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
