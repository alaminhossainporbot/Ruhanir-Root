import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, isValidLang, Lang } from '@/lib/i18n';
import { getCommonMetadata, getContactPageJsonLd } from '@/lib/metadata';
import { ContactForm } from '@/components/ContactForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang, 'contact');
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const c = getContent(lang);
  const contactJsonLd = getContactPageJsonLd(lang as Lang);
  const breadcrumbItems = [
    { name: c.nav.contact, url: `https://ruhanir.com/${lang}/contact/` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 min-[360px]:px-5 sm:px-6 py-12 sm:py-16 lg:px-8">
        <Breadcrumbs lang={lang as Lang} items={breadcrumbItems} />

        <header className="mb-12 space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {c.contact.heading}
          </h1>
          <p className="text-lg text-slate-700 sm:text-xl font-medium">
            {c.contact.statement}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact info channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
                {lang === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Channels'}
              </h2>

              <div className="space-y-4">
                <div>
                  <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                    {c.contact.channels.generalLabel}
                  </span>
                  <a
                    href={`mailto:${c.contact.channels.generalEmail}`}
                    className="mt-1 min-h-[44px] inline-flex items-center text-[16px] font-medium text-slate-900 hover:text-[#0E52C3] transition-colors break-all"
                  >
                    {c.contact.channels.generalEmail}
                  </a>
                </div>

                <div>
                  <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                    {c.contact.channels.supportLabel}
                  </span>
                  <a
                    href={`mailto:${c.contact.channels.supportEmail}`}
                    className="mt-1 min-h-[44px] inline-flex items-center text-[16px] font-medium text-slate-900 hover:text-[#0E52C3] transition-colors break-all"
                  >
                    {c.contact.channels.supportEmail}
                  </a>
                </div>

                <div>
                  <span className="block text-[14px] font-semibold uppercase tracking-wider text-slate-500">
                    {c.contact.channels.phoneLabel}
                  </span>
                  <a
                    href={`tel:${c.contact.channels.phone.replace(/\s+/g, '')}`}
                    className="mt-1 min-h-[44px] inline-flex items-center text-[16px] font-medium text-slate-900 hover:text-[#0E52C3] transition-colors"
                  >
                    {c.contact.channels.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
                {c.contact.form.heading}
              </h2>
              <ContactForm lang={lang as Lang} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
