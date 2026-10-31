import { Lang } from '@/lib/i18n';
import { toBanglaDigits } from '@/lib/digits';

interface LegalLayoutProps {
  lang: Lang;
  title: string;
  lastUpdated: string;
  toc?: { id: string; title: string }[];
  children: React.ReactNode;
}

export function LegalLayout({
  lang,
  title,
  lastUpdated,
  toc,
  children,
}: LegalLayoutProps) {
  const formattedDate =
    lang === 'bn'
      ? `${toBanglaDigits('29')} অক্টোবর ${toBanglaDigits('2026')}`
      : '29 October 2026';

  return (
    <div className="bg-[#FAFBFD] py-12 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-8">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xs">
          <header className="mb-10 space-y-3 border-b border-slate-100 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <span>{lang === 'bn' ? 'আইনি ও নীতিমালা' : 'Policy & Governance'}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B3A] sm:text-4xl">
              {title}
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {lang === 'bn' ? `সর্বশেষ হালনাগাদ: ${formattedDate}` : `Last updated: ${formattedDate}`}
            </p>
          </header>

          {toc && toc.length > 0 && (
            <nav
              className="mb-12 rounded-xl bg-slate-50 p-6 border border-slate-200/80"
              aria-label="Table of contents"
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A] mb-3">
                {lang === 'bn' ? 'সূচিপত্র' : 'Table of Contents'}
              </h2>
              <ul className="space-y-2 text-[15px] text-[#0E52C3]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="hover:underline flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#1499C8]" aria-hidden="true" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="space-y-8 text-[17px] leading-relaxed text-[#1F2937]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
