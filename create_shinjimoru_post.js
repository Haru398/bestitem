const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = '신지모루 사생활 보호 9H 고경도 강화유리 신지글래스 풀커버 프라이버시 휴대폰 액정보호필름';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-shinjimoru-privacy-glass';
const CATEGORY = '가전/디지털'; 
const TITLE = '아이폰 사생활 완벽 차단! 신지모루 프라이버시 강화유리 풀커버 필름 상세 리뷰';
const SEO_KEYWORD = '신지모루 사생활 보호 필름, 신지글래스 풀커버, 아이폰 프라이버시 필름, 9H 고경도 강화유리, 휴대폰 액정보호필름 추천';
const SUMMARY = '대중교통이나 공공장소에서 타인의 시선을 완벽하게 차단해주는 신지모루 사생활 보호 9H 고경도 풀커버 강화유리 필름을 소개합니다. 빈틈없는 일체감과 2매 세트의 든든한 구성까지, 완벽한 사생활 보호를 위한 필수 아이템의 스펙을 분석합니다.';

const wb = xlsx.readFile(EXCEL_PATH);
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet);
const itemRow = rows.find(r => r['폴더이름'] === FOLDER_NAME);

if (!itemRow) {
  console.error('엑셀에서 해당 상품을 찾을 수 없습니다.');
  process.exit(1);
}

const coupangLink = itemRow['쿠팡링크'];
const coupangHtml = itemRow['HTML일반태그'];

const db = new Database(path.join(WORKSPACE, 'dev.db'));

