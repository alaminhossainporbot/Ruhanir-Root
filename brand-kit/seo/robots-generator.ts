import { MetadataRoute } from 'next';

export function buildRobotsRules(baseUrl: string): MetadataRoute.Robots {
  const isProduction = process.env.SITE_ENV === 'production';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
