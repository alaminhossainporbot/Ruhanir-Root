import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, languages, Lang } from '@/lib/i18n';
import { getCommonMetadata, getOrganizationJsonLd } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang, 'leadership');
}

export default async function LeadershipHubPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const orgJsonLd = getOrganizationJsonLd();
  const breadcrumbItems = [
    { name: c.leadership.heading, url: `https://ruhanir.com/${lang}/leadership/` },
  ];

  const m = c.leadership.member;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 min-[360px]:px-5 sm:px-6 py-12 sm:py-16 lg:px-8">
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <header className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B3A] sm:text-4xl">
            {c.leadership.heading}
          </h1>
          <p className="text-lg leading-relaxed text-[#374151] sm:text-xl max-w-3xl">
            {c.leadership.subline}
          </p>
        </header>

        {/* Executive Leader Card */}
        <section className="mt-12 sm:mt-16">
          <article className="rounded-xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Leader Photo */}
              <div className="md:col-span-4 flex justify-center md:justify-start">
                <div className="relative w-full max-w-[240px] md:max-w-none overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xs">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/leadership/ahporbot-400.webp 400w, /images/leadership/ahporbot-800.webp 800w"
                      sizes="(max-width: 768px) 240px, 280px"
                    />
                    <img
                      src="/images/leadership/ahporbot-400.jpg"
                      alt={
                        lang === 'bn'
                          ? 'আল আমিন হোসাইন পর্বত - ব্যবস্থাপনা পরিচালক, রুহানীর ইঞ্জিন'
                          : 'AL Amin Hossain Porbot - Managing Director, Ruhanir Engine'
                      }
                      width={400}
                      height={535}
                      loading="eager"
                      className="h-auto w-full object-cover aspect-[3/4]"
                    />
                  </picture>
                </div>
              </div>

              {/* Leader Bio & Details */}
              <div className="md:col-span-8 space-y-5">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center rounded-md bg-[#05308A]/10 px-2.5 py-1 text-sm font-semibold text-[#05308A]">
                    {m.role}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3A]">
                    {m.name}
                  </h2>
                </div>

                <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#374151]">
                  {m.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                  <Link
                    href={`/${lang}/leadership/${m.slug}/`}
                    className="min-h-[44px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    <span>{c.leadership.viewProfile}</span>
                    <span className="ml-1.5" aria-hidden="true">→</span>
                  </Link>

                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-[15px] font-medium text-[#1F2937] transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    <span>{m.githubLabel}</span>
                    <span className="text-[14px] text-slate-400" aria-label="External link">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Cross navigation back to About */}
        <section className="mt-14 border-t border-slate-200 pt-8 flex items-center justify-between text-[15px]">
          <Link
            href={`/${lang}/about/`}
            className="min-h-[44px] inline-flex items-center font-medium text-[#0E52C3] hover:underline"
          >
            <span className="mr-1.5" aria-hidden="true">←</span>
            <span>{c.leadership.aboutLink}</span>
          </Link>
        </section>
      </div>
    </>
  );
}
