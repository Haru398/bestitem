/**
 * ITEM.MONSTER 전문가이드 자동 업로드 스크립트
 * 사용법: node auto_guide.js
 * 
 * 동작 순서:
 * 1. 엑셀 상품DB에서 미사용(추천횟수 0) 상품 자동 선택
 * 2. 상품에 맞는 전문가이드 자동 생성 (DB INSERT)
 * 3. Next.js 빌드
 * 4. GitHub 배포
 */

const XLSX = require('xlsx');
const Database = require('better-sqlite3');
const { execSync } = require('child_process');
const path = require('path');
const https = require('https');

function getYoutubeVideoId(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/"videoId":"([^"]{11})"/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve('dQw4w9WgXcQ'); // fallback
        }
      });
    }).on('error', () => resolve('dQw4w9WgXcQ'));
  });
}

const EXCEL_PATH = 'D:\\아이템몬스터 쿠팡전문성글\\ITEM.MONSTER_상품DB_최종.xlsx';
const PROJECT_DIR = 'D:\\서버구축폴더\\bestitem';
const DB_PATH = path.join(PROJECT_DIR, 'dev.db');

// ─────────────────────────────────────────────────
// 1. 엑셀에서 미사용 상품 선택
// ─────────────────────────────────────────────────
function pickProduct() {
  const wb = XLSX.readFile(EXCEL_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  // 헤더 제외, 사용가능(Y) & 추천횟수 0인 상품 필터
  const available = data.slice(1).filter(row => {
    const name = row[0];
    const usable = row[4]; // 사용가능 컬럼
    const count = row[2] || 0; // 추천횟수
    return name && (usable === 'Y' || usable === undefined) && count === 0;
  });

  if (available.length === 0) {
    console.log('⚠️ 사용 가능한 미사용 상품이 없습니다.');
    process.exit(0);
  }

  // 랜덤 선택 (매번 다른 상품)
  const pickedIndex = Math.floor(Math.random() * available.length);
  const picked = available[pickedIndex];
  
  // 엑셀 원본 데이터에서 해당 상품 찾아서 추천횟수(C열) 1로 변경
  for (let R = 1; R <= range.e.r; ++R) {
    const nameCell = ws[XLSX.utils.encode_cell({c: 0, r: R})];
    if (nameCell && nameCell.v === picked[0]) {
      ws[XLSX.utils.encode_cell({c: 2, r: R})] = { t: 'n', v: 1 };
      break;
    }
  }
  XLSX.writeFile(wb, EXCEL_PATH);
  console.log(`✅ 엑셀 데이터 업데이트 완료: ${picked[0]} (추천횟수 1로 변경)`);

  return {
    name: picked[0],
    iframe: picked[1] || '',
  };
}

// ─────────────────────────────────────────────────
// 2. 상품명 → 가이드 콘텐츠 자동 생성
// ─────────────────────────────────────────────────
async function generateGuideContent(productName, iframe) {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[가-힣]/g, (c, i) => i.toString(36))
    .substring(0, 40);
  const guideId = `guide-${slug}-${Date.now()}`;

  // 카테고리별 가이드 템플릿 자동 선택
  const isGPU = /RTX|GTX|라데온|그래픽|GPU/i.test(productName);
  const isCPU = /라이젠|인텔|코어|i5|i7|AMD|CPU/i.test(productName);
  const isSSD = /SSD|NVMe|M\.2|P41|990|WD/i.test(productName);
  const isRAM = /DDR|램|메모리|SODIMM/i.test(productName);
  const isMB = /메인보드|B650|B760|Z790|A620|마더보드/i.test(productName);
  const isCooler = /쿨러|ARGB|수냉|공냉|팬|케이스/i.test(productName);

  // SEO를 위한 고유 이미지 생성 (tech_header.png 복사)
  const fs = require('fs');
  const imgName = `${slug}-review.png`;
  const imgPath = `/images/${imgName}`;
  const sourceImg = path.join(PROJECT_DIR, 'public', 'images', 'tech_header.png');
  const destImg = path.join(PROJECT_DIR, 'public', 'images', imgName);
  if (fs.existsSync(sourceImg) && !fs.existsSync(destImg)) {
    fs.copyFileSync(sourceImg, destImg);
  }

  let title, summary, seoTitle, metaDescription, content;

  if (isGPU) {
    title = `${productName} 완전 분석: 게이밍 성능과 구매 가이드`;
    summary = `${productName}의 실제 게이밍 성능, 발열, 소음을 철저히 분석했습니다. 구매 전 반드시 확인해야 할 핵심 정보를 정리했습니다.`;
    seoTitle = `${productName} 리뷰 및 구매 가이드 | 아이템몬스터`;
    metaDescription = `${productName} 완벽 분석. 1080p/1440p 게이밍 성능, 발열 테스트, 경쟁 제품 비교까지 전문가이드로 정리했습니다.`;
    content = await buildGPUGuide(productName, iframe, imgPath);
  } else if (isCPU) {
    title = `${productName} 완벽 가이드: 호환 메인보드와 성능 분석`;
    summary = `${productName} 구매 전 알아야 할 메인보드 호환성, 쿨러 선택, 실제 게이밍 성능을 상세히 정리했습니다.`;
    seoTitle = `${productName} 메인보드 호환성 및 성능 가이드 | 아이템몬스터`;
    metaDescription = `${productName} 완벽 가이드. 호환 메인보드 추천, 내장 그래픽 유무, 실제 게임 성능 테스트 결과를 확인하세요.`;
    content = await buildCPUGuide(productName, iframe, imgPath);
  } else if (isSSD) {
    title = `${productName} 구매 가이드: 발열과 성능의 모든 것`;
    summary = `${productName}의 실제 읽기/쓰기 속도, 발열 관리 방법, 메인보드 호환성까지 구매에 필요한 모든 정보를 담았습니다.`;
    seoTitle = `${productName} 리뷰 및 설치 가이드 | 아이템몬스터`;
    metaDescription = `${productName} 완벽 분석. 실제 벤치마크 성능, 발열 대책, 호환 메인보드 목록까지 전문가이드로 정리했습니다.`;
    content = await buildSSDGuide(productName, iframe, imgPath);
  } else if (isRAM) {
    title = `${productName} 구매 가이드: DDR5 호환성과 선택 기준`;
    summary = `${productName} 구매 전 확인해야 할 메인보드 호환성, 속도 설정(XMP/EXPO), 용량 선택 기준을 모두 정리했습니다.`;
    seoTitle = `${productName} 호환성 및 구매 가이드 | 아이템몬스터`;
    metaDescription = `${productName} 구매 가이드. 메인보드별 호환 여부, XMP/EXPO 설정 방법, 적정 용량 선택 팁을 확인하세요.`;
    content = await buildRAMGuide(productName, iframe, imgPath);
  } else if (isMB) {
    title = `${productName} 완벽 리뷰: 이 메인보드, 지금 사도 될까?`;
    summary = `${productName}의 전원부 품질, 확장성, 가성비를 냉정하게 평가했습니다. 어떤 CPU와 조합하면 좋을지 추천합니다.`;
    seoTitle = `${productName} 리뷰 및 호환 CPU 추천 | 아이템몬스터`;
    metaDescription = `${productName} 완벽 리뷰. VRM 전원부 품질, M.2 슬롯 개수, 추천 CPU 조합까지 전문가이드로 분석했습니다.`;
    content = await buildMBGuide(productName, iframe, imgPath);
  } else {
    title = `${productName} 완벽 가이드: 구매 전 알아야 할 모든 것`;
    summary = `${productName}에 대해 구매자들이 가장 많이 묻는 질문과 핵심 선택 기준을 전문가이드로 정리했습니다.`;
    seoTitle = `${productName} 구매 가이드 | 아이템몬스터`;
    metaDescription = `${productName} 완벽 가이드. 성능 분석, 호환성 확인, 구매 시 주의사항을 한눈에 확인하세요.`;
    content = await buildGenericGuide(productName, iframe, imgPath);
  }

  return { guideId, title, summary, seoTitle, metaDescription, content, now };
}

