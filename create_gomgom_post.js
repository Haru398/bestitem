const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = '곰곰 촉촉 반숙란 (냉장), 30구, 1개';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-gomgom-egg';
const CATEGORY = '식품'; 
const TITLE = '아침 식사 대용 영양 간식! 곰곰 촉촉 반숙란 30구 완벽 리뷰';
const SEO_KEYWORD = '곰곰 반숙란, 촉촉한 반숙란, 다이어트 간식 추천, 식사 대용 계란, 국내산 반숙란, 반숙 계란 30구';
const SUMMARY = '바쁜 아침 식사 대용이나 다이어트 식단으로 완벽한 곰곰 촉촉 반숙란을 소개합니다. 100% 국내산 계란을 사용하고 9단계의 엄격한 선별 과정을 거쳐 안심하고 먹을 수 있는, 껍질이 부드럽게 벗겨지는 촉촉한 영양 간식의 장점을 분석합니다.';

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
  thumbnail: `/images/gomgom/썸네일.png`,
  intro: `매일 아침 1분 1초가 아쉬운 직장인과 학생들, 그리고 철저한 식단 관리를 하는 다이어터들에게 가장 완벽한 단백질 공급원은 무엇일까요? 삶은 계란은 최고의 영양 간식이지만, 매번 끓는 물에 시간을 맞춰 삶고 껍질을 까는 과정은 은근히 번거롭습니다.
오늘 소개해 드릴 제품은 이러한 번거로움을 한 번에 해결해 주는 **곰곰 촉촉 반숙란 30구**입니다. 짜지 않고 고소한 맛, 그리고 입안에서 사르르 녹아내리는 촉촉한 노른자는 일반 삶은 계란과는 차원이 다른 만족감을 선사합니다. 

제공된 이미지를 바탕으로, 왜 수많은 사람들이 곰곰 반숙란을 박스째로 구비해 두고 먹는지 그 특별한 매력과 엄격한 제조 과정을 팩트 위주로 꼼꼼하게 살펴보겠습니다.`,
  outro: `### 9. 총평
건강한 식습관을 유지하는 가장 쉬운 방법은 맛있는 영양 간식을 가까이 두는 것입니다. **곰곰 촉촉 반숙란**은 100% 국내산 원란을 엄격하게 선별하여 믿을 수 있고, 퍽퍽함 없이 촉촉한 식감으로 누구나 호불호 없이 즐길 수 있는 최고의 완전식품입니다.
출출한 오후의 간식, 바쁜 아침의 식사 대용, 다이어터들의 샐러드 토핑 등 활용도가 무궁무진하며 30구의 넉넉한 용량으로 온 가족이 함께 즐기기에도 좋습니다. 냉장고 한편에 든든하게 채워두고 매일 건강한 하루를 시작해 보시기 바랍니다.`,
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
    text: `### 1. 믿을 수 있는 100% 국내산 계란 사용
첫 번째 사진은 건강하게 자라는 닭들의 모습과 함께 **'국내산 계란만을 사용'**한다는 점을 강조하고 있습니다. 우리가 매일 먹는 식품, 특히 반숙으로 조리되는 계란은 신선도와 출처가 생명입니다. 곰곰 반숙란은 수입산이나 출처가 불분명한 원란을 섞지 않고, 오직 우리 땅에서 키운 품질 좋은 100% 국내산 계란만을 엄선하여 만들어지기 때문에 특유의 고소한 맛과 깊은 풍미가 일품입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 입안에서 사르르 녹는 촉촉한 식감
두 번째 이미지는 이 제품의 이름이 왜 '촉촉 반숙란'인지 직관적으로 보여줍니다. 집에서 끓는 물로 이 정도의 완벽한 반숙을 만들어내기는 결코 쉽지 않습니다. 
흰자는 탄력 있게 완숙되어 껍질을 벗길 때 살점 하나 떨어지지 않고 부드럽게 훌러덩 벗겨지며, 반으로 갈라 한 입 베어 물면 젤리처럼 쫀득하고 부드러운 노른자의 **촉촉함**이 입안 가득 퍼집니다. 목 막힘 없이 부드러워 아이들도 물 없이 편안하게 먹을 수 있습니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 안심하고 먹을 수 있는 9단계 엄격한 선별 과정
세 번째 사진은 곰곰 반숙란이 생산되는 체계적이고 위생적인 제조 공정을 투명하게 보여줍니다. 단순히 계란을 삶는 것에 그치지 않고, 무려 **9단계의 엄격한 선별 과정**을 거칩니다.
1. 원란 투입 ➔ 2. 세척 ➔ 3. 건조 ➔ 4. 1차 검란(수작업) ➔ 5. 2차 검란(파란 검출) ➔ 6. 중량별 분류 ➔ 7. 3차 검란(혈반, 육반 검출기) ➔ 8. 선별 및 검사 ➔ 9. 최종 가공
이러한 첨단 자동화 설비와 꼼꼼한 다중 검수 시스템을 통해 불량률을 제로에 가깝게 낮추고, 항상 최상의 품질을 유지합니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 다양한 맞춤형 추천 대상
네 번째 이미지는 곰곰 반숙란이 일상 속 어떤 순간에 꼭 필요한지를 제안하고 있습니다.
- **든든한 영양 간식**: 오후 3~4시, 입이 심심하고 출출할 때 과자나 빵 대신 죄책감 없이 먹을 수 있는 건강한 단백질 간식입니다.
- **식단 관리 및 식사 대용**: 다이어트 중이거나 운동 후 근육 회복을 위해 양질의 단백질 섭취가 필요한 분들에게 최적의 식사 대용품입니다.
- **바쁜 아침 끼니**: 1분 1초가 바빠 식사를 거르기 일쑤인 직장인과 학생들에게 껍질만 까서 바로 먹을 수 있는 간편한 한 끼가 되어줍니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 200% 활용하는 맛있는 레시피
다섯 번째 사진은 그냥 먹어도 맛있는 반숙란을 더 다양하고 맛있게 즐길 수 있는 방법을 소개합니다.
- **샌드위치 & 샐러드 토핑**: 신선한 채소 샐러드나 호밀빵 샌드위치 위에 예쁘게 썰어 올리면, 비주얼은 물론 영양 밸런스까지 완벽한 브런치가 완성됩니다.
- **밥이나 국물 요리 토핑**: 매콤한 떡볶이, 라면, 우동, 냉면 등의 국물 요리에 고명으로 얹으면 매운맛을 부드럽게 중화시켜 주며, 간장 계란밥으로 으깨 먹어도 환상적인 조화를 이룹니다.`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 활용 방법
- **운동 전후 단백질 보충**: 헬스장이나 야외 운동 후 단백질 파우더 대신 자연식품으로 건강하게 단백질을 보충하세요.
- **아이들 영양 간식**: 자극적인 가공식품 대신 방과 후 아이들의 건강한 간식으로 내어주기 좋습니다.
- **피크닉 도시락**: 번거롭게 계란을 삶을 필요 없이 팩 그대로 들고나가 야외에서 간편하게 즐기세요.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 추천 대상
- 매번 시간 맞춰 계란을 삶고 식히고 까는 과정에 지치신 분
- 퍽퍽한 완숙 계란 특유의 목 막힘을 싫어하시는 분
- 건강한 다이어트를 위해 질리지 않고 먹을 수 있는 단백질 식단이 필요하신 분
- 1~2인 가구지만 매일 아침 꾸준하게 계란을 소비하시는 분`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- 신선 식품 특성상 수령 후 반드시 **냉장 보관(0~10℃)** 하셔야 하며, 유통기한 내에 빠르게 섭취하는 것을 권장합니다.
- 조리 과정에서 노른자의 익힘 정도(반숙)는 미세한 편차가 발생할 수 있습니다.
- 껍질을 까기 쉽도록 일정 수준의 염지가 되어 있으므로, 섭취 시 개인의 입맛에 따라 약간의 짭조름함을 느낄 수 있습니다. (별도의 소금 간 없이 바로 드시는 것이 가장 맛있습니다.)`
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
    image: sec.img ? `/images/gomgom/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (곰곰반숙란)');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/gomgom');
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
console.log('✅ 엑셀 및 백업 완료 (곰곰반숙란)');
