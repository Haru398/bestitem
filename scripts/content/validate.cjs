const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const errors = [];
const warnings = [];
const slugs = new Set();
const bannedHype = /(무조건|100%\s*(효과|차단|보장)|완벽한\s*제품|(^|[^가-힣])기적([^가-힣]|$)|끝판왕|가성비\s*갑|박살)/m;
const validStatuses = new Set(['draft', 'legacy', 'reviewed', 'hidden']);
const validSourceTypes = new Set(['manufacturer-spec', 'manufacturer-support', 'official-standard', 'public-agency']);
const validMediaUsage = new Set(['original', 'licensed-manufacturer', 'authorized-affiliate']);

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

function isValidDate(value) {
  return Boolean(value) && !Number.isNaN(new Date(value).getTime());
}

function publicFileExists(value) {
  if (!value || !value.startsWith('/')) return false;
  return fs.existsSync(path.join(root, 'public', value.replace(/^\/+/, '')));
}

for (const entry of [...read('posts'), ...read('guides')]) {
  const item = entry.value;
  const prefix = `${entry.filename}:`;

  for (const key of ['kind', 'slug', 'category', 'title', 'description', 'publishedAt', 'updatedAt', 'editorial']) {
    if (!item[key]) errors.push(`${prefix} ${key} 값이 없습니다.`);
  }

  if (slugs.has(item.slug)) errors.push(`${prefix} 중복 slug: ${item.slug}`);
  slugs.add(item.slug);

  if (!validStatuses.has(item.editorial?.status)) errors.push(`${prefix} 알 수 없는 editorial.status입니다.`);
  if (!isValidDate(item.publishedAt) || !isValidDate(item.updatedAt)) {
    errors.push(`${prefix} publishedAt 또는 updatedAt 날짜 형식이 잘못되었습니다.`);
  }

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

    if (item.kind === 'guide') {
      if (!item.topicCluster) errors.push(`${prefix} 검수 가이드에 topicCluster가 없습니다.`);

      if (item.category === 'digital-pc') {
        if (!Array.isArray(item.sources) || item.sources.length < 3) {
          errors.push(`${prefix} PC 전문 가이드는 공식 출처가 3개 이상 필요합니다.`);
        }

        for (const [index, source] of (item.sources || []).entries()) {
          if (!source.title || !source.publisher) errors.push(`${prefix} 출처 ${index + 1} 제목 또는 발행처가 없습니다.`);
          if (!validSourceTypes.has(source.sourceType)) errors.push(`${prefix} 출처 ${index + 1} sourceType이 잘못되었습니다.`);
          if (!String(source.url || '').startsWith('https://')) errors.push(`${prefix} 출처 ${index + 1} URL은 https 공식 문서여야 합니다.`);
          if (!isValidDate(source.checkedAt)) errors.push(`${prefix} 출처 ${index + 1} 확인 날짜가 잘못되었습니다.`);
        }
      }

      const mediaByPath = new Map((item.media || []).map((media) => [media.path, media]));
      const referencedImages = [
        item.heroImage,
        ...[...String(item.content || '').matchAll(/!\[[^\]]*\]\((\/[^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]),
      ].filter(Boolean);

      for (const imagePath of referencedImages) {
        if (!publicFileExists(imagePath)) errors.push(`${prefix} 이미지 파일이 없습니다: ${imagePath}`);
        if (!mediaByPath.has(imagePath)) errors.push(`${prefix} 이미지 출처 기록(media)이 없습니다: ${imagePath}`);
      }

      for (const [index, media] of (item.media || []).entries()) {
        if (!validMediaUsage.has(media.usageBasis)) errors.push(`${prefix} 미디어 ${index + 1} usageBasis가 잘못되었습니다.`);
        if (!media.alt || media.alt.length < 8) errors.push(`${prefix} 미디어 ${index + 1} 대체 텍스트가 부족합니다.`);
        if (!media.caption || !media.creator) errors.push(`${prefix} 미디어 ${index + 1} 캡션 또는 제작자 정보가 없습니다.`);
        if (media.usageBasis !== 'original' && (!media.sourceUrl || !media.licenseUrl)) {
          errors.push(`${prefix} 외부 미디어 ${index + 1}에 원본 URL과 이용 근거 URL이 모두 필요합니다.`);
        }
      }
    }
  }
}

for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

console.log(`Validated ${slugs.size} content files: ${errors.length} errors, ${warnings.length} warnings.`);
if (errors.length > 0) process.exitCode = 1;
