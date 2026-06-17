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

const newest = files.slice(0, 5).reverse();

newest.forEach((f, i) => {
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `baby_vest_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to baby_vest_${i + 1}.png`);
});

// 2. Insert into DB
const newPost = {
  id: 'item-' + Date.now(),
  category: '생활용품',
  subCategory: '유아동',
  title: '[육아 필수템] 모로반사 방지! 우리 아기 꿀잠 보장하는 머미쿨쿨 수면조끼',
  content: `초보 엄마 아빠들의 가장 큰 고민, 바로 아기의 '수면'이죠! 
작은 소리나 자신의 움직임에 깜짝 놀라 깨버리는 '모로반사' 때문에 밤새 뜬눈으로 지새우신 적 많으실 텐데요. 오늘은 우리 아기의 꿀잠을 완벽하게 보장해 줄 국민 육아템, **'머미쿨쿨 수면조끼'**를 소개해 드립니다!

![아기 착용 사진](/images/baby_vest_1.png)

첫 번째 사진을 보세요! 너무 평온하게 자고 있지 않나요? 머미쿨쿨 수면조끼는 엄마 품에 안겨 있는 듯한 적당한 무게감과 포근함으로 아기를 감싸주어 모로반사를 효과적으로 방지해 줍니다. 

![믿을 수 있는 국내 제조](/images/baby_vest_2.png)

소중한 우리 아기가 매일 덮고 입는 제품인 만큼 품질이 가장 중요하겠죠? 이 제품은 원단부터 봉제, 검수까지 **100% 국내 제조 공정(MADE IN KOREA)**으로 완성되어 더욱 안심하고 사용할 수 있습니다.

![안전한 고정 똑딱이](/images/baby_vest_3.png)

가장 마음에 들었던 디테일! 바로 **'안전한 고정 똑딱이'**입니다. 아기가 자면서 아무리 뒤척이고 발버둥을 쳐도 수면조끼가 위로 말려 올라가 얼굴을 덮을 위험이 없습니다. 엉덩이부터 감싸주는 똑딱이가 단단하게 고정해 주니 밤새 안심하고 푹 잘 수 있죠!

![4단 사이즈 조절](/images/baby_vest_4.png)

아기들은 정말 하루가 다르게 쑥쑥 크잖아요? 이 제품은 **4단계로 사이즈 조절이 가능한 똑딱이**가 장착되어 있어, 아기의 체형과 성장에 맞춰 딱 맞게 조절하며 오랫동안 사용할 수 있습니다. 가성비까지 정말 최고예요!

![디테일 및 핏](/images/baby_vest_5.png)

마지막으로 섬세한 마감 디테일과 착용 핏입니다. 연약한 아기 피부에 자극이 가지 않도록 부드럽고 통기성 좋은 원단을 사용해 태열 걱정 없이 사계절 내내 쾌적하게 꿀잠을 재울 수 있습니다.

육아의 질을 수직 상승시켜 줄 진정한 꿀잠 템! 지금 바로 만나보세요!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEmOpE9Foi)`,
  imageUrl: '/images/baby_vest_1.png',
  coupangIframe: '<iframe src="https://coupa.ng/cntrMZ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  coupangLink: 'https://link.coupang.com/a/eEmOpE9Foi'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, coupangIframe, coupangLink, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, @coupangIframe, @coupangLink, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted Baby Vest post into DB');
