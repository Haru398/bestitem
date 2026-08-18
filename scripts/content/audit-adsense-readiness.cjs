const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');

function readVisible(directory) {
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith('.json'))
    .map((name) => ({ name, item: JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')) }))
    .filter(({ item }) => item.indexable && item.editorial?.status === 'reviewed');
}

function words(item) {
  const text = [
    item.title,
    item.description,
    item.intro,
    item.content,
    item.conclusion,
    ...(item.sections || []).flatMap((section) => [section.heading, section.body]),
    ...(item.faq || []).flatMap((entry) => [entry.question, entry.answer]),
  ].filter(Boolean).join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

function fail(errors, condition, message) {
  if (!condition) errors.push(message);
}

function main() {
  const posts = readVisible(path.join(root, 'content', 'posts'));
  const guides = readVisible(path.join(root, 'content', 'guides'));
  const queue = JSON.parse(fs.readFileSync(path.join(root, 'content', 'scheduled', 'queue.json'), 'utf8'));
  const heldSlugs = new Set((queue.history || []).map((item) => item.slug));
  const errors = [];

  fail(errors, queue.qualityStatus !== 'approved' && queue.automaticPublishing === false,
    '상품 예약 큐가 애드센스 품질 검수 보류 상태가 아닙니다.');
  fail(errors, posts.every(({ item }) => !heldSlugs.has(item.slug)),
    '반복형 자동 상품 글이 아직 공개 목록에 포함돼 있습니다.');
  fail(errors, guides.length >= 20,
    `공개 비제휴 정보 가이드가 부족합니다: ${guides.length}/20`);
  fail(errors, guides.length / (posts.length + guides.length) >= 0.2,
    `공개 콘텐츠 중 비제휴 정보 가이드 비율이 20% 미만입니다.`);

  for (const { name, item } of posts) {
    fail(errors, words(item) >= 600, `${name}: 공개 상품 글이 600단어 미만입니다.`);
    fail(errors, (item.sources || []).length >= 2, `${name}: 공식 출처가 2개 미만입니다.`);
    const images = [item.heroImage, ...(item.sections || []).map((section) => section.image)].filter(Boolean);
    fail(errors, images.length >= 3, `${name}: 대표 이미지와 본문 도식 2장이 필요합니다.`);
    fail(errors, Boolean(item.affiliate?.url), `${name}: 제휴 URL 형식이 누락됐습니다.`);
  }

  for (const { name, item } of guides) {
    fail(errors, words(item) >= 650, `${name}: 정보 가이드가 650단어 미만입니다.`);
    fail(errors, (item.sources || []).length >= 3, `${name}: 공식·공공 출처가 3개 미만입니다.`);
    fail(errors,
      (item.media || []).length >= 5
        && (item.media || []).some((media) => media.usageBasis === 'original'),
      `${name}: 직접 제작 도식을 포함한 설명 이미지가 5장 미만입니다.`);
  }

  const result = {
    publicProductPosts: posts.length,
    publicNonAffiliateGuides: guides.length,
    nonAffiliateShare: Number((guides.length / (posts.length + guides.length)).toFixed(3)),
    pausedProductQueue: (queue.items || []).length,
    errors: errors.length,
  };
  console.log(JSON.stringify(result, null, 2));
  if (errors.length) {
    for (const error of errors) console.error(`ERROR ${error}`);
    process.exitCode = 1;
  }
}

main();
