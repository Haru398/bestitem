const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-amd-ryzen-5600',
  category: '디지털',
  title: '가성비 게이밍 CPU의 제왕! AMD 라이젠 5 5600 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\AMD 라이젠5-4세대 5600 (버미어) (정품)',
  backupDir: 'D:\\정식서버업로드전용폴더\\AMD 라이젠5-4세대 5600 (버미어) (정품)',
  link: 'https://link.coupang.com/a/eTEWO5qBky',
  iframe: '<iframe src="https://coupa.ng/cnFqF1" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '배틀그라운드, 로스트아크, 발로란트 등 인기 3D 게임을 렉 없이 쾌적하게 즐기고 싶은데, 하늘을 찌르는 컴퓨터 부품 가격 때문에 조립을 망설이고 계신가요? 한정된 예산 안에서 그래픽카드의 성능을 최대한 끌어내면서도 시스템의 병목 현상을 완벽하게 잡아줄 수 있는 최고의 \'가성비 두뇌\'가 필요합니다. 수많은 게이머들과 PC 하드웨어 커뮤니티에서 만장일치로 추천하는 국민 게이밍 CPU, **AMD 라이젠 5 4세대 5600 (버미어)**를 소개합니다.\n\n이 제품은 전 세대 대비 혁신적으로 개선된 젠3(Zen 3) 아키텍처를 기반으로 설계되어, 멀티 코어 성능뿐만 아니라 게이머들에게 가장 중요한 \'싱글 코어 성능\'과 \'게이밍 프레임 방어력\'을 비약적으로 끌어올렸습니다. 출시 이후 시간이 꽤 흘렀음에도 불구하고, 여전히 10만 원대 초중반의 가격으로 상위 라인업 부럽지 않은 퍼포먼스를 보여주어 생태계를 파괴하는 가성비의 끝판왕으로 불리는데요. 지금 당장 게이밍 PC를 조립해야 한다면 왜 반드시 라이젠 5600을 선택해야 하는지 그 놀라운 장점들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '라이젠 5600이 게이머들의 압도적인 선택을 받는 가장 큰 이유는 바로 \'강력한 6코어 12스레드의 스펙과 32MB의 대용량 L3 캐시\'에 있습니다. 게임 내에서 발생하는 방대한 물리 연산과 데이터를 빠르게 처리하여 프레임 드랍(렉 현상)을 최소화하고, 다중 코어를 활용하여 게임을 플레이하면서 디스코드 음성 채팅을 하거나 유튜브 화면을 띄워놓는 멀티태스킹 환경에서도 한 치의 버벅거림 없는 쾌적한 환경을 제공합니다.' },
    { img: '2.jpg', text: '이 제품은 기존 AM4 소켓 메인보드와 완벽하게 호환되는 \'뛰어난 업그레이드 편의성과 가성비\'를 자랑합니다. 값비싼 최신 메인보드나 차세대 DDR5 메모리를 강제로 구매할 필요 없이, 시중에서 저렴하게 구할 수 있는 A320이나 B450, B550 메인보드 및 기존 DDR4 램과 결합하여 시스템 구성 비용을 획기적으로 낮출 수 있습니다. 아낀 예산으로 그래픽카드 체급을 한 단계 높이는 것이 게이밍 PC 조립의 정석입니다.' },
    { img: '3.jpg', text: '고성능을 발휘함에도 불구하고 \'TDP(열 설계 전력)가 65W에 불과한 놀라운 전력 효율성\'을 지니고 있습니다. 이는 발열량이 매우 적다는 것을 의미하며, 비싼 수랭 쿨러나 대장급 공랭 쿨러를 추가로 구매할 필요 없이 2~3만 원대의 보급형 쿨러나 심지어 박스에 동봉된 기본 쿨러(기쿨)만으로도 온도를 완벽하게 제어할 수 있습니다. 쿨링팬 소음 스트레스 없이 장시간 쾌적한 게이밍 몰입감을 선사합니다.' },
    { img: '4.jpg', text: '게이밍 성능뿐만 아니라 \'뛰어난 스마트 액세스 메모리(SAM) 기술 및 PBO 자동 오버클럭 기능\'을 통해 숨겨진 잠재력을 100% 끌어낼 수 있습니다. 라데온 그래픽카드와 결합 시 병목 현상을 줄여 게임 프레임을 추가로 향상시킬 수 있으며, 메인보드 바이오스에서 클릭 한 번만으로 시스템 상황에 맞게 클럭을 자동으로 끌어올려 주는 PBO 기능을 통해 초보자도 위험 부담 없이 최고의 성능을 만끽할 수 있습니다.' }
  ],
  outro: '가성비 게이밍 PC 조립을 계획 중이시라면 CPU 선택으로 더 이상 고민할 필요가 없습니다. 저렴한 가격, 뛰어난 게이밍 프레임 방어력, 기존 메인보드와의 미친 호환성까지 삼박자를 모두 갖춘 **AMD 라이젠 5 5600**은 현시점 가장 스마트하고 합리적인 선택입니다. 예산의 거품은 빼고 오직 압도적인 게이밍 퍼포먼스에만 집중하고 싶다면, 주저 없이 라이젠 5600으로 당신만의 강력한 시스템을 완성해 보시길 강력히 추천합니다.',
  summary: '가성비 게이밍 CPU의 제왕! AMD 라이젠 5 5600 완벽 분석'
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
  if (row['폴더이름'] === 'AMD 라이젠5-4세대 5600 (버미어) (정품)') {
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
