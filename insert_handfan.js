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
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `handfan_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to handfan_${i + 1}.png`);
});

// 2. Insert into DB
const newPost = {
  id: 'item-' + Date.now(),
  category: '가전/디지털',
  subCategory: '계절가전',
  title: '[무더위 생존템] 올여름 더위 박살! Alissa 초강력 냉각 휴대용 선풍기 리얼 리뷰',
  content: `기록적인 폭염이 예상되는 올여름, 아직도 뜨거운 바람만 훅훅 나오는 옛날 손선풍기를 들고 다니시나요? 오늘은 에어컨을 통째로 들고 다니는 듯한 극강의 시원함, **'Alissa 급속 냉각 휴대용 선풍기'**를 소개해 드립니다!

![Alissa 선풍기 패키지 및 본체](/images/handfan_1.png)

가장 먼저 영롱한 블루 컬러의 패키징과 화이트 톤의 깔끔한 본체가 눈에 띕니다. 이 제품은 단순한 선풍기가 아니라 무려 '급속 냉각' 기능이 탑재된 프리미엄 모델인데요. 무광 화이트 바디와 메탈릭한 팬의 조합이 마치 고급 항공기 엔진을 연상케 할 만큼 세련되고 고급스럽습니다. 선물용으로도 아주 제격이죠!

![강력한 BLDC 모터 후면부](/images/handfan_2.png)

후면 흡입구를 보시면 공기를 강력하게 빨아들이는 터보 항공 모터 설계가 돋보입니다. 초고속 BLDC 모터가 탑재되어 일반 선풍기 뺨치는 초강력 터보 바람을 뿜어냅니다. 한여름 출퇴근길 지옥철에서도 땀 한 방울 안 흘리게 만들어 줄 강력한 성능을 자랑하죠!

![냉각 패드 및 100단 LED 디스플레이](/images/handfan_3.png)

이 제품의 하이라이트! 전면부 중앙에 있는 은빛 메탈 부분은 작동과 동시에 얼음처럼 차가워지는 **'반도체 급속 냉각 패드'**입니다. 차가워진 패드를 목 뒷부분이나 손목에 대면 체감 온도가 확 내려갑니다. 또한 하단의 스마트 LED 디스플레이를 통해 무려 **'100단'**까지 롤러 스위치로 미세하게 풍량을 조절할 수 있고, 배터리 잔량까지 직관적으로 확인 가능합니다. 

![C타입 고속 충전 포트](/images/handfan_4.png)

뒤쪽에는 현대인의 필수인 **'C타입(Type-C) 충전 포트'**가 깔끔하게 자리 잡고 있습니다. 전용 충전기 필요 없이 스마트폰 충전기, 보조배터리로 언제 어디서든 간편하게 고속 충전할 수 있습니다. 대용량 배터리가 내장되어 한 번 완충하면 하루 종일 끄떡없이 넉넉하게 사용하실 수 있죠!

![풀 패키지 구성품](/images/handfan_5.png)

마지막으로 전체 구성품입니다! 고급스러운 본품 외에도 안전하게 들고 다닐 수 있는 손목 스트랩, C타입 충전 케이블, 그리고 깔끔한 설명서까지 알차게 꽉꽉 채워져 있습니다. 올여름 폭염 대비는 이 풀패키지 하나면 끝납니다!

이런 역대급 성능의 냉각 선풍기, 지금 쿠팡에서 엄청난 특가로 만나보실 수 있습니다. 더위 먹기 전에 미리미리 챙기세요!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEeIZ80Mvs)

<div style="display:flex; justify-content:center; margin-top:20px;">
  <iframe src="https://coupa.ng/cnthgH" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
</div>`,
  imageUrl: '/images/handfan_1.png'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted Alissa handfan post into DB');
