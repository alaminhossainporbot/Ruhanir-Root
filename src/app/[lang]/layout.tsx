import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Lang, languages, isValidLang } from '@/lib/i18n';
import { getCommonMetadata, getOrganizationJsonLd } from '@/lib/metadata';
import { inter, notoBengali } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return getCommonMetadata(lang);
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${notoBengali.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased selection:bg-[#42D1CC]/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#05308A] focus:px-4 focus:py-2.5 focus:min-h-[44px] focus:min-w-[44px] focus:inline-flex focus:items-center focus:justify-center focus:text-white"
        >
          {lang === 'bn' ? 'মূল বিষয়বস্তুতে যান' : 'Skip to main content'}
        </a>
        <Header lang={lang} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