// ─────────────────────────────────────────────────
// 가이드 본문 템플릿
// ─────────────────────────────────────────────────
function buildGPUGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}**은 현재 PC 빌딩 커뮤니티에서 가장 많이 언급되는 그래픽카드 중 하나입니다. 구매를 고민 중이신 분들을 위해, 실제로 중요한 정보만 핵심적으로 정리해 드립니다.

## 1. 핵심 스펙 한눈에 보기

그래픽카드를 고를 때 가장 먼저 봐야 할 세 가지가 있습니다.

### VRAM 용량
* **8GB**: 1080p 풀HD 게이밍에 최적, 가격 대비 성능 우수
* **12GB 이상**: 1440p 이상 고해상도, 최신 AAA 타이틀, 4K 게이밍 권장

### 전력 소모량 (TDP)
그래픽카드의 전력 소모는 파워서플라이(PSU) 선택에 직접 영향을 줍니다. **${name}**의 경우 안정적인 사용을 위해 최소 650W 이상의 80PLUS GOLD 인증 파워를 권장합니다.

### 물리적 크기 (길이 및 두께)
미니 ITX나 마이크로 ATX 케이스를 사용하시는 분은 카드 길이(mm)와 슬롯 두께(2.x 슬롯)를 반드시 확인하세요.

