const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-illiyoon-ceramide-cream',
  category: '패션/뷰티',
  title: '건조한 피부를 위한 보습 솔루션 일리윤 세라마이드 아토 집중크림 230ml 성분 분석 및 사용 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\일리윤 세라마이드 아토 집중크림, 230ml, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\일리윤 세라마이드 아토 집중크림, 230ml, 1개',
  link: 'https://link.coupang.com/a/eTIDK0JnS8',
  iframe: '<iframe src="https://coupa.ng/cnFtLT" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
  intro: '환절기나 건조한 겨울철이 되면 피부 장벽이 무너져 하얗게 각질이 일어나거나 극심한 가려움증을 호소하는 분들이 많습니다. 이런 피부 고민의 근본적인 해결책은 피부 본연의 장벽을 강화하고 수분이 날아가지 않도록 꽉 잡아주는 세라마이드 성분을 보충해 주는 것입니다. 수많은 보습제 중에서도 온 가족이 안심하고 사용할 수 있는 성분과 탁월한 보습력으로 \'국민 바디크림\'이라 불리는 **일리윤 세라마이드 아토 집중크림 230ml**의 성분 비밀과 100% 활용 가이드를 심층적으로 분석해 보겠습니다.\n\n이 제품은 연약한 아기 피부부터 성인의 극건성 피부까지 모두를 아우르는 저자극 포뮬러로 기획되었습니다. 특히 일반적인 바디로션보다 훨씬 농밀하고 쫀쫀한 크림 제형을 채택하여, 한 번만 발라도 깊고 진한 보습감이 오랜 시간 지속되는 것이 가장 큰 특징입니다.',
  sections: [
    { img: '1.jpg', text: '이 크림의 가장 핵심적인 보습 원리는 독자 개발 성분인 \'세라마이드 스킨 콤플렉스(Ceramide Skin Complex™)\'에 있습니다. 피부 각질층을 구성하는 중요 성분인 세라마이드를 피부에 잘 스며들도록 캡슐화한 기술로, 바르는 순간 미세한 알갱이 형태의 세라마이드 캡슐이 톡톡 터지면서 피부 깊숙한 곳까지 유효 성분을 안전하게 전달합니다. 겉돌지 않고 속까지 꽉 채워주는 보습의 비밀이 바로 여기에 있습니다.' },
    { img: '2.jpg', text: '세라마이드와 함께 피부 장벽을 탄탄하게 세워주는 시너지 성분인 \'피토소이(Phyto Soy)\'가 함유되어 있습니다. 발효된 콩에서 추출한 이 자연 유래 펩타이드 성분은 외부 자극으로 인해 예민해지고 붉어진 피부를 편안하게 진정시키는 데 탁월한 효과를 발휘합니다. 외부 환경에 쉽게 자극받는 아토피성 피부나 민감성 피부 사용자들에게 특히 환영받는 이유이기도 합니다.' },
    { img: '3.jpg', text: '보습력만큼이나 중요한 것이 바로 안전성입니다. 일리윤 아토 집중크림은 파라벤, 동물성 원료, 광물성 오일, 합성 색소, 향료 등 피부에 자극을 줄 수 있는 7가지 특정 화학 성분을 철저하게 배제한 \'7 FREE 포뮬러\'로 설계되었습니다. 따라서 신생아나 영유아가 사용해도 안전하며, 임산부 튼살 방지용 크림이나 온 가족 공용 보습제로 안심하고 두고 쓸 수 있는 훌륭한 범용성을 지니고 있습니다.' },
    { img: '4.jpg', text: '제형은 수분감이 꽉 찬 \'고농축 크림 타입\'입니다. 로션과 연고의 중간 정도 되는 쫀쫀한 텍스처를 가지고 있지만, 막상 피부에 펴 바르면 체온에 의해 부드럽게 녹아들며 놀라울 정도로 빠르게 흡수됩니다. 고보습 제품 특유의 끈적임이나 미끈거리는 잔여감이 거의 남지 않아, 샤워 후 크림을 듬뿍 바르고 곧바로 옷을 입어도 전혀 불편함이 없는 쾌적한 사용감을 선사합니다.' },
    { img: '5.jpg', text: '크림 제형 안에 들어있는 하얀색 \'세라마이드 알갱이\'는 눈으로 직접 확인할 수 있습니다. 롤링하며 마사지하듯 부드럽게 문질러 주면 캡슐이 피부 온도에 부드럽게 녹아 흡수되는데, 이 과정 자체가 건조한 피부에 즉각적인 수딩 팩을 얹어놓은 듯한 깊은 보습감과 윤기를 부여합니다. 까칠했던 피부 결이 즉각적으로 매끄러워지는 것을 손끝으로 느낄 수 있습니다.' },
    { img: '6.jpg', text: '얼굴부터 발끝까지 전신에 사용할 수 있는 올인원(All-in-one) 크림이라는 점도 매력적입니다. 바디 전용으로 나왔지만 순한 성분 덕분에 건조함이 심한 얼굴이나 목 부위에 스킨케어 마지막 단계의 수면팩 대용으로 활용해도 전혀 부담이 없습니다. 특히 팔꿈치, 발뒤꿈치, 무릎 등 유독 하얗게 각질이 뜨기 쉬운 국소 부위에는 한 번 더 덧발라주면 훌륭한 각질 케어 효과를 기대할 수 있습니다.' },
    { img: '7.jpg', text: '무향(Fragrance-free) 제품이라는 것은 호불호 없는 사용성의 핵심입니다. 인공적인 향료가 첨가되지 않아 후각이 예민한 임산부나 향에 민감한 남성분들도 거부감 없이 사용할 수 있습니다. 기존에 본인이 즐겨 사용하는 향수나 바디 미스트의 향취를 전혀 방해하지 않고 온전히 보습의 기능에만 충실하다는 점은 이 제품이 가진 숨겨진 메리트 중 하나입니다.' },
    { img: '8.jpg', text: '화해 등 주요 뷰티 애플리케이션과 커뮤니티에서 진행한 각종 테스트에서 압도적인 만족도와 보습 유지력을 증명해냈습니다. 민감성 패널 테스트와 알러지 테스트는 물론, 피부과 테스트까지 깐깐한 3대 안전성 테스트를 모두 통과하여 단순히 입소문만 좋은 화장품이 아니라 피부 과학이 입증한 신뢰할 수 있는 더마 스킨케어 제품임을 명확히 보여줍니다.' },
    { img: '9.jpg', text: '보습 시너지를 극대화하는 올바른 사용법입니다. 세라마이드의 흡수율을 가장 높이려면 샤워나 목욕을 마친 후 물기를 수건으로 가볍게 두드려 닦아낸 직후, 피부에 약간의 수분감이 남아있는 상태인 \'3분 이내\'에 듬뿍 발라주는 것이 좋습니다. 건조한 피부 표면의 수분이 증발하기 전에 크림이 수분 막을 형성하여 촉촉함을 몇 배로 더 오래 유지시켜 줍니다.' },
    { img: '10.jpg', text: '사용량을 섬세하게 조절할 수 있는 튜브 타입 패키지는 위생적이고 실용적입니다. 230ml의 넉넉한 용량으로 한 계절 내내 아낌없이 사용할 수 있으며, 끝까지 짜서 쓰기 좋은 부드러운 튜브 소재로 제작되었습니다. 단지(Jar) 형태의 크림과 달리 공기 접촉이나 손가락에 의한 오염을 차단할 수 있어 마지막 한 방울까지 깨끗하게 사용할 수 있습니다.' },
    { img: '11.jpg', text: '이 제품은 온 가족의 든든한 피부 방패막이 되어주는 생활 필수품으로 자리 잡았습니다. 화장대에 하나, 욕실에 하나 두고 건조함이 느껴질 때마다 수시로 덧발라주면 긁어서 생기는 피부 상처나 극심한 속당김으로부터 완벽하게 해방될 수 있습니다. 끈적임 없는 고보습의 정석을 보여주는 제품으로 거칠어진 피부 컨디션을 빠르게 끌어올려 줍니다.' }
  ],
  outro: '매일 마주하는 건조함과 각질, 그리고 그로 인한 피부의 가려움은 삶의 질을 크게 떨어뜨립니다. 일시적으로 겉만 번지르르하게 만들어주는 보습이 아닌, 세라마이드 캡슐로 피부 속 장벽부터 탄탄하게 재건해 주는 진짜 보습을 원하신다면 **일리윤 세라마이드 아토 집중크림**이 명확한 해답입니다. 순한 성분과 강력한 보습력을 동시에 갖춘 이 제품으로 언제나 매끄럽고 건강한 피부를 유지해 보시길 적극 권장합니다.',
  summary: '건조한 피부를 위한 보습 솔루션 일리윤 세라마이드 아토 집중크림 230ml 성분 분석 및 사용 가이드'
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
  if (row['폴더이름'] === '일리윤 세라마이드 아토 집중크림, 230ml, 1개') {
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
