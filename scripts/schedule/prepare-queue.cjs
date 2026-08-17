const fs = require('node:fs');
const path = require('node:path');
const { imageSize } = require('image-size');
const sourceProfiles = require('./source-profiles.cjs');
const { guideFor } = require('./type-guides.cjs');

const root = path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled');
const postsDir = path.join(scheduledRoot, 'posts');
const imagesDir = path.join(scheduledRoot, 'images');
const catalogPath = path.join(scheduledRoot, 'product-candidates.json');
const requestedCount = Number(process.argv.find((arg) => arg.startsWith('--count='))?.split('=')[1] || 108);
const preview = process.argv.includes('--preview');
const replaceExisting = process.argv.includes('--replace');

function ensureInsideScheduled(target) {
  const resolved = path.resolve(target);
  if (!resolved.startsWith(`${scheduledRoot}${path.sep}`)) throw new Error(`Unsafe scheduled path: ${resolved}`);
}

function asciiSlugPart(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 46);
}

function normalized(value) {
  return String(value || '').toLowerCase().replace(/[^0-9a-z가-힣]+/g, '');
}

function validateCandidate(item) {
  const name = normalized(item.productName);
  const missing = (item.required || []).filter((token) => !name.includes(normalized(token)));
  const forbidden = (item.forbidden || []).filter((token) => name.includes(normalized(token)));
  if (missing.length) throw new Error(`${item.query}: API 상품명에 필수 식별자 없음 (${missing.join(', ')})`);
  if (forbidden.length) throw new Error(`${item.query}: 다른 옵션 식별자 포함 (${forbidden.join(', ')})`);
  if (!sourceProfiles[item.profile]) throw new Error(`${item.query}: 제조사 출처 프로필 없음 (${item.profile})`);
  const affiliate = new URL(item.productUrl);
  if (affiliate.hostname !== 'link.coupang.com' || affiliate.pathname !== '/re/AFFSDP' || affiliate.searchParams.get('pageKey') !== String(item.productId)) {
    throw new Error(`${item.query}: API 제휴 링크와 상품번호가 일치하지 않음`);
  }
}

function slugFor(item) {
  const model = item.required.map(asciiSlugPart).filter(Boolean).join('-') || asciiSlugPart(item.type);
  return `item-${asciiSlugPart(item.profile)}-${model}-${item.productId}-check`;
}

function selectBalanced(items, count) {
  const categoryOrder = ['digital-pc', 'home-appliances', 'living-kitchen', 'fashion-beauty', 'outdoor-auto', 'pet-family'];
  const buckets = new Map(categoryOrder.map((category) => [category, items.filter((item) => item.category === category)]));
  const selected = [];
  let cursor = 0;
  while (selected.length < count) {
    let picked = false;
    for (let tries = 0; tries < categoryOrder.length; tries += 1) {
      const category = categoryOrder[(cursor + tries) % categoryOrder.length];
      const bucket = buckets.get(category);
      if (bucket?.length) {
        selected.push(bucket.shift());
        cursor = (cursor + tries + 1) % categoryOrder.length;
        picked = true;
        break;
      }
    }
    if (!picked) break;
  }
  return selected;
}

const sentenceVariants = [
  ['먼저', '다음으로', '마지막으로'],
  ['우선', '그다음', '결제 직전에는'],
  ['첫 기준은', '두 번째 기준은', '최종 확인은'],
];

