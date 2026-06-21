const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const xlsx = require('C:/Users/my/.gemini/antigravity/scratch/excel_reader/node_modules/xlsx');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

const products = [
  {
    id: 'item-calobye-wpi',
    category: '건강식품',
    title: '유당불내증 걱정 없는 단백질 보충제! 칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 초코맛 완벽 분석',
    sourceDir: 'D:\\정식홈페이지자동화\\칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 파우더 초코맛, 1kg, 1개',
    backupDir: 'D:\\정식서버업로드전용폴더\\칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 파우더 초코맛, 1kg, 1개',
    link: 'https://link.coupang.com/a/eKAP6rBwke',
    iframe: '<iframe src="https://coupa.ng/cnxNCY" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
    intro: '운동을 사랑하는 헬스인들과 건강한 다이어트를 목표로 하는 분들에게 단백질 보충제는 선택이 아닌 필수입니다. 하지만 시중의 수많은 프로틴 제품 중 나에게 딱 맞는 제품을 고르기란 쉽지 않습니다. 특히 우유만 먹으면 배가 살살 아프고 가스가 차는 유당불내증을 겪고 계신다면 보충제 선택에 더욱 신중해질 수밖에 없는데요. 이런 분들을 위해 완벽한 해결책이자 맛과 성분, 가성비까지 모두 잡은 궁극의 단백질 보충제, **칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 초코맛**을 강력하게 추천합니다!\n\n단백질 보충제 시장에서 압도적인 인지도와 신뢰를 자랑하는 칼로바이에서 야심 차게 선보인 이 제품은, 평소 유당불내증 때문에 프로틴 섭취를 망설였던 분들의 불편함을 완벽하게 해소해 주는 프리미엄 WPI(분리유청단백질) 제품입니다. 미세한 필터링 과정을 통해 유당과 지방을 극도로 분리해 내어 속 편안한 소화를 돕는 것은 물론, 체내 흡수율을 극대화하여 운동 후 손상된 근육에 빠르고 효과적으로 단백질을 공급합니다. 지금부터 이 놀라운 제품의 상세한 스펙과 진짜 매력을 하나하나 심층적으로 파헤쳐 보겠습니다.',
    sections: [
      { img: '1.png', text: '이 제품의 가장 큰 핵심은 단연 압도적인 단백질 함량과 순도 높은 프리미엄 WPI(분리유청단백질) 원료의 사용입니다. 1회 섭취량(약 2스쿱) 기준 무려 31g이라는 고함량 단백질을 꽉 채워 제공하며, 이는 닭가슴살 한 덩어리를 훌쩍 뛰어넘는 수치입니다. 바쁜 일상 속에서 식단으로 채우기 힘든 하루 단백질 권장량을 이 한 잔으로 아주 간편하고 확실하게 충족시킬 수 있습니다.' },
      { img: '2.png', text: '특히 주목해야 할 점은 단백질의 종류입니다. 값싼 대두단백이나 혼합 단백질이 아닌, 불순물을 완벽하게 걸러낸 순도 90% 이상의 프리미엄 WPI 원료만을 고집했습니다. 우유를 소화하지 못해 배탈이 나거나 피부 트러블을 겪었던 유당불내증 체질의 사용자들도 아무런 부작용 없이 속 편안하게 매일 섭취할 수 있다는 것이 가장 큰 장점입니다. 또한, 체내 흡수 속도가 매우 빨라 근력 운동 직후 즉각적인 아미노산 공급이 필요한 순간에 최적의 퍼포먼스를 발휘합니다.' },
      { img: '3.png', text: '보충제를 꾸준히 섭취하기 위해 성분만큼이나 중요한 것이 바로 맛입니다. 아무리 몸에 좋아도 역하거나 비린 맛이 나면 손이 가지 않기 마련인데요, 이 제품은 누구나 호불호 없이 사랑할 수밖에 없는 진하고 달콤한 프리미엄 초코맛을 완벽하게 구현해 냈습니다. 싸구려 초코 향이 아닌, 진짜 진한 코코아 파우더를 물에 타 먹는 듯한 깊고 풍부한 풍미를 자랑하며 맹물에 타 먹어도 우유에 탄 것처럼 부드럽고 진한 맛을 느낄 수 있습니다.' },
      { img: '4.png', text: '풀림성 또한 예술입니다. 전용 쉐이커 볼이 없어도 차가운 물이나 아몬드 브릿지에 넣고 몇 번만 가볍게 흔들어주면 바닥에 가라앉거나 덩어리지는 현상 없이 깔끔하게 사르르 녹아내립니다. 운동 후 지친 상태에서 뭉친 가루를 억지로 삼키며 불쾌감을 느낄 일이 전혀 없습니다. 목 넘김이 매우 부드럽고 잔여물이 남지 않아 마지막 한 방울까지 깔끔하고 맛있게 비워낼 수 있습니다.' },
      { img: '5.png', text: '여기에 근육 합성에 필수적인 18종의 프리미엄 아미노산과 BCAA가 황금 비율로 배합되어 있어 별도의 BCAA나 아미노산 보충제를 추가로 구매할 필요가 없습니다. 또한, 까다롭기로 소문난 식품의약품안전처의 HACCP 인증을 받은 깨끗하고 위생적인 전문 제조 시설에서 철저한 품질 관리를 거쳐 생산되므로 남녀노소 누구나 안심하고 매일 섭취할 수 있는 안전한 먹거리입니다.' }
    ],
    outro: '근육 성장을 위한 필수 아미노산 공급, 속 편안한 소화력, 그리고 매일 먹고 싶어지는 진한 초코맛까지 완벽하게 삼박자를 갖춘 **칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 초코맛**! 더 이상 값비싼 수입 보충제나 맛없는 단백질에 돈 낭비하지 마세요. 헬스 초보자부터 전문 보디빌더까지 누구나 100% 만족할 수 있는 궁극의 프로틴을 찾고 계신다면 지금 바로 선택하시길 강력히 추천드립니다. 이 놀라운 한 스쿱이 여러분의 운동 효과를 눈부시게 끌어올려 줄 것입니다.',
    summary: '유당불내증 걱정 없는 단백질 보충제! 칼로바이 퍼펙트 파워쉐이크 아이솔레이트 WPI 프로틴 초코맛 완벽 분석'
  },
  {
    id: 'item-hetbahn-brownrice',
    category: '식품',
    title: '건강한 다이어트 식단 필수템! 맛있는 햇반 발아현미밥 130g 소식좌 추천 리뷰',
    sourceDir: 'D:\\정식홈페이지자동화\\햇반 발아현미밥, 130g, 24개',
    backupDir: 'D:\\정식서버업로드전용폴더\\햇반 발아현미밥, 130g, 24개',
    link: 'https://link.coupang.com/a/eKBh62ci4a',
    iframe: '<iframe src="https://coupa.ng/cnxNMm" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png'],
    intro: '바쁜 현대인들에게 가장 부족한 것은 시간, 그리고 건강한 식습관입니다. 특히 다이어트를 결심하거나 혈당 관리를 시작하면서 흰쌀밥 대신 현미밥을 찾으시는 분들이 정말 많아졌습니다. 하지만 매번 현미를 장시간 불리고 압력밥솥에 밥을 짓는 과정은 너무나 번거롭고, 까슬까슬한 식감 때문에 작심삼일로 포기하게 되는 경우가 다반사입니다. 이런 분들을 위해 건강과 맛, 그리고 궁극의 편리함까지 모두 잡은 혁명적인 제품, **햇반 발아현미밥 130g (소식좌용)**을 강력하게 추천해 드립니다!\n\n대한민국 즉석밥의 대명사 CJ 햇반의 독보적인 기술력이 고스란히 담긴 이 제품은, 단순히 데워 먹는 밥을 넘어 완벽한 건강 관리 비서 역할을 톡톡히 해냅니다. 특히 130g이라는 아담하고 콤팩트한 용량은 밥 양을 줄이고자 하는 다이어터나 원래 양이 적은 일명 소식좌 분들에게 한 끼 식사로 딱 맞는 최적의 밸런스를 제공합니다. 매번 밥을 남겨서 버려야 했던 죄책감과 낭비를 완전히 없애주는 놀라운 햇반 발아현미밥의 매력을 지금부터 상세히 알아보겠습니다.',
    sections: [
      { img: '1.png', text: '이 제품의 핵심은 까끌거리고 소화가 잘 안 되는 일반 현미의 단점을 완벽하게 보완한 \'발아현미\'를 사용했다는 점입니다. 현미가 싹을 틔우는 발아 과정에서 식감이 획기적으로 부드러워지며, 동시에 몸에 좋은 영양 성분은 더욱 폭발적으로 증가합니다. 찰진 백미에 톡톡 터지는 고소한 발아현미가 황금 비율로 섞여 있어, 씹을수록 깊은 단맛과 구수함이 우러나오며 밥맛의 차원을 한 단계 높여줍니다.' },
      { img: '2.png', text: '다이어트를 하시는 분들이 가장 열광하는 포인트는 바로 130g이라는 절묘한 \'소용량\'입니다. 기존 210g짜리 일반 햇반 하나를 다 먹기엔 탄수화물이 부담스럽고, 남겨두자니 처치 곤란이었던 경험 다들 있으실 겁니다. 130g은 가볍게 한 끼를 뚝딱 해결하기에 가장 이상적인 양으로, 무리하게 식욕을 참지 않으면서도 자연스럽게 탄수화물 섭취량을 조절할 수 있도록 돕는 완벽한 다이어트 파트너입니다.' },
      { img: '3.png', text: '전자레인지에 단 1분 30초! 바쁜 아침 출근 준비를 하거나 늦은 저녁 녹초가 되어 퇴근했을 때, 이보다 더 간편하고 훌륭한 식사는 없습니다. CJ만의 최첨단 무균화 포장 시스템으로 갓 지은 밥의 윤기와 찰기, 구수한 풍미를 방부제 없이도 장기간 신선하게 유지합니다. 밥 짓는 시간에 쓸 에너지를 아껴 나의 휴식과 건강 관리에 온전히 투자할 수 있습니다.' },
      { img: '4.png', text: '다이어트 식단뿐만 아니라, 닭가슴살, 샐러드, 김 등 어떤 반찬과 곁들여도 찰떡같이 어울리는 환상적인 조화를 자랑합니다. 혈당 수치 상승을 완만하게 해주는 식이섬유가 풍부하여 식후 춘곤증을 방지하고 오랜 시간 든든한 포만감을 유지해 주어 군것질이나 폭식을 막아주는 데에도 탁월한 효과를 발휘합니다.' },
      { img: '5.png', text: '자취생의 필수 비상식량, 아이들을 위한 건강한 한 끼, 다이어터의 철저한 식단 관리 용도까지! 24개 대용량 세트로 한 번 구비해 두면 언제든 마음 든든하게 꺼내 먹을 수 있는 최고의 가성비 아이템입니다. 맛과 건강, 편리함을 이 가격에 모두 누릴 수 있다는 것은 소비자에게 주어지는 엄청난 혜택입니다.' }
    ],
    outro: '탄수화물을 끊어내는 고통스러운 다이어트 대신, 똑똑하고 건강하게 줄이는 방법을 선택하세요! **햇반 발아현미밥 130g**은 까끌한 식감 때문에 현미밥을 기피하던 분들의 편견을 산산조각 내줄 부드럽고 고소한 인생 즉석밥입니다. 밥맛은 살리고 칼로리 부담은 확 줄인 완벽한 한 끼로, 오늘부터 내 몸을 위한 가볍고 건강한 식습관을 시작해 보시길 강력히 추천드립니다.',
    summary: '건강한 다이어트 식단 필수템! 맛있는 햇반 발아현미밥 130g 소식좌 추천 리뷰'
  },
  {
    id: 'item-bonappetit-catsand',
    category: '반려동물',
    title: '먼지 없는 고양이 모래 종결자! 본아페티 응고형 더스트 프리 벤토나이트 모래 강력 추천',
    sourceDir: 'D:\\정식홈페이지자동화\\본아페티 응고형 더스트 프리 벤토나이트 고양이모래',
    backupDir: 'D:\\정식서버업로드전용폴더\\본아페티 응고형 더스트 프리 벤토나이트 고양이모래',
    link: 'https://link.coupang.com/a/eKBUDqucUu',
    iframe: '<iframe src="https://coupa.ng/cnxOrJ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'],
    intro: '고양이를 반려하는 집사님들에게 고양이 화장실 관리는 끝이 없는 숙제이자 가장 큰 고민거리 중 하나입니다. 화장실을 치울 때마다 훅 하고 올라오는 매캐한 먼지, 온 집안 바닥에 굴러다니는 사막화 현상, 그리고 치워도 치워도 사라지지 않는 암모니아 악취까지! 이 모든 스트레스를 단 한 번에 해결해 줄 수 있는 완벽한 구세주 같은 제품을 찾고 계셨나요? 그렇다면 집사님들의 삶의 질을 수직 상승시켜 줄 압도적 스펙의 고양이 모래, **본아페티 응고형 더스트 프리 벤토나이트 고양이모래**를 자신 있게 추천합니다.\n\n수많은 고양이 커뮤니티와 입소문을 통해 \'모래 유목민 정착템\'으로 불리며 폭발적인 인기를 끌고 있는 본아페티 벤토나이트 모래는, 오직 고양이의 건강과 집사의 쾌적한 실내 환경만을 생각하여 개발된 프리미엄 제품입니다. 시중의 저가형 벤토나이트 모래들이 가진 치명적인 단점들을 최첨단 집진 기술과 최고급 원료로 완벽하게 극복해 냈습니다. 고양이의 젤리 발바닥을 보호하는 부드러운 입자부터, 기적 같은 먼지 억제력, 감자(소변 덩어리)를 떡짐 없이 순간적으로 얼려버리는 강력한 응고력까지! 지금부터 본아페티 더스트 프리 고양이 모래가 왜 특별한지 상세한 리뷰를 통해 확인해 보세요.',
    sections: [
      { img: '1.png', text: '이 제품을 강력하게 추천하는 첫 번째이자 가장 완벽한 이유는 바로 이름에서부터 알 수 있는 압도적인 \'먼지 억제력(Dust Free)\'입니다. 모래를 화장실에 붓거나 감자를 캘 때 발생하는 미세먼지는 고양이의 결막염과 호흡기 질환의 가장 큰 원인이 되며, 집사의 비염을 악화시키는 주범이기도 합니다. 본아페티는 무려 20단계가 넘는 극한의 집진 공정과 특수 에어 워싱 처리를 거쳐 모래 표면의 미세분진을 99.9% 완벽하게 제거했습니다. 검은 옷을 입고 모래를 마구 파헤쳐도 옷에 하얀 먼지가 묻어나지 않을 정도로 믿기 힘든 깨끗함을 자랑합니다.' },
      { img: '2.png', text: '집사님들이 모래를 고를 때 가장 중요하게 보는 또 다른 기준, 바로 \'응고력\'입니다. 소변이 닿자마자 1초 만에 돌덩이처럼 단단하게 뭉쳐지는 기적 같은 순간 응고력을 보여줍니다. 바닥에 눌어붙어 떡지거나 맛동산을 캘 때 잔부스러기가 부서지는 현상이 전혀 없어 모래 소모량을 획기적으로 줄여주며, 화장실 청소 시간을 절반 이하로 단축시켜 주는 효자 템입니다.' },
      { img: '3.png', text: '벤토나이트 특유의 뛰어난 탈취력에 본아페티만의 특수 천연 활성탄과 제올라이트 입자를 황금 비율로 배합하여 악취의 원인이 되는 암모니아 냄새를 뿌리부터 완벽하게 흡착하고 분해합니다. 인공적인 인공 향료로 냄새를 덮는 것이 아니라 냄새 분자 자체를 소멸시키기 때문에, 후각이 예민한 고양이들이 스트레스 없이 쾌적하게 화장실을 이용할 수 있으며 집안 가득 퍼지던 화장실 냄새 스트레스에서 영원히 해방될 수 있습니다.' },
      { img: '4.png', text: '야생에서 모래밭에 배변하던 고양이의 본능을 100% 충족시켜 주는 최적의 입자 크기를 구현했습니다. 거친 입자에 연약한 젤리 발바닥이 다칠 염려가 전혀 없으며, 부드러운 촉감 덕분에 화장실 적응에 실패한 예민한 고양이들이나 갓 태어난 아기 고양이들도 거부감 없이 즉각적으로 편안하게 화장실을 사용할 수 있도록 유도합니다.' },
      { img: '5.png', text: '강력한 응고력 덕분에 쉽게 오염되지 않아 전체 모래 갈이 주기가 기존 대비 훨씬 길어지며, 이는 곧 가성비라는 경제적 이점으로 직결됩니다. 또한, 집안 곳곳에 모래가 굴러다니는 사막화 현상을 최소화하여 매일 청소기를 돌려야 했던 집사님의 육체적 피로를 확연히 덜어줍니다. 고양이의 건강과 집사의 편안함을 완벽하게 타협한 최고의 선택지입니다.' }
    ],
    outro: '좋은 모래 하나를 바꾸는 것만으로도 고양이의 눈곱이 사라지고 호흡기가 건강해지며, 집사의 일상생활이 180도 쾌적하게 변화할 수 있습니다. 수많은 벤토나이트와 두부 모래를 떠돌며 아직도 완벽한 모래를 찾지 못한 모래 유목민이시라면, 단연코 종착지가 되어줄 **본아페티 응고형 더스트 프리 벤토나이트 고양이모래**로 지금 바로 정착해 보세요! 맑은 공기와 깨끗한 화장실, 그리고 행복해하는 반려묘의 모습을 직접 확인하실 수 있습니다.',
    summary: '먼지 없는 고양이 모래 종결자! 본아페티 응고형 더스트 프리 벤토나이트 모래 강력 추천'
  },
  {
    id: 'item-ciao-churu-gourmet',
    category: '반려동물',
    title: '고양이 마약 간식 대용량! 챠오츄르 구루메 버라이어티 60p 기호성 최고 완벽 리뷰',
    sourceDir: 'D:\\정식홈페이지자동화\\챠오츄르 고양이 구루메 버라이어티 간식 60p',
    backupDir: 'D:\\정식서버업로드전용폴더\\챠오츄르 고양이 구루메 버라이어티 간식 60p',
    link: 'https://link.coupang.com/a/eKCFEJHCwu',
    iframe: '<iframe src="https://coupa.ng/cnxOUH" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
    images: ['썸네일.png', '1.png', '2.png', '3.png', '4.png'],
    intro: '세상에 츄르를 거부하는 고양이가 과연 존재할까요? 고양이를 모시는 집사님들이라면 집안 찬장에 절대 떨어지지 않게 쟁여두어야 하는 필수품 1순위, 이른바 고양이들의 합법적 마약이라 불리는 전설의 간식! 바로 **이나바 챠오츄르 고양이 구루메 버라이어티 간식 60p**입니다. 츄르 봉지를 바스락거리기만 해도 자다가도 벌떡 일어나 달려오게 만드는 엄청난 기호성을 자랑하는 이 제품은 집사와 고양이 사이의 유대감을 형성하는 마법의 아이템입니다.\n\n특히 한두 가지 맛만 먹이다 보면 금방 질려 하는 입맛 까다로운 미식가 고양이들을 위해, 챠오츄르 구루메 버라이어티는 고양이들이 환장하는 가장 인기 있는 핵심 맛들만 쏙쏙 골라 담은 완벽한 종합 선물 세트입니다. 무려 60개라는 넉넉하고 짐승 같은 대용량 포장으로 다묘 가정의 집사님들도 부담 없이 팍팍 짜줄 수 있는 미친 가성비를 자랑합니다. 고양이들의 입맛을 사로잡은 이 제품의 치명적인 매력 포인트들을 낱낱이 파헤쳐 보겠습니다.',
    sections: [
      { img: '1.png', text: '이 제품의 가장 큰 무기는 두말할 필요 없는 \'우주 최강의 기호성\'입니다. 입맛이 까다로워 어떤 영양제나 약도 뱉어내는 깐깐한 고양이들도 챠오츄르 앞에서는 속수무책으로 무너집니다. 참치, 가다랑어, 닭가슴살 등 고품질의 신선한 원재료를 베이스로 하여 진하고 감칠맛 나는 육즙을 그대로 살려냈기 때문에, 봉지를 뜯는 순간 풍기는 향긋한 냄새에 고양이들이 정신을 차리지 못하고 달려드는 기적을 볼 수 있습니다.' },
      { img: '2.png', text: '다양성을 추구하는 고양이의 본능을 완벽하게 저격한 훌륭한 구성! 한 통에 고양이들의 최애 맛 3가지(참치 베이스 등)가 20개씩, 총 60개가 골고루 섞여 있어 매일매일 다른 맛을 골라 먹이는 재미가 쏠쏠합니다. 쉽게 질려 하는 냥이들에게 오늘은 무슨 맛을 줄까 행복한 고민을 하게 만들며, 지루할 틈 없는 간식 시간을 선사하는 진정한 버라이어티 팩입니다.' },
      { img: '3.png', text: '물을 지독하게 먹지 않는 고양이들 때문에 매일 신장 질환을 걱정하는 집사님들에게 챠오츄르는 최고의 수분 공급처입니다. 수분 함량이 무려 90%에 달하는 촉촉한 액상 제형으로 이루어져 있어 간식을 맛있게 핥아먹는 것만으로도 자연스럽고 풍부한 수분 섭취가 가능합니다. 더운 여름철 탈수 예방은 물론 고양이의 비뇨기계 건강을 지켜주는 아주 기특한 효자 아이템입니다.' },
      { img: '4.png', text: '활용도 역시 무궁무진합니다. 단순히 간식으로 짜주는 것을 넘어, 고양이가 끔찍하게 싫어하는 구충제나 영양제 알약을 가루 내어 츄르에 섞어주면 감쪽같이 속아 맛있게 먹어치우는 마법을 경험할 수 있습니다. 발톱을 깎거나 양치를 시킨 후, 병원 진료를 다녀온 후 스트레스를 잔뜩 받은 고양이를 달래고 보상해 주는 최고의 평화 협정 수단이기도 합니다.' }
    ],
    outro: '고양이의 행복한 골골송을 듣고 싶으신가요? 퇴근 후 나를 반겨주는 반려묘에게 최고의 선물을 선사하고 싶다면 **이나바 챠오츄르 구루메 버라이어티 간식 60p**를 강력하게 추천합니다. 넉넉한 60개의 대용량으로 마음이 든든해지고, 맛있는 간식을 먹으며 집사의 손을 핥아주는 냥이의 사랑스러운 애교는 덤으로 얻을 수 있습니다. 품절되기 전에 지금 바로 로켓으로 빠르게 쟁여두시고 고양이와의 행복한 간식 타임을 만끽해 보세요!',
    summary: '고양이 마약 간식 대용량! 챠오츄르 구루메 버라이어티 60p 기호성 최고 완벽 리뷰'
  }
];

