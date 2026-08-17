const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '../..');
const queueRoot = path.join(root, 'content', 'scheduled-guides');
const guidesDir = path.join(queueRoot, 'guides');
const imagesDir = path.join(queueRoot, 'images');
const checkedAt = '2026-08-18T00:00:00+09:00';

const manualSources = {
  flight2026: {
    title: '우리 기준이 세계 표준으로…보조배터리 2개 제한, 기내 사용·충전 전면 금지',
    publisher: '국토교통부',
    url: 'https://www.molit.go.kr/iatcro/USR/N0201/m_16156/dtl.jsp?id=95091874&lcmspage=2',
    sourceType: 'public-agency', checkedAt,
  },
  airpodsSpec: {
    title: 'AirPods 4 기술 사양', publisher: 'Apple Support',
    url: 'https://support.apple.com/ko-kr/121203', sourceType: 'manufacturer-spec', checkedAt,
  },
  airpodsDocs: {
    title: 'AirPods 설명서 및 다운로드', publisher: 'Apple Support',
    url: 'https://support.apple.com/ko-kr/docs/airpods', sourceType: 'manufacturer-manual', checkedAt,
  },
  airpodsClean: {
    title: 'AirPods 청소 방법', publisher: 'Apple Support',
    url: 'https://support.apple.com/ko-kr/102672', sourceType: 'manufacturer-support', checkedAt,
  },
  razerProduct: {
    title: 'Razer DeathAdder V3 Pro 제품 정보', publisher: 'Razer',
    url: 'https://www.razer.com/gaming-mice/razer-deathadder-v3-pro', sourceType: 'manufacturer-product', checkedAt,
  },
  razerSupport: {
    title: 'Razer DeathAdder V3 Pro 지원 및 FAQ', publisher: 'Razer Support',
    url: 'https://mysupport.razer.com/app/answers/detail/a_id/6125/', sourceType: 'manufacturer-support', checkedAt,
  },
  samsungFridge: {
    title: '삼성 냉장고 제품 정보', publisher: '삼성전자',
    url: 'https://www.samsung.com/sec/refrigerators/', sourceType: 'manufacturer-product', checkedAt,
  },
  samsungSupport: {
    title: '삼성전자 제품 지원·매뉴얼 검색', publisher: '삼성전자',
    url: 'https://www.samsung.com/sec/support/', sourceType: 'manufacturer-support', checkedAt,
  },
  lgFridge: {
    title: 'LG 냉장고 제품 정보', publisher: 'LG전자',
    url: 'https://www.lge.co.kr/refrigerators', sourceType: 'manufacturer-product', checkedAt,
  },
  samsungWasher: {
    title: '삼성 세탁기 제품 정보', publisher: '삼성전자',
    url: 'https://www.samsung.com/sec/washing-machines/', sourceType: 'manufacturer-product', checkedAt,
  },
  lgWasher: {
    title: 'LG 세탁기 제품 정보', publisher: 'LG전자',
    url: 'https://www.lge.co.kr/washing-machines', sourceType: 'manufacturer-product', checkedAt,
  },
  lgSupport: {
    title: 'LG전자 제품 지원·사용설명서 검색', publisher: 'LG전자',
    url: 'https://www.lge.co.kr/support', sourceType: 'manufacturer-support', checkedAt,
  },
  vankyoProduct: {
    title: 'Vankyo 프로젝터 제품 정보', publisher: 'Vankyo',
    url: 'https://ivankyo.com/collections/projectors', sourceType: 'manufacturer-product', checkedAt,
  },
  vankyoSupport: {
    title: 'Vankyo 다운로드 및 사용설명서', publisher: 'Vankyo',
    url: 'https://ivankyo.com/pages/download', sourceType: 'manufacturer-support', checkedAt,
  },
  ezvizProduct: {
    title: 'EZVIZ BC1C 제품 정보', publisher: 'EZVIZ',
    url: 'https://www.ezviz.com/product/bc1c/36606', sourceType: 'manufacturer-product', checkedAt,
  },
  ezvizSupport: {
    title: 'EZVIZ 제품 지원 센터', publisher: 'EZVIZ',
    url: 'https://support.ezviz.com/', sourceType: 'manufacturer-support', checkedAt,
  },
  ezvizDownload: {
    title: 'EZVIZ 다운로드 센터', publisher: 'EZVIZ',
    url: 'https://www.ezviz.com/page/download', sourceType: 'manufacturer-manual', checkedAt,
  },
  sidizProduct: {
    title: '시디즈 T50 제품 정보', publisher: '시디즈',
    url: 'https://kr.sidiz.com/products/t50', sourceType: 'manufacturer-product', checkedAt,
  },
  sidizCatalog: {
    title: '시디즈 제품 공식 카탈로그', publisher: '시디즈',
    url: 'https://cdn.sidiz.com/_upload/contents/2201/F1642577058484EMYVSOBOXFD.pdf', sourceType: 'manufacturer-spec', checkedAt,
  },
  sidizSupport: {
    title: '시디즈 고객지원', publisher: '시디즈',
    url: 'https://kr.sidiz.com/pages/support', sourceType: 'manufacturer-support', checkedAt,
  },
  energyAir: {
    title: '공기청정기 에너지소비효율 등급 정보의 표준사용면적 항목', publisher: '한국에너지공단',
    url: 'https://eep.energy.or.kr/certification/certi_view_121.aspx?no=288001002', sourceType: 'public-agency', checkedAt,
  },
};

