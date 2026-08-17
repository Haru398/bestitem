import { getPublicGuides, getPublicPosts, plainText } from "../../lib/content";
import type { GuideContent, PostContent } from "../../lib/content-types";

export const dynamic = "force-static";

const BASE_URL = "https://item.monster";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string): string {
  return value.replace(/]]>/g, "]]]]><![CDATA[>");
}

function postHtml(post: PostContent): string {
  const paragraphs = [
    `<p>${escapeXml(plainText(post.intro))}</p>`,
    ...post.sections.map((section) =>
      `<h2>${escapeXml(plainText(section.heading))}</h2><p>${escapeXml(plainText(section.body))}</p>`,
    ),
    `<p>${escapeXml(plainText(post.conclusion))}</p>`,
  ];
  return paragraphs.join("");
}

function guideHtml(guide: GuideContent): string {
  return guide.content
    .split(/\n{2,}/)
    .map((block) => {
      const value = block.trim();
      if (!value) return "";
      const heading = value.match(/^##\s+(.+)$/);
      if (heading) return `<h2>${escapeXml(plainText(heading[1]))}</h2>`;
      const unordered = value.split("\n").filter((line) => /^-\s+/.test(line));
      if (unordered.length && unordered.length === value.split("\n").length) {
        return `<ul>${unordered.map((line) => `<li>${escapeXml(plainText(line.replace(/^-\s+/, "")))}</li>`).join("")}</ul>`;
      }
      const ordered = value.split("\n").filter((line) => /^\d+\.\s+/.test(line));
      if (ordered.length && ordered.length === value.split("\n").length) {
        return `<ol>${ordered.map((line) => `<li>${escapeXml(plainText(line.replace(/^\d+\.\s+/, "")))}</li>`).join("")}</ol>`;
      }
      return `<p>${escapeXml(plainText(value))}</p>`;
    })
    .join("");
}

export function GET() {
  const entries = [
    ...getPublicPosts().map((content) => ({ content, type: "post" as const })),
    ...getPublicGuides().map((content) => ({ content, type: "guide" as const })),
  ]
    .sort((a, b) => b.content.publishedAt.localeCompare(a.content.publishedAt))
    .slice(0, 50);
  const lastBuildDate = entries[0]?.content.updatedAt || "2026-07-18T12:00:00+09:00";
  const items = entries.map(({ content, type }) => {
    const url = `${BASE_URL}/${type}/${content.slug}/`;
    const html = type === "post" ? postHtml(content) : guideHtml(content);
    return `<item>
      <title>${escapeXml(content.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(content.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(content.description)}</description>
      <content:encoded><![CDATA[${cdata(html)}]]></content:encoded>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>아이템몬스터 최신 구매 점검 글과 선택 가이드</title>
    <link>${BASE_URL}/</link>
    <description>상품명보다 모델·구성·호환 조건을 먼저 확인하는 최신 구매 점검 글과 공식 자료 기반 선택 가이드</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
