import type { MetadataRoute } from "next";
import { CATEGORIES } from "../lib/categories";
import { getPublicGuides, getPublicPosts, getPostsByCategory } from "../lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://item.monster";
  const posts = getPublicPosts();
  const guides = getPublicGuides();
  const categories = CATEGORIES.filter((category) => getPostsByCategory(category.slug).length > 0);
  const latest = [...posts, ...guides]
    .map((item) => item.updatedAt)
    .sort()
    .at(-1);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles/`,
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...(guides.length
      ? [{
          url: `${baseUrl}/guide/`,
          lastModified: latest ? new Date(latest) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }]
      : []),
    ...[
      "/about/",
      "/contact/",
      "/privacy/",
      "/terms/",
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-07-18T12:00:00+09:00"),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}/`,
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}/`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [...new Set([
        post.heroImage,
        ...post.sections.map((section) => section.image),
      ].filter((image): image is string => Boolean(image)))]
        .map((image) => new URL(image, baseUrl).toString()),
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/guide/${guide.slug}/`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: guide.heroImage ? [new URL(guide.heroImage, baseUrl).toString()] : undefined,
    })),
  ];
}
