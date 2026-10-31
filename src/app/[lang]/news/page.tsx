import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, Lang } from '@/lib/i18n';
import { getCommonMetadata } from '@/lib/metadata';
import { getAllNews } from '@/lib/news';
import { formatNewsDate } from '@/lib/digits';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const c = getContent(lang);
  return {
    ...getCommonMetadata(lang, 'news'),
    title: c.news.heading,
  };
}

export default async function NewsIndexPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const posts = getAllNews(lang as Lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-12 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B3A] sm:text-4xl">
          {c.news.heading}
        </h1>
        <p className="text-lg text-[#4B5563] sm:text-xl">
          {c.news.subline}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-base text-slate-500">{c.news.noNews}</p>
      ) : (
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 space-y-3">
              <time
                dateTime={post.date}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {formatNewsDate(post.date, lang as Lang)}
              </time>
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1B3A]">
                <Link
                  href={`/${lang}/news/${post.slug}/`}
                  className="hover:text-[#0E52C3] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {post.summary}
              </p>
              <div className="pt-2">
                <Link
                  href={`/${lang}/news/${post.slug}/`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E52C3] hover:underline"
                >
                  <span>{c.news.readMore}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
