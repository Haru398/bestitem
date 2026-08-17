const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const rssPath = path.join(root, 'out', 'rss.xml');
if (!fs.existsSync(rssPath)) throw new Error(`rss.xml을 찾을 수 없습니다: ${rssPath}`);
const xml = fs.readFileSync(rssPath, 'utf8');
const items = [...xml.matchAll(/<item>[\s\S]*?<\/item>/g)].map((match) => match[0]);
if (!items.length || items.length > 50) throw new Error(`RSS item 수가 잘못되었습니다: ${items.length}`);
if (!xml.includes('xmlns:content="http://purl.org/rss/1.0/modules/content/"')) throw new Error('RSS 전체 본문 namespace가 없습니다.');
if (items.some((item) => !item.includes('<content:encoded><![CDATA['))) throw new Error('전체 본문이 없는 RSS item이 있습니다.');
if (xml.includes('/content/scheduled/') || xml.includes('queueOrder')) throw new Error('미공개 예약 정보가 RSS에 포함됐습니다.');
console.log(`Verified rss.xml: ${items.length} latest public posts and guides with full content.`);
