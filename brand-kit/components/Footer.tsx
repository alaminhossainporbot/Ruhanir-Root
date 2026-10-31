import Link from 'next/link';
import { Logo } from './Logo';
import { Lang } from './LanguageSwitch';

export interface FooterLinkItem {
  label: { en: string; bn: string };
  href: string;
}

export interface FooterConfig {
  siteName: { en: string; bn: string };
  description: { en: string; bn: string };
  tradeLicense: { en: string; bn: string };
  companyLinks: FooterLinkItem[];
  divisionLinks: { label: { en: string; bn: string }; url: string }[];
  legalLinks: FooterLinkItem[];
  emails: { general: string; support: string };
  phone: string;
}

interface FooterProps {
  lang: Lang;
  config: FooterConfig;
}

export function Footer({ lang, config }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const yearFormatted =
    lang === 'bn'
      ? String(currentYear).replace(/[0-9]/g, (d) => ('০১২৩৪৫৬৭৮৯'[Number(d)]))
      : currentYear.toString();

  const copyrightText =
    lang === 'bn'
      ? `© ${yearFormatted} ${config.siteName.bn}। সর্বস্বত্ব সংরক্ষিত।`
      : `© ${yearFormatted} ${config.siteName.en}. All rights reserved.`;

  return (
    <footer className="border-t border-slate-200 bg-[#F5F7FA] text-[#374151]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              href={`/${lang}/`}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label={config.siteName[lang]}
            >
              <Logo className="h-8 w-auto" width={32} height={42} />
              <span className="text-base font-bold tracking-tight text-[#0B1B3A]">
                {config.siteName[lang]}
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-[#4B5563]">
              {config.description[lang]}
            </p>
          </div>

          {/* Column 2: Divisions */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {lang === 'bn' ? 'বিভাগসমূহ' : 'Divisions'}
            </h3>
            <ul className="space-y-2 text-[15px]">
              {config.divisionLinks.map((div) => (
                <li key={div.url}>
                  <a
                    href={`${div.url.replace(/\/$/, '')}/${lang}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#374151] hover:text-[#0E52C3] transition-colors"
                  >
                    <span>{div.label[lang]}</span>
                    <span className="text-[12px] text-slate-400" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {lang === 'bn' ? 'প্রতিষ্ঠান' : 'Company'}
            </h3>
            <ul className="space-y-2 text-[15px]">
              {config.companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h3>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a
                  href={`mailto:${config.emails.general}`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {config.emails.general}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.emails.support}`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {config.emails.support}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                >
                  {config.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[#0B1B3A]">
              {lang === 'bn' ? 'আইনি ও নীতিমালা' : 'Legal'}
            </h3>
            <ul className="space-y-2 text-[15px]">
              {config.legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${lang}${item.href}`}
                    className="text-[#374151] hover:text-[#0E52C3] transition-colors"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-[15px] text-[#4B5563] sm:flex-row sm:items-center">
          <p>{copyrightText}</p>
          <p className="font-medium text-[#1F2937]">{config.tradeLicense[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
