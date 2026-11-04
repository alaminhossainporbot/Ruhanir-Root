import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent, isValidLang } from '@/lib/i18n';
import {
  getCommonMetadata,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
} from '@/lib/metadata';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang, '');
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const organizationJsonLd = getOrganizationJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <div>
        {/* 1. Hero Section: text first, logo mark second on mobile; 7/5 split on desktop */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:min-h-[500px]">
              {/* Text column (7 cols on desktop): H1, subline, buttons */}
              <div className="order-1 lg:order-1 lg:col-span-7 space-y-6">
                <h1 className="text-[clamp(2rem,6.5vw,3.75rem)] font-bold tracking-tight text-[#0B1B3A] leading-[1.22] break-words">
                  {c.home.heading}
                </h1>
                <p className="text-[17px] sm:text-[18px] text-[#374151] leading-relaxed max-w-[60ch]">
                  {c.home.subline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                  <a
                    href="#divisions"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-6 py-3.5 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    {c.home.buttons.divisions}
                  </a>
                  <Link
                    href={`/${lang}/contact/`}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3.5 text-[16px] font-medium text-[#1F2937] transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    {c.home.buttons.contact}
                  </Link>
                </div>
              </div>

              {/* Logo column (5 cols on desktop): single column centered, max-width <= 220px on phone, 260-320px on tablet */}
              <div className="order-2 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-[min(100%,220px)] min-[600px]:max-w-[280px] lg:max-w-[360px] mx-auto lg:mr-0 lg:ml-auto">
                  <picture className="w-full block">
                    <source
                      type="image/webp"
                      srcSet="/logo-400.webp 400w, /logo-800.webp 800w, /logo-1200.webp 1200w"
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 360px"
                    />
                    <img
                      src="/logo-400.png"
                      srcSet="/logo-400.png 400w, /logo-800.png 800w"
                      alt={
                        lang === 'bn'
                          ? 'রুহানীর ইঞ্জিন লোগো'
                          : 'Ruhanir Engine Logo'
                      }
                      width={360}
                      height={468}
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                      className="h-auto w-full object-contain drop-shadow-sm"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hairline "At a Glance" strip below Hero: stacks vertically on phones */}
        <section className="border-t border-b border-slate-200 bg-[#F8FAFC] py-5">
          <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-slate-200">
              <div className="py-3 sm:py-2 sm:px-6 sm:first:pl-0 space-y-1">
                <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                  {c.home.atAGlance.divisionsLabel}
                </span>
                <span className="text-[16px] font-medium text-[#0B1B3A]">
                  {c.home.atAGlance.divisionsValue}
                </span>
              </div>
              <div className="py-3 sm:py-2 sm:px-6 space-y-1">
                <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                  {c.home.atAGlance.coverageLabel}
                </span>
                <span className="text-[16px] font-medium text-[#0B1B3A]">
                  {c.home.atAGlance.coverageValue}
                </span>
              </div>
              <div className="py-3 sm:py-2 sm:px-6 sm:last:pr-0 space-y-1">
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
          <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1B3A] sm:text-4xl">
                {c.home.divisionsSection.heading}
              </h2>
              <p className="text-[17px] sm:text-[18px] text-[#4B5563] leading-relaxed">
                {c.home.divisionsSection.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Card 1: Ruhanir IT */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xs flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold tracking-wider text-[#1499C8]">
                      {c.home.divisionsSection.it.ordinal}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B1B3A]">
                      {c.home.divisionsSection.it.name}
                    </h3>
                  </div>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#374151]">
                    {c.home.divisionsSection.it.sentence}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[15px] sm:text-[16px] text-[#1F2937]">
                    {c.home.divisionsSection.it.offerings.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#1499C8]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <a
                    href={c.home.divisionsSection.it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-6 py-3 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    <span>{c.home.divisionsSection.it.linkText}</span>
                    <span className="ml-1.5 text-[14px]" aria-label="External link">
                      ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* Card 2: Ruhanir Store */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xs flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold tracking-wider text-[#1499C8]">
                      {c.home.divisionsSection.store.ordinal}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B1B3A]">
                      {c.home.divisionsSection.store.name}
                    </h3>
                  </div>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#374151]">
                    {c.home.divisionsSection.store.sentence}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[15px] sm:text-[16px] text-[#1F2937]">
                    {c.home.divisionsSection.store.offerings.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#1499C8]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <a
                    href={c.home.divisionsSection.store.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-6 py-3 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
                  >
                    <span>{c.home.divisionsSection.store.linkText}</span>
                    <span className="ml-1.5 text-[14px]" aria-label="External link">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. About Summary */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left: Heading column */}
              <div className="lg:col-span-5 lg:sticky lg:top-[120px] self-start">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0B1B3A]">
                  {c.home.aboutSummary.heading}
                </h2>
              </div>

              {/* Right: Paragraph + Four principles */}
              <div className="space-y-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-[#1F2937] sm:text-[18px]">
                  {c.home.aboutSummary.paragraph}
                </p>

                <dl className="divide-y divide-slate-200 border-t border-b border-slate-200">
                  {c.home.aboutSummary.principles.map((principle) => (
                    <div key={principle.term} className="py-6 sm:py-7 first:pt-4 last:pb-4">
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
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-[16px] font-medium text-[#1F2937] transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
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
          <div className="mx-auto max-w-[1200px] px-4 min-[360px]:px-5 sm:px-6 lg:px-8">
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
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-[16px] font-semibold text-[#05308A] transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#05308A] shrink-0"
              >
                {c.home.contactBand.buttonText}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
