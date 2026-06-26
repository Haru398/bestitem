const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-homeplanet-cooling-fan',
  category: '가전',
  title: '시원한 급속 냉각! 홈플래닛 에어컨 휴대용 손선풍기 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\홈플래닛 급속 냉각 에어컨 휴대용 손 선풍기 + 스트랩',
  backupDir: 'D:\\정식서버업로드전용폴더\\홈플래닛 급속 냉각 에어컨 휴대용 손 선풍기 + 스트랩',
  link: 'https://link.coupang.com/a/eNGpjUdq7o',
  iframe: '<iframe src="https://coupa.ng/cnAnvd" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '푹푹 찌는 한여름 야외로 나설 때 손 선풍기 하나쯤은 다들 챙기시죠? 하지만 뜨거운 폭염 속에서는 아무리 선풍기 날개를 빠르게 돌려도 미지근한 바람만 훅훅 뿜어져 나와 오히려 불쾌지수를 높이는 경우가 많습니다. 선풍기를 틀어도 전혀 시원하지 않고 뜨거운 바람만 느껴진다면, 단순한 송풍 방식을 넘어 실제 피부 온도를 차갑게 낮춰주는 혁신적인 쿨링 기술이 필요한 시점입니다. 올여름 여러분의 외출을 상쾌하게 책임져 줄 **홈플래닛 급속 냉각 에어컨 휴대용 손 선풍기**를 소개합니다.\n\n이 제품은 일반적인 모터 회전 방식의 손 선풍기와는 차원이 다른 기능성을 자랑합니다. 중앙에 부착된 급속 냉각 패드가 마치 에어컨처럼 차갑게 얼어붙어, 피부에 직접 닿는 순간 짜릿할 정도의 시원함을 선사하는 신개념 쿨링 디바이스입니다. 미지근한 바람의 굴레에서 벗어나 진정한 피서를 경험하게 해 줄 홈플래닛 쿨링 선풍기만의 압도적인 성능과 실용성을 낱낱이 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '홈플래닛 에어컨 선풍기의 가장 핵심적인 차별점은 전면 중앙에 위치한 \'급속 냉각 쿨링 패드\'입니다. 전원 버튼을 누르면 단 3초 만에 반도체 냉각 기술이 적용된 알루미늄 패드가 차갑게 냉각되면서 주변의 공기를 급속하게 식혀줍니다. 이 차가운 패드를 이마나 목덜미, 팔목 등 땀이 나는 부위에 직접 갖다 대면 마사지하듯 시원한 냉찜질 효과를 누릴 수 있어 뙤약볕 아래에서도 더위를 단숨에 식힐 수 있습니다.' },
    { img: '2.jpg', text: '작은 고추가 맵다는 속담은 이 선풍기를 두고 하는 말 같습니다. 작고 슬림한 디자인임에도 불구하고 고성능 브러시리스(BLDC) 모터를 탑재하여 소음은 획기적으로 줄이면서도 강력하고 안정적인 바람을 뿜어냅니다. 1단계 미풍부터 3단계 강풍까지 버튼 하나로 섬세하게 풍속을 조절할 수 있으며, 고속 회전 시에도 귀를 거슬리게 하는 소음이 적어 도서관이나 사무실, 대중교통 등 조용한 실내 공간에서도 눈치 보지 않고 쾌적하게 사용할 수 있습니다.' },
    { img: '3.jpg', text: '야외에서 배터리가 금방 닳아버려 짐 덩어리로 전락하는 기존 손 선풍기들의 단점을 완벽하게 보완했습니다. 3200mAh의 고효율 대용량 배터리를 내장하여 한 번 완충 시 1단계 기준 최대 10시간 이상 연속 사용이 가능합니다. 주말 캠핑이나 장시간의 테마파크 나들이, 혹은 낚시나 등산 같은 야외 활동 시 중간에 충전할 곳을 찾아 헤맬 필요 없이 하루 종일 든든하게 당신의 땀을 식혀줍니다.' },
    { img: '4.jpg', text: '편안한 휴대성과 편의성에 최적화된 디테일이 돋보입니다. 한 손에 쏙 들어오는 인체공학적 그립감은 물론이고, 제품 패키지에 부드럽고 튼튼한 전용 넥 스트랩이 기본으로 포함되어 있습니다. 두 손에 짐이 많거나 스마트폰을 사용할 때 스트랩을 이용해 가볍게 목에 걸고 다니면 두 손이 자유로워져 활동성이 극대화됩니다. 또한 손잡이 바닥이 평평하게 디자인되어 있어 책상 위에 세워두면 훌륭한 탁상용 선풍기로 변신하는 1석 2조의 실용성을 자랑합니다.' }
  ],
  outro: '매년 여름마다 미지근한 바람만 뿜어내는 의미 없는 선풍기들에 실망하셨다면, 이제는 확실한 쿨링 솔루션을 선택해야 할 때입니다. 피부에 직접 닿는 급속 냉각 패드의 짜릿한 시원함과 강력한 바람, 그리고 하루 종일 거뜬한 대용량 배터리까지 모두 갖춘 **홈플래닛 급속 냉각 에어컨 휴대용 손 선풍기**는 그야말로 올여름 필수 생존 아이템입니다. 전용 스트랩과 함께 두 손 가볍게, 머리부터 발끝까지 상쾌한 여름을 만끽해 보시길 바랍니다.',
  summary: '시원한 급속 냉각! 홈플래닛 에어컨 휴대용 손선풍기 장단점 분석'
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
  if (row['폴더이름'] === '홈플래닛 급속 냉각 에어컨 휴대용 손 선풍기 + 스트랩') {
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
