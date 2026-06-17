const fs = require('fs');

const content = `여름이 다가오면서 시원하고 맛있는 면 요리가 당기지만, 칼로리 걱정 때문에 망설여지시나요? 그렇다면 최근 다이어터들과 유지어터들 사이에서 폭발적인 반응을 얻고 있는 다이어트 필수템, **'배배곤약 바로먹는 20kcal 발효곤약 냉모밀'**을 강력하게 추천합니다! 

이 제품의 가장 큰 장점은 바로 '경이로운 칼로리'입니다. 일반적인 냉모밀 한 그릇이 보통 400~500kcal에 육박하는 반면, 이 제품은 **단 20kcal**라는 믿기 힘든 초저칼로리를 자랑합니다. 밤늦은 시간 야식이 너무나도 간절할 때, 혹은 식단 관리를 빡빡하게 해야 하는 기간에도 아무런 죄책감 없이 후루룩 시원하게 즐길 수 있는 완벽한 면 요리입니다. 다이어트 중에도 먹는 즐거움을 포기하지 않아도 된다는 사실 하나만으로도 이 제품을 선택할 이유는 충분합니다.

많은 분들이 '곤약면'이라고 하면 특유의 비릿한 냄새와 질긴 식감을 떠올리시며 거부감을 느끼실 텐데요, 배배곤약은 다릅니다! 독자적인 발효 곤약 기술을 적용하여 곤약 특유의 냄새를 완벽하게 제거했습니다. 포장을 뜯자마자 느껴지는 것은 불쾌한 냄새가 아닌, 향긋하고 진한 가쓰오부시 육수의 향기뿐입니다. 면발 역시 질기거나 뚝뚝 끊기지 않고, 진짜 메밀면을 먹는 것처럼 탱글탱글하고 쫄깃한 식감을 완벽하게 구현해 냈습니다.

조리 과정의 번거로움을 완전히 없앴다는 점도 빼놓을 수 없는 매력 포인트입니다. 불을 켜서 물을 끓이고, 면을 삶고, 찬물에 헹궈내는 복잡한 과정이 전혀 필요 없습니다! 그저 포장을 뜯고, 동봉된 육수를 붓고, 고명 후레이크를 솔솔 뿌려주기만 하면 시원한 냉모밀 한 그릇이 단 10초 만에 완성됩니다. 냉장고에 시원하게 보관했다가 얼음까지 동동 띄워 먹으면 전문 일식집 냉모밀이 부럽지 않은 깊고 시원한 맛을 느낄 수 있습니다. 바쁜 직장인들의 간편한 한 끼 식사로도, 아이들의 영양 간식으로도 손색이 없습니다.

실제 구매자들의 리뷰를 살펴보면 "곤약 냄새가 전혀 안 나서 놀랐어요", "국물이 너무 맛있어서 원샷했습니다", "다이어트 중에 이런 맛있는 냉모밀을 먹을 수 있다니 감동입니다" 등 극찬이 쏟아지고 있습니다. 올여름, 굶으면서 하는 고통스러운 다이어트는 이제 그만! **배배곤약 바로먹는 20kcal 발효곤약 냉모밀**과 함께 가볍고 시원하고 맛있게 식단 관리하세요!`;

const newItem = {
  id: 'item-konjac-soba',
  title: '여름 다이어트 필수템! 배배곤약 바로먹는 20kcal 발효곤약 냉모밀 (초간단 10초 완성)',
  category: '식품',
  content: content,
  imageUrl: '/images/soba_1.png',
  additionalImages: [
    '/images/soba_2.png',
    '/images/soba_3.png',
    '/images/soba_4.png',
    '/images/soba_5.png'
  ],
  hashtags: ['#다이어트식단', '#배배곤약', '#곤약냉모밀', '#저칼로리야식', '#20kcal', '#여름별미'],
  coupangLink: 'https://link.coupang.com/a/eyN2QkzJS0',
  coupangIframe: '<iframe src="https://coupa.ng/cnptlQ" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>'
};

let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));
// Check if it already exists to avoid duplicates during testing
data = data.filter(item => item.id !== 'item-konjac-soba');
data.unshift(newItem);
fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
console.log('Successfully added Konjac Soba.');
