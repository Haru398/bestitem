const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-klife-cooling-vest-aircon-fan',
  category: '스포츠/레저',
  title: '건설 현장 폭염 필수템! KLIFE 반도체 에어컨 냉각조끼 성능 리뷰',
  sourceDir: 'D:\\정식홈페이지자동화\\KLIFE 쿨링조끼 에어컨 조끼 선풍기 냉각작업복 등받이 아웃도어 건설작업 야외근무 등산낚시 라이딩 반도체냉각 경량화 시즌신상',
  backupDir: 'D:\\정식서버업로드전용폴더\\KLIFE 쿨링조끼 에어컨 조끼 선풍기 냉각작업복 등받이 아웃도어 건설작업 야외근무 등산낚시 라이딩 반도체냉각 경량화 시즌신상',
  link: 'https://link.coupang.com/a/e7LgFrj0vY',
  iframe: '<iframe src="https://coupa.ng/cnPwyv" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '5.jpg', '8.jpg', '11.jpg'],
  intro: '해마다 여름철 폭염 일수가 최고치를 경신하면서, 그늘막 하나 없는 건설 현장이나 물류 센터, 혹은 땡볕 아래서 등산과 낚시를 즐기는 야외 활동가들에게 열사병 예방은 생명과 직결된 가장 중요한 과제가 되었습니다. 얼음 팩을 주머니에 넣는 구형 쿨링 조끼의 무거움과 축축함을 완전히 벗어던지고, 스위치를 켜는 즉시 등줄기를 얼려버리는 최첨단 \'입는 에어컨\'이 올해 여름 시장을 강타하고 있습니다. 항공 우주 산업에 쓰이는 반도체 냉각 기술과 강력한 듀얼 쿨링팬을 결합하여 압도적인 시원함을 자랑하는 \'KLIFE 반도체 냉각 에어컨 조끼\'의 원리와 획기적인 장점들을 자세하게 분석해 보았습니다.',
  sections: [
    { img: '1.jpg', text: '반도체 칩이 만들어내는 3초 만의 기적, 펠티어 냉각 시스템: KLIFE 에어컨 조끼의 등판 중앙에는 소형 냉장고의 핵심 부품인 특수 \'반도체 냉각 칩(Peltier)\'이 탑재되어 있습니다. 전원을 켜면 전류가 흐르면서 단 3초 만에 반도체 패드의 표면 온도가 영하에 가깝게 급격히 떨어집니다. 체온이 가장 높게 오르는 척추 라인을 따라 차가운 알루미늄 냉각판이 직접 맞닿으면서 체내의 뜨거운 열기를 순식간에 빨아들이고, 마치 한겨울의 차가운 얼음장 위에 등을 대고 누워있는 듯한 짜릿하고 소름 돋는 냉감을 등 전체로 뿜어냅니다.' },
    { img: '2.jpg', text: '듀얼 터보 선풍기와 냉각판의 환상적인 콜라보레이션: 이 제품이 타사 모델들과 차별화되는 가장 큰 특징은 반도체 냉각판에 그치지 않고, 허리 양옆에 초강력 BLDC 모터를 장착한 \'듀얼 터보 선풍기\'를 추가로 탑재했다는 점입니다. 냉각판이 등줄기의 온도를 물리적으로 낮춰주면, 양옆의 쿨링팬이 외부의 공기를 강하게 흡입하여 조끼 내부 전체로 차가운 바람을 순환시킵니다. 땀이 날 틈도 없이 바람이 옷 속을 훑고 지나가며 수분을 기화시키기 때문에 한여름 땡볕 아래에서도 쾌적하고 뽀송뽀송한 피부 상태를 완벽하게 유지할 수 있습니다.' },
    { img: '5.jpg', text: '작업의 방해를 최소화한 초경량 인체공학적 등받이 디자인: 등에 장비가 달려있으면 무겁고 둔탁해서 작업 능률이 떨어질 것이라는 편견을 완벽히 깼습니다. KLIFE 냉각조끼는 장비의 부피와 무게를 획기적으로 줄인 초경량 설계를 적용하여, 장시간 착용해도 어깨나 허리에 피로감이 쌓이지 않습니다. 특히 허리와 등을 안정적으로 지지해 주는 인체공학적 입체 패턴을 적용하여 격렬한 삽질이나 무거운 짐을 나르는 역동적인 동작 중에도 냉각 패드가 등에 완벽하게 밀착되어 차가운 냉기를 끊김 없이 전달합니다.' },
    { img: '8.jpg', text: '보조 배터리로 하루 종일 끄떡없는 3단계 스마트 온도 조절: 무겁고 전용 충전기가 필요한 구형 배터리 대신, 시중에서 흔히 구할 수 있는 스마트폰용 USB 보조 배터리로 간편하게 전원을 공급합니다. 대용량 보조 배터리 하나면 하루 8시간의 야외 근무 시간 내내 방전 걱정 없이 강력한 냉방을 즐길 수 있습니다. 또한 직관적인 스마트 리모컨을 통해 선풍기의 풍량과 반도체 칩의 냉각 강도를 3단계로 자유롭게 조절할 수 있어, 한낮의 폭염부터 서늘한 해 질 녘까지 외부 기온과 본인의 체온에 맞춰 최적의 쾌적함을 설정할 수 있습니다.' },
    { img: '11.jpg', text: '산업 현장을 넘어 등산, 낚시, 라이딩 등 아웃도어의 제왕으로: 초기에는 주로 조선소, 제철소, 건설 현장 등 극한의 열기를 견뎌야 하는 산업용 안전 장비로 널리 쓰였지만, 그 압도적인 성능이 입소문을 타면서 최근에는 일반 레저용으로 폭발적인 수요를 보이고 있습니다. 무거운 배낭을 멘 등산객, 갯바위에서 땡볕을 견디는 낚시꾼, 아스팔트 열기를 뚫고 달리는 오토바이 라이더들에게 이 조끼는 열사병을 막아주는 든든한 방패막입니다. 세련된 시즌 신상 디자인으로 일상복 위에 툭 걸쳐 입기에도 전혀 어색함이 없는 다재다능한 아이템입니다.' }
  ],
  outro: '폭염은 단순한 더위가 아니라 야외 활동을 하는 모든 이들의 건강을 위협하는 무서운 자연재해입니다. KLIFE 에어컨 냉각조끼는 얼음 팩이 녹을까 봐 걱정할 필요 없이, 반도체 냉각과 듀얼 선풍기가 만들어내는 압도적인 시원함으로 여러분의 생명과 안전을 지켜줄 가장 확실한 투자입니다. 땀으로 얼룩진 찝찝한 여름은 이제 그만! 입는 즉시 얼음장 같은 쾌적함을 선사하는 첨단 쿨링 조끼를 장만하여 그 어느 해보다 시원하고 안전한 여름을 보내시길 강력하게 추천해 드립니다.',
  summary: '건설 현장 폭염 필수템! KLIFE 반도체 에어컨 냉각조끼 성능 리뷰'
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
