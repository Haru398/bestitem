const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-kleenex-deco-soft',
  category: '생활용품',
  title: '프리미엄의 차이! 크리넥스 데코 앤 소프트 화장지 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\크리넥스 3겹 데코 앤 소프트 화장지',
  backupDir: 'D:\\정식서버업로드전용폴더\\크리넥스 3겹 데코 앤 소프트 화장지',
  link: 'https://link.coupang.com/a/eTEac03lBc',
  iframe: '<iframe src="https://coupa.ng/cnFp5Y" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '집에서 가장 흔하게 쓰이면서도, 피부에 직접 닿는 만큼 선택에 신중을 기해야 하는 필수 생필품은 단연 두루마리 화장지입니다. 저렴하다는 이유만으로 얇고 거친 화장지를 사용하다가 피부가 자극을 받거나, 금방 헤퍼서 오히려 돈이 이중으로 들었던 경험 한 번쯤 있으실 텐데요. 화장실에서의 시간이 한결 부드럽고 쾌적해지는 프리미엄 화장지의 대명사, **크리넥스 3겹 데코 앤 소프트**를 소개합니다.\n\n이 제품은 이름에서부터 알 수 있듯이, 공간을 화사하게 만들어주는 아름다운 데코 패턴과 크리넥스만의 독보적인 기술력이 녹아든 극강의 부드러움을 동시에 선사합니다. 민감한 피부를 가진 아이들부터 어른들까지 온 가족이 안심하고 사용할 수 있도록 까다로운 품질 기준을 통과한 제품인데요. 오랫동안 국민 화장지로 사랑받으며 절대적인 지지를 얻고 있는 크리넥스 데코 앤 소프트의 놀라운 장점들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '일반 화장지와 가장 크게 체감되는 차이점은 바로 \'차원이 다른 3겹 엠보싱의 도톰함과 흡수력\'입니다. 얇아서 여러 번 겹쳐 써야 했던 기존 화장지들과 달리, 크리넥스 데코 앤 소프트는 공기를 품은 마이크로 엠보싱 기술이 적용된 3겹 구조로 만들어져 한두 칸만 뜯어 사용해도 충분한 두께감을 자랑합니다. 뛰어난 흡수력 덕분에 물기나 오염물을 말끔하게 닦아낼 수 있어 경제성까지 뛰어난 똑똑한 화장지입니다.' },
    { img: '2.jpg', text: '이 제품은 피부 자극을 최소화하기 위해 \'100% 천연 펄프만을 엄선하여 사용\'했습니다. 재생 펄프가 섞이지 않은 순수 천연 펄프 원단에 시어버터와 로션 처리를 더하여, 민감한 피부를 부드럽게 감싸주는 촉촉한 질감을 완성했는데요. 비염으로 인해 코를 자주 풀어 헐기 쉬운 분들이나, 연약한 아기 피부에 직접 사용해도 자극이나 붉어짐 없이 안심하고 부드럽게 닦아낼 수 있는 극강의 부드러움을 선사합니다.' },
    { img: '3.jpg', text: '눈에 보이지 않는 유해 성분까지 철저하게 배제한 \'무형광 안심 설계\'로 온 가족의 건강을 지켜줍니다. 화장지를 하얗게 보이기 위해 인위적으로 첨가하는 형광증백제는 피부 질환을 유발할 수 있어 주의가 필요한데요. 크리넥스는 이러한 형광증백제를 일절 사용하지 않았으며, 화장지 특유의 먼지 날림을 획기적으로 줄여주는 특수 공법을 적용하여 호흡기가 예민한 분들도 기침이나 재채기 없이 편안하게 사용할 수 있습니다.' },
    { img: '4.jpg', text: '단순한 위생용품을 넘어 화장실 공간의 분위기까지 고려한 \'세련된 데코 패턴과 은은한 플로럴 향\'이 돋보입니다. 화장지 표면에 입체적으로 새겨진 고급스러운 무늬가 시각적인 즐거움을 주며, 인위적이고 독한 냄새가 아닌 기분 좋은 은은한 향기가 코끝을 맴돌아 디퓨저를 따로 두지 않아도 화장실에 들어설 때마다 기분 좋은 상쾌함을 느낄 수 있습니다. 실용성과 감성 두 마리 토끼를 모두 잡은 진정한 프리미엄 화장지입니다.' }
  ],
  outro: '화장실에서의 작은 변화가 삶의 질을 얼마나 크게 올려주는지 경험해 보고 싶으신가요? 피부를 아끼는 부드러운 감촉, 한 칸만 써도 든든한 3겹의 도톰함, 그리고 먼지 날림 없는 안심 품질까지 완벽하게 갖춘 **크리넥스 3겹 데코 앤 소프트**는 여러분의 일상에 프리미엄의 가치를 더해줄 것입니다. 우리 가족의 소중한 피부를 위해, 깐깐하게 고른 크리넥스로 욕실의 품격을 한 단계 업그레이드해 보시길 강력히 추천합니다.',
  summary: '프리미엄의 차이! 크리넥스 데코 앤 소프트 화장지 완벽 분석'
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
  if (row['폴더이름'] === '크리넥스 3겹 데코 앤 소프트 화장지') {
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
