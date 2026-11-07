import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang } from '@/lib/i18n';
import { getCommonMetadata, getOrganizationJsonLd } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang, 'about');
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const orgJsonLd = getOrganizationJsonLd();
  const breadcrumbItems = [
    { name: c.nav.about, url: `https://ruhanir.com/${lang}/about/` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 min-[360px]:px-5 sm:px-6 py-12 sm:py-16 lg:px-8">
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <header className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {c.about.heading}
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
            {c.about.description}
          </p>
        </header>

        {/* Four principles as a plain list */}
        <section className="mt-14 sm:mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-8 sm:text-2xl">
            {c.about.principlesHeading}
          </h2>
          <ul className="divide-y divide-slate-200">
            {c.about.principles.map((principle) => (
              <li key={principle.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[16px] sm:text-[17px] text-slate-600 leading-relaxed">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Leadership Section */}
        <section className="mt-14 sm:mt-16 border-t border-slate-200 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {c.about.leadershipSection.heading}
              </h2>
              <p className="text-[16px] sm:text-[17px] text-slate-600 leading-relaxed">
                {c.about.leadershipSection.description}
              </p>
            </div>
            <Link
              href={`/${lang}/leadership/`}
              className="min-h-[44px] inline-flex items-center text-[15px] font-semibold text-[#05308A] hover:text-[#0E52C3] transition-colors shrink-0"
            >
              <span>{c.about.leadershipSection.buttonText}</span>
              <span className="ml-1.5" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-[#F5F7FA] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/leadership/ahporbot-400.webp"
                />
                <img
                  src="/images/leadership/ahporbot-400.jpg"
                  alt={
                    lang === 'bn'
                      ? 'আল আমিন হোসাইন পর্বত - ব্যবস্থাপনা পরিচালক'
                      : 'AL Amin Hossain Porbot - Managing Director'
                  }
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <span className="inline-flex items-center rounded bg-[#05308A]/10 px-2 py-0.5 text-xs font-semibold text-[#05308A]">
                {c.leadership.member.role}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B1B3A]">
                {c.leadership.member.name}
              </h3>
              <p className="text-[15px] text-[#4B5563] line-clamp-2">
                {c.leadership.member.bio}
              </p>
            </div>

            <Link
              href={`/${lang}/leadership/${c.leadership.member.slug}/`}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2 shrink-0"
            >
              <span>{c.leadership.viewProfile}</span>
              <span className="ml-1.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
