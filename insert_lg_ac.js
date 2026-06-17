const db = require('better-sqlite3')('dev.db');

const newPost = {
  id: 'item-' + Date.now(),
  category: '가전/디지털',
  subCategory: '계절가전',
  title: '[인테리어 완성] 압도적인 냉방력과 디자인, LG 휘센 오브제컬렉션 에어컨 완벽 리뷰',
  content: `무더운 여름을 앞두고 에어컨 교체를 고민 중이신가요? 단순한 냉방 기기를 넘어 우리 집 거실의 품격을 한 단계 높여줄 완벽한 가전, **'LG전자 인버터 56.9㎡(17.2평형) 휘센 오브제컬렉션 위너 1시리즈 스탠드형 에어컨'**을 소개합니다. 이 제품은 이름만으로도 신뢰감을 주는 LG전자의 최신 기술력과, 공간과 완벽하게 조화되는 오브제컬렉션의 미학이 결합된 최고의 명작입니다.

<img src="https://image.pollinations.ai/prompt/premium%20white%20tower%20air%20conditioner%20in%20a%20modern%20minimalist%20korean%20living%20room%20sunlight?width=800&height=600&nologo=true" alt="거실 인테리어 컷" style="width:100%; border-radius:8px; margin: 15px 0;"/>

가장 먼저 눈길을 사로잡는 것은 단연 **'오브제컬렉션의 공간 인테리어 디자인'**입니다. 기존의 투박하고 공간을 차지하기만 하던 에어컨의 모습을 완전히 탈피했습니다. 무광의 은은하고 고급스러운 텍스처와 미니멀한 라인은 어떤 거실 인테리어와도 이질감 없이 자연스럽게 스며듭니다. 에어컨을 사용하지 않는 계절에도 훌륭한 인테리어 오브제 역할을 톡톡히 해내어, 집안 분위기를 한층 모던하고 세련되게 만들어줍니다.

<img src="https://image.pollinations.ai/prompt/elegant%20freestanding%20air%20conditioner%20appliance%20next%20to%20a%20beige%20sofa%20in%20a%20bright%20apartment?width=800&height=600&nologo=true" alt="소파 옆 연출 컷" style="width:100%; border-radius:8px; margin: 15px 0;"/>

디자인만큼이나 뛰어난 것은 바로 본연의 임무인 **'강력한 냉방 성능'**입니다. 56.9㎡(17.2평형)의 넉넉한 냉방 면적을 커버하는 이 제품은, 폭염이 쏟아지는 한여름에도 거실 전체를 순식간에 알프스 산맥처럼 시원하게 만들어줍니다. 특히 듀얼 바람 제어 기술을 통해 차가운 바람이 사람에게 직접 닿지 않으면서도 공간 전체를 쾌적하게 쿨링해 주는 섬세함이 돋보입니다. 

<img src="https://image.pollinations.ai/prompt/close%20up%20of%20a%20sleek%20matte%20white%20air%20conditioner%20vent%20modern%20interior%20design?width=800&height=600&nologo=true" alt="디테일 및 토출구" style="width:100%; border-radius:8px; margin: 15px 0;"/>

여기에 빼놓을 수 없는 핵심 기술이 바로 **'듀얼 인버터 컴프레서'**입니다. 에어컨 구매 시 가장 걱정되는 것이 전기세인데, LG의 독자적인 고효율 인버터 기술 덕분에 하루 종일 쾌적함을 유지하면서도 전기료 부담을 획기적으로 낮췄습니다. 시원함은 타협하지 않으면서 지갑은 지켜주는 진정한 스마트 가전입니다.

<img src="https://image.pollinations.ai/prompt/tall%20cylindrical%20white%20air%20conditioner%20in%20a%20cozy%20bedroom%20with%20wood%20floors%20korean%20style?width=800&height=600&nologo=true" alt="침실 공간 연출 컷" style="width:100%; border-radius:8px; margin: 15px 0;"/>

또한 위생에 대한 걱정도 완벽하게 덜어줍니다. 에어컨 내부의 습기를 자동으로 건조해 주는 '자동 건조 기능'이 탑재되어 있어, 곰팡이나 세균 번식의 원인을 근본적으로 차단합니다. 끄고 켤 때마다 알아서 속까지 뽀송하게 관리해 주니 어린아이나 호흡기가 예민한 가족이 있는 집에서도 안심하고 사용할 수 있습니다.

<img src="https://image.pollinations.ai/prompt/modern%20smart%20home%20appliance%20tall%20white%20air%20conditioner%20in%20a%20luxury%20living%20space?width=800&height=600&nologo=true" alt="스마트홈 연출 컷" style="width:100%; border-radius:8px; margin: 15px 0;"/>

LG 휘센 오브제컬렉션 에어컨은 단순히 온도를 낮추는 기계가 아닙니다. 우리 가족의 쾌적한 라이프스타일을 책임지고 거실의 미학을 완성하는 최고의 선택입니다. 에어컨 대란이 일어나기 전, 지금 바로 하단의 공식 링크를 통해 LG전자의 프리미엄 가전을 만나보세요!`,
  price: '할인 특가 확인하기',
  imageUrl: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/159324837732705-489d5030-9876-460d-bcfc-630c0143809b.jpg',
  coupangIframe: '<iframe src="https://coupa.ng/cnsUUc" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>',
  views: 0
};

const stmt = db.prepare(`
  INSERT INTO posts (id, category, subCategory, title, content, price, imageUrl, coupangIframe, views)
  VALUES (@id, @category, @subCategory, @title, @content, @price, @imageUrl, @coupangIframe, @views)
`);

stmt.run(newPost);
console.log('Inserted LG AC post successfully');
