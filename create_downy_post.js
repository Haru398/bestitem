const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('D:\\\\서버구축폴더\\\\scratch\\\\node_modules\\\\xlsx');
const { execSync } = require('child_process');

// 설정
const WORKSPACE = 'D:\\\\서버구축폴더\\\\bestitem';
const EXCEL_PATH = 'D:\\\\쿠팡파트너스엑셀작업목록\\\\쿠팡파트너스_작업목록_템플릿.xlsx';
const SOURCE_DIR_NAME = '다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 본품, 1.05L, 3개';
const SOURCE_DIR = path.join('D:\\\\정식홈페이지자동화', SOURCE_DIR_NAME);
const BACKUP_DIR = path.join('D:\\\\정식서버업로드전용폴더', SOURCE_DIR_NAME);
const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public', 'images', 'downy_mystique');
const POST_ID = 'item-downy-mystique-1';

// 1. 디렉토리 준비 및 이미지 복사
if (!fs.existsSync(PUBLIC_IMG_DIR)) fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

// 소스에서 public 및 백업으로 이미지 복사
const files = fs.readdirSync(SOURCE_DIR);
for (const file of files) {
  const srcPath = path.join(SOURCE_DIR, file);
  fs.copyFileSync(srcPath, path.join(BACKUP_DIR, file)); // 원본 백업
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    fs.copyFileSync(srcPath, path.join(PUBLIC_IMG_DIR, file)); // 웹 서버용 복사
  }
}

// 2. DB 입력
const db = new Database(path.join(WORKSPACE, 'dev.db'));