const topics = [
  {
    slug: 'guide-air-purifier-room-size-filter-sensor', category: 'home-appliances', topicCluster: 'air-quality',
    title: '공기청정기 평형 고르는 법: 표준사용면적·필터·센서 순서',
    description: '공기청정기를 고를 때 광고 속 평수 대신 표준사용면적, 필터 교체 조건, 센서와 설치 간격을 제조사 자료에서 확인하는 순서를 정리했습니다.',
    targetQuery: '공기청정기 평형 고르는 법',
    opening: '공기청정기는 평수만 크게 적힌 제품을 고르면 끝나는 가전처럼 보이지만, 실제 사용에서는 어느 방에 둘지와 필터를 계속 구할 수 있는지가 더 오래 영향을 줍니다. 거실 한복판과 작은 침실은 필요한 풍량도 다르고, 벽에 너무 붙이면 흡입구와 토출구가 제 역할을 하기 어렵습니다.',
    sourceRefs: ['item-samsung-ap70f03102rtd-bluesky-3100', 'item-lg-as183hwwa-puricare-360-hit', 'item-cuckoo-ac-28w20fws-filter-space-check'],
    extraSources: ['energyAir'], imageRefs: [{ slug: 'item-samsung-ap70f03102rtd-bluesky-3100', take: 4 }],
    criteria: [
      ['표준사용면적부터 방 크기와 맞춥니다', '제품명에 붙은 평형보다 에너지효율 정보와 제조사 사양의 표준사용면적을 먼저 봅니다. 거실과 방을 동시에 정화하려는지, 문을 닫은 한 공간에서 쓸지에 따라 후보가 달라집니다.', ['설치할 방의 가로와 세로를 곱해 ㎡로 적기', '제조사 사양의 표준사용면적을 같은 단위로 비교하기', '여러 방을 한 대로 해결한다고 가정하지 않기']],
      ['필터 이름보다 부품 번호와 교체비를 봅니다', '복합필터라는 이름만으로 수명과 가격을 알 수 없습니다. 정확한 필터 모델 번호, 권장 교체 조건, 공식 소모품 판매 여부를 함께 확인해야 유지비를 계산할 수 있습니다.', ['본체와 호환되는 필터 품번 기록', '필터 한 세트 가격과 배송 가능 여부 확인', '사용 환경에 따라 교체 시기가 달라지는 점 반영']],
      ['센서는 표시 항목과 위치를 구분합니다', '미세먼지 수치, 가스 또는 냄새 표시, 자동모드는 같은 말이 아닙니다. 무엇을 감지하는 센서인지와 센서가 본체 어디에 있는지를 설명서에서 확인합니다.', ['표시창이 보여주는 오염 항목 확인', '센서 청소 방법과 주기 확인', '벽과 커튼이 센서·흡입구를 가리지 않는지 점검']],
      ['흡입구와 토출구를 막지 않을 자리를 잡습니다', '크기 숫자는 본체가 들어가는지만 알려줍니다. 필터를 빼는 방향, 전원선, 상부 토출 공간까지 포함해 설치 자리를 재야 합니다.', ['본체 폭·깊이·높이 기록', '필터 커버가 열리는 방향에 여유 확보', '상부와 측면 권장 간격을 설명서에서 확인']],
      ['소음과 자동모드는 생활 시간대에 맞춥니다', '최대 풍량 수치만 비교하면 취침 중 사용성을 놓칠 수 있습니다. 취침모드의 표시등, 풍량 변화와 앱 예약처럼 매일 쓸 기능을 우선 확인합니다.', ['침실이면 표시등 끄기 지원 확인', '자동모드가 반응하는 센서 종류 확인', '앱이 필수인지 선택 기능인지 구분']],
    ],
  },
  {
    slug: 'guide-electric-shaver-head-cleaning-station', category: 'fashion-beauty', topicCluster: 'personal-care',
    title: '전기면도기 고르는 법: 날망·세척 스테이션·교체 비용',
    description: '전기면도기 본체 등급보다 피부에 닿는 헤드 구조, 습식 사용 조건, 세척 스테이션 구성과 교체날 비용을 먼저 확인하는 방법입니다.',
    targetQuery: '전기면도기 고르는 법',
    opening: '전기면도기는 시리즈 숫자가 높다고 누구에게나 잘 맞는 제품이라고 보기 어렵습니다. 수염 방향과 면도 습관, 세척할 수 있는 시간, 교체날과 세정액 비용이 맞아야 오래 쓰기 편합니다. 같은 시리즈라도 세척 스테이션과 트리머 구성은 모델명 끝자리에서 달라질 수 있습니다.',
    sourceRefs: ['item-braun-9665cc-cleaning-station', 'item-braun-5762-clean-charge-check', 'item-philips-s5887-29-skin-iq-shave-check'],
    imageRefs: [{ slug: 'item-braun-9665cc-cleaning-station', take: 4 }],
    criteria: [
      ['왕복식과 회전식은 익숙한 면도 동선으로 고릅니다', '헤드 모양보다 내가 면도기를 움직이는 방향을 생각하는 편이 빠릅니다. 직선으로 밀어 올리는 습관과 원을 그리는 습관이 다르므로 제조사 사용 안내를 먼저 읽습니다.', ['턱선과 목처럼 놓치기 쉬운 부위 적기', '제조사가 안내하는 헤드 이동 방향 확인', '처음 적응 기간이 필요할 수 있음을 고려']],
      ['교체날 품번과 권장 교체 조건을 적습니다', '본체 가격은 한 번이지만 날망과 커터는 계속 드는 비용입니다. 정확한 Type과 모델 번호로 호환 부품을 검색해야 비슷하게 생긴 부품을 잘못 사지 않습니다.', ['본체 바닥의 Type 번호 확인', '공식 부품 페이지의 호환 모델 대조', '교체날 가격을 사용 기간으로 나눠 계산']],
      ['세척 스테이션은 포함 여부와 소모품을 봅니다', '세척과 충전을 함께 하는 스테이션은 편하지만 설치 자리와 세정액 카트리지가 필요합니다. 본체만 있는 옵션과 스테이션 포함 옵션의 모델명을 구분합니다.', ['상자 구성에 스테이션이 실제 포함되는지 확인', '세정액 품번과 판매 단위 확인', '욕실 밖 건조한 설치 공간 확보']],
      ['습식 사용과 충전 중 사용 조건을 구분합니다', '방수 또는 물세척 표기가 있어도 충전 케이블을 연결한 상태에서 쓰라는 뜻은 아닙니다. 거품 면도, 샤워 중 사용, 헤드 세척 범위를 매뉴얼에서 각각 확인합니다.', ['습식 면도 지원 문구 확인', '충전 중 작동 제한 확인', '세척 뒤 완전히 말릴 위치 마련']],
      ['트리머와 케이스는 실제 사용 장면으로 판단합니다', '구레나룻 트리머가 본체 일체형인지 별도 액세서리인지, 여행용 케이스가 충전 기능까지 갖췄는지에 따라 휴대 구성이 달라집니다.', ['필요한 트리머 형태 적기', '케이스와 충전기 포함 여부 확인', '해외 사용 시 입력 전압을 충전기에서 재확인']],
    ],
  },
  {
    slug: 'guide-cordless-vacuum-runtime-charge-storage', category: 'home-appliances', topicCluster: 'cleaning',
    title: '무선청소기 고르는 법: 사용시간·충전·거치·소모품',
    description: '무선청소기의 최대 흡입력 문구보다 모드별 사용시간, 충전 위치, 먼지통 비우기와 필터·먼지봉투 비용을 확인하는 순서입니다.',
    targetQuery: '무선청소기 고르는 법',
    opening: '무선청소기는 최대 흡입력 숫자보다 청소를 끝낼 때까지 배터리가 버티는지, 어디에서 충전할지, 먼지통을 얼마나 자주 비울지가 만족도를 좌우합니다. 제조사 자료의 최대 사용시간은 특정 모드와 툴 조건일 수 있으므로 내 청소 동선과 같은 조건인지 구분해야 합니다.',
    sourceRefs: ['item-minix-mnvc100g-dust-bag-cycle', 'item-atocare-the-simple-charge-usbc', 'item-tefal-ty6545kl-runtime-charge-standing'],
    imageRefs: [{ slug: 'item-minix-mnvc100g-dust-bag-cycle', take: 4 }],
    criteria: [
      ['최대 시간 대신 모드별 사용시간을 봅니다', '일반·강·터보 모드와 모터 구동 헤드 사용 여부에 따라 시간이 달라질 수 있습니다. 제조사 표에서 조건을 함께 읽고 한 번의 청소 면적과 비교합니다.', ['집 전체 청소에 걸리는 시간 재보기', '자주 쓸 모드의 사용시간 확인', '배터리 잔량 표시 방식 확인']],
      ['충전기 입력과 거치 위치를 먼저 정합니다', '벽걸이, 셀프 스탠딩, 바닥 거치대는 필요한 공간과 설치 방식이 다릅니다. 콘센트까지 선이 닿는지와 충전기를 계속 꽂아둘 자리를 함께 봅니다.', ['거치대 폭과 깊이 측정', '콘센트 위치와 케이블 길이 확인', '벽 타공 여부와 임대주택 조건 확인']],
      ['먼지통과 먼지봉투의 반복 비용을 계산합니다', '자동 먼지비움이 있으면 비우는 횟수는 줄지만 전용 봉투를 구매해야 할 수 있습니다. 봉투 없는 구조도 필터 세척과 건조 시간이 필요합니다.', ['먼지통 분리 방향 확인', '먼지봉투·필터 품번과 가격 기록', '물세척 가능 부품과 건조 시간 구분']],
      ['헤드는 바닥재와 머리카락 조건으로 고릅니다', '부드러운 롤러, 브러시, 물걸레 키트는 모두 쓰임이 다릅니다. 우리 집 바닥과 카펫, 반려동물 털에 필요한 툴이 기본 구성인지 봅니다.', ['주요 바닥재와 카펫 유무 적기', '필요한 헤드의 기본 포함 여부 확인', '브러시 분해와 머리카락 제거 방법 확인']],
      ['본체 무게보다 손에 걸리는 구성을 봅니다', '표기 무게가 본체만인지 헤드와 봉을 포함한 것인지 구분해야 합니다. 높은 선반과 계단을 청소한다면 손잡이 주변 무게 배분도 중요합니다.', ['전체 조립 무게 표기 확인', '자주 드는 높이와 계단 유무 점검', '반품 전 손잡이와 버튼 위치 확인']],
    ],
  },
  {
    slug: 'guide-air-fryer-capacity-basket-cleaning', category: 'living-kitchen', topicCluster: 'cooking-appliances',
    title: '에어프라이어 용량 고르는 법: 바스켓·열원·세척 공간',
    description: '리터 수만 비교하지 않고 바스켓 바닥 면적, 열풍이 도는 공간, 조작 방식과 세척 가능한 부품을 확인하는 에어프라이어 선택 기준입니다.',
    targetQuery: '에어프라이어 용량 고르는 법',
    opening: '에어프라이어의 리터 수는 큰데 실제로는 재료가 한 겹으로 놓이지 않는 경우가 있습니다. 조리 결과를 좌우하는 것은 숫자 하나보다 바스켓 바닥 모양, 열풍이 순환할 여유, 한 번에 조리할 식재료의 양입니다. 세척하기 어려우면 사용 빈도도 금방 줄어듭니다.',
    sourceRefs: ['item-cuchen-covd050i-5l-dial-basket', 'item-cuckoo-cafg0610tb-55l-basket', 'item-ninja-fn091kr-glass-airfryer-cleaning'],
    imageRefs: [{ slug: 'item-cuchen-covd050i-5l-dial-basket', take: 4 }],
    criteria: [
      ['리터보다 바스켓 바닥 면적을 봅니다', '같은 용량이라도 깊고 좁은 바스켓과 넓고 낮은 바스켓은 한 번에 펼칠 수 있는 재료가 다릅니다. 자주 조리할 냉동식품이나 생선의 크기를 기준으로 봅니다.', ['가장 자주 조리할 음식 크기 적기', '바스켓 내부 가로·세로 확인', '재료를 겹치지 않고 놓을 수 있는지 판단']],
      ['단일 바스켓과 듀얼존의 목적을 구분합니다', '두 메뉴를 동시에 조리하려면 듀얼존이 편하지만 각 칸의 실제 면적은 줄어듭니다. 큰 통닭 한 마리와 반찬 두 가지는 필요한 구조가 다릅니다.', ['동시에 조리할 메뉴 조합 적기', '각 바스켓 개별 용량 확인', '종료 시간을 맞추는 기능이 필요한지 판단']],
      ['유리와 코팅 바스켓은 관리 방법을 봅니다', '유리는 내부가 보이고 코팅 바스켓은 가벼운 편이지만, 무게와 충격·코팅 관리 조건이 다릅니다. 식기세척기 사용 가능 부품도 모델마다 다릅니다.', ['분리 가능한 부품 목록 확인', '식기세척기 사용 가능 표시 확인', '코팅 손상을 줄일 세척 도구 준비']],
      ['본체 주변 열 배출 공간을 확보합니다', '외형 치수만 맞춰 넣으면 뒤쪽과 위쪽 열이 빠질 공간이 부족할 수 있습니다. 조리 중 문이나 바스켓을 완전히 뺄 앞쪽 공간도 필요합니다.', ['본체 외형과 문·바스켓 인출 길이 측정', '설명서의 벽면 이격 거리 확인', '열에 약한 수납장 아래 설치 피하기']],
      ['조작 방식은 자주 쓰는 메뉴에 맞춥니다', '다이얼은 빠르게 맞추기 쉽고 디지털 프리셋은 반복 메뉴에 편할 수 있습니다. 숫자 메뉴가 많아도 온도와 시간을 직접 바꿀 수 있는지 확인합니다.', ['자주 쓰는 온도·시간 범위 확인', '예열과 보온이 필요한지 구분', '조리 중 설정 변경 방법 확인']],
    ],
  },
  {
    slug: 'guide-blender-container-blade-cleaning', category: 'living-kitchen', topicCluster: 'cooking-appliances',
    title: '블렌더 고르는 법: 용기·칼날·얼음 분쇄·세척 순서',
    description: '와트 숫자만 보지 않고 한 번에 만드는 양, 칼날 결합 방식, 뜨거운 재료 제한과 세척·건조 동선을 제조사 설명서에서 확인합니다.',
    targetQuery: '블렌더 고르는 법',
    opening: '블렌더는 소비전력이 높다고 모든 재료를 같은 방식으로 갈 수 있는 기기가 아닙니다. 큰 용기와 1인용 컵은 쓰임이 다르고, 얼음이나 견과류, 뜨거운 재료는 모델별 제한을 확인해야 합니다. 칼날 주변을 안전하게 씻고 완전히 말릴 수 있는지도 구매 전에 볼 항목입니다.',
    sourceRefs: ['item-ninja-br201kr-auto-iq-cleaning', 'item-braun-mq7025x-hand-blender-accessories-voltage-check', 'item-philips-hr2520-00-hand-blender-cup-cleaning-check'],
    imageRefs: [{ slug: 'item-ninja-br201kr-auto-iq-cleaning', take: 4 }],
    criteria: [
      ['용량은 한 번에 만드는 실제 양으로 정합니다', '표기 용량과 권장 최대선은 다를 수 있습니다. 스무디 한 잔인지 가족용 소스인지 먼저 정하고 최소·최대 표시를 설명서에서 확인합니다.', ['평소 한 번에 만드는 컵 수 적기', '용기의 최대선과 액체 권장량 확인', '남은 재료를 보관할 별도 용기 필요 여부 판단']],
      ['칼날 결합 순서와 잠금 구조를 봅니다', '용기·칼날·뚜껑이 정확히 결합돼야 작동하는 구조가 많습니다. 칼날을 손으로 직접 잡지 않고 분리할 수 있는지와 조립 표시를 확인합니다.', ['안전 잠금과 작동 조건 확인', '칼날 분리 시 손이 닿는 위치 점검', '부품별 정확한 조립 순서 읽기']],
      ['얼음과 뜨거운 재료 제한을 따로 확인합니다', '얼음 분쇄 가능 표기가 있어도 얼음 크기와 양, 액체 필요 여부가 정해질 수 있습니다. 밀폐 용기에 뜨거운 재료를 넣으면 압력이 생길 수 있어 제조사 제한을 지켜야 합니다.', ['얼음 사용 가능 여부와 조건 확인', '뜨거운 액체 허용 온도 확인', '마른 재료 전용 모드나 용기 필요 여부 확인']],
      ['자동 프로그램과 수동 속도의 차이를 봅니다', '프리셋은 정해진 시간과 정지 패턴을 반복하는 기능이고 재료 상태를 자동 판단한다는 뜻은 아닙니다. 수동 속도로 중간 질감을 조절할 수 있는지 봅니다.', ['자주 만들 메뉴의 프로그램 확인', '펄스와 수동 속도 지원 확인', '작동 중 재료를 추가하는 방법 확인']],
      ['세척 가능한 부품과 건조 자리를 확인합니다', '본체는 물에 담글 수 없고 칼날부와 패킹은 음식물이 남기 쉬운 곳입니다. 식기세척기 가능 여부와 패킹 분리 방법을 부품별로 확인합니다.', ['분리 세척 부품 목록 확인', '식기세척기 가능 선반 위치 확인', '완전히 말려 보관할 공간 확보']],
    ],
  },
  {
    slug: 'guide-electric-kettle-capacity-lid-filter', category: 'living-kitchen', topicCluster: 'cooking-appliances',
    title: '전기주전자 고르는 법: 용량·뚜껑·필터·안전 기능',
    description: '1.7L 같은 최대 용량보다 최소 물높이, 뚜껑과 주둥이 세척, 석회질 필터, 자동 전원 차단 조건을 먼저 확인합니다.',
    targetQuery: '전기주전자 고르는 법',
    opening: '전기주전자는 물만 끓이는 단순한 가전이지만 매일 손이 닿는 뚜껑과 손잡이, 내부 세척 편의에서 차이가 큽니다. 큰 용량이 필요하지 않은데 1.7L 제품을 고르면 본체가 커지고 최소 물높이 때문에 한 잔만 끓이기 불편할 수 있습니다.',
    sourceRefs: ['item-philips-hd9318-17l-kettle', 'item-philips-hd9352-80-kettle-safety-capacity'],
    extraSources: ['samsungSupport'], imageRefs: [{ slug: 'item-philips-hd9318-17l-kettle', take: 4 }],
    criteria: [
      ['최대 용량과 최소 물높이를 함께 봅니다', '최대선은 넘치지 않게 하는 기준이고 최소선은 히터가 안전하게 작동하는 데 필요한 양입니다. 한두 잔을 자주 끓인다면 최소량이 더 실용적인 정보입니다.', ['하루에 자주 끓이는 컵 수 적기', '용기 안 최소·최대 눈금 확인', '가득 채웠을 때 들어 올릴 무게 고려']],
      ['뚜껑이 얼마나 열리고 손이 들어가는지 봅니다', '입구가 좁거나 뚜껑이 충분히 열리지 않으면 내부 물때를 닦기 어렵습니다. 분리형 뚜껑인지 버튼식인지와 증기가 손 쪽으로 향하지 않는지 확인합니다.', ['뚜껑 열림 각도 확인', '손이나 세척솔이 들어갈 입구 폭 확인', '뜨거운 증기 배출 방향 확인']],
      ['주둥이 필터는 분리와 교체 가능성을 봅니다', '석회질 필터는 물속 모든 성분을 정수하는 필터가 아니라 따를 때 입자를 거르는 부품일 수 있습니다. 분리 세척 방법과 공식 부품 제공 여부를 봅니다.', ['필터 분리 방법 확인', '세척 후 재결합 표시 확인', '교체 부품 번호와 판매 여부 검색']],
      ['자동 전원 차단의 작동 조건을 읽습니다', '물이 끓었을 때, 물이 없을 때, 받침에서 들었을 때 차단하는 기능이 각각 표시되는지 확인합니다. 안전 기능이 있어도 최대선을 넘기거나 젖은 받침을 쓰면 안 됩니다.', ['건조 가열 방지 표기 확인', '받침에서 들면 꺼지는지 확인', '전원선과 받침의 물기 관리 방법 읽기']],
      ['보온과 온도 설정은 필요한 음료로 판단합니다', '분유나 차처럼 특정 온도를 자주 쓰면 온도 설정이 유용하지만, 단순히 끓는 물만 필요하면 세척 부품과 조작 단순성이 더 중요할 수 있습니다.', ['자주 마시는 음료의 온도 요구 적기', '보온 시간과 해제 방법 확인', '표시 온도가 물 전체의 실측을 뜻하는지 과신하지 않기']],
    ],
  },
  {
    slug: 'guide-robot-vacuum-threshold-dock-clearance', category: 'home-appliances', topicCluster: 'cleaning',
    title: '로봇청소기 사기 전 집 재는 법: 문턱·가구·도크 공간',
    description: '흡입력 숫자보다 우리 집 문턱 높이, 가구 밑 여유, 도크 문 열림과 급배수·전원 위치를 먼저 재는 로봇청소기 설치 가이드입니다.',
    targetQuery: '로봇청소기 문턱 도크 공간',
    opening: '로봇청소기는 성능표가 좋아도 집 구조와 맞지 않으면 청소하지 못하는 구역이 생깁니다. 문턱과 러그, 식탁 의자 사이, 소파 아래 높이를 먼저 재면 필요한 기능이 분명해집니다. 자동 먼지비움이나 세척 도크는 본체보다 훨씬 큰 설치 공간을 요구할 수 있습니다.',
    sourceRefs: ['item-electrolux-efr71222ds-threshold-emptying-mop-check', 'item-roborock-saros-z70-arm-dock-wifi-check', 'item-xiaomi-robot-vacuum-5-pro-dock-clearance-check', 'item-samsung-ai-7989878606-check'],
    imageRefs: [{ slug: 'item-electrolux-efr71222ds-threshold-emptying-mop-check', take: 1 }, { slug: 'item-roborock-saros-z70-arm-dock-wifi-check', take: 1 }, { slug: 'item-xiaomi-robot-vacuum-5-pro-dock-clearance-check', take: 1 }, { slug: 'item-samsung-ai-7989878606-check', take: 1 }],
    criteria: [
      ['문턱과 매트의 가장 높은 지점을 잽니다', '문턱은 가운데보다 모서리가 높거나 경사가 급할 수 있습니다. 제조사의 통과 높이는 시험 조건일 수 있으므로 실제 집의 최대 높이와 모양을 함께 기록합니다.', ['방마다 문턱 최대 높이 측정', '두꺼운 러그의 가장자리 높이 확인', '전선과 얇은 매트를 별도 정리']],
      ['가구 밑은 높이와 진입 폭을 같이 봅니다', '로봇 본체 높이만 들어가도 측면 브러시가 걸리거나 센서가 가구 아래에서 오작동할 수 있습니다. 침대와 소파의 가장 낮은 부분과 다리 사이 폭을 잽니다.', ['가구 밑 최저 높이 측정', '의자 다리 사이 폭 기록', '블라인드 끈과 충전선을 바닥에서 치우기']],
      ['도크는 앞·옆·위쪽 여유까지 확보합니다', '도크 앞에는 로봇이 정렬할 공간이 필요하고 위쪽 뚜껑이나 물통을 꺼내려면 선반과 간섭이 없어야 합니다. 문 뒤나 좁은 복도는 피하는 편이 좋습니다.', ['도크 본체 치수 기록', '앞쪽 진입 공간과 옆 여유 확인', '상부 물통·먼지봉투 교체 동선 점검']],
      ['물걸레 도크는 급배수와 세척을 구분합니다', '물통을 손으로 채우는 방식과 직배수 키트는 설치 조건이 다릅니다. 자동 세척이 있어도 오수통과 트레이를 정기적으로 관리해야 합니다.', ['물통 용량과 보충 위치 확인', '직배수 키트가 기본인지 별매인지 확인', '트레이 분리 세척 방법 읽기']],
      ['앱과 Wi‑Fi 조건을 설치 전에 확인합니다', '일부 초기 설정과 지도 편집은 앱이 필요하며 공유기 주파수나 계정 권한 조건이 있을 수 있습니다. 가족이 함께 쓸 때 공유 기능도 확인합니다.', ['지원하는 Wi‑Fi 대역 확인', '필수 앱과 지원 운영체제 확인', '카메라 탑재 모델의 개인정보 설정 점검']],
    ],
  },
  {
    slug: 'guide-dehumidifier-daily-capacity-drain-space', category: 'home-appliances', topicCluster: 'air-quality',
    title: '제습기 용량 고르는 법: 일일제습량·물통·연속배수',
    description: '제습기의 L 숫자를 물통 크기로 오해하지 않도록 일일제습량과 물통 용량을 구분하고, 배수·소음·설치 공간을 확인하는 방법입니다.',
    targetQuery: '제습기 용량 고르는 법',
    opening: '제습기의 20L, 25L 표기는 대개 하루 동안 제거할 수 있는 수분량을 뜻하며 물통 크기와 같은 숫자가 아닙니다. 실제 사용에서는 물통이 차서 멈추는 빈도, 연속배수 호스를 놓을 수 있는지, 뜨거운 바람과 소음을 감당할 위치가 더 중요합니다.',
    sourceRefs: ['item-lg-dq256mwga-dehumidifier-drain-space-check', 'item-lg-lg-1298242799-check'],
    extraSources: ['lgSupport'], imageRefs: [{ paths: ['/images/dehumidifier_1.png', '/images/dehumidifier_2.png', '/images/dehumidifier_3.png', '/images/dehumidifier_4.png'], sourceSlug: 'item-1781666462534' }],
    criteria: [
      ['일일제습량과 물통 용량을 구분합니다', '일일제습량은 정해진 시험 조건에서의 성능 지표이고 물통 용량은 한 번에 받아두는 양입니다. 두 숫자를 함께 봐야 비우는 횟수를 예상할 수 있습니다.', ['제조사 표의 시험 조건 확인', '물통 실용량과 만수 정지 확인', '하루 몇 번 비울 수 있는지 현실적으로 판단']],
      ['사용할 공간과 문을 여닫는 습관을 봅니다', '제습기는 열린 집 전체보다 문을 닫은 특정 공간에서 조건을 잡기 쉽습니다. 드레스룸, 방, 거실 중 어디에서 쓸지와 이동 횟수를 먼저 정합니다.', ['주 사용 공간의 면적 적기', '문과 창문을 닫을 수 있는지 확인', '여러 방을 옮기면 손잡이와 바퀴 확인']],
      ['연속배수는 호스 경사와 배수구가 필요합니다', '연속배수 포트가 있어도 물이 자연스럽게 흐를 낮은 배수구가 없으면 사용할 수 없습니다. 호스가 꺾이거나 위로 올라가면 배수가 원활하지 않을 수 있습니다.', ['배수 포트 위치 확인', '호스 포함 여부와 내경 확인', '배수구까지 계속 내리막이 되는지 측정']],
      ['토출구와 벽 사이 공간을 확보합니다', '제습기는 공기를 빨아들여 데워진 공기를 내보내므로 흡입구와 토출구를 막지 않아야 합니다. 빨래 바로 밑에 너무 가깝게 두는 것도 피합니다.', ['흡입구·토출구 방향 확인', '설명서 권장 이격 거리 확보', '커튼과 빨래가 본체를 덮지 않게 배치']],
      ['소음과 예약 기능은 사용하는 시간대로 봅니다', '침실에서 밤새 쓸지, 낮에 빨래 건조 보조로 쓸지에 따라 허용 가능한 소음과 표시등이 달라집니다. 취침모드도 제습량과 풍량이 달라질 수 있습니다.', ['취침 중 사용할지 결정', '예약 종료와 만수 알림 확인', '표시등 끄기와 버튼 잠금 필요 여부 점검']],
    ],
  },
  {
    slug: 'guide-refrigerator-door-path-ventilation-space', category: 'home-appliances', topicCluster: 'installation',
    title: '냉장고 설치 전 사이즈 재는 법: 문폭·통로·방열 공간',
    description: '냉장고 본체 치수만 재지 않고 현관과 복도, 엘리베이터, 문 열림 반경, 벽과의 방열 공간까지 확인하는 설치 전 실측 순서입니다.',
    targetQuery: '냉장고 설치 전 사이즈 재는 법',
    opening: '냉장고가 주방 자리에 들어가는 것과 집 안으로 반입되는 것은 별개의 문제입니다. 현관문과 복도 회전 구간, 엘리베이터, 주방 입구 중 가장 좁은 곳을 통과해야 합니다. 설치 뒤에는 문과 서랍을 끝까지 열 수 있어야 하고 열을 빼는 간격도 남겨야 합니다.',
    sourceRefs: ['item-samsung-refrigerator-8701026607-check'], extraSources: ['samsungFridge', 'samsungSupport', 'lgFridge'],
    imageRefs: [{ slug: 'item-tcl-287l-fridge', take: 4 }],
    criteria: [
      ['설치 자리보다 반입 동선을 먼저 잽니다', '현관문 폭만 통과해도 복도 모서리에서 회전하지 못할 수 있습니다. 손잡이와 포장재를 포함한 반입 치수는 설치 기사에게 모델명과 함께 확인합니다.', ['엘리베이터 문과 내부 대각선 측정', '현관·복도·주방 입구의 최소 폭 기록', '회전 구간과 계단 난간 사진 남기기']],
      ['본체 치수와 설치 여유를 따로 적습니다', '제품 사양의 폭·높이·깊이는 본체 숫자이고 벽과 가구 사이 권장 간격은 매뉴얼에 따로 나올 수 있습니다. 뒤쪽 플러그와 호스 공간도 포함합니다.', ['본체 W·H·D를 정확한 모델로 확인', '좌우·상단·후면 권장 간격 확인', '콘센트 돌출과 걸레받이 깊이 반영']],
      ['문과 서랍이 끝까지 열리는지 확인합니다', '벽 옆에 냉장고를 붙이면 문은 열려도 내부 서랍이 빠지지 않을 수 있습니다. 손잡이와 힌지, 벽 모서리까지 포함해 개방 반경을 봅니다.', ['문 최대 개방 폭 확인', '벽 쪽 힌지와 손잡이 간섭 점검', '김치통·선반을 꺼낼 앞쪽 공간 확보']],
      ['급수형 기능은 수도와 필터 동선을 봅니다', '정수·제빙 기능이 있는 모델은 급수 연결 방식과 필터 교체 위치를 확인해야 합니다. 모든 옵션이 물통만으로 동작한다고 가정하지 않습니다.', ['급수관 연결 필요 여부 확인', '필터 위치와 교체 방향 확인', '누수 점검과 차단 밸브 접근성 확보']],
      ['용량 숫자는 수납 방식과 함께 봅니다', '총용량이 같아도 냉동실 위치, 선반 간격과 도어 포켓 모양이 다르면 실제 수납이 달라집니다. 자주 넣는 냄비와 생수병 크기를 기준으로 봅니다.', ['가장 큰 냄비와 병 높이 측정', '냉동식품 비중과 서랍 형태 비교', '선반 높이 조절과 분리 방법 확인']],
    ],
  },
  {
    slug: 'guide-washing-machine-capacity-door-drain', category: 'home-appliances', topicCluster: 'installation',
    title: '세탁기 용량 고르는 법: kg·문폭·급수·배수 확인',
    description: '세탁기 kg 표기만 키우기 전에 세탁물 종류, 설치장 문폭, 문 열림과 급배수·콘센트 위치를 확인하는 실측 가이드입니다.',
    targetQuery: '세탁기 용량 고르는 법',
    opening: '세탁기 용량의 kg은 외형 크기와 정확히 비례하지 않고, 같은 용량도 문과 조작부 구조가 다릅니다. 이불을 자주 빠는지와 세탁 횟수를 먼저 정한 뒤 설치장과 반입 통로를 재야 합니다. 건조기와 직렬 설치할 계획이라면 키트 호환도 별도 확인해야 합니다.',
    sourceRefs: ['item-samsung-ai-9050676118-check'], extraSources: ['samsungWasher', 'samsungSupport', 'lgWasher', 'lgSupport'],
    imageRefs: [{ slug: 'item-lg-tromm-13kg', take: 4 }],
    criteria: [
      ['kg는 가족 수보다 세탁물 종류로 봅니다', '매일 소량 의류만 빠는 집과 큰 이불을 자주 빠는 집은 같은 가족 수라도 필요한 통 크기가 다릅니다. 제조사의 코스별 허용 세탁량도 확인합니다.', ['일주일 세탁 횟수와 최대 빨래량 기록', '이불 세탁 가능 조건 확인', '소량 급속 코스의 허용량 확인']],
      ['설치장 폭·깊이·높이를 세 곳에서 잽니다', '벽이 기울거나 걸레받이가 튀어나오면 한 지점 치수만으로 부족합니다. 앞·중간·뒤를 재고 호스와 플러그가 들어갈 뒤쪽 공간을 남깁니다.', ['설치장 앞·중간·뒤 폭 측정', '수도꼭지와 선반 높이 확인', '뒤쪽 호스가 꺾이지 않을 깊이 확보']],
      ['문을 열고 빨래를 넣을 앞 공간을 봅니다', '드럼 문이 가구나 방문에 걸리지 않는지, 통돌이 뚜껑이 상부 선반에 닿지 않는지 확인합니다. 세제함을 끝까지 빼는 공간도 필요합니다.', ['문 최대 개방 반경 측정', '세제함 인출 방향 확인', '빨래바구니를 놓을 동선 확보']],
      ['급수·배수·전원 위치를 사진으로 남깁니다', '온수와 냉수 연결 수, 배수구 높이와 콘센트 접지 조건을 모델 설명서와 대조합니다. 멀티탭 사용을 전제로 설치하지 않는 편이 안전합니다.', ['수도꼭지 수와 나사 규격 확인', '배수구 위치와 호스 고정 방법 확인', '전용 콘센트와 접지 상태 점검']],
      ['건조기 결합은 전용 키트와 모델 호환을 봅니다', '같은 브랜드라도 모든 세탁기와 건조기가 직렬 결합되는 것은 아닙니다. 설치 키트 품번, 조작부 높이와 전체 높이를 공식 설치 안내에서 확인합니다.', ['세탁기·건조기 정확한 모델명 기록', '공식 직렬 키트 호환표 확인', '설치 후 조작부와 필터 접근성 점검']],
    ],
  },
  {
    slug: 'guide-power-bank-flight-wh-port-output', category: 'digital-pc', topicCluster: 'mobile-power',
    title: '보조배터리 고르는 법: Wh 계산·기내 반입·포트 출력',
    description: 'mAh만 비교하지 않고 정격 Wh, 2026년 기내 반입·보관 규정, USB-C 포트별 출력 분배와 케이블 조건을 확인합니다.',
    targetQuery: '보조배터리 기내 반입 Wh 계산',
    opening: '보조배터리는 용량이 크면 충전 횟수는 늘지만 무게와 기내 반입 조건, 충전 시간도 함께 달라집니다. 특히 2026년에는 국내 항공기 안에서 보조배터리 사용·충전과 수량 제한을 최신 안내로 다시 확인해야 합니다. 여행 날짜와 항공사에 따라 추가 절차가 있을 수 있으므로 출발 직전 확인이 필수입니다.',
    sourceRefs: ['item-anker-a1695-25000mah-165w-flight-check', 'item-anker-anker-prime-27650-8351903779-check'], extraSources: ['flight2026'],
    imageRefs: [{ slug: 'item-xiaomi-67w-powerbank-20000mah', take: 4 }],
    criteria: [
      ['mAh를 Wh로 바꿔 항공 기준과 대조합니다', 'Wh는 전압과 용량을 함께 반영하는 단위입니다. 제품 라벨에 Wh가 적혀 있으면 그 값을 우선 보고, 없으면 제조사 사양을 확인합니다. 임의 계산만으로 승인 여부를 단정하지 않습니다.', ['본체 라벨의 Wh 표기 촬영', '항공사 허용 용량과 수량 확인', '용량 표기가 훼손된 제품은 사용 전 문의']],
      ['기내에서는 단락 방지와 보관 위치를 지킵니다', '보조배터리는 위탁수하물에 넣지 않고 단자가 금속과 닿지 않게 보호해야 합니다. 좌석 틈이나 선반에서 상태를 확인하기 어려운 곳보다 몸 가까운 보관 방법을 따릅니다.', ['단자 캡 또는 개별 파우치 준비', '위탁 가방에서 보조배터리 분리', '항공사 안내의 보관 위치 재확인']],
      ['총출력과 포트별 출력을 구분합니다', '165W 같은 숫자는 여러 포트 합계일 수 있습니다. 노트북 하나를 충전할 때 특정 USB-C 포트가 필요한 전력을 단독으로 제공하는지 표를 봅니다.', ['각 포트 단독 최대 출력 확인', '동시 충전 시 출력 분배표 확인', '노트북이 요구하는 PD 전압 프로필 확인']],
      ['케이블 정격과 일체형 케이블 교체성을 봅니다', '고출력을 지원하는 본체도 케이블이 해당 전력을 지원하지 않으면 속도가 제한될 수 있습니다. 일체형 케이블은 편하지만 손상 시 교체 가능 여부를 확인합니다.', ['구성 케이블의 전력 등급 확인', 'USB-C eMarker 필요 조건 확인', '일체형 케이블 보증과 수리 조건 확인']],
      ['입력 충전 속도와 발열 조건을 확인합니다', '보조배터리 자체를 충전하는 입력 전력은 출력과 다릅니다. 고속 입력에는 별도 충전기가 필요할 수 있고, 밀폐된 가방 안에서 충전하지 않는 편이 좋습니다.', ['최대 입력과 필요한 충전기 확인', '완충 예상 시간의 시험 조건 확인', '부풀음·냄새·과열이 있으면 즉시 사용 중단']],
    ],
  },
  {
    slug: 'guide-external-storage-usb-speed-backup', category: 'digital-pc', topicCluster: 'memory-storage',
    title: '외장 SSD·HDD 고르는 법: USB 속도·용량·백업 계획',
    description: '제품에 적힌 최대 속도보다 PC 포트와 케이블 규격, 실제 사용 가능한 용량, 휴대성과 이중 백업 방법을 먼저 확인합니다.',
    targetQuery: '외장 SSD HDD 고르는 법',
    opening: '외장 SSD와 HDD는 둘 다 파일을 담지만 속도, 충격에 대한 특성, 가격과 복구 방식이 다릅니다. 최대 전송속도는 드라이브만의 숫자가 아니라 PC 포트와 케이블, 파일 크기와 발열 조건이 함께 만든 결과입니다. 중요한 파일은 어느 한 드라이브만으로 백업이 끝났다고 생각하지 않는 편이 좋습니다.',
    sourceRefs: ['item-samsung-t9-8501988779-check', 'item-western-digital-wd-my-passport-7553606294-check', 'item-sandisk-storage-5125756453-check'],
    imageRefs: [{ slug: 'item-wd-mypassport', take: 4 }],
    criteria: [
      ['SSD와 HDD는 작업 방식으로 나눕니다', '대용량 보관과 이동이 적은 백업은 HDD 가격이 유리할 수 있고, 자주 들고 다니며 큰 파일을 편집하면 SSD의 속도와 충격 내성이 편할 수 있습니다. 둘 중 하나가 모든 상황에 우월한 것은 아닙니다.', ['보관용인지 작업용인지 구분', '하루 이동 횟수와 낙하 위험 고려', '필요 용량당 가격 비교']],
      ['USB 이름보다 포트의 실제 속도를 확인합니다', 'USB-C는 커넥터 모양이고 속도 등급은 별도입니다. PC와 드라이브 양쪽이 같은 고속 규격을 지원하고 알맞은 케이블을 써야 최대치에 접근할 수 있습니다.', ['PC 포트 옆 기호와 매뉴얼 확인', '드라이브 인터페이스 규격 확인', '동봉 케이블의 지원 속도 확인']],
      ['표기 용량과 사용 가능 용량 차이를 예상합니다', '제조사와 운영체제가 용량을 표시하는 방식이 달라 초기화 뒤 보이는 숫자가 작을 수 있습니다. 파일 시스템과 복구 영역도 영향을 줍니다.', ['운영체제별 파일 시스템 호환 확인', '대용량 단일 파일 제한 확인', '암호화 소프트웨어 사용 여부 결정']],
      ['백업은 원본과 분리된 복사본을 만듭니다', '외장 드라이브를 PC에 계속 연결해 두면 랜섬웨어나 전원 문제에서 함께 영향을 받을 수 있습니다. 중요한 자료는 다른 매체나 안전한 클라우드에 한 번 더 둡니다.', ['원본·로컬 백업·외부 백업 위치 정하기', '자동 백업 주기 설정', '복원 시험을 작은 파일로 실행']],
      ['휴대 케이스와 보증·복구 조건을 봅니다', '방수나 내충격 표기가 있어도 모든 사고를 보증한다는 뜻은 아닙니다. 케이블 단자와 HDD 작동 중 충격을 줄이고 제조사 보증에서 데이터 복구 범위를 확인합니다.', ['전용 케이스와 케이블 수납 준비', 'HDD 작동 중 이동하지 않기', '보증과 데이터 복구 서비스 구분']],
    ],
  },
  {
    slug: 'guide-wireless-earbuds-fit-codec-multipoint', category: 'digital-pc', topicCluster: 'audio-connectivity',
    title: '무선 이어폰 고르는 법: 착용·코덱·멀티포인트·배터리',
    description: '노이즈 캔슬링 등급만 보지 않고 오픈형·커널형 착용, 휴대폰별 코덱, 두 기기 전환과 이어버드·케이스 배터리 조건을 확인합니다.',
    targetQuery: '무선 이어폰 고르는 법',
    opening: '무선 이어폰은 음질 평가보다 먼저 귀에 안정적으로 맞고 내가 쓰는 휴대폰에서 필요한 기능이 켜지는지 확인해야 합니다. 같은 제품도 운영체제와 앱, 펌웨어에 따라 지원 기능이 달라질 수 있습니다. 배터리 시간은 노이즈 캔슬링과 음량, 통화 사용에 따라 변합니다.',
    sourceRefs: ['item-sony-wh-1000xm6-black-charge-connect-check', 'item-soundcore-liberty-4-pro-a3954-black-device-check'], extraSources: ['airpodsSpec', 'airpodsDocs', 'airpodsClean'],
    imageRefs: [{ slug: 'item-apple-airpods-4-anc', take: 4 }],
    criteria: [
      ['오픈형과 커널형은 귀 모양과 차음으로 고릅니다', '오픈형은 귀를 완전히 막지 않는 대신 저음과 소음 차단에서 체감이 다를 수 있고, 커널형은 이어팁 크기가 맞아야 밀폐와 착용 안정성이 나옵니다.', ['장시간 착용 시 압박 부위 확인', '이어팁 크기와 별도 구매 가능 여부 확인', '운동 중 빠짐과 땀 노출 조건 점검']],
      ['코덱은 이어폰과 재생 기기 양쪽을 봅니다', '고급 코덱 이름이 적혀 있어도 휴대폰이 지원하지 않으면 다른 방식으로 연결됩니다. 앱에서 우선순위를 바꿔야 하거나 두 기기 연결과 동시에 쓰지 못할 수도 있습니다.', ['휴대폰의 Bluetooth 코덱 지원 확인', '이어폰 앱의 음질 설정 확인', '고음질 모드와 멀티포인트 동시 제한 확인']],
      ['멀티포인트와 자동 전환을 구분합니다', '두 기기에 동시에 연결된 상태와 같은 계정 기기 사이 자동 전환은 다른 기능입니다. 회사 PC와 개인 휴대폰 조합처럼 실제 장면으로 지원 조건을 봅니다.', ['동시에 연결할 기기 두 개 적기', 'Windows·macOS·Android·iOS 지원 확인', '통화 중 다른 기기 알림 처리 방식 확인']],
      ['이어버드와 케이스 배터리를 따로 봅니다', '총 30시간 문구는 케이스 충전을 여러 번 합친 값일 수 있습니다. 한 번 착용 시간과 케이스 충전 단자, 무선충전 여부를 구분합니다.', ['이어버드 단독 재생시간 확인', 'ANC 사용 시 조건 확인', '케이스 충전 케이블 포함 여부 확인']],
      ['방수와 청소는 영구 성능으로 보지 않습니다', 'IP 등급은 정해진 시험 조건이고 마모나 충격으로 성능이 달라질 수 있습니다. 젖은 상태로 충전하지 말고 제조사 청소법을 따릅니다.', ['정확한 IP 등급과 제외 조건 확인', '운동 뒤 완전히 건조', '망과 충전 접점을 날카로운 도구로 긁지 않기']],
    ],
  },
  {
    slug: 'guide-gaming-mouse-grip-weight-receiver', category: 'digital-pc', topicCluster: 'input-devices',
    title: '게이밍 마우스 고르는 법: 그립·무게·수신기·폴링레이트',
    description: 'DPI 숫자보다 손 크기와 그립, 버튼 위치, 무선 수신기 배치, 폴링레이트 사용 조건과 배터리를 확인하는 선택 기준입니다.',
    targetQuery: '게이밍 마우스 고르는 법',
    opening: '게이밍 마우스의 센서 숫자는 비교하기 쉽지만 손에 맞지 않으면 오래 쓰기 어렵습니다. 손바닥과 손가락이 닿는 위치, 엄지 버튼 높이, 클릭 압력은 사양표만으로 모두 알 수 없습니다. 고주사율 폴링레이트도 수신기와 PC 부하, 배터리 시간 조건을 함께 봐야 합니다.',
    sourceRefs: ['item-logitech-g512-carbon-gx-blue-920-008952-usb-passthrough-check', 'item-logitech-g502-x-7692093578-check'], extraSources: ['razerProduct', 'razerSupport'],
    imageRefs: [{ slug: 'item-razer-deathadder-v3-pro', take: 4 }],
    criteria: [
      ['손 크기와 그립 방식부터 적습니다', '팜·클로·핑거 그립은 손바닥과 등 높이가 닿는 위치가 다릅니다. 길이만 보지 말고 폭, 등 높이와 좌우 비대칭을 함께 봅니다.', ['손바닥 길이와 폭 측정', '현재 편한 마우스 치수 기록', '오른손 전용인지 대칭형인지 확인']],
      ['무게는 케이블과 배터리 조건까지 봅니다', '가벼운 마우스가 빠른 이동에 편할 수 있지만 안정감과 버튼 수를 선호하는 사람도 있습니다. 건전지형과 내장 배터리형의 실제 사용 무게를 구분합니다.', ['제조사 표기 무게의 포함 조건 확인', '그립 테이프와 동글 수납 영향 고려', '무게추 조절 필요 여부 판단']],
      ['수신기 위치와 무선 간섭을 관리합니다', '수신기를 PC 뒤에 꽂으면 책상과 본체가 신호를 가릴 수 있습니다. 연장 어댑터가 기본 구성인지와 Bluetooth 전환 지원 여부를 봅니다.', ['전용 수신기 포함 여부 확인', '책상 위 수신기 배치 계획', '2.4GHz 주변 기기와 간섭 가능성 점검']],
      ['폴링레이트는 지원 장치와 배터리를 함께 봅니다', '높은 폴링레이트는 별도 동글이 필요하거나 배터리 시간이 줄고 CPU 사용량이 늘 수 있습니다. 게임과 모니터 주사율에 체감 이득이 있는지 단계적으로 시험합니다.', ['기본·최대 폴링레이트 확인', '별매 수신기 필요 여부 확인', '설정별 배터리 시간 조건 읽기']],
      ['버튼과 소프트웨어는 실제 게임으로 판단합니다', '버튼 수가 많아도 손가락이 자연스럽게 닿지 않으면 쓰기 어렵습니다. 온보드 메모리와 매크로 제한, 운영체제별 설정 앱 지원을 확인합니다.', ['자주 쓰는 기능을 버튼에 배치해 보기', '온보드 프로필 저장 수 확인', '회사 PC 등 앱 설치 제한 환경 고려']],
    ],
  },
  {
    slug: 'guide-monitor-size-input-stand-hdr', category: 'digital-pc', topicCluster: 'display-setup',
    title: '모니터 고르는 법: 화면 크기·입력 단자·스탠드 공간',
    description: '해상도와 주사율만 보지 않고 시청 거리, PC·콘솔 입력 조합, 스탠드 깊이와 조절 범위, HDR 조건을 확인하는 방법입니다.',
    targetQuery: '모니터 고르는 법',
    opening: '모니터는 화면 대각선이 커질수록 책상에서 항상 편한 것은 아닙니다. 해상도와 글자 크기, 시청 거리, 스탠드가 차지하는 깊이가 함께 맞아야 합니다. 주사율도 케이블과 입력 단자, 그래픽카드 출력에서 같은 조건을 지원해야 합니다.',
    sourceRefs: ['item-lg-ultragear-27g414b-port-stand-check', 'item-lg-lg-32gs95ue-9332610530-check', 'item-samsung-m9-8869156815-check'],
    imageRefs: [{ slug: 'item-lg-ultragear-monitor', take: 4 }],
    criteria: [
      ['화면 크기는 시청 거리와 글자 크기로 정합니다', '같은 해상도라도 화면이 커지면 픽셀 밀도와 글자 크기 체감이 달라집니다. 책상 깊이와 눈에서 화면까지 거리를 먼저 잽니다.', ['책상에 앉아 눈과 화면 거리 측정', '운영체제 배율 사용 여부 확인', '문서·게임·영상 비중 적기']],
      ['해상도와 주사율은 PC 출력까지 연결해 봅니다', '모니터가 높은 주사율을 지원해도 그래픽카드와 케이블, 선택한 해상도에서 같은 값이 나와야 합니다. 포트별 최대 조합을 사양표에서 봅니다.', ['그래픽카드 출력 포트 확인', 'HDMI·DisplayPort별 지원 조합 확인', '동봉 케이블 규격 확인']],
      ['입력 단자는 연결할 기기 수로 고릅니다', 'PC 한 대와 콘솔, 노트북을 함께 연결하면 포트 수와 전환 방식이 중요합니다. USB-C 영상 입력은 충전 전력과 데이터 허브 지원이 별도일 수 있습니다.', ['연결할 기기와 포트 목록 작성', 'USB-C DP Alt Mode와 충전 출력 확인', 'KVM·USB 허브 필요 여부 판단']],
      ['스탠드 받침과 조절 범위를 잽니다', '화면 폭보다 스탠드 다리가 키보드와 마우스 공간을 침범할 수 있습니다. 높이·틸트·회전 조절과 VESA 홀을 확인합니다.', ['받침 폭과 깊이 측정', '최저·최고 화면 높이 확인', '모니터암 하중과 VESA 규격 대조']],
      ['HDR 로고보다 밝기와 로컬디밍 조건을 봅니다', 'HDR 신호를 받을 수 있다는 것과 높은 명암을 표현하는 것은 다른 문제입니다. 패널 종류, 최대 밝기와 로컬디밍 방식, 콘텐츠 지원을 함께 봅니다.', ['HDR 인증과 시험 조건 확인', '로컬디밍 유무와 구역 방식 확인', '운영체제와 게임의 HDR 설정 점검']],
    ],
  },
  {
    slug: 'guide-cpu-socket-graphics-memory-cooler', category: 'digital-pc', topicCluster: 'cpu-motherboard',
    title: '데스크톱 CPU 고르는 법: 소켓·내장그래픽·메모리·쿨러',
    description: '코어 수와 벤치마크보다 메인보드 소켓, BIOS, 내장그래픽 유무, 메모리 세대와 기본 쿨러 포함 여부를 먼저 확인합니다.',
    targetQuery: '데스크톱 CPU 고르는 법',
    opening: 'CPU 이름이 비슷해도 메인보드 소켓과 메모리 세대, 내장그래픽 유무가 다르면 필요한 부품이 크게 달라집니다. 성능표를 보기 전에 지금 가진 보드와 메모리를 계속 쓸지, 그래픽카드를 반드시 장착할지부터 정해야 합니다. 같은 소켓이라도 BIOS 지원표가 최종 기준입니다.',
    sourceRefs: ['guide-ryzen-7500f-motherboard'], imageRefs: [{ slug: 'item-amd-ryzen-5600', take: 4 }],
    criteria: [
      ['소켓 이름보다 CPU 지원표로 확정합니다', 'CPU와 메인보드에 같은 소켓이 적혀 있어도 BIOS 버전과 보드 리비전에 따라 지원 시점이 다를 수 있습니다. 정확한 모델의 CPU 지원표를 확인합니다.', ['CPU 소켓과 메인보드 모델명 기록', '제조사 CPU 지원표에서 모델 검색', '필요 최소 BIOS와 업데이트 방법 확인']],
      ['내장그래픽 유무를 별도로 확인합니다', '메인보드 뒤에 HDMI가 있어도 CPU에 그래픽 기능이 없으면 화면이 나오지 않을 수 있습니다. 제품명 접미사만 추정하지 말고 공식 사양의 그래픽 항목을 봅니다.', ['공식 사양의 Graphics 항목 확인', '외장 그래픽카드와 보조전원 준비', '문제 해결용 화면 출력 계획 세우기']],
      ['메모리 세대와 지원 구성을 봅니다', 'DDR4와 DDR5는 서로 바꿔 끼울 수 없고, CPU와 메인보드가 함께 지원해야 합니다. 모듈 개수와 용량에 따른 속도 조건도 다를 수 있습니다.', ['CPU 공식 메모리 유형 확인', '메인보드 슬롯 세대 확인', 'QVL에서 모듈 모델과 개수 대조']],
      ['기본 쿨러 포함 여부와 소켓 브래킷을 봅니다', '박스에 쿨러가 포함되지 않는 CPU도 있고 기존 쿨러가 새 소켓에 맞지 않을 수 있습니다. TDP 숫자 하나로 온도를 단정하지 않습니다.', ['상자 구성의 쿨러 포함 여부 확인', '쿨러 소켓 브래킷 호환 확인', '케이스 쿨러 높이 제한 측정']],
      ['전력 설정과 사용 목적을 함께 봅니다', '게임, 영상 편집, 렌더링은 코어와 클럭을 사용하는 방식이 다릅니다. 메인보드 전원부와 파워 용량, 냉각을 포함한 전체 구성으로 판단합니다.', ['주요 프로그램의 권장 사양 확인', '장시간 부하인지 짧은 작업인지 구분', '업그레이드 계획과 예산 배분']],
    ],
  },
  {
    slug: 'guide-action-camera-storage-waterproof-battery', category: 'digital-pc', topicCluster: 'camera-storage',
    title: '액션캠 고르는 법: 저장매체·방수·배터리·촬영 방식',
    description: '해상도 숫자보다 microSD 요구 규격, 본체와 하우징의 방수 조건, 배터리 지속시간 시험 조건과 편집 앱을 확인합니다.',
    targetQuery: '액션캠 고르는 법',
    opening: '액션캠은 높은 해상도를 지원해도 저장매체가 느리거나 배터리가 부족하면 원하는 촬영을 이어가기 어렵습니다. 본체 방수와 케이스 사용 방수는 조건이 다르고, 수중에서는 터치와 무선 연결이 제한될 수 있습니다. 촬영 뒤 영상을 옮기고 편집하는 과정까지 제품 선택에 포함해야 합니다.',
    sourceRefs: ['item-dji-osmo-action-5-pro-standard-combo-storage-waterproof-check', 'item-insta360-x5-bundle-storage-stitching-check', 'item-gopro-gopro-hero13-9602303293-check'],
    imageRefs: [{ slug: 'item-dji-osmo-action-5-pro-standard-combo-storage-waterproof-check', take: 1 }, { slug: 'item-dji-osmo-pocket-3-creator-combo-storage-connect-check', take: 1 }, { slug: 'item-insta360-x5-bundle-storage-stitching-check', take: 1 }, { slug: 'item-gopro-gopro-hero13-9602303293-check', take: 1 }],
    criteria: [
      ['microSD 권장 목록과 최대 용량을 봅니다', '고해상도·고프레임 촬영은 지속 쓰기 속도가 중요합니다. 카드 표면의 등급만 보지 말고 제조사가 시험한 모델과 포맷 방법을 확인합니다.', ['공식 권장 카드 목록 확인', '촬영 모드별 예상 파일 크기 계산', '카메라에서 카드 포맷 방법 확인']],
      ['본체 방수와 하우징 조건을 구분합니다', '방수 깊이는 깨끗한 담수의 시험 조건일 수 있고 충격이나 염수, 고온에서는 관리가 달라집니다. 포트 커버와 패킹 상태를 촬영 전 확인합니다.', ['본체 단독 방수 깊이 확인', '다이빙 케이스 필요 조건 확인', '사용 뒤 세척·건조 절차 읽기']],
      ['배터리 시간은 촬영 설정과 온도를 함께 봅니다', '표시된 최대 시간은 해상도와 화면, 무선 기능, 온도 조건이 정해져 있습니다. 겨울과 장시간 촬영에는 여분 배터리와 충전 계획이 필요합니다.', ['자주 쓸 해상도·프레임에서 시간 확인', '교체형 배터리 여부 확인', '충전 허브와 전원 어댑터 포함 여부 확인']],
      ['일반 화각과 360도 촬영의 편집 과정을 봅니다', '360도 카메라는 촬영 뒤 시점을 선택하는 리프레이밍이 필요하고 파일과 편집 시간이 커질 수 있습니다. 바로 공유할지 후편집할지 정합니다.', ['원하는 결과 영상의 화각 결정', '휴대폰·PC 편집 앱 지원 확인', '스티칭 뒤 실제 출력 해상도 확인']],
      ['마운트 규격과 기본 구성을 대조합니다', '헬멧, 자전거, 가슴 마운트는 고정 방식과 안전 줄이 다릅니다. 크리에이터 콤보처럼 이름이 달라도 필요한 부품이 모두 포함된다는 뜻은 아닙니다.', ['촬영 장소별 필요한 마운트 목록 작성', '상자 구성과 별매품 구분', '진동과 분실을 줄일 보조 고정 준비']],
    ],
  },
  {
    slug: 'guide-projector-throw-distance-brightness-input', category: 'digital-pc', topicCluster: 'display-setup',
    title: '빔프로젝터 고르는 법: 투사거리·밝기·입력·소리',
    description: '화면 크기 광고보다 방의 실제 투사거리, 밝기 측정 단위, 키스톤의 한계, 입력 단자와 스피커·소음 조건을 확인합니다.',
    targetQuery: '빔프로젝터 고르는 법',
    opening: '빔프로젝터는 100인치 가능이라는 문구보다 우리 방에서 렌즈와 벽 사이 거리가 얼마나 나오는지가 먼저입니다. 화면을 크게 만들수록 같은 빛이 넓게 퍼져 밝기 체감이 떨어지고, 키스톤 보정은 설치 위치를 자유롭게 만드는 만능 기능이 아닙니다.',
    sourceRefs: ['item-lg-lg-9357893347-check', 'item-samsung-projector-7912148052-check'], extraSources: ['vankyoProduct', 'vankyoSupport'],
    imageRefs: [{ slug: 'item-vankyo-leisure-200', take: 4 }],
    criteria: [
      ['벽과 렌즈 사이 실제 투사거리를 잽니다', '프로젝터 뒤쪽 본체와 케이블 공간을 빼면 렌즈가 놓일 수 있는 거리는 더 짧습니다. 제조사 투사비 또는 거리표로 원하는 화면 크기를 계산합니다.', ['벽에서 설치 선반까지 거리 측정', '렌즈 위치와 본체 깊이 반영', '공식 투사거리표로 화면 크기 확인']],
      ['밝기 숫자는 측정 단위와 환경을 봅니다', '서로 다른 단위나 자체 표기 숫자를 직접 비교하면 안 됩니다. 낮에 커튼을 열고 볼지, 밤에 어둡게 볼지와 스크린 색을 함께 고려합니다.', ['ANSI 또는 제조사 밝기 단위 확인', '사용 시간대의 주변광 기록', '암막과 스크린 설치 가능 여부 점검']],
      ['키스톤과 디지털 줌의 화질 손실을 고려합니다', '비스듬히 투사한 화면을 디지털로 자르면 실제 사용하는 픽셀이 줄고 초점 균일도가 달라질 수 있습니다. 가능한 한 화면 정면에 설치합니다.', ['수평·수직 보정 범위 확인', '광학 줌과 디지털 줌 구분', '렌즈 시프트 지원 여부 확인']],
      ['입력 단자와 스트리밍 방식을 구분합니다', '내장 앱이 있어도 원하는 국내 서비스나 DRM 콘텐츠가 모두 지원되는 것은 아닙니다. 노트북·콘솔·셋톱박스를 연결할 HDMI와 USB 전원 조건을 봅니다.', ['사용할 앱과 인증 여부 확인', 'HDMI 수와 지원 해상도 확인', '스트리밍 동글 전원 공급 방법 확인']],
      ['스피커와 팬 소음은 설치 거리로 봅니다', '내장 스피커는 간편하지만 화면 방향과 소리 방향이 다를 수 있습니다. 머리 가까운 선반에 두면 팬 소음도 더 크게 들립니다.', ['외부 스피커 연결 방식 확인', 'Bluetooth 지연 가능성 고려', '좌석과 프로젝터 사이 거리 확보']],
    ],
  },
  {
    slug: 'guide-home-camera-power-wifi-storage-privacy', category: 'digital-pc', topicCluster: 'network-security',
    title: '홈캠·CCTV 고르는 법: 전원·Wi‑Fi·저장·개인정보',
    description: '화질 숫자보다 설치 위치의 전원과 Wi‑Fi, 녹화 저장 방식, 야간 촬영과 알림 범위, 계정 보안·사생활 설정을 확인합니다.',
    targetQuery: '홈캠 CCTV 고르는 법',
    opening: '홈캠은 카메라 화질만으로 고르면 설치 뒤 전원선과 Wi‑Fi, 저장 구독에서 막힐 수 있습니다. 실내용과 실외용은 방수와 작동 온도, 고정 방식이 다릅니다. 집 안을 촬영하는 기기인 만큼 계정 보안과 공유 권한도 제품 기능만큼 중요합니다.',
    sourceRefs: [], extraSources: ['ezvizProduct', 'ezvizSupport', 'ezvizDownload'], imageRefs: [{ slug: 'item-ezviz-bc1c-cctv', take: 4 }],
    criteria: [
      ['유선 전원과 배터리형의 관리 차이를 봅니다', '배터리형은 선이 줄지만 감지 빈도와 녹화 길이에 따라 충전 주기가 달라집니다. 유선형은 콘센트와 케이블 노출, 실외 방수 연결을 해결해야 합니다.', ['설치 위치까지 전원 거리 측정', '배터리 교체·충전 동선 확인', '실외 어댑터와 연결부 방수 조건 확인']],
      ['Wi‑Fi 신호를 설치 위치에서 확인합니다', '공유기 가까이에서 설정한 뒤 멀리 달면 연결이 불안정할 수 있습니다. 지원 주파수와 메시 네트워크 호환, 오프라인 녹화 여부를 확인합니다.', ['설치 위치의 Wi‑Fi 신호 측정', '2.4GHz·5GHz 지원 확인', '인터넷 끊김 시 저장 방식 확인']],
      ['로컬 저장과 클라우드 구독을 구분합니다', 'microSD, 기지국 저장, 클라우드 구독은 보존 기간과 분실 위험이 다릅니다. 이벤트만 녹화하는지 연속 녹화가 가능한지도 봅니다.', ['지원 카드 용량과 등급 확인', '예상 보존 기간 계산', '클라우드 무료·유료 기능 구분']],
      ['감지 영역과 야간 촬영 조건을 봅니다', '사람 감지와 움직임 감지는 알림 정확도가 다르고 창문 너머 적외선 촬영은 반사될 수 있습니다. 촬영 각도와 이웃 공간을 함께 고려합니다.', ['필요한 감지 대상과 거리 적기', '야간 IR과 조명 조건 확인', '사생활 보호 영역 설정 가능 여부 확인']],
      ['계정 보안과 가족 공유 권한을 설정합니다', '초기 비밀번호를 바꾸고 2단계 인증이 있다면 켭니다. 가족 초대 계정과 관리자 권한을 구분하고 중고 판매 전 기기를 계정에서 제거합니다.', ['고유한 비밀번호 설정', '2단계 인증과 로그인 알림 확인', '공유 사용자와 카메라별 권한 검토']],
    ],
  },
  {
    slug: 'guide-office-chair-seat-armrest-tilt', category: 'living-kitchen', topicCluster: 'office-furniture',
    title: '사무용 의자 고르는 법: 좌판·팔걸이·틸트·책상 높이',
    description: '인체공학 문구보다 좌판 깊이, 발바닥 지지, 팔걸이와 책상 간섭, 등판·틸트 조절 범위를 내 체형과 책상에 맞추는 방법입니다.',
    targetQuery: '사무용 의자 고르는 법',
    opening: '의자는 기능이 많다고 자동으로 몸에 맞지 않습니다. 앉았을 때 발바닥이 바닥에 닿고 무릎 뒤가 좌판에 눌리지 않아야 조절 기능을 활용할 수 있습니다. 팔걸이가 책상 상판에 걸리면 의자를 가까이 넣지 못하므로 책상 높이와 하부 공간도 함께 재야 합니다.',
    sourceRefs: [], extraSources: ['sidizProduct', 'sidizCatalog', 'sidizSupport'], imageRefs: [{ slug: 'item-sidiz-t50-hda', take: 4 }],
    criteria: [
      ['좌판 높이는 발바닥 지지부터 맞춥니다', '최저 높이에서도 발이 뜨면 발받침이 필요하고, 너무 높으면 책상과 팔꿈치가 맞지 않습니다. 신발을 신은 실제 작업 자세로 확인합니다.', ['오금 높이와 의자 최저·최고 높이 비교', '발바닥 전체가 닿는지 확인', '필요하면 단단한 발받침 계획']],
      ['좌판 깊이는 무릎 뒤 여유를 봅니다', '좌판이 너무 깊으면 등받이에 기대기 어렵고 무릎 뒤가 눌릴 수 있습니다. 깊이 조절 범위와 좌판 앞 모서리 형태를 확인합니다.', ['엉덩이에서 무릎 뒤까지 길이 측정', '좌판 깊이 조절 범위 확인', '등받이에 기대도 무릎 뒤 여유 남기기']],
      ['팔걸이와 책상 하부 간섭을 잽니다', '팔걸이를 올렸을 때 상판 밑으로 들어가지 않으면 몸을 책상에서 멀리 두게 됩니다. 높이뿐 아니라 좌우·앞뒤 조절과 폭을 봅니다.', ['바닥에서 책상 하부까지 높이 측정', '팔걸이 최고·최저 높이 비교', '키보드 작업 시 어깨가 올라가지 않는지 확인']],
      ['등판과 요추 지지는 조절 범위를 봅니다', '요추 받침이 있다는 사실보다 내 허리 위치에 닿는지가 중요합니다. 등판 높이와 요추 강도, 헤드레스트 위치를 직접 조절해 봅니다.', ['요추 받침 높이 조절 여부 확인', '등판 장력과 소재 확인', '헤드레스트가 목을 앞으로 밀지 않는지 점검']],
      ['틸트는 고정 단계와 초기 장력을 봅니다', '뒤로 젖혀지는 각도만큼 체중에 맞춘 장력과 잠금 단계가 중요합니다. 레버가 손에 닿는지와 조립 후 사용법을 설명서에서 확인합니다.', ['틸트 장력 조절 방법 확인', '고정 가능한 각도와 해제 방법 확인', '바퀴와 바닥재에 맞는 매트 준비']],
    ],
  },
];

