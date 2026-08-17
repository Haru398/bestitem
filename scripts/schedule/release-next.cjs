const fs = require('node:fs');
const path = require('node:path');

const root = process.env.ITEM_MONSTER_TEST_ROOT
  ? path.resolve(process.env.ITEM_MONSTER_TEST_ROOT)
  : path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled');
const postsDir = path.join(scheduledRoot, 'posts');
const imagesDir = path.join(scheduledRoot, 'images');
const publicImagesDir = path.join(root, 'public', 'images');
const livePostsDir = path.join(root, 'content', 'posts');
const queuePath = path.join(scheduledRoot, 'queue.json');
const dryRun = process.argv.includes('--dry-run');

function kstIso(date = new Date()) {
  const shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return shifted.toISOString().replace(/\.\d{3}Z$/, '+09:00');
}

function githubOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, 'utf8');
}

function ensureInside(base, target) {
  const baseResolved = path.resolve(base);
  const targetResolved = path.resolve(target);
  if (!targetResolved.startsWith(`${baseResolved}${path.sep}`)) throw new Error(`Unsafe path: ${targetResolved}`);
}

function main() {
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter((name) => name.endsWith('.json')).sort() : [];
  if (!files.length) {
    console.log('No scheduled posts remain.');
    githubOutput('released', 'false');
    return;
  }
  const sourcePostPath = path.join(postsDir, files[0]);
  const post = JSON.parse(fs.readFileSync(sourcePostPath, 'utf8'));
  const imageNames = [...new Set([
    post.heroImage,
    ...(post.sections || []).map((section) => section.image),
  ].filter(Boolean).map((imagePath) => path.basename(imagePath)))];
  const sourceImagePaths = imageNames.map((name) => path.join(imagesDir, name));
  const livePostPath = path.join(livePostsDir, `${post.slug}.json`);
  const liveImagePaths = imageNames.map((name) => path.join(publicImagesDir, name));
  for (const [base, target] of [[postsDir, sourcePostPath], [livePostsDir, livePostPath]]) ensureInside(base, target);
  for (const sourceImagePath of sourceImagePaths) ensureInside(imagesDir, sourceImagePath);
  for (const liveImagePath of liveImagePaths) ensureInside(publicImagesDir, liveImagePath);
  for (const sourceImagePath of sourceImagePaths) {
    if (!fs.existsSync(sourceImagePath)) throw new Error(`Missing scheduled image: ${sourceImagePath}`);
  }
  if (fs.existsSync(livePostPath) || liveImagePaths.some((target) => fs.existsSync(target))) throw new Error(`Live target already exists for ${post.slug}`);

  const actualPublishedAt = kstIso();
  const released = { ...post, publishedAt: actualPublishedAt, updatedAt: actualPublishedAt };
  delete released.queueOrder;
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, slug: post.slug, actualPublishedAt, remaining: files.length, assets: imageNames.length }, null, 2));
    githubOutput('released', 'false');
    return;
  }

  fs.mkdirSync(livePostsDir, { recursive: true });
  fs.mkdirSync(publicImagesDir, { recursive: true });
  fs.writeFileSync(livePostPath, `${JSON.stringify(released, null, 2)}\n`, 'utf8');
  for (let index = 0; index < sourceImagePaths.length; index += 1) fs.copyFileSync(sourceImagePaths[index], liveImagePaths[index]);
  fs.unlinkSync(sourcePostPath);
  for (const sourceImagePath of sourceImagePaths) fs.unlinkSync(sourceImagePath);

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  queue.items = (queue.items || []).filter((item) => item.slug !== post.slug);
  queue.remaining = queue.items.length;
  queue.history = [...(queue.history || []), { order: post.queueOrder, slug: post.slug, publishedAt: actualPublishedAt }];
  fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  githubOutput('released', 'true');
  githubOutput('slug', post.slug);
  githubOutput('published_at', actualPublishedAt);
  githubOutput('remaining', String(queue.remaining));
  console.log(JSON.stringify({ released: true, slug: post.slug, actualPublishedAt, remaining: queue.remaining }, null, 2));
}

try { main(); } catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
