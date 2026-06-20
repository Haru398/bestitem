const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

// 설정
const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = 'Apple 정품 아이폰 맥세이프 투명 케이스';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-apple-magsafe-case';
const CATEGORY = '가전/디지털'; // 폰 액세서리
const TITLE = '아이폰 본연의 컬러를 살리는 애플 정품 맥세이프 투명 케이스 상세 분석';
const SEO_KEYWORD = '애플 정품 케이스, 아이폰 맥세이프 투명 케이스, 아이폰 정품 케이스, 맥세이프 케이스 추천, 아이폰 투명 케이스';
const SUMMARY = '아이폰 고유의 색상을 완벽하게 투영하면서도 강력한 자력으로 맥세이프 액세서리 호환성을 자랑하는 Apple 정품 아이폰 맥세이프 투명 케이스의 디자인과 핏감을 분석합니다.';

// 엑셀에서 쿠팡링크, HTML 태그 가져오기
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

// DB 입력 준비
const db = new Database(path.join(WORKSPACE, 'dev.db'));

const postData = {
  postId: POST_ID,
  status: 'PUBLISHED',
  version: 2,
  category: CATEGORY,
  title: TITLE,
  summary: SUMMARY,
  thumbnail: `/images/apple_case/썸네일.png`,
  intro: `매년 새로운 아이폰이 출시될 때마다 사용자들이 가장 먼저 고민하는 액세서리는 단연 '케이스'일 것입니다. 특히 아이폰 시리즈의 경우 기기 본연의 아름다운 색상과 디자인을 돋보이게 하고 싶어 하는 분들이 많습니다.
오늘 분석할 제품은 수많은 서드파티 케이스들 중에서도 압도적인 일체감과 변색 저항성을 자랑하는 **Apple 정품 아이폰 맥세이프 투명 케이스**입니다. 오직 애플만이 구현할 수 있는 정교한 핏감은 물론, 케이스 뒷면에 내장된 마그네틱 링을 통해 맥세이프(MagSafe) 무선 충전기 및 다양한 액세서리와 완벽하게 호환되는 점이 특징입니다.

아이폰의 고유한 컬러를 가리지 않으면서도 안정적인 보호력과 편의성을 제공하는 이 정품 케이스가 왜 많은 아이폰 유저들의 '종착지'로 불리는지, 제공된 이미지를 통해 디자인과 핏감을 꼼꼼하게 살펴보겠습니다.`,
  outro: `### 9. 총평
서드파티 제품들이 가격 경쟁력을 무기로 내세우지만, 핏감과 디테일, 맥세이프 자력의 안정성 면에서 Apple 정품 액세서리가 주는 신뢰감은 확고합니다. 'Apple 정품 아이폰 맥세이프 투명 케이스'는 내 폰의 컬러를 있는 그대로 자랑하면서도 스크래치와 외부 충격으로부터 든든하게 기기를 보호합니다. 
황변 현상을 최소화한 고급 소재와 뛰어난 맥세이프 호환성까지, 아이폰의 디자인 철학을 가장 잘 이해하고 있는 제조사가 만든 완성도 높은 투명 케이스를 찾으신다면 후회 없는 선택이 될 것입니다.`,
  coupangLink: coupangLink,
  coupangHtml: coupangHtml,
  errorInfo: '',
  lastFailedStatus: '',
  views: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// 기존 데이터 삭제
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
    text: `### 1. 아이폰의 화사한 컬러를 100% 투영하는 클리어 디자인
첫 번째 사진은 오렌지 계열의 화사한 아이폰 후면에 정품 맥세이프 투명 케이스를 장착한 모습입니다. 카메라 섬을 비롯해 기기 측면의 곡선까지 한 치의 오차 없이 완벽하게 맞아떨어지는 **정품 특유의 정교한 핏감**을 확인할 수 있습니다.
일반 저가형 투명 케이스에서 흔히 발생하는 유막 현상이나 핏의 어긋남 없이, 애플 로고와 기기 본연의 색감이 수정처럼 맑게 투영됩니다. 케이스 내부와 외부에 모두 스크래치 방지 코팅이 적용되어 오랜 기간 사용해도 투명함을 유지하며, 황변 현상(Yellowing)을 늦추어 줍니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 다크 톤 컬러에도 완벽한 일체감과 맥세이프 호환성
두 번째 이미지는 다크 블루/블랙 계열의 차분한 아이폰 모델에 케이스를 씌운 모습입니다. 밝은 폰뿐만 아니라 어두운 톤의 폰에서도 고급스러운 광택감과 함께 특유의 핏감을 뽐냅니다.
후면 중앙의 애플 로고 주위를 감싸는 **흰색 마그네틱 링**은 시각적인 포인트가 될 뿐만 아니라, 이 케이스의 핵심 기능인 **맥세이프(MagSafe)**를 상징합니다. 강력한 내장 자석 링 덕분에 케이스를 씌운 상태에서도 맥세이프 무선 충전기에 가져다 대면 찰칵하고 완벽하게 정렬되어 고속 무선 충전이 가능하며, 카드 지갑이나 차량용 거치대 등 다양한 맥세이프 액세서리를 안심하고 단단하게 부착할 수 있습니다.`
  },
  {
    order: 3,
    img: null,
    text: `### 6. 활용 방법
- **맥세이프 무선 충전 시**: 케이스를 벗길 필요 없이 후면 마그네틱 링 위치에 충전기를 가져다 대기만 하면 정렬과 동시에 빠르고 안정적인 충전이 시작됩니다.
- **맥세이프 액세서리 활용**: 맥세이프 호환 카드 지갑, 그립톡, 차량용 마그네틱 거치대 등을 일상에서 편리하게 뗐다 붙였다 하며 자유롭게 활용할 수 있습니다.`
  },
  {
    order: 4,
    img: null,
    text: `### 7. 추천 대상
- 새롭게 구매한 아이폰 본연의 컬러와 사과 마크를 가리지 않고 그대로 자랑하고 싶으신 분
- 서드파티 케이스들의 미세한 유격이나 버튼 감도 저하에 불만을 느끼셨던 분
- 변색이 빨리 오는 저렴한 젤리 케이스 대신 맑고 단단한 프리미엄 클리어 케이스를 원하시는 분
- 무선 충전이나 차량용 거치대 사용을 위해 강력하고 확실한 맥세이프 자력이 필요하신 분`
  },
  {
    order: 5,
    img: null,
    text: `### 8. 구매 전 확인사항
- 정품 클리어 케이스는 내구성을 위해 일반 실리콘보다 단단한 폴리카보네이트 소재가 혼합되어 있어, 착탈 시 약간의 뻑뻑함이 느껴질 수 있습니다.
- 장기간 사용 시 자외선 노출 빈도와 사용 환경에 따라 자연스러운 소재의 노후화(황변)가 아주 천천히 진행될 수는 있으나, 일반 TPU 케이스에 비하면 훨씬 긴 시간 투명함을 유지합니다.
- 자신이 사용 중인 아이폰의 정확한 '기종명(ex. 아이폰 15 프로, 아이폰 14 등)'을 반드시 확인하시고, 기종에 맞는 옵션을 선택해 구매하셔야 합니다.`
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
    image: sec.img ? `/images/apple_case/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (애플케이스)');

// 5. 백업 폴더 생성 및 복사
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/apple_case');
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
console.log('✅ 정식서버업로드전용폴더 백업 완료');

// 6. 엑셀 파일 '작업여부' 업데이트
itemRow['작업여부'] = 'O';
const newSheet = xlsx.utils.json_to_sheet(rows);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, EXCEL_PATH);
console.log('✅ 엑셀 작업여부 업데이트 완료');
