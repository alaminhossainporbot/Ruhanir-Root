import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, isValidLang } from '@/lib/i18n';
import { getCommonMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const c = getContent(lang);
  return {
    ...getCommonMetadata(lang, 'businesses'),
    title: c.businesses.heading,
  };
}

export default async function BusinessesPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-12 sm:mb-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {c.businesses.heading}
        </h1>
      </header>

      <div className="space-y-16 sm:space-y-20">
        {/* Ruhanir IT Section */}
        <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {c.businesses.it.name}
            </h2>
            <p className="text-base leading-relaxed text-slate-700">
              {c.businesses.it.description}
            </p>

            <div className="pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                {c.businesses.it.servicesHeading}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-800">
                {c.businesses.it.services.map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1499C8]" aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={c.businesses.it.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-[#05308A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
              >
                <span>{c.businesses.it.linkText}</span>
                <span className="ml-1.5" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Ruhanir Store Section */}
        <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {c.businesses.store.name}
            </h2>
            <p className="text-base leading-relaxed text-slate-700">
              {c.businesses.store.description}
            </p>

            <div className="pt-6">
              <a
                href={c.businesses.store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-[#05308A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
              >
                <span>{c.businesses.store.linkText}</span>
                <span className="ml-1.5" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
