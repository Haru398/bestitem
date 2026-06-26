const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const product = {
  id: 'item-dashu-body-spray',
  category: '뷰티',
  title: '여름철 체취 관리 끝판왕! 다슈 퍼퓸 데오 바디스프레이 프레쉬 블루 완벽 분석',
  sourceDir: 'D:\\정식홈페이지자동화\\다슈 솔루션 퍼퓸 데오 바디스프레이 프레쉬 블루, 200ml, 1개',
  backupDir: 'D:\\정식서버업로드전용폴더\\다슈 솔루션 퍼퓸 데오 바디스프레이 프레쉬 블루, 200ml, 1개',
  link: 'https://link.coupang.com/a/eNObvXY4TA',
  iframe: '<iframe src="https://coupa.ng/cnAo58" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  images: ['썸네일.jpg', '1.jpg', '2.png', '3.png', '4.png'],
  intro: '무더운 여름철, 조금만 움직여도 쏟아지는 땀 때문에 혹시라도 불쾌한 냄새가 나지 않을까 신경 쓰이는 분들이 많습니다. 특히 대중교통을 이용하거나 밀폐된 공간에서 사람들을 만나야 할 때 땀 냄새는 첫인상을 망치는 치명적인 요인이 될 수 있는데요. 불쾌한 체취는 확실하게 잡아주고, 은은하고 세련된 향기만을 남겨 하루 종일 상쾌함을 유지해 주는 남성들의 여름 필수템, **다슈 솔루션 퍼퓸 데오 바디스프레이 프레쉬 블루**를 소개합니다.\n\n이 제품은 단순한 땀 냄새 제거를 넘어, 고급 니치 향수 부럽지 않은 청량하고 세련된 시트러스 블루 향을 선사하는 신개념 데오드란트입니다. 200ml의 대용량으로 땀이 많이 나는 겨드랑이나 목덜미, 가슴 등 전신에 부담 없이 팍팍 뿌릴 수 있으며, 끈적임 없이 보송하게 마무리되어 불쾌지수가 높은 날씨에도 산뜻한 피부 상태를 유지해 주는데요. 올여름 땀 냄새 걱정 없이 매력적인 향기를 완성해 줄 다슈 데오 바디스프레이의 장점들을 꼼꼼하게 파헤쳐 보겠습니다.',
  sections: [
    { img: '1.jpg', text: '이 제품의 가장 큰 매력은 땀 냄새와 섞여 악취를 유발하는 저렴한 방향제 향이 아닌, 전문 조향사가 섬세하게 블렌딩한 \'고급스러운 프레쉬 블루 향\'을 담아냈다는 점입니다. 첫 향은 레몬과 베르가못의 상큼하고 청량한 시트러스 향으로 시작하여, 시간이 지날수록 은은하고 부드러운 머스크와 우디 향이 잔잔하게 남아 호불호 없이 누구나 좋아하는 세련된 남성의 이미지를 완성해 줍니다. 굳이 무거운 향수를 따로 뿌릴 필요 없이 이 스프레이 하나로 매력적인 향기 코디가 가능합니다.' },
    { img: '2.png', text: '여름철 바디 제품에서 가장 중요한 것은 바로 사용감입니다. 다슈 바디스프레이는 피부에 분사하는 즉시 미세한 쿨링 입자가 달아오른 피부 온도를 시원하게 낮춰주며, 끈적임이나 미끈거림 없이 순식간에 보송보송하게 건조됩니다. 특허받은 피지 흡착 파우더 성분이 함유되어 있어 땀이 많이 나는 부위에 뿌려주면 하루 종일 땀차는 찝찝함 없이 산뜻하고 쾌적한 피부 상태를 유지할 수 있습니다.' },
    { img: '3.png', text: '악취의 근본적인 원인을 해결하는 \'강력한 데오드란트 효과\'도 빼놓을 수 없습니다. 단순히 강한 향으로 냄새를 덮는 눈속임 방식이 아니라, 땀 냄새를 유발하는 박테리아의 번식을 억제하고 불쾌한 체취 분자를 효과적으로 중화시키는 소취 특허 성분을 함유하고 있습니다. 아침에 외출하기 전 전신에 가볍게 뿌려주는 것만으로도 퇴근할 때까지 땀 냄새 걱정 없이 자신감 넘치는 일상을 보낼 수 있습니다.' },
    { img: '4.png', text: '200ml의 넉넉한 대용량 사이즈로 출시되어 가성비 또한 훌륭합니다. 향수처럼 아껴 쓸 필요 없이 샤워 후 전신에 듬뿍 뿌리거나, 외출 중 땀을 많이 흘렸을 때 옷 위나 몸에 수시로 덧뿌려 주기 좋습니다. 한 손에 착 감기는 그립감 좋은 스프레이 용기는 넓은 부위에 고르게 분사되는 안개 분사 펌프를 채택하여, 등이나 다리 등 손이 잘 닿지 않는 곳까지 뭉침 없이 간편하게 사용할 수 있습니다.' }
  ],
  outro: '땀 냄새로 눈치 보였던 지난여름의 기억은 이제 지워버리셔도 좋습니다. 불쾌한 체취는 완벽하게 차단하고, 시원하고 세련된 시트러스 블루 향기로 당신의 매력을 한층 업그레이드해 줄 **다슈 솔루션 퍼퓸 데오 바디스프레이 프레쉬 블루**! 끈적임 없는 보송한 마무리감과 넉넉한 대용량까지, 올여름 쾌적하고 향기로운 라이프스타일을 위한 최고의 선택이 될 것입니다. 지금 바로 경험해 보세요.',
  summary: '여름철 체취 관리 끝판왕! 다슈 퍼퓸 데오 바디스프레이 프레쉬 블루 완벽 분석'
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
  if (row['폴더이름'] === '다슈 솔루션 퍼퓸 데오 바디스프레이 프레쉬 블루, 200ml, 1개') {
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
