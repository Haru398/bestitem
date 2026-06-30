const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-amd-7800x3d',
  category: '가전/디지털',
  title: '게이머를 위한 궁극의 CPU, AMD 라이젠7-5세대 7800X3D 심층 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\AMD 라이젠7-5세대 7800X3D (라파엘) (멀티팩 정품)',
  backupDir: 'D:\\정식서버업로드전용폴더\\AMD 라이젠7-5세대 7800X3D (라파엘) (멀티팩 정품)',
  link: 'https://link.coupang.com/a/e0pF5rMH3Q',
  iframe: '<iframe src="https://coupa.ng/cnKxAG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png', '5.png'],
  intro: '최고의 게이밍 PC를 구성하기 위해 단 하나의 부품에 투자를 해야 한다면, 전 세계 수많은 하드웨어 전문가들과 게이머들이 주저 없이 선택하는 부품이 있습니다. 바로 현재 \'게이밍 CPU의 끝판왕\'이라고 불리는 \'AMD 라이젠7-5세대 7800X3D (라파엘)\'입니다. 고사양 스팀 패키지 게임부터 1프레임이 승패를 가르는 빡센 경쟁형 온라인 게임까지, 그래픽카드의 잠재력을 100% 한계치까지 끌어올려 주는 이 압도적인 성능의 CPU가 왜 현재 PC 시장을 평정하고 있는지 그 핵심 기술과 장점들을 심도 있게 분석해 보겠습니다.',
  sections: [
    { img: '1.png', text: '7800X3D가 게이밍의 제왕으로 군림할 수 있게 한 가장 핵심적인 기술은 바로 \'3D V-Cache 테크놀로지\'입니다. 기존의 평면적인 구조를 벗어나 CPU 코어 위에 고용량의 L3 캐시 메모리를 3D 형태로 수직 적층하여, 무려 96MB라는 경이로운 용량의 L3 캐시를 탑재했습니다. 캐시 메모리 용량이 비약적으로 늘어나면서 게임 데이터를 그래픽카드로 넘겨주는 병목 현상이 극적으로 해소되어 프레임이 폭발적으로 상승하게 됩니다.' },
    { img: '2.png', text: '특히 배틀그라운드, 로스트아크, 발로란트 등과 같은 국산/해외 인기 온라인 게임에서 그 진가가 발휘됩니다. 이러한 온라인 게임들은 CPU의 캐시 메모리 용량에 굉장히 민감하게 반응하기 때문에, 동급의 타사 CPU는 물론이고 한 단계 윗급 라인업의 CPU조차 가볍게 뛰어넘는 압도적인 1% Low 프레임 방어력을 보여줍니다. 난전 상황이나 화려한 스킬 이펙트가 터지는 순간에도 버벅임 없는 극강의 부드러움을 선사합니다.' },
    { img: '3.png', text: '이전 세대인 5800X3D가 엄청난 성공을 거두었음에도 불구하고 발열 관리가 다소 까다로웠던 반면, 이번 5세대 라파엘 7800X3D는 TSMC의 초미세 5나노(nm) 공정으로 제작되어 전성비(전력 대비 성능)와 발열 제어가 비약적으로 발전했습니다. 최고 사양의 게임을 풀옵션으로 돌려도 소비 전력이 현저히 낮게 유지되며, 2열 수랭 쿨러나 대장급 공랭 쿨러만으로도 충분히 안정적인 온도를 유지할 수 있어 시스템 구성의 부담을 크게 덜어줍니다.' },
    { img: '4.png', text: '새로운 AM5 소켓 플랫폼을 기반으로 하여 최신 하드웨어 규격을 완벽하게 지원합니다. 압도적인 대역폭을 자랑하는 차세대 PCIe 5.0 규격과 고속 DDR5 메모리를 지원하여 시스템 병목 현상을 최소화하고 더욱 쾌적한 작업 환경을 제공합니다. 특히 AMD는 최소 2025년 이후까지 AM5 소켓 규격을 유지하겠다고 발표했기 때문에, 추후 CPU만 업그레이드할 수 있는 뛰어난 확장성과 가성비까지 보장받을 수 있습니다.' },
    { img: '5.png', text: '제품 구성은 실속형인 \'멀티팩 정품\' 패키징입니다. 불필요하고 화려한 패키징 박스나 기본 쿨러(기본 쿨러로는 감당이 안 되는 고성능 제품이기에 대부분 사제 쿨러를 사용합니다)를 제외하고, CPU 본품과 정품 인증 스티커만 깔끔하게 제공하여 가격 거품을 확 빼버렸습니다. 물론 국내 공식 유통사를 통한 정식 3년 무상 A/S는 일반 정품 패키지와 100% 동일하게 보장되므로 안심하고 구매하셔도 좋습니다.' }
  ],
  outro: '새로운 게이밍 PC 조립을 계획하고 계시거나, 기존 시스템의 프레임 하락으로 인해 업그레이드를 고민 중이신가요? 그래픽카드에 아무리 많은 돈을 투자해도 CPU가 받쳐주지 못하면 그 성능을 온전히 사용할 수 없습니다. 현존하는 거의 모든 게임에서 그래픽카드의 한계를 끝까지 쥐어짜 내어 최고의 프레임과 부드러움을 선사하는 \'AMD 라이젠 7800X3D\'는 여러분의 게이밍 경험을 완전히 다른 차원으로 끌어올려 줄 단 하나의 완벽한 선택입니다.',
  summary: '게이머를 위한 궁극의 CPU, AMD 라이젠7-5세대 7800X3D 심층 분석'
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
  if (row['폴더이름'] === 'AMD 라이젠7-5세대 7800X3D (라파엘) (멀티팩 정품)') {
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