function allContent() {
  const result = new Map();
  for (const directory of ['content/posts', 'content/guides', 'content/scheduled/posts']) {
    const absolute = path.join(root, directory);
    if (!fs.existsSync(absolute)) continue;
    for (const filename of fs.readdirSync(absolute).filter((name) => name.endsWith('.json'))) {
      const item = JSON.parse(fs.readFileSync(path.join(absolute, filename), 'utf8'));
      result.set(item.slug, { ...item, _directory: directory });
    }
  }
  return result;
}

const contentBySlug = allContent();

function officialSources(topic) {
  const sources = [];
  for (const slug of topic.sourceRefs || []) {
    const item = contentBySlug.get(slug);
    if (!item) throw new Error(`Source content not found: ${slug}`);
    for (const source of item.sources || []) {
      if (['authorized-affiliate', 'retailer'].includes(source.sourceType)) continue;
      sources.push(source);
    }
  }
  for (const key of topic.extraSources || []) sources.push(manualSources[key]);
  const unique = [...new Map(sources.filter(Boolean).map((source) => [source.url, source])).values()];
  if (unique.length < 3) throw new Error(`${topic.slug}: fewer than three official sources`);
  return unique.slice(0, 7);
}

function wrapWords(value, maxChars, maxLines = 2) {
  const words = String(value).trim().split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else if (lines.length < maxLines - 1) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const escapeSvg = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
const tspans = (lines, x, lineHeight) => lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeSvg(line)}</tspan>`).join('');

function shortCriterion(value) {
  return String(value)
    .replace(/(?:확인합니다|구분합니다|계산합니다|관리합니다|고려합니다|대조합니다|예상합니다|확보합니다|정합니다|적습니다|봅니다|고릅니다|맞춥니다|잡습니다|잽니다|지킵니다|나눕니다)$/u, '')
    .trim();
}

function criterionSvgFor(topic, criterion, index) {
  const [heading, explanation, checks] = criterion;
  const headingLines = wrapWords(heading, 25, 2);
  const explanationLines = wrapWords(explanation, 42, 3);
  const checkRows = checks.map((check, rowIndex) => {
    const y = 510 + rowIndex * 92;
    const lines = wrapWords(check, 35, 2);
    return `<g transform="translate(130 ${y})"><circle cx="24" cy="24" r="24" fill="#ef8263"/><path d="m13 24 8 8 15-18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><text x="72" y="17" fill="#172c23" font-family="Arial, sans-serif" font-size="25" font-weight="700">${tspans(lines, 72, 31)}</text></g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">
  <title id="title">${escapeSvg(heading)}</title><desc id="desc">공식 자료에서 확인할 질문과 세 가지 점검 항목을 정리한 아이템몬스터 원본 도식</desc>
  <rect width="1600" height="900" rx="54" fill="#f8f5ea"/><rect x="0" y="0" width="1600" height="88" rx="54" fill="#172c23"/><rect x="0" y="54" width="1600" height="34" fill="#172c23"/>
  <text x="92" y="58" fill="#ef8263" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="3">ITEM.MONSTER · OFFICIAL SOURCE CHECK ${String(index + 1).padStart(2, '0')}</text>
  <text x="92" y="178" fill="#172c23" font-family="Arial, sans-serif" font-size="53" font-weight="800">${tspans(headingLines, 92, 62)}</text>
  <rect x="92" y="310" width="1416" height="142" rx="28" fill="#e7efe9"/><text x="130" y="355" fill="#506059" font-family="Arial, sans-serif" font-size="21" font-weight="700">공식 문서에서 먼저 읽을 내용</text><text x="130" y="394" fill="#172c23" font-family="Arial, sans-serif" font-size="24">${tspans(explanationLines, 130, 31)}</text>
  ${checkRows}
  <text x="1080" y="844" fill="#63736c" font-family="Arial, sans-serif" font-size="19">정확한 모델명 · 최신 사양표 · 사용설명서 재확인</text>
