const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-lg-tromm-13kg',
  category: '가전',
  title: '가성비 드럼세탁기 추천! LG 트롬 13kg 기능 및 장단점 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\LG전자 트롬 세탁기 13kg 방문설치',
  backupDir: 'D:\\정식서버업로드전용폴더\\LG전자 트롬 세탁기 13kg 방문설치',
  link: 'https://link.coupang.com/a/eNNlBIxl36',
  iframe: '<iframe src="https://coupa.ng/cnAoKW" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '1인 가구 비율이 역대 최고치를 기록하고 있는 요즘, 거대하고 값비싼 대용량 가전보다는 내 공간에 딱 맞고 실속 있는 가전을 선호하는 똑똑한 소비자들이 늘고 있습니다. 특히 세탁기의 경우 무조건 큰 용량을 고집하기보다는, 자주 쌓이는 세탁물을 그때그때 부담 없이 돌릴 수 있는 적당한 용량의 수요가 크게 증가하는 추세인데요. "백색가전은 역시 LG"라는 진리를 다시 한번 증명하며 1~2인 가구의 압도적인 지지를 받고 있는 베스트셀러, **LG전자 트롬 13kg 드럼세탁기**를 소개합니다.\n\n이 제품은 좁은 베란다나 세탁실에도 쏙 들어가는 콤팩트한 사이즈를 자랑하면서도, LG전자만의 독보적인 모터 기술력과 스마트한 세탁 코스를 꽉 채워 넣어 대용량 모델 부럽지 않은 강력한 퍼포먼스를 보여줍니다. 가격 거품을 빼고 오직 실용성과 세탁 본연의 기능에 집중한 LG 트롬 13kg의 핵심 스펙과 매력적인 장점들을 하나씩 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 주목해야 할 부분은 세탁기의 심장이라고 할 수 있는 LG전자의 "인버터 DD(Direct Drive) 모터" 기술입니다. 모터와 세탁통이 벨트 없이 직접 연결되어 있어 힘의 손실 없이 강력하게 회전하면서도, 진동과 소음은 획기적으로 줄여줍니다. 한밤중이나 새벽에도 층간 소음 걱정 없이 조용하게 세탁을 마칠 수 있으며, 모터 10년 무상 보증을 제공하여 잔고장 걱정 없이 오랫동안 안심하고 사용할 수 있는 든든한 내구성을 자랑합니다.' },
    { img: '2.jpg', text: '옷감 손상을 최소화하면서도 찌든 때를 완벽하게 빼주는 "6모션 세탁 방식"도 빼놓을 수 없는 장점입니다. 사람의 손빨래 동작을 정밀하게 구현한 두드리기, 주무르기, 비비기 등 6가지 세탁 모션을 옷감의 종류와 오염도에 맞게 조합하여 작동합니다. 약한 니트나 실크 소재는 부드럽게 주물러 손상을 방지하고, 찌든 때가 묻은 수건이나 청바지는 강력하게 두드려 세탁해 주기 때문에 옷감을 보호하면서도 맞춤형 딥 클렌징이 가능합니다.' },
    { img: '3.jpg', text: '13kg의 용량은 1인 가구는 물론 2~3인 가구의 일상적인 세탁물을 소화하기에 가장 합리적이고 실용적인 사이즈입니다. 매일 쏟아져 나오는 수건과 속옷부터 얇은 여름 이불까지 거뜬하게 세탁할 수 있으며, 불필요하게 물과 전기를 낭비하며 통을 채울 때까지 기다릴 필요가 없습니다. 또한 제품 자체의 부피가 슬림하여 원룸의 비좁은 다용도실이나 오래된 아파트의 좁은 세탁실 문도 거뜬히 통과하여 설치 공간의 제약을 덜어줍니다.' },
    { img: '4.jpg', text: '가전제품을 인터넷으로 구매할 때 가장 걱정되는 설치 문제도 완벽하게 해결했습니다. LG전자 소속의 전문 설치 기사님이 직접 방문하여 안전하고 꼼꼼하게 설치를 진행하며, 수평 맞춤, 배수 호스 연결, 그리고 초기 작동 테스트까지 책임집니다. 원한다면 기존에 사용하던 낡은 세탁기를 무상으로 수거해 가는 서비스까지 제공하기 때문에, 주문 버튼 한 번만 누르면 무거운 가전제품을 혼자서 끙끙대며 처리할 필요 없이 모든 과정이 편안하게 마무리됩니다.' }
  ],
  outro: '매일 입고 덮는 옷과 이불을 관리하는 세탁기, 이제는 크기만 보고 비싸게 구매할 필요가 없습니다. 검증된 LG전자의 DD모터와 6모션 기술로 옷감 손상 없이 완벽한 세탁을 보장하고, 좁은 공간에서도 빛을 발하는 콤팩트한 13kg 용량, 그리고 믿을 수 있는 본사 직배송 설치 서비스까지! 합리적인 가격으로 프리미엄급 성능을 누릴 수 있는 **LG전자 트롬 13kg 드럼세탁기**로 우리 집 세탁 라이프를 한 단계 스마트하게 업그레이드해 보시길 강력히 추천합니다.',
  summary: '가성비 드럼세탁기 추천! LG 트롬 13kg 기능 및 장단점 분석'
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
  if (row['폴더이름'] === 'LG전자 트롬 세탁기 13kg 방문설치') {
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
