import Link from 'next/link';
import { Lang } from '@/lib/i18n';
import { getBreadcrumbJsonLd } from '@/lib/metadata';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  lang: Lang;
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ lang, items }: BreadcrumbsProps) {
  const homeName = lang === 'bn' ? 'প্রচ্ছদ' : 'Home';
  const allItems: BreadcrumbItem[] = [
    { name: homeName, url: `https://ruhanir.com/${lang}/` },
    ...items,
  ];

  const jsonLd = getBreadcrumbJsonLd(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center text-[14px] font-medium text-slate-500"
      >
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const relativePath = item.url.replace('https://ruhanir.com', '');

            return (
              <li key={item.url} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <span className="text-slate-400 select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span
                    className="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-none"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={relativePath}
                    className="min-h-[44px] inline-flex items-center text-[#05308A] hover:text-[#0E52C3] transition-colors hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
