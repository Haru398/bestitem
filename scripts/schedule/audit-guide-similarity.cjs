const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const guidesDir = path.join(root, 'content', 'scheduled-guides', 'guides');
const threshold = Number(process.argv.find((arg) => arg.startsWith('--threshold='))?.split('=')[1] || 0.84);

function tokens(guide) {
  const words = String(guide.content || '').toLowerCase().replace(/[^0-9a-z가-힣 ]+/g, ' ').split(/\s+/).filter((word) => word.length > 1);
  const shingles = new Set();
  for (let index = 0; index < words.length - 5; index += 1) shingles.add(words.slice(index, index + 6).join(' '));
  return shingles;
}

function similarity(left, right) {
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection || 1);
}

const guides = fs.readdirSync(guidesDir).filter((name) => name.endsWith('.json')).sort().map((filename) => {
  const guide = JSON.parse(fs.readFileSync(path.join(guidesDir, filename), 'utf8'));
  return { filename, title: guide.title, tokens: tokens(guide) };
});
let maximum = { score: 0 };
const failures = [];
for (let left = 0; left < guides.length; left += 1) {
  for (let right = left + 1; right < guides.length; right += 1) {
    const score = similarity(guides[left].tokens, guides[right].tokens);
    const pair = { score, left: guides[left], right: guides[right] };
    if (score > maximum.score) maximum = pair;
    if (score >= threshold) failures.push(pair);
  }
}
console.log(`Guide similarity audit: ${guides.length} guides, maximum=${maximum.score.toFixed(3)}, threshold=${threshold.toFixed(3)}`);
if (maximum.left) console.log(`Closest pair: ${maximum.left.title} <> ${maximum.right.title}`);
for (const pair of failures) console.error(`TOO_SIMILAR ${pair.score.toFixed(3)} ${pair.left.filename} <> ${pair.right.filename}`);
if (failures.length) process.exitCode = 1;
