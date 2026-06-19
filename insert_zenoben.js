const db = require('./db_v2');

async function main() {
  const postId = 'POST-ZENOBEN';

  const coupangLink = "https://link.coupang.com/a/eHKUNkFJYq";
  const iframeTag = `<iframe src="https://coupa.ng/cnwi1r" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>`;
  
  const midLink = `<div style="text-align:center; margin: 30px 0;">\n${iframeTag}\n<br>\n<a href="${coupangLink}" target="_blank" style="font-size: 20px; font-weight: bold; color: #E52528; text-decoration: none;">👉 지금 바로 제노밴 최저가 확인하기!</a>\n</div>`;
  const bottomLink = `<div style="text-align:center; margin: 40px 0;">\n${iframeTag}\n<br>\n<a href="${coupangLink}" target="_blank" style="font-size: 22px; font-weight: bold; color: #E52528; text-decoration: none;">🔥 품절 임박! 제노밴 스팀청소기 구매하러 가기!</a>\n</div>`;

  const postData = {
    postId,
    userId: "1",
    coupangLink,
    title: "압도적인 스팀 살균의 신세계! 제노밴(ZENOBEN) 고압 스팀 청소기 솔직 리뷰 및 추천",
    summary: "찌든 때부터 보이지 않는 세균까지 한 번에 날려버리는 제노밴 고압 스팀 청소기. 왜 이 제품을 선택해야 하는지 완벽하게 분석해 드립니다.",
    intro: "지긋지긋한 기름때와 화장실 곰팡이, 언제까지 독한 화학 세제로 문지르실 건가요?\n\n매번 청소할 때마다 손목이 아프고 독한 락스 냄새에 머리가 지끈거렸던 경험, 다들 있으실 겁니다. 특히 아이나 반려동물이 있는 집이라면 독한 세제를 마음 놓고 쓰기도 찝찝하죠. 그 모든 고민을 단번에 해결해 줄 혁신적인 청소템, 바로 제노밴 스팀 청소기입니다.",
    outro: bottomLink + "\n\n마무리하며, 청소의 패러다임을 바꿔줄 제노밴 스팀 청소기! 우리 집의 위생과 가족의 건강을 위해 더 이상 망설일 필요가 없습니다. 강력한 살균력과 편리함을 직접 경험해보세요.",
    thumbnail: "/images/zenoben/썸네일.png",
    status: "LOCAL_UPLOADED",
    version: 1,
    sections: [
        { sectionOrder: 1, image: "/images/zenoben/1.png", text: "### 100도 이상의 초고온 스팀으로 완성하는 99.9% 완벽 살균\n\n제노밴의 가장 큰 무기는 단순한 청소를 넘어선 '살균력'입니다. 100도 이상의 초고온 고압 스팀이 분사되어, 눈에 보이는 찌든 때는 물론이고 보이지 않는 유해 세균과 집먼지 진드기까지 99.9% 완벽하게 살균합니다. 화학 세제 없이 오직 순수한 물만으로 이 정도의 세정력을 보여준다는 것은 정말 놀라운 기술력입니다." },
        { sectionOrder: 2, image: "/images/zenoben/2.png", text: "### 직관적이고 편리한 다이얼 조작과 넉넉한 수조 용량\n\n본체 중앙에 위치한 다이얼을 통해 스팀 분사량을 1단계부터 6단계까지 미세하게 조절할 수 있습니다. 묵은 때를 벗겨낼 때는 강한 스팀으로, 약한 소재의 바닥이나 장난감을 살균할 때는 부드러운 스팀으로 맞춤형 청소가 가능하죠. 전면부의 수위 확인창을 통해 물이 얼마나 남았는지 직관적으로 볼 수 있어 사용자의 편의성을 극대화했습니다." },
        { sectionOrder: 3, image: "/images/zenoben/3.png", text: midLink + "\n\n### 가벼운 무게와 인체공학적 노즐 설계의 완벽한 조화\n\n청소기는 무조건 가벼워야 손이 자주 갑니다. 제노밴은 본체가 콤팩트하고 손잡이가 달려 있어 집안 곳곳을 이동하며 청소하기에 전혀 무리가 없습니다. 특히 길고 유연한 주름 호스와 그립감이 뛰어난 분사 노즐은 손목의 피로도를 최소화하여, 장시간 청소해도 부담이 없습니다." },
        { sectionOrder: 4, image: "/images/zenoben/4.png", text: "### 다양한 노즐 활용으로 집안 구석구석을 새집처럼!\n\n제노밴 스팀 청소기는 주방의 후드 기름때, 욕실 타일 틈새의 곰팡이, 거실 바닥, 심지어 아이들 장난감과 패브릭 소파까지 모든 곳에 활용 가능합니다. 다른 타사 제품들을 보면 스팀 압력이 약해서 겉핥기식 청소에 그치는 경우가 많은데, 제노밴은 강력하고 일정한 압력을 뿜어내어 속 시원한 청소 경험을 선사합니다." },
        { sectionOrder: 5, image: "/images/zenoben/5.png", text: "### 잔고장 없는 탄탄한 내구성과 빠른 예열 시간\n\n구형 모델이나 타사의 저가형 제품들은 스팀 예열 시간이 길거나 물이 줄줄 새는 잔고장이 많습니다. 하지만 제노밴은 빠르고 안정적인 스팀을 제공하여 청소 대기 시간을 획기적으로 줄여줍니다. 단단한 마감 처리와 직관적인 인터페이스는 오랫동안 믿고 쓸 수 있는 신뢰감을 줍니다." },
        { sectionOrder: 6, image: "/images/zenoben/6.png", text: "### 왜 하필 지금 제노밴을 사야 할까요? (구매 명분 제공)\n\n시중에는 정말 많은 스팀 청소기가 있지만, 제노밴처럼 강력한 고압 스팀 성능과 직관적인 편의성, 그리고 내구성을 동시에 갖춘 제품은 찾기 힘듭니다. 가성비와 성능을 모두 잡은 역대급 아이템으로, 지금 당장 삶의 질을 수직 상승시킬 수 있는 최고의 투자입니다. 청소 스트레스에서 영원히 해방되세요!" }
    ]
  };

  // 기존 글 생성
  try {
    await db.post.create({ postId, userId: "1", coupangLink, category: "청소기", title: postData.title });
  } catch (e) {
    // 무시 (이미 존재)
  }

  // 전체 저장
  await db.post.save(postId, postData);
  await db.post.setStatus(postId, 'LOCAL_UPLOADED');

  console.log('✅ 제노밴 포스트 생성 완료! http://localhost:3000/post/POST-ZENOBEN');
}

main().catch(console.error);
