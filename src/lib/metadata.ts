import type { Metadata } from 'next';
import { Lang, getContent } from './i18n';

export interface RouteMeta {
  title: string;
  description: string;
}

export const ROUTE_METADATA: Record<string, Record<Lang, RouteMeta>> = {
  '': {
    en: {
      title: 'Ruhanir Engine | Parent Organization of Ruhanir IT & Store',
      description:
        "Ruhanir Engine is the technology-driven parent organization overseeing Ruhanir IT and Ruhanir Store in Bangladesh.",
    },
    bn: {
      title: 'রুহানীর ইঞ্জিন (Ruhanir Engine) | মূল সংস্থা',
      description:
        'রুহানীর ইঞ্জিন বাংলাদেশের ডিজিটাল অবকাঠামো ও বাণিজ্যে যুক্ত রুহানীর আইটি ও রুহানীর স্টোরের মূল পরিচালনা সংস্থা।',
    },
  },
  about: {
    en: {
      title: 'About Ruhanir Engine | Governance & Principles',
      description:
        'Learn about Ruhanir Engine, our operational principles, corporate governance, and institutional structure in Bangladesh.',
    },
    bn: {
      title: 'পরিচিতি | রুহানীর ইঞ্জিন (Ruhanir Engine)',
      description:
        'রুহানীর ইঞ্জিনের প্রাতিষ্ঠানিক পরিচিতি, মূলনীতি, পরিচালনা দর্শন এবং আইটি ও স্টোর বিভাগের কার্যক্রম জানুন।',
    },
  },
  leadership: {
    en: {
      title: 'Leadership | Ruhanir Engine',
      description:
        'Meet the executive leadership and governance directing Ruhanir Engine and its operational divisions in Bangladesh.',
    },
    bn: {
      title: 'নেতৃত্ব ও পরিচালনা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন এবং এর বিভাগসমূহের কৌশলগত ও প্রযুক্তিগত দিকনির্দেশনা প্রদানকারী নির্বাহী নেতৃত্ব।',
    },
  },
  'leadership/ahporbot': {
    en: {
      title: 'AL Amin Hossain Porbot | Ruhanir Engine',
      description:
        'Executive profile of AL Amin Hossain Porbot, Founder & Managing Director of Ruhanir Engine.',
    },
    bn: {
      title: 'আল আমিন হোসাইন পর্বত | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন-এর প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক আল আমিন হোসাইন পর্বত-এর প্রাতিষ্ঠানিক পরিচিতি ও দায়িত্ব।',
    },
  },
  'leadership/shakib-hassan': {
    en: {
      title: 'Md Shakib Hassan | Ruhanir Engine',
      description:
        'Executive profile of Md Shakib Hassan, Chief Executive Officer (CEO) of Ruhanir Engine.',
    },
    bn: {
      title: 'মো. সাকিব হাসান | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন-এর প্রধান নির্বাহী কর্মকর্তা (সিইও) মো. সাকিব হাসান-এর প্রাতিষ্ঠানিক পরিচিতি ও দায়িত্ব।',
    },
  },
  'leadership/rabiul-kholifa': {
    en: {
      title: 'Rabiul Islam Kholifa | Ruhanir Engine',
      description:
        'Executive profile of Rabiul Islam Kholifa, Sales and Compliance Officer at Ruhanir Engine.',
    },
    bn: {
      title: 'রবিউল ইসলাম খলিফা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন-এর বিক্রয় ও কমপ্লায়েন্স কর্মকর্তা রবিউল ইসলাম খলিফা-এর প্রাতিষ্ঠানিক পরিচিতি ও দায়িত্ব।',
    },
  },
  businesses: {
    en: {
      title: 'Divisions | Ruhanir IT & Ruhanir Store',
      description:
        "Overview of Ruhanir Engine's two specialized operating divisions: enterprise solutions by Ruhanir IT and digital commerce by Ruhanir Store.",
    },
    bn: {
      title: 'বিভাগসমূহ | রুহানীর আইটি ও রুহানীর স্টোর',
      description:
        'রুহানীর ইঞ্জিনের আওতাধীন দুটি বিশেষায়িত বিভাগ: এন্টারপ্রাইজ প্রযুক্তি সেবা রুহানীর আইটি এবং ডিজিটাল পণ্যের রুহানীর স্টোর।',
    },
  },
  contact: {
    en: {
      title: 'Contact Ruhanir Engine | Dhaka, Bangladesh',
      description:
        'Get in touch with Ruhanir Engine for corporate, enterprise IT inquiries, or store customer support in Bangladesh.',
    },
    bn: {
      title: 'যোগাযোগ | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন, রুহানীর আইটি বা রুহানীর স্টোরের যেকোনো বিষয়ে আমাদের সাথে ইমেইল, ফোন বা সরাসরি যোগাযোগ করুন।',
    },
  },
  news: {
    en: {
      title: 'News & Announcements | Ruhanir Engine',
      description:
        'Official company updates, institutional milestones, and technical announcements from Ruhanir Engine.',
    },
    bn: {
      title: 'সংবাদ ও ঘোষণা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন, রুহানীর আইটি ও রুহানীর স্টোরের প্রাতিষ্ঠানিক ঘোষণা ও সাম্প্রতিক উন্নয়ন সম্পর্কিত সংবাদ।',
    },
  },
  legal: {
    en: {
      title: 'Legal Information & Policies | Ruhanir Engine',
      description:
        "Access Ruhanir Engine's legal documents, regulatory compliance, trade license details, and institutional consumer policies.",
    },
    bn: {
      title: 'আইনি তথ্য ও নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিনের নিবন্ধন, ট্রেড লাইসেন্স, গোপনীয়তা, বিক্রয় এবং প্রাতিষ্ঠানিক সব নীতিমালার বিবরণ।',
    },
  },
  accessibility: {
    en: {
      title: 'Accessibility Statement | Ruhanir Engine',
      description:
        'Our commitments to WCAG 2.1 digital accessibility, keyboard navigability, and responsive readability across devices.',
    },
    bn: {
      title: 'অ্যাক্সেসিবিলিটি বিবরণ | রুহানীর ইঞ্জিন',
      description:
        'সবার জন্য ওয়েবসাইটের সহজ ব্যবহারযোগ্যতা ও ডিজিটাল অন্তর্ভুক্তি নিশ্চিতে রুহানীর ইঞ্জিনের পদক্ষেপ।',
    },
  },
  complaints: {
    en: {
      title: 'Complaints & Dispute Policy | Ruhanir Engine',
      description:
        'Official process and response timelines for lodging and escalating complaints regarding services or orders.',
    },
    bn: {
      title: 'অভিযোগ প্রতিকার নীতি | রুহানীর ইঞ্জিন',
      description:
        'গ্রাহক সন্তুষ্টি ও সেবা বিষয়ক অভিযোগ নিষ্পত্তির প্রাতিষ্ঠানিক সময়সীমা ও ধাপসমূহের বিবরণ।',
    },
  },
  confidentiality: {
    en: {
      title: 'Confidentiality & NDA Terms | Ruhanir Engine',
      description:
        'Institutional non-disclosure protections for corporate client proprietary data and architectural specifications.',
    },
    bn: {
      title: 'গোপনীয়তা চুক্তি শর্ত | রুহানীর ইঞ্জিন',
      description:
        'ক্লায়েন্টের বাণিজ্যিক ডেটা ও গোপনীয় তথ্য সুরক্ষায় রুহানীর ইঞ্জিনের অঙ্গীকার ও মানদণ্ড।',
    },
  },
  'cookie-policy': {
    en: {
      title: 'Cookie & Storage Policy | Ruhanir Engine',
      description:
        'Explanation of local storage usage and essential session tokens used across Ruhanir Engine websites.',
    },
    bn: {
      title: 'কুকি নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিনের পোর্টালে লোকাল স্টোরেজ ও টেকনিক্যাল সেশন ব্যবস্থাপনার বিবরণ।',
    },
  },
  'delivery-shipping': {
    en: {
      title: 'Delivery & Shipping | Ruhanir Engine',
      description:
        'Estimated transit schedules, packaging standards, and nationwide courier coverage in Bangladesh.',
    },
    bn: {
      title: 'ডেলিভারি নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'সারা বাংলাদেশে ফিজিক্যাল পণ্য পৌঁছানোর সময়সীমা ও ডেলিভারি প্রক্রিয়ার সার্বিক বিবরণ।',
    },
  },
  'digital-terms': {
    en: {
      title: 'Digital License Terms | Ruhanir Engine',
      description:
        'Licensing rules, delivery methods, and compliance governing digital keys and software product activations.',
    },
    bn: {
      title: 'ডিজিটাল লাইসেন্স শর্তাবলী | রুহানীর ইঞ্জিন',
      description:
        'সফটওয়্যার অ্যাক্টিভেশন ও ডিজিটাল লাইসেন্স সংক্রান্ত কপিরাইট এবং ব্যবহারের নিয়মাবলী।',
    },
  },
  'payment-policy': {
    en: {
      title: 'Payment Policy | Ruhanir Engine',
      description:
        'Accepted commercial payment channels, bank transfers, mobile financial services, and transaction security.',
    },
    bn: {
      title: 'পেমেন্ট নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'অনুমোদিত লেনদেন পদ্ধতি, ব্যাংক ট্রান্সফার এবং পেমেন্ট প্রক্রিয়াকরণের নিরাপত্তা সংক্রান্ত নীতিমালা।',
    },
  },
  'privacy-policy': {
    en: {
      title: 'Privacy Policy | Ruhanir Engine',
      description:
        'How Ruhanir Engine collects, stores, processes, and protects your personal information under Bangladesh regulations.',
    },
    bn: {
      title: 'গোপনীয়তা নীতি | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিন কীভাবে আপনার তথ্য সংগ্রহ, সংরক্ষণ ও সুরক্ষা নিশ্চিত করে তার পূর্ণ বিবরণ।',
    },
  },
  'returns-refunds': {
    en: {
      title: 'Return & Refund Policy | Ruhanir Engine',
      description:
        'Eligibility, verification, and return procedures for physical items and software delivered by Ruhanir.',
    },
    bn: {
      title: 'রিফান্ড ও রিটার্ন নীতি | রুহানীর ইঞ্জিন',
      description:
        'পণ্য বা সেবা বাতিলের ক্ষেত্রে প্রযোজ্য রিটার্ন ও রিফান্ড নীতিমালার স্পষ্ট প্রাতিষ্ঠানিক রূপরেখা।',
    },
  },
  security: {
    en: {
      title: 'Security Practices | Ruhanir Engine',
      description:
        'Overview of encryption standards, access controls, and responsible vulnerability reporting procedures.',
    },
    bn: {
      title: 'নিরাপত্তা নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিনের প্রযুক্তিগত নিরাপত্তা ব্যবস্থা ও সংবেদনশীল তথ্য সুরক্ষার প্রাতিষ্ঠানিক নির্দেশিকা।',
    },
  },
  'service-terms': {
    en: {
      title: 'IT Service Terms | Ruhanir Engine',
      description:
        'Engagement scopes, project deliverables, and client milestone terms for enterprise IT deployments.',
    },
    bn: {
      title: 'আইটি সেবা শর্তাবলী | রুহানীর ইঞ্জিন',
      description:
        'কাস্টম সফটওয়্যার উন্নয়ন ও এন্টারপ্রাইজ আইটি সেবা প্রদানের চুক্তিভিত্তিক শর্তাবলী।',
    },
  },
  'support-policy': {
    en: {
      title: 'Support & Maintenance Policy | Ruhanir Engine',
      description:
        'SLA commitments, technical incident response times, and ongoing maintenance coverage from Ruhanir IT.',
    },
    bn: {
      title: 'সাপোর্ট নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'আইটি সলিউশনসমূহের নিয়মিত রক্ষণাবেক্ষণ, ত্রুটি সমাধান এবং কারিগরি সহায়তা পাবার নিয়মাবলী।',
    },
  },
  terms: {
    en: {
      title: 'Terms & Conditions | Ruhanir Engine',
      description:
        'General rules and terms governing access and use of the Ruhanir Engine corporate web portal.',
    },
    bn: {
      title: 'ব্যবহারের শর্তাবলী | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর ইঞ্জিনের প্রাতিষ্ঠানিক ওয়েবসাইট ব্যবহারে প্রযোজ্য নিয়ম ও আইনি শর্তাবলীর রূপরেখা।',
    },
  },
  'terms-of-sale': {
    en: {
      title: 'Terms of Sale | Ruhanir Engine',
      description:
        'Conditions, order placements, pricing policies, and delivery expectations across Ruhanir commercial activities.',
    },
    bn: {
      title: 'বিক্রয় শর্তাবলী | রুহানীর ইঞ্জিন',
      description:
        'রুহানীর স্টোর ও অন্যান্য সেবা গ্রহণের ক্ষেত্রে প্রযোজ্য বিক্রয় ও অর্থপ্রদানের শর্তাবলী।',
    },
  },
  'warranty-policy': {
    en: {
      title: 'Warranty Policy | Ruhanir Engine',
      description:
        'Coverage terms, manufacturer claims, and post-purchase technical guarantees for products sold.',
    },
    bn: {
      title: 'ওয়ারেন্টি নীতিমালা | রুহানীর ইঞ্জিন',
      description:
        'সরবরাহকৃত পণ্য ও হার্ডওয়্যারের জন্য ওয়ারেন্টি সহায়তা ও দাবি নিষ্পত্তির প্রাতিষ্ঠানিক নির্দেশিকা।',
    },
  },
};

