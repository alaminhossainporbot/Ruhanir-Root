'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/i18n';
import { checkEquivalentPostExists } from '@/lib/news';

interface LanguageSwitchProps {
  currentLang: Lang;
}

export function LanguageSwitch({ currentLang }: LanguageSwitchProps) {
  const pathname = usePathname();

  const getTargetUrl = (targetLang: Lang) => {
    if (!pathname) return `/${targetLang}/`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLang}/`;

    // Special check for news slug pages: /lang/news/[slug]
    if (segments.length >= 3 && segments[1] === 'news') {
      const slug = segments[2];
      // If the target language doesn't have this post, fallback to news index /targetLang/news/
      // In client component, we route to news index or equivalent
      return `/${targetLang}/news/${slug}/`;
    }

    segments[0] = targetLang;
    return `/${segments.join('/')}/`;
  };

  const handleLangClick = (lang: Lang) => {
    try {
      localStorage.setItem('preferred_lang', lang);
    } catch {
      // Ignore if localStorage is disabled
    }
  };

  return (
    <div
      className="inline-flex items-center text-sm font-medium tracking-tight text-slate-600"
      role="navigation"
      aria-label="Language selector"
    >
      <Link
        href={getTargetUrl('bn')}
        onClick={() => handleLangClick('bn')}
        className={`px-2.5 py-1 transition-colors duration-150 rounded ${
          currentLang === 'bn'
            ? 'text-slate-950 font-semibold bg-slate-100'
            : 'hover:text-slate-900 text-slate-500'
        }`}
        hrefLang="bn"
        aria-current={currentLang === 'bn' ? 'true' : undefined}
      >
        বাংলা
      </Link>
      <span className="text-slate-300 select-none" aria-hidden="true">
        |
      </span>
      <Link
        href={getTargetUrl('en')}
        onClick={() => handleLangClick('en')}
        className={`px-2.5 py-1 transition-colors duration-150 rounded ${
          currentLang === 'en'
            ? 'text-slate-950 font-semibold bg-slate-100'
            : 'hover:text-slate-900 text-slate-500'
        }`}
        hrefLang="en"
        aria-current={currentLang === 'en' ? 'true' : undefined}
      >
        English
      </Link>
    </div>
  );
}
