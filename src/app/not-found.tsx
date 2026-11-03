import Link from 'next/link';
import { Logo } from '@/components/Logo';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="bn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>পৃষ্ঠাটি পাওয়া যায়নি | 404 Not Found</title>
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 min-[360px]:px-5 sm:px-6 py-12 text-center text-slate-900 antialiased">
        <div className="mx-auto max-w-md space-y-6 w-full">
          <div className="flex justify-center">
            <Logo className="h-12 w-auto" width={48} height={63} />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              পৃষ্ঠাটি পাওয়া যায়নি / Page Not Found
            </h1>
            <p className="text-[16px] text-slate-600">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তার অস্তিত্ব নেই।
            </p>
            <p className="text-[14px] text-slate-500">
              The page you are looking for does not exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full">
            <Link
              href="/bn/"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md bg-[#05308A] px-6 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
            >
              মূল পাতায় ফিরে যান
            </Link>
            <Link
              href="/en/"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3.5 text-[16px] font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
