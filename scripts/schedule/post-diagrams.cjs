const path = require('node:path');
const sharp = require('sharp');

const escapeSvg = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[char]));

function wrapWords(value, maxChars, maxLines = 3) {
  const words = String(value || '').trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || candidate.length <= maxChars) current = candidate;
    else if (lines.length < maxLines - 1) {
      lines.push(current);
      current = word;
    } else current = candidate;
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function tspans(lines, x, lineHeight) {
  return lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${escapeSvg(line)}</tspan>`).join('');
}

function focusFor(post) {
  const checks = post.verdict?.checkBeforeBuy || [];
  return [
    String(checks[0] || '정확한 모델과 옵션').replace('정확한 모델번호와 선택된 ', ''),
    String(checks[1] || '설치·연결 조건').replace(' 및 설치·연결 조건', ''),
    String(checks[2] || '구성품과 유지비').replace('과 별도 구매 비용', ''),
  ];
}

function titleBase(post) {
  return String(post.title || post.productName || '').split(' 구매 전:')[0].trim();
}

function decisionSvg(post) {
  const title = titleBase(post);
  const focus = focusFor(post);
  const titleLines = wrapWords(title, 28, 2);
  const descriptions = ['사용 목적·공간부터 결정', '연결·설치 조건과 대조', '구성품·소모품 비용 계산'];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" rx="52" fill="#172c23"/>
  <circle cx="1450" cy="40" r="290" fill="#d9bd78" opacity=".16"/>
  <text x="92" y="92" fill="#ef8263" font-family="Arial, Malgun Gothic, sans-serif" font-size="24" font-weight="800" letter-spacing="3">ITEM.MONSTER · BUYING MAP</text>
  <text x="92" y="172" fill="#fffdf5" font-family="Arial, Malgun Gothic, sans-serif" font-size="50" font-weight="800">${tspans(titleLines, 92, 58)}</text>
  <text x="92" y="295" fill="#c8d6cf" font-family="Arial, Malgun Gothic, sans-serif" font-size="27">상품명보다 먼저 확인할 세 가지</text>
  ${focus.map((item, index) => {
    const x = 92 + index * 496;
    const lines = wrapWords(item, 17, 3);
    return `<g transform="translate(${x} 360)">
      <rect width="444" height="340" rx="30" fill="#f8f5ea"/>
      <circle cx="64" cy="64" r="31" fill="#ef8263"/><text x="64" y="74" text-anchor="middle" fill="#fff" font-family="Arial" font-size="28" font-weight="800">${index + 1}</text>
      <text x="38" y="145" fill="#172c23" font-family="Arial, Malgun Gothic, sans-serif" font-size="31" font-weight="800">${tspans(lines, 38, 39)}</text>
      <line x1="38" y1="260" x2="406" y2="260" stroke="#d9bd78" stroke-width="4"/>
      <text x="38" y="304" fill="#52645b" font-family="Arial, Malgun Gothic, sans-serif" font-size="22">${escapeSvg(descriptions[index])}</text>
    </g>`;
  }).join('')}
  <rect x="92" y="760" width="1416" height="78" rx="24" fill="#0d1d17"/><text x="130" y="810" fill="#d9e9e1" font-family="Arial, Malgun Gothic, sans-serif" font-size="23">정확한 수치와 포함품은 선택한 모델의 최신 공식 문서에서 다시 확인</text>
  </svg>`;
}

function finalCheckSvg(post) {
  const title = titleBase(post);
  const focus = focusFor(post);
  const rows = [
    ['모델', '제품명과 모델번호가 공식 자료와 같은가'],
    ['옵션', `${focus[0]}·${focus[1]} 선택이 맞는가`],
    ['구성', `${focus[2]} 및 포함 수량을 확인했는가`],
    ['지원', '배송·반품·공식 서비스 조건을 읽었는가'],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" rx="52" fill="#f8f5ea"/><rect x="0" y="0" width="1600" height="104" rx="52" fill="#172c23"/><rect x="0" y="70" width="1600" height="34" fill="#172c23"/>
  <text x="92" y="68" fill="#ef8263" font-family="Arial, Malgun Gothic, sans-serif" font-size="23" font-weight="800" letter-spacing="3">ITEM.MONSTER · FINAL CHECK</text>
  <text x="92" y="188" fill="#172c23" font-family="Arial, Malgun Gothic, sans-serif" font-size="49" font-weight="800">결제 직전 네 칸 체크</text>
  <text x="92" y="244" fill="#62736a" font-family="Arial, Malgun Gothic, sans-serif" font-size="25">${escapeSvg(title)} · 하나라도 모호하면 주문을 잠시 보류하세요</text>
  ${rows.map(([label, value], index) => {
    const y = 300 + index * 126;
    const lines = wrapWords(value, 42, 2);
    return `<g transform="translate(92 ${y})"><rect width="1416" height="102" rx="23" fill="${index % 2 ? '#fffdf7' : '#e8efe9'}"/>
      <rect x="22" y="21" width="60" height="60" rx="18" fill="#ef8263"/><path d="m38 51 11 11 21-25" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="112" y="63" fill="#a34e39" font-family="Arial, Malgun Gothic, sans-serif" font-size="23" font-weight="800">${escapeSvg(label)}</text>
      <text x="252" y="46" fill="#172c23" font-family="Arial, Malgun Gothic, sans-serif" font-size="27" font-weight="700">${tspans(lines, 252, 32)}</text>
    </g>`;
  }).join('')}
  <text x="92" y="842" fill="#66766e" font-family="Arial, Malgun Gothic, sans-serif" font-size="20">아이템몬스터 직접 제작 · 가격과 재고는 판매 페이지에서 최종 확인</text>
  </svg>`;
}

async function render(filename, svg, outputDir) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outputDir, filename));
}

async function attachPostDiagrams(post, outputDir) {
  if (!post.sections?.[1] || !post.sections?.[3]) throw new Error(`${post.slug}: diagrams require at least four sections`);
  const first = `${post.slug}--buying-map.png`;
  const second = `${post.slug}--final-check.png`;
  await render(first, decisionSvg(post), outputDir);
  await render(second, finalCheckSvg(post), outputDir);
  post.sections[1] = {
    ...post.sections[1],
    image: `/images/${first}`,
    imageAlt: `${titleBase(post)} 구매 전 세 가지 핵심 확인 순서 도식`,
    imageCaption: `${focusFor(post).join('·')} 순서로 확인할 내용을 정리한 원본 도식`,
    imageCredit: '아이템몬스터 직접 제작',
  };
  post.sections[3] = {
    ...post.sections[3],
    image: `/images/${second}`,
    imageAlt: `${titleBase(post)} 결제 직전 모델 옵션 구성 지원 체크 도식`,
    imageCaption: '모델·옵션·구성·지원 조건을 결제 직전에 다시 확인하는 원본 체크표',
    imageCredit: '아이템몬스터 직접 제작',
  };
  return [first, second];
}

module.exports = { attachPostDiagrams };