function sanitizeString(str) {
  return str.replace(/[^a-zA-Z0-9가-힣_-]/g, '_');
}

for (const product of products) {
  const publicImgDir = path.join(__dirname, 'public', 'images');
  
  const thumbnailExt = path.extname(product.images[0]);
  const thumbnailFilename = sanitizeString(product.id) + '_thumb' + Date.now() + thumbnailExt;
  const thumbnailDest = path.join(publicImgDir, thumbnailFilename);
  fs.copyFileSync(path.join(product.sourceDir, product.images[0]), thumbnailDest);
  const thumbnailUrl = '/images/' + thumbnailFilename;
  
  const additionalImageUrls = [];
  const additionalImages = product.images.slice(1, 5);
  
  for (let i = 0; i < additionalImages.length; i++) {
    const ext = path.extname(additionalImages[i]);
    const filename = sanitizeString(product.id) + '_' + i + '_' + Date.now() + ext;
    const dest = path.join(publicImgDir, filename);
    fs.copyFileSync(path.join(product.sourceDir, additionalImages[i]), dest);
    additionalImageUrls.push('/images/' + filename);
    
    if (product.sections[i]) {
      product.sections[i].imagePath = '/images/' + filename;
    }
  }

  const stmtPost = db.prepare(`
    INSERT INTO posts_v2 (postId, title, category, summary, thumbnail, coupangLink, coupangHtml, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);
  
  stmtPost.run(
    product.id,
    product.title,
    product.category,
    product.summary,
    thumbnailUrl,
    product.link,
    product.iframe
  );
  
  const stmtIntro = db.prepare('INSERT INTO post_sections (postId, sectionOrder, text, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
  stmtIntro.run(product.id, 0, product.intro);
  
  let order = 1;
  const stmtSec = db.prepare('INSERT INTO post_sections (postId, sectionOrder, image, text, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
  for (const sec of product.sections) {
    if (sec.imagePath) {
      stmtSec.run(product.id, order++, sec.imagePath, sec.text);
    }
  }
  
  const stmtOutro = db.prepare('INSERT INTO post_sections (postId, sectionOrder, text, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)');
  stmtOutro.run(product.id, order++, product.outro);
  
  if (!fs.existsSync(product.backupDir)) {
    fs.mkdirSync(product.backupDir, { recursive: true });
  }
  
  const files = fs.readdirSync(product.sourceDir);
  for (const file of files) {
    fs.copyFileSync(path.join(product.sourceDir, file), path.join(product.backupDir, file));
    fs.unlinkSync(path.join(product.sourceDir, file));
  }
  fs.rmdirSync(product.sourceDir);
  console.log('Processed:', product.id);
}

const wb = xlsx.readFile('D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

for (let row of data) {
  if (!row['작업여부'] || row['작업여부'].trim() === '') {
    row['작업여부'] = 'O';
  }
}

const newSheet = xlsx.utils.json_to_sheet(data);
wb.Sheets[sheetName] = newSheet;
xlsx.writeFile(wb, 'D:/쿠팡파트너스엑셀작업목록/쿠팡파트너스_작업목록_템플릿.xlsx');
console.log('Excel updated.');