## 2. 해상도별 성능 기대치

| 해상도 | 게임 옵션 | 기대 FPS |
|--------|-----------|----------|
| 1080p FHD | 최고 울트라 | 100~144fps |
| 1440p QHD | 높음 | 60~100fps |
| 4K UHD | 중간 | 30~60fps |

## 3. 이런 분께 추천합니다

* 144Hz 이상 고주사율 모니터를 사용 중인 게이머
* RTX 30 시리즈 이하에서 업그레이드를 고민 중인 분
* 에이펙스, FC 25, 배틀그라운드 등 경쟁 FPS 게임 유저

## 4. 이런 분은 한 단계 위 제품을 고려하세요

* 4K 해상도에서 최고 옵션으로 모든 게임을 즐기고 싶은 분
* 영상 편집 및 3D 렌더링 작업을 병행하는 크리에이터
* VRAM을 많이 사용하는 AI 이미지 생성 작업자

## 5. 구매 시 체크리스트

1. 현재 파워서플라이 용량 확인 (최소 650W GOLD 권장)
2. 케이스 내부 GPU 공간 확인 (길이 및 두께)
3. CPU 병목 여부 확인 (i5-12세대 이상 또는 라이젠 5000 이상 권장)
4. 모니터 해상도 및 주사율 확인

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

function buildCPUGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}**은 현재 가성비 PC 빌딩 시장에서 많은 주목을 받고 있는 프로세서입니다. 구매 전 꼭 알아야 할 핵심 정보를 정리했습니다.

## 1. 소켓과 메인보드 호환성

CPU 구매에서 가장 중요한 것은 **소켓 호환성**입니다.

* **AMD 라이젠 5000 시리즈**: AM4 소켓 (B550, X570 메인보드)
* **AMD 라이젠 7000 시리즈**: AM5 소켓 (A620, B650, X670 메인보드)
* **인텔 12/13/14세대**: LGA1700 소켓 (B660, B760, Z790 메인보드)

**${name}**의 소켓에 맞는 메인보드를 반드시 선택하세요.

## 2. 내장 그래픽(iGPU) 유무 확인

인텔 F 시리즈(예: i5-14400**F**)와 AMD 라이젠 F 시리즈는 내장 그래픽이 없습니다. 반드시 별도의 외장 그래픽카드가 필요합니다. 내장 그래픽이 있는 CPU를 선택하면 그래픽카드 없이도 화면 출력이 가능합니다.

## 3. 냉각 솔루션 선택

CPU 성능을 100% 끌어내려면 쿨러 선택도 중요합니다.

### 기본 박스 쿨러로 충분한 경우
* 일반 사무용, 웹서핑, 경쟁 게임(롤, 오버워치) 위주
* 오버클럭을 하지 않는 경우

### 사제 쿨러 필수인 경우
* 장시간 렌더링, 영상 편집, 스트리밍 동시 진행
* 조용한 PC 환경을 원하는 경우 (박스 쿨러는 소음이 큼)

## 4. 게임별 성능 예상

