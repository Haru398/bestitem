const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-sidiz-t50-hda',
  category: '홈/유아',
  title: '장시간 업무와 학습을 위한 인체공학 시디즈 T50 HDA 방문설치 컴퓨터 의자 성능 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\시디즈 T50 컴퓨터 책상 의자 HDA 방문설치',
  backupDir: 'D:\\정식서버업로드전용폴더\\시디즈 T50 컴퓨터 책상 의자 HDA 방문설치',
  link: 'https://link.coupang.com/a/eTIrEXLu68',
  iframe: '<iframe src="https://coupa.ng/cnFtAH" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
  intro: '현대인들은 하루의 대부분을 의자에 앉아 모니터를 보며 보냅니다. 잘못된 자세로 장시간 앉아있는 습관은 거북목이나 허리 디스크와 같은 만성 질환을 유발할 수 있기 때문에, 내 몸에 완벽하게 맞춰주는 의자의 선택은 단순한 가구 구매를 넘어 건강에 대한 투자와 다름없습니다. 수많은 의자 브랜드 중에서도 국내 판매 1위의 자리를 굳건히 지키고 있는 시디즈의 대표 모델, **시디즈 T50 컴퓨터 책상 의자 HDA**의 인체공학적 설계와 스펙을 심층적으로 분석해 보겠습니다.\n\n이 제품은 이름에 붙은 HDA(Headrest, Depth, Armrest) 옵션에서 알 수 있듯 목받침, 좌판의 깊이, 그리고 팔걸이까지 사용자의 신체 조건에 맞게 세밀한 커스터마이징이 가능한 하이엔드 라인업입니다. 특히 전문가가 직접 배송부터 조립까지 책임지는 방문 설치 서비스가 기본으로 포함되어 있어, 파손 위험 없이 가장 완벽한 상태의 제품을 편리하게 받아볼 수 있다는 강력한 장점을 지니고 있습니다.',
  sections: [
    { img: '1.jpg', text: '가장 핵심적인 뼈대인 등판의 \'S-Curve 디자인\'입니다. 사람의 척추는 자연스러운 S자 형태를 띠고 있을 때 허리에 가해지는 압력을 가장 효과적으로 분산시킵니다. T50 모델의 등판은 이 인체공학적 S라인을 그대로 본떠 설계되어, 의자에 등을 기대는 순간 허리의 빈 공간을 든든하게 채워주며 척추를 바르게 지지합니다. 이는 장시간 앉아있을 때 필연적으로 발생하는 요통을 예방하는 데 탁월한 효과를 발휘합니다.' },
    { img: '2.jpg', text: '신체와 맞닿는 등판의 소재는 뛰어난 통기성을 자랑하는 \'고급 메쉬 원단\'으로 제작되었습니다. 체온으로 인해 발생하는 열과 땀을 갇히지 않게 하고 원활하게 배출시켜 주어, 쾌적함을 최우선으로 고려해야 하는 여름철은 물론 사계절 내내 뽀송뽀송한 착석감을 유지해 줍니다. 촘촘하고 탄력 있는 메쉬 구조는 체중을 고르게 분산시켜 장시간 착석 시 피로도를 크게 낮춰줍니다.' },
    { img: '3.jpg', text: '편안함을 결정짓는 가장 중요한 요소 중 하나인 좌판(방석) 쿠션입니다. 단순히 푹신하기만 한 일반 스펀지가 아니라, 밀도 높은 고탄성 우레탄 스폰지를 사용하여 체중이 집중되는 엉덩이 부분의 압력을 효과적으로 흡수합니다. 좌판 앞부분은 살짝 아래로 기울어지는 폭포수 형태로 마감되어 있어, 허벅지 뒷부분의 혈액 순환이 방해받지 않아 오랫동안 앉아있어도 다리가 저리지 않습니다.' },
    { img: '4.jpg', text: '의자 구매 전 많은 분들이 놓치기 쉬운 포인트인 \'좌판 깊이 조절(Depth)\' 기능입니다. 사람마다 허벅지의 길이가 모두 다르기 때문에, 의자 좌판의 깊이가 고정되어 있으면 오금(무릎 뒤쪽)이 압박되거나 허리가 등판에 닿지 않는 불편함이 생깁니다. T50은 좌판을 앞뒤로 슬라이딩하여 길이를 세밀하게 조절할 수 있어 어떤 체형의 사용자든 완벽한 핏감을 경험할 수 있습니다.' },
    { img: '5.jpg', text: '컴퓨터 작업 시 어깨와 목의 뻐근함을 방지해 주는 \'3D 팔걸이(Armrest)\' 시스템입니다. 키보드를 타이핑할 때 팔꿈치가 공중에 떠 있으면 그 하중이 고스란히 어깨로 전달됩니다. 이 제품의 팔걸이는 위아래 높이 조절은 물론, 좌우 각도 조절, 그리고 앞뒤 깊이 조절까지 가능한 3D 방식을 채택하여 사용자의 책상 높이와 작업 환경에 맞게 팔을 가장 편안한 상태로 지지해 줍니다.' },
    { img: '6.jpg', text: '사용자의 움직임에 자연스럽게 반응하는 \'싱크로나이즈드 틸팅(Synchronized Tilting)\' 기능입니다. 등판에 기댔을 때 등판과 좌판이 서로 다른 각도로 기울어지는 기술로, 허리를 뒤로 젖히더라도 발이 바닥에서 뜨지 않고 무릎에 가해지는 압박이 없습니다. 또한 틸팅 각도를 여러 단계로 고정할 수 있는 멀티 락킹 기능이 적용되어 집중 모드부터 휴식 모드까지 자유롭게 세팅이 가능합니다.' },
    { img: '7.jpg', text: '목과 머리를 편안하게 받쳐주는 필수 옵션인 \'헤드레스트(Headrest)\'입니다. 단순한 쿠션 형태가 아니라 사용자의 체형에 맞게 높낮이와 각도를 조절할 수 있도록 설계되었습니다. 장시간 모니터를 주시하다가 잠시 휴식을 취할 때 목을 뒤로 젖히면 경추의 C 커브를 부드럽게 지지해 주어 목 디스크와 거북목 증후군을 예방하는 데 든든한 조력자 역할을 합니다.' },
    { img: '8.jpg', text: '마지막으로 층간 소음 걱정을 덜어주고 부드러운 이동을 돕는 \'우레탄 캐스터(바퀴)\'입니다. 바닥과 닿는 표면을 부드러운 우레탄 소재로 감싸서, 의자를 끌 때 발생하는 거슬리는 소음을 최소화하고 마룻바닥에 발생할 수 있는 스크래치를 방지합니다. 튼튼한 5발 베이스에 장착된 이 우레탄 캐스터는 무게를 안정적으로 지탱하며 어느 방향으로든 매끄러운 움직임을 선사합니다.' }
  ],
  outro: '좋은 의자는 업무의 효율성을 높이고 학습의 집중력을 극대화하는 가장 확실한 도구입니다. 내 몸에 맞춘 듯 세밀한 조절이 가능한 HDA 풀옵션 사양에 통기성 좋은 메쉬 등판, 그리고 안심하고 받을 수 있는 방문 설치 서비스까지 더해진 **시디즈 T50 컴퓨터 책상 의자**는 장시간 착석이 불가피한 학생과 직장인 모두에게 결코 후회 없는 선택이 될 것입니다. 당신의 허리 건강과 바른 자세를 위해 지금 바로 업그레이드해 보시기 바랍니다.',
  summary: '장시간 업무와 학습을 위한 인체공학 시디즈 T50 HDA 방문설치 컴퓨터 의자 성능 분석'
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
  if (row['폴더이름'] === '시디즈 T50 컴퓨터 책상 의자 HDA 방문설치') {
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
