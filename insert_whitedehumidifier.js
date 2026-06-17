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
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `white_dehumidifier_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to white_dehumidifier_${i + 1}.png`);
});

// 2. Insert into DB
const newPost = {
  id: 'item-' + Date.now(),
  category: '가전/디지털',
  subCategory: '계절가전',
  title: '[장마철 뽀송하게] 화이트 톤의 깔끔한 감성! 대용량 제습기 리얼 리뷰',
  content: `매년 꿉꿉한 장마철마다 눅눅해지는 집안 공기, 인테리어를 해치지 않으면서도 강력한 제습 효과를 원하시나요? 오늘은 성능은 물론이고 세련된 디자인까지 모두 잡은 **'감성 화이트 대용량 제습기'**를 소개해 드립니다!

![화이트 제습기 전면 디자인](/images/white_dehumidifier_1.png)

첫 번째 사진에서 보시듯, 군더더기 없이 깔끔하게 떨어지는 화이트 컬러 바디 전면에는 미세한 도트 패턴이 들어가 있어 밋밋하지 않고 고급스럽습니다. 어떤 공간에 두어도 튀지 않고 인테리어 오브제처럼 자연스럽게 스며드는 매력적인 디자인입니다.

![침실/거실 인테리어 연출컷](/images/white_dehumidifier_2.png)

실제 침실 협탁 옆에 배치한 모습입니다. 그레이 톤의 가구와 매치해도 아주 찰떡이죠? 모던한 감성을 극대화해 주어 거실, 안방, 드레스룸 어디에 두어도 세련된 무드를 연출할 수 있습니다. 

![직관적인 상단 터치 패널](/images/white_dehumidifier_3.png)

상단 조작부는 가볍게 터치만 하면 작동하는 직관적인 터치 패널로 구성되어 있습니다. 풍량 조절(SPEED), 타이머(TIMER)는 물론이고 아이들이나 반려동물이 함부로 누르지 못하도록 하는 '잠금 기능(ION/LOCK)'까지 탑재되어 있어 안전하고 편리하게 사용할 수 있습니다. 중앙의 LED 창을 통해 현재 습도도 한눈에 파악할 수 있죠!

![연속 배수 호스 연결부](/images/white_dehumidifier_4.png)

장마철 물통 비우기 귀찮으시죠? 이 제품은 후면에 **'연속 배수 호스'**를 바로 연결할 수 있는 포트가 마련되어 있습니다. 동봉된 투명 호스를 연결하고 화장실이나 베란다 배수구 쪽으로 빼두기만 하면, 물통이 꽉 차서 멈출 걱정 없이 24시간 내내 뽀송하게 연속 제습이 가능합니다!

![컴팩트한 사이즈와 편리한 이동성](/images/white_dehumidifier_5.png)

마지막으로 사이즈 체감 샷입니다. 대용량 제습 능력을 갖추었음에도 불구하고 부담스럽게 크지 않고 슬림하게 잘 빠졌습니다. 게다가 하단에 부드러운 바퀴가 달려 있어 여성분들도 방에서 방으로 힘들이지 않고 쓱쓱 밀고 다니며 편리하게 사용할 수 있습니다.

성능과 디자인 모두를 만족시키는 완벽한 제습기, 지금 바로 확인해 보세요!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEhxFm1NGS)

<div style="display:flex; justify-content:center; margin-top:20px;">
  <iframe src="https://coupa.ng/cntk2O" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
</div>`,
  imageUrl: '/images/white_dehumidifier_1.png'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted White Dehumidifier post into DB');
