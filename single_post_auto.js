const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-comet-curtain',
  category: '홈/유아',
  title: '숙면을 위한 필수품 코멧 홈 단열 아일렛 암막 커튼 사계절 활용법 및 세탁 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\코멧 홈 단열 아일렛 암막 커튼 2개입',
  backupDir: 'D:\\정식서버업로드전용폴더\\코멧 홈 단열 아일렛 암막 커튼 2개입',
  link: 'https://link.coupang.com/a/eTH7iU1q20',
  iframe: '<iframe src="https://coupa.ng/cnFtkI" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.jpg', '4.jpg', '5.jpg'],
  intro: '질 높은 수면을 방해하는 가장 큰 요인 중 하나는 바로 창문 틈으로 들어오는 불빛과 외풍입니다. 쾌적한 실내 환경과 깊은 잠을 위해 암막 커튼을 찾는 소비자들이 늘어나고 있는 가운데, 우수한 차광률과 뛰어난 단열 효과로 국민 커튼이라 불리며 압도적인 인기를 끌고 있는 **코멧 홈 단열 아일렛 암막 커튼 2개입** 세트의 스펙과 사계절 내내 100% 활용하는 방법을 상세히 가이드해 드립니다.\n\n이 제품은 외부의 빛을 차단해 주는 본연의 암막 기능뿐만 아니라, 겨울철에는 매서운 외풍을 막아 실내 온도를 유지해 주고 여름철에는 뜨거운 직사광선을 차단하여 냉방 효율을 극대화하는 사계절용 단열 커튼입니다. 2개입 세트 구성으로 가성비를 챙겼을 뿐만 아니라 설치가 간편한 아일렛 디자인을 채택하여 1인 가구도 손쉽게 방 분위기를 바꿀 수 있는 인테리어 필수 아이템입니다.',
  sections: [
    { img: '1.png', text: '암막 커튼의 본질인 \'차광률\'을 먼저 살펴보겠습니다. 코멧 홈 암막 커튼은 고밀도 원단을 사용하여 가로등 불빛이나 이른 아침의 강렬한 햇살을 효과적으로 차단합니다. 100% 완벽한 빛 차단을 의미하는 암막 1급은 아니지만, 실생활에서 눈부심을 막고 수면을 유도하기에 충분한 80~90% 수준의 차광률을 보여주어 침실뿐만 아니라 빔 프로젝터를 사용하는 거실의 홈 시네마 환경 구축에도 매우 적합합니다.' },
    { img: '2.png', text: '이 제품의 핵심 경쟁력은 바로 \'단열 효과\'입니다. 커튼 원단 사이에 암막사(검은 실)를 직조해 넣은 3중 구조로 제작되어 창문을 통해 빠져나가는 열 손실을 획기적으로 줄여줍니다. 겨울에는 보일러의 따뜻한 공기가 새어나가는 것을 막아 난방비를 절약하고, 여름에는 에어컨의 시원한 냉기를 보존하여 사계절 내내 쾌적한 실내 온도를 유지하는 데 핵심적인 역할을 수행합니다.' },
    { img: '3.jpg', text: '설치의 편의성 또한 빼놓을 수 없는 장점입니다. 복잡한 핀이나 고리가 필요한 일반 커튼과 달리, 커튼 상단에 일정한 간격으로 금속 링(아일렛)이 뚫려 있어 커튼봉에 스윽 끼워 넣기만 하면 누구나 1분 만에 설치를 끝낼 수 있습니다. 이 아일렛 방식은 커튼을 열고 닫을 때 원단이 부드럽게 움직이며, 자연스럽고 일정한 주름(풍성한 드레이프)을 형성해 주어 고급스러운 인테리어 효과를 연출합니다.' },
    { img: '4.jpg', text: '어떤 인테리어와도 조화롭게 어울리는 모던한 디자인과 컬러 라인업을 자랑합니다. 너무 화려하거나 튀지 않는 차분하고 베이직한 무지 솔리드 패턴으로 제작되어 미니멀리즘, 북유럽풍, 화이트톤 등 다양한 방 분위기에 무난하게 스며듭니다. 특히 질리지 않는 질감으로 계절이 바뀌어도 유행을 타지 않아 오랫동안 사용할 수 있는 실용적인 디자인입니다.' },
    { img: '5.jpg', text: '마지막으로 커튼의 수명을 늘려주는 올바른 \'세탁 및 관리 가이드\'입니다. 커튼은 면적이 넓어 먼지가 쉽게 쌓이므로 주기적인 관리가 필수입니다. 세탁 시에는 커튼에서 아일렛 고리 부분을 조심스럽게 분리하거나, 세탁망에 넣어 울코스(약한 수류)로 단독 세탁하는 것이 원단 손상을 막는 비결입니다. 건조기를 사용하면 원단이 수축할 수 있으므로, 탈수 후에는 구김이 가지 않도록 그늘에서 자연 건조하거나 커튼봉에 바로 걸어둔 채로 말리는 것이 가장 좋습니다.' }
  ],
  outro: '결론적으로 빛 차단과 온도 유지라는 두 마리 토끼를 모두 잡고 싶은 분들에게 이 제품은 최고의 선택지가 될 것입니다. 숙면을 취하기 어려운 교대 근무자, 외풍이 심한 원룸 거주자, 난방비와 냉방비를 절감하고 싶은 일반 가정까지 다양한 니즈를 완벽하게 충족시켜 줍니다. 뛰어난 가성비와 모던한 디자인, 그리고 사계절 실용성을 겸비한 **코멧 홈 단열 아일렛 암막 커튼**으로 당신의 소중한 휴식 공간을 한층 더 안락하게 업그레이드해 보시길 권장합니다.',
  summary: '숙면을 위한 필수품 코멧 홈 단열 아일렛 암막 커튼 사계절 활용법 및 세탁 가이드'
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
  if (row['폴더이름'] === '코멧 홈 단열 아일렛 암막 커튼 2개입') {
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
