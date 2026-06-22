const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-greenfinger-wipes',
  category: '출산/유아동',
  title: '유해세균 99.9% 완벽 살균! 그린핑거 유아용품 소독 물티슈 캡형 성분 및 안심 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\그린핑거 유아용품 소독 물티슈 캡형',
  backupDir: 'D:\\정식서버업로드전용폴더\\그린핑거 유아용품 소독 물티슈 캡형',
  link: 'https://link.coupang.com/a/eMZkUCnQGa',
  iframe: '',
  images: ['썸네일.jpg', 'D_01.jpg', 'D_02.jpg', 'D_03.jpg', 'D_04.jpg'],
  intro: '소중한 우리 아이가 매일 물고 빠는 장난감, 밥을 먹는 식탁, 외출 시 만지는 유모차 손잡이까지! 눈에 보이지 않는 유해 세균들로부터 아이를 안전하게 보호하고 계신가요? 면역력이 약한 영유아기에는 주변 환경의 위생 관리가 그 무엇보다 중요합니다. 하지만 매번 장난감을 물로 씻고 열탕 소독을 하는 것은 바쁜 육아 일상 속에서 현실적으로 너무나 벅찬 일입니다. 이런 부모님들의 고충을 완벽하게 덜어줄 필수 육아템, 대한민국 대표 유아 스킨케어 브랜드에서 만든 **그린핑거 유아용품 소독 물티슈 캡형**을 자신 있게 추천합니다.\n\n엄마들 사이에서 \'국민 소독티슈\'로 불리며 폭발적인 인기를 끌고 있는 이 제품은, 아이 피부에 닿아도 안전한 식물유래 성분을 사용하면서도 유해 세균을 99.9% 강력하게 살균하는 놀라운 기능을 자랑합니다. 독한 알코올 냄새 대신 은은하고 상쾌한 향이 감돌아 밀폐된 공간에서도 부담 없이 사용할 수 있으며, 도톰하고 부드러운 원단 덕분에 한 장만으로도 넓은 면적을 깨끗하게 닦아낼 수 있습니다. 우리 아이의 안전한 생활 반경을 책임져 줄 그린핑거 소독 물티슈의 핵심 매력을 지금부터 상세히 파헤쳐 보겠습니다.',
  sections: [
    { img: 'D_01.jpg', text: '이 제품의 가장 강력한 무기는 바로 대장균, 황색포도상구균 등 일상생활에서 쉽게 노출될 수 있는 유해 세균을 단 한 번의 닦음으로 99.9% 완벽하게 제거하는 \'강력한 살균력\'입니다. 단순한 세정 목적의 일반 물티슈와는 달리, 국가공인시험기관의 엄격한 살균력 테스트를 통과하여 눈에 보이지 않는 찝찝한 오염물질과 세균을 뿌리째 뽑아내어 언제 어디서나 안심하고 아이의 청결을 유지할 수 있도록 돕습니다.' },
    { img: 'D_02.jpg', text: '살균력이 강하다고 해서 독한 화학 성분을 사용했을 거라는 걱정은 접어두셔도 좋습니다. 여린 아이 피부를 연구해 온 그린핑거만의 노하우를 담아 곡물 발효 에탄올과 자몽 추출물 등 안심할 수 있는 \'식물 유래 살균 성분\'을 아낌없이 처방했습니다. 화약 약품 특유의 코를 찌르는 독한 알코올 냄새가 전혀 나지 않고 산뜻하게 마무리되어 후각이 예민한 아이들도 거부감 없이 편안하게 받아들입니다.' },
    { img: 'D_03.jpg', text: '외출할 때 이것저것 챙기느라 무거운 기저귀 가방, 이 물티슈 하나면 소독 스프레이와 일반 물티슈를 따로 챙길 필요가 없어 짐이 확 줄어듭니다. 식당의 아기 의자, 대중교통 손잡이, 마트 카트 등 아이의 손이 닿는 모든 곳을 즉각적으로 닦아내어 철통 방어를 할 수 있습니다. 뚜껑이 있는 \'캡형\' 디자인으로 수분이 쉽게 날아가지 않아 마지막 한 장까지 촉촉하게 사용할 수 있으며, 한 손으로도 톡 뽑아 쓰기 매우 편리합니다.' },
    { img: 'D_04.jpg', text: '쉽게 찢어지거나 늘어나는 얇고 저렴한 원단이 아닙니다. 여러 번 문질러 닦아도 보풀이 일어나지 않는 \'도톰하고 촘촘한 프리미엄 엠보싱 원단\'을 적용하여 적은 장수로도 장난감이나 매트의 넓은 면적을 빠르고 효율적으로 소독할 수 있습니다. 닦고 난 자리에 끈적임이나 찝찝한 잔여물이 남지 않고 금방 뽀송뽀송하게 건조되어 곧바로 아이가 만지고 놀아도 안전합니다.' }
  ],
  outro: '매일 반복되는 고된 열탕 소독의 굴레에서 벗어나, 이제는 뽑아 쓰는 소독 물티슈로 육아의 질을 획기적으로 높여보세요! 믿을 수 있는 브랜드의 철저한 품질 관리와 식물 유래 성분의 안전성, 그리고 99.9%의 강력한 살균력까지 모두 갖춘 **그린핑거 유아용품 소독 물티슈 캡형**! 내 아이를 세균으로부터 지키는 가장 쉽고 똑똑한 선택, 지금 바로 구비해 두시고 언제 어디서나 안심할 수 있는 청결한 육아 환경을 만들어 보시길 강력히 추천드립니다.',
  summary: '유해세균 99.9% 완벽 살균! 그린핑거 유아용품 소독 물티슈 캡형 성분 및 안심 리뷰'
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

const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

for (let row of data) {
  if (row['폴더이름'] === '그린핑거 유아용품 소독 물티슈 캡형') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
