const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-domestic-albagi-cabbage-1ea',
  category: '식품',
  title: '아삭함이 살아있는 밥도둑! 산지 직송 국내산 알배기 배추 요리 및 고르는 법',
  sourceDir: 'D:\\정식홈페이지자동화\\국내산 알배기, 1개입, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\국내산 알배기, 1개입, 1개',
  link: 'https://link.coupang.com/a/e7LzeYy9Vk',
  iframe: '<iframe src="https://coupa.ng/cnPwAO" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '6.jpg'],
  intro: '일반 배추보다 크기는 작지만, 노란 속잎이 꽉 차 있어 특유의 고소한 단맛과 아삭아삭한 식감을 자랑하는 \'알배기 배추\'는 사계절 내내 한국인의 밥상에서 사랑받는 으뜸 식재료입니다. 쌈장에 푹 찍어 생으로 먹어도 맛있고, 겉절이나 국물 요리에 넣어도 깊은 풍미를 더해주는 알배기 배추는 맛뿐만 아니라 비타민과 식이섬유가 풍부해 영양 만점 채소로 손꼽힙니다. 맑은 공기와 깨끗한 토양을 자랑하는 청정 산지에서 정성껏 재배하여 가장 신선할 때 식탁까지 배송되는 \'국내산 알배기 1개입\'의 훌륭한 영양 성분과 똑똑하게 고르고 보관하는 꿀팁까지 자세히 알아봅니다.',
  sections: [
    { img: '1.jpg', text: '비타민 C와 풍부한 식이섬유로 장 건강까지 챙기는 효자 채소: 알배기 배추의 진한 노란색 속잎에는 면역력을 높이고 피로를 회복하는 데 도움을 주는 비타민 C가 일반 배추보다 훨씬 더 풍부하게 함유되어 있습니다. 열을 가해 조리해도 비타민 손실이 적어 샤브샤브나 전골에 듬뿍 넣어 먹기 아주 좋습니다. 또한 수분 함량이 매우 높고 부드러운 식이섬유가 가득 차 있어, 고기와 함께 쌈으로 즐기거나 매일 밥반찬으로 곁들여 먹으면 장운동을 활발하게 촉진시켜 주어 만성 변비 예방과 체중 감량에 큰 도움을 줍니다.' },
    { img: '2.jpg', text: '청정 산지에서 직송되는 100% 믿을 수 있는 국내산: 매일 우리 가족이 먹는 식재료인 만큼 원산지와 신선도는 무엇보다 중요한 선택 기준입니다. 이 제품은 꼼꼼한 품질 관리를 거쳐 국내 청정 농가에서 정성스럽게 재배된 100% 국내산 알배기 배추만을 엄선했습니다. 수확 직후 가장 신선한 상태로 포장되어 직송되므로, 마트 진열대에 며칠씩 방치되어 수분이 빠지고 시들해진 배추와는 비교할 수 없는 싱싱하고 푸릇한 잎과 묵직한 수분감을 그대로 느낄 수 있습니다.' },
    { img: '3.jpg', text: '겉절이부터 밀푀유 나베까지, 한계가 없는 만능 요리템: 속이 꽉 찬 알배기 배추는 그 자체로 훌륭한 요리 재료가 됩니다. 잎을 한 장씩 떼어내어 고춧가루와 액젓으로 쓱쓱 버무린 아삭한 겉절이는 입맛이 없을 때 최고의 밥도둑이며, 된장찌개나 소고기 뭇국에 숭덩숭덩 썰어 넣으면 국물에 시원하고 깊은 단맛을 더해줍니다. 특히 손님 초대용으로 인기 만점인 \'밀푀유 나베\'를 만들 때, 깻잎과 얇은 소고기를 겹겹이 쌓아 올리기 가장 완벽한 사이즈와 모양을 갖추고 있어 요리 초보자도 셰프처럼 근사한 요리를 완성할 수 있습니다.' },
    { img: '4.jpg', text: '좋은 알배기 배추 고르는 법과 오래가는 보관 꿀팁: 겉잎에 검은 반점이 없고 선명한 녹색을 띠며, 반으로 잘랐을 때 속잎이 샛노랗고 잎의 두께가 얇으면서도 뿌리 쪽이 묵직한 것을 고르는 것이 가장 좋습니다. 사용하고 남은 배추는 씻지 않은 상태 그대로 신문지나 키친타월로 돌돌 만 뒤 지퍼백에 밀봉하여 냉장고 채소 칸에 보관해야 수분 증발을 막아 오랫동안 싱싱하게 먹을 수 있습니다. 만약 잎이 조금 시들해졌다면, 요리하기 전 찬물이나 얼음물에 10분 정도 푹 담가두면 신기하게도 아삭한 식감이 다시 100% 살아납니다.' },
    { img: '6.jpg', text: '1~2인 가구에 딱 맞춘 음식물 쓰레기 제로 1개입 실속 포장: 커다란 통배추나 여러 개 묶음으로 파는 채소는 대가족이 아닌 이상 다 먹지 못하고 냉장고 구석에서 썩어 음식물 쓰레기로 버려지는 경우가 많습니다. 이 제품은 1인 가구나 신혼부부도 한 번에 알차게 소비할 수 있도록 속이 꽉 찬 알배기 \'1개\'만 개별 포장하여 실용성을 극대화했습니다. 쌈 채소로 한 끼, 된장국으로 한 끼를 끓여 먹으면 남는 것 없이 완벽하게 소진할 수 있어 버려지는 식재료 없이 아주 알뜰하고 경제적인 소비가 가능합니다.' }
  ],
  outro: '아삭한 식감과 씹을수록 배어 나오는 고소한 단맛이 일품인 국내산 알배기 배추는 식탁 위에 활력을 불어넣는 훌륭한 자연의 선물입니다. 고기 구울 때 싱싱한 쌈 채소로, 입맛 돋우는 매콤한 겉절이로, 국물 맛을 내는 시원한 육수용으로 언제든 다양하게 활용해 보세요. 싱싱한 청정 산지에서 수확하여 1~2인 가구에 딱 맞춘 알뜰한 1개입 포장으로, 남길 걱정 없이 매일 신선하고 건강한 밥상을 차려보시길 추천합니다.',
  summary: '아삭함이 살아있는 밥도둑! 산지 직송 국내산 알배기 배추 요리 및 고르는 법'
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
