const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = '더존건강 더조은 한끼곤약젤리 복숭아 10개입, 1.5kg, 1개';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-konjac-jelly-peach';
const CATEGORY = '식품'; 
const TITLE = '단 2kcal의 기적! 더존건강 한끼 곤약젤리 복숭아맛 다이어트 간식 추천';
const SEO_KEYWORD = '곤약젤리 추천, 더존건강 한끼곤약젤리, 복숭아 곤약젤리, 저칼로리 간식, 다이어트 젤리, 무설탕 간식, 글루코만난';
const SUMMARY = '달콤한 복숭아 맛에 탱글한 식감, 하지만 칼로리는 단 2kcal! 설탕 대신 무칼로리 감미료를 사용하고 비타민C와 콜라겐까지 꽉 채운 더존건강 한끼 곤약젤리의 놀라운 포만감과 영양 성분을 분석합니다.';

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
  thumbnail: `/images/konjac_jelly/썸네일.png`,
  intro: `성공적인 다이어트의 가장 큰 적은 '배고픔'과 단 음식에 대한 강한 '갈망'입니다. 늦은 밤 야식의 유혹을 참아내거나 오후 3시쯤 찾아오는 당 떨어짐 현상을 무조건 버티기만 한다면 결국 폭식으로 이어지기 쉽습니다.
이럴 때 죄책감 없이 입터짐을 완벽하게 방지해 줄 구원템이 있습니다. 바로 **더존건강 더조은 한끼 곤약젤리 복숭아맛**입니다. 

시중에 수많은 곤약젤리 제품이 있지만, 이 제품은 압도적인 2kcal라는 초저칼로리에 설탕 대신 건강한 단맛을 내고, 피부 미용을 위한 콜라겐까지 듬뿍 담아냈습니다. 다이어터들의 필수품으로 불리는 이 제품의 팩트 기반 스펙을 하나하나 뜯어보겠습니다.`,
  outro: `### 9. 총평
다이어트는 굶는 것이 아니라 영리하게 대체하는 것입니다. **더존건강 더조은 한끼 곤약젤리 복숭아맛**은 액상과당의 늪에서 벗어나 건강하고 맛있게 포만감을 채워주는 최고의 저칼로리 간식입니다. 
단 2kcal의 놀라운 수치 속에 글루코만난의 확실한 포만감과 비타민C, 콜라겐까지 빼곡하게 채워 넣었으며, 안전한 HACCP 제조 환경에서 만들어 믿고 마실 수 있습니다. 언제 터질지 모르는 식욕의 위기를 이 달콤하고 탱글탱글한 젤리 한 팩으로 스마트하게 넘겨보시길 추천합니다!`,
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
    text: `### 1. 한 팩에 다 담은 포만감과 영양소
첫 번째 사진은 이 제품의 정체성을 한눈에 보여줍니다. 다이어트 간식의 핵심인 **'탱글탱글한 곤약의 든든한 포만감'**을 기본으로, **'복숭아 농축 분말'**을 사용하여 인공적이지 않은 자연스러운 달콤함을 구현했습니다. 
여기에 피부 탄력에 도움을 주는 **콜라겐**과 활력을 불어넣는 **비타민 C**까지 한 팩에 쏙 담아내어, 단순한 허기 달램을 넘어 영양 섭취까지 고려한 똑똑한 식품입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 포만감의 비밀, 마법의 성분 '글루코만난'
두 번째 이미지는 곤약젤리가 어떻게 적은 양으로도 배를 부르게 만드는지 그 과학적 원리를 설명합니다. 구약나무 덩이줄기를 가공해 만든 곤약에는 **'글루코만난'**이라는 수용성 식이섬유가 풍부하게 함유되어 있습니다.
이 성분은 뱃속에서 수분을 만나면 마치 스펀지처럼 엄청나게 팽윤(부풀어 오름)하는 성질을 가지고 있습니다. 덕분에 아주 소량만 섭취해도 위장을 가득 채워 든든한 포만감을 주며, 체내에 흡수되는 칼로리는 거의 없어 저칼로리/저당 다이어트 식품으로 최고의 대우를 받습니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 액상과당 NO! 진짜 복숭아 농축 분말로 낸 달콤함
세 번째 사진은 달콤한 맛의 비결을 보여줍니다. 다이어트 간식이라고 속여놓고 뒤통수를 치는 액상과당이나 설탕, 인공 과일 시럽은 일절 사용하지 않았습니다. 
대신 진짜 **복숭아 농축 분말**을 함유하여 상큼하고 자연스러운 과일 본연의 향을 살려냈습니다. 여기에 탱글탱글한 식감을 더해주는 피쉬 콜라겐과 새콤함을 더하는 비타민C의 조합은 다이어트 중 달달한 디저트가 당길 때 완벽한 갈증 해소제가 되어줍니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 믿을 수 있는 100% 국내 제조 (HACCP 인증)
네 번째 이미지는 입으로 들어가는 식품인 만큼 철저한 위생 관리를 증명하는 **HACCP(식품안전관리인증)** 마크를 강조합니다. 
생산부터 제조, 유통까지 발생할 수 있는 모든 위해 요소를 과학적으로 차단하는 식약처 인증 마크를 획득하였으며, 전 공정이 깐깐한 기준의 국내 공장에서 이루어지기 때문에 온 가족이 안심하고 먹을 수 있습니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 이럴 때 곤약젤리가 정답입니다!
다섯 번째 사진은 일상 속에서 칼로리 걱정 없이 곤약젤리를 200% 활용할 수 있는 타이밍을 추천합니다.
- **운동 전후**: 무거운 식사가 부담스러운 유산소 운동 직전이나 직후, 가볍게 에너지를 채워줍니다.
- **야식의 유혹이 찾아올 때**: 치킨이나 라면이 당기는 늦은 밤, 2kcal의 곤약젤리 하나면 입터짐을 완벽하게 진압할 수 있습니다.
- **사무실 간식**: 일하다가 입이 심심할 때 과자 대신 씹는 맛이 있는 젤리를 즐기세요.
- **아이들 간식**: 설탕 덩어리 시판 젤리 대신 건강한 무설탕 간식으로 추천합니다.`
  },
  {
    order: 6,
    img: '6.png',
    text: `### 6. 압도적인 성분표: 당류 0g, 2kcal
여섯 번째 이미지는 제품의 상세 스펙과 영양 정보를 투명하게 공개합니다. 영양성분표를 보면 지방 0g, 콜레스테롤 0mg, 그리고 가장 중요한 **당류 0%**라는 놀라운 수치를 확인할 수 있습니다. 
단맛은 체내에 흡수되지 않고 배출되는 대체당인 **에리스리톨**을 사용하여 냈으며, 한 팩(150g)을 다 마셔도 숨쉬기 운동만으로 소모되는 고작 2kcal에 불과합니다. 하루 권장 섭취량은 1일 1~3회로 넉넉합니다.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 활용 방법
- **무조건 냉장 보관**: 곤약의 탱글탱글한 식감은 차가울 때 극대화됩니다. 배송받은 직후 시원한 냉장고에 보관했다가 드시기 전에 손으로 조물조물 주물러서 부셔서 드시면 훨씬 부드럽게 넘어갑니다.
- **얼려 먹기**: 여름철에는 냉동실에 살짝 얼려서 슬러시처럼 숟가락으로 퍼먹으면 훌륭한 저칼로리 빙수 대용이 됩니다.`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- 에리스리톨(대체당) 성분이 함유되어 있어, 개인의 체질에 따라 한 번에 너무 많은 양(과량)을 섭취할 경우 복통이나 설사를 유발할 수 있으므로 하루 권장량(1~3팩)을 지켜주세요.
- 개봉 후에는 내용물이 변질될 수 있으니 가급적 한 번에 다 드시는 것을 권장합니다.
- 캡 파우치 형태로 뚜껑을 열고 마시는 구조이므로, 뚜껑을 입으로 강하게 물어 열다가 삼키지 않도록 어린이의 경우 주의가 필요합니다.`
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
    image: sec.img ? `/images/konjac_jelly/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (곤약젤리)');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/konjac_jelly');
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
console.log('✅ 엑셀 및 백업 완료 (곤약젤리)');
