const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-nard-perfumed-shampoo',
  category: '뷰티/화장품',
  title: '향기 좋은 약산성 두피 케어, 나드 퍼퓸드 샴푸 화이트머스크 1L 성분 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\나드 리프레쉬 퍼퓸드 샴푸 화이트머스크향, 1L, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\나드 리프레쉬 퍼퓸드 샴푸 화이트머스크향, 1L, 1개',
  link: 'https://link.coupang.com/a/e61A7wVsjc',
  iframe: '<iframe src="https://coupa.ng/cnPgWl" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  intro: '머리를 감고 난 후 찰랑이는 머릿결에서 은은하게 퍼지는 고급스러운 샴푸 향기는 하루 종일 기분을 좋게 만드는 마법 같은 힘을 가지고 있습니다. 하지만 향기만을 쫓아 아무 샴푸나 사용하다 보면 두피가 건조해지고 각질이나 트러블이 발생하기 십상입니다. 두피 건강과 매혹적인 향기를 동시에 만족시킬 수는 없을까요? 그 해답으로 뷰티 커뮤니티에서 폭발적인 입소문을 타며 향기 좋은 샴푸의 대명사로 떠오른 제품이 있습니다. 바로 청정 히말라야의 자연 에너지를 담은 \'나드(NARD) 리프레쉬 퍼퓸드 샴푸 화이트머스크향 1L\'입니다. 예민한 두피를 다독이는 순한 약산성 포뮬러부터 명품 향수 못지않은 향의 비밀까지 자세히 분석해 드립니다.',
  sections: [
    { img: '1.jpg', text: '포근하고 관능적인 화이트머스크의 잔향: 이 샴푸의 가장 큰 매력 포인트는 단연 돋보이는 \'향기\'입니다. 단순하고 인공적인 화장품 향이 아니라, 전문 조향사가 세밀하게 블렌딩한 프리미엄 향료를 사용하여 명품 향수에서나 느낄 수 있는 깊고 풍부한 향을 구현했습니다. 처음엔 산뜻한 플로럴 노트로 시작하여 시간이 지날수록 부드럽고 포근한 화이트머스크의 잔향이 머리카락에 깊게 배어들어, 향수를 따로 뿌리지 않아도 온종일 매력적이고 관능적인 살냄새를 연출해 줍니다.' },
    { img: '2.jpg', text: '두피 장벽을 보호하는 pH 5.5 약산성 베이스: 알칼리성 샴푸를 장기간 사용하면 두피의 보호막이 손상되어 수분을 잃고 극심한 건조함이나 비듬, 가려움증을 유발할 수 있습니다. 나드 샴푸는 건강한 두피와 가장 유사한 산성도인 pH 5.5~6.0 수준의 약산성 포뮬러로 제작되었습니다. 세정 과정에서 두피의 피지와 수분 밸런스를 무너뜨리지 않고 자극을 최소화하여 노폐물만 순하게 씻어내므로, 민감성 두피를 가진 분들도 매일 안심하고 사용할 수 있는 진정한 두피 케어 제품입니다.' },
    { img: '3.jpg', text: '히말라야 나드 허브와 식물성 단백질의 영양 공급: 제품명에 들어간 \'나드(NARD)\'는 척박한 히말라야 고산지대에서 강인하게 자생하는 신비의 허브 이름입니다. 이 나드 허브의 강인한 생명력과 진정 성분을 샴푸에 그대로 담아내어 스트레스 받은 두피를 편안하게 다독여 줍니다. 또한 하이드롤라이즈드 실크, 케라틴 등 입자가 미세한 식물성 단백질 성분과 11가지 자연 유래 오일이 함유되어, 푸석하고 엉키는 극손상 모발의 큐티클 틈새를 꼼꼼하게 채워주고 윤기 나는 머릿결로 가꾸어 줍니다.' },
    { img: '4.jpg', text: '온 가족이 넉넉하게 사용하는 1L 괴물 용량: 샴푸는 매일매일 소비하는 필수 생필품인 만큼 가성비 또한 무시할 수 없는 요소입니다. 이 제품은 무려 1,000ml(1L)에 달하는 어마어마한 대용량 사이즈로 출시되어 가족 구성원이 많은 다인 가구에서도 펌핑 횟수 눈치 볼 필요 없이 마음껏 넉넉하게 사용할 수 있습니다. 고가의 프리미엄 향료와 자연 유래 성분을 듬뿍 담았음에도 합리적인 가격대를 유지하여, 품질과 가성비를 모두 충족시키는 현명한 소비재로 각광받고 있습니다.' }
  ],
  outro: '나드 리프레쉬 퍼퓸드 샴푸 화이트머스크향 1L는 단순히 머리를 감는 행위를 넘어, 샤워 시간을 나만의 작은 힐링 테라피로 바꿔주는 특별한 뷰티 아이템입니다. 부드러운 약산성 거품이 두피를 편안하게 씻어내고, 찰랑이는 모발 끝에서 은은하게 퍼지는 화이트머스크 향기는 주변 사람들의 시선을 사로잡기에 충분합니다. 지친 두피에 생기를 불어넣고 나만의 시그니처 향기를 갖고 싶으시다면, 주저 없이 나드 퍼퓸드 샴푸를 선택해 보시길 적극 추천합니다.',
  summary: '향기 좋은 약산성 두피 케어, 나드 퍼퓸드 샴푸 화이트머스크 1L 성분 분석'
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
