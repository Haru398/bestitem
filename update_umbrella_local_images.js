const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

let umbrellaIndex = data.findIndex(item => item.id === 'item-umbrella-1');

if (umbrellaIndex !== -1) {
  data[umbrellaIndex].additionalImages = [
    '/images/umbrella_1.png',
    '/images/umbrella_2.png',
    '/images/umbrella_3.png',
    '/images/umbrella_4.png',
    '/images/umbrella_5.png'
  ];
  
  // Make sure the disclaimer is clear about generated images since we generated them
  if (!data[umbrellaIndex].content.includes('AI 기술로 생성된')) {
    data[umbrellaIndex].content = data[umbrellaIndex].content.replace('참고용 이미지입니다', '참고용 이미지입니다 (일부 이미지는 제품의 외관을 묘사하기 위해 AI 기술로 생성되었습니다)');
  }

  fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
  console.log('Successfully updated item-umbrella-1 with generated local images.');
} else {
  console.log('Umbrella item not found!');
}
