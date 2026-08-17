import { getPublicPosts, plainText } from "../../lib/content";

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

function articleHtml(post: ReturnType<typeof getPublicPosts>[number]): string {
  const paragraphs = [
    `<p>${escapeXml(plainText(post.intro))}</p>`,
    ...post.sections.map((section) =>
      `<h2>${escapeXml(plainText(section.heading))}</h2><p>${escapeXml(plainText(section.body))}</p>`,
    ),
    `<p>${escapeXml(plainText(post.conclusion))}</p>`,
  ];
  return paragraphs.join("");
}

export function GET() {
  const posts = getPublicPosts().slice(0, 50);
  const lastBuildDate = posts[0]?.updatedAt || "2026-07-18T12:00:00+09:00";
  const items = posts.map((post) => {
    const url = `${BASE_URL}/post/${post.slug}/`;
    return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${cdata(articleHtml(post))}]]></content:encoded>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>아이템몬스터 최신 구매 점검 글</title>
    <link>${BASE_URL}/</link>
    <description>상품명보다 모델·구성·호환 조건을 먼저 확인하는 최신 구매 점검 글</description>
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
