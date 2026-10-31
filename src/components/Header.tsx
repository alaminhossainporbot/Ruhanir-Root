'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang, getContent } from '@/lib/i18n';
import { Logo } from './Logo';
import { LanguageSwitch } from './LanguageSwitch';

interface HeaderProps {
  lang: Lang;
}

export function Header({ lang }: HeaderProps) {
  const c = getContent(lang);
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    return pathname === `/${lang}/${path}/` || pathname === `/${lang}/${path}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[80px] border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 sm:px-8">
        {/* Brand / Logo + Wordmark */}
        <Link
          href={`/${lang}/`}
          className="flex items-center gap-3.5 transition-opacity hover:opacity-90 shrink-0"
          aria-label={c.meta.siteName}
        >
          <Logo className="h-10 w-auto" width={40} height={52} priority />
          <span className="text-xl font-bold tracking-tight text-[#0B1B3A]">
            {c.meta.siteName}
          </span>
        </Link>

        {/* Primary nav: About, Businesses, News, Contact */}
        <nav
          className="hidden lg:flex items-center gap-8 text-[16px] font-medium text-[#1F2937]"
          aria-label="Primary Navigation"
        >
          <Link
            href={`/${lang}/about/`}
            className={`relative py-2 transition-colors hover:text-[#0E52C3] ${
              isLinkActive('about')
                ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                : ''
            }`}
          >
            {c.nav.about}
          </Link>
          <Link
            href={`/${lang}/businesses/`}
            className={`relative py-2 transition-colors hover:text-[#0E52C3] ${
              isLinkActive('businesses')
                ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                : ''
            }`}
          >
            {c.nav.businesses}
          </Link>
          <Link
            href={`/${lang}/news/`}
            className={`relative py-2 transition-colors hover:text-[#0E52C3] ${
              isLinkActive('news') || pathname?.includes(`/${lang}/news/`)
                ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                : ''
            }`}
          >
            {c.nav.news}
          </Link>
          <Link
            href={`/${lang}/contact/`}
            className={`relative py-2 transition-colors hover:text-[#0E52C3] ${
              isLinkActive('contact')
                ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                : ''
            }`}
          >
            {c.nav.contact}
          </Link>
        </nav>

        {/* Right side: Divisions (Store, IT Services) + Language switch */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-[15px] font-medium text-[#374151]">
            <a
              href="https://store.ruhanir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1F2937] hover:text-[#0E52C3] transition-colors"
            >
              <span>{c.nav.store}</span>
              <span className="text-[12px] text-slate-400" aria-hidden="true">↗</span>
            </a>
            <span className="text-slate-300 select-none" aria-hidden="true">|</span>
            <a
              href="https://it.ruhanir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1F2937] hover:text-[#0E52C3] transition-colors"
            >
              <span>{c.nav.itServices}</span>
              <span className="text-[12px] text-slate-400" aria-hidden="true">↗</span>
            </a>
          </div>

          <span className="hidden sm:block h-5 w-px bg-slate-200" aria-hidden="true" />

          <LanguageSwitch currentLang={lang} />
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-2">
        <nav
          className="flex flex-wrap items-center justify-between gap-y-2 text-[15px] font-medium text-[#374151]"
          aria-label="Mobile Navigation"
        >
          <Link
            href={`/${lang}/about/`}
            className={`hover:text-slate-900 ${isLinkActive('about') ? 'text-[#0E52C3] font-semibold' : ''}`}
          >
            {c.nav.about}
          </Link>
          <Link
            href={`/${lang}/businesses/`}
            className={`hover:text-slate-900 ${isLinkActive('businesses') ? 'text-[#0E52C3] font-semibold' : ''}`}
          >
            {c.nav.businesses}
          </Link>
          <Link
            href={`/${lang}/news/`}
            className={`hover:text-slate-900 ${isLinkActive('news') ? 'text-[#0E52C3] font-semibold' : ''}`}
          >
            {c.nav.news}
          </Link>
          <Link
            href={`/${lang}/contact/`}
            className={`hover:text-slate-900 ${isLinkActive('contact') ? 'text-[#0E52C3] font-semibold' : ''}`}
          >
            {c.nav.contact}
          </Link>
          <a
            href="https://store.ruhanir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-[#0E52C3]"
          >
            {c.nav.store} <span className="text-[12px]">↗</span>
          </a>
          <a
            href="https://it.ruhanir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-[#0E52C3]"
          >
            {c.nav.itServices} <span className="text-[12px]">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
