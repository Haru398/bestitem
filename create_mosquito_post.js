const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

// 설정
const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = 'EM01 KC인증 충전식 전기파리채 2800V 초강력 LED 유인등 자동모드 EM01 C타입 충전 2단 신축 90도 회전 모기퇴치기';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-mosquito-swatter-1';
const CATEGORY = '가전/디지털';
const TITLE = '충전식 전기모기채 구매 전 반드시 확인해야 할 핵심 기능과 활용 가이드';
const SEO_KEYWORD = '충전식 전기모기채, 모기퇴치기 추천, 395nm 유도등, 회전 전기모기채';
const SUMMARY = '여름철 불청객 모기를 효과적으로 퇴치하기 위한 충전식 전기모기채 선택 가이드입니다. 1800mAh 대용량 배터리, 395nm 모기 유도등, 90도 회전 및 신축 기능을 통한 사각지대 제로 퇴치법을 상세히 분석합니다.';

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
  thumbnail: `/images/mosquito_swatter/썸네일.png`,
  intro: `본격적인 여름이 시작되면서 밤마다 귓가를 맴도는 불청객, 모기와의 전쟁이 시작되었습니다. 시중에는 수많은 모기퇴치기가 있지만, 매번 건전지를 교체해야 하거나 벽에 붙은 모기를 잡기 힘들어 불편함을 겪은 적이 있으실 겁니다. 
오늘 분석해 드릴 제품은 단순한 타격형 모기채를 넘어, 스마트한 기능들로 무장한 **충전식 전기모기채(모기퇴치기)**입니다. 2800V의 강력한 전압은 기본이고, 밤새 알아서 모기를 잡아주는 395nm 파장 유도등, 그리고 손이 닿지 않는 천장이나 벽면의 사각지대까지 커버하는 90도 회전 및 신축 기능까지 갖춘 다재다능한 생활 가전입니다.

충전식 전기모기채를 고를 때 어떤 기능들을 꼼꼼히 따져봐야 하는지, 실제 사용 환경에서 어떻게 활용할 수 있는지 제공된 사진 자료를 바탕으로 팩트 중심의 꼼꼼한 분석을 시작하겠습니다.`,
  outro: `### 9. 총평
단순히 손으로 휘두르던 과거의 파리채에서 벗어나, 이제는 모기퇴치기도 하나의 스마트한 가전으로 자리 잡았습니다. 이 충전식 전기모기채는 1800mAh의 넉넉한 배터리와 Type-C 충전의 편의성, 360도 모기 유도등을 통한 수면등 겸용 자동 퇴치 기능, 그리고 천장과 벽면을 거침없이 공략하는 90도 회전 및 신축 기능까지 모든 핵심 요소를 완벽하게 갖추었습니다. 
다양한 공간에서 다목적으로 활용 가능한 모기퇴치기를 찾으신다면, 이번 여름을 쾌적하게 보낼 수 있는 최고의 선택이 될 것입니다.`,
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
    text: `### 1. 배터리 용량 및 충전 편의성: 1800mAh와 Type-C의 조화
첫 번째 사진에서 가장 주목할 부분은 **1800mAh의 대용량 충전식 배터리**입니다. 과거 건전지 교체형 모기채의 번거로움과 유지비 부담을 완전히 해결했습니다. 한번 완충으로 오랫동안 고효율 모기 퇴치가 가능하며, 스마트폰 충전에 흔히 쓰이는 **Type-C 포트**를 적용하여 언제 어디서나 편리하게 연장형 충전 케이블로 전력을 공급할 수 있습니다. 모기뿐만 아니라 파리와 나방 등 다양한 비행 해충을 효율적으로 처리할 수 있어 쾌적한 실내 환경을 즐기는 데 필수적인 스펙입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 야간 자동 모드: 395nm 파장 모기 유도등
두 번째 사진은 이 제품의 가장 스마트한 기능인 **395nm 파장 모기 유도등**을 설명하고 있습니다. 넓은 망면 디자인으로 타겟을 쉽게 잡는 수동 모드도 훌륭하지만, 스위치를 밀어서 모드를 전환하면 거치대에 세워둔 채로 360도 전방위에서 모기를 유인하는 자동 퇴치기로 변신합니다.
어두운 밤, 은은한 보랏빛의 395nm 파장이 모기의 습성을 이용해 스스로 유인하여 퇴치하므로, 취침 시 매우 적합합니다. 단, 자동 모드 활성화 시에는 배터리 소모가 빠를 수 있으므로 방전을 방지하기 위해 케이블을 연결해 동시 충전 상태로 사용하는 것을 권장합니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 사각지대 공략: 90도 회전 헤드 기능
세 번째 사진은 일반 모기채와의 가장 큰 차별점인 **90도 회전 기능**을 보여줍니다. 모기는 종종 평평한 벽면이나 소파 등받이, 천장에 달라붙어 쉬는 습성이 있습니다. 일자형 모기채로는 벽에 밀착시키기 어려워 모기를 놓치기 십상입니다.
하지만 이 제품은 헤드 부분이 90도로 꺾이는 회전 기능을 제공하여, 벽면이나 바닥, 가구 표면에 완벽하게 밀착시켜 숨어있는 벌레까지 단번에 포착할 수 있습니다. 안정적인 코어와 회로 설계가 뒷받침되어 각도가 꺾인 상태에서도 흔들림 없는 파워를 보여줍니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 공간의 제약을 없애는 신축 기능
네 번째 사진은 **신축(길이 연장) 기능**의 뛰어난 활용성을 강조합니다. 손잡이 부분을 길게 뽑아낼 수 있어, 키가 닿지 않는 높은 천장에 붙은 모기도 의자를 밟고 올라설 필요 없이 안전하게 퇴치할 수 있습니다.
또한, 거실, 침실, 주방, 사무실 등 다양한 공간의 특성에 맞게 짧게, 혹은 길게 조절하여 사용할 수 있어 사용자의 편의성을 극대화했습니다. 90도 회전 기능과 신축 기능이 결합되어 그야말로 '사각지대 제로'를 구현한 완벽한 설계입니다.`
  },
  {
    order: 5,
    img: null,
    text: `### 5. 활용 방법
- **수동 타격 모드**: 낮 시간대나 눈에 보이는 모기를 발견했을 때, 버튼을 눌러 직관적으로 넓은 망면을 이용해 포획합니다. 높은 곳은 신축 기능을, 벽면은 90도 회전 기능을 활용합니다.
- **자동 유도 모드**: 취침 전이나 야간에 스탠드형으로 세워두고 395nm 유도등 모드를 켭니다. 이때 전원을 연결해 두면 배터리 걱정 없이 밤새 수면등 겸 모기퇴치기로 활용할 수 있습니다.`
  },
  {
    order: 6,
    img: null,
    text: `### 6. 추천 대상
- 매번 건전지를 사서 갈아 끼우는 것이 번거로우셨던 분
- 벽에 붙은 모기를 잡으려다 벽지에 얼룩을 낸 경험이 있으신 분
- 높은 천장에 붙은 해충을 처리하기 막막했던 분
- 잘 때 귓가에서 웽웽거리는 모기 소리 때문에 수면을 방해받는 분`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 구매 전 확인사항
- 자동 유도 모드로 장시간(밤새) 사용하실 계획이라면, 제품 근처에 Type-C 케이블을 꽂을 수 있는 콘센트나 보조배터리를 배치할 수 있는지 확인해 주세요.
- 연장형 신축 기능을 사용할 때는 주변의 조명이나 파손되기 쉬운 물건에 부딪히지 않도록 주의하여 사용하시기 바랍니다.`
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
    image: sec.img ? `/images/mosquito_swatter/${sec.img}` : null,
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (전기모기채)');

// 5. 백업 폴더 생성 및 복사
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// 이미지 복사 및 가이드라인.txt 복사 (next.js public 폴더로도 복사)
const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/mosquito_swatter');
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

// 백업 JSON 파일 생성
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
