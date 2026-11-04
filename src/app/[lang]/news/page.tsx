import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, Lang } from '@/lib/i18n';
import { getCommonMetadata } from '@/lib/metadata';
import { getAllNews } from '@/lib/news';
import { formatNewsDate } from '@/lib/digits';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang, 'news');
}

export default async function NewsIndexPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const posts = getAllNews(lang as Lang);
  const breadcrumbItems = [
    { name: c.nav.news, url: `https://ruhanir.com/${lang}/news/` },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-[calc(100vh-80px-350px)] py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
        <Breadcrumbs lang={lang as Lang} items={breadcrumbItems} />

        {/* Header Block */}
        <header className="mb-10 sm:mb-12 border-b border-slate-200/80 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[14px] font-semibold uppercase tracking-wider text-[#05308A]">
            <span>{lang === 'bn' ? 'প্রেস ও নোটিশ' : 'Press & Announcements'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B3A] sm:text-4xl lg:text-5xl">
            {c.news.heading}
          </h1>
          <p className="text-[17px] text-[#4B5563] sm:text-[18px] max-w-[65ch]">
            {c.news.subline}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs">
            <p className="text-[16px] text-slate-500">{c.news.noNews}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#0E52C3]/30 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <time
                      dateTime={post.date}
                      className="text-[13px] font-medium uppercase tracking-wider text-slate-500"
                    >
                      {formatNewsDate(post.date, lang as Lang)}
                    </time>
                    <span className="text-[12px] font-semibold text-[#0E52C3] bg-blue-50/70 px-2 py-0.5 rounded">
                      {lang === 'bn' ? 'বিজ্ঞপ্তি' : 'Notice'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] group-hover:text-[#0E52C3] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#4B5563] line-clamp-3">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href={`/${lang}/news/${post.slug}/`}
                    className="min-h-[44px] inline-flex items-center text-[15px] font-semibold text-[#05308A] group-hover:text-[#0E52C3] transition-colors"
                  >
                    <span>{c.news.readMore}</span>
                    <span className="ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
