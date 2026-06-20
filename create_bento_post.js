const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = '건강한끼 도시락 시즌2 6종세트 (냉동), 1.459kg, 1세트';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-diet-bento-season2';
const CATEGORY = '식품'; 
const TITLE = '다이어트 식단 필수템! 건강한끼 도시락 시즌2 6종 세트 상세 분석';
const SEO_KEYWORD = '다이어트 도시락, 건강한끼 도시락 시즌2, 냉동 도시락 추천, 직장인 점심 도시락, 닭가슴살 큐브, 곤드레 곤약밥, 저칼로리 식단';
const SUMMARY = '전자레인지 3분 조리로 완성되는 다채로운 6가지 맛의 저칼로리 건강 식단! 건강한끼 도시락 시즌2 6종 세트를 소개합니다. 바쁜 직장인과 다이어터의 한 끼를 책임질 맛과 영양 밸런스를 꼼꼼하게 분석해 드립니다.';

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
  thumbnail: `/images/diet_bento/썸네일.png`,
  intro: `매일 점심시간마다 무엇을 먹을지 고민하는 직장인, 혹은 철저한 식단 관리가 필요한 다이어터들에게 가장 어려운 숙제는 '영양가 있으면서도 칼로리가 낮고, 게다가 맛까지 있는 한 끼'를 준비하는 것입니다. 직접 요리하기엔 시간이 부족하고, 매일 밖에서 사 먹자니 비용과 칼로리가 부담스럽죠.
오늘 분석해 드릴 제품은 이러한 고민을 단 3분 만에 해결해 줄 **건강한끼 도시락 시즌2 6종 세트**입니다. 기존 시즌1에서 고객들의 피드백을 반영하여 맛과 영양, 그리고 메뉴의 다양성을 한층 더 업그레이드한 냉동 도시락입니다.

단순한 닭가슴살 샐러드에 질리셨다면, 퀴노아밥부터 곤드레 곤약밥까지 다채로운 베이스에 맛있는 반찬이 곁들여진 이 6가지 다이어트 도시락의 구성과 매력을 자세히 살펴보겠습니다.`,
  outro: `### 9. 총평
더 이상 맛없는 풀떼기나 퍽퍽한 닭가슴살만 먹으며 억지로 다이어트를 할 필요가 없습니다. **건강한끼 도시락 시즌2 6종 세트**는 탄수화물, 단백질, 지방의 영양 밸런스를 완벽하게 맞추면서도 속세의 맛을 건강하게 재현하여 식단 관리의 스트레스를 덜어줍니다.
냉동실에 차곡차곡 쌓아두기만 해도 마음이 든든해지며, 매일매일 골라 먹는 재미까지 선사하는 이 제품은 바쁜 현대인들에게 가장 합리적이고 맛있는 해결책이 될 것입니다. 지금 당장 냉동실을 비우고 건강한 식단을 시작해 보세요!`,
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
    text: `### 1. 전자레인지 3분 완성, 다채로운 6가지 메뉴
첫 번째 사진은 보기만 해도 식욕을 돋우는 정갈한 도시락 세트의 비주얼을 보여줍니다. 퀴노아밥&미트볼, 곤드레곤약밥&닭가슴살 큐브 등 영양가 높은 곡물밥을 베이스로 하여 6가지의 서로 다른 다채로운 반찬 구성으로 채워져 있습니다. 
바쁜 아침 출근 준비를 할 때나 피곤하게 퇴근한 저녁, 복잡한 조리 과정 없이 냉동 상태 그대로 전자레인지에 넣고 돌리기만 하면 방금 만든 것 같은 따뜻하고 든든한 밥상이 완성됩니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 한눈에 보는 건강한끼 체크 포인트
두 번째 이미지는 이 도시락의 특장점을 명확하게 요약해 줍니다.
- **간편한 일상**: 칼을 쓰거나 불 앞에 설 필요 없이 전자레인지 조리만으로 완벽한 한 끼가 준비됩니다.
- **6가지 다채로운 구성**: 월요일부터 토요일까지 매일매일 다른 맛을 즐길 수 있어 식단 관리에 쉽게 질리지 않습니다.
- **냉동 보관의 편리함**: 유통기한이 짧은 냉장 도시락과 달리 장기 냉동 보관이 가능하여, 한 번에 여러 세트를 쟁여두고 원할 때마다 꺼내 먹기 좋습니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 영양은 채우고 칼로리는 덜어낸 6종 라인업 상세 분석
세 번째 사진은 6가지 도시락 각각의 정확한 중량과 칼로리 정보를 상세히 제공합니다.
1. **곤드레 곤약밥 & 닭가슴살 큐브 (240.8kcal)**: 가장 낮은 칼로리로, 향긋한 곤드레와 쫄깃한 닭가슴살의 완벽한 조화.
2. **곤드레 곤약밥 & 피자 오믈렛 (273.3kcal)**: 치즈가 들어간 폭신한 오믈렛으로 다이어트 중 피자의 풍미를 느낄 수 있는 메뉴.
3. **곤드레 곤약밥 & 함박스테이크 (319.3kcal)**: 육즙을 가득 머금은 부드러운 함박스테이크로 든든함을 챙긴 한 끼.
4. **퀴노아밥 & 깻잎 동그랑땡 (322.3kcal)**: 톡톡 터지는 퀴노아 식감과 은은한 깻잎 향이 입맛을 돋우는 별미.
5. **퀴노아밥 & 떡갈비 스틱 (382.3kcal)**: 달콤 짭짤한 떡갈비로 단백질 섭취는 물론 초딩 입맛까지 사로잡는 구성.
6. **퀴노아밥 & 미트볼 (392.4kcal)**: 씹는 맛이 살아있는 미트볼로 포만감을 극대화한 메뉴.
6가지 모두 400kcal를 넘지 않는 초저칼로리 설계로 부담 없이 섭취할 수 있습니다.`
  },
  {
    order: 4,
    img: null,
    text: `### 4. 활용 방법
- **직장인 점심 도시락**: 아침에 꽝꽝 언 냉동 도시락을 가방에 하나 쏙 챙겨 출근한 뒤, 점심시간에 사무실 전자레인지에 데워 먹으면 식비 절약은 물론 꿀맛 같은 휴식 시간을 확보할 수 있습니다.
- **다이어트 저녁 식단**: 하루 중 가장 살이 찌기 쉬운 저녁 시간에 300kcal 대의 도시락으로 배고픔 없이 가볍게 하루를 마무리하세요.
- **아이들 방과 후 간식/식사**: 학교와 학원 스케줄로 바쁜 아이들에게 영양가 없는 라면 대신 영양소 밸런스가 잡힌 건강한 식사를 챙겨줄 수 있습니다.`
  },
  {
    order: 5,
    img: null,
    text: `### 5. 추천 대상
- 매일 반복되는 닭가슴살, 고구마, 야채 식단에 지쳐 다이어트 포기 직전이신 분
- 점심시간마다 식당 웨이팅에 지쳐 사무실에서 빠르고 간편하게 혼밥을 즐기고 싶으신 직장인
- 늦은 밤 야식을 끊고 싶지만 극심한 배고픔을 참기 어려워 가벼운 대체식을 찾으시는 분
- 칼로리 계산이나 영양 성분 비율을 따져가며 요리할 시간적 여유가 없는 분`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 구매 전 확인사항
- 냉동식품의 특성상 수령 즉시 **영하 18도 이하의 냉동실에 보관**하셔야 안전하게 유통기한까지 섭취하실 수 있습니다.
- 전자레인지 출력(700W / 1000W)에 따라 조리 시간에 약간의 차이가 발생할 수 있으니, 패키지 후면의 권장 조리 시간을 반드시 참고해 주세요.
- 조리 후 비닐 압축 포장을 뜯을 때, 내부의 뜨거운 수증기로 인해 화상을 입을 수 있으니 포장 모서리를 살짝만 뜯은 상태로 주의해서 개봉하시기 바랍니다.`
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
    image: sec.img ? `/images/diet_bento/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (다이어트도시락)');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/diet_bento');
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
console.log('✅ 엑셀 및 백업 완료 (다이어트도시락)');
