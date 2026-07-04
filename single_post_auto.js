const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-aire-car-vacuum-cleaner',
  category: '자동차용품',
  title: '세차장 갈 필요 없는 강력한 흡입력! 에어르 무선 차량용 청소기 (에어건 겸용) 완벽 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\한국AS 에어르 차량용 청소기 에어건 무선 자동차 휴대용 강력 진공 핸디 차 미니 베놈',
  backupDir: 'D:\\정식서버업로드전용폴더\\한국AS 에어르 차량용 청소기 에어건 무선 자동차 휴대용 강력 진공 핸디 차 미니 베놈',
  link: 'https://link.coupang.com/a/e6UEgeKhiu',
  iframe: '<iframe src="https://coupa.ng/cnPbPZ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'],
  intro: '자동차 실내는 신발에 묻어 들어온 모래, 과자 부스러기, 미세먼지 등 각종 오염물질에 끊임없이 노출됩니다. 매번 세차장에 가서 동전을 넣고 진공청소기를 사용하기에는 시간과 비용이 부담스럽고, 기존에 구매했던 저가형 핸디 청소기들은 흡입력이 약해 제대로 청소가 되지 않아 스트레스를 받는 분들이 많습니다. 이러한 고민을 단번에 해결해 줄 혁신적인 차량용 아이템, \'에어르 강력 무선 차량용 청소기\'를 소개합니다. 진공 청소는 물론, 에어건 기능까지 하나로 합쳐진 투인원(2-in-1) 방식의 이 다재다능한 제품이 왜 자동차 오너들의 필수품으로 불리는지 그 스펙과 활용법을 자세히 알아보겠습니다.',
  sections: [
    { img: '1.png', text: '이 제품의 가장 눈에 띄는 장점은 작고 가벼운 콤팩트 디자인입니다. 한 손에 쏙 들어오는 미니멀한 사이즈와 가벼운 무게 덕분에 손목에 무리 없이 누구나 쉽게 사용할 수 있습니다. 글로브 박스(다시방)나 도어 포켓, 센터 콘솔 등 차량 내부의 좁은 수납공간에도 여유롭게 보관할 수 있어 굳이 트렁크까지 갈 필요 없이 필요할 때 언제든 즉시 꺼내어 실내를 깔끔하게 유지할 수 있는 극강의 휴대성을 제공합니다.' },
    { img: '2.png', text: '작은 크기에 속아서는 안 됩니다. 내부에 탑재된 초고속 BLDC 모터는 상상을 초월하는 강력한 흡입력을 발휘합니다. 발매트 깊숙이 박힌 모래 알갱이나 시트 틈새에 낀 반려동물의 털, 눈에 잘 보이지 않는 미세먼지까지 놓치지 않고 강력하게 빨아들입니다. 유선 청소기 부럽지 않은 퍼포먼스 덕분에, 더 이상 좁은 틈새의 먼지 때문에 스트레스받을 필요가 없습니다.' },
    { img: '3.png', text: '에어르 청소기의 가장 큰 특징 중 하나는 바로 \'강력한 에어건(Air Gun)\' 기능이 내장되어 있다는 점입니다. 단순히 먼지를 빨아들이는 것을 넘어, 송풍 기능을 이용해 키보드 틈새나 에어컨 송풍구 등 브러시가 닿기 힘든 곳의 먼지를 시원하게 불어낼 수 있습니다. 세차 후 사이드미러나 문틈에 고인 물기를 날려버리는 데에도 탁월하여, 실내외 세차의 디테일을 한 단계 끌어올려 줍니다.' },
    { img: '4.png', text: '다양한 상황에 맞게 교체하여 사용할 수 있는 맞춤형 멀티 노즐 세트가 기본으로 제공됩니다. 좁고 깊숙한 틈새용 롱 노즐, 시트나 카펫의 먼지를 긁어내며 흡입하는 브러시 노즐, 에어건용 송풍 노즐 등 차량 내부의 어떤 복잡한 구조에도 완벽하게 대응할 수 있습니다. 청소 부위에 맞는 노즐을 적재적소에 활용하면 청소 시간은 단축되고 효율은 극대화됩니다.' },
    { img: '5.png', text: '차량 내부 청소 시 발생하는 미세먼지가 호흡기로 다시 배출되는 것을 막아주는 고성능 헤파(HEPA) 필터가 장착되어 있습니다. 초미세먼지까지 걸러주는 이 필터 덕분에 밀폐된 자동차 안에서도 안심하고 청소할 수 있으며, 필터는 간편하게 분리하여 물세척이 가능하므로 항상 위생적이고 반영구적으로 사용할 수 있어 유지비용 걱정도 없습니다.' },
    { img: '6.png', text: '충전의 번거로움을 최소화하기 위해 범용성이 뛰어난 USB 타입-C(Type-C) 충전 포트가 적용되었습니다. 가정이나 사무실은 물론, 차량 내부의 시가잭 충전기나 보조배터리로도 손쉽게 충전할 수 있어 배터리 방전 시에도 언제 어디서나 빠르게 전력을 공급받을 수 있습니다. 고용량 배터리가 탑재되어 한 번 완충으로 차량 전체를 여유롭게 청소할 수 있는 넉넉한 사용 시간을 자랑합니다.' },
    { img: '7.png', text: '가장 안심할 수 있는 부분은 바로 확실하고 빠른 \'한국 공식 A/S\' 지원입니다. 해외 직구 제품이나 저가형 중국산 청소기들의 경우 고장 시 수리를 받지 못해 버려야 하는 일이 비일비재하지만, 에어르 제품은 국내 정식 통관을 거친 제품으로 체계적인 고객 지원 및 사후 관리를 받을 수 있어 오랫동안 고장 걱정 없이 든든하게 사용할 수 있습니다.' }
  ],
  outro: '에어르 강력 무선 차량용 청소기는 흡입과 송풍 두 가지 기능을 완벽하게 소화해 내는 투인원 스마트 디바이스입니다. 압도적인 흡입력, 다용도 에어건 기능, 간편한 C타입 충전, 그리고 든든한 국내 A/S까지 차량용 청소기가 갖춰야 할 모든 미덕을 콤팩트한 바디 안에 모두 담아냈습니다. 언제나 쾌적하고 깨끗한 자동차 실내 환경을 유지하고 싶은 오너분들께 이 제품을 자신 있게 추천합니다.',
  summary: '세차장 갈 필요 없는 강력한 흡입력! 에어르 무선 차량용 청소기 (에어건 겸용) 완벽 가이드'
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
