const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-ottogi-white-rice',
  category: '식품',
  title: '가성비 자취생 쟁여템! 오뚜기 맛있는 밥 210g 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\오뚜기 흰밥, 210g, 36개',
  backupDir: 'D:\\정식서버업로드전용폴더\\오뚜기 흰밥, 210g, 36개',
  link: 'https://link.coupang.com/a/eNLLVPFLie',
  iframe: '<iframe src="https://coupa.ng/cnAoc3" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '바쁜 일상 속에서 매번 쌀을 씻고 밥을 안치는 일은 생각보다 꽤 번거로운 노동입니다. 특히 혼자 사는 1인 가구나 자취생들에게 남은 밥을 보관하고 처리하는 일은 가장 큰 스트레스 중 하나인데요. 이럴 때 찬장에 가득 채워진 즉석밥 하나만 있으면 어떤 반찬에도 든든한 한 끼를 차려낼 수 있어 마음마저 풍족해집니다. 대한민국의 밥상을 책임져 온 국민 브랜드 오뚜기에서 만든 **오뚜기 맛있는 밥**은 이름 그대로 갓 지은 집밥의 맛을 그대로 재현해 내며 많은 사랑을 받고 있습니다.\n\n36개라는 넉넉한 대용량 구성으로 쟁여두고 먹기에 최적화된 오뚜기 맛있는 흰밥은, 단순히 간편함을 넘어 쌀 본연의 찰기와 단맛을 잃지 않은 뛰어난 퀄리티가 돋보입니다. 윤기가 촤르르 흐르는 밥알 하나하나에 담긴 정성과 맛의 비결, 그리고 이 제품이 왜 필수 생존템으로 불리는지 자세히 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 돋보이는 장점은 뭐니 뭐니 해도 압도적인 \'밥맛\'입니다. 100% 엄선된 국내산 멥쌀만을 사용하여 밥을 지었기 때문에, 전자레인지에 딱 2분만 데우면 방금 가마솥에서 퍼낸 듯 고소하고 달큰한 밥 냄새가 온 집안에 퍼집니다. 밥알이 떡처럼 뭉치거나 푸석푸석하지 않고, 한 알 한 알 살아있는 찰진 식감을 느낄 수 있어 찌개나 밑반찬 그 어떤 요리와 곁들여도 완벽한 조화를 이룹니다.' },
    { img: '2.jpg', text: '오뚜기만의 철저한 품질 관리와 특수 포장 기술이 적용되어 안심하고 먹을 수 있습니다. 무균화 포장 시스템인 클린룸(Clean Room) 시설에서 제조하여 보존료를 전혀 첨가하지 않고도 실온에서 오랫동안 신선하게 보관할 수 있습니다. 갓 지은 밥의 수분과 찰기를 꽉 잡아주는 특수 필름 용기는 환경 호르몬 걱정 없이 전자레인지나 끓는 물에 안심하고 조리할 수 있도록 튼튼하게 설계되었습니다.' },
    { img: '3.jpg', text: '210g이라는 용량은 성인 1명이 먹기에 모자라지도 넘치지도 않는 가장 이상적인 \'황금 비율\'입니다. 기존의 작은 즉석밥으로는 왠지 양이 부족하고 큰 사이즈는 남길까 봐 부담스러웠던 분들에게 딱 알맞은 포만감을 선사합니다. 국물에 말아 먹거나 볶음밥을 할 때, 혹은 야식으로 라면 국물에 밥을 말아 먹을 때도 이 210g 한 그릇이면 완벽한 밸런스를 맞출 수 있습니다.' },
    { img: '4.jpg', text: '무려 36개가 들어있는 대용량 박스 포장은 가성비를 극한으로 끌어올린 구성입니다. 낱개로 구매할 때보다 경제적인 부담을 확 줄여주며, 한 번 구매해 두면 한동안은 쌀 걱정 없이 든든하게 식생활을 영위할 수 있습니다. 무거운 쌀포대를 들고 낑낑거릴 필요도, 밥솥을 씻고 닦는 수고로움도 없이, 언제든 배고플 때 손만 뻗으면 맛있는 밥이 완성되는 마법 같은 일상을 경험해 보세요.' }
  ],
  outro: '한국인은 밥심이라는 말이 있듯, 잘 차려진 밥 한 그릇은 하루를 살아가는 큰 원동력이 됩니다. 좋은 쌀을 골라 최적의 조건에서 정성껏 지어낸 **오뚜기 맛있는 밥**은 바쁘고 지친 현대인들에게 가장 따뜻하고 든든한 위로가 되어 줍니다. 찬장에 36개를 꽉 채워두는 순간 느껴지는 든든함, 그리고 데우기만 하면 언제든 즐길 수 있는 찰진 고향의 맛으로 매일매일 건강하고 맛있는 식탁을 완성해 보시길 바랍니다.',
  summary: '가성비 자취생 쟁여템! 오뚜기 맛있는 밥 210g 성분 분석'
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
  if (row['폴더이름'] === '오뚜기 흰밥, 210g, 36개') {
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
