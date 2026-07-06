const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-maison-air-freshener',
  category: '생활용품',
  title: '나만의 공간을 완성하는 프리미엄 디퓨저, 메종드펜세 퍼퓸 에어 프레셔너 오리엔탈 우디 발향력 및 지속성',
  sourceDir: 'D:\\정식홈페이지자동화\\메종드펜세 퍼퓸 에어 프레셔너 20g, 2개, 오리엔탈우디',
  backupDir: 'D:\\정식서버업로드전용폴더\\메종드펜세 퍼퓸 에어 프레셔너 20g, 2개, 오리엔탈우디',
  link: 'https://link.coupang.com/a/e6ZfOCuoXk',
  iframe: '<iframe src="https://coupa.ng/cnPfkS" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png'],
  intro: '집이나 사무실 등 우리가 가장 많은 시간을 보내는 공간의 분위기를 결정짓는 숨은 요소 중 하나는 바로 \'향기\'입니다. 아무리 멋진 인테리어를 갖추었더라도, 꿉꿉하거나 쾌적하지 않은 냄새가 난다면 그 공간의 매력은 반감될 수밖에 없습니다. 최근 인테리어 오브제로서의 시각적 효과와 고급스러운 향기를 동시에 만족시키는 프리미엄 방향제에 대한 수요가 높아지고 있습니다. 오늘은 독보적인 니치 향수 브랜드로 자리매김한 메종드펜세(Maison de Pensee)에서 출시하여 뜨거운 사랑을 받고 있는 \'메종드펜세 퍼퓸 에어 프레셔너 오리엔탈 우디\'의 깊고 묵직한 향의 특징과 뛰어난 발향력, 그리고 인테리어 소품으로서의 가치까지 꼼꼼하게 살펴보겠습니다.',
  sections: [
    { img: '1.png', text: '자연을 닮은 깊고 매혹적인 오리엔탈 우디 향: 저렴한 인공 향료 특유의 머리 아픈 냄새와는 차원이 다른, 마치 새벽 숲속을 거니는 듯한 묵직하고 신비로운 자연의 향기를 선사합니다. 부드러운 샌달우드(Sandalwood)와 흙내음을 품은 패출리(Patchouli) 베이스에 스파이시한 오리엔탈 노트가 절묘하게 어우러져, 공간을 단숨에 고급스럽고 차분한 분위기로 탈바꿈시킵니다. 불안하거나 지친 일상 속에서 심리적인 안정감과 편안함을 부여하는 테라피 효과까지 기대할 수 있는 프리미엄 니치 향입니다.' },
    { img: '2.png', text: '공간의 품격을 높여주는 감각적인 오브제 디자인: 메종드펜세 특유의 미니멀하면서도 세련된 디자인 철학이 고스란히 담겨 있습니다. 투명하고 묵직한 유리 보틀과 모던한 타이포그래피 라벨, 그리고 블랙 컬러의 고급 리드 스틱이 어우러져 어디에 올려두어도 훌륭한 인테리어 오브제 역할을 톡톡히 해냅니다. 침실의 협탁, 거실의 선반, 또는 사무실 책상 등 어떤 공간의 무드와도 조화롭게 어울리며, 집들이 선물이나 지인을 위한 센스 있는 선물용으로도 강력하게 추천하는 아이템입니다.' },
    { img: '3.png', text: '오랜 시간 머무르는 탁월한 발향력과 지속성: 일반적인 에어 프레셔너나 디퓨저가 처음 개봉했을 때만 강하게 향이 나고 금세 날아가 버리는 것과 달리, 이 제품은 프리미엄 향료를 고농축으로 블렌딩하여 처음의 우아한 향기가 마지막 한 방울까지 균일하게 유지됩니다. 20g의 용량임에도 불구하고 발향 면적이 넓고 효율이 좋아, 좁은 방 안은 물론 거실이나 화장실 등 다소 넓은 공간에서도 부족함 없이 풍성한 향기를 즐길 수 있습니다. 동봉된 리드 스틱의 개수를 조절하여 개인의 취향과 공간의 크기에 맞게 발향 강도를 쉽게 커스터마이징할 수 있습니다.' },
    { img: '4.png', text: '유해 성분 걱정 없는 안전한 공간 케어: 우리가 숨 쉬는 공간에 지속적으로 발향되는 제품인 만큼 성분의 안전성은 무엇보다 중요합니다. 폼알데하이드, 메탄올 등 호흡기 건강을 위협할 수 있는 대표적인 유해 물질 테스트를 철저하게 통과한 안전한 제품입니다. 곡물에서 추출한 식물성 에탄올 베이스를 사용하여 알코올 특유의 자극적인 냄새를 억제하고 본연의 향을 더욱 부드럽게 끌어올려, 어린아이나 반려동물이 있는 가정에서도 안심하고 쾌적한 실내 환경을 조성할 수 있습니다.' }
  ],
  outro: '메종드펜세 퍼퓸 에어 프레셔너 오리엔탈 우디는 단순한 냄새 제거용 방향제를 넘어, 공간의 분위기를 디자인하고 일상의 스트레스를 환기시켜주는 라이프스타일 에센셜 아이템입니다. 흔하지 않은 나만의 시그니처 향기를 공간에 입히고 싶으신 분들, 혹은 센스 있고 감각적인 선물을 고민 중이신 분들에게 이 제품이 완벽한 해답이 될 것입니다. 당신이 머무는 모든 곳이 가장 편안하고 럭셔리한 휴식처가 될 수 있도록, 깊고 매력적인 오리엔탈 우디 향의 세계를 직접 경험해 보시길 바랍니다.',
  summary: '나만의 공간을 완성하는 프리미엄 디퓨저, 메종드펜세 퍼퓸 에어 프레셔너 오리엔탈 우디 발향력 및 지속성'
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
