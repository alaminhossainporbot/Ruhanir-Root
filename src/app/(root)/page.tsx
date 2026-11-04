'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function RootPage() {
  useEffect(() => {
    // Only redirect if visitor has previously and explicitly saved a language preference
    try {
      const stored = localStorage.getItem('preferred_lang');
      if (stored === 'en') {
        window.location.replace('/en/');
      } else if (stored === 'bn') {
        window.location.replace('/bn/');
      }
    } catch {
      // Storage unavailable or disabled; remain on chooser
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo className="h-14 w-auto" width={56} height={73} priority />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            রুহানীর ইঞ্জিন / Ruhanir Engine
          </h1>
          <p className="text-sm text-slate-600">
            বাংলাদেশের ডিজিটাল অবকাঠামো ও আধুনিক বাণিজ্যের জন্য কাজ করা একটি প্রযুক্তিভিত্তিক প্রতিষ্ঠান।
          </p>
          <p className="text-xs text-slate-500">
            A technology-driven organization working on Bangladesh&apos;s digital infrastructure and modern commerce.
          </p>
        </div>

        <div className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            ভাষা নির্বাচন করুন / Choose language
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/bn/"
              onClick={() => {
                try {
                  localStorage.setItem('preferred_lang', 'bn');
                } catch {}
              }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#05308A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
            >
              বাংলা (Bangla)
            </Link>
            <Link
              href="/en/"
              onClick={() => {
                try {
                  localStorage.setItem('preferred_lang', 'en');
                } catch {}
              }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2"
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
