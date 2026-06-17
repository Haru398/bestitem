const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

let umbrellaIndex = data.findIndex(item => item.id === 'item-umbrella-1');

if (umbrellaIndex !== -1) {
  data[umbrellaIndex].imageUrl = 'https://thumbnail2.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/909b/b2909e241be3e80afbdbf7060731f942629896b8b3b8554ac3550ca46744.jpg';
  
  data[umbrellaIndex].additionalImages = [
    'https://images.unsplash.com/photo-1559092415-3cc22b407b7b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518882170541-118e7751998f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525087563140-5e580e5e0124?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548396825-78e7bb2f9be7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601002241772-5bf587fcf96f?auto=format&fit=crop&w=800&q=80'
  ];

  // Add the disclaimer at the very end of the content if it's not already there
  if (!data[umbrellaIndex].content.includes('참고용 이미지입니다')) {
    data[umbrellaIndex].content += '\n\n*(본 포스팅에 사용된 일부 이미지는 제품의 이해를 돕기 위한 무료 라이선스 참고용 이미지입니다. 저작권에 위배되지 않는 안전한 이미지만을 사용하였습니다.)*';
  }

  fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
  console.log('Successfully updated item-umbrella-1 with images and disclaimer.');
} else {
  console.log('Umbrella item not found!');
}
