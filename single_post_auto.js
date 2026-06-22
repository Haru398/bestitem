const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dongwon-pepper-tuna',
  category: '식품',
  title: '매콤한 밥도둑! 동원 고추참치 성분 및 맛 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\동원참치 고추 참치, 85g, 12개',
  backupDir: 'D:\\정식서버업로드전용폴더\\동원참치 고추 참치, 85g, 12개',
  link: 'https://link.coupang.com/a/eNFXzFGWOa',
  iframe: '<iframe src="https://coupa.ng/cnAns5" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '반찬이 마땅치 않은 날, 갓 지은 따끈한 흰쌀밥 위에 척 얹어 먹기만 해도 한 그릇을 뚝딱 비우게 만드는 마법의 식재료가 있습니다. 한국인이라면 누구나 찬장 한편에 비상식량처럼 쟁여두고 있는 국민 반찬, 바로 참치캔인데요. 그중에서도 특유의 매콤달콤한 양념으로 잃어버린 입맛까지 단숨에 사로잡는 강력한 밥도둑, **동원참치 고추참치**는 세대를 불문하고 꾸준한 사랑을 받고 있는 스테디셀러입니다.\n\n단순히 반찬으로 집어 먹는 것을 넘어 찌개, 볶음밥, 비빔면 등 다양한 요리에 활용할 수 있는 엄청난 범용성을 자랑하는 것이 특징입니다. 일반 살코기 참치와는 또 다른 독보적인 매력으로 밥상을 풍성하게 채워주는 동원 고추참치의 맛의 비결과 다채로운 활용법에 대해 깊이 있게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '동원 고추참치의 가장 큰 매력은 한국인의 입맛에 딱 맞게 개발된 \'매콤달콤한 특제 소스\'에 있습니다. 단순히 맵기만 한 자극적인 맛이 아니라, 토마토 페이스트와 볶음 양파를 베이스로 하여 감칠맛을 깊게 끌어올렸으며 달콤한 끝맛이 어우러져 남녀노소 누구나 호불호 없이 즐길 수 있습니다. 큼지막하게 썰어 넣은 감자와 양파, 당근 등 다양한 채소가 씹히는 식감을 더해주어 캔 하나만으로도 훌륭한 요리 같은 느낌을 선사합니다.' },
    { img: '2.jpg', text: '주재료인 참치 원물 또한 깐깐하게 엄선했습니다. 태평양 등 청정 해역에서 갓 잡아 올린 싱싱한 가다랑어만을 사용하여 참치 본연의 담백하고 고소한 풍미를 잃지 않았습니다. 풍부한 단백질과 오메가-3 등 등푸른 생선 특유의 우수한 영양 성분까지 고스란히 담아내어, 맛뿐만 아니라 영양가 있는 든든한 한 끼 식사로 손색이 없습니다.' },
    { img: '3.jpg', text: '활용도가 무궁무진하다는 점은 고추참치만의 독보적인 장점입니다. 캠핑이나 자취방에서 다른 부재료 없이 고추참치 한 캔과 김치만 넣고 보글보글 끓여내면 훌륭한 고추참치 김치찌개가 완성되며, 따뜻한 밥에 참기름을 두르고 김가루와 함께 슥슥 비벼 먹는 고추참치 비빔밥은 바쁜 아침 최고의 초간단 메뉴입니다. 치즈를 듬뿍 올려 전자레인지에 데워 먹으면 훌륭한 술안주로도 변신합니다.' },
    { img: '4.jpg', text: '85g의 소용량 캔 사이즈는 한 번의 식사에 남김없이 깔끔하게 비울 수 있어 매우 위생적이고 경제적입니다. 보관 중인 캔을 개봉한 뒤 남은 참치가 상할까 봐 걱정할 필요 없이, 1인 가구나 혼밥족들도 부담 없이 언제든 신선하게 즐길 수 있습니다. 가방에 쏙 들어가는 콤팩트한 크기로 해외여행이나 등산 등 야외 활동 시에 챙겨가기에도 완벽한 규격을 자랑합니다.' }
  ],
  outro: '어떤 요리든 고추참치 한 캔만 톡 까서 넣으면 부족했던 감칠맛이 폭발하며 훌륭한 일품요리로 탈바꿈합니다. 85g 용량 12개가 들어있는 이 넉넉한 구성은 찬장을 든든하게 채워주는 것은 물론이고 언제 닥칠지 모르는 반찬 고민을 완벽하게 해결해 줄 구원투수입니다. 냉장고 파먹기 할 때도, 귀찮은 주말 한 끼를 때울 때도 실패 없는 맛을 보장하는 **동원참치 고추참치**와 함께 매일매일 맛있는 식탁을 완성해 보세요.',
  summary: '매콤한 밥도둑! 동원 고추참치 성분 및 맛 분석'
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
  if (row['폴더이름'] === '동원참치 고추 참치, 85g, 12개') {
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
