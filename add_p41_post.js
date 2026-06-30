const db = require('./db_v2');

async function main() {
  const postId = await db.generatePostId();
  console.log('Generated postId:', postId);

  // 1. Create Post
  await db.prisma.post.create({
    data: {
      postId,
      status: 'LOCAL_UPLOADED',
      category: '컴퓨터/PC부품',
      title: 'SK하이닉스 P41 방열판 꼭 필요한가? 발열 원인 및 메인보드 호환성 완벽 가이드',
      summary: '최고 성능의 PCIe 4.0 SSD인 SK하이닉스 P41. 방열판 없이 써도 될까요? 발열 원인, 메인보드 호환성, 노트북 장착 시 주의사항까지 완벽하게 정리했습니다.',
      intro: `게이머와 작업자들 사이에서 '끝판왕'이라 불리는 PCIe 4.0 SSD가 있습니다. 바로 **SK하이닉스 PLATINUM P41 M.2 NVMe**입니다. 최대 읽기 속도 7,000MB/s를 자랑하며, 안정성 면에서도 검증된 최고의 제품입니다.

하지만 P41을 구매하려는 많은 분들이 가장 먼저 부딪히는 고민이 있습니다. 
*"성능이 좋은 만큼 발열이 심하다던데, 방열판을 필수로 달아야 할까?"*

오늘의 전문가이드에서는 단순히 P41의 성능을 나열하는 것을 넘어, **어떤 환경에서 방열판이 필수이고 어떤 환경에서는 필요 없는지**, 여러분의 시스템 환경에 맞춘 정확한 선택 기준을 제시해 드립니다.`,
      outro: `**SK하이닉스 PLATINUM P41**은 현존하는 최고의 PCIe 4.0 SSD 중 하나입니다. 하지만 그 압도적인 성능을 유지하려면 적절한 온도 관리가 필수적입니다. 메인보드에 기본 방열판이 있다면 즉시 구매하셔도 좋고, 없다면 저렴한 사제 방열판을 묶어서 구매하시는 것을 강력히 권장합니다.

**✅ 이런 분들께 강력 추천합니다:**
* 로딩 없는 쾌적한 고사양 게이밍 환경을 원하시는 분
* 4K 이상 고해상도 영상 편집이나 3D 렌더링을 하시는 분
* 한 번 사서 잔고장 없이(AS 걱정 없이) 오래 쓸 메인 드라이브가 필요하신 분`,
      thumbnail: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/58c3/222b9b788ccdf81862cd5d779bd44421d01bb3dc1791a03bd6b7617bba0b.jpg',
      coupangLink: 'https://link.coupang.com/a/cnKAZ1',
      coupangHtml: '<iframe src="https://coupa.ng/cnKAZ1" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>'
    }
  });

  // 2. Add Sections
  const sections = [
    {
      sectionOrder: 1,
      text: `### 1. PCIe 4.0 SSD는 왜 유독 뜨거울까?\n\nSK하이닉스 P41과 같은 PCIe 4.0 기반의 NVMe SSD는 기존 PCIe 3.0(예: P31)보다 대역폭이 두 배 넓습니다. 더 많은 데이터를, 더 빠른 속도로 칩셋과 컨트롤러가 처리하다 보니 필연적으로 온도가 급상승하게 됩니다.\n\n일반적인 대용량 파일 이동이나 최신 고사양 게임 로딩 시, 컨트롤러의 온도는 순식간에 70도~80도 이상으로 치솟을 수 있습니다.\n\n**스로틀링(Throttling) 현상**\nSSD 온도가 일정 수준(보통 80도 부근)을 넘어가면, SSD는 스스로를 보호하기 위해 강제로 성능을 낮춥니다. 이를 **'스로틀링'**이라고 부릅니다. 비싼 돈을 주고 P41을 구매했는데 스로틀링이 걸리면, 속도가 절반 이하로 뚝 떨어져 일반 SATA SSD보다 못한 답답함을 겪게 됩니다.`
    },
    {
      sectionOrder: 2,
      text: `### 2. 방열판이 '필수'인 사용 환경\n\n그렇다면 무조건 방열판을 사야 할까요? 아래의 환경에 해당한다면 방열판 장착은 선택이 아닌 필수입니다.\n\n**이런 분들은 반드시 방열판을 사용하세요!**\n1. **통풍이 잘 안되는 미니 ITX 케이스 사용자:** 내부 공기 순환이 부족하여 SSD 주변에 뜨거운 공기가 머뭅니다.\n2. **메인보드 자체 방열판이 없는 보급형(A620, H610 등) 보드 사용자:** M.2 슬롯이 그래픽카드(GPU) 바로 아래에 위치한 경우, GPU의 뜨거운 열기를 그대로 맞게 됩니다.\n3. **영상 편집 및 대용량 렌더링 작업자:** 수백 GB의 파일을 쉼 없이 읽고 쓰는 환경에서는 10분만 지나도 스로틀링이 발생할 수 있습니다.\n4. **PS5(플레이스테이션 5) 확장 스토리지 용도:** 소니(Sony)에서도 PS5에 M.2 SSD 장착 시 방열판 사용을 공식적으로 강력히 권장하고 있습니다.`
    },
    {
      sectionOrder: 3,
      text: `### 3. 방열판 없이 써도 괜찮은 환경\n\n반대로 방열판 없이 P41의 기본 부착된 그래핀 방열 스티커만으로도 충분한 분들도 있습니다.\n\n* **중급기 이상 메인보드(B650, Z790 등) 사용자:** 최근 출시되는 중·고급형 메인보드에는 이미 두꺼운 'M.2 아머(기본 방열판)'가 덮여 있습니다. 이 경우 P41을 그대로 꽂고 메인보드의 방열판을 덮어주면 끝입니다.\n* **간단한 캐주얼 게임 및 사무용:** 고사양 작업 없이 롤(LoL)이나 피파, 웹서핑 정도만 한다면 P41이 한계 온도까지 갈 일이 거의 없습니다.\n\n**⚠️ 노트북 장착 시 주의사항**\n노트북은 내부 공간이 매우 협소합니다. 데스크탑용 사제 방열판을 부착하면 노트북 하판이 안 닫히는 대참사가 발생합니다. 노트북에 P41을 장착할 경우, 얇은 '구리 방열판'이나 서멀 패드만 부착하여 사용하는 것을 권장합니다. (발열이 걱정된다면 저전력/저발열 모델인 P31이 더 나은 선택일 수 있습니다.)`
    },
    {
      sectionOrder: 4,
      text: `### 4. 메인보드 슬롯 위치에 따른 장착 팁\n\nP41을 100% 활용하려면 M.2 슬롯의 위치도 중요합니다.\n대부분의 메인보드는 CPU와 가장 가까운 M.2 슬롯(보통 1번 슬롯)이 CPU와 직결되어 있어 속도 손실이 가장 적습니다. 가급적 **CPU와 그래픽카드 사이에 있는 1번 슬롯**에 장착하세요.`
    },
    {
      sectionOrder: 5,
      text: `### FAQ: 자주 묻는 질문\n\n**Q1. 기존에 붙어있는 스티커를 떼고 방열판을 붙여야 하나요?**\n절대 안 됩니다. SK하이닉스 P41 겉면에 붙은 스티커는 일반 종이가 아니라 '그래핀 방열 스티커'이며, 떼어낼 경우 제품 보증(AS)이 무효화됩니다. 스티커 위에 그대로 서멀 패드와 방열판을 덮으시면 됩니다.\n\n**Q2. P41과 990 PRO 중 어떤 게 덜 뜨겁나요?**\n두 제품 모두 PCIe 4.0 최상위 라인업으로 발열량은 비슷합니다. 어떤 제품을 선택하시든 쿨링 솔루션은 동일하게 신경 쓰셔야 합니다.`
    }
  ];

  for (const s of sections) {
    await db.prisma.postSection.create({
      data: {
        postId,
        sectionOrder: s.sectionOrder,
        text: s.text,
        image: '',
        imageAlt: '',
        qualityScore: 10
      }
    });
  }

  console.log('Post added successfully!');
  await db.disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
