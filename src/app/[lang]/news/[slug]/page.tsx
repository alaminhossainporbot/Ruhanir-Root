import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, Lang, languages } from '@/lib/i18n';
import { getArticleJsonLd } from '@/lib/metadata';
import { getAllNewsSlugs, getNewsPost, checkEquivalentPostExists } from '@/lib/news';
import { formatNewsDate } from '@/lib/digits';
import { Breadcrumbs } from '@/components/Breadcrumbs';

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

  const isProduction = process.env.SITE_ENV === 'production';

  return {
    title: {
      absolute: `${post.title} | ${c.meta.siteName}`,
    },
    description: post.summary,
    alternates,
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
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

  const breadcrumbItems = [
    { name: c.nav.news, url: `https://ruhanir.com/${lang}/news/` },
    { name: post.title, url: `https://ruhanir.com/${lang}/news/${slug}/` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="bg-[#FAFBFD] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
          <Breadcrumbs lang={lang as Lang} items={breadcrumbItems} />

          <article className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 md:p-12 shadow-xs space-y-8">
            <header className="space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[14px] font-semibold text-[#05308A]">
                  {lang === 'bn' ? 'অফিসিয়াল বার্তা' : 'Announcement'}
                </span>
                <time
                  dateTime={post.date}
                  className="text-[14px] font-medium uppercase tracking-wider text-slate-500"
                >
                  {formatNewsDate(post.date, lang as Lang)}
                </time>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1B3A] leading-tight">
                {post.title}
              </h1>
            </header>

            <div
              className="prose prose-slate max-w-none text-[17px] leading-relaxed text-[#1F2937]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Related section for news posts */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
              <Link
                href={`/${lang}/businesses/`}
                className="text-[15px] font-semibold text-[#05308A] hover:underline"
              >
                {lang === 'bn' ? 'বিভাগসমূহ সম্পর্কে জানুন →' : 'Explore our Divisions →'}
              </Link>
              <Link
                href={`/${lang}/contact/`}
                className="text-[15px] font-semibold text-[#05308A] hover:underline"
              >
                {lang === 'bn' ? 'যোগাযোগ করুন →' : 'Contact Us →'}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
