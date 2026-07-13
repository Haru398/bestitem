const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
}

const slug = option('slug');
const title = option('title');
const query = option('query');
const topic = option('topic') || 'cpu-motherboard';

if (!slug || !title || !query) {
  console.error('사용법: npm run guide:new -- --slug guide-example --title "가이드 제목" --query "대표 검색어" [--topic cpu-motherboard]');
  process.exit(1);
}

if (!/^guide-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('slug는 guide-로 시작하는 영문 소문자·숫자·하이픈 조합이어야 합니다.');
  process.exit(1);
}

const target = path.join(root, 'content', 'guides', `${slug}.json`);
if (fs.existsSync(target)) {
  console.error(`이미 존재하는 파일입니다: ${target}`);
  process.exit(1);
}

const now = new Date().toISOString();
const draft = {
  kind: 'guide',
  slug,
  category: 'digital-pc',
  topicCluster: topic,
  title,
  description: '55~170자로 검색자가 이 페이지에서 해결할 질문과 확인 범위를 작성하세요.',
  publishedAt: now,
  updatedAt: now,
  indexable: false,
  searchIntent: '검색자가 어떤 상황에서 무엇을 확인하려는지 구체적으로 작성하세요.',
  targetQuery: query,
  editorial: {
    status: 'draft',
    basis: '확인한 제조사 공식 사양, 지원 문서와 확인하지 못한 내용을 기록하세요.',
    lastChecked: now,
    caution: '모델·리비전·BIOS처럼 구매 직전에 다시 확인할 조건을 적으세요.',
  },
  content: '검색 질문에 바로 답하는 도입을 작성하세요.\n\n## 첫 번째 확인 기준\n\n제조사 공식 자료에서 확인한 사실과 아직 확인하지 못한 내용을 구분해 작성하세요.',
  related: [],
  sources: [],
  media: [],
};

fs.writeFileSync(target, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`가이드 초안을 만들었습니다: ${target}`);
console.log('공식 출처 3개 이상과 미디어 이용 근거를 채운 뒤 reviewed/indexable로 변경하세요.');
