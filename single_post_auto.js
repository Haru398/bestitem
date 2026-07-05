const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-vankyo-leisure-200',
  category: '디지털/가전',
  title: '원룸 자취방을 프라이빗 영화관으로! 초가성비 반쿄 레저 200 미니 빔프로젝터 화질 및 성능 스펙 총정리',
  sourceDir: 'D:\\정식홈페이지자동화\\VANKYO Leisure 200 빔프로젝터 초소형 미니빔 1080P 지원 품질보증 1년',
  backupDir: 'D:\\정식서버업로드전용폴더\\VANKYO Leisure 200 빔프로젝터 초소형 미니빔 1080P 지원 품질보증 1년',
  link: 'https://link.coupang.com/a/e6XkDIMV9U',
  iframe: '<iframe src="https://coupa.ng/cnPd2v" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
  intro: 'TV를 설치하기 부담스러운 1인 가구나 원룸 자취생, 혹은 캠핑이나 차박 등 야외 활동을 즐기는 분들에게 미니 빔프로젝터는 이제 선택이 아닌 필수가 되었습니다. 하지만 수십만 원을 호가하는 하이엔드급 프로젝터의 가격이 부담스러워 망설이셨다면 주목해 주시길 바랍니다. 압도적인 가성비와 놀라운 휴대성, 그리고 1080P 고화질을 지원하여 아마존 베스트셀러에 등극한 \'반쿄 레저 200(VANKYO Leisure 200)\' 미니 빔프로젝터의 놀라운 스펙과 실사용 장점들을 구석구석 파헤쳐보겠습니다.',
  sections: [
    { img: '1.jpg', text: '미니 빔프로젝터의 핵심은 바로 \'휴대성\'입니다. 반쿄 레저 200은 성인 남성의 한 손에 쏙 들어오는 초소형 사이즈와 스마트폰보다 살짝 무거운 정도의 깃털 같은 무게를 자랑합니다. 백팩은 물론 작은 에코백에도 부담 없이 들어가기 때문에 집안의 거실, 침실을 넘어 캠핑장, 차박 텐트, 옥상 등 넷플릭스와 유튜브가 필요한 모든 곳이 1초 만에 나만의 프라이빗 영화관으로 변신합니다.' },
    { img: '2.jpg', text: '크기가 작다고 해서 화질까지 타협하지 않았습니다. 기존의 저가형 미니빔들이 뿌옇고 흐릿한 화질로 실망감을 주었던 반면, 이 제품은 1080P Full HD 해상도를 거뜬하게 지원합니다. 영화의 미세한 자막부터 유튜브 영상의 디테일한 색감, 심지어 게임 화면의 이펙트까지 원본에 가까운 선명하고 생생한 화질로 투사하여 압도적인 몰입감을 선사합니다.' },
    { img: '3.jpg', text: '프로젝터의 화질을 결정짓는 또 다른 중요한 요소는 바로 \'밝기\'와 \'명암비\'입니다. 동급 미니빔 대비 현저히 높은 루멘(Lumen) 밝기를 제공하여, 완전히 컴컴한 밤이 아닌 약간의 조명이 있는 초저녁이나 실내에서도 충분히 시청 가능한 준수한 밝기를 보여줍니다. 또한, 깊은 블랙과 밝은 화이트를 명확하게 구분하는 명암비를 통해 영상의 입체감을 극대화합니다.' },
    { img: '4.jpg', text: '자취방의 좁은 공간 때문에 빔프로젝터 설치를 망설이셨나요? 반쿄 레저 200은 투사 거리가 매우 짧아 벽과 프로젝터 사이의 공간이 좁아도 최대 100인치에 달하는 초대형 화면을 만들어낼 수 있습니다. 침대 헤드보드에 올려두거나 작은 협탁 위에 거치하는 것만으로도 벽면 전체를 꽉 채우는 스크린이 완성되어 공간 활용도가 매우 뛰어납니다.' },
    { img: '5.jpg', text: '다양한 디바이스와의 완벽한 호환성은 이 제품의 강력한 무기입니다. HDMI 포트, USB, 오디오 출력 단자를 기본적으로 탑재하고 있어 노트북, 플레이스테이션(PS5/닌텐도 스위치), 셋톱박스 등 다양한 멀티미디어 기기와 플러그 앤 플레이 방식으로 즉각적인 연결이 가능합니다. 별도의 복잡한 세팅 없이 케이블만 꽂으면 바로 대화면을 즐길 수 있습니다.' },
    { img: '6.jpg', text: '스마트폰과의 유무선 미러링 기능 또한 완벽하게 지원합니다. 거추장스러운 선 없이도 아이폰이나 갤럭시 스마트폰 화면을 빔프로젝터로 무선 전송하여 투사할 수 있습니다. 침대에 누워 스마트폰 갤러리의 여행 사진을 보거나, 폰으로 넷플릭스, 쿠팡플레이 등을 실행하여 대화면으로 감상하는 편리함을 제공합니다.' },
    { img: '7.jpg', text: '별도의 외장 스피커가 필요 없는 빌트인 듀얼 스피커가 내장되어 있습니다. 작은 체구에서 뿜어져 나오는 스테레오 사운드는 영화의 웅장한 배경음악과 배우들의 대사를 선명하게 전달합니다. 물론 더 깊은 베이스와 서라운드 사운드를 원한다면, 오디오 잭을 통해 외부 블루투스 스피커나 헤드폰을 손쉽게 연결할 수도 있습니다.' },
    { img: '8.jpg', text: '빔프로젝터의 고질적인 문제인 쿨링팬 소음 문제도 획기적으로 개선했습니다. 최신 듀얼 쿨링 시스템을 적용하여, 프로젝터 내부의 열을 빠르게 방출하면서도 팬 소음을 도서관 수준으로 억제했습니다. 조용한 로맨스 영화를 보거나 ASMR을 들을 때 몰입을 방해하던 거슬리는 소음에서 완전히 해방될 수 있습니다.' },
    { img: '9.jpg', text: '프로젝터의 심장이라 할 수 있는 LED 렌즈의 수명 또한 타사 제품의 추종을 불허합니다. 매일 하루에 3시간씩 영화를 보더라도 무려 10년 이상 교체 없이 사용할 수 있는 반영구적인 램프 수명을 자랑합니다. 초기 구매 비용 외에 주기적인 램프 교체로 인한 유지비가 발생하지 않아 극강의 가성비를 완성합니다.' },
    { img: '10.jpg', text: '제품의 상단에는 직관적인 물리 포커스 다이얼과 키스톤 보정 다이얼이 배치되어 있습니다. 화면의 초점이 맞지 않거나 위아래로 찌그러진 사다리꼴 모양이 되었을 때, 복잡한 설정 메뉴에 들어갈 필요 없이 다이얼을 슥슥 돌려주는 것만으로 1초 만에 반듯하고 선명한 직사각형 화면을 세팅할 수 있어 기계에 익숙하지 않은 초보자도 다루기 쉽습니다.' },
    { img: '11.jpg', text: '해외 직구 전자제품의 가장 큰 불안 요소인 A/S 문제도 완벽하게 해결했습니다. 반쿄 코리아 정식 수입품으로서, 구매 후 1년 동안 무상 품질 보증(A/S)을 지원합니다. 사용 중 렌즈에 문제가 생기거나 전원이 들어오지 않는 등의 고장 발생 시, 빠르고 친절한 국내 A/S 서비스를 받을 수 있어 믿고 구매할 수 있는 제품입니다.' }
  ],
  outro: '반쿄 레저 200(VANKYO Leisure 200) 미니 빔프로젝터는 비싼 하이엔드 장비가 부담스러운 입문자나, 휴대성을 극대화한 세컨드 스크린이 필요한 분들에게 완벽한 해답을 제시합니다. 1080P의 선명한 화질, 초대형 화면 투사 능력, 압도적인 호환성과 1년의 든든한 무상 A/S까지 모두 갖추고도 믿기 힘든 합리적인 가격을 자랑합니다. 이 작은 프로젝터 하나로 퇴근 후의 일상과 주말 캠핑의 퀄리티를 수직 상승시켜 보시길 강력히 추천합니다.',
  summary: '원룸 자취방을 프라이빗 영화관으로! 초가성비 반쿄 레저 200 미니 빔프로젝터 화질 및 성능 스펙 총정리'
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
