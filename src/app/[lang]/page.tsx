import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);

  return (
    <div>
      {/* 1. Hero Section: 7/5 column split, logo fits inside, height ~620px on desktop */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:min-h-[500px]">
            {/* Left column (7 cols): H1, subline, 2 buttons */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="text-4xl font-bold tracking-tight text-[#0B1B3A] sm:text-5xl lg:text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.15]">
                {c.home.heading}
              </h1>
              <p className="text-[17px] text-[#374151] sm:text-[18px] leading-relaxed max-w-[60ch]">
                {c.home.subline}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#divisions"
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#05308A] px-6 py-3 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                >
                  {c.home.buttons.divisions}
                </a>
                <Link
                  href={`/${lang}/contact/`}
                  className="inline-flex items-center justify-center rounded-[6px] border border-slate-300 bg-white px-6 py-3 text-[16px] font-medium text-[#1F2937] transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                >
                  {c.home.buttons.contact}
                </Link>
              </div>
            </div>

            {/* Right column (5 cols): logo mark fits completely inside container */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-64 h-72 sm:w-80 sm:h-88 lg:w-[360px] lg:h-[420px]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/logo-800.webp 800w, /logo-1200.webp 1200w"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 360px"
                  />
                  <img
                    src="/logo-800.png"
                    srcSet="/logo-400.png 400w, /logo-800.png 800w"
                    alt={lang === 'bn' ? 'রুহানীর ইঞ্জিন প্রতীক' : 'Ruhanir Engine Logo Mark'}
                    className="h-full w-full object-contain object-center lg:object-right"
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thin "At a Glance" strip below Hero */}
      <section className="border-t border-b border-slate-200 bg-[#F8FAFC] py-4">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            <div className="py-2 sm:px-6 sm:first:pl-0">
              <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                {c.home.atAGlance.divisionsLabel}
              </span>
              <span className="text-[16px] font-medium text-[#0B1B3A]">
                {c.home.atAGlance.divisionsValue}
              </span>
            </div>
            <div className="py-2 sm:px-6">
              <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                {c.home.atAGlance.coverageLabel}
              </span>
              <span className="text-[16px] font-medium text-[#0B1B3A]">
                {c.home.atAGlance.coverageValue}
              </span>
            </div>
            <div className="py-2 sm:px-6 sm:last:pr-0">
              <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                {c.home.atAGlance.registrationLabel}
              </span>
              <span className="text-[16px] font-medium text-[#0B1B3A]">
                {c.home.atAGlance.registrationValue}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Divisions Section on light band (#F5F7FA) */}
      <section id="divisions" className="bg-[#F5F7FA] py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="mb-12 max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1B3A] sm:text-3xl">
              {c.home.divisionsSection.heading}
            </h2>
            <p className="text-[17px] text-[#4B5563]">
              {c.home.divisionsSection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* IT Division Panel - equal height, link pinned to bottom */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-8 sm:p-10 border-t-4 border-[#05308A]">
              <div className="space-y-4">
                <div className="text-[14px] font-bold uppercase tracking-widest text-[#05308A]">
                  {c.home.divisionsSection.it.ordinal}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#0B1B3A]">
                  {c.home.divisionsSection.it.name}
                </h3>
                <p className="text-[16px] text-[#374151] leading-relaxed">
                  {c.home.divisionsSection.it.sentence}
                </p>

                <div className="pt-2">
                  <ul className="space-y-2 text-[16px] text-[#1F2937]">
                    {c.home.divisionsSection.it.offerings.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1499C8]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={c.home.divisionsSection.it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#0E52C3] hover:underline"
                >
                  <span>{c.home.divisionsSection.it.linkText}</span>
                  <span className="text-[12px]" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Store Division Panel - equal height, link pinned to bottom */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-8 sm:p-10 border-t-4 border-[#42D1CC]">
              <div className="space-y-4">
                <div className="text-[14px] font-bold uppercase tracking-widest text-[#1499C8]">
                  {c.home.divisionsSection.store.ordinal}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#0B1B3A]">
                  {c.home.divisionsSection.store.name}
                </h3>
                <p className="text-[16px] text-[#374151] leading-relaxed">
                  {c.home.divisionsSection.store.sentence}
                </p>

                <div className="pt-2">
                  <ul className="space-y-2 text-[16px] text-[#1F2937]">
                    {c.home.divisionsSection.store.offerings.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#42D1CC]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={c.home.divisionsSection.store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#0E52C3] hover:underline"
                >
                  <span>{c.home.divisionsSection.store.linkText}</span>
                  <span className="text-[12px]" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Summary: sticky left column on desktop */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Heading column sticky on desktop */}
            <div className="lg:col-span-5 lg:sticky lg:top-[120px] self-start">
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1B3A] sm:text-4xl">
                {c.home.aboutSummary.heading}
              </h2>
            </div>

            {/* Right: Paragraph + Four principles with increased spacing + outline button */}
            <div className="space-y-8 lg:col-span-7">
              <p className="text-[17px] leading-relaxed text-[#1F2937] sm:text-[18px]">
                {c.home.aboutSummary.paragraph}
              </p>

              <dl className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {c.home.aboutSummary.principles.map((principle) => (
                  <div key={principle.term} className="py-7 first:pt-5 last:pb-5">
                    <dt className="text-[17px] font-semibold text-[#0B1B3A]">
                      {principle.term}
                    </dt>
                    <dd className="mt-2 text-[16px] text-[#4B5563] sm:text-[17px] leading-relaxed">
                      {principle.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-4">
                <Link
                  href={`/${lang}/about/`}
                  className="inline-flex items-center justify-center rounded-[6px] border border-slate-300 bg-white px-6 py-2.5 text-[16px] font-medium text-[#1F2937] transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                >
                  {c.home.aboutSummary.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Band: Call to action with headline, supporting line and white button */}
      <section className="bg-[#05308A] py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl text-white">
                {c.home.contactBand.headline}
              </h2>
              <p className="text-[16px] sm:text-[17px] text-slate-200">
                {c.home.contactBand.supporting}
              </p>
            </div>
            <Link
              href={`/${lang}/contact/`}
              className="inline-flex items-center justify-center rounded-[6px] bg-white px-7 py-3 text-[16px] font-semibold text-[#05308A] transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#05308A] shrink-0"
            >
              {c.home.contactBand.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