// posts_v2 기본 정보
const postData = {
  postId: POST_ID,
  status: 'PUBLISHED',
  version: 2,
  category: '생활용품',
  title: '다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 주요 기능과 활용 방법 알아보기',
  summary: '고급스러운 호텔 수건의 향기를 집에서도 느낄 수 있는 다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크의 핵심 기능, 세탁 시 활용 방법, 사용 환경 및 구매 전 필수 확인사항을 상세히 분석해 드립니다.',
  thumbnail: `/images/downy_mystique/썸네일.png`,
  intro: `매일 입는 옷과 피부에 직접 닿는 수건, 침구류 세탁에 있어 섬유유연제는 빼놓을 수 없는 필수품입니다. 특히 세탁 후 건조 과정에서 은은하게 퍼지는 향기는 하루의 기분까지 좌우하곤 합니다. 오늘 소개해 드릴 제품은 일상적인 세탁물을 5성급 호텔에서 경험할 수 있는 프리미엄 감각으로 업그레이드해주는 **다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크**입니다.

이 제품은 일반적인 섬유유연제와 달리 초고농축 포뮬러를 적용하여 적은 양으로도 강력한 유연 효과와 향 지속력을 자랑합니다. 지금부터 다우니 미스티크의 핵심 특징, 기능적 장점, 그리고 실생활에서의 구체적인 활용 가이드라인까지 심층적으로 분석해 보겠습니다.`,
  outro: `### 총평 및 마무리

다우니 초고농축 호텔 컬렉션 미스티크는 단순한 세탁 보조제를 넘어 일상에 프리미엄 향기를 더해주는 라이프스타일 아이템입니다. 초고농축의 경제성, 호텔 감성의 럭셔리한 미스티크 향, 그리고 옷감을 보호하는 강력한 유연 효과까지 삼박자를 고루 갖춘 제품입니다. 매일 피부에 닿는 수건이나 침구류부터 외출복까지 폭넓게 활용할 수 있으며, 특히 실내 건조가 잦은 1인 가구나 대가족 모두에게 높은 만족도를 선사할 것입니다. 향기로운 일상을 원하신다면 지금 바로 확인해 보세요.`,
  coupangLink: 'https://link.coupang.com/a/eI7RtU0wFg',
  coupangHtml: `<iframe src="https://coupa.ng/cnw2ch" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>`,
  errorInfo: null,
  lastFailedStatus: null,
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

// 섹션 생성 (1.png ~ 5.png 사용)
const sections = [
  {
    order: 1,
    img: '1.png',
    text: `### 1. 호텔 컬렉션만의 프리미엄 향기: 미스티크(Mystique)의 매력
첫 번째로 주목할 점은 제품의 핵심인 **'미스티크' 향의 구조**입니다. 이 제품은 이름에서 알 수 있듯 럭셔리 호텔에서 영감을 받은 특별한 조향 기술이 적용되었습니다. 탑 노트의 상쾌함부터 베이스 노트의 묵직하고 우아한 머스크/우디 계열 향까지 단계별로 발향되어 옷을 입고 있는 내내 은은하고 고급스러운 분위기를 연출합니다. 강하고 자극적인 인공향이 아닌, 깊고 풍부한 잔향이 특징이기 때문에 향수에 민감한 분들도 부담 없이 사용할 수 있는 것이 큰 장점입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 초고농축 포뮬러: 1/3만 써도 충분한 강력한 유연 효과
일반 섬유유연제 대비 뛰어난 가성비를 자랑하는 이유는 바로 **초고농축 기술력**에 있습니다. 일반(비농축) 제품 기준 1컵을 넣어야 할 세탁량에도 다우니 초고농축 제품은 약 1/3 컵만 사용해도 동일하거나 그 이상의 부드러움과 향기를 제공합니다. 무겁게 큰 통을 들고 계량할 필요가 없으며, 1.05L 용량 3개 세트 구성만으로도 수십 번의 세탁을 거뜬히 소화해 내어 장기적인 관점에서 경제성과 실용성이 매우 뛰어납니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 세탁 환경별 맞춤 활용 방법 가이드
섬유유연제의 효과를 극대화하기 위해서는 올바른 활용법이 중요합니다.
- **표준 사용량 준수**: 수위나 세탁물의 양에 맞게 뚜껑에 표시된 계량선을 정확히 지키는 것이 향기 지속력의 핵심입니다.
- **수건 및 침구류 세탁**: 특히 수건이나 겨울철 두꺼운 이불 세탁 시 마지막 헹굼 단계에 적정량을 넣으면 섬유 결이 살아나 호텔 수건처럼 보송보송한 감촉을 경험할 수 있습니다.
- **주의사항**: 세제와 섬유유연제가 직접 섞이지 않도록 반드시 세탁기의 전용 투입구를 사용해야 찌꺼기 없는 깔끔한 세탁이 완성됩니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 다양한 사용 환경 및 추천 대상 분석
다우니 호텔 컬렉션은 특정 환경을 가리지 않고 널리 쓰일 수 있습니다.
- **실내 건조 환경**: 통풍이 잘되지 않는 실내에서 건조하더라도 꿉꿉한 냄새 대신 고급스러운 잔향을 남기므로 원룸 거주자나 장마철 세탁에 강력히 추천합니다.
- **향수 대용**: 강한 향수 냄새를 선호하지 않고 '내 살 냄새'처럼 자연스럽고 은은한 향을 원하는 직장인 및 학생들에게 훌륭한 대안이 됩니다.
- **피부 마찰 최소화**: 강력한 유연 효과로 옷감의 정전기를 방지하고 피부에 닿는 감촉을 부드럽게 만들어주어 니트나 플리스 소재를 자주 입는 겨울철 필수 아이템입니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 구매 전 반드시 체크해야 할 핵심 포인트
최적의 소비를 위해 구매 전 다음 사항들을 확인해 보시길 권장합니다.
- **구성 및 용량**: 본 제품은 1.05L 본품이 3개 포함된 구성으로, 대가족이 사용하기에도 넉넉한 짐승 용량을 자랑합니다.
- **세탁기 호환성**: 통돌이(일반) 세탁기와 드럼 세탁기 구분 없이 모두 사용 가능한 공용 포뮬러로 제작되어 기종 변경 시에도 고민 없이 사용할 수 있습니다.
- **보관 방법**: 직사광선을 피해 서늘한 곳에 보관해야 고유의 향기와 농축된 텍스처가 변질 없이 오래 유지됩니다.`
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
    image: `/images/downy_mystique/${sec.img}`,
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료');

// 3. 엑셀 업데이트
const wb = xlsx.readFile(EXCEL_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws);
let found = false;
for (let i = 0; i < data.length; i++) {
  if (data[i]['폴더이름'] === SOURCE_DIR_NAME) {
    data[i]['작업여부'] = 'O';
    found = true;
    break;
  }
}
if (found) {
  const newWs = xlsx.utils.json_to_sheet(data);
  wb.Sheets[wb.SheetNames[0]] = newWs;
  xlsx.writeFile(wb, EXCEL_PATH);
  console.log('✅ 엑셀 업데이트 완료');
}

// 4. 백업 폴더에 추가 메타데이터 저장 (V9 15장 준수)
const metaInfo = {
  seoTitle: postData.title,
  seoKeyword: '다우니 호텔컬렉션 미스티크',
  metaDescription: postData.summary,
  category: postData.category,
  postUrl: `https://item.monster/post/${POST_ID}/`
};
fs.writeFileSync(path.join(BACKUP_DIR, 'SEO_META.json'), JSON.stringify(metaInfo, null, 2));
fs.writeFileSync(path.join(BACKUP_DIR, '게시글원본.json'), JSON.stringify(postData, null, 2));

console.log('✅ 빌드 및 배포 스크립트는 외부에서 실행합니다.');
