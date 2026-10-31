import type { Metadata } from 'next';
import { inter, notoBengali } from '@/lib/fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Ruhanir Engine | রুহানি ইঞ্জিন',
  description:
    "A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce.",
  alternates: {
    canonical: 'https://ruhanir.com/',
    languages: {
      bn: 'https://ruhanir.com/bn/',
      en: 'https://ruhanir.com/en/',
      'x-default': 'https://ruhanir.com/',
    },
  },
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
