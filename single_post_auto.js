const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-comet-cervical-pillow',
  category: '생활용품',
  title: '수면 중 목 통증 완화를 위한 바른 자세 유도 코멧 홈 메모리폼 경추베개 구조 및 소재 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\코멧 홈 메모리폼 경추베개',
  backupDir: 'D:\\정식서버업로드전용폴더\\코멧 홈 메모리폼 경추베개',
  link: 'https://link.coupang.com/a/eTGlCzaiPI',
  iframe: '<iframe src="https://coupa.ng/cnFrUr" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  intro: '현대인들의 고질병인 거북목 증후군과 일자목으로 인해 매일 아침 목과 어깨의 뻐근함을 호소하는 사람들이 급증하고 있습니다. 수면 시간은 하루 중 근육이 이완되고 척추가 휴식을 취하는 가장 중요한 시간이지만, 체형에 맞지 않는 푹신하거나 너무 높은 일반 베개를 사용할 경우 오히려 경추의 피로도를 가중시킬 수 있습니다. 이러한 문제를 해결하기 위해 인체공학적 설계를 바탕으로 수면 중 경추의 정상적인 C자 커브를 완벽하게 지지해 주는 **코멧 홈 메모리폼 경추베개**의 원리와 구조를 상세히 분석해 보겠습니다.\n\n이 제품은 단순한 수면 도구를 넘어, 수면 중 발생하는 목과 어깨의 압력을 분산시키고 바른 자세를 유도하여 숙면을 돕는 기능성 침구입니다. 뛰어난 복원력의 고밀도 메모리폼과 통기성을 고려한 커버 소재, 그리고 수면 자세에 따라 최적화된 양방향 높이 설계 등 건강한 수면 환경 조성을 위한 핵심 요소들을 완벽하게 갖추고 있습니다.',
  sections: [
    { img: '1.jpg', text: '경추베개의 가장 핵심적인 기능은 바로 인체공학적으로 설계된 \'3D 입체 C자형 곡선 구조\'입니다. 베개의 중앙 부분이 뒷목을 안정적으로 받쳐주도록 볼록하게 솟아 있으며, 머리가 닿는 부분은 오목하게 파여 있어 누웠을 때 경추가 가장 편안함을 느끼는 정상적인 C자 형태를 자연스럽게 유지하도록 유도합니다. 이는 수면 중 기도의 확보를 도와 코골이 완화에도 긍정적인 영향을 미칩니다.' },
    { img: '2.jpg', text: '핵심 내장재인 \'고밀도 저탄성 메모리폼\'은 수면의 질을 결정짓는 중요한 요소입니다. 일반 솜베개와 달리, 메모리폼은 사용자의 체온과 무게에 반응하여 두상과 목의 형태에 맞춰 부드럽게 변형됩니다. 목과 어깨에 집중되는 압력을 넓게 분산시켜 특정 부위에 가해지는 부담을 줄여주며, 수면 중 몸을 뒤척이더라도 빈틈없이 밀착되어 뜬 공간 없이 안정적인 지지력을 제공합니다.' },
    { img: '3.jpg', text: '정자세뿐만 아니라 \'옆으로 누워 자는 측면 수면 자세까지 고려한 세심한 설계\'가 적용되었습니다. 베개의 양쪽 측면부는 중앙부보다 약간 높게 설계되어 있어, 옆으로 누웠을 때 어깨가 짓눌리지 않고 목과 척추가 일직선을 유지할 수 있도록 도와줍니다. 덕분에 어깨 결림이나 팔 저림 현상을 예방하고 어떤 자세에서도 편안한 수면 환경을 조성합니다.' },
    { img: '4.jpg', text: '수면 중 발생하는 땀과 열을 효과적으로 배출하기 위한 \'통기성이 뛰어난 에어홀 구조\'를 갖추고 있습니다. 메모리폼 내부에 미세한 공기구멍이 뚫려 있어 폼 내부의 공기 순환을 원활하게 촉진시킵니다. 이는 메모리폼 특유의 덥고 답답한 단점을 보완하여 여름철이나 열이 많은 체질의 사용자도 쾌적하고 보송보송하게 숙면을 취할 수 있도록 돕습니다.' },
    { img: '5.jpg', text: '피부에 직접 닿는 외부 커버는 \'부드럽고 쾌적한 프리미엄 겉커버 소재\'를 채택했습니다. 민감한 피부에도 자극이 적은 부드러운 촉감의 원단을 사용하여 쾌적함을 극대화했으며, 땀 흡수와 건조가 빨라 사계절 내내 위생적으로 사용할 수 있습니다. 또한, 내장재를 한 번 더 보호해 주는 얇고 통풍이 잘 되는 속커버가 포함되어 있어 폼의 오염과 손상을 방지합니다.' },
    { img: '6.jpg', text: '청결한 침구 관리를 위해 \'분리 세탁이 간편한 지퍼형 커버 디자인\'을 적용했습니다. 베개 뒷면에 숨김 처리된 지퍼를 열면 겉커버를 쉽게 분리할 수 있어 주기적인 세탁이 용이합니다. 수면 중 흘리는 땀이나 각질, 화장품 등으로 인한 오염을 빠르게 세탁하여 세균이나 집먼지진드기의 번식을 억제하고 항상 청결하고 위생적인 수면 환경을 유지할 수 있습니다.' },
    { img: '7.jpg', text: '사용자의 체형과 선호도에 맞춰 선택할 수 있는 \'양방향(투웨이) 높이 설계\'가 특징입니다. 위아래의 높이가 각각 다르게 디자인되어 있어, 높은 베개를 선호하는 분은 높은 쪽을, 낮은 베개를 선호하거나 체구가 작은 분은 낮은 쪽을 목 방향으로 두고 사용할 수 있습니다. 하나의 베개로 두 가지 높이를 경험할 수 있어 실패 확률이 적고 활용도가 매우 높습니다.' }
  ],
  outro: '목과 어깨의 통증은 단순히 피로감을 넘어 만성적인 질환으로 발전할 수 있기 때문에 매일 밤 사용하는 베개의 선택은 매우 중요합니다. 인체공학적 3D 입체 설계와 고밀도 메모리폼의 완벽한 조화로 바른 수면 자세를 유도하는 **코멧 홈 메모리폼 경추베개**는 거북목 예방과 숙면을 위한 훌륭한 투자가 될 것입니다. 내 체형에 완벽하게 맞춰지는 놀라운 지지력과 쾌적한 소재를 통해, 아침이 달라지는 상쾌한 휴식을 직접 경험해 보시길 권장합니다.',
  summary: '수면 중 목 통증 완화를 위한 바른 자세 유도 코멧 홈 메모리폼 경추베개 구조 및 소재 분석'
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
  if (row['폴더이름'] === '코멧 홈 메모리폼 경추베개') {
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
