const fs = require('node:fs');
const path = require('node:path');

const root = process.env.ITEM_MONSTER_TEST_ROOT
  ? path.resolve(process.env.ITEM_MONSTER_TEST_ROOT)
  : path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled-guides');
const guidesDir = path.join(scheduledRoot, 'guides');
const imagesDir = path.join(scheduledRoot, 'images');
const queuePath = path.join(scheduledRoot, 'queue.json');
const liveGuidesDir = path.join(root, 'content', 'guides');
const publicGuideImagesDir = path.join(root, 'public', 'images', 'guides');
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
  const files = fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter((name) => name.endsWith('.json')).sort() : [];
  if (!files.length) {
    console.log('No scheduled guides remain.');
    githubOutput('released', 'false');
    return;
  }

  const sourceGuidePath = path.join(guidesDir, files[0]);
  const guide = JSON.parse(fs.readFileSync(sourceGuidePath, 'utf8'));
  const liveGuidePath = path.join(liveGuidesDir, `${guide.slug}.json`);
  ensureInside(guidesDir, sourceGuidePath);
  ensureInside(liveGuidesDir, liveGuidePath);
  if (fs.existsSync(liveGuidePath)) throw new Error(`Live guide already exists: ${guide.slug}`);

  const queuedAssetNames = [...new Set((guide.media || [])
    .map((media) => path.basename(media.path))
    .filter((name) => name.startsWith(`${guide.slug}--`)))];
  for (const name of queuedAssetNames) {
    const source = path.join(imagesDir, name);
    const target = path.join(publicGuideImagesDir, name);
    ensureInside(imagesDir, source);
    ensureInside(publicGuideImagesDir, target);
    if (!fs.existsSync(source)) throw new Error(`Missing scheduled guide image: ${name}`);
    if (fs.existsSync(target)) throw new Error(`Live guide image already exists: ${name}`);
  }

  const actualPublishedAt = kstIso();
  const released = { ...guide, publishedAt: actualPublishedAt, updatedAt: actualPublishedAt };
  delete released.queueOrder;
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, slug: guide.slug, actualPublishedAt, remaining: files.length, assets: queuedAssetNames.length }, null, 2));
    githubOutput('released', 'false');
    return;
  }

  fs.mkdirSync(liveGuidesDir, { recursive: true });
  fs.mkdirSync(publicGuideImagesDir, { recursive: true });
  fs.writeFileSync(liveGuidePath, `${JSON.stringify(released, null, 2)}\n`, 'utf8');
  for (const name of queuedAssetNames) {
    fs.copyFileSync(path.join(imagesDir, name), path.join(publicGuideImagesDir, name));
    fs.unlinkSync(path.join(imagesDir, name));
  }
  fs.unlinkSync(sourceGuidePath);

  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  queue.items = (queue.items || []).filter((item) => item.slug !== guide.slug);
  queue.remaining = queue.items.length;
  queue.history = [...(queue.history || []), { order: guide.queueOrder, slug: guide.slug, publishedAt: actualPublishedAt }];
  fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  githubOutput('released', 'true');
  githubOutput('slug', guide.slug);
  githubOutput('published_at', actualPublishedAt);
  githubOutput('remaining', String(queue.remaining));
  console.log(JSON.stringify({ released: true, slug: guide.slug, actualPublishedAt, remaining: queue.remaining }, null, 2));
}

try { main(); } catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