export function getCommonMetadata(
  lang: Lang,
  path: string = '',
  custom?: { title?: string; description?: string }
): Metadata {
  const c = getContent(lang);
  const cleanPath = path ? (path.startsWith('/') ? path.slice(1) : path).replace(/\/$/, '') : '';
  const formattedPath = cleanPath ? `/${cleanPath}/` : '/';
  const canonicalUrl = `https://ruhanir.com/${lang}${formattedPath === '/' ? '/' : formattedPath}`;

  const routeMeta = ROUTE_METADATA[cleanPath]?.[lang];
  const title = custom?.title || routeMeta?.title || c.meta.siteName;
  const description = custom?.description || routeMeta?.description || c.meta.siteDescription;

  const isProduction = process.env.SITE_ENV === 'production';

  return {
    title,
    description,
    metadataBase: new URL('https://ruhanir.com'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        bn: `https://ruhanir.com/bn${formattedPath === '/' ? '/' : formattedPath}`,
        en: `https://ruhanir.com/en${formattedPath === '/' ? '/' : formattedPath}`,
        'x-default': 'https://ruhanir.com/',
      },
    },
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    manifest: '/manifest.webmanifest',
    openGraph: {
      title,
      description,
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
      title,
      description,
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
    alternateName: ['Ruhanir', 'রুহানীর ইঞ্জিন'],
    url: 'https://ruhanir.com',
    logo: 'https://ruhanir.com/images/logo-square-512.png',
    image: 'https://ruhanir.com/logo.png',
    email: 'info@ruhanir.com',
    telephone: '+8801570225573',
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    founder: {
      '@type': 'Person',
      name: 'AL Amin Hossain Porbot',
      alternateName: 'আল আমিন হোসাইন পর্বত',
      jobTitle: 'Managing Director',
      url: 'https://ruhanir.com/en/leadership/ahporbot/',
      sameAs: ['https://github.com/alaminhossainporbot'],
    },
    sameAs: [],
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

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ruhanir Engine',
    alternateName: 'রুহানীর ইঞ্জিন',
    url: 'https://ruhanir.com',
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getContactPageJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: lang === 'bn' ? 'যোগাযোগ' : 'Contact Ruhanir Engine',
    url: `https://ruhanir.com/${lang}/contact/`,
    mainEntity: {
      '@type': 'ContactPoint',
      telephone: '+8801570225573',
      contactType: 'customer service',
      email: 'info@ruhanir.com',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English'],
    },
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
        url: 'https://ruhanir.com/images/logo-square-512.png',
      },
    },
    image: ['https://ruhanir.com/og-image.png'],
  };
}

