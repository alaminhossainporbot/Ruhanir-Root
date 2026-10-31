import Link from 'next/link';
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
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-10 space-y-3 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1B3A] sm:text-4xl">
          {title}
        </h1>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {lang === 'bn' ? `সর্বশেষ হালনাগাদ: ${formattedDate}` : `Last updated: ${formattedDate}`}
        </p>
      </header>

      {toc && toc.length > 0 && (
        <nav
          className="mb-12 rounded-lg bg-slate-50 p-6 border border-slate-200"
          aria-label="Table of contents"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
            {lang === 'bn' ? 'সূচিপত্র' : 'Table of Contents'}
          </h2>
          <ul className="space-y-1.5 text-sm text-[#0E52C3]">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="space-y-8 text-base leading-relaxed text-[#1F2937]">
        {children}
      </div>
    </div>
  );
}
