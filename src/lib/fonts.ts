import localFont from 'next/font/local';

export const inter = localFont({
  src: '../../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

export const notoBengali = localFont({
  src: '../../public/fonts/noto-sans-bengali.woff2',
  variable: '--font-bengali',
  display: 'swap',
  weight: '100 900',
});
