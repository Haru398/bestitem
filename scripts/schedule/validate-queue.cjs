const fs = require('node:fs');
const path = require('node:path');
const { imageSize } = require('image-size');

const root = path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled');
const postsDir = path.join(scheduledRoot, 'posts');
const imagesDir = path.join(scheduledRoot, 'images');
const queuePath = path.join(scheduledRoot, 'queue.json');
const expected = Number(process.argv.find((arg) => arg.startsWith('--count='))?.split('=')[1] || 108);
const errors = [];
const bannedHype = /(무조건|100%\s*(효과|차단|보장)|완벽한\s*제품|끝판왕|가성비\s*갑|박살)/m;

function existingValues() {
  const slugs = new Set();
  const ids = new Set();
  const directory = path.join(root, 'content', 'posts');
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.json'))) {
    const post = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
    if (post.slug) slugs.add(post.slug);
    try {
      const id = new URL(post.affiliate?.url || '').searchParams.get('pageKey');
      if (id) ids.add(id);
    } catch {}
  }
  return { slugs, ids };
}

function bodyLength(post) {
  return [post.intro, ...(post.sections || []).map((section) => section.body), post.conclusion].join(' ').length;
}

if (!fs.existsSync(postsDir) || !fs.existsSync(imagesDir) || !fs.existsSync(queuePath)) {
  errors.push('예약 큐 파일 또는 폴더가 없습니다.');
} else {
  const files = fs.readdirSync(postsDir).filter((name) => name.endsWith('.json')).sort();
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  if (files.length !== expected) errors.push(`예약 원고 수 ${files.length}, 기대값 ${expected}`);
  if (queue.items?.length !== expected) errors.push('queue.json 남은 항목 수가 예약 원고 수와 다릅니다.');
  const historyCount = Array.isArray(queue.history) ? queue.history.length : 0;
  if (queue.total !== expected + historyCount) errors.push('queue.json의 전체·남은·발행 이력 수량이 맞지 않습니다.');

  const existing = existingValues();
  const slugs = new Set();
  const ids = new Set();
  const titles = new Set();
  const urls = new Set();
  for (const filename of files) {
    const post = JSON.parse(fs.readFileSync(path.join(postsDir, filename), 'utf8'));
    const prefix = `${filename}:`;
    for (const field of ['kind', 'queueOrder', 'productId', 'slug', 'category', 'title', 'description', 'productName', 'heroImage', 'searchIntent', 'targetQuery', 'editorial', 'verdict', 'intro', 'sections', 'conclusion', 'affiliate', 'sources']) {
      if (!post[field]) errors.push(`${prefix} ${field} 값이 없습니다.`);
    }
    if (post.publishedAt || post.updatedAt) errors.push(`${prefix} 실제 발행 전 날짜가 미리 입력되어 있습니다.`);
    if (post.kind !== 'post' || post.editorial?.status !== 'reviewed' || !post.indexable) errors.push(`${prefix} 공개 준비 상태가 잘못되었습니다.`);
    if (existing.slugs.has(post.slug) || slugs.has(post.slug)) errors.push(`${prefix} 중복 slug ${post.slug}`);
    if (existing.ids.has(String(post.productId)) || ids.has(String(post.productId))) errors.push(`${prefix} 중복 productId ${post.productId}`);
    if (titles.has(post.title)) errors.push(`${prefix} 중복 title ${post.title}`);
    slugs.add(post.slug); ids.add(String(post.productId)); titles.add(post.title);
    if (post.description.length < 55 || post.description.length > 170) errors.push(`${prefix} 설명 길이 ${post.description.length}`);
    if (bodyLength(post) < 2200) errors.push(`${prefix} 본문이 2,200자보다 짧습니다.`);
    if (!Array.isArray(post.sections) || post.sections.length < 5 || post.sections.some((section) => !section.body || section.body.length < 180)) errors.push(`${prefix} 본문 섹션이 부족합니다.`);
    if (!post.intro || post.intro.length < 180 || !post.conclusion || post.conclusion.length < 140) errors.push(`${prefix} 도입부 또는 결론이 짧습니다.`);
    if (bannedHype.test(JSON.stringify(post))) errors.push(`${prefix} 과장 표현이 있습니다.`);
    if (!Array.isArray(post.sources) || post.sources.length < 2 || post.sources.some((source) => !source.url?.startsWith('https://') || !source.sourceType?.startsWith('manufacturer'))) errors.push(`${prefix} 제조사 공식 출처가 부족합니다.`);
    try {
      const affiliate = new URL(post.affiliate.url);
      const pageKey = affiliate.searchParams.get('pageKey');
      if (affiliate.hostname !== 'link.coupang.com' || affiliate.pathname !== '/re/AFFSDP' || pageKey !== String(post.productId)) errors.push(`${prefix} 제휴 URL 또는 상품번호가 맞지 않습니다.`);
      if (urls.has(post.affiliate.url)) errors.push(`${prefix} 중복 제휴 URL입니다.`);
      urls.add(post.affiliate.url);
    } catch {
      errors.push(`${prefix} 제휴 URL 형식이 잘못되었습니다.`);
    }
    const imageFile = path.join(imagesDir, path.basename(post.heroImage));
    if (!fs.existsSync(imageFile)) errors.push(`${prefix} 예약 이미지가 없습니다.`);
    else {
      try {
        const size = imageSize(fs.readFileSync(imageFile));
        if (!size.width || !size.height || size.width < 300 || size.height < 300) errors.push(`${prefix} 이미지 크기가 부족합니다.`);
      } catch {
        errors.push(`${prefix} 이미지 형식을 읽을 수 없습니다.`);
      }
    }
  }
}

for (const error of errors) console.error(`ERROR ${error}`);
console.log(`Validated scheduled queue: ${expected} expected, ${errors.length} errors.`);
if (errors.length) process.exitCode = 1;
