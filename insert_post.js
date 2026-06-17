const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://etcgahcjrqiqhtmmqorj.supabase.co';
const supabaseAnonKey = 'sb_publishable_nXrvZccyQTrhaN7qWTChWw_H0CjFCfw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addPost() {
  const newPost = {
    id: "7",
    category: "가전/디지털",
    "subCategory": "모니터",
    title: "[가성비 끝판왕] 제스다 24인치 FHD 100Hz 모니터 완벽 해부!",
    content: `안녕하세요! 여비서입니다. 💁‍♀️

최근 사무용이든 게임용이든 서브 모니터가 필수인 시대가 되었죠?
하지만 대기업 모니터는 너무 비싸고, 중소기업 제품은 믿음이 안 가서 망설이셨던 분들을 위해!
제가 직접 눈에 불을 켜고 찾아낸 **가성비 끝판왕 모니터**를 소개해 드립니다!

바로 **제스다 24인치 FHD 100Hz IPS 모니터 (KXM2400FH75)** 입니다.

<img src="/images/monitor_jesda/front.png" width="100%" alt="제스다 모니터 정면" style="border-radius: 8px; margin: 15px 0;">

### 📌 왜 이 제품을 추천할까요?

**1️⃣ 믿을 수 있는 LG Display IPS 패널 탑재**
아무리 가성비라도 화질을 포기할 순 없죠! 이 가격대에 **LG 정품 IPS 패널**이 들어갔습니다. 
178도의 넓은 시야각 덕분에 누워서 보든, 옆에서 보든 색상 왜곡 없이 쨍하고 선명한 화질을 자랑합니다.
(NTSC 82%, sRGB 100% 지원으로 색감 표현력도 어마어마해요!)

<img src="/images/monitor_jesda/frost.png" width="100%" alt="얼음 화면 선명도" style="border-radius: 8px; margin: 15px 0;">

**2️⃣ 부드러운 100Hz 주사율 & FHD 해상도**
보통 사무용 모니터는 60Hz나 75Hz에 머무는 경우가 많은데, 이 녀석은 무려 **100Hz 고주사율**을 지원합니다!
마우스 포인터 움직임부터가 다르고, 가벼운 게임을 즐기기에도 전혀 무리가 없는 스펙입니다.

<img src="/images/monitor_jesda/side.png" width="100%" alt="모니터 측면" style="border-radius: 8px; margin: 15px 0;">

### 📦 알찬 제품 구성

<img src="/images/monitor_jesda/components.png" width="100%" alt="제품 구성품" style="border-radius: 8px; margin: 15px 0;">
가격이 저렴하다고 구성품이 부실할까 걱정하셨나요? 
- 모니터 본체
- 스탠드 넥 & 받침대
- 제품 사용 설명서
- **HDMI 케이블 (기본 제공!)**
- 전원 어댑터
까지, 바로 연결해서 사용할 수 있도록 꽉꽉 채워져 있습니다.

---

### 📝 상세 스펙 총정리

마지막으로 꼼꼼하신 대표님들을 위해 스펙표를 첨부합니다.

<img src="/images/monitor_jesda/specs.png" width="100%" alt="스펙표" style="border-radius: 8px; margin: 15px 0;">

- **화면 크기**: 60.8cm (24인치)
- **패널**: IPS (LED 광원)
- **해상도**: FHD (1920x1080)
- **연결 단자**: DP x1, HDMI x1, Type C x1 (PD 15W 충전 지원!), Audio Out
- **부가 기능**: 플리커프리, 스피커 내장, 닌텐도 스위치 지원, 삼성 Dex 지원!

놀랍게도 **Type-C 포트**까지 지원해서 스마트폰 미러링이나 삼성 덱스(Dex)까지 바로 연결이 가능합니다. 이 가격에 이 정도 확장성이면 정말 미친 가성비가 아닐 수 없네요. 서브 모니터나 원룸용 메인 모니터를 찾고 계셨다면 지금 당장 구매하셔도 절대 후회 안 하실 겁니다! 👍`,
    "imageUrl": "/images/monitor_jesda/front.png",
    "additionalImages": [
      "/images/monitor_jesda/frost.png",
      "/images/monitor_jesda/side.png",
      "/images/monitor_jesda/specs.png",
      "/images/monitor_jesda/components.png"
    ],
    hashtags: ["#가성비모니터", "#24인치모니터", "#제스다모니터", "#사무용모니터", "#100Hz모니터"],
    "coupangLink": "https://link.coupang.com/a/eyTxqTd4zA",
    "coupangIframe": "<iframe src=\"https://coupa.ng/cnptO5\" width=\"120\" height=\"240\" frameborder=\"0\" scrolling=\"no\" referrerpolicy=\"unsafe-url\" browsingtopics></iframe>",
    price: "89,000원"
  };

  const { error } = await supabase.from('posts').insert(newPost);
  if (error) {
    console.error("Error inserting post:", error);
  } else {
    console.log("Post inserted successfully!");
  }
}

addPost();
