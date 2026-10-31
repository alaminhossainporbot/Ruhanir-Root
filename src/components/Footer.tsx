import Link from 'next/link';
import { Lang, getContent } from '@/lib/i18n';
import { toBanglaDigits } from '@/lib/digits';
import { Logo } from './Logo';

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const c = getContent(lang);
  const currentYear = new Date().getFullYear();
  const yearFormatted = lang === 'bn' ? toBanglaDigits(currentYear) : currentYear.toString();
  const copyrightText = c.footer.copyright.replace('{year}', yearFormatted);

  return (
    <footer className="border-t border-slate-200 bg-[#F5F7FA] text-[#374151]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & One-line description */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              href={`/${lang}/`}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label={c.meta.siteName}
            >
              <Logo className="h-8 w-auto" width={32} height={42} />
              <span className="text-base font-bold tracking-tight text-[#0B1B3A]">
                {c.meta.siteName}
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-[#4B5563]">
              {c.footer.description}
            </p>
          </div>

          {/* Column 2: Divisions */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {c.footer.columns.divisions}
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a
                  href="https://it.ruhanir.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  <span>{c.footer.itLink}</span>
                  <span className="text-[12px] text-slate-400" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://store.ruhanir.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  <span>{c.footer.storeLink}</span>
                  <span className="text-[12px] text-slate-400" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {c.footer.columns.company}
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <Link
                  href={`/${lang}/about/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/businesses/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.nav.businesses}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/news/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.nav.news}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {c.footer.columns.contact}
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a
                  href="mailto:info@ruhanir.com"
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  info@ruhanir.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@ruhanir.com"
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  support@ruhanir.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801570225573"
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  +880 1570225573
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {c.footer.columns.legal}
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <Link
                  href={`/${lang}/privacy-policy/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.footer.legalLinks.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.footer.legalLinks.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/cookie-policy/`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {c.footer.legalLinks.cookies}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal/`}
                  className="font-medium text-[#0E52C3] hover:underline"
                >
                  {c.footer.legalLinks.allPolicies} →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright left, trade license right */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-[15px] text-[#4B5563] sm:flex-row sm:items-center">
          <p>{copyrightText}</p>
          <p className="font-medium text-[#1F2937]">{c.footer.tradeLicense}</p>
        </div>
      </div>
    </footer>
  );
}
