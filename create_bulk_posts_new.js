const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const products = [
  {
    id: 'item-hera-cleansing-foam',
    category: '뷰티/화장품',
    title: '모공까지 완벽하게 비워주는 프리미엄 클렌징! 헤라 리프레싱 클렌징 폼 160g 상세 분석',
    sourceDir: 'D:\\정식홈페이지자동화\\헤라 리프레싱 클렌징 폼, 160g, 1개',
    backupDir: 'D:\\정식서버업로드전용폴더\\헤라 리프레싱 클렌징 폼, 160g, 1개',
    link: 'https://link.coupang.com/a/eKTh2TM4my',
    iframe: '<iframe src="https://coupa.ng/cnx0FT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
    intro: '매일 아침저녁으로 하는 세안, 혹시 아직도 뽀드득거리는 자극적인 클렌징 폼을 사용하고 계신가요? 피부 관리의 가장 기본이자 핵심은 바로 \'클렌징\'입니다. 메이크업 잔여물과 미세먼지로 지친 피부를 자극 없이 편안하게 달래면서도 모공 속 노폐물은 확실하게 비워내는 완벽한 클렌저를 찾고 계신 분들을 위해, 아모레퍼시픽의 독보적인 기술력이 담긴 프리미엄 클렌저 **헤라 리프레싱 클렌징 폼 160g**을 강력하게 추천해 드립니다.\n\n수많은 뷰티 인플루언서들과 코덕들 사이에서 \'클렌징 폼 정착템\'으로 꼽히는 이 제품은, 피부의 수분은 그대로 남겨두고 불필요한 노폐물만 선택적으로 제거하는 놀라운 세정력을 자랑합니다. 특히 피부가 얇고 예민해지는 환절기나 트러블이 잦은 지복합성 피부 타입도 안심하고 사용할 수 있는 마일드한 처방이 특징입니다. 헤라만의 고급스러운 향기와 풍성한 거품이 선사하는 차원이 다른 클렌징 경험, 지금부터 세세하게 파헤쳐 보겠습니다.',
    sections: [
      { img: '1.png', text: '이 제품의 가장 큰 매력은 바로 얼굴에 닿는 순간 느껴지는 쫀쫀하고 조밀한 \'미세 탄력 거품\'입니다. 소량만 짜서 손으로 가볍게 비벼주어도 생크림처럼 풍성하고 부드러운 거품이 몽글몽글 피어납니다. 이 미세 거품이 피부 표면의 마찰을 최소화하여 세안 시 발생하는 물리적인 자극을 줄여주며, 손끝이 피부에 닿지 않는 완벽한 폼 세안을 가능하게 해 줍니다.' },
      { img: '2.png', text: '단순히 부드럽기만 한 것이 아닙니다. 촘촘한 미세 거품 입자가 모공 속 깊숙이 숨어있는 초미세먼지와 묵은 각질, 보이지 않는 메이크업 잔여물까지 자석처럼 강력하게 흡착하여 깨끗하게 비워냅니다. 세안 후 거울을 보면 피부 톤이 한층 맑아지고 모공 사이사이가 숨을 쉬는 듯한 놀라운 개운함을 즉각적으로 경험하실 수 있습니다.' },
      { img: '3.png', text: '클렌징 폼의 가장 치명적인 단점인 세안 후 속당김 현상을 완벽하게 해결했습니다. 보습 효과가 뛰어난 천연 유래 추출물과 히알루론산 성분이 듬뿍 함유되어 있어, 피부의 노폐물은 씻어내고 그 자리에 수분 막을 촘촘하게 채워줍니다. 수건으로 물기를 닦아낸 직후에도 피부가 당기거나 건조해지지 않고 스킨케어를 바른 듯 촉촉하고 유연한 상태를 오랜 시간 유지해 줍니다.' },
      { img: '4.png', text: '향기 맛집으로 소문난 헤라답게, 세안하는 내내 기분까지 맑게 정화해 주는 은은하고 고급스러운 시트러스 플로럴 향이 코끝을 맴돕니다. 인위적이고 머리 아픈 인공 향료가 아닌 릴렉싱에 도움을 주는 프레쉬한 향기 덕분에 하루의 시작과 끝을 장식하는 클렌징 시간이 나만의 프라이빗한 홈 스파 시간으로 변모하는 마법을 선사합니다.' },
      { img: '5.png', text: '피부과 테스트와 안자극 대체 테스트를 모두 가볍게 통과한 저자극 포뮬러로 극민감성 피부도 트러블 걱정 없이 매일 안심하고 사용할 수 있습니다. 160g의 넉넉한 대용량 사이즈로 소량만 사용해도 거품이 풍성하게 나기 때문에 가성비 측면에서도 매우 뛰어나며, 가족 모두가 함께 사용하기에 완벽한 욕실 필수템입니다.' }
    ],
    outro: '메이크업보다 중요한 것은 메이크업을 지우는 과정입니다. 거칠고 자극적인 세안으로 매일 피부 장벽을 무너뜨리고 계셨다면, 이제는 피부가 먼저 편안함을 알아보는 **헤라 리프레싱 클렌징 폼**으로 클렌징 루틴을 완벽하게 업그레이드해 보세요! 촉촉함과 개운함이라는 두 마리 토끼를 동시에 잡은 이 프리미엄 클렌저가 여러분의 피부 결을 투명하고 매끄럽게 가꾸어 줄 가장 든든한 뷰티 파트너가 되어줄 것입니다.',
    summary: '모공까지 완벽하게 비워주는 프리미엄 클렌징! 헤라 리프레싱 클렌징 폼 160g 상세 분석'
  },
  {
    id: 'item-haru-nuts-origins',
    category: '식품',
    title: '매일 챙기는 건강 습관! 하루견과 넛츠 오리진스 믹스넛 30개입 대용량 추천 리뷰',
    sourceDir: 'D:\\정식홈페이지자동화\\하루견과 넛츠 오리진스 믹스넛, 20g, 30개',
    backupDir: 'D:\\정식서버업로드전용폴더\\하루견과 넛츠 오리진스 믹스넛, 20g, 30개',
    link: 'https://link.coupang.com/a/eKTDTFoLx6',
    iframe: '<iframe src="https://coupa.ng/cnx0Xa" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png'],
    intro: '바쁜 일상 속에서 면역력이 떨어지고 피로가 누적될 때, 가장 쉽고 간편하게 영양을 채울 수 있는 방법이 바로 \'견과류 섭취\'입니다. 세계 10대 슈퍼푸드로 선정될 만큼 몸에 좋은 불포화지방산과 각종 비타민이 풍부한 견과류! 하지만 종류별로 따로 구매하자니 보관이 번거롭고 산패되기 십상입니다. 이런 현대인들의 고민을 완벽하게 해결해 줄 건강한 파트너, 프리미엄 견과류의 정석 **하루견과 넛츠 오리진스 믹스넛 20g 30개입**을 소개합니다.\n\n시중에 판매되는 수많은 하루 견과 제품 중에서도 이 제품이 유독 사랑받는 이유는 건포도나 크랜베리 같은 값싼 건과일로 중량을 채우지 않고, 오직 고급 견과류만으로 100% 꽉 채운 프리미엄 라인업이기 때문입니다. 다이어터의 영양 간식부터 직장인들의 오후 활력소, 성장기 아이들의 두뇌 발달 간식까지! 남녀노소 모두의 입맛과 건강을 확실하게 책임져 줄 넛츠 오리진스의 매력 포인트를 상세하게 분석해 보겠습니다.',
    sections: [
      { img: '1.png', text: '이 제품의 가장 큰 경쟁력은 군더더기 없이 깔끔하고 고급스러운 \'프리미엄 견과류 100%\' 구성입니다. 호두, 볶음 아몬드, 구운 캐슈넛, 마카다미아 등 전 세계 최고 등급의 산지에서 엄선한 4가지 핵심 견과류가 완벽한 황금 비율로 믹스되어 있습니다. 호불호가 갈리는 건과일의 찐득한 식감이나 강한 단맛을 배제하여, 견과류 본연의 깊고 고소한 풍미만을 온전히 즐기고 싶은 분들에게 최적화된 고급스러운 맛을 자랑합니다.' },
      { img: '2.png', text: '견과류의 생명은 신선함과 바삭함입니다. 넛츠 오리진스는 견과류의 산패를 완벽하게 차단하기 위해 첨단 알루미늄 증착 필름 포장재를 사용하였으며, 내부에 질소를 충전하여 갓 로스팅한 듯한 극강의 바삭함을 오래도록 유지합니다. 쩐내나 눅눅함이 전혀 없어 봉지를 뜯는 순간 고소한 향이 확 퍼지며 마지막 한 알까지 오독오독 씹어 먹는 즐거움을 선사합니다.' },
      { img: '3.png', text: '영양학적으로 가장 이상적인 하루 섭취량인 20g에 맞춰 개별 소포장되어 있어 휴대성이 매우 뛰어납니다. 바쁜 출근길 가방이나 주머니에 쏙 챙겨 넣기 좋으며, 사무실 서랍이나 자동차 안에 두고 출출할 때마다 꺼내 먹기 완벽한 사이즈입니다. 과다 섭취로 인한 칼로리 오버를 방지하고 매일 일정한 영양을 공급할 수 있도록 돕는 똑똑한 패키징입니다.' },
      { img: '4.png', text: '활용도가 높아 섭취 방법이 무궁무진합니다. 그냥 간식으로 먹어도 훌륭하지만, 아침 식사 대용으로 우유나 시리얼, 무가당 요거트에 토핑으로 얹어 먹으면 포만감과 영양을 동시에 잡을 수 있습니다. 또한, 다이어트 중 샐러드에 곁들여 먹거나 베이킹 재료로 활용하기에도 손색이 없어 매일 먹어도 절대 질리지 않는 만능 식재료입니다.' },
      { img: '5.png', text: '무려 30봉지가 들어있는 넉넉한 대용량 패키지는 온 가족이 매일 하나씩 챙겨 먹어도 한 달을 버틸 수 있는 엄청난 가성비를 자랑합니다. 고급스러운 디자인의 박스에 담겨 있어 명절이나 어버이날, 고마운 지인들에게 마음을 전하는 건강 선물용으로도 강력하게 추천해 드립니다. 맛과 영양, 포장까지 어느 하나 빠지는 곳이 없는 무결점 제품입니다.' }
    ],
    outro: '건강을 위한 작은 습관, 하루 한 봉지의 견과류가 내일의 내 몸을 바꿉니다! 싸구려 건과일로 눈속임하지 않고 오직 프리미엄 견과의 고소함으로 승부하는 **하루견과 넛츠 오리진스 믹스넛**! 다이어트를 계획 중이시거나 온 가족이 함께 즐길 수 있는 영양 만점 웰빙 간식을 찾고 계신다면 더 이상 망설이지 마세요. 매일 뜯는 즐거움과 함께 활기차고 건강한 하루를 시작해 보시길 강력히 추천드립니다.',
    summary: '매일 챙기는 건강 습관! 하루견과 넛츠 오리진스 믹스넛 30개입 대용량 추천 리뷰'
  }
];

function sanitizeString(str) {
  return str.replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
}

for (const product of products) {
  const publicImgDir = path.join(__dirname, 'public', 'images');
  
  const thumbnailExt = path.extname(product.images[0]);
  const thumbnailFilename = sanitizeString(product.id) + '_thumb' + Date.now() + thumbnailExt;
  const thumbnailDest = path.join(publicImgDir, thumbnailFilename);
  fs.copyFileSync(path.join(product.sourceDir, product.images[0]), thumbnailDest);
  const thumbnailUrl = '/images/' + thumbnailFilename;
  
  const additionalImageUrls = [];
  const additionalImages = product.images.slice(1, 5);
  
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
}

const wb = xlsx.readFile('D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

for (let row of data) {
  if (!row['작업여부'] || row['작업여부'].trim() === '') {
    row['작업여부'] = 'O';
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