const postData = {
  postId: POST_ID,
  status: 'PUBLISHED',
  version: 2,
  category: CATEGORY,
  title: TITLE,
  summary: SUMMARY,
  thumbnail: `/images/shinjimoru/썸네일.png`,
  intro: `출퇴근길 지하철이나 버스, 혹은 카페에서 스마트폰을 볼 때 옆 사람의 시선이 신경 쓰이셨던 적이 있으신가요? 개인 정보가 담긴 메신저나 금융 앱을 사용할 때 누군가 훔쳐본다는 느낌은 상당한 스트레스입니다.
오늘 분석할 제품은 이러한 고민을 단번에 해결해 줄 **신지모루 사생활 보호 9H 고경도 강화유리 풀커버 필름**입니다. 스마트폰 액세서리의 명가 신지모루가 만든 이 제품은 단순히 외부 시야를 차단하는 프라이버시 기능을 넘어, 기기를 완벽하게 보호하는 9H 고경도 강화유리의 역할까지 충실히 수행합니다. 

제공된 이미지를 바탕으로, 이 필름이 왜 사생활 보호와 액정 보호라는 두 마리 토끼를 모두 잡은 최고의 선택인지 그 핵심 기능들을 꼼꼼하게 살펴보겠습니다.`,
  outro: `### 9. 총평
더 이상 공공장소에서 타인의 시선을 의식하며 화면을 가리거나 밝기를 억지로 낮출 필요가 없습니다. **신지모루 사생활 보호 풀커버 강화유리**는 완벽한 시야 차단 효과와 9H 고경도의 강력한 액정 보호 능력, 그리고 실패 없는 부착 가이드까지 모든 면에서 높은 완성도를 보여주는 제품입니다.
여기에 든든한 2매 세트 구성으로 가성비까지 챙겼으니, 내 스마트폰의 안전과 소중한 프라이버시를 모두 지키고자 하는 분들께 가장 현명한 투자가 될 것입니다.`,
  coupangLink: coupangLink,
  coupangHtml: coupangHtml,
  errorInfo: '',
  lastFailedStatus: '',
  views: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

db.prepare('DELETE FROM posts_v2 WHERE postId = ?').run(POST_ID);
db.prepare('DELETE FROM post_sections WHERE postId = ?').run(POST_ID);

const insertPost = db.prepare(`
  INSERT INTO posts_v2 (
    postId, status, version, category, title, summary, thumbnail, 
    intro, outro, coupangLink, coupangHtml, errorInfo, lastFailedStatus, 
    views, createdAt, updatedAt
  ) VALUES (
    @postId, @status, @version, @category, @title, @summary, @thumbnail,
    @intro, @outro, @coupangLink, @coupangHtml, @errorInfo, @lastFailedStatus,
    @views, @createdAt, @updatedAt
  )
`);
insertPost.run(postData);

const sections = [
  {
    order: 1,
    img: '1.png',
    text: `### 1. 외부 시선 차단! 오직 나를 위한 화면
첫 번째 사진은 제품의 가장 핵심적인 기능인 **사생활 보호(Privacy)** 기술을 직관적으로 보여줍니다. 정면에서 바라보는 사용자에게는 선명하고 쨍한 화면을 그대로 제공하지만, 측면으로 각도가 조금만 틀어져도 화면이 새까맣게 변하여 외부의 시선을 완벽하게 차단합니다. '시선에서 벗어난, 진짜 나만의 화면'이라는 문구처럼 만원 지하철이나 버스에서도 안심하고 메신저나 은행 업무를 볼 수 있습니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 한눈에 보는 핵심 기능 요약
두 번째 이미지는 이 제품이 자랑하는 주요 기능들을 아이콘으로 요약해 줍니다.
- **외부 시선 차단**: 완벽한 프라이버시 보호 기술
- **빈틈 없는 일체감**: 화면 끝까지 덮어주는 풀커버 보호
- **9H 강화 유리**: 일상적인 스크래치와 충격으로부터 화면 완벽 보호
- **가로 화면 공유**: 영상을 볼 때 등 편의성을 높인 가로 화면 공유 기능
- **2매 세트 제공**: 실패나 파손 시 대비할 수 있는 여유로운 구성
- **특수 코팅**: 화질 저하를 최소화하고 지문 묻어남을 줄인 부드러운 터치감`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 마음까지 든든해지는 2매 세트 구성
세 번째 이미지는 패키지에 포함된 **강화유리 2매 세트**를 강조하고 있습니다. 액정 보호 필름을 부착하다가 먼지가 들어가 실패해 본 경험, 혹은 실수로 스마트폰을 떨어뜨려 유리가 파손된 경험은 누구나 한 번쯤 있을 것입니다. 신지모루는 예상치 못한 파손이나 부착 실패 상황에서도 즉시 교체할 수 있도록 넉넉하게 2매를 기본 제공하여, 소비자가 느낄 수 있는 심리적 불안감을 완벽하게 덜어줍니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 똥손도 성공하는 손쉬운 부착 가이드
네 번째 사진은 처음 강화유리를 붙이는 사람도 실패 없이 완성할 수 있도록 돕는 **가이드 맞춤형 부착 순서**를 안내합니다.
1. **액정 클리닝**: 동봉된 WET 클리너, 천, 먼지 제거 스티커로 표면을 깨끗하게 닦아냅니다.
2. **보호필름 제거**: 강화유리 접착면의 보호필름을 조심스럽게 떼어냅니다.
3. **위치 조정 및 올리기**: 화면 테두리에 맞춰 강화유리를 사뿐히 올려놓습니다.
4. **눌러서 접착 완료**: 가운데를 위에서 아래로 가볍게 쓱 눌러주면 기포 없이 스르륵 부착됩니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 아낌없이 주는 완벽한 제품 구성품
다섯 번째 이미지는 필름 부착에 필요한 모든 것이 담긴 **디테일한 패키지 구성**을 보여줍니다. 
메인 구성품인 강화유리 2매는 물론, 극세사 클리너 천 2매, 알코올 솜(WET 클리너) 2매, 먼지 제거용 스티커 2매까지 부착 준비물도 필름 개수에 맞춰 완벽하게 1:1로 제공됩니다. 따로 준비물을 챙길 필요 없이 이 패키지 하나만 있으면 어디서든 깔끔한 부착이 가능합니다.`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 활용 방법
- **대중교통 출퇴근 시**: 옆 사람의 눈치를 보지 않고 개인 카카오톡이나 SNS, 회사 업무용 메신저를 자유롭게 사용할 수 있습니다.
- **영상 시청 시 (가로 모드)**: 스마트폰을 가로로 돌리면 시야각 차단이 해제되므로, 친구나 연인과 함께 화면을 공유하며 유튜브나 넷플릭스를 감상할 수 있습니다.
- **액정 파손 방지용**: 9H 고경도 유리가 씌워져 있어 실수로 폰을 떨어뜨려도 본체 액정 대신 필름이 충격을 흡수하고 깨지므로 수리비 폭탄을 막아줍니다.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 추천 대상
- 지하철, 버스 등 사람이 밀집된 공간에서 폰을 자주 사용하시는 분
- 모바일 뱅킹, 주식 앱, 개인적인 메신저 사용 시 타인의 시선이 극도로 신경 쓰이시는 분
- 일반 필름은 흠집이 잘 나서 튼튼한 9H 강화유리를 선호하시는 분
- 필름 부착에 소질이 없어 여분의 필름(2매)이 필수라고 생각하시는 분`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- 프라이버시 필름의 특성상 일반 투명 강화유리에 비해 화면 밝기가 미세하게 어두워 보일 수 있으므로, 평소보다 스마트폰 밝기를 조금 높여 사용하는 것을 권장합니다.
- 세로 모드(위/아래) 방향에서는 시야각이 차단되지만, 가로 모드(좌/우)에서는 화면 공유를 위해 시야 차단이 적용되지 않습니다.
- 사용 중인 스마트폰의 정확한 기종명과 디스플레이 크기를 반드시 확인 후 구매하셔야 들뜸 없이 완벽하게 호환됩니다.`
  }
];

const insertSec = db.prepare(`
  INSERT INTO post_sections (postId, sectionOrder, image, imageAlt, text, qualityScore, createdAt, updatedAt)
  VALUES (@postId, @sectionOrder, @image, '', @text, 100, @now, @now)
`);

for (const sec of sections) {
  insertSec.run({
    postId: POST_ID,
    sectionOrder: sec.order,
    image: sec.img ? `/images/shinjimoru/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (신지모루)');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/shinjimoru');
if (!fs.existsSync(PUBLIC_IMG_DIR)) {
  fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR);
for (const file of files) {
  const srcFile = path.join(SOURCE_DIR, file);
  fs.copyFileSync(srcFile, path.join(BACKUP_DIR, file));
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    fs.copyFileSync(srcFile, path.join(PUBLIC_IMG_DIR, file));
  }
}

const metaInfo = {
  seoTitle: TITLE,
  seoKeyword: SEO_KEYWORD,
  metaDescription: SUMMARY,
  category: CATEGORY,
  postUrl: `https://item.monster/post/${POST_ID}/`
};
fs.writeFileSync(path.join(BACKUP_DIR, 'SEO_META.json'), JSON.stringify(metaInfo, null, 2));
fs.writeFileSync(path.join(BACKUP_DIR, '게시글원본.json'), JSON.stringify(postData, null, 2));

itemRow['작업여부'] = 'O';
const newSheet = xlsx.utils.json_to_sheet(rows);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, EXCEL_PATH);
console.log('✅ 엑셀 및 백업 완료 (신지모루)');
