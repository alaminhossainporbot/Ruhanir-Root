import type { Metadata } from 'next';

export interface MetadataOptions {
  siteName: string;
  siteDescription: string;
  canonicalOrigin: string; // e.g. 'https://it.ruhanir.com' or 'https://store.ruhanir.com'
  lang: 'en' | 'bn';
  path?: string;
  ogImage?: string;
  isProduction?: boolean;
}

export function buildSiteMetadata(options: MetadataOptions): Metadata {
  const {
    siteName,
    siteDescription,
    canonicalOrigin,
    lang,
    path = '',
    ogImage = '/og-image.png',
    isProduction = process.env.SITE_ENV === 'production',
  } = options;

  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const formattedPath = cleanPath ? (cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`) : '/';
  const canonicalUrl = `${canonicalOrigin}${formattedPath}`;

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: new URL(canonicalOrigin),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${canonicalOrigin}/en${formattedPath === '/' ? '/' : formattedPath.replace(/^\/(en|bn)/, '')}`,
        bn: `${canonicalOrigin}/bn${formattedPath === '/' ? '/' : formattedPath.replace(/^\/(en|bn)/, '')}`,
        'x-default': `${canonicalOrigin}/`,
      },
    },
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: siteName,
      description: siteDescription,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: lang === 'bn' ? `${siteName} লোগো` : `${siteName} Logo`,
        },
      ],
      locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
      images: [ogImage],
    },
  };
}
