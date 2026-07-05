const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-cozys-dish-rack',
  category: '생활/주방',
  title: '좁은 주방의 구원템! 공간 활용을 극대화하는 코지스 미니 물빠짐 식기건조대 심층 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\코지스 미니 물빠짐 식기건조대 도마 설거지 그릇 건조대',
  backupDir: 'D:\\정식서버업로드전용폴더\\코지스 미니 물빠짐 식기건조대 도마 설거지 그릇 건조대',
  link: 'https://link.coupang.com/a/e6XT0pfGNg',
  iframe: '<iframe src="https://coupa.ng/cnPes5" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.jpg'],
  intro: '1인 가구가 거주하는 원룸이나 오피스텔, 혹은 좁은 싱크대를 가진 주방에서 가장 큰 골칫거리 중 하나는 바로 \'설거지 후 식기 건조 공간의 부족\'입니다. 커다란 2단 식기건조대를 놓자니 조리 공간이 사라지고, 아예 안 쓰자니 설거지거리가 산더미처럼 쌓이게 됩니다. 이러한 좁은 주방의 딜레마를 완벽하게 해결해 줄 혁신적인 아이템, 작지만 강력한 수납력을 자랑하는 \'코지스 미니 물빠짐 식기건조대\'의 디테일한 기능과 실용성을 낱낱이 파헤쳐보겠습니다.',
  sections: [
    { img: '1.png', text: '가장 돋보이는 특징은 한 뼘 남짓한 공간만 있으면 어디든 거치할 수 있는 \'초슬림 미니멀 디자인\'입니다. 싱크대 옆의 좁은 틈새나 코너 공간 등 그동안 버려져 있던 죽은 공간(Dead Space)을 100% 활용할 수 있도록 설계되었습니다. 화이트 톤의 깔끔하고 모던한 외관은 주방 인테리어를 해치지 않으며, 답답해 보이던 주방 공간을 시각적으로 훨씬 넓고 쾌적하게 만들어 줍니다.' },
    { img: '2.png', text: '크기는 작지만 수납의 효율성은 놀라울 정도로 극대화되었습니다. 밥그릇, 국그릇, 접시를 안정적으로 세울 수 있는 빗살무늬 디바이더가 촘촘하게 배열되어 있어 식기들이 서로 부딪혀 이가 나가는 것을 방지합니다. 또한, 일반적인 식기뿐만 아니라 길이가 긴 프라이팬이나 크기가 큰 도마, 냄비 뚜껑까지 흔들림 없이 탄탄하게 거치할 수 있는 최적의 밸런스 구조를 갖추고 있습니다.' },
    { img: '3.png', text: '물때와 곰팡이 번식을 원천 차단하는 \'자동 물빠짐 시스템\'은 이 제품의 핵심 기술입니다. 건조대 하단에 경사면이 적용된 회전형 물빠짐 받침대가 탑재되어 있어, 식기에서 떨어지는 물방울이 고이지 않고 싱크대 볼로 자연스럽게 흘러내려 갑니다. 배수구의 방향을 360도로 자유롭게 회전할 수 있어, 싱크대 좌우 어느 곳에 배치하더라도 완벽한 배수 환경을 조성할 수 있습니다.' },
    { img: '4.png', text: '분리형 수저통이 기본 구성으로 포함되어 있어 수납의 디테일을 완성합니다. 젓가락, 숟가락, 포크, 그리고 조리용 나이프 등을 꽂아둘 수 있는 넉넉한 공간을 제공하며, 수저통 바닥면 역시 타공 처리가 되어 있어 물기가 빠르게 건조됩니다. 수저통은 식기건조대 본체 내외부 원하는 위치에 자유롭게 걸어둘 수 있어 사용자의 동선에 맞게 커스터마이징이 가능합니다.' },
    { img: '5.png', text: '재질 역시 위생과 내구성을 최우선으로 고려했습니다. 녹이 슬기 쉬운 철제 소재 대신, 물과 습기에 강하고 충격에 쉽게 파손되지 않는 고강도 친환경 ABS 플라스틱과 스테인리스 스틸을 결합하여 제작되었습니다. 덕분에 오랜 시간 물기가 닿아도 부식될 염려가 없으며, 정기적으로 물세척 한 번만 해주면 언제나 새것처럼 청결하게 유지할 수 있습니다.' },
    { img: '6.jpg', text: '바닥면에는 미끄럼 방지를 위한 고무 패드가 부착되어 있어, 무거운 식기를 올려두거나 물기가 많은 싱크대 상판 위에서도 쉽게 밀리거나 흔들리지 않습니다. 또한, 식기건조대의 모든 모서리가 부드러운 곡선(라운딩)으로 마감 처리되어 있어, 설거지를 하며 손이 긁히거나 다칠 위험 없이 안전하게 사용할 수 있는 세심한 배려가 돋보입니다.' }
  ],
  outro: '코지스 미니 물빠짐 식기건조대는 단순히 크기만 줄인 제품이 아니라, 좁은 주방에서 겪는 실질적인 불편함들을 스마트한 디자인과 기능으로 해결해 낸 똑똑한 주방 아이템입니다. 혼자 사는 1인 가구, 요리를 자주 하지 않아 큰 건조대가 필요 없는 가정, 혹은 서브용 건조대가 필요한 분들에게 공간의 자유와 설거지의 편리함을 동시에 선사할 최고의 선택이 될 것입니다.',
  summary: '좁은 주방의 구원템! 공간 활용을 극대화하는 코지스 미니 물빠짐 식기건조대 심층 리뷰'
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