export function getPersonJsonLd(lang: Lang, slug: string = 'ahporbot') {
  if (slug === 'shakib-hassan') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: lang === 'bn' ? 'মো. সাকিব হাসান' : 'Md Shakib Hassan',
      alternateName: lang === 'bn' ? 'Md Shakib Hassan' : 'মো. সাকিব হাসান',
      jobTitle: lang === 'bn' ? 'প্রধান নির্বাহী কর্মকর্তা (সিইও)' : 'Chief Executive Officer (CEO)',
      worksFor: {
        '@type': 'Organization',
        name: lang === 'bn' ? 'রুহানীর ইঞ্জিন' : 'Ruhanir Engine',
        url: 'https://ruhanir.com',
      },
      url: `https://ruhanir.com/${lang}/leadership/shakib-hassan/`,
      image: 'https://ruhanir.com/images/leadership/shakib-hassan-800.webp',
      sameAs: [],
    };
  }

  if (slug === 'rabiul-kholifa') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: lang === 'bn' ? 'রবিউল ইসলাম খলিফা' : 'Rabiul Islam Kholifa',
      alternateName: lang === 'bn' ? 'Rabiul Islam Kholifa' : 'রবিউল ইসলাম খলিফা',
      jobTitle: lang === 'bn' ? 'বিক্রয় ও কমপ্লায়েন্স কর্মকর্তা' : 'Sales and Compliance Officer',
      worksFor: {
        '@type': 'Organization',
        name: lang === 'bn' ? 'রুহানীর ইঞ্জিন' : 'Ruhanir Engine',
        url: 'https://ruhanir.com',
      },
      url: `https://ruhanir.com/${lang}/leadership/rabiul-kholifa/`,
      image: 'https://ruhanir.com/images/leadership/rabiul-kholifa-800.webp',
      sameAs: [],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: lang === 'bn' ? 'আল আমিন হোসাইন পর্বত' : 'AL Amin Hossain Porbot',
    alternateName: lang === 'bn' ? 'AL Amin Hossain Porbot' : 'আল আমিন হোসাইন পর্বত',
    jobTitle: lang === 'bn' ? 'ব্যবস্থাপনা পরিচালক' : 'Managing Director',
    worksFor: {
      '@type': 'Organization',
      name: lang === 'bn' ? 'রুহানীর ইঞ্জিন' : 'Ruhanir Engine',
      url: 'https://ruhanir.com',
    },
    url: `https://ruhanir.com/${lang}/leadership/ahporbot/`,
    image: 'https://ruhanir.com/images/leadership/ahporbot-800.webp',
    sameAs: ['https://github.com/alaminhossainporbot'],
  };
}
