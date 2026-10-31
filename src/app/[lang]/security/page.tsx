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
    ...getCommonMetadata(lang as Lang, 'security'),
    title: lang === 'bn' ? 'নিরাপত্তা ও দায়িত্বশীল প্রকাশ নীতি' : 'Security and Responsible Disclosure',
  };
}

export default async function SecurityPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'নিরাপত্তা ও দায়িত্বশীল প্রকাশ নীতি' : 'Security and Responsible Disclosure'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর ইঞ্জিন তার ডিজিটাল অবকাঠামো ও তথ্যের নিরাপত্তাকে সর্বোচ্চ অগ্রাধিকার দেয়। স্বাধীন গবেষক বা ব্যবহারকারী কর্তৃক যে কোনো নিরাপত্তা ত্রুটি চিহ্নিত হলে তা দায়িত্বশীলতার সাথে অবহিত করার অনুরোধ করা হচ্ছে।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ত্রুটি অবহিত করার নিয়ম</h2>
            <p>
              নিরাপত্তা ত্রুটি বা দুর্বলতা পরিলক্ষিত হলে তা প্রকাশ্যে আনার আগে অনুগ্রহ করে আমাদের টিমকে অবহিত করুন:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>নিরাপত্তা ইমেইল: <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a></li>
              <li>ত্রুটিটির বিশদ বিবরণ ও পুনরুৎপাদনের ধাপসমূহ উল্লেখ করুন।</li>
              <li>ব্যবহারকারীর ডেটা বা সেবার ক্ষতিসাধন থেকে বিরত থাকুন।</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">মেশিন রিডেবল পলিসি</h2>
            <p>
              আমাদের নিরাপত্তা প্রকাশ সংক্রান্ত ফাইলটি <a href="/.well-known/security.txt" className="text-[#0E52C3] underline">/.well-known/security.txt</a> পাথে সরাসরি পাওয়া যাবে।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Ruhanir Engine places the highest priority on information security and the integrity of its digital platforms. We welcome responsible disclosures from researchers and users.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Reporting Guidelines</h2>
            <p>
              If you identify a security vulnerability, please notify us before public disclosure:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Direct reports to: <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a></li>
              <li>Provide clear steps to reproduce the issue without compromising system integrity.</li>
              <li>Refrain from privacy violations, destruction of data, or disruption of services.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Machine-Readable Policy</h2>
            <p>
              Our canonical security configuration is hosted at <a href="/.well-known/security.txt" className="text-[#0E52C3] underline font-medium">/.well-known/security.txt</a>.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
