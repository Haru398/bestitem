import { MetadataRoute } from 'next';
import db from '../lib/db';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://item.monster';

  const stmt = db.prepare("SELECT postId, createdAt FROM posts_v2");
  const posts = stmt.all() as { postId: string, createdAt: string }[];

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.postId}`,
    lastModified: new Date(post.createdAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
  ];
}
