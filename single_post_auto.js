const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-drato-cooling-sun-spray',
  category: '뷰티',
  title: '강력하고 시원한 자외선 차단! 닥터아토 쿨링 선 스프레이 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\닥터아토 쿨링 선 스프레이 SPF50+ PA+++, 150ml, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\닥터아토 쿨링 선 스프레이 SPF50+ PA+++, 150ml, 1개',
  link: 'https://link.coupang.com/a/eNa2Eg0OXc',
  iframe: '<iframe src="https://coupa.ng/cnz73e" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.jpg'],
  intro: '뜨거운 태양이 내리쬐는 여름철, 자외선 차단제는 선택이 아닌 생존 필수품이 되었습니다. 하지만 외출 전 온몸에 끈적이는 선크림을 펴 바르는 과정은 생각만 해도 찝찝하고 번거롭게 느껴집니다. 게다가 야외 활동 중 땀을 흘린 뒤 덧바르는 것은 거의 불가능에 가깝죠. 이처럼 자외선 차단에 답답함을 느끼는 분들을 위해 끈적임 없이 시원하게 뿌리기만 하면 되는 신개념 자외선 차단제, **닥터아토 쿨링 선 스프레이**를 소개합니다.\n\n이 제품은 자외선 차단의 번거로움을 단 한 번의 스프레이 분사로 완벽하게 해결해 주는 획기적인 아이템입니다. SPF50+ PA+++의 강력한 자외선 차단 지수는 기본이며, 피부에 닿는 순간 즉각적인 쿨링 효과를 선사하여 달아오른 피부 온도를 낮춰주는 똑똑한 기능까지 갖췄습니다. 크림 타입 선케어 제품 특유의 백탁 현상과 끈적임을 극도로 싫어하시는 분들의 인생템으로 떠오르고 있는 닥터아토 쿨링 선 스프레이의 매력을 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '닥터아토 쿨링 선 스프레이의 가장 큰 장점은 바로 \'손에 묻히지 않고 간편하게 자외선을 차단할 수 있다\'는 점입니다. 넓게 퍼지는 안개 분사 시스템을 적용하여 팔, 다리, 목 뒷부분 등 손이 잘 닿지 않는 부위까지 뭉침 없이 고르게 도포됩니다. 외출 전 현관에서 가볍게 칙칙 뿌려주기만 하면 3초 만에 자외선 방어막이 형성되어 바쁜 아침 출근길이나 등굣길의 든든한 지원군이 되어줍니다.' },
    { img: '2.png', text: '제품명에서 알 수 있듯 쿨링 기능은 이 선 스프레이의 핵심 무기입니다. 알로에베라잎 추출물과 병풀 추출물 등 피부 진정에 탁월한 성분들이 함유되어 있어, 피부에 분사하는 즉시 달아오른 피부 온도를 시원하게 식혀주는 짜릿한 청량감을 선사합니다. 한여름 야외 스포츠를 즐기거나 캠핑, 물놀이 등 땀을 많이 흘리는 상황에서 덧뿌려주면 자외선 차단과 동시에 상쾌한 리프레시 효과까지 누릴 수 있습니다.' },
    { img: '3.jpg', text: '많은 분들이 선크림을 꺼려 하는 이유 중 하나인 끈적임과 허옇게 뜨는 백탁 현상을 말끔히 잡았습니다. 투명한 워터 타입 제형으로 피부에 가볍고 산뜻하게 밀착되며, 여러 번 덧뿌려도 하얗게 뭉치거나 옷에 묻어나는 불편함이 없습니다. 또한 피부 자극 테스트를 완료한 순한 포뮬러로 민감한 피부를 가진 성인뿐만 아니라 연약한 아이 피부에도 부담 없이 사용할 수 있어 온 가족용 선케어 제품으로 매우 실용적입니다.' }
  ],
  outro: '자외선은 피부 노화와 트러블을 유발하는 가장 큰 원인입니다. 귀찮고 끈적거린다는 이유로 선크림 바르기를 미뤄왔다면, 이제는 뿌리는 순간 시원하게 자외선을 튕겨내는 **닥터아토 쿨링 선 스프레이**로 스마트하게 피부를 지켜보세요. 휴대하기 좋은 150ml 용량으로 언제 어디서든 간편하게 칙칙 뿌려주면 끝! 강력한 자외선 방어는 물론 상쾌한 쿨링감까지 챙길 수 있는 올여름 최고의 생존템으로 당신의 산뜻한 일상을 응원합니다.',
  summary: '강력하고 시원한 자외선 차단! 닥터아토 쿨링 선 스프레이 분석'
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
  if (row['폴더이름'] === '닥터아토 쿨링 선 스프레이 SPF50+ PA+++, 150ml, 1개') {
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
