const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-wd-mypassport',
  category: '가전/디지털',
  title: '안전한 데이터 백업의 필수품! WD My Passport 휴대용 외장하드 상세 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\WD My Passport 휴대용 외장하드 + 파우치',
  backupDir: 'D:\\정식서버업로드전용폴더\\WD My Passport 휴대용 외장하드 + 파우치',
  link: 'https://link.coupang.com/a/eTIZ5ZnV9w',
  iframe: '<iframe src="https://coupa.ng/cnFt5N" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '스마트폰 사진부터 중요한 업무용 문서, 고용량 영상 파일까지 우리가 관리해야 할 디지털 데이터는 갈수록 방대해지고 있습니다. 클라우드 스토리지만으로는 용량과 보안성 측면에서 아쉬움이 남을 때 가장 확실하고 안전한 해결책은 신뢰할 수 있는 물리적 저장 매체를 활용하는 것입니다. 스토리지 분야의 세계적인 선두주자 웨스턴디지털(WD)에서 출시한 \'WD My Passport 휴대용 외장하드\'는 수많은 사용자들에게 검증된 안정성과 강력한 보안 기능으로 외장하드의 표준으로 불립니다. 오늘은 소중한 데이터를 완벽하게 보호해 줄 이 제품의 핵심 기능과 효율적인 데이터 관리 방법에 대해 상세히 알아보겠습니다.',
  sections: [
    { img: '1.jpg', text: '디지털 데이터를 다룰 때 가장 우선시되어야 할 것은 단연 \'보안\'입니다. WD My Passport는 강력한 256비트 AES 하드웨어 암호화 기술이 내장되어 있어 개인 정보나 민감한 업무 자료를 안전하게 보호할 수 있습니다. 전용 소프트웨어를 통해 비밀번호를 설정해두면, 외장하드를 분실하거나 도난당하더라도 타인이 절대로 데이터를 열어볼 수 없기 때문에 안심하고 들고 다닐 수 있습니다.' },
    { img: '2.jpg', text: '외장하드를 사용하다 보면 정기적인 백업을 잊어버려 낭패를 보는 경우가 많습니다. 이 제품은 포함된 백업 소프트웨어를 활용하여 나만의 \'자동 백업 일정\'을 손쉽게 세팅할 수 있습니다. 매시간, 매일, 혹은 매월 등 원하는 주기를 설정해두면 PC에 연결되어 있을 때 지정된 폴더의 내용이 외장하드로 자동 복사되므로, 실수로 원본 파일을 날려도 언제든 복구할 수 있는 강력한 안전망을 제공합니다.' },
    { img: '3.jpg', text: '성능만큼이나 매력적인 부분은 한 손에 쏙 들어오는 \'콤팩트하고 세련된 디자인\'입니다. 기존의 투박하고 무거운 외장하드들과 달리 여권(Passport)이라는 이름에 걸맞게 굉장히 슬림하고 가볍게 설계되었습니다. 가방이나 파우치는 물론이고 외투 주머니에도 부담 없이 쏙 들어가기 때문에 출장, 카페 업무, 혹은 대학교 과제용으로 매일 들고 다니기에 전혀 불편함이 없는 뛰어난 휴대성을 자랑합니다.' },
    { img: '4.jpg', text: '함께 제공되는 \'전용 파우치\'는 외장하드의 수명을 연장시켜 주는 매우 실용적인 구성품입니다. 이동 중에 발생할 수 있는 가벼운 스크래치나 외부의 충격으로부터 기기를 안전하게 보호해 줄 뿐만 아니라, 잃어버리기 쉬운 연결 케이블을 깔끔하게 수납할 수 있는 내부 포켓이 마련되어 있습니다. 파우치가 기본 구성에 포함되어 있어 별도로 구매해야 하는 번거로움과 비용을 줄여주는 소소하지만 확실한 장점입니다.' },
    { img: '5.jpg', text: '제품을 구매하고 복잡한 설정 없이 바로 사용할 수 있는 \'플러그 앤 플레이(Plug and Play)\' 방식을 지원합니다. Windows 운영체제에 완벽하게 호환되도록 포맷되어 출고되기 때문에, 박스를 뜯어 USB 케이블을 컴퓨터에 연결하기만 하면 곧바로 파일 전송 및 백업이 가능합니다. 최신 USB 포트 규격을 지원하여 고용량의 영상 파일이나 수천 장의 사진 폴더도 답답함 없이 쾌적한 속도로 전송할 수 있습니다.' },
    { img: '6.jpg', text: '데이터 저장 장치는 무엇보다 브랜드를 보고 선택해야 합니다. 글로벌 스토리지 시장을 선도하는 WD의 철저한 품질 테스트를 통과한 제품으로, 갑작스러운 고장이나 데이터 유실의 위험을 최소화하도록 내구성이 뛰어난 부품들로 설계되었습니다. 또한, 안심하고 사용할 수 있는 무상 보증 서비스를 제공하여 오랫동안 든든한 데이터 보관소로서의 역할을 완벽하게 수행합니다.' }
  ],
  outro: '데이터는 한 번 날아가면 돈으로도 복구하기 힘든 소중한 자산입니다. 중요한 자료를 백업하지 않고 불안해하셨거나, 용량 부족에 시달리고 계셨다면 검증된 안정성과 하드웨어 암호화, 그리고 자동 백업 기능까지 모두 갖춘 \'WD My Passport 외장하드\'를 강력하게 추천합니다. 지금 바로 안전하고 체계적인 데이터 관리를 시작하여 소중한 추억과 작업물들을 완벽하게 보존해 보세요.',
  summary: '안전한 데이터 백업의 필수품! WD My Passport 휴대용 외장하드 상세 가이드'
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
  if (row['폴더이름'] === 'WD My Passport 휴대용 외장하드 + 파우치') {
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
