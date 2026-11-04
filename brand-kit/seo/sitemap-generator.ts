import { MetadataRoute } from 'next';

export interface RouteEntry {
  path: string; // e.g. '', 'about', 'services'
  lastModified: Date | string;
  changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

export function buildSitemapEntries(
  baseUrl: string,
  routes: RouteEntry[]
): MetadataRoute.Sitemap {
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

  for (const r of routes) {
    const formattedPath = r.path ? `${r.path}/` : '';
    const dateObj = typeof r.lastModified === 'string' ? new Date(r.lastModified) : r.lastModified;

    // EN Entry
    entries.push({
      url: `${baseUrl}/en/${formattedPath}`,
      lastModified: dateObj,
      changeFrequency: r.changeFrequency || 'monthly',
      priority: r.priority || 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${formattedPath}`,
          bn: `${baseUrl}/bn/${formattedPath}`,
        },
      },
    });

    // BN Entry
    entries.push({
      url: `${baseUrl}/bn/${formattedPath}`,
      lastModified: dateObj,
      changeFrequency: r.changeFrequency || 'monthly',
      priority: r.priority || 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${formattedPath}`,
          bn: `${baseUrl}/bn/${formattedPath}`,
        },
      },
    });
  }

  return entries;
}
