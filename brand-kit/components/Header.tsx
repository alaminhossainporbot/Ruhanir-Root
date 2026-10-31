'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { LanguageSwitch, Lang } from './LanguageSwitch';

export interface NavItem {
  label: { en: string; bn: string };
  href: string; // e.g. '/about/'
}

export interface OutboundDivisionLink {
  label: { en: string; bn: string };
  url: string; // e.g. 'https://store.ruhanir.com'
}

export interface HeaderConfig {
  siteName: { en: string; bn: string };
  navItems: NavItem[];
  divisionLinks: OutboundDivisionLink[];
}

interface HeaderProps {
  lang: Lang;
  config: HeaderConfig;
}

export function Header({ lang, config }: HeaderProps) {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    return pathname === `/${lang}${path}` || pathname === `/${lang}${path}/`;
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[80px] border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <Link
          href={`/${lang}/`}
          className="flex items-center gap-3.5 transition-opacity hover:opacity-90 shrink-0"
          aria-label={config.siteName[lang]}
        >
          <Logo className="h-10 w-auto" width={40} height={52} priority />
          <span className="text-xl font-bold tracking-tight text-[#0B1B3A]">
            {config.siteName[lang]}
          </span>
        </Link>

        {/* Primary nav */}
        <nav
          className="hidden lg:flex items-center gap-8 text-[16px] font-medium text-[#1F2937]"
          aria-label="Primary Navigation"
        >
          {config.navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className={`relative py-2 transition-colors hover:text-[#0E52C3] ${
                isLinkActive(item.href)
                  ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                  : ''
              }`}
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>

        {/* Outbound division links + Language switcher */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-[15px] font-medium text-[#374151]">
            {config.divisionLinks.map((div, idx) => (
              <span key={div.url} className="inline-flex items-center gap-4">
                {idx > 0 && (
                  <span className="text-slate-300 select-none" aria-hidden="true">
                    |
                  </span>
                )}
                {/* Rule 3: Keep the current language prefix when navigating between sites */}
                <a
                  href={`${div.url.replace(/\/$/, '')}/${lang}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1F2937] hover:text-[#0E52C3] transition-colors"
                >
                  <span>{div.label[lang]}</span>
                  <span className="text-[12px] text-slate-400" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </span>
            ))}
          </div>

          <span className="hidden sm:block h-5 w-px bg-slate-200" aria-hidden="true" />
          <LanguageSwitch currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
