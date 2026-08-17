const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const postsDir = path.join(root, 'content', 'scheduled', 'posts');
const threshold = Number(process.argv.find((arg) => arg.startsWith('--threshold='))?.split('=')[1] || 0.88);

function tokens(post) {
  const text = [post.intro, ...(post.sections || []).map((section) => `${section.heading} ${section.body}`), post.conclusion]
    .join(' ')
    .toLowerCase()
    .replace(/[^0-9a-z가-힣 ]+/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1);
  const shingles = new Set();
  for (let index = 0; index < text.length - 4; index += 1) shingles.add(text.slice(index, index + 5).join(' '));
  return shingles;
}

function similarity(left, right) {
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection || 1);
}

const files = fs.readdirSync(postsDir).filter((name) => name.endsWith('.json')).sort();
const posts = files.map((file) => {
  const post = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8'));
  return { file, title: post.title, tokens: tokens(post) };
});
let maximum = { score: 0 };
const failures = [];
for (let left = 0; left < posts.length; left += 1) {
  for (let right = left + 1; right < posts.length; right += 1) {
    const score = similarity(posts[left].tokens, posts[right].tokens);
    const pair = { score, left: posts[left], right: posts[right] };
    if (score > maximum.score) maximum = pair;
    if (score >= threshold) failures.push(pair);
  }
}
console.log(`Similarity audit: ${posts.length} posts, maximum=${maximum.score.toFixed(3)}, threshold=${threshold.toFixed(3)}`);
if (maximum.left) console.log(`Closest pair: ${maximum.left.title} <> ${maximum.right.title}`);
for (const pair of failures.slice(0, 20)) console.error(`TOO_SIMILAR ${pair.score.toFixed(3)} ${pair.left.file} <> ${pair.right.file}`);
if (failures.length) {
  console.error(`${failures.length} pairs exceed the similarity threshold.`);
  process.exitCode = 1;
}
