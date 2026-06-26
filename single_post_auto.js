const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-lenovo-thinkcentre-2025',
  category: '디지털',
  title: '압도적인 성능의 미니 PC! 레노버 2025 씽크센터 네오 울트라 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\레노버 2025 씽크센터 Neo Ultra Gen2 코어Ultra5 인텔 14세대 지포스 RTX 5060',
  backupDir: 'D:\\정식서버업로드전용폴더\\레노버 2025 씽크센터 Neo Ultra Gen2 코어Ultra5 인텔 14세대 지포스 RTX 5060',
  link: 'https://link.coupang.com/a/eNQFLI6D2i',
  iframe: '<iframe src="https://coupa.ng/cnApCt" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png'],
  intro: '고사양 게임이나 무거운 그래픽 작업을 위해 데스크탑을 구매하고 싶지만, 책상 위를 가득 채우는 거대한 크기와 투박한 디자인 때문에 망설여지시나요? 크기는 작지만 성능만큼은 웬만한 타워형 데스크탑을 압도하는 콤팩트한 폼팩터의 혁신이 시작되었습니다. 공간 활용의 극대화와 괴물 같은 스펙을 동시에 충족시키는 하이엔드 미니 PC, **레노버 2025 씽크센터 Neo Ultra Gen2**를 소개합니다.\n\n이 제품은 최신 인텔 14세대 코어 Ultra 프로세서와 지포스 RTX 5060이라는 강력한 조합을 불과 3.6리터 크기의 작은 섀시 안에 완벽하게 담아낸 레노버의 야심작입니다. 일반적인 미니 PC들이 내장 그래픽의 한계로 인해 고사양 작업에 취약했던 반면, 씽크센터 네오 울트라는 외장 그래픽카드를 탑재하여 AAA급 게임은 물론 3D 렌더링, 영상 편집까지 거침없이 소화해 내는데요. 작은 고추가 맵다는 속담을 하드웨어로 증명해 낸 이 놀라운 데스크탑의 핵심 스펙들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '가장 눈에 띄는 장점은 단연 \'초소형 폼팩터가 선사하는 압도적인 공간 활용성\'입니다. 부피가 3.6리터에 불과하여 모니터 뒤, 책상 구석, 혹은 거실 TV 옆 등 공간의 제약 없이 어디든 자유롭게 배치할 수 있습니다. 무겁고 둔탁한 타워형 본체가 차지하던 넓은 데스크 공간을 되찾아 주어 미니멀하고 깔끔한 데스크테리어(Desk-terior) 환경을 완성할 수 있으며, 이사를 가거나 자리를 이동할 때도 한 손으로 가볍게 들고 옮길 수 있습니다.' },
    { img: '2.png', text: '작은 크기가 무색할 만큼 \'인텔 14세대 코어 Ultra 5 프로세서의 강력한 심장\'을 탑재했습니다. 이전 세대 대비 비약적으로 상승한 멀티 코어 성능을 바탕으로 복잡한 연산이나 다중 작업(멀티태스킹)을 버벅거림 없이 매끄럽게 처리합니다. 수십 개의 인터넷 창을 띄워놓고 엑셀 작업을 하거나, 무거운 프로그램을 동시에 실행해도 시스템의 지연 없이 쾌적한 비즈니스 및 작업 환경을 제공합니다.' },
    { img: '3.png', text: '게이머와 크리에이터들의 가슴을 설레게 할 \'엔비디아 지포스 RTX 5060 외장 그래픽카드\'가 장착되어 있습니다. 초소형 PC의 고질적인 약점이었던 그래픽 성능을 완벽하게 극복하여, 최신 고사양 3D 게임들을 높은 프레임으로 즐길 수 있으며 4K 동영상 편집이나 3D 모델링, AI 연산 등 전문가 수준의 무거운 그래픽 워크로드도 막힘없이 훌륭하게 수행해 냅니다. 작지만 어떤 작업이든 해낼 수 있는 진정한 올라운더 PC입니다.' },
    { img: '4.png', text: '초소형 폼팩터에 고성능 부품이 집약되어 발생할 수 있는 발열 문제는 \'레노버만의 독보적인 스마트 쿨링 시스템\'으로 완벽하게 제어합니다. 공기 역학적 설계를 통해 차가운 공기를 효율적으로 흡입하고 내부의 뜨거운 열기를 빠르게 외부로 배출시켜, 장시간 고사양 게임을 플레이하거나 무거운 렌더링 작업을 돌려도 성능 저하(스로틀링) 없이 안정적인 시스템 온도를 유지해 줍니다. 쿨링팬의 소음 역시 매우 정숙하여 작업의 몰입도를 깨뜨리지 않습니다.' }
  ],
  outro: '크고 무거운 데스크탑만이 고성능을 발휘한다는 편견은 이제 버리셔도 좋습니다. 인텔 최신 14세대 프로세서와 RTX 5060의 괴물 같은 성능을 이토록 작고 세련된 디자인 안에 담아낸 **레노버 2025 씽크센터 Neo Ultra Gen2**는 미니 PC 시장의 판도를 바꿀 혁신적인 제품입니다. 공간의 낭비 없이 쾌적한 하이엔드 게이밍 및 작업 환경을 구축하고 싶으시다면, 주저 없이 선택해 보시길 강력히 추천합니다.',
  summary: '압도적인 성능의 미니 PC! 레노버 2025 씽크센터 네오 울트라 완벽 분석'
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
  if (row['폴더이름'] === '레노버 2025 씽크센터 Neo Ultra Gen2 코어Ultra5 인텔 14세대 지포스 RTX 5060') {
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
