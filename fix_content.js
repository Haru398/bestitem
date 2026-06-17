const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

const hanger = data.find(i => i.id === 'item-hanger-1');
if(hanger) {
  // Title fix
  hanger.title = hanger.title.replace(' 찐후기', ' 추천').replace('내돈내산 ', '');
  
  // Content fix
  hanger.content = hanger.content.replace("'살림의기술 어깨뿔방지 논슬립 스틸 옷걸이'를 직접 구매해 보았습니다", "'살림의기술 어깨뿔방지 논슬립 스틸 옷걸이'를 추천합니다");
  
  // Hashtag fix
  hanger.hashtags = hanger.hashtags.filter(tag => !tag.includes('내돈내산'));
  hanger.hashtags.push('#옷걸이추천');
  
  fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
  console.log('Fixed hanger content');
}
