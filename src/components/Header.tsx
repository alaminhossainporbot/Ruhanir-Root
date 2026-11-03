'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isLinkActive = (path: string) => {
    return pathname === `/${lang}/${path}/` || pathname === `/${lang}/${path}`;
  };

  // Scroll lock and focus management
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      const handleTabTrap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keydown', handleTabTrap);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keydown', handleTabTrap);
        const top = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (top) {
          window.scrollTo(0, -parseInt(top || '0', 10));
        }
      };
    } else {
      // Focus return on close
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[80px] border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
          {/* Brand / Logo + Wordmark */}
          <Link
            href={`/${lang}/`}
            className="flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0 min-h-[44px]"
            aria-label={c.meta.siteName}
          >
            <Logo className="h-10 w-auto" width={40} height={52} priority />
            <span className="text-xl font-bold tracking-tight text-[#0B1B3A]">
              {c.meta.siteName}
            </span>
          </Link>

          {/* Primary nav: At and above 1100px */}
          <nav
            className="desktop-nav-only items-center gap-8 text-[16px] font-medium text-[#1F2937]"
            aria-label="Primary Navigation"
          >
            <Link
              href={`/${lang}/about/`}
              className={`relative py-2 min-h-[44px] inline-flex items-center transition-colors hover:text-[#0E52C3] ${
                isLinkActive('about')
                  ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                  : ''
              }`}
            >
              {c.nav.about}
            </Link>
            <Link
              href={`/${lang}/businesses/`}
              className={`relative py-2 min-h-[44px] inline-flex items-center transition-colors hover:text-[#0E52C3] ${
                isLinkActive('businesses')
                  ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                  : ''
              }`}
            >
              {c.nav.businesses}
            </Link>
            <Link
              href={`/${lang}/news/`}
              className={`relative py-2 min-h-[44px] inline-flex items-center transition-colors hover:text-[#0E52C3] ${
                isLinkActive('news') || pathname?.includes(`/${lang}/news/`)
                  ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                  : ''
              }`}
            >
              {c.nav.news}
            </Link>
            <Link
              href={`/${lang}/contact/`}
              className={`relative py-2 min-h-[44px] inline-flex items-center transition-colors hover:text-[#0E52C3] ${
                isLinkActive('contact')
                  ? 'text-[#0E52C3] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#05308A]'
                  : ''
              }`}
            >
              {c.nav.contact}
            </Link>
          </nav>

          {/* Right side: Desktop (Divisions + Language Switch) */}
          <div className="desktop-nav-only items-center gap-6">
            <div className="flex items-center gap-4 text-[15px] font-medium text-[#374151]">
              <a
                href="https://store.ruhanir.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] text-[#1F2937] hover:text-[#0E52C3] transition-colors"
              >
                <span>{c.nav.store}</span>
                <span className="text-[14px] text-slate-400" aria-hidden="true">↗</span>
              </a>
              <span className="text-slate-300 select-none" aria-hidden="true">|</span>
              <a
                href="https://it.ruhanir.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] text-[#1F2937] hover:text-[#0E52C3] transition-colors"
              >
                <span>{c.nav.itServices}</span>
                <span className="text-[14px] text-slate-400" aria-hidden="true">↗</span>
              </a>
            </div>

            <span className="h-5 w-px bg-slate-200" aria-hidden="true" />

            <LanguageSwitch currentLang={lang} />
          </div>

          {/* Mobile Menu Button: Visible strictly below 1100px */}
          <div className="mobile-menu-btn-only items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={lang === 'bn' ? 'মেনু খুলুন' : 'Open menu'}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2.5 text-[#0B1B3A] transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0E52C3]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Panel */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'bn' ? 'মোবাইল নেভিগেশন মেনু' : 'Mobile navigation menu'}
          className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto"
          style={{
            paddingTop: 'max(1rem, var(--sat, 0px))',
            paddingBottom: 'max(1.5rem, var(--sab, 0px))',
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <Link
              href={`/${lang}/`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 min-h-[44px]"
              aria-label={c.meta.siteName}
            >
              <Logo className="h-9 w-auto" width={36} height={46} />
              <span className="text-lg font-bold tracking-tight text-[#0B1B3A]">
                {c.meta.siteName}
              </span>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={lang === 'bn' ? 'মেনু বন্ধ করুন' : 'Close menu'}
              className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2.5 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0E52C3]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Body Links */}
          <div className="flex-1 px-5 py-6 space-y-6">
            {/* Primary navigation */}
            <nav aria-label="Mobile Drawer Navigation" className="space-y-1">
              <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'bn' ? 'মূল সূচি' : 'Navigation'}
              </span>
              <Link
                href={`/${lang}/about/`}
                onClick={() => setIsOpen(false)}
                className={`min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium transition-colors ${
                  isLinkActive('about')
                    ? 'bg-blue-50 text-[#05308A] font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{c.nav.about}</span>
                <span className="text-slate-400" aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/businesses/`}
                onClick={() => setIsOpen(false)}
                className={`min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium transition-colors ${
                  isLinkActive('businesses')
                    ? 'bg-blue-50 text-[#05308A] font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{c.nav.businesses}</span>
                <span className="text-slate-400" aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/news/`}
                onClick={() => setIsOpen(false)}
                className={`min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium transition-colors ${
                  isLinkActive('news')
                    ? 'bg-blue-50 text-[#05308A] font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{c.nav.news}</span>
                <span className="text-slate-400" aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/contact/`}
                onClick={() => setIsOpen(false)}
                className={`min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium transition-colors ${
                  isLinkActive('contact')
                    ? 'bg-blue-50 text-[#05308A] font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{c.nav.contact}</span>
                <span className="text-slate-400" aria-hidden="true">→</span>
              </Link>
            </nav>

            {/* Division links */}
            <div className="pt-4 border-t border-slate-200 space-y-1">
              <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'bn' ? 'বিভাগসমূহ' : 'Divisions'}
              </span>
              <a
                href="https://store.ruhanir.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span>{c.nav.store}</span>
                <span className="text-[14px] text-slate-400" aria-label="External link">↗</span>
              </a>
              <a
                href="https://it.ruhanir.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] flex items-center justify-between rounded-lg px-4 py-3 text-[18px] font-medium text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span>{c.nav.itServices}</span>
                <span className="text-[14px] text-slate-400" aria-label="External link">↗</span>
              </a>
            </div>

            {/* Language Switch */}
            <div className="pt-4 border-t border-slate-200">
              <LanguageSwitch currentLang={lang} isMobileDrawer={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
