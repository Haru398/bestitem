const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { execSync } = require('child_process');

// 설정
const WORKSPACE = 'D:/서버구축폴더/bestitem';
const SOURCE_DIR_NAME = '다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 본품, 1.05L, 3개';
const BACKUP_DIR = path.join('D:/정식서버업로드전용폴더', SOURCE_DIR_NAME);
const POST_ID = 'item-downy-mystique-1';

// 2. DB 입력
const db = new Database(path.join(WORKSPACE, 'dev.db'));

// posts_v2 기본 정보
const postData = {
  postId: POST_ID,
  status: 'PUBLISHED',
  version: 2,
  category: '생활용품',
  title: '다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크 주요 기능과 활용 방법 알아보기',
  summary: '리뉴얼로 더욱 강력해진 다우니 5성급 호텔 컬렉션 미스티크! 탑노트 장미부터 바닐라, 엠버까지 이어지는 매혹적인 향기와 미세플라스틱 무첨가 안심 포뮬러를 상세히 분석합니다.',
  thumbnail: `/images/downy_mystique/썸네일.png`,
  intro: `매일 입는 옷과 수건에서 5성급 호텔의 고급스러운 향기가 난다면 어떨까요? 오늘 소개해 드릴 제품은 많은 분들께 꾸준히 사랑받아온 다우니 미스티크가 **'다우니 5성급 호텔 컬렉션'**으로 리뉴얼되면서 한층 더 깊어진 향과 안전성을 자랑하는 **다우니 초고농축 호텔 컬렉션 섬유유연제 미스티크**입니다.

기존 다우니 미스티크에서 업그레이드되어 더 오래가는 향기, 그리고 가족의 건강을 생각한 미세플라스틱 무첨가 포뮬러까지, 어떤 점이 달라졌고 왜 이 제품을 선택해야 하는지 제공된 사진 자료를 바탕으로 하나하나 상세히 분석해 드리겠습니다.`,
  outro: `### 총평 및 마무리

다우니 5성급 호텔 컬렉션 미스티크는 단순한 섬유유연제를 넘어, 일상 속 옷차림에 '밤의 호텔 로비' 같은 고급스러운 무드를 입혀주는 매혹적인 아이템입니다. 리뉴얼을 통해 디자인과 향의 지속력이 업그레이드되었을 뿐만 아니라, 미세플라스틱 무첨가 및 피부과 테스트 완료로 온 가족이 안심하고 사용할 수 있게 되었습니다. 

실내 건조 라인이나 기본 파워 라인과 달리, 프리미엄 향기에 특화된 라인업인 만큼 평소 향수 대신 은은한 잔향을 즐기시는 분들께 강력히 추천합니다. 고급스러운 장미와 엠버의 조화를 지금 바로 경험해 보세요!`,
  coupangLink: 'https://link.coupang.com/a/eI7RtU0wFg',
  coupangHtml: `<iframe src="https://coupa.ng/cnw2ch" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>`,
  errorInfo: '',
  lastFailedStatus: '',
  views: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

db.prepare('DELETE FROM posts_v2 WHERE postId = ?').run(POST_ID);
db.prepare('DELETE FROM post_sections WHERE postId = ?').run(POST_ID);

const insertPost = db.prepare(`
  INSERT INTO posts_v2 (
    postId, status, version, category, title, summary, thumbnail, 
    intro, outro, coupangLink, coupangHtml, errorInfo, lastFailedStatus, 
    views, createdAt, updatedAt
  ) VALUES (
    @postId, @status, @version, @category, @title, @summary, @thumbnail,
    @intro, @outro, @coupangLink, @coupangHtml, @errorInfo, @lastFailedStatus,
    @views, @createdAt, @updatedAt
  )
`);
insertPost.run(postData);

// 섹션 생성 (1.png ~ 6.png 사용)
const sections = [
  {
    order: 1,
    img: '1.png',
    text: `### 1. 리뉴얼 전/후 비교: 5성급 HOTEL 컬렉션으로의 진화
첫 번째 사진에서 확인할 수 있듯, 기존 '다우니 미스티크' 제품이 **'다우니 5성급 HOTEL 컬렉션'**으로 새롭게 리뉴얼되었습니다. 패키지 뒷면을 비교해 보면, 제품명이 변경됨과 동시에 더욱 고급스러운 블랙 앤 퍼플 톤의 라벨 디자인이 눈에 띕니다. 용량은 1.05L로 넉넉하며, 초고농축 제품답게 적은 양만 사용해도 충분한 유연 효과를 볼 수 있도록 표준 사용량 가이드가 명시되어 있습니다.`
  },
  {
    order: 2,
    img: '2.png',
    text: `### 2. 다우니 리뉴얼 안내: 더 오래가는 섬유유연제
두 번째 사진은 다우니 리뉴얼 안내를 보여줍니다. 새로운 5성급 호텔 컬렉션 미스티크는 기존 제품 대비 **'더 오래가는 향기'**를 핵심으로 업그레이드되었습니다. 패키지 전면 디자인 역시 꽃잎이 흩날리는 우아한 그래픽이 돋보이며, 건조기 사용 후에도 오랫동안 지속되는 향을 강조하고 있습니다. 본품 외에도 대용량 리필팩 등 다양한 구성이 준비되어 있어 경제적인 선택이 가능합니다.`
  },
  {
    order: 3,
    img: '3.png',
    text: `### 3. 5성급 호텔 컬렉션 라인업: 취향에 맞춘 고급스러운 향
세 번째 사진에서는 5성급 호텔 컬렉션의 전체 라인업을 확인할 수 있습니다. 시그니처인 블랙 보틀의 **'미스티크'**를 비롯해 포근한 화이트 코튼, 우아한 화이트 머스크, 상쾌한 화이트 티, 싱그러운 스프링 가든, 그리고 시트러스&버베나까지 총 6가지의 향기로 구성되어 있습니다. 각기 다른 컬러의 패키지가 시각적인 즐거움을 주며, 취향과 계절에 따라 나만의 호텔 향기를 선택할 수 있습니다.`
  },
  {
    order: 4,
    img: '4.png',
    text: `### 4. 미스티크(Mystique) 향 노트 분석: 밤의 호텔 로비처럼
네 번째 사진은 미스티크 향의 구체적인 조향 노트를 설명하고 있습니다. **'밤의 호텔 로비처럼 깊고 매혹적인 향'**이라는 수식어에 걸맞게, 입체적인 향의 변화를 느낄 수 있습니다.
- **Top Note**: 우아한 장미(Rose)가 첫 순간을 물들입니다.
- **Middle Note**: 바닐라와 파우더(Vanilla & Powder)가 포근한 무드를 더해줍니다.
- **Bottom Note**: 엠버(Amber)의 깊은 여운이 마지막까지 남아 고급스러운 잔향을 완성합니다.`
  },
  {
    order: 5,
    img: '5.png',
    text: `### 5. 안심 성분: 미세플라스틱 무첨가 및 피부과 테스트 완료
다섯 번째 사진은 이 제품이 향기뿐만 아니라 성분 안전성에도 깊이 신경 썼음을 보여줍니다. 매일 피부에 닿는 섬유에 사용하는 만큼, **미세플라스틱 향기 캡슐 무첨가(NO MICROPLASTIC PERFUME CAPSULE)** 포뮬러를 적용했습니다. 또한 **피부과 테스트를 거친 포뮬러(DERMATOLOGY TEST COMPLETED)**로, 어른 옷은 물론 민감한 피부를 가진 아이 옷까지 온 가족이 안심하고 세탁할 수 있습니다.`
  },
  {
    order: 6,
    img: '6.png',
    text: `### 6. 다우니 라인업 비교 및 추천 대상
여섯 번째 사진은 다우니의 3대 핵심 라인업을 한눈에 비교해 줍니다.
1. **5성급 호텔 컬렉션 (미스티크 포함)**: 뒤돌아보게 만드는 고급스러운 프리미엄 향기가 특징입니다. 냄새 탈취는 물론 럭셔리한 향기를 최우선으로 하시는 분들께 추천합니다. (탈취 효과 4별, 고급스러운 향 5별)
2. **실내 건조 라인**: 냄새 고민 없이 보송보송한 햇빛 향기를 원하실 때 적합합니다. 장마철이나 원룸 실내 건조 시 유용합니다.
3. **파워 라인**: 오랫동안 사랑받은 다우니의 기본 라인업으로 대중적인 향을 선호하시는 분들께 무난합니다.
목적에 따라 라인업을 선택하되, '향수 같은 섬유유연제'를 찾으신다면 단연 5성급 호텔 컬렉션 미스티크가 최고의 선택입니다.`
  }
];

const insertSec = db.prepare(`
  INSERT INTO post_sections (postId, sectionOrder, image, imageAlt, text, qualityScore, createdAt, updatedAt)
  VALUES (@postId, @sectionOrder, @image, '', @text, 100, @now, @now)
`);

for (const sec of sections) {
  insertSec.run({
    postId: POST_ID,
    sectionOrder: sec.order,
    image: `/images/downy_mystique/${sec.img}`,
    text: sec.text,
    now: new Date().toISOString()
  });
}

console.log('✅ DB 입력 완료 (사진 분석 반영 내용 업데이트)');

// 4. 백업 폴더 업데이트
const metaInfo = {
  seoTitle: postData.title,
  seoKeyword: '다우니 호텔컬렉션 미스티크',
  metaDescription: postData.summary,
  category: postData.category,
  postUrl: `https://item.monster/post/${POST_ID}/`
};
fs.writeFileSync(path.join(BACKUP_DIR, 'SEO_META.json'), JSON.stringify(metaInfo, null, 2));
fs.writeFileSync(path.join(BACKUP_DIR, '게시글원본.json'), JSON.stringify(postData, null, 2));

console.log('✅ 백업 갱신 완료');
