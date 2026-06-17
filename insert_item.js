const db = require('better-sqlite3')('dev.db');

const newPost = {
  id: 'item-' + Date.now(),
  category: '추천상품',
  subCategory: '신규',
  title: '[임시 제목] 쿠팡 추천 상품 (수정 요망)',
  content: '여기에 상품 설명을 입력해주세요.',
  price: '가격 정보 없음',
  imageUrl: '/images/placeholder.jpg',
  coupangIframe: '<iframe src="https://coupa.ng/cnsSMH" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  views: 0
};

const stmt = db.prepare(`
  INSERT INTO posts (id, category, subCategory, title, content, price, imageUrl, coupangIframe, views)
  VALUES (@id, @category, @subCategory, @title, @content, @price, @imageUrl, @coupangIframe, @views)
`);

stmt.run(newPost);
console.log('Inserted:', newPost.id);
