const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-smartever-food-disposer',
  category: '가전',
  title: '여름철 냄새 완벽 차단! 스마트에버 가정용 음식물처리기 성분 및 장단점',
  sourceDir: 'D:\\정식홈페이지자동화\\[필터2개 포함] 스마트에버 음식물처리기 건조기 가정용 건조분쇄 저소음 냄새차단',
  backupDir: 'D:\\정식서버업로드전용폴더\\[필터2개 포함] 스마트에버 음식물처리기 건조기 가정용 건조분쇄 저소음 냄새차단',
  link: 'https://link.coupang.com/a/eNMQJ0o1Mi',
  iframe: '<iframe src="https://coupa.ng/cnAorb" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.png', '4.jpg'],
  intro: '무더운 여름철, 주방에서 가장 큰 골칫거리를 하나 꼽으라면 단연코 \'음식물 쓰레기\'일 것입니다. 하루만 방치해도 코를 찌르는 악취가 진동하고 징그러운 초파리 떼가 들끓어, 귀찮음을 무릅쓰고 매일매일 음식물 쓰레기봉투를 들고 엘리베이터를 타야 하는 고충은 말로 다 할 수 없는데요. 이런 삶의 질을 뚝 떨어뜨리는 주방 스트레스에서 완벽하게 해방시켜 줄 구원투수, **스마트에버 가정용 음식물처리기**를 소개합니다.\n\n건조와 분쇄를 동시에 처리하여 음식물 쓰레기의 부피를 한 줌의 가루로 만들어버리는 마법 같은 가전제품입니다. 특히 이번 구성은 악취를 완벽하게 잡아주는 활성탄 필터 2개가 기본으로 포함되어 있어 냄새 걱정 없이 쾌적한 주방 환경을 오랫동안 유지할 수 있습니다. 수많은 맘카페와 자취생들 사이에서 \'건조기, 식기세척기와 함께 신혼 3대 필수 가전\'으로 불리는 스마트에버 음식물처리기만의 탁월한 성능과 매력을 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 핵심 기술력은 고온 건조와 강력한 분쇄가 결합된 \'스마트 건조 분쇄 시스템\'에 있습니다. 먹다 남은 밥이나 찌개 찌꺼기, 닭 뼈까지 몽땅 털어 넣고 버튼 하나만 누르면, 120도 이상의 고온으로 수분을 완전히 증발시킨 뒤 강력한 모터가 단단한 찌꺼기들까지 맷돌처럼 미세하게 갈아버립니다. 이 과정을 거치면 음식물 쓰레기의 부피가 최대 90%까지 극적으로 감소하여, 역겨운 쓰레기가 냄새 없는 고운 가루 한 줌으로 변신하는 놀라운 광경을 목격할 수 있습니다.' },
    { img: '2.jpg', text: '음식물처리기를 구매할 때 가장 망설여지는 부분 중 하나가 바로 \'냄새\' 문제입니다. 하지만 스마트에버는 고성능 활성탄 필터 시스템을 탑재하여 찌는 듯한 악취를 밖으로 절대 새어 나가지 않게 철통 방어합니다. 건조 과정에서 발생하는 퀴퀴한 냄새와 유해 가스들이 촘촘한 활성탄 필터를 거치며 완벽하게 정화되어 배출되므로, 한여름 주방 한가운데 두고 작동시켜도 냄새로 인한 불쾌감이 전혀 없습니다. 필터 2개가 기본 제공되어 유지비 걱정도 덜어줍니다.' },
    { img: '3.png', text: '아파트나 빌라 등 공동 주택에서 늦은 밤에도 눈치 보지 않고 맘 편히 사용할 수 있도록 \'저소음 설계\'가 적용되었습니다. 강력하게 뼈를 부수는 분쇄 과정에서도 도서관 수준의 조용한 작동음을 유지하기 때문에, 층간 소음 걱정은 물론이고 잠귀가 밝은 아기나 반려동물이 있는 가정에서도 밤낮을 가리지 않고 자유롭게 사용할 수 있습니다. 주방 일과를 마치고 잠들기 전 버튼을 눌러놓기만 하면 다음 날 아침 깨끗하게 비워진 통을 맞이할 수 있습니다.' },
    { img: '4.jpg', text: '싱크대 하부에 배관을 복잡하게 연결할 필요 없이 코드만 꽂으면 바로 사용할 수 있는 \'독립형(프리스탠딩) 구조\'라 설치가 매우 간편합니다. 싱크대 개조나 잦은 막힘 고장으로 인한 스트레스가 전혀 없으며, 화이트 톤의 깔끔하고 모던한 디자인은 어느 주방 인테리어와도 세련되게 어울립니다. 또한, 한 번에 최대 3L까지 넉넉하게 처리할 수 있는 대용량 건조통은 4인 가족이 하루 종일 배출하는 음식물 쓰레기도 끄떡없이 소화해 냅니다.' }
  ],
  outro: '매일 저녁 물이 뚝뚝 떨어지는 음식물 쓰레기봉투를 들고 나가며 한숨 쉬던 일상, 이제는 스마트하게 바꿔보세요. 냄새 없는 고온 건조와 뼈까지 부수는 강력한 분쇄, 그리고 밤에도 조용한 저소음 설계까지 모두 갖춘 **스마트에버 가정용 음식물처리기**는 당신의 주방에 혁명적인 쾌적함을 선사할 것입니다. 활성탄 필터 2개가 포함된 이번 실속 구성을 놓치지 마시고, 냄새와 벌레 없는 완벽한 여름 주방을 완성해 보시길 적극 추천합니다.',
  summary: '여름철 필수 가전! 스마트에버 음식물처리기 건조기 장단점 분석'
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
  if (row['폴더이름'] === '[필터2개 포함] 스마트에버 음식물처리기 건조기 가정용 건조분쇄 저소음 냄새차단') {
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
