const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-upang-bottle-sterilizer',
  category: '출산/유아동',
  title: '국민 육아템 유팡 시그니처2 플러스 젖병 소독기 UP920A 장점 및 관리 방법 완벽 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\유팡 시그니처2 플러스 젖병 소독기 UP920A',
  backupDir: 'D:\\정식서버업로드전용폴더\\유팡 시그니처2 플러스 젖병 소독기 UP920A',
  link: 'https://link.coupang.com/a/e60C1jrUyq',
  iframe: '<iframe src="https://coupa.ng/cnPgg3" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.jpg'],
  intro: '면역력이 약한 신생아를 키우는 가정에서 가장 신경 써야 할 부분 중 하나는 바로 수유 용품의 철저한 위생 관리입니다. 하루에도 여러 번 사용하는 젖병과 쪽쪽이(노리개 젖꼭지)를 매번 열탕 소독하는 것은 부모에게 큰 육아 스트레스로 다가올 수 있습니다. 이러한 수고를 덜어주고 완벽한 살균을 책임지는 \'유팡(uPang)\' 젖병 소독기는 오랫동안 대한민국 국민 육아템으로 굳건한 입지를 다져왔습니다. 특히 최신 모델인 \'유팡 시그니처2 플러스 젖병 소독기 UP920A\'는 한층 업그레이드된 살균력과 세련된 디자인으로 엄마들의 필수 출산 준비물 리스트 1순위로 꼽히고 있습니다. 이 제품이 왜 그토록 많은 사랑을 받는지 상세한 특징과 올바른 활용법을 꼼꼼하게 짚어보겠습니다.',
  sections: [
    { img: '1.png', text: '사각지대 없는 빈틈없는 3D 입체 UV 살균 기술: 젖병 내부와 젖꼭지의 미세한 틈새까지 살균하려면 빛이 닿지 않는 사각지대를 최소화하는 것이 핵심입니다. 유팡 시그니처2 플러스는 내부에 특수 고효율 반사판과 회전하는 3D 입체 자외선(UV) 살균 램프를 장착하여, 강력한 살균 광선이 소독기 내부를 촘촘하게 채워줍니다. 이로 인해 젖병이 겹치거나 구석에 놓여 있어도 대장균, 포도상구균, 살모넬라균 등 각종 유해 세균을 99.9% 완벽하게 박멸하여 우리 아이를 질병으로부터 안전하게 보호합니다.' },
    { img: '2.png', text: '공간의 품격을 높여주는 레트로 감성 시그니처 디자인: 기존의 젖병 소독기들이 다소 투박하고 전자기기 같은 차가운 느낌을 주었다면, 유팡 시그니처2 플러스는 주방이나 거실 어디에 두어도 하나의 고급스러운 오브제가 되는 감각적인 레트로 감성 디자인을 자랑합니다. 부드러운 곡선 마감과 은은하고 세련된 파스텔 톤의 컬러 라인업은 최신 인테리어 트렌드와 완벽하게 조화되며, 감성적인 공간 연출을 중요시하는 요즘 육아맘들의 취향을 완벽하게 저격했습니다.' },
    { img: '3.png', text: '넉넉한 대용량 내부 공간의 압도적인 수납력: 쌍둥이를 키우거나 혼합 수유를 하는 가정에서는 하루에 쏟아져 나오는 젖병의 양이 상당합니다. 이 제품은 이전 모델 대비 내부 공간이 더욱 넓어져 한 번에 무려 16개 이상의 젖병을 동시에 소독할 수 있는 압도적인 수납력을 자랑합니다. 젖병뿐만 아니라 이유식기, 식판, 치발기, 장난감, 그리고 부모가 사용하는 스마트폰이나 리모컨 등 다양한 생활용품까지 여유롭게 넣고 살균할 수 있어 활용도가 매우 높습니다.' },
    { img: '4.png', text: '직관적인 투도어(Two-Door) 시스템과 히든 디스플레이: 사용자의 편의성을 극대화한 투도어 시스템을 채택하였습니다. 외부 도어를 열면 젖병을 넣고 빼기 쉬운 넓은 입구가 나타나며, 내부 도어가 하나 더 있어 살균 중에도 문을 열지 않고 외부에서 작동 상태를 안전하게 확인할 수 있습니다. 외부 도어에는 평소에는 보이지 않다가 작동 시에만 나타나는 감각적인 \'히든 도트 매트릭스 디스플레이\'가 적용되어 현재 남은 시간과 진행 상태를 직관적으로 알려줍니다.' },
    { img: '5.png', text: '안전한 저온 건조 방식으로 환경호르몬 걱정 제로: 젖병을 고온으로 건조할 경우 플라스틱 소재의 변형이나 미세플라스틱, 환경호르몬 용출의 위험이 있을 수 있습니다. 유팡 소독기는 40도(℃) 이하의 안전한 저온 온도에서 적외선과 온풍을 이용해 건조하는 시스템을 갖추고 있습니다. 따라서 젖병이나 장난감의 형태가 변형되지 않고, 내열 온도가 낮은 플라스틱 제품이나 실리콘, 유리 등 다양한 소재의 용품들도 환경호르몬 걱정 없이 안심하고 건조할 수 있습니다.' },
    { img: '6.png', text: '원터치 오토 모드와 스마트 보관 기능: 바쁜 육아 중에 복잡한 조작은 금물입니다. 외부 도어에 위치한 시작 버튼을 한 번만 누르면 \'건조-살균-환기\'로 이어지는 약 40분간의 자동(오토) 모드가 실행되어 누구나 쉽게 사용할 수 있습니다. 또한 소독이 끝난 후에도 3시간마다 2분씩 자동으로 자외선 살균이 추가로 작동하는 \'보관 모드\' 기능이 탑재되어 있어, 외출 후 돌아오거나 언제든지 무균 상태의 깨끗한 젖병을 꺼내 사용할 수 있습니다.' },
    { img: '7.png', text: '주기적인 필터 교체와 램프 관리의 편리함: 소독기의 성능을 최상으로 유지하기 위해서는 내부 청결과 소모품 관리가 중요합니다. 후면의 환기구에는 미세먼지를 걸러주는 전용 필터가 장착되어 있어 깨끗한 공기만 내부로 순환시킵니다. 이 필터는 물세탁이 가능하여 관리가 매우 경제적이고 위생적입니다. 또한 수명이 다한 UV 램프는 기사 방문 없이도 사용자가 직접 간편하게 교체할 수 있도록 설계되어 있어 유지 보수가 매우 수월합니다.' },
    { img: '8.jpg', text: '출산 선물 1위의 가치와 독보적인 A/S 보장: 수많은 예비 부모들이 직접 내 돈 내산 하거나 주변 지인들에게 출산 축하 선물로 가장 많이 추천하는 데에는 이유가 있습니다. 유팡은 국내 젖병 소독기 시장을 선도해 온 1등 브랜드답게 철저한 품질 관리와 뛰어난 내구성을 인정받고 있습니다. 혹여 사용 중 잔고장이 발생하더라도 체계적이고 신속한 A/S 고객지원 센터를 운영하고 있어, 한 번 구매하면 아이가 자랄 때까지 잔걱정 없이 든든하게 사용할 수 있습니다.' }
  ],
  outro: '유팡 시그니처2 플러스 젖병 소독기 UP920A는 고된 육아의 부담을 획기적으로 덜어주고, 우리 아이의 입에 직접 닿는 용품들을 가장 안전하게 관리해 주는 최고의 육아 파트너입니다. 완벽에 가까운 3D 입체 살균력, 넉넉한 대용량, 감성적인 디자인까지 모든 것을 갖춘 이 제품은 단순히 젖병 소독을 넘어 가정 내 필수 위생 가전으로 자리매김했습니다. 소중한 내 아이를 위한 출산 준비물을 고민 중이시라면, 고민 없이 유팡 시그니처2 플러스를 선택하시어 스마트하고 편리한 육아 라이프를 시작해 보시길 강력히 권장합니다.',
  summary: '국민 육아템 유팡 시그니처2 플러스 젖병 소독기 UP920A 장점 및 관리 방법 완벽 가이드'
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
