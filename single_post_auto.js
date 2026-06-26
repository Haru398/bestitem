const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-mybidet-balance-care',
  category: '생활용품',
  title: '민감한 Y존을 위한 상쾌한 선택! 마이비데 밸런스 케어 비데티슈 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\마이비데 밸런스 케어 비데티슈',
  backupDir: 'D:\\정식서버업로드전용폴더\\마이비데 밸런스 케어 비데티슈',
  link: 'https://link.coupang.com/a/eNP45v8ul2',
  iframe: '<iframe src="https://coupa.ng/cnApwg" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '화장실에서 볼일을 본 후, 뻣뻣하고 건조한 일반 화장지 닦아내면서 찜찜함이나 따가움을 느껴본 적 없으신가요? 특히 피부가 얇고 예민한 Y존 부위는 작은 마찰이나 자극에도 쉽게 짓무르거나 트러블이 발생할 수 있어 각별한 관리가 필요합니다. 물로 씻은 듯 완벽한 상쾌함은 물론, 피부 밸런스까지 지켜주어 화장실 필수템으로 자리 잡은 **크리넥스 마이비데 밸런스 케어 화장실용 물티슈**를 소개합니다.\n\n이 제품은 찝찝한 뒷처리를 깔끔하게 해결해 주는 것은 기본, 여성들의 민감한 부위나 잦은 배변으로 고통받는 아이들의 피부까지 고려하여 세심하게 설계된 프리미엄 비데티슈입니다. 외출해서 공중화장실을 이용할 때나 생리 기간의 불쾌함을 덜어주는 데에도 탁월한 효과를 발휘하는데요. 한번 쓰기 시작하면 절대 끊을 수 없다는 마성의 아이템, 마이비데 밸런스 케어의 놀라운 장점들을 하나씩 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '일반 물티슈와 마이비데가 확연하게 구분되는 가장 큰 특징은 바로 \'변기에 바로 버려도 막히지 않는 플러셔블(Flushable) 원단\'을 사용했다는 점입니다. 천연 펄프가 다량 함유된 특수 원단으로 제작되어, 물의 마찰력에 의해 쉽게 부서지고 하수처리 과정에서 자연스럽게 생분해됩니다. 다 쓴 티슈를 냄새나는 휴지통에 버릴 필요 없이 변기에 쏙 버리고 물만 내리면 되니, 냄새 걱정 없이 항상 청결하고 위생적인 화장실 환경을 유지할 수 있습니다.' },
    { img: '2.jpg', text: '이 제품은 이름 그대로 예민한 피부의 균형을 맞춰주는 \'Y존 맞춤형 밸런스 케어 성분\'을 함유하고 있습니다. 피부와 가장 유사한 약산성 pH 포뮬러를 적용하여 피부 본연의 방어막을 보호해 주며, 유산균(프리바이오틱스) 추출물과 국화 추출물이 함유되어 잦은 마찰로 붉어지거나 자극받은 피부를 부드럽게 진정시켜 줍니다. 독일 피부과학연구소 더마테스트에서 엑설런트(Excellent) 등급을 획득하여 온 가족이 안심하고 사용할 수 있습니다.' },
    { img: '3.jpg', text: '피부에 직접 닿는 제품인 만큼 원단 자체의 퀄리티도 압도적입니다. 피부를 긁어 자극을 주는 거친 원단이 아닌, \'입체적인 3D 웨이브 엠보싱 패턴\'이 적용된 도톰하고 부드러운 원단을 사용했습니다. 마치 부드러운 순면 속옷을 입은 듯한 포근한 감촉으로 굴곡진 부위의 이물질까지 뭉침 없이 말끔하게 닦아주며, 한두 장만 사용해도 뒷처리가 완벽하게 끝나는 우수한 닦임성을 자랑합니다.' },
    { img: '4.jpg', text: '언제 어디서나 상쾌함을 유지할 수 있도록 휴대성과 편의성까지 고려했습니다. 수분이 날아가지 않도록 꽉 잡아주는 튼튼한 캡형 패키지를 적용하여 마지막 한 장까지 촉촉하게 사용할 수 있으며, 한 장씩 쏙쏙 뽑히는 인터폴더 방식을 채택해 여러 장이 딸려 나오는 불편함을 없앴습니다. 가방에 쏙 들어가는 휴대용 사이즈부터 넉넉한 대용량 캡형까지 다양하게 출시되어 집 안방 화장실부터 캠핑장, 해외여행지까지 장소를 가리지 않고 완벽한 위생을 책임집니다.' }
  ],
  outro: '매일 가는 화장실, 이제 건조한 휴지만 고집하며 찝찝함을 참을 필요가 없습니다. 부드러운 천연 펄프 엠보싱 원단으로 물로 씻은 듯한 완벽한 상쾌함을 선사하고, 약산성 포뮬러로 민감한 피부의 밸런스까지 지켜주는 **마이비데 밸런스 케어 비데티슈**! 변기에 버려도 막힘없는 편리함과 안심할 수 있는 성분으로 당신의 일상적인 화장실 루틴을 가장 쾌적한 휴식 시간으로 업그레이드해 보시길 강력히 추천합니다.',
  summary: '민감한 Y존을 위한 상쾌한 선택! 마이비데 밸런스 케어 비데티슈 완벽 분석'
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
  if (row['폴더이름'] === '마이비데 밸런스 케어 비데티슈') {
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