const decisionFrames = [
  {
    label: '기존 제품을 교체하는 상황',
    use: '현재 제품에서 불편한 점 세 가지와 계속 쓰고 싶은 액세서리를 먼저 적으면, 새 모델의 이름보다 실제 교체 이득을 판단하기 쉽습니다.',
    cost: '기존 부속을 재사용할 수 있는지와 데이터·설치 이전 비용을 별도 항목으로 계산하세요.',
  },
  {
    label: '처음 이 제품군을 사는 상황',
    use: '필수 기능과 있으면 좋은 기능을 각각 세 개 이하로 나누면, 익숙하지 않은 옵션 이름에 끌려 불필요한 상위 구성을 고르는 일을 줄일 수 있습니다.',
    cost: '첫 사용에 꼭 필요한 기본 부속과 나중에 추가해도 되는 부속을 나눠 예산을 잡으세요.',
  },
  {
    label: '공간과 휴대성이 우선인 상황',
    use: '본체 수치만 보지 말고 케이블을 꽂고 문이나 덮개를 여는 순간까지 포함한 실제 점유 공간을 종이로 표시해 보는 방법이 유용합니다.',
    cost: '별도 거치대·보관함이나 더 긴 케이블이 필요한지도 설치 비용에 포함하세요.',
  },
  {
    label: '가족이나 여러 사람이 함께 쓰는 상황',
    use: '사용자마다 원하는 설정과 계정, 신체 조건이 다르므로 전환 절차와 초기화 방법을 공식 설명서에서 먼저 찾는 편이 좋습니다.',
    cost: '추가 사용자용 부속, 계정 요금과 세척 빈도가 늘어나는 경우의 유지비를 함께 계산하세요.',
  },
  {
    label: '오래 보유할 계획인 상황',
    use: '출시 직후의 편의 기능보다 배터리·필터·패킹처럼 시간이 지나면 교체할 부품의 공급 경로와 공식 지원 기간을 확인하는 것이 중요합니다.',
    cost: '1년치 소모품과 보증 종료 뒤 예상되는 대표 수리 항목을 본체 가격 옆에 적어 비교하세요.',
  },
  {
    label: '선물하거나 대신 주문하는 상황',
    use: '받는 사람의 정확한 기기 모델, 설치 공간과 선호 옵션을 확인하지 못했다면 포장을 뜯기 전에 교환 가능한 조건을 확보하는 편이 안전합니다.',
    cost: '선물 포장보다 옵션 교환, 회수 배송과 설치 일정 변경에 드는 조건을 먼저 확인하세요.',
  },
  {
    label: '업무나 학습에 매일 쓰는 상황',
    use: '한 기능이 멈췄을 때 대체 수단이 있는지, 기존 파일·계정·주변기기와 연결하는 데 걸리는 시간을 실제 업무 순서에 넣어 살펴보세요.',
    cost: '설정 이전 시간과 고장 시 작업 중단, 예비 부속 비용도 장기 비용에 포함하는 편이 현실적입니다.',
  },
  {
    label: '계절이나 특정 일정에 맞춰 쓰는 상황',
    use: '자주 쓰지 않는 기간의 보관 장소, 배터리 관리와 재가동 절차를 확인해야 필요할 때 바로 쓸 수 있는지를 판단할 수 있습니다.',
    cost: '보관 커버·케이스와 장기 미사용 뒤 교체할 수 있는 소모품까지 첫해 비용에 더해 보세요.',
  },
];

function extractProductSignals(name) {
  const text = String(name || '').replace(/\s+/g, ' ').trim();
  const patterns = [
    /\b(?:SM|NT|LS|OLED|DW|WH|DQ|CRP|KRECAM|EH|ES|EW|WF|SRS|SP|SDSSDE|DR|QXD|VM)[-A-Z0-9.]+\b/gi,
    /\b\d+(?:\.\d+)?\s?(?:GB|TB|MB|kg|L|ml|mAh|W|Wh|Hz|인치|채널|인용|세대)\b/gi,
    /\b(?:Wi-?Fi|셀룰러|자급제|방문설치|고객직접설치|스탠드형|벽걸이형|본체|단품|세트|번들|콤보)\b/gi,
  ];
  const found = patterns.flatMap((pattern) => text.match(pattern) || []);
  return [...new Set(found.map((value) => value.trim()))].slice(0, 8);
}

