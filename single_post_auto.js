const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-boace-peltier-cooling-vest-set',
  category: '스포츠/레저',
  title: '입는 에어컨의 등장! BOACE 펠티어 냉각조끼 배터리 세트 원리 및 후기',
  sourceDir: 'D:\\정식홈페이지자동화\\BOACE 초강력 펠체 냉각조끼 배터리 세트 급속냉각 반도체 얼음조끼 낚시 캠핑 작업용',
  backupDir: 'D:\\정식서버업로드전용폴더\\BOACE 초강력 펠체 냉각조끼 배터리 세트 급속냉각 반도체 얼음조끼 낚시 캠핑 작업용',
  link: 'https://link.coupang.com/a/e7Llqf4Ig0',
  iframe: '<iframe src="https://coupa.ng/cnPwza" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '3.jpg', '5.jpg', '8.jpg', '12.jpg'],
  intro: '야외 건설 현장이나 물류 창고 등 에어컨 바람이 닿지 않는 열악한 환경에서 땀 흘려 일하시는 분들에게 한여름의 폭염은 생명을 위협할 정도로 치명적입니다. 또한 한여름 땡볕 아래에서 낚시나 캠핑 등 아웃도어 취미를 즐기는 분들 역시 온열 질환을 예방하기 위한 확실한 대책이 필요합니다. 얼음 팩을 주머니에 넣고 다니는 구형 조끼의 불편함을 완벽하게 개선하여, 전원 스위치 하나만 켜면 3초 만에 등줄기가 얼음장처럼 차가워지는 획기적인 \'입는 에어컨\'이 등장했습니다. 최첨단 반도체 냉각 기술을 조끼에 그대로 이식한 \'BOACE 초강력 펠티어 냉각조끼 세트\'의 놀라운 성능과 장점들을 상세히 분석해 보았습니다.',
  sections: [
    { img: '1.jpg', text: '얼음팩 NO! 반도체를 이용한 최첨단 펠티어(Peltier) 냉각 기술: 기존의 쿨링 조끼들은 냉동실에서 꽁꽁 얼린 무거운 얼음 팩을 옷 주머니에 여러 개 쑤셔 넣어야 했기 때문에 무겁고, 시간이 지나면 얼음이 녹으면서 옷이 축축하게 젖는 치명적인 단점이 있었습니다. 반면 BOACE 냉각조끼는 소형 냉장고나 에어컨에 들어가는 첨단 \'펠티어(Peltier)\' 반도체 칩을 등 부분에 직접 탑재했습니다. 전류가 흐르면 반도체의 한쪽 면이 급격하게 차가워지는 열전소자 원리를 활용하여, 전원 버튼을 누르자마자 단 3초 만에 등 전체로 영하에 가까운 짜릿한 냉기가 퍼져나가는 놀라운 경험을 선사합니다.' },
    { img: '3.jpg', text: '보조 배터리 연결로 장시간 끄떡없는 지속력: 펠티어 칩을 구동하기 위해서는 전기가 필요하지만, 무거운 대형 배터리를 등에 짊어질 필요는 전혀 없습니다. 이 세트에는 슬림하고 가벼운 고용량 스마트 보조 배터리가 기본으로 포함되어 있으며, USB 케이블을 통해 조끼와 간편하게 연결하기만 하면 곧바로 작동이 시작됩니다. 10,000mAh 이상의 고용량 배터리 기준으로 한 번 완충 시 최대 5~6시간 동안 차가운 냉기를 지속적으로 뿜어내므로, 야외 작업은 물론 장시간 대기해야 하는 바다낚시 등에서도 배터리 방전 걱정 없이 든든하게 사용할 수 있습니다.' },
    { img: '5.jpg', text: '버튼 하나로 내 맘대로 조절하는 3단계 온도 제어 시스템: 사람마다 추위를 느끼는 정도가 다르고, 아침저녁과 한낮의 기온 차이가 크기 때문에 무조건 차갑기만 한 것은 오히려 몸에 무리를 줄 수 있습니다. 이 제품은 가슴팍에 위치한 스마트 컨트롤러 버튼을 가볍게 누르는 것만으로 냉각 강도를 강, 중, 약 3단계로 자유롭게 조절할 수 있습니다. 뙤약볕이 내리쬐는 정오에는 \'강\' 모드로 설정하여 에어컨 못지않은 시원함을 즐기고, 해가 지거나 실내로 들어왔을 때는 \'약\' 모드로 변경하여 쾌적한 체온을 유지하는 스마트한 온도 제어가 가능합니다.' },
    { img: '8.jpg', text: '작업자의 활동성을 극대화한 초경량 인체공학 디자인: 등에 반도체 장비가 들어있다고 해서 조끼가 크고 무거울 것이라는 생각은 오산입니다. BOACE 냉각조끼는 장비의 무게를 최소화하기 위해 초경량 메쉬 원단을 베이스로 제작되었으며, 몸에 착 달라붙는 인체공학적 밀착 핏을 적용하여 격렬한 움직임에도 냉각 패드가 등에서 떨어지지 않고 냉기를 꾸준히 전달합니다. 조끼 위에 안전띠나 작업복 상의를 겹쳐 입어도 전혀 둔해 보이지 않을 만큼 얇고 유연하여, 높은 비계 위를 오르내리는 건설 현장 작업자들도 아무런 불편함 없이 착용할 수 있습니다.' },
    { img: '12.jpg', text: '캠핑, 낚시, 골프까지 한여름 야외 활동의 구원자: 주로 산업 현장의 작업용으로 입소문이 났던 이 제품은, 압도적인 성능이 알려지면서 최근 레저 활동을 즐기는 일반인들 사이에서도 폭발적인 인기를 끌고 있습니다. 그늘 한 점 없는 갯바위에서 하루 종일 서 있어야 하는 바다 낚시꾼, 한여름 땡볕 아래서 텐트를 쳐야 하는 오토 캠퍼, 카트 없이 18홀을 걸어 다녀야 하는 열정 넘치는 골퍼들에게 이 조끼는 한 줄기 빛과도 같습니다. 땀띠와 열사병으로부터 내 몸을 가장 안전하게 지켜줄 궁극의 여름 필수템으로 강력히 추천합니다.' }
  ],
  outro: 'BOACE 초강력 펠티어 냉각조끼는 단순한 의류를 넘어 한여름 폭염으로부터 생존을 책임지는 최첨단 웨어러블 가전기기입니다. 무겁고 축축한 얼음 팩의 시대는 끝났습니다! 가벼운 보조 배터리 하나로 온몸을 휘감는 강력한 에어컨 냉기를 언제 어디서나 만끽해 보세요. 찌는 듯한 가마솥더위 속에서 매일같이 야외 작업을 하시는 부모님이나 남편을 위한 최고의 효도 선물이자 센스 있는 내조 아이템이 될 것임을 확신합니다.',
  summary: '입는 에어컨의 등장! BOACE 펠티어 냉각조끼 배터리 세트 원리 및 후기'
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
