import { MetadataRoute } from 'next';
import { getAllNews } from '@/lib/news';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruhanir.com';
  const routes = [
    '',
    'about',
    'businesses',
    'news',
    'contact',
    'legal',
    'privacy-policy',
    'terms',
    'cookie-policy',
    'accessibility',
    'security',
    'complaints',
    'terms-of-sale',
    'returns-refunds',
    'delivery-shipping',
    'payment-policy',
    'digital-terms',
    'warranty-policy',
    'service-terms',
    'support-policy',
    'confidentiality',
  ];
  const languages: ('bn' | 'en')[] = ['bn', 'en'];

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  for (const lang of languages) {
    for (const route of routes) {
      const path = route ? `${route}/` : '';
      entries.push({
        url: `${baseUrl}/${lang}/${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === 'news' ? 'weekly' : 'monthly',
        priority: route === '' ? 0.9 : 0.7,
      });
    }

    // Add news articles
    const posts = getAllNews(lang);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${lang}/news/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
