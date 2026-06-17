const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');

// 1. Find the new event image
const brainDir = 'C:\\Users\\my\\.gemini\\antigravity\\brain\\0096a6d6-9821-41a9-86e2-7f03765275fa';
const files = fs.readdirSync(brainDir)
  .filter(f => f.startsWith('media__') && (f.endsWith('.png') || f.endsWith('.jpg')))
  .map(f => {
    const fullPath = path.join(brainDir, f);
    return { name: f, fullPath, time: fs.statSync(fullPath).mtime.getTime() };
  })
  .sort((a, b) => b.time - a.time);

const newest = files[0];

const dest = path.join('D:\\서버구축폴더\\bestitem\\public\\images', 'event_water.png');
fs.copyFileSync(newest.fullPath, dest);
console.log(`Copied ${newest.name} to event_water.png`);

// 2. Insert into DB
const newPost = {
  id: 'event-' + Date.now(),
  category: '이벤트/특가',
  subCategory: '여름시즌',
  title: '[쿠팡 기획전] 올여름 시원하게 즐기자! 워터 아이템 초특가 할인전 오픈 🌊',
  content: `🔥 **단독 특가! 쿠팡 워터 아이템 기획전이 시작되었습니다!** 🔥

본격적인 여름휴가 시즌을 앞두고 물놀이 용품 준비하고 계신가요? 
지금 쿠팡에서 역대급 할인율로 무장한 **'워터 아이템 특가'** 기획전을 진행하고 있습니다!

![워터 아이템 특가 배너](/images/event_water.png)

아이들을 위한 튜브, 구명조끼부터 어른들을 위한 래쉬가드, 스노클링 장비, 워터파크 방수팩까지! 물놀이에 필요한 모든 필수템들을 한자리에서 만나보실 수 있습니다. 

이번 행사는 **한정 수량**으로 진행되며, 인기 상품은 예고 없이 조기 품절될 수 있으니 지금 당장 접속해서 미리미리 득템하시길 바랍니다!

> [!TIP]
> 여름휴가 필수템은 시즌이 닥치면 가격이 비싸지고 품절 대란이 일어납니다. 특가 세일 기간에 미리 쟁여두는 것이 가장 현명한 쇼핑입니다!

[🏊‍♂️ 워터 아이템 초특가 기획전 바로가기 (클릭)](https://link.coupang.com/a/eEmrURw4tg)

*본 행사는 한정 수량으로 예고 없이 조기 종료될 수 있으며, 품목별 할인율은 상이할 수 있습니다.*`,
  imageUrl: '/images/event_water.png'
};

const stmt = db.prepare('INSERT INTO posts (id, category, subCategory, title, content, imageUrl, views, createdAt) VALUES (@id, @category, @subCategory, @title, @content, @imageUrl, 0, CURRENT_TIMESTAMP)');
stmt.run(newPost);
console.log('Inserted Water Event post into DB');