</svg>\n`;
}

async function renderOriginalPng(filename, svg) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(imagesDir, filename));
}

async function mediaFor(topic) {
  const media = [];
  for (const [index, criterion] of topic.criteria.slice(0, 4).entries()) {
    const filename = `${topic.slug}--check-${index + 1}.png`;
    await renderOriginalPng(filename, criterionSvgFor(topic, criterion, index));
    media.push({
      path: `/images/guides/${filename}`,
      alt: `${topic.title}에서 ${criterion[0]} 항목과 세 가지 확인 질문을 정리한 원본 도식`,
      caption: `${criterion[0]}: 제조사 사양표와 설명서에서 확인할 질문을 정리했습니다.`,
      creator: '아이템몬스터 운영자',
      usageBasis: 'original',
      display: ['detail-upper', 'detail-middle', 'detail-lower', 'detail-bottom'][index],
      placement: criterion[0],
    });
  }
  return media;
}

function svgFor(topic) {
  const keywords = topic.criteria.slice(0, 4).map((criterion) => shortCriterion(criterion[0]));
  const titleLines = wrapWords(topic.title, 26);
  const titleTspans = tspans(titleLines, 92, 58);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">
  <title id="title">${escapeSvg(topic.title)}</title><desc id="desc">구매 전에 네 단계로 확인하는 아이템몬스터 원본 도식</desc>
  <rect width="1600" height="900" rx="54" fill="#172c23"/><circle cx="1395" cy="110" r="250" fill="#d9bd78" opacity=".16"/>
  <text x="92" y="112" fill="#ef8263" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="4">ITEM.MONSTER CHECKLIST</text>
  <text x="92" y="175" fill="#fffdf5" font-family="Arial, sans-serif" font-size="50" font-weight="800">${titleTspans}</text>
  <text x="92" y="290" fill="#c8d6cf" font-family="Arial, sans-serif" font-size="25">상품명보다 사용 조건을 먼저 비교하는 네 단계</text>
  ${keywords.map((keyword, index) => { const x = 92 + index * 372; const lines = wrapWords(keyword, 11); const keywordTspans = tspans(lines, 32, 31); return `<g transform="translate(${x} 350)"><rect width="320" height="285" rx="28" fill="#f8f5ea"/><circle cx="54" cy="55" r="25" fill="#ef8263"/><text x="54" y="64" text-anchor="middle" fill="#fff" font-family="Arial" font-size="24" font-weight="800">${index + 1}</text><text x="32" y="122" fill="#172c23" font-family="Arial, sans-serif" font-size="22" font-weight="800">${keywordTspans}</text><path d="M34 184h248" stroke="#d9bd78" stroke-width="4"/><text x="32" y="232" fill="#506059" font-family="Arial, sans-serif" font-size="19">제조사 사양·설명서 대조</text></g>`; }).join('')}
  <rect x="92" y="710" width="1410" height="102" rx="25" fill="#0d1d17"/><text x="130" y="772" fill="#d9e9e1" font-family="Arial, sans-serif" font-size="24">도식은 확인 순서용 · 수치와 제한은 정확한 모델의 최신 공식 문서에서 재확인</text>
</svg>\n`;
}

