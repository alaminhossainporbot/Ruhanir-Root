import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function GlobalNotFound() {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-slate-900 antialiased">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex justify-center">
            <Logo className="h-12 w-auto" width={48} height={63} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              পৃষ্ঠাটি পাওয়া যায়নি / Page Not Found
            </h1>
            <p className="text-sm text-slate-600">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তার অস্তিত্ব নেই।
            </p>
            <p className="text-xs text-slate-500">
              The page you are looking for does not exist.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/bn/"
              className="inline-flex items-center justify-center rounded-md bg-[#05308A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E52C3]"
            >
              মূল পাতায় ফিরে যান
            </Link>
            <Link
              href="/en/"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