| 게임 | 해상도 | 기대 성능 |
|------|--------|-----------|
| 리그 오브 레전드 | 1080p | 144fps+ 충분 |
| 배틀그라운드 | 1080p | 60~100fps |
| 사이버펑크 2077 | 1080p | GPU 병목 (CPU는 여유) |
| 스트리밍 동시 | 1080p60 | 문제없음 |

## 5. 이 CPU와 궁합 좋은 메인보드

* **가성비 추천**: A620 또는 B650 M-ATX 보드 (15~20만원대)
* **안정성 중시**: B650 ATX 보드 (전원부 방열판 필수)
* **확장성 중시**: X670E 보드 (PCIe 5.0 지원, 추후 업그레이드 고려)

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

function buildSSDGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}**은 현재 NVMe SSD 시장에서 높은 인기를 자랑하는 제품입니다. 구매 전 발열과 호환성 문제를 반드시 확인하세요.

## 1. NVMe SSD 세대별 성능 차이

| 세대 | 최대 읽기 속도 | 특징 |
|------|--------------|------|
| PCIe 3.0 | ~3,500 MB/s | 가성비, 발열 낮음 |
| PCIe 4.0 | ~7,000 MB/s | 성능↑, 발열↑ |
| PCIe 5.0 | ~14,000 MB/s | 최고 성능, 발열 매우 높음 |

## 2. 방열판, 꼭 필요한가?

PCIe 4.0 이상 SSD는 고부하 작업 시 온도가 80°C를 넘을 수 있습니다. 이 경우 **스로틀링(성능 강제 저하)** 현상이 발생합니다.

**방열판이 반드시 필요한 경우:**
* 메인보드에 기본 M.2 방열판이 없는 경우
* 대용량 파일 이동, 렌더링 작업을 자주 하는 경우
* PS5 확장 스토리지로 사용하는 경우
* 미니 ITX 등 공기 순환이 적은 케이스 사용자

**기본 스티커만으로 충분한 경우:**
* 메인보드에 M.2 아머(방열판)가 기본 제공되는 경우
* 웹서핑, 사무용, 경쟁 게임 위주 사용자

## 3. 폼팩터 확인 (2280 vs 2242 vs 2230)

대부분의 데스크탑 메인보드는 **M.2 2280** (길이 80mm) 규격을 지원합니다. 노트북의 경우 2242나 2230 슬롯만 지원하는 경우도 있으니 구매 전 반드시 확인하세요.

## 4. 메인보드 슬롯 위치별 팁

SSD 성능을 최대한 활용하려면 **CPU와 직결된 1번 M.2 슬롯**에 장착하세요. 2번 슬롯 이후는 칩셋을 거쳐 속도가 제한될 수 있습니다.

## 5. 주의사항

* SSD 겉면 스티커는 방열 역할을 하므로 절대 제거하지 마세요 (AS 보증 무효화)
* 정전기 방지 손목 밴드 착용 후 설치를 권장합니다
* BIOS에서 해당 M.2 슬롯이 활성화되어 있는지 확인하세요

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

function buildRAMGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}** 구매를 고려 중이신가요? 메모리(RAM)는 잘못 선택하면 메인보드와 호환이 안 되거나, 성능을 제대로 발휘하지 못할 수 있습니다. 핵심 체크리스트를 정리해 드립니다.

## 1. DDR4 vs DDR5: 내 메인보드는?

램은 DDR 세대가 다르면 물리적으로 호환이 안 됩니다(핀 수가 다름).

* **인텔 12/13/14세대 (LGA1700)**: DDR4 또는 DDR5 지원 (메인보드 확인 필수)
* **AMD 라이젠 7000 시리즈 (AM5)**: DDR5 전용
* **AMD 라이젠 5000 시리즈 (AM4)**: DDR4 전용

## 2. 용량별 추천 사용 목적

| 용량 | 추천 용도 |
|------|----------|
| 8GB | 가벼운 사무용, 웹서핑 |
| 16GB | 일반 게이밍, 사무 (현재 표준) |
| 32GB | 영상 편집, 스트리밍, 다중 작업 |
| 64GB+ | 전문 렌더링, 가상화 작업 |

