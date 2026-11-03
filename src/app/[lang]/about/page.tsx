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
    ...getCommonMetadata(lang, 'about'),
    title: c.about.heading,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 min-[360px]:px-5 sm:px-6 py-16 sm:py-24 lg:px-8">
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
    </div>
  );
}
