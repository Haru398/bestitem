const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

// 설정
const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = '제노벤 무선 에어건 미니 캠핑 차량용 청소기 에어스톰';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-zenoben-airgun-1';
const CATEGORY = '가전/디지털';
const TITLE = '캠핑 및 차량용 무선 에어건 청소기 추천! 제노벤 에어스톰 160W 성능 완벽 분석';
const SEO_KEYWORD = '무선 에어건, 차량용 청소기 추천, 캠핑용 에어건, 제노벤 에어스톰, 130000RPM 에어건, 휴대용 청소기';
const SUMMARY = '강력한 160W 출력과 130,000RPM의 BLDC 항공 모터를 탑재한 제노벤 무선 에어건 에어스톰을 분석합니다. 차량 내부 청소부터 캠핑장 먼지 제거까지, 압도적인 풍압과 평생 A/S로 무장한 프리미엄 차량용 무선 청소기 추천 가이드입니다.';

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
  thumbnail: `/images/zenoben_airgun/썸네일.jpg`,
  intro: `캠핑장에서 텐트의 먼지를 털어내거나 세차 후 차량 내부 구석구석의 이물질을 날려버릴 때, 유선 청소기나 약한 핸디형 청소기로는 항상 아쉬움이 남습니다. 특히 야외 활동이 잦아지는 시즌에는 휴대성이 뛰어나면서도 압도적인 파워를 자랑하는 **무선 에어건**이 필수템으로 자리 잡고 있습니다.

이번 포스팅에서는 시중의 저가형 모델들과는 차원이 다른 스펙을 보여주는 프리미엄 무선 에어건, **제노벤(ZENOBEN) 에어스톰 AST-01** 모델을 집중 분석합니다. 160W의 고출력과 130,000RPM 초고속 회전을 자랑하는 BLDC 모터를 탑재하여 단순한 바람을 넘어선 '강풍'을 선사하는 제품입니다. 
차량용 무선 청소기나 캠핑용 에어건 구매를 고려 중이신 분들을 위해, 제공된 상세 스펙 이미지를 바탕으로 팩트 위주의 꼼꼼한 분석을 진행해 보겠습니다.`,
  outro: `### 9. 총평
무선 에어건 시장에는 수많은 제품이 있지만, 제노벤 에어스톰처럼 160W의 고출력, 130,000RPM의 폭발적인 회전력, 그리고 사용자를 배려한 실시간 LCD 디스플레이와 슬라이드 미세 조절 기능까지 두루 갖춘 제품은 드뭅니다. 415g의 가벼운 무게 안에 담긴 압도적인 퍼포먼스와 더불어, 가장 중요한 '평생 A/S 보장'이라는 신뢰성까지 확보했습니다.
차량 세차 매니아부터 캠핑족, 그리고 집안 구석구석 틈새 청소가 필요하신 분들 모두에게 후회 없는 최고의 투자, 프리미엄 차량용 무선 청소기로 강력히 추천합니다.`,
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
    text: `### 1. 브랜드의 자신감: 평생 A/S 제공
첫 번째 이미지에서 가장 돋보이는 부분은 전자기기에서 보기 드문 **평생 A/S 제공** 정책입니다. 무선 에어건이나 차량용 무선 청소기는 모터의 고속 회전과 배터리 소모가 심해 잔고장이 발생하기 쉽습니다. 제노벤은 전국에 위치한 수리 센터를 통해 1년 이후에도 합리적인 가격으로 유상 서비스를 평생 보장합니다. 이는 제품의 내구성에 대한 강한 자신감이자, 소비자가 고장 걱정 없이 강력한 성능을 마음껏 활용할 수 있도록 돕는 최고의 서비스 스펙입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 압도적 프리미엄 스펙: 160W와 130,000RPM
두 번째 사진은 제노벤 에어스톰(AST-01)이 왜 프리미엄 모델인지 한눈에 증명합니다. 일반적인 저가형 모델을 훌쩍 뛰어넘는 **160W 고출력 파워**와 **BLDC 항공 모터**를 기반으로 한 **130,000rpm 초고속 회전**을 자랑합니다. 
풍압은 260 이상에 달하며, 2,000mAh 배터리가 4개나 탑재된 대용량 배터리를 지니고 있음에도 불구하고 무게는 고작 **415g의 초경량**으로 설계되었습니다. 캠핑이나 세차 시 손목의 부담 없이 강력한 바람을 만들어낼 수 있는 완벽한 밸런스입니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 직관적인 상태 확인: 실시간 LCD 디스플레이
세 번째 이미지에서는 디자인의 디테일과 사용자 편의성을 엿볼 수 있습니다. 기존 에어건들이 단순히 불빛으로 1, 2, 3단계를 표시하는 것에 그쳤다면, 제노벤 에어스톰은 **LCD 디스플레이를 탑재하여 실시간 출력 상태를 수치로 정밀하게 확인**할 수 있습니다.
배터리 잔량, 현재의 회전 속도(rpm), 파워 등을 숫자로 직접 보면서 작동시킬 수 있어, 상황에 맞게 배터리를 안배하며 스마트하게 청소할 수 있는 진정한 하이엔드 차량용 청소기입니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 타사 대비 압도적인 성능 차이 비교
네 번째 사진은 보이지 않는 차이가 어떻게 성능의 격차를 만드는지 명확한 수치로 비교해 줍니다. 시중의 흔한 40W, 80,000rpm 에어건들과 비교했을 때, 제노벤은 **160W 파워와 130,000rpm 회전력**으로 체급 자체가 다릅니다.
특히 바람 조절 방식이 단순한 3단 조절이 아닌 **슬라이드 미세 조절 방식**을 채택하여 섬세한 작업이 가능하며, **Type-C 고속 충전**과 2,000mAh * 4개의 대용량 배터리 설계로 충전 편의성과 러닝 타임까지 모두 압도하는 스펙 우위를 보여줍니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 작지만 강력한 컴팩트 파워
다섯 번째 사진은 에어건의 콤팩트한 사이즈와 실제 성능의 조화를 강조합니다. 415g이라는 가벼운 바디 안에 160W의 고출력 BLDC 모터를 담아내어 크기를 잊게 만드는 폭발적인 바람을 뿜어냅니다. 
캠핑 시 텐트 스커트의 흙을 털어내거나 숯불에 불을 지필 때, 혹은 차량 세차 후 그릴과 휠 하우스에 고인 물기를 한 번에 날려버릴 때 이 콤팩트한 괴물 에어건의 진가가 발휘됩니다.`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 활용 방법
- **차량 세차 및 내부 청소**: 세차 후 도어 틈새, 휠, 라디에이터 그릴의 물기를 날려버리는 송풍기로 사용하거나, 실내 매트와 시트 틈새에 쌓인 먼지를 밖으로 불어내는 차량용 청소기 대용으로 탁월합니다.
- **캠핑 및 아웃도어**: 텐트 철수 전 묻어있는 낙엽이나 흙먼지를 털어내고, 바베큐 화로대 불쏘시개 역할을 하며, 에어매트에 튜브 바람을 넣거나 뺄 때 다목적으로 활용 가능합니다.
- **일상생활**: 키보드 틈새 먼지, 창틀 먼지 청소, 에어컨 필터 청소 등 정밀하고 강력한 바람이 필요한 곳 어디든 슬라이드 미세 조절을 통해 쉽게 사용합니다.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 추천 대상
- 세차 후 드라잉 타월만으로 틈새 물기 제거가 아쉬워 강력한 차량용 에어건이 필요하신 분
- 야외 캠핑 시 장비 정리를 빠르고 쾌적하게 끝내고 싶으신 캠핑족
- 잔고장으로 에어건을 여러 번 버린 경험이 있어, 평생 A/S가 보장되는 튼튼한 제품을 찾으시는 분
- 약한 바람이 아닌 130,000RPM 이상의 확실한 파워를 경험하고 싶으신 분`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- 최대 출력(160W)으로 장시간 연속 사용 시 모터 과열을 방지하기 위해 잠시 쉬었다가 사용하는 것을 권장합니다.
- Type-C 고속 충전을 지원하므로, 구성품이나 가정 내에 있는 고속 충전 어댑터의 규격을 확인하여 빠르고 안전하게 충전하시기 바랍니다.`
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
    image: sec.img ? `/images/zenoben_airgun/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (제노벤 에어건)');

// 5. 백업 폴더 생성 및 복사
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/zenoben_airgun');
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
