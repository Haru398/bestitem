const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-f-killer-light-trap',
  category: '생활용품',
  title: '초파리 모기 퇴치! 에프킬라 라이트트랩 분석 및 장단점',
  sourceDir: 'D:\\정식홈페이지자동화\\에프킬라 라이트트랩 + 리필 2p 세트, 1세트',
  backupDir: 'D:\\정식서버업로드전용폴더\\에프킬라 라이트트랩 + 리필 2p 세트, 1세트',
  link: 'https://link.coupang.com/a/eNL4EWqwsm',
  iframe: '<iframe src="https://coupa.ng/cnAofv" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '날씨가 따뜻해지면서 어김없이 찾아오는 불청객들이 있습니다. 귀에서 웽웽거리며 단잠을 깨우는 모기, 그리고 음식물 쓰레기 주변을 맴돌며 시각적인 불쾌감을 주는 초파리와 날파리 떼인데요. 시중에 파는 화학 살충제 스프레이를 뿌리자니 특유의 독한 냄새와 호흡기 건강이 걱정되고, 전기 모기채를 들고 이리저리 뛰어다니기엔 체력적인 한계에 부딪히기 일쑤입니다. 살충제 명가에서 야심 차게 선보인 신개념 해충 퇴치 솔루션, **에프킬라 라이트트랩**은 이러한 소비자들의 고민을 완벽하게 해결해 줄 혁신적인 아이템입니다.\n\n이 제품은 독한 살충 성분 없이 오직 불빛과 끈끈이만을 이용해 해충을 유인하고 포획하는 안전하고 스마트한 방식으로 입소문을 타고 있습니다. 냄새 걱정 없이 우리 집의 평화를 지켜줄 에프킬라 라이트트랩의 탁월한 포집 능력과 안심 설계 기술을 꼼꼼하게 분석해 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '가장 돋보이는 특징은 인체에 해로운 화학 살충 성분을 일절 배제했다는 점입니다. 오로지 곤충들이 가장 좋아하는 특정 파장의 은은한 UV(자외선) 불빛만을 발산하여 모기와 초파리, 날파리 등을 본체 쪽으로 자연스럽게 유인합니다. 자극적인 냄새나 유해 물질 배출이 전혀 없어 호흡기가 약한 어린아이나 반려동물이 있는 가정, 혹은 환기가 어려운 밀폐된 실내 공간에서도 24시간 내내 안심하고 꽂아둘 수 있습니다.' },
    { img: '2.jpg', text: '불빛에 이끌려 본체로 다가온 해충들은 후면에 부착된 초강력 끈끈이 패드에 찰싹 달라붙어 꼼짝도 하지 못하게 됩니다. 전기로 태워 죽이는 포충기들처럼 "타닥" 하는 불쾌한 소음이나 타는 냄새가 발생하지 않으며, 죽은 벌레들의 잔해가 바닥으로 떨어져 지저분해질 염려도 없습니다. 끈끈이에 빈틈없이 포획된 해충들은 눈에 띄지 않게 패드 뒷면에 가려지므로 시각적인 불쾌감 또한 최소화했습니다.' },
    { img: '3.jpg', text: '유지 관리가 매우 간편하다는 것도 큰 장점입니다. 끈끈이 패드에 벌레가 가득 차면 손에 더러운 잔해를 묻힐 필요 없이, 다 쓴 패드만 쏙 뽑아서 쓰레기통에 버리고 새로운 리필 패드를 끼워주기만 하면 끝입니다. 본 세트에는 기기 본체와 함께 넉넉한 교체용 리필 패드 2개가 기본으로 구성되어 있어, 한 번 구매하면 여름 내내 해충 걱정 없이 오랫동안 쾌적한 환경을 유지할 수 있습니다.' },
    { img: '4.jpg', text: '어느 공간에나 자연스럽게 녹아드는 깔끔하고 심플한 디자인을 채택했습니다. 투박한 기존의 포충기들과 달리 콘센트에 꽂아두어도 인테리어를 해치지 않으며, 밤에는 은은한 푸른빛을 내뿜어 훌륭한 무드등이나 수면등 역할까지 톡톡히 해냅니다. 거실, 침실, 주방, 베란다 등 해충이 자주 출몰하는 곳 어디든 콘센트만 있으면 간편하게 설치하여 우리 집만의 완벽한 방어막을 구축할 수 있습니다.' }
  ],
  outro: '매번 여름마다 모기향을 피우고 화학 스프레이를 뿌리며 냄새와 씨름했던 날들은 이제 안녕입니다. 독한 살충 성분 없이 불빛으로 유인하고 끈끈이로 조용하게 잡아내는 **에프킬라 라이트트랩**은, 아이와 반려동물이 있는 가정에서도 안심하고 사용할 수 있는 가장 스마트한 해충 퇴치 솔루션입니다. 리필 패드 2개가 포함된 실속 있는 세트 구성으로, 소리 없이 강하게 올여름 우리 집의 쾌적함을 지켜보시길 바랍니다.',
  summary: '초파리 모기 퇴치! 에프킬라 라이트트랩 분석 및 장단점'
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
  if (row['폴더이름'] === '에프킬라 라이트트랩 + 리필 2p 세트, 1세트') {
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
