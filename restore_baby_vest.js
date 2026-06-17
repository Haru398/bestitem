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

// The 5 newest files are the re-uploaded images
const newest = files.slice(0, 5).reverse(); // reverse to keep chronological order 1 to 5

newest.forEach((f, i) => {
  const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', `baby_vest_${i + 1}.png`);
  fs.copyFileSync(f.fullPath, dest);
  console.log(`Copied ${f.name} to baby_vest_${i + 1}.png (Size: ${fs.statSync(dest).size} bytes)`);
});

// 2. Update DB with new content
const post = db.prepare('SELECT id FROM posts WHERE id LIKE "item-%" ORDER BY createdAt DESC LIMIT 1').get();

if (post) {
  const newContent = `초보 엄마 아빠들의 가장 큰 고민, 바로 아기의 '수면'이죠! 
작은 소리나 자신의 움직임에 깜짝 놀라 깨버리는 '모로반사' 때문에 밤새 뜬눈으로 지새우신 적 많으실 텐데요. 오늘은 우리 아기의 꿀잠을 완벽하게 보장해 줄 국민 육아템, **'머미쿨쿨 수면조끼'**를 소개해 드립니다!

![아기 착용 사진](/images/baby_vest_1.png)

첫 번째 사진을 보세요! 너무 평온하게 자고 있지 않나요? 머미쿨쿨 수면조끼는 엄마 품에 안겨 있는 듯한 적당한 무게감과 포근함으로 아기를 감싸주어 모로반사를 효과적으로 방지해 줍니다. 

![믿을 수 있는 국내 제조](/images/baby_vest_2.png)

소중한 우리 아기가 매일 덮고 입는 제품인 만큼 품질이 가장 중요하겠죠? 이 제품은 원단부터 봉제, 검수까지 **100% 국내 제조 공정(MADE IN KOREA)**으로 완성되어 더욱 안심하고 사용할 수 있습니다.

![안전한 고정 똑딱이](/images/baby_vest_3.png)

가장 마음에 들었던 디테일! 바로 **'안전한 고정 똑딱이'**입니다. 아기가 자면서 아무리 뒤척이고 발버둥을 쳐도 수면조끼가 위로 말려 올라가 얼굴을 덮을 위험이 없습니다. 엉덩이부터 감싸주는 똑딱이가 단단하게 고정해 주니 밤새 안심하고 푹 잘 수 있죠!

![4단 사이즈 조절](/images/baby_vest_4.png)

아기들은 정말 하루가 다르게 쑥쑥 크잖아요? 이 제품은 **4단계로 사이즈 조절이 가능한 똑딱이**가 장착되어 있어, 아기의 체형과 성장에 맞춰 딱 맞게 조절하며 오랫동안 사용할 수 있습니다. 가성비까지 정말 최고예요!

![KC 안전 인증 및 유해물질 FREE](/images/baby_vest_5.png)

가장 중요한 안전성! **영유아 KC 안전 인증을 당당하게 합격**했으며, 폼알데하이드, 납, 아릴아민 등 모든 유해 물질 검사에서 '적합 판정'을 받아 안심하고 입힐 수 있는 유해 물질 FREE 제품입니다.

육아의 질을 수직 상승시켜 줄 진정한 꿀잠 템! 지금 바로 만나보세요!

[👉 최저가 구매 링크 바로가기](https://link.coupang.com/a/eEmOpE9Foi)`;

  db.prepare('UPDATE posts SET content = ?, imageUrl = ? WHERE id = ?').run(newContent, '/images/baby_vest_1.png', post.id);
  console.log('Restored DB content with working images.');
}
