import { MetadataRoute } from 'next';
import { getAllNews } from '@/lib/news';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruhanir.com';
  const routes = [
    '',
    'about',
    'leadership',
    'leadership/ahporbot',
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
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          bn: `${baseUrl}/bn/`,
        },
      },
    },
  ];

  for (const lang of languages) {
    for (const route of routes) {
      const path = route ? `${route}/` : '';
      const isPolicy =
        route !== '' &&
        route !== 'about' &&
        route !== 'leadership' &&
        route !== 'leadership/ahporbot' &&
        route !== 'businesses' &&
        route !== 'news' &&
        route !== 'contact';

      const lastModified = isPolicy
        ? new Date('2026-10-29')
        : new Date('2026-11-07');

      entries.push({
        url: `${baseUrl}/${lang}/${path}`,
        lastModified,
        changeFrequency: route === '' || route === 'news' ? 'weekly' : 'monthly',
        priority: route === '' ? 0.9 : isPolicy ? 0.6 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${path}`,
            bn: `${baseUrl}/bn/${path}`,
          },
        },
      });
    }

    // Add news articles
    const posts = getAllNews(lang);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${lang}/news/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/news/${post.slug}/`,
            bn: `${baseUrl}/bn/news/${post.slug}/`,
          },
        },
      });
    }
  }

  return entries;
}
