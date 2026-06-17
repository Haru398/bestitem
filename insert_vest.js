const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');

// 1. Find and Copy images
const brainDir = 'C:\\Users\\my\\.gemini\\antigravity\\brain\\0096a6d6-9821-41a9-86e2-7f03765275fa';
const files = fs.readdirSync(brainDir)
  .filter(f => f.startsWith('media__') && (f.endsWith('.png') || f.endsWith('.jpg')))
  .map(f => {
    const fullPath = path.join(brainDir, f);
    return { name: f, fullPath, time: fs.statSync(fullPath).mtime.getTime() };
  })
  .sort((a, b) => b.time - a.time);

// The user uploaded 5 images. Get the newest 5, and reverse to get chronological order (1st to 5th).
const newest = files.slice(0, 5).reverse();

newest.forEach((f, i) => {
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `vest_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to vest_${i + 1}.png`);
});

// 2. Insert into DB
const newPost = {
  id: 'item-' + Date.now(),
  category: '생활용품',
  subCategory: '작업/안전용품',
  title: '[폭염 완벽 대비] 입는 에어컨! 4팬 장착 쿨링 냉각 작업복 조끼 리얼 리뷰',
  content: `매년 갱신되는 역대급 폭염! 야외에서 일하시거나 땀을 많이 흘리시는 분들께 한여름은 그야말로 지옥이죠. 그래서 오늘은 뙤약볕 아래에서도 냉장고 안에 있는 듯한 시원함을 선사할 궁극의 생존템, **'4팬 냉각 에어컨 작업복 조끼'**를 소개해 드립니다!

![남녀 공용 착용샷 및 전체 구성품](/images/vest_1.png)

첫 번째 사진은 실제 착용 모습과 전체 구성품입니다! 남녀노소 누구나 편하게 입을 수 있는 깔끔한 네이비 컬러 디자인에, 무려 **4개의 강력한 쿨링 팬**이 앞뒤로 장착되어 있습니다. 대용량 배터리와 전용 케이블까지 풀세트로 구성되어 있어 이 제품 하나면 올여름 준비는 끝납니다. 빛 반사 띠까지 디테일하게 들어가 있어 야간 작업 시 안전까지 챙겼네요!

![4단 속도 조절 에어컨 조끼 측면샷](/images/vest_2.png)

시원함의 비결은 바로 이 옆구리와 등 쪽에 밀착된 팬에서 나오는 **'순환 송풍 기술'**입니다. 버튼 하나로 **4단 속도 조절**이 가능해서 땀이 많이 날 때는 강력한 터보풍으로, 실내에 들어왔을 때는 부드러운 미풍으로 유도리 있게 조절할 수 있습니다. 

![타사 제품과의 압도적 성능 비교](/images/vest_3.png)

시중에 파는 저렴한 2팬 조끼와는 차원이 다릅니다! 압도적인 **'4팬 쌍대류 설계'**로 바람이 옷 안에서 덩어리져 더욱 빠르게 땀을 식혀줍니다. 또한, 신형 넥 에어 덕트 디자인으로 목과 얼굴까지 시원한 바람이 올라오도록 업그레이드되었습니다. 고품질 대용량 배터리 덕분에 하루 종일 방전 걱정 없이 빵빵하게 틀고 다닐 수 있죠.

![고온 환경 야외 작업 필수템](/images/vest_4.png)

"이런 분들께 강력 추천합니다!"
뜨거운 열기를 견뎌야 하는 용접/건설 현장, 그늘 없는 농사일, 배달 기사님들, 낚시나 등산 등 야외 레저를 즐기시는 분들까지! 땀범벅이 되기 쉬운 모든 고온 환경에서 체온을 급속도로 낮춰주고 쾌적함을 유지해 주는 그야말로 **야외 필수템**입니다.

![급속 냉각 쾌적함 연출샷](/images/vest_5.png)

한여름 무더위, 더 이상 참지 마세요! 이 조끼 하나 쓱 걸쳐 입는 순간 땀은 마르고, 머리부터 허리까지 쾌적한 에어컨 바람이 몸 전체를 감싸줍니다.

폭염 대비 필수템 4팬 에어컨 작업복, 지금 바로 쿠팡에서 초특가로 만나보세요! 부모님이나 남편 선물로도 강력 추천합니다!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEf3IdFtNk)

<div style="display:flex; justify-content:center; margin-top:20px;">
  <iframe src="https://coupa.ng/cntjAE" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
</div>`,
  imageUrl: '/images/vest_1.png'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted Cooling Vest post into DB');
