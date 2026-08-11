import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Next의 정적 내보내기가 각 페이지에 생성하는 RSC 데이터입니다.
      // 사람과 검색 결과에 보여 줄 HTML 문서가 아니므로 크롤링 대상에서 뺍니다.
      disallow: ["/api/", "/*__next.*.txt$", "/_not-found/"],
    },
    sitemap: "https://item.monster/sitemap.xml",
  };
}
