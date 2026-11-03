'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/i18n';

interface LanguageSwitchProps {
  currentLang: Lang;
  className?: string;
  isMobileDrawer?: boolean;
}

export function LanguageSwitch({
  currentLang,
  className = '',
  isMobileDrawer = false,
}: LanguageSwitchProps) {
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

  if (isMobileDrawer) {
    return (
      <div
        className={`flex flex-col gap-2.5 w-full ${className}`}
        role="navigation"
        aria-label="Language selector"
      >
        <span className="text-[14px] font-semibold uppercase tracking-wider text-slate-500">
          {currentLang === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}
        </span>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Link
            href={getTargetUrl('bn')}
            onClick={() => handleLangClick('bn')}
            className={`min-h-[48px] px-4 py-3 rounded-lg border text-center font-bold text-[16px] inline-flex items-center justify-center transition-colors ${
              currentLang === 'bn'
                ? 'bg-[#05308A] text-white border-[#05308A]'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
            hrefLang="bn"
            aria-current={currentLang === 'bn' ? 'true' : undefined}
          >
            বাংলা
          </Link>
          <Link
            href={getTargetUrl('en')}
            onClick={() => handleLangClick('en')}
            className={`min-h-[48px] px-4 py-3 rounded-lg border text-center font-bold text-[16px] inline-flex items-center justify-center transition-colors ${
              currentLang === 'en'
                ? 'bg-[#05308A] text-white border-[#05308A]'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
            hrefLang="en"
            aria-current={currentLang === 'en' ? 'true' : undefined}
          >
            English
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50/90 p-1 text-[14px] font-semibold shadow-xs ${className}`}
      role="navigation"
      aria-label="Language selector"
    >
      <Link
        href={getTargetUrl('bn')}
        onClick={() => handleLangClick('bn')}
        className={`inline-flex items-center justify-center min-h-[44px] min-w-[56px] rounded-full px-3.5 py-2 transition-all duration-150 ${
          currentLang === 'bn'
            ? 'bg-white text-[#0B1B3A] shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        hrefLang="bn"
        aria-current={currentLang === 'bn' ? 'true' : undefined}
      >
        বাংলা
      </Link>
      <Link
        href={getTargetUrl('en')}
        onClick={() => handleLangClick('en')}
        className={`inline-flex items-center justify-center min-h-[44px] min-w-[48px] rounded-full px-3.5 py-2 transition-all duration-150 ${
          currentLang === 'en'
            ? 'bg-white text-[#0B1B3A] shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        hrefLang="en"
        aria-current={currentLang === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
