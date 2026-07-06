const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-easyandco-ice-cool-towel-3p',
  category: '스포츠/레저',
  title: '가성비 갑! 이지앤코 3P 아이스 쿨타올 1세트로 여름 더위 박살 내기',
  sourceDir: 'D:\\정식홈페이지자동화\\이지앤코 즉각냉감 아이스 스포츠 쿨타올 3P, 1세트, 그레이+블루+스카이',
  backupDir: 'D:\\정식서버업로드전용폴더\\이지앤코 즉각냉감 아이스 스포츠 쿨타올 3P, 1세트, 그레이+블루+스카이',
  link: 'https://link.coupang.com/a/e7LL8Fn7Ei',
  iframe: '<iframe src="https://coupa.ng/cnPwB4" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '한여름 푹푹 찌는 찜통더위 속에서 매일 운동이나 야외 작업을 하시는 분들이라면, 이마와 목덜미로 줄줄 흐르는 땀 때문에 심한 불쾌감과 피로를 느껴보셨을 겁니다. 시원한 물수건이 간절해지는 순간, 단 3초 만에 얼음장 같은 냉기를 만들어내는 마법의 수건 \'아이스 쿨타올\'이 여름철 필수 생존 템으로 자리 잡았습니다. 특히 온 가족이 나눠 쓰거나 매일 세탁하며 넉넉하게 사용할 수 있도록 그레이, 블루, 스카이 3가지 컬러를 한 세트로 구성하여 가성비를 극대화한 \'이지앤코 즉각냉감 아이스 스포츠 쿨타올 3P 세트\'의 놀라운 기화열 원리와 활용법을 꼼꼼하게 리뷰합니다.',
  sections: [
    { img: '1.jpg', text: '물, 짜기, 털기 3단계면 끝나는 즉각 냉감의 마법: 일반 면 수건은 땀을 닦고 나면 축축해진 채로 금세 온도가 올라가 오히려 더 찝찝해집니다. 하지만 이지앤코 쿨타올은 특수 제작된 냉감 원사를 촘촘하게 엮어 만들어, 물을 흠뻑 적신 뒤 손으로 물기를 꽉 짜내고 허공에 2~3회 강하게 탁탁 털어주기만 하면 즉시 냉감이 살아납니다. 원단 사이에 머금고 있던 수분이 공기와 마찰하며 아주 빠르게 기화(증발)하면서 주변의 열을 확 빼앗아 가는 과학적인 기화열 원리가 숨어 있습니다. 수건이 미지근해지면 다시 한 번 공기 중에 털어주기만 해도 얼음장 같은 시원함이 무한으로 재생됩니다.' },
    { img: '2.jpg', text: '통풍의 끝판왕, 에어 메쉬 구조의 강력한 땀 흡수력: 쿨타올이 시원하기만 하고 땀을 흡수하지 못해 피부에 끈적하게 달라붙는다면 오히려 운동에 방해가 됩니다. 이 제품은 원단 표면 전체에 미세한 구멍이 촘촘히 뚫려 있는 \'에어 메쉬(Air Mesh)\' 구조를 채택했습니다. 땀구멍처럼 생긴 이 메쉬 조직이 목이나 얼굴에 흐르는 땀방울을 순식간에 빨아들이고, 외부의 공기를 빠르게 유입시켜 원단을 뽀송뽀송하게 건조해 줍니다. 골프나 테니스 등 격렬한 스포츠 중에도 피부에 달라붙지 않아 땀띠나 짓무름 걱정 없이 아주 쾌적하게 착용할 수 있습니다.' },
    { img: '4.jpg', text: '유해 물질 제로! 연약한 피부에도 안전한 친환경 소재: 화학적인 냉매 약품을 표면에 코팅하여 강제로 차갑게 만든 저가형 쿨타올들은 자외선에 오래 노출되거나 땀과 섞이면 심각한 피부 트러블을 유발할 수 있습니다. 반면 이지앤코 쿨타올은 오직 원단의 물리적인 섬유 구조만으로 냉감을 발생시키는 100% 무독성 친환경 소재로 제작되었습니다. 까다로운 유해 물질 테스트를 통과하여 형광증백제나 발암물질이 전혀 검출되지 않았으므로, 피부가 매우 예민한 유아나 아토피가 있는 아이들의 목에 둘러주어도 전혀 자극이 없어 온 가족이 안심하고 사용할 수 있습니다.' },
    { img: '5.jpg', text: '그레이, 블루, 스카이 3가지 컬러 조합의 완벽한 가성비: 매일 조깅을 하거나 피트니스 센터에 가는 분들은 땀에 흠뻑 젖은 수건을 매일 빨고 말리는 것이 큰 스트레스입니다. 이 제품은 세련된 그레이, 시원한 블루, 청량한 스카이까지 가장 인기 있는 3가지 컬러를 하나의 세트로 묶어 판매하는 \'3P 구성\'으로 압도적인 가성비를 자랑합니다. 3장을 번갈아 가며 세탁하여 매일매일 위생적으로 사용할 수 있으며, 아빠는 그레이, 엄마는 블루, 아이는 스카이 색상으로 온 가족이 하나씩 사이좋게 나누어 쓰기에도 아주 완벽한 패밀리 세트입니다.' },
    { img: '6.jpg', text: '보관 케이스 포함으로 휴대성과 실용성을 한 번에: 물에 젖어 축축한 쿨타올을 운동 가방이나 핸드백에 그냥 넣으면 다른 소지품까지 다 젖어버리는 낭패를 겪게 됩니다. 이지앤코 3P 세트는 각각의 쿨타올마다 깔끔하게 보관할 수 있는 개별 방수 케이스와 카라비너(고리)가 기본으로 포함되어 있습니다. 사용 후 케이스에 쏙 말아 넣고 등산 가방이나 자전거 백팩에 카라비너로 찰칵 걸어두면 부피도 전혀 차지하지 않으며 위생적인 보관이 가능합니다. 낚시, 캠핑, 골프, 조깅 등 한여름 더위가 존재하는 모든 야외 활동을 위한 완벽한 해결책입니다.' }
  ],
  outro: '이지앤코 즉각냉감 아이스 스포츠 쿨타올 3P 세트는 저렴한 가격으로 온 가족의 여름철 건강을 지켜주는 가장 스마트하고 경제적인 선택입니다. 단 한 번의 구매로 3장의 고퀄리티 쿨타올을 얻을 수 있어 가성비와 실용성 모두를 만족시킵니다. 숨 막히는 폭염 속에서 열사병을 예방하고 체온을 쾌적하게 유지하고 싶다면, 가방 속에 쏙 들어가는 이 작고 시원한 얼음 수건을 반드시 준비하셔서 올여름을 더욱 상쾌하고 건강하게 보내시길 강력히 추천합니다.',
  summary: '가성비 갑! 이지앤코 3P 아이스 쿨타올 1세트로 여름 더위 박살 내기'
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
