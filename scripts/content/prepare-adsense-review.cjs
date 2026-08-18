const fs = require('node:fs');
const path = require('node:path');
const { attachPostDiagrams } = require('../schedule/post-diagrams.cjs');

const root = path.resolve(__dirname, '../..');
const postsDir = path.join(root, 'content', 'posts');
const guidesDir = path.join(root, 'content', 'guides');
const publicImagesDir = path.join(root, 'public', 'images');
const productQueuePath = path.join(root, 'content', 'scheduled', 'queue.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function visibleImageCount(post) {
  return [post.heroImage, ...(post.sections || []).map((section) => section.image)].filter(Boolean).length;
}

async function main() {
  const queue = readJson(productQueuePath);
  const heldSlugs = new Set((queue.history || []).map((item) => item.slug));
  let hiddenPosts = 0;

  for (const slug of heldSlugs) {
    const file = path.join(postsDir, `${slug}.json`);
    if (!fs.existsSync(file)) continue;
    const post = readJson(file);
    post.indexable = false;
    post.editorial = {
      ...post.editorial,
      status: 'hidden',
      caution: '자동화 초안의 상품별 고유 정보와 반복 문장을 다시 검수할 때까지 공개하지 않습니다.',
    };
    writeJson(file, post);
    hiddenPosts += 1;
  }

  const weakGuidePath = path.join(guidesDir, 'guide-fruit-fly-trap-types.json');
  if (fs.existsSync(weakGuidePath)) {
    const guide = readJson(weakGuidePath);
    guide.indexable = false;
    guide.editorial = {
      ...guide.editorial,
      status: 'hidden',
      caution: '공식 근거와 설명 이미지를 보강한 뒤 다시 공개합니다.',
    };
    writeJson(weakGuidePath, guide);
  }

  const publicPostFiles = fs.readdirSync(postsDir).filter((name) => name.endsWith('.json')).sort();
  let illustratedPosts = 0;
  for (const name of publicPostFiles) {
    const file = path.join(postsDir, name);
    const post = readJson(file);
    if (!post.indexable || post.editorial?.status !== 'reviewed') continue;
    if (!Array.isArray(post.sections) || post.sections.length < 4) continue;
    if (visibleImageCount(post) > 1) continue;
    await attachPostDiagrams(post, publicImagesDir);
    writeJson(file, post);
    illustratedPosts += 1;
  }

  console.log(JSON.stringify({
    hiddenRepeatedProductPosts: hiddenPosts,
    hiddenWeakGuides: fs.existsSync(weakGuidePath) ? 1 : 0,
    illustratedReviewedPosts: illustratedPosts,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
