import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { toBanglaDigits } from '@/lib/digits';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface LegalLayoutProps {
  lang: Lang;
  title: string;
  lastUpdated: string;
  slug?: string;
  toc?: { id: string; title: string }[];
  children: React.ReactNode;
}

export function LegalLayout({
  lang,
  title,
  lastUpdated,
  slug = '',
  toc,
  children,
}: LegalLayoutProps) {
  const formattedDate =
    lang === 'bn'
      ? `${toBanglaDigits('29')} অক্টোবর ${toBanglaDigits('2026')}`
      : '29 October 2026';

  const breadcrumbItems = [
    {
      name: lang === 'bn' ? 'আইনি তথ্য' : 'Legal Information',
      url: `https://ruhanir.com/${lang}/legal/`,
    },
    ...(slug
      ? [
          {
            name: title,
            url: `https://ruhanir.com/${lang}/${slug}/`,
          },
        ]
      : []),
  ];

  const relatedLinks = [
    {
      name: lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy',
      href: `/${lang}/privacy-policy/`,
    },
    {
      name: lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms and Conditions',
      href: `/${lang}/terms/`,
    },
    {
      name: lang === 'bn' ? 'কুকি নীতিমালা' : 'Cookie Policy',
      href: `/${lang}/cookie-policy/`,
    },
    {
      name: lang === 'bn' ? 'অভিযোগ প্রতিকার' : 'Complaints Policy',
      href: `/${lang}/complaints/`,
    },
    {
      name: lang === 'bn' ? 'সব নীতিমালা দেখুন →' : 'All Policies Hub →',
      href: `/${lang}/legal/`,
    },
  ];

  return (
    <div className="bg-[#FAFBFD] py-12 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 md:p-12 shadow-xs">
          <header className="mb-10 space-y-3 border-b border-slate-100 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-[14px] font-semibold uppercase tracking-wider text-slate-700">
              <span>{lang === 'bn' ? 'আইনি ও নীতিমালা' : 'Policy & Governance'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1B3A]">
              {title}
            </h1>
            <p className="text-[14px] font-medium uppercase tracking-wider text-slate-500">
              {lang === 'bn' ? `সর্বশেষ হালনাগাদ: ${formattedDate}` : `Last updated: ${formattedDate}`}
            </p>
          </header>

          {toc && toc.length > 0 && (
            <nav
              className="mb-12 rounded-xl bg-slate-50 p-5 sm:p-6 border border-slate-200/80"
              aria-label="Table of contents"
            >
              <h2 className="text-[14px] font-bold uppercase tracking-wider text-[#0B1B3A] mb-3">
                {lang === 'bn' ? 'সূচিপত্র' : 'Table of Contents'}
              </h2>
              <ul className="space-y-1 text-[15px] sm:text-[16px] text-[#0E52C3]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="min-h-[44px] hover:underline flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1499C8] shrink-0" aria-hidden="true" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            className="space-y-8 text-[17px] leading-relaxed text-[#1F2937]"
            data-scroll-container
          >
            {children}
          </div>

          {/* Related Policies Block */}
          <section className="mt-12 pt-8 border-t border-slate-100">
            <h2 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-4">
              {lang === 'bn' ? 'সম্পর্কিত নীতিমালা' : 'Related Policies & Governance'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks
                .filter((l) => !slug || !l.href.includes(`/${slug}/`))
                .slice(0, 4)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="min-h-[44px] inline-flex items-center rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-[15px] font-medium text-[#05308A] hover:bg-slate-100 hover:text-[#0E52C3] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
