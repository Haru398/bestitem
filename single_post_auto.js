const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-cesco-fly-stick',
  category: '생활용품',
  title: '지긋지긋한 초파리 완벽 퇴치! 세스코마이랩 플라이스틱 효과 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\세스코마이랩 플라이스틱, 2개, 84g',
  backupDir: 'D:\\정식서버업로드전용폴더\\세스코마이랩 플라이스틱, 2개, 84g',
  link: 'https://link.coupang.com/a/eNMBW3aqFp',
  iframe: '<iframe src="https://coupa.ng/cnAojn" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg'],
  intro: '무더운 여름철, 음식물 쓰레기통 주변이나 과일 껍질 근처에 쉴 새 없이 날아드는 초파리 떼 때문에 짜증 나셨던 경험, 다들 한 번쯤 있으실 겁니다. 작고 재빨라서 손이나 파리채로 잡기도 쉽지 않고, 살충제를 뿌리자니 주방이나 식탁 근처라 찜찜하기 마련인데요. 대한민국 방역의 대명사 세스코에서 그동안의 방제 노하우를 듬뿍 담아 일반 가정집을 위해 야심 차게 선보인 초파리 전문 퇴치기, **세스코마이랩 플라이스틱**이 바로 그 해답이 될 수 있습니다.\n\n살충 성분이 들어간 스프레이를 공기 중에 흩뿌릴 필요 없이, 초파리가 좋아하는 유인제를 통해 스스로 날아와 붙게 만드는 똑똑하고 안전한 유인 포획 방식이 특징입니다. 일반적인 끈끈이 트랩들과는 차원이 다른 세스코만의 독자적인 포획 기술과, 눈에 띄지 않게 깔끔하게 처리할 수 있는 위생적인 디자인까지 플라이스틱의 모든 것을 상세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 큰 장점은 세스코의 해충 방제 전문가들이 수많은 테스트를 거쳐 개발한 \'특수 유인제\'에 있습니다. 초파리와 파리류가 가장 좋아하는 냄새와 성분을 과학적으로 배합하여, 트랩 근처를 지나가는 해충들을 거부할 수 없는 매력으로 강력하게 끌어당깁니다. 단순히 시각적인 것에만 의존하는 것이 아니라 후각까지 자극하는 이중 유인 시스템 덕분에, 설치해 두기만 하면 눈 깜짝할 새에 끈끈이에 달라붙어 있는 놀라운 포획력을 경험할 수 있습니다.' },
    { img: '2.jpg', text: '인체에 유해한 화학 살충 성분을 공기 중으로 분사하지 않는 100% 무독성 포획 방식을 채택하여 안전성을 극대화했습니다. 호흡기를 자극하는 독한 냄새나 유해 물질이 발생하지 않기 때문에 아이가 있는 집이나 강아지, 고양이를 키우는 반려동물 가정에서도 안심하고 사용할 수 있습니다. 특히 주방의 식탁 위나 싱크대 주변, 음식물 쓰레기통 근처 등 화학 살충제를 뿌리기 꺼려졌던 민감한 공간에서 더욱 빛을 발하는 제품입니다.' },
    { img: '1.jpg', text: '포획된 해충의 징그러운 사체를 눈으로 직접 마주하지 않아도 된다는 점은 사용자들의 만족도를 가장 크게 높여주는 요소입니다. 노란색 스틱 형태의 끈끈이 패드는 본체 케이스 안쪽에 숨겨져 있어 밖에서는 잡힌 벌레들이 잘 보이지 않도록 세심하게 디자인되었습니다. 미관상 지저분해 보이지 않으며, 사용 후 버릴 때도 끈끈이를 만질 필요 없이 케이스째로 깔끔하게 분리수거할 수 있어 마지막까지 완벽하게 위생적입니다.' },
    { img: '2.jpg', text: '설치 방법 또한 매우 직관적이고 간편합니다. 복잡한 조립 과정 없이 포장을 뜯고 유인제가 담긴 하단 캡을 스틱 본체에 끼워 넣은 뒤, 초파리가 자주 출몰하는 곳에 툭 세워두기만 하면 모든 준비가 끝납니다. 콤팩트하고 세련된 디자인으로 집안 어디에 두어도 인테리어를 해치지 않으며, 2개가 한 세트로 구성되어 있어 주방과 베란다 등 겹치는 동선에 나누어 설치하면 더욱 뛰어난 방제 효과를 누릴 수 있습니다.' }
  ],
  outro: '매년 여름마다 주방을 점령하는 초파리 군단과의 끝없는 전쟁, 이제는 대한민국 No.1 방역 전문가 세스코의 기술력으로 종지부를 찍어보세요. 무독성 유인제로 안전하게 끌어당기고, 보이지 않는 곳에 깔끔하게 포획하여 버릴 때까지 쾌적함을 유지해 주는 **세스코마이랩 플라이스틱**은 여름철 주방의 필수 평화 지킴이입니다. 스트레스 없이 깔끔하고 위생적인 우리 집을 위해 지금 바로 똑똑한 방제 솔루션을 선택해 보시길 바랍니다.',
  summary: '지긋지긋한 초파리 완벽 퇴치! 세스코마이랩 플라이스틱 효과 분석'
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
const stmtSec = db.prepare('INSERT INTO post_sections (postId, sectionOrder, image, text, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
for (const sec of product.sections) {
  let imgPath = null;
  const idx = additionalImages.indexOf(sec.img);
  if (idx !== -1 && additionalImageUrls[idx]) {
    imgPath = additionalImageUrls[idx];
  }
  stmtSec.run(product.id, order++, imgPath, sec.text);
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
  if (row['폴더이름'] === '세스코마이랩 플라이스틱, 2개, 84g') {
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
