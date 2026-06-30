const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-chiefmall-driver-set',
  category: '생활용품',
  title: '셀프 수리의 필수품! 치프몰 115 in 1 정밀 드라이버 세트 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\치프몰 115 in 1 정밀 드라이버 세트',
  backupDir: 'D:\\정식서버업로드전용폴더\\치프몰 115 in 1 정밀 드라이버 세트',
  link: 'https://link.coupang.com/a/eTE4GErwfA',
  iframe: '<iframe src="https://coupa.ng/cnFqKo" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '스마트폰이나 안경의 작은 나사가 풀렸을 때, 혹은 노트북 내부 청소를 위해 커버를 열어야 할 때, 집에 있는 뭉툭한 일반 드라이버로는 크기가 맞지 않아 난감했던 경험 한 번쯤 있으실 겁니다. 철물점에 가기도 번거롭고 수리 센터에 맡기자니 비용이 부담스러울 때, 집안의 모든 소형 전자기기와 정밀 부품들을 내 손으로 직접 고칠 수 있게 해주는 만능 해결사, **치프몰 115 in 1 정밀 드라이버 세트**를 소개합니다.\n\n이 제품은 이름 그대로 115가지에 달하는 압도적인 구성품을 하나의 콤팩트한 케이스에 모두 담아낸 것이 특징입니다. 십자, 일자, 별모양 등 우리가 상상할 수 있는 거의 모든 규격의 비트(나사머리)를 지원하여 어떤 상황에서도 당황하지 않고 대처할 수 있는데요. 셀프 수리족과 전자기기 마니아들 사이에서 뛰어난 가성비로 입소문이 자자한 치프몰 정밀 드라이버 세트의 매력을 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 돋보이는 장점은 단연 \'98종의 다양한 비트(Bit)와 17종의 실용적인 수리 도구 구성\'입니다. 일상적으로 자주 쓰이는 십자, 일자 드라이버는 물론이고 애플 제품에 쓰이는 별형(Pentalobe), 육각, Y형, 삼각형 등 특수한 나사 머리까지 모두 지원합니다. 여기에 핀셋, 유연한 연장 튜브, 플라스틱 오프너 등 수리에 필요한 필수 도구들까지 알차게 포함되어 있어 이 세트 하나면 추가적인 공구 구매가 전혀 필요 없습니다.' },
    { img: '2.jpg', text: '작고 정밀한 부품을 다룰 때 필수적인 \'강력한 마그네틱(자석) 기능\'이 탑재되어 있습니다. 드라이버 손잡이 끝부분에 강한 자성이 있어 비트를 단단하게 고정해 줄 뿐만 아니라, 쌀알보다 작은 초소형 나사를 풀거나 조일 때 나사가 바닥으로 떨어져 분실되는 불상사를 완벽하게 방지해 줍니다. 좁고 깊숙한 곳에 있는 나사를 빼낼 때도 자석에 착 달라붙어 딸려 나오기 때문에 작업의 효율성을 극대화해 줍니다.' },
    { img: null, text: '내구성을 좌우하는 \'고품질 크롬 바나듐(CR-V) 강철 소재\'로 제작되었습니다. 저렴한 중국산 드라이버의 경우 나사를 세게 조이다가 비트의 끝이 뭉개지거나 부러져버리는 경우가 허다한데요. 이 제품은 열처리된 특수 합금강을 사용하여 강도와 내마모성이 매우 뛰어나며, 장기간 사용하더라도 마모 없이 처음과 같은 정밀함을 유지해 줍니다. 나사산이 망가지는 야마 현상 없이 깔끔한 작업이 가능합니다.' },
    { img: null, text: '보관과 이동이 간편한 \'스마트하고 콤팩트한 양면 케이스 디자인\'을 채택했습니다. 115개나 되는 구성품이 각각의 위치에 딱 맞게 수납되도록 설계되어 흔들려도 부품이 섞이거나 쏟아지지 않습니다. 책상 서랍이나 공구함 한편에 차지하는 공간이 적으며, 무게도 가벼워 필요할 때 언제든 가방에 쏙 넣어 휴대할 수 있습니다. 각 비트의 종류와 사이즈가 케이스에 명확하게 각인되어 있어 원하는 도구를 직관적으로 찾아 쓸 수 있습니다.' }
  ],
  outro: '집안에 하나쯤 구비해 두면 언젠가 반드시 그 몸값을 톡톡히 해내는 필수 공구 세트! 비싼 수리비와 번거로움을 한 번에 덜어줄 **치프몰 115 in 1 정밀 드라이버 세트**는 여러분의 소중한 전자기기와 일상용품들을 가장 확실하게 관리할 수 있는 최고의 솔루션입니다. 놀라운 가성비와 압도적인 구성, 그리고 탄탄한 내구성까지 모두 갖춘 이 만능 공구 상자로 지금 당장 셀프 수리의 달인이 되어보시길 강력히 추천합니다.',
  summary: '셀프 수리의 필수품! 치프몰 115 in 1 정밀 드라이버 세트 완벽 분석'
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
  if (row['폴더이름'] === '치프몰 115 in 1 정밀 드라이버 세트') {
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
