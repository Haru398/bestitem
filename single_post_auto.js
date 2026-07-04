const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-xiaomi-67w-powerbank-20000mah',
  category: '가전/디지털',
  title: '여행용 고속 충전의 완성! 샤오미 67W 20000mAh C타입 케이블 일체형 보조배터리 스펙 및 특징 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\샤오미 Xiaomi 67W 케이블 일체형 보조 배터리 20000mAh C타입',
  backupDir: 'D:\\정식서버업로드전용폴더\\샤오미 Xiaomi 67W 케이블 일체형 보조 배터리 20000mAh C타입',
  link: 'https://link.coupang.com/a/e0xOIt5MtM',
  iframe: '<iframe src="https://coupa.ng/cnKCIz" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
  intro: '스마트폰, 태블릿, 노트북까지 다양한 스마트 기기를 동시에 사용하는 현대인들에게 고용량 보조배터리는 선택이 아닌 필수품이 되었습니다. 특히 출장이나 여행을 갈 때 케이블을 따로 챙겨야 하는 번거로움은 누구나 한 번쯤 겪어보셨을 텐데요. 이러한 불편함을 완벽하게 해소해 줄 솔루션이 등장했습니다. 바로 넉넉한 20000mAh 대용량에 최대 67W 초고속 충전을 지원하며, C타입 케이블까지 내장되어 있어 극강의 실용성을 자랑하는 \'샤오미 67W 케이블 일체형 보조배터리\'입니다. 과연 어떤 매력적인 스펙과 편의 기능을 갖추고 있는지 상세히 분석해보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 장점은 단연 \'케이블 일체형 디자인\'입니다. 배터리 본체 상단에 고품질의 C타입(USB-C) 케이블이 깔끔하게 내장되어 있어, 외출 시 엉키기 쉬운 별도의 충전 선을 따로 챙길 필요가 없습니다. 덕분에 가방이나 주머니 속이 한결 가벼워지며, 필요할 때 언제 어디서든 즉시 기기에 연결하여 빠른 충전을 시작할 수 있는 탁월한 기동성을 제공합니다.' },
    { img: '2.jpg', text: '무려 20000mAh에 달하는 초대용량 배터리를 탑재하여 하루 종일 외부 일정을 소화하더라도 배터리 방전에 대한 걱정이 전혀 없습니다. 최신 스마트폰을 여러 번 완충할 수 있는 것은 물론이며, 태블릿이나 닌텐도 스위치 같은 전력 소모가 큰 기기들까지 여유롭게 충전할 수 있어 장거리 여행이나 캠핑, 잦은 외근 시 든든한 전력 공급원 역할을 톡톡히 해냅니다.' },
    { img: '3.jpg', text: '최대 67W의 강력한 고속 충전 출력을 지원하여 답답한 충전 대기 시간을 획기적으로 줄였습니다. 스마트폰의 경우 단시간 내에 50% 이상의 배터리를 빠르게 채워주며, 높은 전력을 요구하는 일부 C타입 충전 지원 노트북(맥북 등)까지도 비상시 무난하게 충전할 수 있는 스펙을 자랑합니다. 바쁜 일상 속에서 스피디한 배터리 관리가 필수적인 분들에게 최적화된 성능입니다.' },
    { img: '4.jpg', text: '다양한 기기를 동시에 충전할 수 있는 멀티 포트 구성을 갖추고 있습니다. 내장된 일체형 C타입 케이블 외에도 추가적인 USB-C 포트와 USB-A 포트가 마련되어 있어, 최대 3대의 스마트 기기를 동시에 연결하여 효율적으로 전력을 공급할 수 있습니다. 친구나 가족과 함께 여행할 때 배터리 하나로 모두의 스마트폰을 충전할 수 있어 활용도가 매우 높습니다.' },
    { img: '5.jpg', text: '샤오미만의 엄격한 안전 설계와 스마트 칩셋이 적용되어 충전 시 발생할 수 있는 다양한 위험으로부터 기기를 안전하게 보호합니다. 과충전 방지, 과방전 보호, 온도 제어 시스템 및 단락 보호 등 다중 안전 회로가 탑재되어 있어, 값비싼 최신 스마트 기기들을 발열이나 과전압 손상 걱정 없이 안심하고 충전할 수 있습니다.' },
    { img: '6.jpg', text: '직관적인 LED 배터리 잔량 표시등이 탑재되어 사용 편의성을 더욱 높였습니다. 버튼을 살짝 누르는 것만으로 현재 남아있는 배터리 용량을 정확하게 수치로 확인할 수 있어, 언제 배터리 본체를 재충전해야 할지 쉽게 파악할 수 있습니다. 불필요하게 배터리가 방전되는 불상사를 미연에 방지할 수 있는 작지만 매우 유용한 기능입니다.' },
    { img: '7.jpg', text: '비행기 기내 반입이 가능한 용량 한도를 준수하여 설계되었기 때문에 해외여행이나 출장 시 수하물 검사에서 제지당할 염려 없이 안전하게 휴대할 수 있습니다. 20000mAh 대용량임에도 불구하고 여행용 가방에 쏙 들어가는 콤팩트한 사이즈와 매끄러운 마감 처리가 돋보이며, 모던하고 깔끔한 외관 디자인 덕분에 어떤 환경에서도 세련되게 잘 어울립니다.' },
    { img: '8.jpg', text: '블루투스 이어폰이나 스마트 밴드 같은 소형 웨어러블 기기를 안전하게 충전할 수 있는 \'저전력 충전 모드\'를 완벽하게 지원합니다. 일반적인 고속 충전 방식은 미세한 전력을 요구하는 소형 기기에 무리를 줄 수 있지만, 이 제품은 버튼을 연속으로 두 번 누르면 저전력 모드로 전환되어 웨어러블 기기의 배터리 수명 저하 없이 알맞은 전압으로 최적의 충전을 제공합니다.' }
  ],
  outro: '결론적으로 샤오미 67W 20000mAh 케이블 일체형 보조배터리는 \'초대용량\', \'초고속 충전\', \'내장 케이블의 편리함\'이라는 삼박자를 모두 갖춘 완성형 모바일 액세서리입니다. 여러 개의 기기를 동시에 운용하거나 장시간 외출이 잦은 분들에게 충전 스트레스를 한 번에 날려줄 확실한 대안이 될 것입니다.',
  summary: '여행용 고속 충전의 완성! 샤오미 67W 20000mAh C타입 케이블 일체형 보조배터리 스펙 및 특징 분석'
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
