import type { MetadataRoute } from "next";
import { CATEGORIES } from "../lib/categories";
import { getAllGuides, getAllPosts } from "../lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://item.monster";
  const posts = getAllPosts().filter((post) => post.indexable);
  const guides = getAllGuides().filter((guide) => guide.indexable);
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
    {
      url: `${baseUrl}/guide/`,
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date("2026-07-14T00:00:00+09:00"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...CATEGORIES.map((category) => ({
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
      images: post.heroImage ? [new URL(post.heroImage, baseUrl).toString()] : undefined,
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/guide/${guide.slug}/`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
