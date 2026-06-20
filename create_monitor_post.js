const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');

const WORKSPACE = 'D:/서버구축폴더/bestitem';
const FOLDER_NAME = 'LG전자 QHD 울트라기어 게이밍 모니터';
const SOURCE_DIR = path.join('D:/정식홈페이지자동화', FOLDER_NAME);
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', FOLDER_NAME);
const EXCEL_PATH = 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx';

const POST_ID = 'item-lg-ultragear-monitor';
const CATEGORY = '가전/디지털'; 
const TITLE = '27인치 게이밍 모니터 끝판왕! LG 울트라기어 27G610A 스펙 완벽 분석';
const SEO_KEYWORD = '게이밍 모니터 추천, LG 울트라기어, 27G610A, 27인치 QHD 모니터, 200Hz 모니터, IPS 패널 모니터, AMD 프리싱크';
const SUMMARY = '게이머들의 꿈의 디스플레이, LG전자 QHD 울트라기어 27G610A 모니터를 소개합니다. 2560x1440 QHD의 압도적인 화질, 200Hz의 초고주사율, IPS 패널과 틸트/피벗 스탠드까지 갖춘 진정한 게이밍 모니터의 스펙을 꼼꼼하게 파헤쳐 봅니다.';

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
  thumbnail: `/images/lg_monitor/썸네일.png`,
  intro: `FPS나 레이싱, 격투 게임 등 찰나의 순간이 승패를 가르는 0.01초의 승부 세계에서 장비의 차이는 곧 실력의 차이로 이어집니다. 그중에서도 모니터의 주사율과 응답속도는 게이머의 동체 시력과 반응 속도를 극한으로 끌어올려 주는 가장 핵심적인 무기입니다.
수많은 게이밍 기어 브랜드 중에서도 압도적인 디스플레이 기술력으로 '승리의 조건'이라 불리는 제품이 있습니다. 바로 **LG전자 울트라기어 QHD 게이밍 모니터 (모델명: 27G610A)**입니다. 

단순히 주사율만 높은 저가형 모니터들과 달리, 눈이 호강하는 QHD 해상도의 쨍한 IPS 패널과 200Hz라는 괴물 같은 고주사율을 모두 잡아낸 이 제품의 스펙을 팩트 기반으로 낱낱이 분석해 보겠습니다.`,
  outro: `### 9. 총평
디스플레이는 역시 LG라는 공식을 다시 한번 증명하는 완벽한 웰메이드 게이밍 모니터입니다. **LG 울트라기어 27G610A**는 QHD의 미려한 해상도, 색감의 끝판왕인 IPS 패널, 그리고 200Hz라는 압도적인 고주사율까지 게이머가 상상할 수 있는 모든 이상적인 스펙을 27인치 화면 안에 꽉 채워 넣었습니다.
게다가 어떤 자세에서도 편안함을 유지해 주는 만능 스탠드와 대기업 LG전자의 확실한 A/S까지 고려한다면, 가성비와 하이엔드의 경계에서 고민하는 게이머들에게 이보다 완벽한 타협점은 없을 것입니다. 지금 바로 울트라기어와 함께 게임의 티어를 한 단계 올려보세요!`,
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
    text: `### 1. 게이머들의 로망, 승리의 조건 LG 울트라기어
첫 번째 사진은 특유의 강렬하고 날렵한 후면 디자인과 스탠드를 뽐내는 LG 울트라기어의 자태를 보여줍니다. 책상 위에 올려두는 것만으로도 게임 몰입도를 수직 상승시켜주는 고급스러운 게이밍 감성을 자랑합니다. 이름만 번지르르한 게이밍 모니터가 아닌, LG전자의 축적된 디스플레이 기술력이 집약되어 진짜 게이머들에게 '승리의 조건'으로 불리는 신뢰의 브랜드 라인업입니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 최적의 가성비 퍼포먼스 라인업, 27G610A
두 번째 이미지는 울트라기어의 다양한 플레이 환경 맞춤형 라인업을 보여줍니다. 하이엔드급 RTX 4080 이상을 요구하는 4K 모델이나 콘솔 특화 모델 사이에서, 이번에 리뷰하는 **27G610A 모델**은 '가성비와 퍼포먼스'를 동시에 중시하는 PC 게이머들에게 가장 매력적인 스펙 포지션을 차지하고 있습니다. 
대부분의 메인스트림급 게이밍 PC 환경에서 가장 부드러운 플레이를 체감할 수 있는 QHD 해상도와 200Hz의 이상적인 밸런스를 가격적인 부담을 낮춰 제공합니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 색감의 명가 IPS 패널과 QHD 고해상도의 만남
세 번째 사진은 화질의 퀄리티를 증명합니다. 게이밍 모니터는 응답속도를 위해 색감이 탁한 TN 패널이나 잔상이 남는 VA 패널을 쓰는 경우가 많지만, 이 제품은 화사하고 선명한 색감의 대명사인 **IPS 디스플레이**를 탑재했습니다.
여기에 FHD보다 약 1.7배 더 많은 픽셀을 가진 **16:9 QHD (2560x1440)** 해상도를 지원하여 화면의 디테일과 선명도가 압도적입니다. 추가로 'VESA DisplayHDR 400' 인증까지 받아 어두운 동굴이나 눈부신 폭발 씬에서도 빛과 어둠의 대비를 현실적이고 생생하게 묘사해 냅니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 찢어짐 없는 부드러움, AMD FreeSync Premium
네 번째 이미지는 고사양 게임 플레이 시 필수적인 기능인 **AMD 프리싱크 프리미엄(FreeSync Premium)** 기술 지원을 알립니다. 그래픽 카드가 뿜어내는 프레임과 모니터의 주사율이 엇갈릴 때 발생하는 화면 찢어짐(Tearing)이나 버벅거림(Stuttering) 현상을 하드웨어적으로 보정하여, 급격한 화면 전환이나 복잡한 이펙트 속에서도 물 흐르듯 매끄럽고 부드러운 게임 장면에 완벽하게 몰입할 수 있도록 돕습니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 내 몸에 맞추는 인체공학적 만능 스탠드
다섯 번째 사진은 단순한 화질을 넘어 장시간 게임에도 목과 허리 건강을 지켜주는 **인체공학적 스탠드**의 위력을 보여줍니다. 별도의 모니터 암을 구매할 필요가 없을 정도로 완벽한 4가지 관절 기능을 기본 지원합니다.
- **높낮이 조절**: 최대 110mm 범위에서 내 눈높이에 딱 맞게 조절
- **스위블**: 좌우 -30도 ~ +30도 회전
- **틸트**: 상하 -5도 ~ +20도 각도 조절
- **피벗**: 화면을 시계 방향으로 90도 회전하여 세로 모드(세로 직캠, 코딩, 웹서핑 등) 활용 가능`
  },
  {
    order: 6,
    img: '6.png',
    text: `### 6. 27인치의 황금 비율, 상세 제품 사양
마지막 이미지는 모니터를 놓을 책상 공간을 계산하기 위한 정확한 수치를 제공합니다. 모델명 27G610A의 상세 사이즈는 베젤 미포함 대각선 길이 68.4cm(약 27인치형)이며, 가로 613.2mm, 두께 224.5mm, 세로 높이는 스탠드 조절에 따라 434.2mm에서 최대 544.2mm까지 확장됩니다.
27인치는 한눈에 화면 전체가 다 들어오면서도 미니맵이나 UI를 놓치지 않고 빠르게 캐치할 수 있어 e스포츠 프로게이머들도 가장 선호하는 게이밍 모니터의 '황금 사이즈'입니다.`
  },
  {
    order: 7,
    img: null,
    text: `### 7. 활용 방법
- **배틀그라운드, 발로란트, 오버워치 등 FPS 게임**: 200Hz 초고주사율과 1ms의 반응속도로 적의 미세한 움직임을 잔상 없이 포착하여 에임(조준)의 정확도를 비약적으로 끌어올릴 수 있습니다.
- **AAA급 패키지 게임 시청**: QHD 해상도와 IPS 패널의 화려한 색감, HDR 400의 눈부신 그래픽 묘사로 영화를 보는 듯한 오픈월드 감상이 가능합니다.
- **세로 직캠 및 웹서핑**: 피벗 기능을 활용해 모니터를 90도로 세우면, 스크롤 낭비 없이 방대한 웹 페이지를 한눈에 읽거나 아이돌 세로 직캠을 꽉 찬 화면으로 감상할 수 있습니다.`
  },
  {
    order: 8,
    img: null,
    text: `### 8. 구매 전 확인사항
- 200Hz의 고주사율과 QHD 해상도를 동시에 100% 뽑아내기 위해서는 PC의 그래픽카드 성능(RTX 3060 이상 권장)이 뒷받침되어야 합니다.
- AMD 프리싱크 프리미엄 기능은 호환되는 그래픽 카드 사용 및 전용 소프트웨어 설정 시 정상 작동합니다.
- 모니터 암을 별도로 장착하실 분들은 제품 뒷면의 표준 VESA 마운트 규격(보통 100x100mm) 호환 여부를 확인하시기 바랍니다.`
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
    image: sec.img ? `/images/lg_monitor/${sec.img}` : '',
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (LG모니터)');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const PUBLIC_IMG_DIR = path.join(WORKSPACE, 'public/images/lg_monitor');
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
console.log('✅ 엑셀 및 백업 완료 (LG모니터)');
