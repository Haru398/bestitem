const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-hp-omnibook-ultra-14',
  category: '디지털',
  title: '초고성능 AI 노트북 추천! HP 2026 옴니북 Ultra 14 스펙 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\HP 2026 옴니북 Ultra 14 코어UltraX9 울트라 프로세서 시리즈3실크 샌드 알루미늄 · 14-kd0071TU · 1TB · 32GB · WIN11 Home',
  backupDir: 'D:\\정식서버업로드전용폴더\\HP 2026 옴니북 Ultra 14 코어UltraX9 울트라 프로세서 시리즈3실크 샌드 알루미늄 · 14-kd0071TU · 1TB · 32GB · WIN11 Home',
  link: 'https://link.coupang.com/a/eNNLtN2bGC',
  iframe: '<iframe src="https://coupa.ng/cnAo1z" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.jpg', '3.jpg', '4.jpg'],
  intro: '최근 노트북 시장의 가장 뜨거운 화두는 단연 \'AI(인공지능)\'입니다. 단순한 문서 작업이나 영상 시청을 넘어, 내 작업 스타일을 학습하고 효율을 극대화해 주는 똑똑한 AI 노트북에 대한 전문가들의 수요가 폭발적으로 증가하고 있는데요. 이러한 트렌드의 정점에서 압도적인 퍼포먼스와 우아한 디자인으로 시선을 사로잡는 마스터피스, 바로 **HP 2026 옴니북 Ultra 14 (14-kd0071TU)** 모델입니다.\n\n이 제품은 인텔의 최신 코어 Ultra X9 프로세서를 탑재하여 차원이 다른 연산 능력을 자랑하며, 무려 32GB의 넉넉한 램과 1TB의 광활한 저장 공간을 제공하여 무거운 영상 편집이나 복잡한 3D 렌더링 작업도 거뜬하게 소화해 냅니다. 여기에 시선을 압도하는 실크 샌드 컬러의 풀 알루미늄 바디가 더해져 프리미엄 랩탑의 품격을 완성한 HP 옴니북 Ultra 14의 독보적인 스펙을 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.png', text: '이 노트북의 심장부에는 현존 최고 수준의 모바일 프로세서인 \'인텔 코어 Ultra X9 시리즈 3\'가 탑재되어 있습니다. 강력한 코어 성능은 물론이고, AI 연산에 특화된 차세대 NPU(신경망 처리 장치)가 내장되어 있어 복잡한 머신러닝 작업이나 AI 기반의 영상/이미지 편집 프로그램들을 놀라운 속도로 처리합니다. 버벅거림 없는 압도적인 멀티태스킹 능력을 통해 크리에이터와 전문가들의 작업 시간을 획기적으로 단축시켜 줍니다.' },
    { img: '2.jpg', text: '고성능 프로세서를 완벽하게 뒷받침하기 위해 \'32GB의 대용량 고속 LPDDR5X 메모리와 1TB 초고속 NVMe SSD\'를 장착했습니다. 수십 개의 크롬 탭을 띄워놓고 4K 고화질 영상을 편집하면서도 메모리 부족으로 인한 답답함을 전혀 느낄 수 없으며, 1TB의 넉넉한 저장 공간은 외장 하드를 주렁주렁 달고 다닐 필요 없이 대용량 프로젝트 파일들을 노트북 하나에 여유롭게 보관할 수 있는 쾌적한 환경을 제공합니다.' },
    { img: '3.jpg', text: '프리미엄 노트북다운 \'실크 샌드 컬러의 풀 알루미늄 바디\'는 보는 순간 감탄을 자아냅니다. 항공우주 등급의 알루미늄 소재를 정밀하게 가공하여 지문이 잘 묻어나지 않는 고급스러운 무광 텍스처를 완성했으며, 카페나 회의실 어디에 꺼내놓아도 시선을 사로잡는 우아한 실루엣을 자랑합니다. 고강도 메탈 바디임에도 불구하고 얇고 가벼운 무게를 구현하여 매일 들고 다니는 전문가들의 든든한 파트너가 되어줍니다.' },
    { img: '4.jpg', text: '최신 \'Windows 11 Home\' 운영체제가 기본으로 탑재되어 있어, 제품을 수령하자마자 전원만 켜면 즉시 업무에 돌입할 수 있습니다. 윈도우 11의 강력한 보안 기능과 직관적인 인터페이스는 물론, HP만의 독자적인 보안 솔루션인 HP Wolf Security가 하드웨어 레벨에서부터 사이버 위협을 철벽 방어합니다. 언제 어디서나 소중한 업무 데이터와 개인 정보를 안전하게 지키면서 쾌적한 스마트 워크 환경을 누릴 수 있습니다.' }
  ],
  outro: '타협 없는 최고의 성능과 우아한 디자인, 그리고 안전한 보안까지 모두 갖춘 진정한 하이엔드 랩탑을 찾고 계셨다면 더 이상의 대안은 없습니다. 인텔 코어 Ultra X9의 파괴적인 퍼포먼스와 32GB 램의 여유, 그리고 실크 샌드 알루미늄 바디의 품격을 모두 담아낸 **HP 2026 옴니북 Ultra 14**는 여러분의 크리에이티브와 업무 효율을 한 차원 높은 곳으로 이끌어 줄 것입니다. 전문가를 위한 최고의 장비 투자를 지금 바로 시작해 보시길 강력히 추천합니다.',
  summary: '초고성능 AI 노트북 추천! HP 2026 옴니북 Ultra 14 스펙 분석'
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
  if (row['폴더이름'] === 'HP 2026 옴니북 Ultra 14 코어UltraX9 울트라 프로세서 시리즈3실크 샌드 알루미늄 · 14-kd0071TU · 1TB · 32GB · WIN11 Home') {
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
