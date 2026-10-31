import type { Metadata } from 'next';
import { Lang, getContent } from './i18n';

export function getCommonMetadata(lang: Lang, path: string = ''): Metadata {
  const c = getContent(lang);
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `https://ruhanir.com/${lang}${cleanPath}/`;

  return {
    title: {
      default: c.meta.siteName,
      template: `%s | ${c.meta.siteName}`,
    },
    description: c.meta.siteDescription,
    metadataBase: new URL('https://ruhanir.com'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        bn: `https://ruhanir.com/bn${cleanPath}/`,
        en: `https://ruhanir.com/en${cleanPath}/`,
        'x-default': 'https://ruhanir.com/',
      },
    },
    openGraph: {
      title: c.meta.siteName,
      description: c.meta.siteDescription,
      url: canonicalUrl,
      siteName: c.meta.siteName,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: lang === 'bn' ? 'রুহানীর ইঞ্জিন লোগো' : 'Ruhanir Engine Logo',
        },
      ],
      locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.siteName,
      description: c.meta.siteDescription,
      images: ['/og-image.png'],
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ruhanir Engine',
    alternateName: 'রুহানীর ইঞ্জিন',
    url: 'https://ruhanir.com',
    logo: 'https://ruhanir.com/logo.png',
    email: 'info@ruhanir.com',
    telephone: '+8801570225573',
    sameAs: ['https://it.ruhanir.com', 'https://store.ruhanir.com'],
    subOrganization: [
      {
        '@type': 'Organization',
        name: 'Ruhanir IT',
        alternateName: 'রুহানীর আইটি',
        url: 'https://it.ruhanir.com',
        description:
          'Custom software architecture and enterprise solutions: ERP, SaaS, customized applications and network setup.',
      },
      {
        '@type': 'Organization',
        name: 'Ruhanir Store',
        alternateName: 'রুহানীর স্টোর',
        url: 'https://store.ruhanir.com',
        description: 'Digital licenses and premium physical products.',
      },
    ],
  };
}

export function getArticleJsonLd(post: {
  title: string;
  date: string;
  summary: string;
  slug: string;
  lang: Lang;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ruhanir.com/${post.lang}/news/${post.slug}/`,
    },
    author: {
      '@type': 'Organization',
      name: post.lang === 'bn' ? 'রুহানীর ইঞ্জিন' : 'Ruhanir Engine',
      url: 'https://ruhanir.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ruhanir Engine',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ruhanir.com/logo.png',
      },
    },
    image: ['https://ruhanir.com/og-image.png'],
  };
}
