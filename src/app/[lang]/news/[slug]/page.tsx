import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, Lang, languages } from '@/lib/i18n';
import { getArticleJsonLd } from '@/lib/metadata';
import { getAllNewsSlugs, getNewsPost, checkEquivalentPostExists } from '@/lib/news';
import { formatNewsDate } from '@/lib/digits';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of languages) {
    const slugs = getAllNewsSlugs(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return {};

  const post = await getNewsPost(lang as Lang, slug);
  if (!post) return {};

  const c = getContent(lang);
  const canonicalUrl = `https://ruhanir.com/${lang}/news/${slug}/`;

  const otherLang: Lang = lang === 'bn' ? 'en' : 'bn';
  const equivalentExists = checkEquivalentPostExists(otherLang, slug);

  const alternates: Metadata['alternates'] = {
    canonical: canonicalUrl,
    languages: {
      [lang]: canonicalUrl,
      ...(equivalentExists
        ? { [otherLang]: `https://ruhanir.com/${otherLang}/news/${slug}/` }
        : {}),
      'x-default': `https://ruhanir.com/`,
    },
  };

  return {
    title: `${post.title} | ${c.meta.siteName}`,
    description: post.summary,
    alternates,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ['/og-image.png'],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();

  const post = await getNewsPost(lang as Lang, slug);
  if (!post) notFound();

  const c = getContent(lang);
  const articleJsonLd = getArticleJsonLd({
    title: post.title,
    date: post.date,
    summary: post.summary,
    slug,
    lang: lang as Lang,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href={`/${lang}/news/`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0E52C3] hover:underline"
          >
            <span aria-hidden="true">←</span>
            <span>{c.news.backToList}</span>
          </Link>
        </nav>

        <article className="space-y-6">
          <header className="space-y-3 border-b border-slate-200 pb-6">
            <time
              dateTime={post.date}
              className="text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {formatNewsDate(post.date, lang as Lang)}
            </time>
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1B3A] sm:text-4xl">
              {post.title}
            </h1>
          </header>

          <div
            className="prose prose-slate max-w-none text-base leading-relaxed text-[#1F2937]"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </>
  );
}
