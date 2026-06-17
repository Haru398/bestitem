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

// The user uploaded 5 images. Get the newest 5.
const newest = files.slice(0, 5).reverse();

newest.forEach((f, i) => {
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `dehumidifier_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to dehumidifier_${i + 1}.png`);
});

// 2. Insert into DB
const newPost = {
  id: 'item-' + Date.now(),
  category: '가전',
  subCategory: '계절가전',
  title: '[장마철 필수템] 꿉꿉함 안녕! 위닉스 뽀송 제습기 리얼 리뷰',
  content: `매년 돌아오는 장마철, 집안 곳곳에 스며드는 습기와 꿉꿉함 때문에 스트레스받으시죠? 오늘은 뽀송뽀송한 우리 집을 만들어 줄 구원템, **'위닉스(WINIX) 제습기'**를 소개합니다.

![위닉스 제습기 전면 디자인](/images/dehumidifier_1.png)

가장 먼저 눈에 띄는 것은 화이트와 은은한 파스텔 블루 톤이 투톤으로 매치된 **'깔끔하고 모던한 디자인'**입니다. 둔탁하고 무거운 예전 제습기들과 달리, 군더더기 없이 매끄럽게 떨어지는 라인이 돋보입니다. 어떤 공간에 두어도 인테리어를 해치지 않는 세련된 감각을 자랑합니다.

![상단 조작부 뷰](/images/dehumidifier_2.png)

상단을 보시면 직관적이고 깔끔한 **'터치형 디스플레이 조작부'**가 자리 잡고 있습니다. 전원, 제습 모드, 풍량 조절, 예약 등 꼭 필요한 기능들이 그림 아이콘과 함께 배치되어 있어 기계에 익숙하지 않은 부모님들도 한눈에 쉽게 조작하실 수 있습니다.

![습도 50% 디스플레이 확대](/images/dehumidifier_3.png)

특히 중앙의 **'스마트 LED 디스플레이'**는 현재 실내 습도를 숫자로 크고 선명하게 보여줍니다. 사진에서 보시듯 희망 습도를 50%로 설정해두면, 알아서 똑똑하게 습도를 조절해 주어 항상 쾌적한 실내 환경을 유지할 수 있습니다. 습도 조절뿐만 아니라 남은 시간까지 한눈에 확인 가능합니다.

![거실 인테리어 연출 컷](/images/dehumidifier_4.png)

거실에 실제 배치한 모습입니다. 우드 톤의 따뜻한 가구들이나 러그와 매치해도 이질감 없이 자연스럽게 스며드는 것을 보실 수 있죠? 인테리어 가전이라고 불러도 손색없을 만큼 어느 공간에나 찰떡같이 어울립니다. 공간의 품격을 한 단계 높여주는 느낌입니다.

![하단 히든 휠 확대](/images/dehumidifier_5.png)

제습기는 물이 차면 무거워져서 방마다 옮기기 힘들다는 편견은 버리세요! 바닥에는 겉에서는 잘 보이지 않는 **'360도 회전 히든 휠(바퀴)'**이 장착되어 있습니다. 거실에서 제습을 끝내고 빨래가 널려 있는 베란다나 눅눅한 안방으로 이동할 때, 허리 굽힐 필요 없이 캐리어처럼 쓱쓱 밀고 다니면 끝입니다!

올여름 꿉꿉한 장마철, 위닉스 뽀송 제습기 하나로 쾌적하고 뽀송한 매일을 경험해 보세요!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEbASMimUm)

<div style="display:flex; justify-content:center; margin-top:20px;">
  <iframe src="https://coupa.ng/cntetG" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
</div>`,
  imageUrl: '/images/dehumidifier_1.png'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted WINIX dehumidifier post into DB');
