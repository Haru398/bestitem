const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const root = path.resolve(__dirname, '../..');
const db = new Database(path.join(root, 'dev.db'), { readonly: true });
const postsDirectory = path.join(root, 'content', 'posts');
const guidesDirectory = path.join(root, 'content', 'guides');

fs.mkdirSync(postsDirectory, { recursive: true });
fs.mkdirSync(guidesDirectory, { recursive: true });

const categoryAliases = {
  '가전/디지털': 'home-appliances',
  '가전': 'home-appliances',
  '청소기': 'home-appliances',
  '디지털': 'digital-pc',
  '디지털/가전': 'digital-pc',
  '생활용품': 'living-kitchen',
  '생활/주방': 'living-kitchen',
  '가구인테리어': 'living-kitchen',
  '가구/인테리어': 'living-kitchen',
  '식품': 'food-health',
  '건강': 'food-health',
  '건강식품': 'food-health',
  '헬스/건강식품': 'food-health',
  '패션': 'fashion-beauty',
  '패션잡화': 'fashion-beauty',
  '패션/잡화': 'fashion-beauty',
  '패션/의류': 'fashion-beauty',
  '패션/뷰티': 'fashion-beauty',
  '뷰티': 'fashion-beauty',
  '뷰티/화장품': 'fashion-beauty',
  '스포츠/레저': 'outdoor-auto',
  '자동차용품': 'outdoor-auto',
  '자동차/바이크': 'outdoor-auto',
  '반려동물': 'pet-family',
  '반려동물용품': 'pet-family',
  '출산/유아동': 'pet-family',
  '홈/유아': 'pet-family',
  '이벤트/특가': 'offers',
  '리뷰': 'living-kitchen',
};

function plainText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>\[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveHeading(text, index) {
  const clean = plainText(text);
  const colon = clean.split(/[:：]/)[0].trim();
  if (colon.length >= 5 && colon.length <= 44) return colon;

  const sentence = clean.split(/[.!?。]|다\.|요\./)[0].trim();
  if (sentence.length >= 5 && sentence.length <= 44) return sentence;

  return `구매 전 확인 포인트 ${index + 1}`;
}

function descriptionFrom(summary, intro, title) {
  const summaryText = plainText(summary);
  if (summaryText.length >= 70) return summaryText.slice(0, 160);
  const introText = plainText(intro);
  if (introText.length >= 70) return introText.slice(0, 160);
  return `${plainText(title)}의 구성과 특징, 구매 전 확인할 사항을 정리했습니다.`.slice(0, 160);
}

function shouldIndexPost(post, body) {
  if (!post.coupangLink) return false;
  const risky = /(효능|당뇨|혈당|치료|통증\s*완화|살균의\s*기적|100%\s*효과)/;
  return !risky.test(`${post.title} ${body}`);
}

const posts = db.prepare('SELECT * FROM posts_v2 ORDER BY createdAt DESC').all();
const sectionStatement = db.prepare(
  'SELECT * FROM post_sections WHERE postId = ? ORDER BY sectionOrder ASC',
);

for (const post of posts) {
  const originalSections = sectionStatement.all(post.postId).map((section) => ({ ...section }));
  let intro = post.intro || '';
  let conclusion = post.outro || '';

  if (!intro && originalSections.length > 0 && !originalSections[0].image) {
    intro = originalSections.shift().text || '';
  }
  if (!conclusion && originalSections.length > 0 && !originalSections.at(-1).image) {
    conclusion = originalSections.pop().text || '';
  }

  const sections = originalSections
    .filter((section) => section.text || section.image)
    .map((section, index) => {
      const heading = deriveHeading(section.text, index);
      return {
        heading,
        body: section.text || '',
        ...(section.image ? { image: section.image } : {}),
        ...(section.image
          ? { imageAlt: section.imageAlt || `${plainText(post.title)} - ${heading}` }
          : {}),
      };
    });

  const allBody = [intro, ...sections.map((section) => section.body), conclusion].join(' ');
  const structured = Boolean(post.intro && post.outro && sections.length >= 4);
  const migrated = {
    kind: 'post',
    slug: post.postId,
    category: categoryAliases[post.category] || 'living-kitchen',
    title: post.title,
    description: descriptionFrom(post.summary, intro, post.title),
    productName: plainText(post.title),
    heroImage: post.thumbnail,
    publishedAt: post.createdAt,
    updatedAt: post.updatedAt || post.createdAt,
    indexable: shouldIndexPost(post, allBody),
    searchIntent: '제품의 구성과 구매 전 확인사항 파악',
    targetQuery: '',
    editorial: {
      status: 'legacy',
      basis: '기존 게시글을 새 콘텐츠 구조로 옮긴 자료입니다. 세부 사실과 표현은 순차 검수 중입니다.',
      lastChecked: post.updatedAt || post.createdAt,
      caution: structured
        ? '기존 상세형 콘텐츠로, 최신 판매 구성은 연결된 판매 페이지에서 다시 확인해야 합니다.'
        : '기존 콘텐츠로, 현재 품질 기준에 맞춘 재검수가 예정되어 있습니다.',
    },
    intro,
    sections,
    conclusion,
    affiliate: {
      url: post.coupangLink || '',
      html: post.coupangHtml || '',
    },
  };

  fs.writeFileSync(
    path.join(postsDirectory, `${post.postId}.json`),
    `${JSON.stringify(migrated, null, 2)}\n`,
    'utf8',
  );
}

const guides = db.prepare('SELECT * FROM guides ORDER BY createdAt DESC').all();
const pcPattern = /(RTX|RX\s?\d|라이젠|RYZEN|메인보드|SSD|NVMe|DDR|RAM|램|CPU|GPU|그래픽|쿨러|파워|B650|A620|X670|Z790)/i;

for (const guide of guides) {
  const content = guide.content || '';
  const related = (() => {
    try {
      const value = JSON.parse(guide.relatedGuides || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  })();

  const migrated = {
    kind: 'guide',
    slug: guide.id,
    category: pcPattern.test(`${guide.title} ${content}`) ? 'digital-pc' : 'living-kitchen',
    title: guide.title,
    description: plainText(guide.metaDescription || guide.summary || guide.title).slice(0, 160),
    publishedAt: guide.createdAt,
    updatedAt: guide.updatedAt || guide.createdAt,
    indexable: plainText(content).length >= 1800,
    searchIntent: '제품 선택 기준과 호환성 확인',
    targetQuery: '',
    editorial: {
      status: 'legacy',
      basis: '기존 자동 생성 가이드를 새 구조로 옮긴 자료이며 순차적으로 출처와 제품별 정보를 보강합니다.',
      lastChecked: guide.updatedAt || guide.createdAt,
      caution: '구매 전 제조사 공식 사양과 현재 판매 구성을 함께 확인하세요.',
    },
    content,
    related,
  };

  fs.writeFileSync(
    path.join(guidesDirectory, `${guide.id}.json`),
    `${JSON.stringify(migrated, null, 2)}\n`,
    'utf8',
  );
}

console.log(`Migrated ${posts.length} posts and ${guides.length} guides.`);