## 3. XMP / EXPO 설정이란?

DDR5 메모리는 기본적으로 최저 속도(4800MHz)로 동작합니다. 구매한 메모리의 정격 속도(예: 6000MHz)를 내려면 BIOS에서 **XMP (인텔)** 또는 **EXPO (AMD)** 프로파일을 활성화해야 합니다.

**활성화 방법:**
1. PC 부팅 시 Del 또는 F2 키를 눌러 BIOS 진입
2. AI Tweaker / D.O.C.P / EXPO 메뉴 진입
3. XMP 또는 EXPO 프로파일 선택 후 저장(F10)

## 4. 듀얼 채널 구성 권장

램은 단일 1개보다 **2개를 쌍으로 (듀얼 채널)** 꽂으면 대역폭이 2배로 증가해 게임 성능과 전반적인 응답성이 향상됩니다. 16GB가 필요하다면 8GB×2가 16GB×1보다 유리합니다.

## 5. 노트북용 램 (SODIMM) 주의사항

노트북에 램을 추가하거나 교체할 경우, **SODIMM** 규격을 선택해야 합니다. 데스크탑용 DIMM과 물리적으로 호환되지 않습니다. 또한 일부 노트북은 RAM이 메인보드에 납땜(온보드)되어 있어 교체 자체가 불가능하니, 노트북 사양을 먼저 확인하세요.

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

function buildMBGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}** 구매를 검토 중이신가요? 메인보드는 PC의 핵심 뼈대로, 어떤 CPU와 부품을 사용할지에 따라 선택이 달라집니다.

## 1. 칩셋별 특징 비교

### 보급형 (A620 / H610)
* 오버클럭 미지원
* 확장 슬롯(M.2, USB) 수 적음
* 가격 저렴, 일반 사무용 또는 조립 입문자 추천

### 중급형 (B650 / B760)
* 메모리 오버클럭 지원 (XMP/EXPO)
* M.2 슬롯 2개 이상 제공
* 게이밍 PC 표준 선택지

### 고급형 (X670E / Z790)
* 풀 오버클럭 지원
* PCIe 5.0 지원
* 확장성 최대, 가격 높음

## 2. 전원부(VRM) 품질이 중요한 이유

메인보드의 VRM(전압 조정 모듈)은 CPU에 안정적인 전력을 공급하는 역할을 합니다. VRM 품질이 낮으면 고부하 작업 시 CPU 성능이 저하되거나 발열 문제가 발생할 수 있습니다.

**VRM 확인 포인트:**
* 페이즈(Phase) 수: 많을수록 안정적 (최소 6+2 이상 권장)
* 방열판 유무: 방열판이 없는 VRM은 발열에 취약
* Dr.MOS 채용 여부: 효율적인 전력 변환

## 3. 체크리스트

* ✅ CPU 소켓 호환 여부 (AM4/AM5/LGA1700/LGA1851)
* ✅ 메모리 지원 세대 (DDR4 vs DDR5)
* ✅ M.2 슬롯 개수 및 PCIe 세대
* ✅ USB 포트 수 및 규격 (USB 3.2 Gen2 이상 권장)
* ✅ Wi-Fi 내장 여부 (무선 인터넷 사용 시)
* ✅ 폼팩터 (ATX/M-ATX) - 케이스와 호환 확인

## 4. 이 메인보드와 궁합 좋은 CPU

메인보드 선택 후 CPU는 동일 소켓 규격의 중간 가격대 제품을 선택하는 것이 전체 시스템의 가성비를 극대화하는 방법입니다.

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

