import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      }
    ],
    sitemap: 'https://item.monster/sitemap.xml',
  };
}
