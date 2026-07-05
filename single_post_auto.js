const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-mercusys-wifi7-router',
  category: '디지털/가전',
  title: '와이파이7 시대의 개막! 가성비 끝판왕 머큐시스 듀얼밴드 Wi-Fi 7 유무선 공유기 완벽 가이드',
  sourceDir: 'D:\\정식홈페이지자동화\\머큐시스 듀얼 밴드 Wi-Fi 7 유무선 공유기',
  backupDir: 'D:\\정식서버업로드전용폴더\\머큐시스 듀얼 밴드 Wi-Fi 7 유무선 공유기',
  link: 'https://link.coupang.com/a/e6W2JVt9NI',
  iframe: '<iframe src="https://coupa.ng/cnPdNN" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.jpg'],
  intro: '최근 스마트폰부터 고성능 노트북까지 Wi-Fi 7을 지원하는 기기들이 대거 출시되면서, 홈 네트워크 환경의 세대교체가 본격적으로 시작되었습니다. 기존 Wi-Fi 6 대비 압도적인 속도와 짧은 지연 시간을 자랑하는 Wi-Fi 7 공유기는 선택이 아닌 필수가 되어가고 있습니다. 하지만 초기 출시된 Wi-Fi 7 공유기들의 비싼 가격이 부담스러웠던 분들을 위해, 뛰어난 성능과 합리적인 가격 두 마리 토끼를 모두 잡은 \'머큐시스 듀얼밴드 Wi-Fi 7 유무선 공유기\'의 스펙과 네트워크 성능을 심층적으로 분석해보겠습니다.',
  sections: [
    { img: '1.png', text: '가장 핵심적인 변화는 단연 \'MLO(Multi-Link Operation)\' 기술의 탑재입니다. 기존 공유기들은 2.4GHz와 5GHz 대역 중 하나만을 선택하여 데이터를 전송했지만, 머큐시스 Wi-Fi 7 공유기는 두 대역을 동시에 연결하여 데이터를 송수신합니다. 이로 인해 끊김 현상이 획기적으로 줄어들며, 고화질 4K/8K 스트리밍이나 대용량 파일 다운로드 시 대기 시간이 거의 없는 극강의 속도를 체감할 수 있습니다.' },
    { img: '2.png', text: '320MHz에 달하는 초광대역 채널을 지원하여 데이터 전송의 \'고속도로\'를 무려 두 배나 넓혔습니다. 이전 세대인 Wi-Fi 6가 160MHz 대역폭을 지원했던 것과 비교하면, 한 번에 처리할 수 있는 데이터의 양이 기하급수적으로 증가했습니다. 가족 구성원 모두가 동시에 고사양 온라인 게임을 즐기거나 넷플릭스를 시청해도 속도 저하 없는 쾌적한 환경을 유지합니다.' },
    { img: '3.png', text: '4K-QAM 기술이 적용되어 동일한 주파수 대역 내에서도 기존 1024-QAM 대비 20% 향상된 데이터 밀도를 자랑합니다. 쉽게 말해, 같은 시간 동안 더 많은 데이터를 촘촘하게 압축해서 전송할 수 있다는 뜻입니다. 이는 웹 서핑의 반응 속도를 비약적으로 높여주며, FPS 게임 등 1ms의 핑 차이가 중요한 작업에서 절대적인 우위를 점할 수 있게 해줍니다.' },
    { img: '4.png', text: '네트워크의 유연성을 극대화하기 위해 Multi-RU 및 Preamble Puncturing 기능을 지원합니다. 주변 이웃집의 수많은 공유기 신호들로 인해 발생하는 주파수 간섭을 영리하게 피하고, 사용 가능한 남은 채널을 조각 모음 하듯 하나로 묶어 효율적으로 사용합니다. 특히 아파트나 오피스텔 등 밀집된 주거 환경에서 발생하는 무선 간섭 문제를 완벽하게 해결해 줍니다.' },
    { img: '5.png', text: '하드웨어 스펙 역시 동급 최강을 자랑합니다. 고성능 처리 장치가 내장되어 수십 대의 IoT 스마트 홈 기기, 태블릿, 스마트폰, 스마트 TV가 동시에 연결되어도 발열이나 병목 현상 없이 트래픽을 원활하게 분산 처리합니다. 머큐시스 특유의 빔포밍 기술과 강력한 외장 안테나는 집안 구석구석 음영 지역 없는 촘촘한 Wi-Fi 커버리지를 제공합니다.' },
    { img: '6.jpg', text: '최신 보안 프로토콜인 WPA3를 기본으로 탑재하여 해킹이나 외부 네트워크 침입으로부터 개인정보를 완벽하게 보호합니다. 또한 직관적이고 사용하기 쉬운 전용 모바일 앱을 통해 네트워크 설정, 자녀 보호 기능 제어, 게스트 네트워크 생성 등을 터치 몇 번만으로 손쉽게 관리할 수 있어 초보자도 전문가처럼 네트워크 환경을 구축할 수 있습니다.' }
  ],
  outro: '머큐시스 듀얼밴드 Wi-Fi 7 유무선 공유기는 \'Wi-Fi 7은 비싸다\'는 편견을 완벽하게 깨부순 혁신적인 제품입니다. 최신 MLO 기술과 320MHz 대역폭, 4K-QAM 등 차세대 네트워크 기술을 모두 품고도 놀라운 가성비를 보여줍니다. 집안의 인터넷 속도가 답답하게 느껴지거나 최신 스마트폰의 무선 성능을 100% 끌어올리고 싶다면, 지금이 바로 머큐시스와 함께 네트워크 환경을 업그레이드할 가장 완벽한 타이밍입니다.',
  summary: '와이파이7 시대의 개막! 가성비 끝판왕 머큐시스 듀얼밴드 Wi-Fi 7 유무선 공유기 완벽 가이드'
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