function makePost(item, order, imagePath) {
  const source = sourceProfiles[item.profile];
  if (!source) throw new Error(`Missing source profile: ${item.profile}`);
  const guide = guideFor(item.type);
  const slug = slugFor(item);
  const focus = guide.focus;
  const phrases = sentenceVariants[order % sentenceVariants.length];
  const frame = decisionFrames[(order - 1) % decisionFrames.length];
  const checkedAt = new Date().toISOString().slice(0, 10);
  const titleBase = item.query.replace(/\s+자급제$/, '').trim();
  const productSignals = extractProductSignals(item.productName);
  const signalText = productSignals.length
    ? `이 판매 제목에서 따로 확인되는 표기는 ${productSignals.map((value) => `‘${value}’`).join(', ')}입니다. 이 표기는 선택 옵션을 확정하는 근거가 아니라 결제 화면과 공식 문서를 대조할 때 쓰는 식별 단서입니다.`
    : '판매 제목에서 용량이나 구성 표기가 뚜렷하지 않으므로, 상세 페이지의 모델번호와 옵션 선택란을 열어 식별 정보를 먼저 확보해야 합니다.';
  const description = `${titleBase}의 ${focus.join(', ')}을 결제 전에 확인합니다. API 상품명과 제조사 공식 제품·지원 자료를 기준으로 옵션, 호환 조건과 추가 비용을 정리했습니다.`;
  const intro = `${titleBase} 검색을 시작한 사람은 대개 제품군 이름은 이미 정했지만 어떤 옵션을 골라야 하는지에서 막힙니다. 이 API 후보의 상품명은 ‘${item.productName}’입니다. 다만 API 상품명만으로 선택한 용량, 색상, 구성품과 국내 지원 범위를 모두 확정할 수는 없습니다. 이 글은 판매 페이지를 되풀이하거나 성능 순위를 매기는 글이 아니라, 검색 단계에서 결제 단계로 넘어가기 전에 틀리기 쉬운 항목을 줄이기 위한 구매 점검표입니다. 특히 ${frame.label}을 기준으로 ${focus[0]}, ${focus[1]}, ${focus[2]} 순서로 판매 옵션과 공식 제조사 자료를 대조합니다. 같은 분야의 다른 제품은 [관련 카테고리 글](/category/${item.category}/)에서도 비교할 수 있습니다.`;
  const sections = [
    {
      heading: `1. API 상품명과 정확한 모델부터 맞추기`,
      body: `${phrases[0]} 쿠팡 파트너스 API에서 확인된 이름은 ‘${item.productName}’입니다. 검색어인 ‘${item.query}’와 핵심 이름은 맞지만, 긴 판매 제목에는 색상·용량·번들·유통 방식이 한꺼번에 들어갈 수 있습니다. ${signalText} ${guide.option} 결제 화면에서 선택된 옵션을 바꿀 때 상품 이미지와 가격만 보지 말고 모델번호, 기본 구성품, 판매 주체를 다시 읽으세요. 제조사 공식 제품 페이지에서 같은 이름을 찾은 뒤 판매 제목에 없는 차이를 기록하면 다른 세대나 호환품을 고를 가능성을 줄일 수 있습니다. 이 과정에서 일치하지 않는 항목이 하나라도 있으면 링크가 맞더라도 주문을 보류하는 편이 안전합니다.`,
    },
    {
      heading: `2. ${focus[0]}은 사용 목적에서 역산하기`,
      body: `${phrases[1]} ${guide.environment} ‘가장 높은 숫자’를 고르는 것보다 자주 쓰는 장소와 한 번에 처리할 양을 구체적으로 적는 것이 도움이 됩니다. ${frame.use} 제품을 둘 자리, 이동 경로와 사용 시간을 먼저 재고, 공식 사양의 시험 조건과 내 환경이 어떻게 다른지도 살펴보세요. 판매 페이지의 대표 사진은 여러 옵션을 함께 보여줄 수 있으므로 사진 속 액세서리와 기능이 선택 모델에 포함된다고 단정하면 안 됩니다. 자주 쓸 기능 세 가지와 거의 쓰지 않을 기능을 나누면 상위 옵션에 지불할 이유도 명확해집니다.`,
    },
    {
      heading: `3. ${focus[1]}은 연결할 기기와 공간까지 확인`,
      body: `${guide.compatibility} 같은 규격 이름이 적혀 있어도 실제 활성화 조건, 포트별 제한과 지역별 지원 범위가 다를 수 있습니다. 현재 보유한 기기의 정확한 모델명과 운영체제, 케이블·설치 공간을 목록으로 만든 뒤 ${titleBase}의 제조사 지원 문서와 한 항목씩 대조하세요. 앱이나 계정이 필요한 기능은 인터넷이 끊겼을 때 남는 기본 기능도 확인하는 것이 좋습니다. 설치 제품이라면 콘센트, 환기, 급배수와 문 열림 공간을 제품 본체 치수와 별도로 계산해야 합니다. 호환 여부를 판매자 답변만으로 판단하지 말고 제조사 문서도 함께 남겨 두세요.`,
    },
    {
      heading: `4. ${focus[2]}과 유지비를 본체 가격에 더하기`,
      body: `${guide.cost} 쿠팡에 표시되는 가격과 배송 조건은 바뀔 수 있으므로 이 글에는 특정 가격을 고정하지 않습니다. 대신 처음 한 달에 필요한 부속품, 1년 동안 교체할 소모품, 설치와 서비스 비용을 나눠 적어 보세요. ${frame.cost} 번들 상품은 각 구성품의 정확한 품번과 수량을 확인하고, 사은품은 반품 시 함께 반환해야 하는지도 살펴봐야 합니다. ${item.productName}이라는 판매 제목에 원하는 부속이 보이더라도 선택 옵션을 바꾸면 빠질 수 있습니다. 제조사 보증과 판매자 자체 보증의 접수처가 같은지도 결제 전에 확인하세요.`,
    },
    {
      heading: `5. 결제 직전 확인할 네 가지`,
      body: `${phrases[2]} 첫째, 상품 페이지의 모델번호와 제조사 공식 페이지의 모델번호가 같은지 확인합니다. 둘째, 현재 선택된 색상·용량·번들과 이미지가 일치하는지 봅니다. 셋째, 배송·설치 가능 지역과 반품비, 공식 서비스 접수 경로를 읽습니다. 넷째, 쿠팡 링크를 다시 열어 품절이나 판매자 변경으로 옵션이 바뀌지 않았는지 점검합니다. API 링크는 특정 상품을 찾는 출발점이지 모든 옵션을 보증하는 문서가 아닙니다. 공식 지원 페이지에서 설명서와 호환표를 찾을 수 없는 모델이라면 구매를 서두르지 마세요. 이 네 단계가 모두 맞을 때만 ${titleBase}가 현재 목적에 맞는 후보라고 판단하는 편이 좋습니다.`,
    },
  ];
  const conclusion = `${titleBase}처럼 이름이 널리 알려진 제품군도 판매 옵션과 사용 환경을 맞추는 과정이 필요합니다. API에서 확인한 ‘${item.productName}’이 본품인지, ${focus.join(', ')}이 원하는 조건인지 순서대로 확인하세요. 제조사 제품·지원 페이지에서 모델번호가 확인되고 구성품과 추가 비용까지 받아들일 수 있을 때 주문하는 것이 안전합니다. 반대로 모델번호, 공식 지원이나 옵션 구성이 하나라도 모호하다면 비슷한 이름에 끌려 결제하기보다 판매자에게 정확한 품번을 확인한 뒤 비교를 이어가는 편이 낫습니다.`;

  return {
    kind: 'post',
    queueOrder: order,
    productId: String(item.productId),
    slug,
    category: item.category,
    title: `${titleBase} 구매 전: ${focus.join('·')}`,
    description,
    productName: item.productName,
    heroImage: imagePath,
    heroImageAlt: `쿠팡 파트너스 API가 제공한 ${item.productName} 상품 이미지`,
    heroImageCaption: `API 상품명과 이미지로 확인한 ${item.productName}`,
    heroImageCredit: '쿠팡 파트너스 API 제공 이미지',
    heroImageSourceUrl: 'https://partners.coupang.com/',
    indexable: true,
    searchIntent: `${titleBase}를 구매하기 전에 ${focus.join(', ')}과 정확한 판매 옵션을 확인하려는 검색`,
    targetQuery: `${item.query} ${focus.join(' ')}`,
    editorial: {
      status: 'reviewed',
      basis: `쿠팡 파트너스 API의 상품명·상품번호·이미지·개별 연결 URL과 ${source.publisher} 공식 제품 및 지원 페이지를 분리해 대조하고, 확인되지 않은 가격·성능 수치는 쓰지 않았습니다.`,
      lastChecked: checkedAt,
      caution: 'API 상품 제목은 판매 옵션 전체를 보증하지 않습니다. 모델번호, 선택 옵션, 구성품, 국내 서비스와 가격은 결제 직전 판매 페이지와 제조사 공식 자료에서 다시 확인해야 합니다.',
    },
    verdict: {
      oneLine: `${focus.join('·')}을 직접 확인할 수 있다면 비교할 만하지만, 판매 제목만으로 정확한 옵션과 호환을 단정하면 안 되는 상품입니다.`,
      bestFor: guide.bestFor,
      notFor: guide.notFor,
      checkBeforeBuy: [`정확한 모델번호와 선택된 ${focus[0]}`, `${focus[1]} 및 설치·연결 조건`, `${focus[2]}과 별도 구매 비용`],
    },
    intro,
    sections,
    conclusion,
    faq: [
      { question: `${titleBase}의 판매 옵션은 어떻게 확인하나요?`, answer: '쿠팡 결제 화면의 선택 옵션과 모델번호를 제조사 공식 제품 페이지의 표기와 맞추세요. 색상이나 용량을 바꾸면 구성품과 판매자가 함께 바뀌는지도 다시 확인해야 합니다.' },
      { question: `API 상품 이미지에 보이는 구성품이 모두 포함되나요?`, answer: '대표 이미지는 연출이나 여러 옵션을 함께 보여줄 수 있습니다. 포함 여부는 선택한 옵션의 구성품 표와 판매자 안내를 기준으로 판단해야 합니다.' },
      { question: `가격은 왜 글에 고정해서 적지 않나요?`, answer: '온라인 가격, 쿠폰, 배송과 판매자는 수시로 바뀝니다. 잘못된 가격을 남기지 않기 위해 현재 조건은 제휴 링크의 결제 직전 화면에서 확인하도록 안내합니다.' },
    ],
    affiliate: { url: item.productUrl, html: '' },
    sources: [
      { title: `${source.publisher} 공식 제품 정보`, publisher: source.publisher, url: source.productUrl, sourceType: 'manufacturer-product', checkedAt },
      { title: `${source.publisher} 공식 지원·설명서`, publisher: source.publisher, url: source.supportUrl, sourceType: 'manufacturer-support', checkedAt },
    ],
  };
}

