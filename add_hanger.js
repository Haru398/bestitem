const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

const newItem = {
  id: 'item-hanger-1',
  title: '니트 어깨뿔 완벽 해결! 살림의기술 어깨뿔방지 논슬립 스틸 옷걸이 찐후기',
  content: "옷장 정리를 하다 보면 가장 스트레스 받는 게 바로 아끼는 니트나 맨투맨 어깨에 불쑥 튀어나온 '어깨뿔' 자국이죠. 세탁소 옷걸이나 일반 얇은 플라스틱 옷걸이에 걸어뒀다가 어깨선이 볼록하게 망가져서 입고 나갈 때마다 신경 쓰이고 속상했던 적이 한두 번이 아닌데요. 이 지긋지긋한 문제를 완벽하게 해결하기 위해 폭풍 검색 끝에 '살림의기술 어깨뿔방지 논슬립 스틸 옷걸이'를 직접 구매해 보았습니다. 결론부터 말씀드리면, 왜 진작 옷걸이를 싹 바꾸지 않았나 후회될 정도로 옷장 삶의 질을 확 높여주는 완벽한 살림 혁명템입니다.\n\n가장 감동적인 부분은 역시 부드럽게 둥글려진 인체공학적 라인 설계입니다. 어깨선이 자연스럽게 둥글게 떨어져서 아무리 무거운 겨울 니트나 가디건을 오래 걸어두어도 어깨뿔이 전혀 생기지 않습니다. 게다가 옷걸이 전체에 쫀쫀한 논슬립 코팅 처리가 되어 있어서 목 파임이 깊은 블라우스나 미끄러운 실크 셔츠도 바닥으로 툭툭 떨어지는 일 없이 옷걸이에 찰착 붙어있습니다. 바쁜 아침마다 바닥에 떨어져 구겨진 옷을 줍느라 받던 스트레스가 완전히 사라졌어요.\n\n뿐만 아니라 얇고 견고한 스틸 소재로 만들어져서 옷장 부피를 거의 차지하지 않습니다. 두껍고 무거운 원목 옷걸이나 플라스틱 옷걸이를 썼을 때보다 옷장 수납공간이 최소 1.5배는 넉넉해진 기분이에요. 깔끔하고 화사한 화이트 컬러 30개 세트로 옷장을 싹 통일해서 걸어두니 드레스룸이 마치 깔끔한 편집샵처럼 환하고 정돈되어 보입니다. 어깨뿔 옷 망가짐과 늘 부족한 옷장 공간으로 고민이셨던 분들이라면, 당장 옷걸이부터 이 제품으로 싹 바꿔보시길 강력하게 추천드립니다!",
  imageUrl: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/awl3sumg/67fd33a5a2a64e82855c1a8fe2af42cb.jpg',
  additionalImages: [
    'https://blog.kakaocdn.net/dna/Nc5zX/btsJdr0f51O/AAAAAAAAAAAAAAAAAAAAALklZyasguu8nTV9cgON069Nxsly99Zk73DecQ4YzhlK/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=iPxAjVCUPlxpGDMCG5duCGsbYGI%3D',
    'https://blog.kakaocdn.net/dna/RqZUh/btsOiTrT5un/AAAAAAAAAAAAAAAAAAAAAF4-fkp1w3HxiQjnkL9m_vEfgiM6KFZ1Px1fkYAPFdDh/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=GsB0N%2FA5IE12HuXbhw38U3RIkA8%3D',
    'https://blog.kakaocdn.net/dna/NPNXt/btsNGhMkyzf/AAAAAAAAAAAAAAAAAAAAAOIQenhTsRX-eX42cm8bJ_NaExJzB8v36OeKhhw-bvhd/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=vA1VlRjtO5UZDJga2ugmNDJJ3d8%3D',
    'https://blog.kakaocdn.net/dna/AOs4g/btsJcV1QE9c/AAAAAAAAAAAAAAAAAAAAAJzOKl4HNrMzg-h6V6r5WUGayejw6Cad7tRUQG1bCJeS/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1782831599&allow_ip=&allow_referer=&signature=zyfOLZFjbhvtkrl9NN5LbF8rApk%3D'
  ],
  hashtags: [
    '#내돈내산리뷰',
    '#어깨뿔방지옷걸이',
    '#논슬립옷걸이',
    '#옷장정리'
  ],
  coupangLink: 'https://link.coupang.com/a/eycevydYwC',
  coupangIframe: '<iframe src="https://coupa.ng/cnpia8" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  category: "리뷰",
  subCategory: "생활",
  price: "10,000"
};

// Insert at the beginning
data.unshift(newItem);
fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
console.log('Added hanger to data.json');
