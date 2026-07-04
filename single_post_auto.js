const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-pebblepet-water-dispenser-ipw200',
  category: '반려동물용품',
  title: '고양이 신장 건강을 위한 필수템! 페블펫 3중 여과 워터슬라이드 자동급수기 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\페블펫 3중여과 대용량 워터슬라이드 자동급수기 IPW200',
  backupDir: 'D:\\정식서버업로드전용폴더\\페블펫 3중여과 대용량 워터슬라이드 자동급수기 IPW200',
  link: 'https://link.coupang.com/a/e6UFHMjn2a',
  iframe: '<iframe src="https://coupa.ng/cnPbRc" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  intro: '반려묘나 반려견을 키우는 보호자라면 아이들의 충분한 수분 섭취가 얼마나 중요한지 잘 알고 계실 겁니다. 물을 잘 마시지 않는 고양이들은 요로결석이나 만성 신부전 같은 치명적인 질환에 노출될 위험이 높기 때문에, 깨끗하고 신선한 물을 호기심 있게 마시도록 유도하는 것이 매우 중요합니다. 시중에 많은 고양이 정수기가 있지만, 잦은 필터 교체의 번거로움과 청소의 어려움, 그리고 웅웅거리는 모터 소음 때문에 구매를 후회하는 분들도 많습니다. 이러한 단점들을 완벽하게 보완하고, 아이들의 음수량을 획기적으로 늘려줄 혁신적인 디자인과 기술력을 갖춘 \'페블펫 3중 여과 대용량 워터슬라이드 자동급수기(IPW200)\'의 장점과 특징을 하나씩 살펴보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 특징은 반려동물의 호기심을 극대화하는 \'워터슬라이드\' 디자인입니다. 고양이들은 고여 있는 물보다 졸졸 흐르는 물에 훨씬 더 큰 흥미를 느낍니다. 자연 속 옹달샘이나 작은 폭포처럼 미끄러져 내려오는 슬라이드 형태의 물줄기는 아이들의 야생 본능을 자극하여 스스로 물을 마시러 오게 만드는 마법 같은 효과를 보여줍니다. 평소 물그릇 근처에도 가지 않던 까다로운 아이들도 호기심에 물장난을 치다가 자연스럽게 음수량이 늘어나게 됩니다.' },
    { img: '2.jpg', text: '마시는 물의 퀄리티는 필터 성능이 좌우합니다. 페블펫 자동급수기에는 촘촘한 고밀도 마이크로 코튼, 천연 코코넛 껍질 활성탄, 그리고 이온 교환 수지로 구성된 \'강력한 3중 여과 시스템\'이 탑재되어 있습니다. 공기 중에 떠다니는 먼지나 털은 물론, 수돗물 특유의 염소 냄새와 눈에 보이지 않는 중금속, 마그네슘 등의 유해 물질까지 완벽하게 걸러내어, 사람이 마셔도 될 만큼 깨끗하고 부드러운 연수를 지속적으로 공급합니다.' },
    { img: '3.jpg', text: '아무리 좋은 급수기라도 청소가 불편하면 세균 번식의 온상이 되기 쉽습니다. 이 제품은 보호자의 관리 편의성을 극대화하기 위해 내부에 복잡한 구조물이나 사각지대를 완전히 없앤 \'완전 분리형 간편 세척 설계\'를 채택했습니다. 펌프와 수조, 슬라이드 부품이 1초 만에 분리되어 구석구석 시원하게 물세척을 할 수 있으며, 찌든 물때나 곰팡이 걱정 없이 항상 새것처럼 위생적으로 관리할 수 있습니다.' },
    { img: '4.jpg', text: '소음 문제 역시 완벽하게 해결했습니다. 초저소음 수중 모터를 장착하여 기계가 작동하는 웅웅거리는 진동 소음을 최소화하였고, 슬라이드를 타고 물이 흘러내리는 소리 또한 귀에 거슬리지 않는 잔잔한 백색소음 수준으로 설계되었습니다. 예민한 고양이들도 스트레스 없이 다가올 수 있으며, 침실 옆에 두어도 보호자의 숙면을 전혀 방해하지 않는 고요함을 자랑합니다.' },
    { img: '5.jpg', text: '물을 자주 채워줘야 하는 번거로움을 덜어주는 \'2L의 넉넉한 대용량 수조\'를 갖추고 있습니다. 고양이 한 마리 기준으로 약 일주일 동안 충분히 마실 수 있는 물의 양으로, 바쁜 직장인이나 주말에 며칠씩 집을 비워야 하는 1인 가구 보호자들에게도 안성맞춤입니다. 반투명한 수조 디자인 덕분에 뚜껑을 열지 않고도 외부에서 직관적으로 물의 잔량을 실시간으로 확인할 수 있어 더욱 편리합니다.' },
    { img: '6.jpg', text: '안전성도 절대 타협하지 않았습니다. 아이들이 물어뜯을 수 있는 전원 케이블은 질기고 튼튼한 직조 소재로 마감하여 단선이나 감전의 위험을 원천 차단했습니다. 또한, 물이 일정 수위 이하로 떨어지면 모터가 공회전하여 타버리는 것을 막기 위해 \'스마트 자동 전원 차단 기능\'이 내장되어 있어, 혹시 모를 화재의 위험으로부터 보호자와 반려동물의 안전을 완벽하게 지켜줍니다.' }
  ],
  outro: '페블펫 3중 여과 워터슬라이드 자동급수기는 아이들의 음수량을 늘리기 위한 재미있는 디자인부터, 깨끗한 수질 관리를 위한 3중 여과 시스템, 그리고 보호자의 편의성을 생각한 세척과 소음 문제까지, 반려동물 정수기가 갖춰야 할 모든 요건을 충족하는 프리미엄 급수기입니다. 사랑하는 털뭉치들의 건강한 신장과 요로 관리를 위해, 이보다 더 완벽한 선택은 없을 것입니다.',
  summary: '고양이 신장 건강을 위한 필수템! 페블펫 3중 여과 워터슬라이드 자동급수기 완벽 분석'
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
