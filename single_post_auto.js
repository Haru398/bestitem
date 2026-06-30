const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-meongnyang-cat-tower',
  category: '반려동물용품',
  title: '좁은 원룸 공간에도 딱 맞는 튼튼한 원목 고양이 캣폴 스크래쳐 캣타워 후기',
  sourceDir: 'D:\\정식홈페이지자동화\\멍냥이랑 원목 캣타워 캣폴 스크래쳐',
  backupDir: 'D:\\정식서버업로드전용폴더\\멍냥이랑 원목 캣타워 캣폴 스크래쳐',
  link: 'https://link.coupang.com/a/eTF9MreB4u',
  iframe: '<iframe src="https://coupa.ng/cnFrKa" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '4.jpg', '5.jpg', '7.jpg'],
  intro: '고양이를 키우는 집사님들이라면 수직 공간의 중요성을 너무나 잘 알고 계실 겁니다. 하지만 좁은 원룸이나 오피스텔에 살다 보면 덩치가 큰 캣타워를 들여놓기가 부담스럽기 마련인데요. 공간 차지는 최소화하면서도 뚱냥이들이 우다다 뛰어올라도 흔들림 없이 튼튼하게 버텨주는 제품을 찾고 계셨다면, 디자인과 내구성 모두를 완벽하게 만족시키는 **멍냥이랑 원목 캣폴 스크래쳐**를 강력히 추천합니다.\n\n이 제품은 천장과 바닥을 든든하게 지지해 주는 기둥 형태로 설계되어 좁은 자투리 공간에도 얼마든지 설치가 가능합니다. 특히 인테리어를 해치지 않는 따뜻하고 감성적인 원목 소재로 제작되어 집안 어디에 두어도 고급스러운 분위기를 연출해 주는데요. 예민한 고양이들의 습성을 철저히 분석하여 만들어진 이 기특한 캣폴이 왜 초보 집사들 사이에서 \'원룸 필수템\'으로 불리는지 그 놀라운 디테일들을 하나하나 꼼꼼하게 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 장점은 \'바닥 면적을 거의 차지하지 않는 극강의 공간 활용도\'입니다. 기둥 형태로 천장까지 곧게 뻗어 올라가는 디자인 덕분에 거실 구석이나 창가 옆 아주 작은 틈새 공간만 있어도 훌륭한 수직 놀이터를 만들어줄 수 있습니다. 바닥에 거대한 베이스 판이 깔려 발에 걸리적거리는 기존 캣타워의 단점을 완벽하게 보완하여, 원룸이나 투룸에 거주하는 1인 가구 집사님들에게 최고의 만족감을 선사합니다.' },
    { img: '4.jpg', text: '자연 친화적이고 안전한 \'고급 원목 소재와 라운딩 마감 처리\'가 돋보입니다. 저가의 MDF 합판이 아닌 내구성이 뛰어난 단단한 목재를 사용하여 7kg 이상의 뚱냥이가 뛰어오르거나 매달려도 부러질 염려가 없습니다. 또한, 고양이가 밟고 올라가는 모든 발판의 모서리를 부드럽게 라운딩 처리하여 우다다를 하다가 부딪혀도 다치지 않도록 세심하게 배려했습니다. 나무 특유의 포근한 향은 고양이의 심리적 안정에도 큰 도움을 줍니다.' },
    { img: '5.jpg', text: '스트레스를 한 방에 날려버릴 수 있는 \'전체 기둥 스크래쳐 옵션\'을 갖추고 있습니다. 발판 사이사이를 연결하는 모든 기둥에 튼튼하고 촘촘한 천연 삼줄(면줄) 스크래쳐가 빈틈없이 감겨 있어, 고양이들이 오르내릴 때 발톱을 꽉 움켜쥐어 미끄러지지 않게 도와줍니다. 기지개를 켜며 본능적으로 벅벅 긁어대기 딱 좋은 최적의 그립감을 제공하여, 아끼는 소파나 벽지가 뜯기는 대참사를 미연에 방지할 수 있습니다.' },
    { img: '7.jpg', text: '안전을 최우선으로 생각한 \'이중 흔들림 방지 설계와 논슬립 마감\'이 적용되어 있습니다. 천장과 맞닿는 부분의 스프링 장력 조절 나사를 통해 단단하게 압착 고정되며, 쉽게 풀리지 않는 견고한 브라켓이 기둥을 꽉 잡아주어 흔들림을 최소화합니다. 각각의 스텝 발판에는 미끄럼 방지 패드를 부착할 수 있어 노령묘나 다리가 짧은 먼치킨 아이들도 미끄러짐 없이 안전하고 편안하게 오르내릴 수 있습니다.' }
  ],
  outro: '반려묘에게 창밖을 구경하며 쉴 수 있는 편안한 수직 공간은 단순한 장난감 그 이상의 의미를 지닙니다. 공간의 제약 때문에 캣타워 구매를 망설이셨던 집사님들께, 차지하는 면적은 최소화하고 견고함과 인테리어 감성은 최대로 끌어올린 **멍냥이랑 원목 캣폴 스크래쳐**는 가장 합리적이고 완벽한 선택이 될 것입니다. 지금 바로 설치하셔서 우리 아이들에게 가장 안전하고 짜릿한 전용 놀이터를 선물해 주시길 강력히 추천합니다.',
  summary: '좁은 원룸 공간에도 딱 맞는 튼튼한 원목 고양이 캣폴 스크래쳐 설치 및 실사용 후기'
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
  if (row['폴더이름'] === '멍냥이랑 원목 캣타워 캣폴 스크래쳐') {
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
