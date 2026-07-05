const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-apgr-dial-air-shoes',
  category: '패션/잡화',
  title: '하루 1만 보도 거뜬한 발편한 운동화! APGR 다이얼 에어 워킹화 트레킹화 스펙 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\APGR 남녀공용 다이얼 에어 워킹화 발편한 쿠션 런닝화 경량 트레킹화 운동화 ID01',
  backupDir: 'D:\\정식서버업로드전용폴더\\APGR 남녀공용 다이얼 에어 워킹화 발편한 쿠션 런닝화 경량 트레킹화 운동화 ID01',
  link: 'https://link.coupang.com/a/e6XuCCS5Ke',
  iframe: '<iframe src="https://coupa.ng/cnPeaG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '최근 건강과 다이어트를 위해 걷기 운동이나 가벼운 등산을 즐기는 분들이 급증하고 있습니다. 하지만 평범한 단화나 밑창이 얇은 스니커즈를 신고 장시간 걸을 경우, 발바닥 통증(족저근막염)이나 무릎 관절에 무리가 갈 수 있어 전용 워킹화의 선택이 무엇보다 중요합니다. 수많은 스포츠 브랜드의 고가 러닝화들 사이에서 뛰어난 쿠셔닝과 혁신적인 다이얼 시스템을 장착하고도 압도적인 가성비를 보여주어 입소문을 타고 있는 \'APGR 다이얼 에어 워킹화\'의 기능성과 소재, 디자인적 장점을 상세히 파헤쳐보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 눈에 띄는 혁신은 바로 프리미엄 아웃도어 신발에 주로 적용되는 \'원터치 다이얼(Dial) 시스템\'의 탑재입니다. 끈을 묶고 풀 필요 없이 다이얼을 가볍게 누르고 돌려주는 것만으로 발등부터 발목까지 사용자의 발 모양에 맞춰 빈틈없이 밀착됩니다. 운동 중 끈이 풀려 넘어질 위험을 원천적으로 차단하며, 장갑을 낀 상태나 허리를 굽히기 힘든 어르신들도 단 1초 만에 신고 벗을 수 있는 극강의 편리함을 제공합니다.' },
    { img: '2.jpg', text: '발이 편안한 워킹화의 핵심은 하중을 분산시켜주는 미드솔에 있습니다. APGR 워킹화는 발뒤꿈치 부분에 충격 흡수에 특화된 대용량 \'에어(Air) 쿠션 캡슐\'을 장착했습니다. 발을 내디딜 때마다 지면으로부터 전달되는 충격을 에어 캡슐이 부드럽게 흡수하고 반발력으로 변환시켜 주어, 체중이 많이 나가는 분들이나 딱딱한 아스팔트 위를 오래 걷는 직장인들의 무릎과 발목 관절을 효과적으로 보호해 줍니다.' },
    { img: '3.jpg', text: '갑피(Upper) 부분은 360도 전 방향으로 공기가 순환하는 고밀도 에어 메쉬(Mesh) 소재로 제작되었습니다. 일반적인 가죽 운동화와 달리 발에서 발생하는 뜨거운 열기와 땀을 외부로 빠르게 배출해 주어, 한여름이나 강도 높은 유산소 운동 시에도 신발 내부를 항상 쾌적하고 뽀송하게 유지합니다. 땀이 차지 않아 발냄새 걱정 없이 오랜 시간 착용할 수 있는 최적의 통기성을 자랑합니다.' },
    { img: '4.jpg', text: '안전한 보행을 위해 아웃솔(밑창)의 접지력 또한 크게 강화되었습니다. 미끄럼 방지에 탁월한 특수 고무 소재를 사용하여 비 오는 날 젖은 노면이나 흙길, 험한 산길의 트레킹 코스에서도 바닥을 꽉 움켜쥐는 듯한 안정적인 그립력을 발휘합니다. 일상적인 도심 속 러닝은 물론 가벼운 하이킹이나 캠핑, 작업장 등 다양한 아웃도어 환경에서 전천후로 활용할 수 있는 다목적 기능성을 갖추었습니다.' },
    { img: '5.jpg', text: '이러한 수많은 테크니컬 기능들을 모두 담아내고도 신발 한 짝의 무게가 깃털처럼 가벼운 \'초경량\' 설계가 돋보입니다. 신발이 무거우면 발목에 피로가 쉽게 누적되지만, 이 제품은 신은 듯 안 신은 듯 가벼운 착화감을 제공하여 장거리 걷기 운동 효율을 극대화합니다. 또한, 남녀노소 누구에게나 어울리는 모던하고 스포티한 디자인과 다양한 사이즈(남녀공용)로 출시되어 커플 운동화나 부모님 효도 선물로도 손색이 없습니다.' }
  ],
  outro: 'APGR 다이얼 에어 워킹화는 값비싼 유명 브랜드 제품들과 견주어도 전혀 손색없는 프리미엄급 스펙(다이얼 시스템, 에어 쿠셔닝, 초경량 메쉬)을 갖추고도 매우 합리적인 가격대를 형성하고 있는 실속형 아이템입니다. 평소 발바닥이 아파 걷는 것이 부담스러우셨거나, 신고 벗기 편안하면서도 스타일리시한 데일리 런닝화가 필요하셨다면 주저 없이 선택해 보시길 강력히 추천해 드립니다.',
  summary: '하루 1만 보도 거뜬한 발편한 운동화! APGR 다이얼 에어 워킹화 트레킹화 스펙 분석'
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
  if (row['폴더이름'] === path.basename(product.sourceDir)) {
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
