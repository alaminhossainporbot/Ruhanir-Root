import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, isValidLang } from '@/lib/i18n';
import { getCommonMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/ContactForm';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const c = getContent(lang);
  return {
    ...getCommonMetadata(lang, 'contact'),
    title: c.contact.heading,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-12 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {c.contact.heading}
        </h1>
        <p className="text-lg text-slate-700 sm:text-xl font-medium">
          {c.contact.statement}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Contact info channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {lang === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Channels'}
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {c.contact.channels.generalLabel}
                </span>
                <a
                  href={`mailto:${c.contact.channels.generalEmail}`}
                  className="mt-1 block font-medium text-slate-900 hover:text-[#0E52C3] transition-colors"
                >
                  {c.contact.channels.generalEmail}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {c.contact.channels.supportLabel}
                </span>
                <a
                  href={`mailto:${c.contact.channels.supportEmail}`}
                  className="mt-1 block font-medium text-slate-900 hover:text-[#0E52C3] transition-colors"
                >
                  {c.contact.channels.supportEmail}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {c.contact.channels.phoneLabel}
                </span>
                <a
                  href={`tel:${c.contact.channels.phone.replace(/\s+/g, '')}`}
                  className="mt-1 block font-medium text-slate-900 hover:text-[#0E52C3] transition-colors"
                >
                  {c.contact.channels.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
              {c.contact.form.heading}
            </h2>
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
