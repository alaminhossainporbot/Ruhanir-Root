import type { Metadata, Viewport } from 'next';
import { inter, notoBengali } from '@/lib/fonts';
import '../globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const isProduction = process.env.SITE_ENV === 'production';

export const metadata: Metadata = {
  title: 'Ruhanir Engine | ভাষা নির্বাচন / Choose Language',
  description:
    'Select language to visit Ruhanir Engine: parent organization of Ruhanir IT and Ruhanir Store in Bangladesh.',
  metadataBase: new URL('https://ruhanir.com'),
  alternates: {
    canonical: 'https://ruhanir.com/',
    languages: {
      bn: 'https://ruhanir.com/bn/',
      en: 'https://ruhanir.com/en/',
      'x-default': 'https://ruhanir.com/',
    },
  },
  openGraph: {
    title: 'Ruhanir Engine | ভাষা নির্বাচন / Choose Language',
    description:
      'Select language to visit Ruhanir Engine: parent organization of Ruhanir IT and Ruhanir Store in Bangladesh.',
    url: 'https://ruhanir.com/',
    siteName: 'Ruhanir Engine',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ruhanir Engine Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruhanir Engine | ভাষা নির্বাচন / Choose Language',
    description:
      'Select language to visit Ruhanir Engine: parent organization of Ruhanir IT and Ruhanir Store in Bangladesh.',
    images: ['/og-image.png'],
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoBengali.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#42D1CC]/30">
        {children}
      </body>
    </html>
  );
}
