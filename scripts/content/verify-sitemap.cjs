const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const baseUrl = 'https://item.monster';

function read(directory) {
  const target = path.join(root, 'content', directory);
  return fs.readdirSync(target)
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => JSON.parse(fs.readFileSync(path.join(target, filename), 'utf8')));
}

const posts = read('posts').filter((item) => item.indexable && item.editorial?.status === 'reviewed');
const guides = read('guides').filter((item) => item.indexable && item.editorial?.status === 'reviewed');
const categories = [...new Set(posts.map((post) => post.category))];
const expected = new Set([
  `${baseUrl}/`,
  `${baseUrl}/articles/`,
  ...(guides.length ? [`${baseUrl}/guide/`] : []),
  `${baseUrl}/about/`,
  `${baseUrl}/contact/`,
  `${baseUrl}/privacy/`,
  `${baseUrl}/terms/`,
  ...categories.map((category) => `${baseUrl}/category/${category}/`),
  ...posts.map((post) => `${baseUrl}/post/${post.slug}/`),
  ...guides.map((guide) => `${baseUrl}/guide/${guide.slug}/`),
]);

const sitemapPath = path.join(root, 'out', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error(`sitemap.xml을 찾을 수 없습니다: ${sitemapPath}`);
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const actual = new Set([...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const missing = [...expected].filter((url) => !actual.has(url));
const unexpected = [...actual].filter((url) => !expected.has(url));

for (const url of missing) console.error(`SITEMAP MISSING ${url}`);
for (const url of unexpected) console.error(`SITEMAP UNEXPECTED ${url}`);

if (missing.length || unexpected.length || actual.size !== expected.size) {
  console.error(`Sitemap verification failed: expected ${expected.size}, actual ${actual.size}.`);
  process.exit(1);
}

console.log(`Verified sitemap.xml: ${actual.size} canonical URLs (${posts.length} posts, ${guides.length} guides).`);
