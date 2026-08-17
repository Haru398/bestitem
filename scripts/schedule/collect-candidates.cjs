const fs = require('node:fs');
const path = require('node:path');
const topics = require('./product-topics.cjs');
const { searchProducts, summarizeProduct } = require('../lib/coupang-partners-api.cjs');

const root = path.resolve(__dirname, '../..');
const outputPath = path.join(root, 'content', 'scheduled', 'product-candidates.json');
const blockedAccessory = /(케이스|커버|필름|보호대|보호필름|강화유리|파우치|스트랩|거치대|충전독|리모컨|부품|브러시|먼지봉투|리필|호환용|중고|리퍼)/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const normalized = (value) => String(value || '').toLowerCase().replace(/[^0-9a-z가-힣]+/g, '');

function existingProductIds() {
  const directory = path.join(root, 'content', 'posts');
  const ids = new Set();
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.json'))) {
    const post = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
    try {
      const url = new URL(post.affiliate?.url || '');
      const id = url.searchParams.get('pageKey');
      if (id) ids.add(String(id));
    } catch {}
  }
  return ids;
}

function matchRequired(productName, required) {
  const haystack = normalized(productName);
  return required.every((token) => haystack.includes(normalized(token)));
}

function scoreProduct(product, topic) {
  const haystack = normalized(product.productName);
  const queryTokens = topic.query.split(/\s+/).map(normalized).filter((token) => token.length > 1);
  return queryTokens.reduce((score, token) => score + (haystack.includes(token) ? token.length : 0), 0)
    + (product.isRocket ? 3 : 0)
    + (product.isFreeShipping ? 1 : 0);
}

async function main() {
  const used = existingProductIds();
  const selected = [];
  const rejected = [];

  for (const [index, topic] of topics.entries()) {
    try {
      const data = await searchProducts({ keyword: topic.query, limit: 10, root });
      const products = (data?.productData || []).map(summarizeProduct)
        .filter((product) => product.productId && product.productUrl && product.productImage)
        .filter((product) => !used.has(String(product.productId)))
        .filter((product) => !blockedAccessory.test(product.productName))
        .filter((product) => matchRequired(product.productName, topic.required))
        .sort((a, b) => scoreProduct(b, topic) - scoreProduct(a, topic));
      const product = products[0];
      if (!product) {
        rejected.push({ ...topic, reason: '일치하는 본품 API 결과 없음' });
      } else {
        used.add(String(product.productId));
        selected.push({ order: selected.length + 1, ...topic, ...product });
      }
    } catch (error) {
      rejected.push({ ...topic, reason: error.message });
    }
    if ((index + 1) % 20 === 0) console.log(`Checked ${index + 1}/${topics.length}; selected ${selected.length}`);
    await sleep(180);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    requestedCount: 168,
    selectedCount: selected.length,
    selected,
    rejected,
  }, null, 2)}\n`, 'utf8');
  console.log(`Candidate collection complete: ${selected.length} selected, ${rejected.length} rejected.`);
  console.log(`Saved ${path.relative(root, outputPath)}`);
  if (selected.length < 168) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