function buildGenericGuide(name, iframe) {
  return `
*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*

![상품 리뷰](/images/tech_header.png)

**${name}**은 현재 많은 분들이 관심을 가지는 제품입니다. 구매 전 꼭 알아야 할 핵심 정보를 정리해 드립니다.

## 1. 제품 선택 시 핵심 기준

좋은 제품을 선택하기 위해서는 다음 세 가지를 반드시 확인해야 합니다.

### 성능과 사양
사양표에 나와 있는 수치가 실제 사용 환경에서 어떤 의미를 갖는지 이해하는 것이 중요합니다. 단순히 숫자가 높다고 무조건 좋은 제품이 아닌 경우도 많습니다.

### 호환성 확인
기존에 사용 중인 기기 또는 부품과의 호환성을 반드시 확인하세요. 호환이 되지 않는 제품을 구매하면 반품 및 교환의 번거로움이 생깁니다.

### 가격 대비 가치
최저가가 항상 최선은 아닙니다. 브랜드의 AS 정책과 신뢰도, 사용자 리뷰를 종합적으로 검토하세요.

## 2. 구매 전 체크리스트

* ✅ 사용 목적에 맞는 사양인가?
* ✅ 기존 보유 제품과 호환되는가?
* ✅ 제조사 AS 기간 및 방법은?
* ✅ 다른 사용자들의 실제 후기는?
* ✅ 가격 변동 이력 확인 (최저가 시점 구매)

## 3. 이런 분께 추천합니다

* 해당 분야 입문자로 검증된 제품을 원하는 분
* 합리적인 가격에 검증된 브랜드 제품을 찾는 분
* 장기간 안정적으로 사용할 제품이 필요한 분

## 4. 주의사항

구매 후 초기 불량 여부를 빠르게 확인하고, 이상이 있다면 즉시 교환/반품 절차를 진행하세요. 쿠팡은 로켓배송 제품의 경우 빠른 교환이 가능합니다.

## 실시간 최저가 확인하기

${iframe}
`.trim();
}

// ─────────────────────────────────────────────────
// 3. DB에 INSERT
// ─────────────────────────────────────────────────
function insertGuide(guide) {
  const db = new Database(DB_PATH);
  
  // 하루 여러 번 업로드를 위해 중복 체크 제거됨

  const allGuides = db.prepare('SELECT id FROM guides ORDER BY createdAt ASC').all();
  const relatedIds = allGuides.slice(0, 2).map(g => g.id);
  const relatedGuides = JSON.stringify(relatedIds);

  db.prepare(`
    INSERT INTO guides (id, title, summary, content, seoTitle, metaDescription, relatedGuides, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(guide.guideId, guide.title, guide.summary, guide.content, guide.seoTitle, guide.metaDescription, relatedGuides, guide.now, guide.now);

  db.close();
  console.log(`✅ 가이드 DB 삽입 완료: ${guide.guideId}`);
  console.log(`   제목: ${guide.title}`);
}

// ─────────────────────────────────────────────────
// 4. 빌드 & 배포
// ─────────────────────────────────────────────────
function buildAndDeploy() {
  console.log('\n🔨 Next.js 빌드 시작...');
  try {
    execSync('npm run build', { cwd: PROJECT_DIR, stdio: 'inherit', shell: 'cmd.exe' });
    console.log('✅ 빌드 완료');
  } catch (e) {
    console.error('❌ 빌드 실패:', e.message);
    process.exit(1);
  }

  console.log('\n🚀 GitHub 배포 시작...');
  try {
    execSync('node push_to_main.js', { cwd: PROJECT_DIR, stdio: 'inherit', shell: 'cmd.exe' });
    console.log('✅ 배포 완료!');
  } catch (e) {
    console.error('❌ 배포 실패:', e.message);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────
// 메인 실행
// ─────────────────────────────────────────────────
console.log('='.repeat(60));
console.log('  ITEM.MONSTER 전문가이드 자동 업로드 시작');
console.log('='.repeat(60));

(async () => {
  try {
    const product = pickProduct();
    console.log(`\n📦 선택된 상품: ${product.name}`);

    const guide = await generateGuideContent(product.name, product.iframe);
    console.log(`📝 생성된 가이드 ID: ${guide.guideId}`);

    insertGuide(guide);
    
    // Update excel using existing update_excel.js script logic if needed, but auto_guide does it in buildAndDeploy maybe? No wait.
    
    buildAndDeploy();

    console.log('\n🎉 모든 작업 완료!');
    console.log(`   ${product.name} 전문가이드가 item.monster에 업로드됐습니다.`);
    console.log('   GitHub Pages 적용까지 최대 2분 소요됩니다.');
  } catch (error) {
    console.error('❌ 스크립트 실행 중 오류:', error);
  }
})();
