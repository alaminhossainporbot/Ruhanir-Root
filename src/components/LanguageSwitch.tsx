'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/i18n';

interface LanguageSwitchProps {
  currentLang: Lang;
}

export function LanguageSwitch({ currentLang }: LanguageSwitchProps) {
  const pathname = usePathname();

  const getTargetUrl = (targetLang: Lang) => {
    if (!pathname) return `/${targetLang}/`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLang}/`;

    if (segments.length >= 3 && segments[1] === 'news') {
      const slug = segments[2];
      return `/${targetLang}/news/${slug}/`;
    }

    segments[0] = targetLang;
    return `/${segments.join('/')}/`;
  };

  const handleLangClick = (lang: Lang) => {
    try {
      localStorage.setItem('preferred_lang', lang);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-semibold shadow-xs"
      role="navigation"
      aria-label="Language selector"
    >
      <Link
        href={getTargetUrl('bn')}
        onClick={() => handleLangClick('bn')}
        className={`rounded-full px-3 py-1 transition-all duration-150 ${
          currentLang === 'bn'
            ? 'bg-white text-[#0B1B3A] shadow-xs font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
        hrefLang="bn"
        aria-current={currentLang === 'bn' ? 'true' : undefined}
      >
        বাংলা
      </Link>
      <Link
        href={getTargetUrl('en')}
        onClick={() => handleLangClick('en')}
        className={`rounded-full px-3 py-1 transition-all duration-150 ${
          currentLang === 'en'
            ? 'bg-white text-[#0B1B3A] shadow-xs font-bold'
            : 'text-slate-500 hover:text-slate-900'
        }`}
        hrefLang="en"
        aria-current={currentLang === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
