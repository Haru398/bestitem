const fs = require('node:fs');
const path = require('node:path');
const topics = require('./supplement-topics.cjs');
const { searchProducts, summarizeProduct } = require('../lib/coupang-partners-api.cjs');

const root = path.resolve(__dirname, '../..');
const file = path.join(root, 'content', 'scheduled', 'product-candidates.json');
const accessory = /(케이스|커버|필름|보호대|강화유리|파우치|스트랩|거치대|충전독|충전동|디지타이저|키스킨|스티커|마우스\s*피트|스케이트|교체용|호환|소모품|롤러브러시|롤러브러쉬|먼지봉투|리필|외부필터|면도날|클렌징\s*팟|메모리\s*카드|SD\s*카드|Care\s*Refresh|추가배터리|관세포함|일본어\s*설명서)/i;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalize = (value) => String(value || '').toLowerCase().replace(/[^0-9a-z가-힣]+/g, '');

function interleaveByCategory(items) {
  const categories = ['digital-pc', 'home-appliances', 'living-kitchen', 'fashion-beauty', 'outdoor-auto', 'pet-family'];
  const buckets = new Map(categories.map((category) => [category, items.filter((item) => item.category === category)]));
  const ordered = [];
  while (ordered.length < items.length) {
    let moved = false;
    for (const category of categories) {
      const next = buckets.get(category)?.shift();
      if (next) { ordered.push(next); moved = true; }
    }
    if (!moved) break;
  }
  return ordered;
}

function matches(name, required) {
  const haystack = normalize(name);
  return required.every((token) => haystack.includes(normalize(token)));
}

function excludes(name, forbidden = []) {
  const haystack = normalize(name);
  return forbidden.some((token) => haystack.includes(normalize(token)));
}

function liveProductIds() {
  const ids = new Set();
  const directory = path.join(root, 'content', 'posts');
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.json'))) {
    const post = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
    try {
      const id = new URL(post.affiliate?.url || '').searchParams.get('pageKey');
      if (id) ids.add(String(id));
    } catch {}
  }
  return ids;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const ids = liveProductIds();
  for (const item of data.selected) ids.add(String(item.productId));
  const existingQueries = new Set(data.selected.map((item) => item.query));
  const attemptedQueries = new Set(data.supplementAttemptedQueries || []);
  let added = 0;
  let rateLimited = false;
  const orderedTopics = interleaveByCategory(topics);
  for (const [index, topic] of orderedTopics.entries()) {
    if (data.selected.length >= 190) break;
    if (existingQueries.has(topic.query) || attemptedQueries.has(topic.query)) continue;
    try {
      const response = await searchProducts({ keyword: topic.query, limit: 10, root });
      const candidate = (response?.productData || []).map(summarizeProduct)
        .filter((item) => item.productId && item.productUrl && item.productImage)
        .filter((item) => !ids.has(String(item.productId)))
        .filter((item) => !accessory.test(item.productName))
        .filter((item) => matches(item.productName, topic.required))
        .filter((item) => !excludes(item.productName, topic.forbidden))[0];
      if (candidate) {
        const selected = { order: data.selected.length + 1, ...topic, ...candidate };
        data.selected.push(selected);
        ids.add(String(candidate.productId));
        existingQueries.add(topic.query);
        added += 1;
      } else {
        data.rejected.push({ ...topic, reason: '보충 검색에서 일치하는 본품 API 결과 없음' });
      }
      attemptedQueries.add(topic.query);
    } catch (error) {
      if (/시간당 사용 횟수|403/.test(error.message)) { rateLimited = true; break; }
      data.rejected.push({ ...topic, reason: error.message });
      attemptedQueries.add(topic.query);
    }
    if ((index + 1) % 20 === 0) console.log(`Supplement checked ${index + 1}/${orderedTopics.length}; added ${added}; total ${data.selected.length}`);
    await sleep(180);
  }
  data.selectedCount = data.selected.length;
  data.supplementAttemptedQueries = [...attemptedQueries];
  data.supplementedAt = new Date().toISOString();
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Supplement complete: ${added} added; ${data.selected.length} total; rateLimited=${rateLimited}.`);
  if (data.selected.length < 168) process.exitCode = 2;
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
