const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const errors = [];
const warnings = [];
const slugs = new Set();
const bannedHype = /(무조건|100%\s*(효과|차단|보장)|완벽한\s*제품|(^|[^가-힣])기적([^가-힣]|$)|끝판왕|가성비\s*갑|박살)/m;

function read(directory) {
  const target = path.join(root, 'content', directory);
  if (!fs.existsSync(target)) return [];
  return fs
    .readdirSync(target)
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => ({
      filename: path.join('content', directory, filename),
      value: JSON.parse(fs.readFileSync(path.join(target, filename), 'utf8')),
    }));
}

function textLength(post) {
  if (post.kind === 'guide') return String(post.content || '').length;
  return [post.intro, ...(post.sections || []).map((section) => section.body), post.conclusion]
    .join(' ')
    .length;
}

for (const entry of [...read('posts'), ...read('guides')]) {
  const item = entry.value;
  const prefix = `${entry.filename}:`;

  for (const key of ['kind', 'slug', 'category', 'title', 'description', 'publishedAt', 'updatedAt', 'editorial']) {
    if (!item[key]) errors.push(`${prefix} ${key} 값이 없습니다.`);
  }

  if (slugs.has(item.slug)) errors.push(`${prefix} 중복 slug: ${item.slug}`);
  slugs.add(item.slug);

  if (item.description && (item.description.length < 55 || item.description.length > 170)) {
    warnings.push(`${prefix} 설명 길이 ${item.description.length}자`);
  }

  if (item.indexable && !item.description) errors.push(`${prefix} 색인 페이지에 설명이 없습니다.`);

  const combined = JSON.stringify(item);
  if (bannedHype.test(combined)) {
    const message = `${prefix} 과장 가능성이 있는 표현이 있습니다.`;
    if (item.editorial?.status === 'reviewed') errors.push(message);
    else warnings.push(message);
  }

  if (item.editorial?.status === 'reviewed') {
    if (!item.targetQuery || item.targetQuery.length < 2) errors.push(`${prefix} targetQuery가 필요합니다.`);
    if (!item.searchIntent || item.searchIntent.length < 8) errors.push(`${prefix} searchIntent가 구체적이지 않습니다.`);
    if (textLength(item) < 2200) errors.push(`${prefix} 검수 콘텐츠 본문이 2,200자보다 짧습니다.`);
    if (!item.editorial.basis || item.editorial.basis.length < 25) errors.push(`${prefix} 검증 근거가 부족합니다.`);

    if (item.kind === 'post') {
      if (!item.verdict) errors.push(`${prefix} 구매 판단 요약이 없습니다.`);
      if (!item.intro || item.intro.length < 180) errors.push(`${prefix} 도입부가 짧습니다.`);
      if (!item.conclusion || item.conclusion.length < 140) errors.push(`${prefix} 결론이 짧습니다.`);
      if (!Array.isArray(item.sections) || item.sections.length < 4) errors.push(`${prefix} 본문 섹션이 4개보다 적습니다.`);

      for (const [index, section] of (item.sections || []).entries()) {
        if (!section.heading || section.heading.length < 4) errors.push(`${prefix} 섹션 ${index + 1} 제목이 없습니다.`);
        if (!section.body || section.body.length < 180) errors.push(`${prefix} 섹션 ${index + 1} 본문이 짧습니다.`);
        if (section.image && (!section.imageAlt || section.imageAlt.length < 5)) {
          errors.push(`${prefix} 섹션 ${index + 1} 이미지 설명이 없습니다.`);
        }
      }
    }
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

console.log(`Validated ${slugs.size} content files: ${errors.length} errors, ${warnings.length} warnings.`);
if (errors.length > 0) process.exitCode = 1;