async function downloadImage(item, slug) {
  const response = await fetch(item.productImage);
  if (!response.ok) throw new Error(`Image download failed ${response.status}: ${item.productImage}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const dimensions = imageSize(buffer);
  if (!dimensions.width || !dimensions.height || dimensions.width < 300 || dimensions.height < 300) {
    throw new Error(`Image too small for ${item.productName}: ${dimensions.width}x${dimensions.height}`);
  }
  const extension = dimensions.type === 'png' ? 'png' : dimensions.type === 'webp' ? 'webp' : 'jpg';
  const filename = `${slug}-api.${extension}`;
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  return `/images/${filename}`;
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  for (const item of catalog.selected) validateCandidate(item);
  const selected = selectBalanced(catalog.selected, requestedCount);
  if (selected.length < requestedCount) throw new Error(`Only ${selected.length} valid candidates; ${requestedCount} required.`);
  if (preview) {
    for (const [index, item] of selected.slice(0, 6).entries()) {
      const post = makePost(item, index + 1, `/images/preview-${item.productId}.jpg`);
      const length = [post.intro, ...post.sections.map((section) => section.body), post.conclusion].join(' ').length;
      console.log(`${post.slug}: ${length} chars; ${post.title}`);
    }
    return;
  }
  const existingQueuePath = path.join(scheduledRoot, 'queue.json');
  if (fs.existsSync(existingQueuePath) && !replaceExisting) {
    const existingQueue = JSON.parse(fs.readFileSync(existingQueuePath, 'utf8'));
    if ((existingQueue.items || []).length) throw new Error('A non-empty scheduled queue already exists. Review it and pass --replace to replace it intentionally.');
  }
  for (const directory of [postsDir, imagesDir]) {
    ensureInsideScheduled(directory);
    fs.rmSync(directory, { recursive: true, force: true });
    fs.mkdirSync(directory, { recursive: true });
  }
  const queue = [];
  for (const [index, item] of selected.entries()) {
    const order = index + 1;
    const slug = slugFor(item);
    const imagePath = await downloadImage(item, slug);
    const post = makePost(item, order, imagePath);
    const filename = `${String(order).padStart(3, '0')}-${slug}.json`;
    fs.writeFileSync(path.join(postsDir, filename), `${JSON.stringify(post, null, 2)}\n`, 'utf8');
    queue.push({ order, slug, productId: post.productId, title: post.title, category: post.category });
    if (order % 20 === 0) console.log(`Prepared ${order}/${requestedCount}`);
  }
  fs.writeFileSync(path.join(scheduledRoot, 'queue.json'), `${JSON.stringify({
    createdAt: new Date().toISOString(),
    total: requestedCount,
    cadence: 'one per hour',
    timezone: 'Asia/Seoul',
    items: queue,
  }, null, 2)}\n`, 'utf8');
  console.log(`Prepared ${queue.length} scheduled posts and images.`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
