const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const scheduledRoot = path.join(root, 'content', 'scheduled-guides');
const guidesDir = path.join(scheduledRoot, 'guides');
const imagesDir = path.join(scheduledRoot, 'images');
const queuePath = path.join(scheduledRoot, 'queue.json');
const expected = Number(process.argv.find((arg) => arg.startsWith('--count='))?.split('=')[1] || 20);
const errors = [];
const banned = /(무조건|100%\s*(효과|차단|보장)|끝판왕|가성비\s*갑|박살|직접\s*(사용|써\s*본))/m;

function existsInLiveOrQueue(imagePath) {
  const basename = path.basename(imagePath);
  return fs.existsSync(path.join(root, 'public', imagePath.replace(/^\//, '')))
    || fs.existsSync(path.join(imagesDir, basename));
}

function existingGuideSlugs() {
  const result = new Set();
  const directory = path.join(root, 'content', 'guides');
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.json'))) {
    const guide = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
    result.add(guide.slug);
  }
  return result;
}

if (!fs.existsSync(guidesDir) || !fs.existsSync(imagesDir) || !fs.existsSync(queuePath)) {
  errors.push('정보 가이드 예약 큐 파일 또는 폴더가 없습니다.');
} else {
  const files = fs.readdirSync(guidesDir).filter((name) => name.endsWith('.json')).sort();
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  const historyCount = Array.isArray(queue.history) ? queue.history.length : 0;
  if (files.length !== expected) errors.push(`예약 가이드 수 ${files.length}, 기대값 ${expected}`);
  if (queue.items?.length !== expected) errors.push('queue.json 남은 항목 수가 예약 가이드 수와 다릅니다.');
  if (queue.total !== expected + historyCount) errors.push('queue.json 전체·남은·발행 이력 수량이 맞지 않습니다.');

  const existing = existingGuideSlugs();
  const slugs = new Set();
  const titles = new Set();
  for (const filename of files) {
    const guide = JSON.parse(fs.readFileSync(path.join(guidesDir, filename), 'utf8'));
    const prefix = `${filename}:`;
    for (const field of ['kind', 'queueOrder', 'slug', 'category', 'topicCluster', 'title', 'description', 'heroImage', 'searchIntent', 'targetQuery', 'editorial', 'content', 'related', 'sources', 'media']) {
      if (guide[field] === undefined || guide[field] === null || guide[field] === '') errors.push(`${prefix} ${field} 값이 없습니다.`);
    }
    if (guide.publishedAt || guide.updatedAt) errors.push(`${prefix} 발행 전 날짜가 미리 입력되어 있습니다.`);
    if (guide.kind !== 'guide' || guide.editorial?.status !== 'reviewed' || !guide.indexable) errors.push(`${prefix} 공개 준비 상태가 잘못되었습니다.`);
    if (existing.has(guide.slug) || slugs.has(guide.slug)) errors.push(`${prefix} 중복 slug ${guide.slug}`);
    if (titles.has(guide.title)) errors.push(`${prefix} 중복 title ${guide.title}`);
    slugs.add(guide.slug); titles.add(guide.title);
    if (guide.description.length < 60 || guide.description.length > 180) errors.push(`${prefix} 설명 길이 ${guide.description.length}`);
    if (String(guide.content).length < 3000) errors.push(`${prefix} 본문이 3,000자보다 짧습니다.`);
    const headings = [...String(guide.content).matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
    if (headings.length < 8) errors.push(`${prefix} 본문 소제목이 부족합니다.`);
    if (banned.test(JSON.stringify(guide))) errors.push(`${prefix} 과장 또는 직접 사용 주장 표현이 있습니다.`);
    const sources = guide.sources || [];
    if (sources.length < 3) errors.push(`${prefix} 공식 출처가 3개보다 적습니다.`);
    for (const [index, source] of sources.entries()) {
      if (!source.title || !source.publisher || !String(source.url || '').startsWith('https://')) errors.push(`${prefix} 출처 ${index + 1} 정보가 부족합니다.`);
      if (['authorized-affiliate', 'retailer'].includes(source.sourceType)) errors.push(`${prefix} 출처 ${index + 1}이 공식 근거가 아닙니다.`);
    }
    const media = guide.media || [];
    const originalMedia = media.filter((item) => item.usageBasis === 'original');
    const supportingMedia = media.filter((item) => item.path !== guide.heroImage);
    if (media.length !== 5 || originalMedia.length !== 5 || supportingMedia.length !== 4) errors.push(`${prefix} 직접 제작한 원본 도식 5장이 필요합니다.`);
    for (const [index, item] of media.entries()) {
      if (!existsInLiveOrQueue(item.path)) errors.push(`${prefix} 미디어 ${index + 1} 파일이 없습니다: ${item.path}`);
      if (!item.alt || item.alt.length < 10 || !item.caption || !item.creator) errors.push(`${prefix} 미디어 ${index + 1} 설명이 부족합니다.`);
      if (item.usageBasis !== 'original' || item.sourceUrl || item.licenseUrl) errors.push(`${prefix} 미디어 ${index + 1}이 순수 원본 도식이 아닙니다.`);
      if (!item.path.startsWith(`/images/guides/${guide.slug}--`)) errors.push(`${prefix} 미디어 ${index + 1} 경로가 가이드 전용이 아닙니다.`);
      if (!item.path.endsWith('.png')) errors.push(`${prefix} 미디어 ${index + 1}이 검색 미리보기용 PNG가 아닙니다.`);
      const queuedImagePath = path.join(imagesDir, path.basename(item.path));
      if (fs.existsSync(queuedImagePath) && fs.statSync(queuedImagePath).size < 5000) errors.push(`${prefix} 미디어 ${index + 1} 파일이 5KB보다 작습니다.`);
      if (item.placement && !headings.includes(item.placement)) errors.push(`${prefix} 미디어 ${index + 1} placement가 소제목과 일치하지 않습니다.`);
    }
  }
}

for (const error of errors) console.error(`ERROR ${error}`);
console.log(`Validated scheduled guide queue: ${expected} expected, ${errors.length} errors.`);
if (errors.length) process.exitCode = 1;
