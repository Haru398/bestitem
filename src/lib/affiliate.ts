export const COUPANG_PARTNERS_DISCLOSURE =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

const COUPANG_AFFILIATE_HOST = "link.coupang.com";
const COUPANG_EMBED_HOSTS = new Set(["coupa.ng", "ads-partners.coupang.com"]);
const EMBED_ATTRIBUTES = new Set([
  "src",
  "width",
  "height",
  "frameborder",
  "scrolling",
  "referrerpolicy",
  "browsingtopics",
]);

function parseHttpsUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function getSafeCoupangAffiliateUrl(value?: string): string | null {
  if (!value) return null;
  const url = parseHttpsUrl(value);
  if (!url || url.hostname !== COUPANG_AFFILIATE_HOST || !url.pathname.startsWith("/a/")) {
    return null;
  }
  return url.toString();
}

/**
 * Keeps Coupang's generated iframe intact only after accepting its small,
 * explicit attribute allowlist. Raw spreadsheet HTML is never rendered.
 */
export function getSafeCoupangAffiliateHtml(value?: string): string | null {
  if (!value) return null;
  const html = value.trim();
  const iframe = html.match(/^<iframe\b([^>]*)><\/iframe>$/i);
  if (!iframe) return null;

  const attributes = new Map<string, string | null>();
  const text = iframe[1];
  const attributePattern = /\s+([a-z][a-z0-9-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/gi;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = attributePattern.exec(text)) !== null) {
    if (match.index !== cursor) return null;
    cursor = attributePattern.lastIndex;

    const name = match[1].toLowerCase();
    if (!EMBED_ATTRIBUTES.has(name) || attributes.has(name)) return null;
    attributes.set(name, match[2] ?? match[3] ?? null);
  }

  if (cursor !== text.length) return null;

  const src = attributes.get("src");
  const width = attributes.get("width");
  const height = attributes.get("height");
  if (!src || !width || !height) return null;

  const srcUrl = parseHttpsUrl(src);
  if (!srcUrl || !COUPANG_EMBED_HOSTS.has(srcUrl.hostname)) return null;
  if (!/^\d{1,4}$/.test(width) || !/^\d{1,4}$/.test(height)) return null;
  if (Number(width) < 1 || Number(width) > 1200 || Number(height) < 1 || Number(height) > 2000) return null;
  if (attributes.has("frameborder") && attributes.get("frameborder") !== "0") return null;
  if (attributes.has("scrolling") && attributes.get("scrolling") !== "no") return null;
  if (attributes.has("referrerpolicy") && attributes.get("referrerpolicy") !== "unsafe-url") return null;
  if (attributes.has("browsingtopics") && attributes.get("browsingtopics") !== null) return null;

  return html;
}
