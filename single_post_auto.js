const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-iocomma-pet-pdrn-cream',
  category: '반려동물',
  title: '강아지 발바닥 갈라짐 완벽 케어! 아이오콤마 PDRN 보습 크림 추천',
  sourceDir: 'D:\\정식홈페이지자동화\\아이오콤마 반려동물 PDRN 크림 발바닥보호제, 1개, 60ml',
  backupDir: 'D:\\정식서버업로드전용폴더\\아이오콤마 반려동물 PDRN 크림 발바닥보호제, 1개, 60ml',
  link: 'https://link.coupang.com/a/eM8DY6oFIy',
  iframe: '<iframe src="https://coupa.ng/cnz6xc" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  intro: '사랑하는 우리 강아지와 매일 즐기는 신나는 산책 시간! 하지만 산책 후 발을 닦아줄 때마다 아이의 발바닥 패드가 거칠거칠하게 갈라지거나 딱딱하게 굳어있는 것을 발견하고 속상하셨던 경험, 반려인이라면 누구나 한 번쯤 있으실 겁니다. 뜨거운 아스팔트와 차가운 겨울바닥 등 가혹한 환경에 맨발로 노출되는 강아지의 발바닥은 사람의 손발보다 훨씬 예민하고 취약하여 세심한 관리가 필수적입니다. 거칠어진 아이의 발바닥에 즉각적인 수분과 재생 에너지를 불어넣어 줄 프리미엄 홈케어의 결정판, **아이오콤마 반려동물 PDRN 크림 발바닥보호제**를 자신 있게 추천합니다.\n\n이 제품은 단순한 보습을 넘어 피부 재생에 탁월한 효과가 있다고 알려진 고가의 원료 \'PDRN\'을 아낌없이 담아낸 프리미엄 제품입니다. 시중에 판매되는 흔한 바셀린이나 끈적이는 연고와는 달리, 마치 사람 피부에 바르는 최고급 영양 크림처럼 부드럽게 스며들어 손상된 패드를 빠르게 회복시키고 촉촉함을 오랫동안 유지해 줍니다. 핥아도 안전한 성분으로 만들어져 더욱 믿음이 가는 아이오콤마 발바닥 크림만의 독보적인 효능과 성분 이야기를 지금부터 아주 상세하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 크림의 가장 핵심적인 경쟁력은 바로 \'PDRN(연어 DNA 추출물)\' 성분입니다. 피부과나 성형외과에서 고가의 재생 치료 목적으로 널리 사용되는 이 PDRN 성분은, 강아지의 손상되고 갈라진 발바닥 패드 세포의 재생을 극대화하여 본연의 말랑말랑하고 탄력 있는 상태로 빠르게 되돌려줍니다. 딱딱한 굳은살을 부드럽게 연화시키는 동시에 상처 난 부위의 빠른 회복을 도와주어 근본적인 발바닥 피부 건강을 끌어올려 줍니다.' },
    { img: '2.jpg', text: '강아지 몸에 직접 바르는 제품인 만큼 가장 걱정되는 부분이 바로 \'성분\'입니다. 아이들은 발에 무언가를 바르면 무조건 핥으려는 본능이 있기 때문인데요. 이 제품은 전 성분 EWG 그린 등급의 100% 자연 유래 성분만을 엄선하여 제조되었으며, 인공 향료나 색소, 화학 방부제 등 유해 의심 물질을 철저하게 배제했습니다. 아이가 아무리 핥아먹어도 전혀 걱정 없는 완벽한 안심 포뮬러를 자랑합니다.' },
    { img: '3.jpg', text: '끈적이고 미끌거리는 사용감은 반려견도, 반려인도 모두 스트레스를 받게 합니다. 바닥에 발자국이 남거나 털이 떡지는 기존 밤(Balm) 타입 제품들의 치명적인 단점을 완벽하게 개선하여, 수분감이 톡톡 터지는 \'에센스 제형\'으로 개발되었습니다. 발바닥에 바르는 즉시 겉돌지 않고 빠르게 싹 흡수되어 산뜻하게 마무리되며, 바른 직후 아이가 곧바로 돌아다녀도 방바닥에 미끄러지거나 자국을 남기지 않아 매우 위생적입니다.' },
    { img: '4.jpg', text: '수분을 공급하는 것에 그치지 않고, 그 수분이 날아가지 않도록 꽉 잠가주는 \'3중 보습 장벽 기술\'이 적용되어 있습니다. 세라마이드와 쉐어버터, 히알루론산이 황금 비율로 배합되어 발바닥 패드 표면에 강력한 수분 보호막을 형성하여 건조한 실내 환경이나 매서운 바깥바람 앞에서도 하루 종일 촉촉한 보습력을 짱짱하게 유지해 줍니다.' },
    { img: '5.jpg', text: '위생적이고 편리한 사용을 위해 튜브 타입의 용기에 60ml의 넉넉한 용량을 담아냈습니다. 손가락으로 퍼서 써야 하는 단지형 용기처럼 오염될 우려가 전혀 없으며, 원하는 부위에 필요한 양만큼만 깔끔하게 짜서 사용할 수 있어 매우 경제적입니다. 콤팩트한 사이즈로 산책 가방이나 여행용 가방에 쏙 들어가 휴대성 또한 뛰어나 언제 어디서나 즉각적인 보습 케어가 가능합니다.' }
  ],
  outro: '산책의 즐거움은 건강한 두 발에서부터 시작됩니다. 아이의 발바닥 패드가 건조하여 피가 나거나 미끄러운 실내 바닥에서 자주 미끄러져 슬개골 탈구가 걱정되셨다면, 이제 미루지 말고 매일 밤 부드러운 마사지와 함께 촉촉함을 선물해 주세요. 고가의 재생 성분인 PDRN이 듬뿍 담긴 **아이오콤마 반려동물 PDRN 크림 발바닥보호제** 하나면, 우리 아이의 발바닥을 다시 아기 때처럼 말랑말랑하고 핑크빛 도는 건강한 상태로 되돌릴 수 있습니다. 지금 바로 선택해 보세요!',
  summary: '강아지 발바닥 갈라짐 완벽 케어! 아이오콤마 PDRN 보습 크림 추천'
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
  if (row['폴더이름'] === '아이오콤마 반려동물 PDRN 크림 발바닥보호제, 1개, 60ml') {
    row['작업여부'] = 'O';
    break;
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
