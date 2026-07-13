import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview-test/"],
    },
    sitemap: "https://item.monster/sitemap.xml",
    host: "https://item.monster",
  };
}
