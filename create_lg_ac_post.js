const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

// 설정
const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = 'LG전자 18.7㎡(6평형) 휘센 벽걸이형 에어컨 실내기 방문설치';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-lg-ac-1';
const CATEGORY = '가전/디지털';
const TITLE = '6평형 원룸 에어컨 추천! LG 휘센 벽걸이 에어컨 성능 및 제습 기능 완벽 분석';
const SEO_KEYWORD = '6평형 에어컨 추천, LG 휘센 벽걸이 에어컨, 원룸 에어컨, 에어컨 방문설치, ThinQ 와이파이 에어컨, 장마철 에어컨 제습';
const SUMMARY = '작은 방이나 원룸에 최적화된 18.7㎡(6평형) LG 휘센 벽걸이 에어컨을 소개합니다. 강력한 파워냉방, 물통 비울 필요 없는 편리한 제습 모드, LG ThinQ 앱을 통한 와이파이 원격 제어까지 여름철 쾌적함을 위한 필수 가전의 핵심 스펙을 분석합니다.';

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
  thumbnail: `/images/lg_ac/썸네일.png`,
  intro: `점점 더 무덥고 습해지는 여름철, 거실의 스탠드 에어컨만으로는 각 방의 열기를 모두 식히기 어렵습니다. 특히 안방, 자녀 방, 혹은 원룸이나 오피스텔 등 좁은 공간일수록 공간을 많이 차지하지 않으면서도 확실한 냉방 성능을 보여주는 벽걸이 에어컨이 필수적입니다.
이번에 분석할 제품은 가전의 명가, LG전자의 **18.7㎡(6평형) 휘센 벽걸이 에어컨**입니다. 믿을 수 있는 대기업의 기술력과 전문 기사 방문 설치 서비스가 결합되어 설치부터 사용까지 모든 면에서 쾌적함을 선사합니다. 단순한 온도 조절을 넘어, 강력한 파워냉방, 습한 장마철을 뽀송하게 만들어줄 제습 기능, 그리고 외출 시에도 스마트폰으로 간편하게 제어할 수 있는 Wi-Fi(ThinQ) 기능까지 모두 담고 있습니다.

제공된 이미지를 바탕으로 이 제품이 왜 6평형 공간에 가장 합리적인 선택인지 구체적인 기능들을 팩트 위주로 꼼꼼하게 살펴보겠습니다.`,
  outro: `### 9. 총평
무더위와 장마가 반복되는 한국의 여름 기후에 완벽하게 대응할 수 있는 최적의 6평형 냉방 가전입니다. LG전자만의 믿을 수 있는 컴프레서 기술이 만들어내는 파워냉방, 번거로운 물비움이 필요 없는 편리한 제습 기능, 그리고 언제 어디서나 통제 가능한 스마트한 ThinQ 와이파이 원격 제어까지 벽걸이 에어컨이 갖춰야 할 모든 미덕을 고루 갖추었습니다.
믿을 수 있는 전문 기사의 방문 설치 서비스까지 제공되므로, 안방이나 원룸에 설치할 잔고장 없고 성능 확실한 에어컨을 찾으신다면 LG 휘센 벽걸이 에어컨이 가장 후회 없는 선택이 될 것입니다.`,
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
    text: `### 1. 군더더기 없는 디자인: 춥지 않은 바람, LG 휘센
첫 번째 사진에서는 공간에 자연스럽게 녹아드는 LG 휘센 벽걸이 에어컨의 깔끔하고 미니멀한 화이트톤 디자인을 확인할 수 있습니다. 인테리어를 해치지 않는 모던한 곡선 마감과 직관적인 히든 디스플레이가 고급스러움을 더합니다. 6평형(18.7㎡) 공간에 딱 맞게 설계되어 원룸이나 안방 등 어떤 벽면에도 슬림하게 밀착되며, '춥지 않은 바람'이라는 문구처럼 사용자를 배려하는 부드럽고 쾌적한 냉방 환경을 조성해 줍니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 선택의 이유 세 가지: 파워냉방, 제습, Wi-Fi
두 번째 이미지는 이 제품의 핵심 스펙 3가지를 한눈에 요약해 줍니다. 
첫째, 폭염에도 실내 온도를 순식간에 낮춰주는 **파워냉방** 기능. 
둘째, 고온 다습한 장마철에도 쾌적함을 유지해주며 뚝뚝 떨어지는 물을 직접 비울 필요가 없는 **편리한 제습** 기능.
셋째, 스마트폰의 **LG ThinQ 앱을 통한 Wi-Fi 원격 제어**. 
이 세 가지 기능만으로도 일반적인 저가형 에어컨들과 확실한 성능 차이를 보여줍니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 강력하고 쾌적한 냉방: 파워냉방과 바람 방향 컨트롤
세 번째와 네 번째 이미지에서 집중 조명하는 것은 온도부터 바람까지 원하는 대로 맞춤 조절이 가능하다는 점입니다. 폭염이 기승을 부릴 때는 **파워냉방** 모드를 통해 빠르고 강력한 바람을 만들어내어 실내 열기를 신속하게 식혀줍니다.
단순히 강한 바람만 나오는 것이 아니라, 리모컨 하나로 **바람의 상하 방향을 손쉽게 조절**할 수 있습니다. 찬 바람을 직접 맞기 싫을 때는 바람을 위로 보내 공간 전체를 간접적으로 시원하게 만들고, 빠른 냉각이 필요할 때는 아래로 집중시킬 수 있어 사용자의 컨디션에 맞춘 세심한 쿨링이 가능합니다.`
  },
  {
    order: 4,
    img: '5.png',
    text: `### 4. 외출 중에도 스마트하게: 쉬운 Wi-Fi 원격 제어
다섯 번째 사진은 에어컨 사용의 패러다임을 바꾸는 **스마트 Wi-Fi 원격 제어** 기능을 보여줍니다. 바쁜 아침, 에어컨을 끄고 나왔는지 헷갈려 불안해할 필요가 없습니다. 
LG ThinQ 앱을 스마트폰에 설치해두면, 집 밖에서도 언제든 에어컨의 전원 상태를 확인하고 제어할 수 있습니다. 특히 한여름 찜통 같은 집으로 퇴근하기 전, 지하철이나 버스 안에서 미리 에어컨을 켜두어 집에 도착하자마자 시원하고 쾌적한 공기를 맞이할 수 있다는 점은 엄청난 장점입니다.`
  },
  {
    order: 5,
    img: '6.png',
    text: `### 5. 꿉꿉한 장마철의 구원투수: 뽀송한 제습 기능
여섯 번째 이미지는 비가 오고 습도가 급격히 높아지는 장마철에 빛을 발하는 **제습 기능**을 강조합니다. 한국의 여름은 단순히 덥기만 한 것이 아니라 불쾌지수를 높이는 높은 습도가 문제인데, 이 제품은 단독 제습기 없이도 방 안의 눅눅함을 확실하게 잡아줍니다.
특히 제습 모드 작동 시 귀찮게 제습 물통을 수시로 비워줄 필요가 없도록 설계되어, 사용자는 그저 쾌적하고 뽀송뽀송해진 방 안에서 편안한 휴식에만 집중할 수 있습니다.`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 활용 방법
- **한여름 외출 복귀 시**: 집에 도착하기 10분 전, 스마트폰 LG ThinQ 앱을 켜서 파워냉방 모드로 미리 실내 온도를 낮춰둡니다.
- **취침 시**: 바람의 방향을 위쪽으로 고정하여 찬 바람이 몸에 직접 닿지 않도록 설정하고, 춥지 않은 부드러운 냉방 환경을 유지합니다.
- **비 오는 장마철**: 온도는 적당하지만 습도가 높아 끈적일 때, 냉방 대신 '제습 모드'로 가동하여 실내를 뽀송하게 유지하고 전기 요금 부담도 덜 수 있습니다.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 추천 대상
- 안방이나 6평 이하의 원룸에 설치할 확실한 냉방 성능의 에어컨을 찾으시는 분
- 퇴근 후 찜통 같은 방에 들어가는 것이 고통스러워 외부 원격 제어가 필요하신 분
- 좁은 방에 별도의 제습기를 따로 둘 공간이 없어 제습 기능이 포함된 가전을 원하시는 분
- 검증되지 않은 브랜드의 설치 불량으로 스트레스받지 않고, 대기업의 믿을 수 있는 방문 설치 및 A/S를 원하시는 분`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- LG ThinQ 앱의 원격 제어 기능을 사용하기 위해서는 가정 내에 항상 켜져 있는 2.4GHz 무선 Wi-Fi 인터넷 환경이 필요합니다.
- 6평형(18.7㎡) 면적에 최적화된 스펙이므로, 거실과 같은 넓은 공간보다는 각 방이나 원룸에 설치하는 것을 권장합니다.
- 전문 기사의 방문 설치 서비스가 포함되어 있으나, 주거 환경(실외기 위치, 배관 길이 연장, 앵글 설치 등)에 따라 현장에서 추가 설치 비용이 발생할 수 있습니다.`
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
    image: sec.img ? `/images/lg_ac/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (LG에어컨)');

// 5. 백업 폴더 생성 및 복사
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/lg_ac');
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
