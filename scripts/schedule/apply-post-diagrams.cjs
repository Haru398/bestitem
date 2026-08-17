const fs = require('node:fs');
const path = require('node:path');
const { attachPostDiagrams } = require('./post-diagrams.cjs');

const root = path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled');
const scheduledPostsDir = path.join(scheduledRoot, 'posts');
const scheduledImagesDir = path.join(scheduledRoot, 'images');
const publicPostsDir = path.join(root, 'content', 'posts');
const publicImagesDir = path.join(root, 'public', 'images');

async function update(file, imageDir) {
  const post = JSON.parse(fs.readFileSync(file, 'utf8'));
  await attachPostDiagrams(post, imageDir);
  fs.writeFileSync(file, `${JSON.stringify(post, null, 2)}\n`, 'utf8');
}

async function main() {
  const scheduledFiles = fs.readdirSync(scheduledPostsDir).filter((name) => name.endsWith('.json')).sort();
  for (const [index, name] of scheduledFiles.entries()) {
    await update(path.join(scheduledPostsDir, name), scheduledImagesDir);
    if ((index + 1) % 20 === 0) console.log(`Scheduled diagrams: ${index + 1}/${scheduledFiles.length}`);
  }

  const queue = JSON.parse(fs.readFileSync(path.join(scheduledRoot, 'queue.json'), 'utf8'));
  const publicSlugs = [...new Set((queue.history || []).map((item) => item.slug))];
  for (const slug of publicSlugs) await update(path.join(publicPostsDir, `${slug}.json`), publicImagesDir);
  console.log(`Added two original diagrams to ${scheduledFiles.length} scheduled and ${publicSlugs.length} public posts.`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
