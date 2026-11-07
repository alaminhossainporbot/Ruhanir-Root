import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, languages, Lang } from '@/lib/i18n';
import { getCommonMetadata, getPersonJsonLd } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of languages) {
    params.push({ lang, slug: 'ahporbot' });
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || slug !== 'ahporbot') return {};
  return getCommonMetadata(lang, `leadership/${slug}`);
}

export default async function LeaderProfilePage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || slug !== 'ahporbot') notFound();

  const c = getContent(lang);
  const m = c.leadership.member;
  const personJsonLd = getPersonJsonLd(lang as Lang);

  const breadcrumbItems = [
    { name: c.leadership.heading, url: `https://ruhanir.com/${lang}/leadership/` },
    { name: m.name, url: `https://ruhanir.com/${lang}/leadership/${slug}/` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 min-[360px]:px-5 sm:px-6 py-12 sm:py-16 lg:px-8">
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start mt-4">
          {/* Left Column: Photo & Key Facts */}
          <aside className="md:col-span-5 md:sticky md:top-[110px] space-y-6">
            <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white p-3 shadow-xs">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/leadership/ahporbot-800.webp 800w, /images/leadership/ahporbot-400.webp 400w"
                  sizes="(max-width: 768px) 100vw, 360px"
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
                  className="h-auto w-full rounded-lg object-cover aspect-[3/4]"
                />
              </picture>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-[#F5F7FA] p-6 space-y-4">
              <div>
                <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                  {lang === 'bn' ? 'পদবি ও দায়িত্ব' : 'Title & Position'}
                </span>
                <span className="mt-1 block text-[17px] font-bold text-[#0B1B3A]">
                  {m.role}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                  {lang === 'bn' ? 'প্রতিষ্ঠান' : 'Organization'}
                </span>
                <span className="mt-1 block text-[16px] font-medium text-[#1F2937]">
                  {c.meta.siteName}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                  {lang === 'bn' ? 'পেশাগত প্রোফাইল' : 'Professional Profile'}
                </span>
                <div className="mt-2">
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-4 py-2 text-[15px] font-medium text-[#05308A] transition-colors hover:border-[#0E52C3] hover:text-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    <span>{m.githubLabel}</span>
                    <span className="text-[14px] text-slate-400" aria-label="External link">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Narrative, Responsibilities, Context */}
          <main className="md:col-span-7 space-y-8">
            <header className="space-y-3">
              <span className="inline-flex items-center rounded-md bg-[#05308A]/10 px-2.5 py-1 text-sm font-semibold text-[#05308A]">
                {m.role}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B3A]">
                {m.name}
              </h1>
              <p className="text-[15px] font-medium text-slate-500">
                {c.meta.siteName}
              </p>
            </header>

            {/* Biography */}
            <section className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A]">
                {c.leadership.profileHeading}
              </h2>
              <p className="text-[17px] sm:text-[18px] leading-relaxed text-[#1F2937]">
                {m.bio}
              </p>
            </section>

            {/* Key Focus Areas */}
            <section className="space-y-5 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A]">
                {c.leadership.focusAreasHeading}
              </h2>

              <dl className="space-y-4">
                {m.focusAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-lg border border-slate-200/80 bg-white p-5 space-y-1.5"
                  >
                    <dt className="text-[16px] sm:text-[17px] font-semibold text-[#0B1B3A]">
                      {area.title}
                    </dt>
                    <dd className="text-[15px] sm:text-[16px] leading-relaxed text-[#4B5563]">
                      {area.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Institutional Cross-Links */}
            <section className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[15px]">
              <Link
                href={`/${lang}/leadership/`}
                className="min-h-[44px] inline-flex items-center font-medium text-[#0E52C3] hover:underline"
              >
                <span className="mr-1.5" aria-hidden="true">←</span>
                <span>{c.leadership.backToList}</span>
              </Link>

              <Link
                href={`/${lang}/about/`}
                className="min-h-[44px] inline-flex items-center font-medium text-[#374151] hover:text-[#0E52C3]"
              >
                <span>{c.leadership.aboutLink}</span>
                <span className="ml-1.5" aria-hidden="true">→</span>
              </Link>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
