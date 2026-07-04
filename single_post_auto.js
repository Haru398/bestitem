const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-razer-blackshark-v2-hyperspeed',
  category: '가전/디지털',
  title: '사운드 플레이어의 필수품! 초경량 무선 게이밍 헤드셋, 레이저 블랙샤크 V2 하이퍼스피드 (Razer BlackShark V2 HyperSpeed) 심층 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\레이저 BlackShark V2 HyperSpeed 헤드셋',
  backupDir: 'D:\\정식서버업로드전용폴더\\레이저 BlackShark V2 HyperSpeed 헤드셋',
  link: 'https://link.coupang.com/a/e0ymLcaBHw',
  iframe: '<iframe src="https://coupa.ng/cnKC1X" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '배틀그라운드나 발로란트와 같이 적의 발소리와 총소리 방향을 정확하게 파악해야 하는 하드코어 FPS 게임에서, 헤드셋은 단순한 음향 기기를 넘어 승률을 좌우하는 가장 강력한 무기입니다. 많은 게이머들이 무선 헤드셋의 자유로움을 원하지만, 무거운 무게로 인한 목의 피로감과 미세한 소리 지연(레이턴시) 때문에 유선을 고집하곤 합니다. 하지만 레이저가 새롭게 출시한 \'레이저 블랙샤크 V2 하이퍼스피드(Razer BlackShark V2 HyperSpeed)\'는 280g이라는 깃털 같은 무게와 유선에 버금가는 초저지연 무선 기술로 이러한 고민을 완벽하게 해결했습니다. 어떤 혁신적인 기술이 탑재되어 있는지, 이 헤드셋의 구체적인 스펙과 장점들을 상세하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 매력적인 특징은 단연 압도적인 \'초경량 디자인\'입니다. 배터리가 내장된 무선 헤드셋임에도 불구하고 무게를 280g까지 획기적으로 줄여, 장시간 이어지는 치열한 랭크 게임에서도 목이나 정수리에 가해지는 압박감이 거의 느껴지지 않습니다. 인체공학적으로 설계된 두툼한 메모리 폼 이어 쿠션과 부드러운 헤드밴드 폼은 사용자의 두상 형태에 맞게 자연스럽게 밀착되어 안경을 착용하더라도 관자놀이가 눌리는 통증 없이 쾌적한 착용감을 보장합니다.' },
    { img: '2.jpg', text: '레이저가 자랑하는 \'TriForce 50mm 티타늄 드라이버\'는 저음, 중음, 고음을 각각 독립적으로 튜닝하는 획기적인 오디오 설계가 적용되었습니다. 덕분에 둔탁하게 뭉개지기 쉬운 폭발음은 더욱 묵직하게, 멀리서 들려오는 미세한 발소리나 탄피 떨어지는 소리는 더욱 선명하고 날카롭게 분리하여 들려줍니다. THX Spatial Audio(공간 음향) 기능을 활성화하면 360도 전 방향에서 들려오는 입체적인 서라운드 사운드를 완벽하게 구현해 내어, 눈을 감고도 적의 위치를 정확하게 특정할 수 있는 궁극의 사운드 플레이가 가능해집니다.' },
    { img: '3.jpg', text: '음성 채팅이 필수적인 팀 게임에서 마이크의 성능은 매우 중요합니다. 블랙샤크 V2 하이퍼스피드에는 레이저의 최상급 마이크인 \'HyperClear 슈퍼 와이드밴드 마이크\'가 탑재되어 있습니다. 기존 마이크들보다 훨씬 넓은 주파수 대역폭의 목소리를 수음하여, 내 목소리를 방송용 마이크 수준의 풍부하고 자연스러운 톤으로 팀원에게 또렷하게 전달합니다. 외부 소음을 차단하는 노이즈 캔슬링 기술이 더해져, 시끄러운 PC방 환경에서도 오직 내 목소리만 정확하게 송출합니다.' },
    { img: '4.jpg', text: '무선 연결 성능 역시 업계 최고 수준입니다. 레이저 전용 동글을 이용한 2.4GHz \'HyperSpeed 무선 연결\'은 전파 간섭이 심한 환경에서도 끊김이나 지연 없는 완벽한 실시간 사운드를 보장하며, 동시에 블루투스 5.2 연결까지 지원하여 스마트폰과 PC를 오가며 자유롭게 사용할 수 있습니다. 게다가 한 번의 완충으로 무려 최대 70시간 동안 쉼 없이 사용할 수 있는 엄청난 배터리 효율을 자랑하여, 매일 충전해야 하는 무선 헤드셋 특유의 번거로움에서 완전히 해방시켜 줍니다.' }
  ],
  outro: '결론적으로 레이저 블랙샤크 V2 하이퍼스피드 무선 헤드셋은 하루 종일 게임을 즐겨도 편안한 \'초경량 착용감\', 적의 숨소리까지 포착하는 \'정밀한 사운드\', 그리고 또렷한 소통을 위한 \'고성능 마이크\'라는 게이밍 헤드셋의 필수 3요소를 완벽하게 충족하는 제품입니다. 답답하고 무거운 기존 헤드셋에서 벗어나, 선 없는 자유로움과 압도적인 사운드 플레이의 우위를 경험하고 싶은 모든 게이머에게 강력하게 추천합니다.',
  summary: '사운드 플레이어의 필수품! 초경량 무선 게이밍 헤드셋, 레이저 블랙샤크 V2 하이퍼스피드 (Razer BlackShark V2 HyperSpeed) 심층 리뷰'
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