function composeContent(topic) {
  const intro = `${topic.opening}\n\n제조사 제품 페이지와 지원 문서에서 어떤 항목을 찾아야 하는지 구매 전 체크리스트로 정리했습니다. 본문 이미지는 확인 순서와 질문을 설명하기 위해 직접 제작한 원본 도식이며, 제조사나 판매처 사진을 복제하지 않았습니다. 같은 제품군이라도 정확한 모델명과 출시 시점에 따라 사양이 달라질 수 있으므로 결제 직전 공식 문서를 다시 열어보는 것이 기준입니다.`;
  const sections = topic.criteria.map(([heading, explanation, checks], index) => `## ${heading}\n\n${explanation}\n\n확인할 때는 판매 페이지의 요약 문구보다 제조사 사양표와 사용설명서에서 같은 모델명을 찾는 순서가 안전합니다. 표의 숫자가 어떤 모드와 시험 조건에서 나온 값인지, 기본 구성인지 별매품인지도 함께 읽으세요. 함께 배치한 원본 도식은 ${index === 0 ? '제품군의 첫 선택 기준' : index === 1 ? '반복 비용과 부품 조건' : index === 2 ? '연결·관리에서 놓치기 쉬운 조건' : index === 3 ? '설치 공간과 사용 동선' : '사용 후 세척·보관 동선'}을 빠르게 확인하기 위한 질문표이며, 실제 수치와 제한 조건은 설명서가 우선입니다.\n\n${checks.map((check) => `- ${check}`).join('\n')}\n\n후보끼리 비교할 때는 확인한 문서의 날짜와 모델명을 함께 적어두세요. 제품명이 비슷해도 구성품이나 지원 기능이 달라질 수 있고, 판매 옵션을 바꾸면 사양과 구성이 달라질 수 있습니다.`).join('\n\n');
  const compare = `## 비교표에는 이 다섯 칸만 먼저 만드세요\n\n비교 대상이 많을수록 광고 문구를 그대로 옮기지 말고 **정확한 모델명**, **내 사용 조건**, **공식 사양**, **반복 비용**, **확인하지 못한 점** 다섯 칸으로 정리하는 편이 좋습니다. 공식 페이지에서 찾지 못한 내용은 빈칸으로 두고 판매자에게 질문하세요. 답변을 받았다면 주문 화면과 함께 보관해 두면 옵션이 달랐을 때 확인 근거가 됩니다.\n\n가격은 시점마다 바뀌므로 본문에 고정하지 않았습니다. 본체 가격뿐 아니라 필터·배터리·케이블·교체 부품·설치 키트처럼 계속 필요한 항목까지 더해야 실제 비용에 가까워집니다. 제조사 문서가 여러 언어로 제공될 때는 국내 모델명과 전원·인증·보증 조건이 같은지 확인하세요.`;
  const checklist = `## 결제 직전 체크리스트\n\n1. 상품 옵션과 제조사 페이지의 모델명이 글자까지 같은가\n2. 내 공간·기기·사용 방식에서 필요한 조건을 충족하는가\n3. 기본 구성품과 별매품을 구분했는가\n4. 소모품 품번과 공식 판매 여부, 반복 비용을 확인했는가\n5. 설치·세척·충전·보관을 매일 감당할 수 있는가\n6. 보증 주체와 국내 서비스 조건을 확인했는가\n\n하나라도 답이 불분명하면 더 높은 등급을 바로 고르기보다 그 항목을 제조사 지원 페이지나 판매자에게 확인하는 편이 낫습니다.`;
  const ending = `## 한 줄로 정리하면\n\n${topic.title.replace(/:.+$/, '')}은 가장 큰 숫자를 고르는 문제가 아니라, 내 사용 조건과 공식 문서의 제한을 맞추는 문제입니다. 먼저 공간과 연결 환경을 재고, 정확한 모델의 사양표와 설명서를 열고, 사진으로 구성과 동선을 확인하세요. 확인되지 않은 성능은 장점으로 단정하지 않고 반복 비용과 관리 시간까지 적어두면 후보를 훨씬 현실적으로 줄일 수 있습니다.`;
  return `${intro}\n\n${sections}\n\n${compare}\n\n${checklist}\n\n${ending}`;
}

