const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dearfory-summer-pants',
  category: '패션',
  title: '여름철 교복 바지 등극! 디어포리 시원한 냉장고 와이드팬츠 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\디어포리 여성 여름바지 시원한 냉장고바지 와이드팬츠',
  backupDir: 'D:\\정식서버업로드전용폴더\\디어포리 여성 여름바지 시원한 냉장고바지 와이드팬츠',
  link: 'https://link.coupang.com/a/eNPIvKnZuK',
  iframe: '<iframe src="https://coupa.ng/cnApsU" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.png', '1.jpg', '2.jpg', '3.jpg', '4.png'],
  intro: '숨이 턱턱 막히는 한여름 폭염 속, 청바지나 슬랙스를 입고 외출했다가 다리에 땀이 차서 하루 종일 찝찝했던 경험 다들 있으실 텐데요. 그렇다고 매일 반바지만 입기에는 출근룩이나 격식 있는 자리에서 부담스러울 때가 많습니다. 더위와 스타일 사이에서 고민하는 여성분들을 위해, 입은 듯 안 입은 듯 깃털처럼 가볍고 얼음처럼 차가운 촉감으로 올여름 하의를 책임져 줄 궁극의 인생 바지, **디어포리 시원한 냉장고 와이드팬츠**를 소개합니다.\n\n이 제품은 찰랑거리는 쿨링 소재로 제작되어 피부에 닿는 순간 짜릿한 시원함을 선사하는 것은 물론, 체형의 단점은 완벽하게 커버하고 다리를 길어 보이게 만들어주는 마법 같은 핏을 자랑합니다. 집에서 뒹굴거릴 때는 편안한 홈웨어로, 셔츠나 블라우스와 매치하면 세련된 오피스룩으로도 활용 가능한 디어포리 와이드팬츠의 압도적인 장점들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 바지의 핵심은 이름에서도 알 수 있듯 \'극강의 시원함을 자랑하는 냉장고 소재\'에 있습니다. 피부에 닿자마자 체온을 내려주는 쿨링 원단을 사용하여 땀이 나도 피부에 끈적하게 달라붙지 않으며, 하루 종일 쾌적하고 보송보송한 착용감을 유지해 줍니다. 특히 통기성이 뛰어나 걸을 때마다 다리 사이로 시원한 바람이 통하는 것을 느낄 수 있어 한여름 야외 활동에서도 더위 걱정 없이 편안하게 입을 수 있습니다.' },
    { img: '2.jpg', text: '편안함과 동시에 스타일까지 챙길 수 있는 \'군살 완벽 커버 와이드 핏\'은 수많은 여성들의 극찬을 받고 있습니다. 허벅지부터 밑단까지 일자로 툭 떨어지는 넉넉한 와이드 실루엣이 하체의 콤플렉스를 감쪽같이 가려주며, 하이웨스트 디자인이 다리를 한층 더 길고 슬림해 보이게 만들어 줍니다. 체형에 구애받지 않고 누구나 입는 순간 여리여리하고 세련된 비율을 완성할 수 있는 마법의 핏을 자랑합니다.' },
    { img: '3.jpg', text: '아무리 예쁜 바지라도 활동하기 불편하다면 손이 가지 않기 마련인데요. 이 제품은 \'신축성이 뛰어난 쫀쫀한 전체 밴딩\'을 허리에 적용하여 밥을 많이 먹은 후에도, 장시간 의자에 앉아 일할 때도 배 쫄림 없이 극강의 편안함을 제공합니다. 마치 안 입은 것처럼 가볍고 부드러운 소재와 밴딩의 조화 덕분에 장거리 비행이나 여행용 바지, 혹은 임산부 바지로도 손색없는 최고의 활동성을 보장합니다.' },
    { img: '4.png', text: '구김이 잘 가지 않는 링클프리 소재로 제작되어 \'관리가 놀랍도록 편하다\'는 것도 큰 장점입니다. 세탁기에서 막 꺼내 탁탁 털어 널기만 하면 다림질을 할 필요 없이 바로 입고 나갈 수 있어 바쁜 아침 출근 준비 시간을 획기적으로 줄여줍니다. 또한, 기본 컬러인 블랙부터 시원해 보이는 다양한 컬러 라인업을 갖추고 있어 상의에 맞춰 코디하기 쉬우며, 여름철 옷장 속에서 가장 손이 자주 가는 교복 바지가 될 것입니다.' }
  ],
  outro: '매일 아침 거울 앞에서 땀차고 불편한 바지 때문에 스트레스 받으셨다면, 이제 하체에 완벽한 자유와 시원함을 선물할 차례입니다. 극강의 쿨링감, 다리가 길어 보이는 와이드 핏, 그리고 배 쫄림 없는 편안함까지 여름 바지가 갖춰야 할 모든 조건을 완벽하게 충족하는 **디어포리 냉장고 와이드팬츠**! 가격 부담 없이 색깔별로 쟁여두고 여름 내내 교복처럼 돌려 입기 좋은 가성비 최고의 인생 바지를 지금 바로 경험해 보시길 강력히 추천합니다.',
  summary: '여름철 교복 바지 등극! 디어포리 시원한 냉장고 와이드팬츠 완벽 분석'
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
  if (row['폴더이름'] === '디어포리 여성 여름바지 시원한 냉장고바지 와이드팬츠') {
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
