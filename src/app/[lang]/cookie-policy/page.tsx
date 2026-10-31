import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLang, Lang } from '@/lib/i18n';
import { getCommonMetadata } from '@/lib/metadata';
import { LegalLayout } from '@/components/LegalLayout';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return {
    ...getCommonMetadata(lang as Lang, 'cookie-policy'),
    title: lang === 'bn' ? 'কুকি ও ব্রাউজার স্টোরেজ নীতি' : 'Cookie and Browser Storage Policy',
  };
}

export default async function CookiePolicyPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'কুকি ও ব্রাউজার স্টোরেজ নীতি' : 'Cookie and Browser Storage Policy'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <>
          <p>
            রুহানীর ইঞ্জিনের ওয়েবসাইট (ruhanir.com) ন্যূনতম ডেটা সংরক্ষণের নীতিতে বিশ্বাসী। আমরা ব্যবহারকারীর কোনো অনাকাঙ্ক্ষিত ট্র্যাকিং করি না।
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">আমরা কী সংরক্ষণ করি</h2>
            <p>
              আমাদের ওয়েবসাইট ব্রাউজারের লোকাল স্টোরেজে (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">localStorage</code>) শুধুমাত্র একটি তথ্য সংরক্ষণ করে:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>ভাষা পছন্দ (Language Preference):</strong> আপনি সর্বশেষ কোন ভাষা (বাংলা বা ইংরেজি) নির্বাচন করেছেন তা মনে রাখার জন্য <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">preferred_lang</code> কি (key) সংরক্ষিত থাকে।</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">আমরা যা ব্যবহার করি না</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>কোনো তৃতীয় পক্ষের ট্র্যাকিং কুকি নেই।</li>
              <li>কোনো বিজ্ঞাপন বা অ্যানালিটিক্স স্ক্রিপ্ট নেই।</li>
              <li>ব্যবহারকারীর ডিজিটাল প্রোফাইলিং বা ক্রস-সাইট ট্র্যাকিং নেই।</li>
            </ul>
          </section>

          <p className="pt-2">
            ভবিষ্যতে ওয়েবসাইটে অন্য কোনো স্টোরেজ মেকানিজম বা কুকি যুক্ত করা হলে, তাৎক্ষণিকভাবে এই পাতাটি হালনাগাদ করা হবে।
          </p>
        </>
      ) : (
        <>
          <p>
            Ruhanir Engine (ruhanir.com) operates on a strict data-minimization approach. We do not track or profile visitors across the web.
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">What We Store</h2>
            <p>
              Our website stores only one functional item in your browser&apos;s local storage (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">localStorage</code>):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Language Preference:</strong> The key <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">preferred_lang</code> records whether you selected Bangla or English, so the site displays your preferred language on return visits.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">What We Do Not Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>No third-party tracking or behavioral cookies.</li>
              <li>No advertising or marketing trackers.</li>
              <li>No invasive analytics scripts.</li>
            </ul>
          </section>

          <p className="pt-2">
            If any additional storage mechanism is introduced in the future, this policy will be promptly updated.
          </p>
        </>
      )}
    </LegalLayout>
  );
}