async function main() {
  fs.rmSync(queueRoot, { recursive: true, force: true });
  fs.mkdirSync(guidesDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });
  const items = [];
  for (const [index, topic] of topics.entries()) {
    const order = index + 1;
    const heroName = `${topic.slug}--hero.png`;
    const heroPath = `/images/guides/${heroName}`;
    await renderOriginalPng(heroName, svgFor(topic));
    const productMedia = await mediaFor(topic);
    const guide = {
      kind: 'guide', queueOrder: order, slug: topic.slug, category: topic.category, topicCluster: topic.topicCluster,
      title: topic.title, description: topic.description, heroImage: heroPath,
      heroImageAlt: `${topic.title}의 핵심 확인 순서를 네 단계로 정리한 아이템몬스터 원본 도식`,
      indexable: true,
      searchIntent: `${topic.targetQuery}을 검색해 제품군의 차이와 설치·관리 조건을 먼저 이해하려는 정보 탐색 검색`,
      targetQuery: topic.targetQuery,
      editorial: {
        status: 'reviewed',
        basis: `제조사 공식 제품 정보·사양·지원 문서와 공공기관 자료를 대조해 선택 기준을 정리했습니다. 모든 설명 이미지는 아이템몬스터가 직접 제작한 원본 도식이며, 성능·내구성은 공개 자료 범위를 넘겨 단정하지 않았습니다.`,
        lastChecked: checkedAt,
        caution: '정확한 모델명, 판매 옵션, 펌웨어와 공식 지원 내용은 바뀔 수 있습니다. 결제 직전 제조사 문서와 판매 옵션을 다시 확인하세요.',
      },
      content: composeContent(topic),
      related: topics
        .filter((candidate) => candidate.slug !== topic.slug)
        .sort((a, b) => Number(b.topicCluster === topic.topicCluster) - Number(a.topicCluster === topic.topicCluster))
        .slice(0, 4)
        .map((candidate) => candidate.slug),
      sources: officialSources(topic),
      media: [{ path: heroPath, alt: `${topic.title} 핵심 확인 순서 도식`, caption: '결제 전에 확인할 네 단계', creator: '아이템몬스터 운영자', usageBasis: 'original' }, ...productMedia],
    };
    const filename = `${String(order).padStart(3, '0')}-${topic.slug}.json`;
    fs.writeFileSync(path.join(guidesDir, filename), `${JSON.stringify(guide, null, 2)}\n`, 'utf8');
    items.push({ order, slug: guide.slug, title: guide.title, category: guide.category });
  }
  const queue = { createdAt: new Date().toISOString(), total: topics.length, cadence: 'one every five hours', timezone: 'Asia/Seoul', items };
  fs.writeFileSync(path.join(queueRoot, 'queue.json'), `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  console.log(`Generated ${topics.length} scheduled guides.`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
