import type { Metadata } from 'next';
import Link from 'next/link';
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
    ...getCommonMetadata(lang as Lang, 'complaints'),
    title: lang === 'bn' ? 'অভিযোগ ও প্রতিক্রিয়া' : 'Complaints and Feedback',
  };
}

export default async function ComplaintsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'অভিযোগ ও প্রতিক্রিয়া' : 'Complaints and Feedback'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর ইঞ্জিন তার প্রাতিষ্ঠানিক কার্যক্রম ও সেবার মান বজায় রাখতে ব্যবহারকারী এবং গ্রাহকদের প্রতিক্রিয়া ও গঠনমূলক অভিযোগকে অত্যন্ত গুরুত্ব সহকারে বিবেচনা করে।
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">কীভাবে অভিযোগ বা প্রতিক্রিয়া জানাবেন</h2>
            <p>
              আপনি নিম্নলিখিত যেকোনো একটি মাধ্যমে আপনার বক্তব্য পাঠাতে পারেন:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                সাপোর্ট ইমেইলে সরাসরি লিখে: <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline">support@ruhanir.com</a>
              </li>
              <li>
                আমাদের ওয়েবসাইটের <Link href="/bn/contact/" className="text-[#0E52C3] underline">যোগাযোগ ফর্মের</Link> মাধ্যমে (বিভাগ হিসেবে অভিযোগের উপযুক্ত বিভাগ নির্বাচন করুন)।
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">বার্তায় কী উল্লেখ করবেন</h2>
            <p>
              অভিযোগটি দ্রুত ও নির্ভুলভাবে পর্যালোচনার স্বার্থে অনুগ্রহ করে নিচের তথ্যগুলো অন্তর্ভুক্ত করুন:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>আপনার পূর্ণ নাম এবং যোগাযোগের মাধ্যম (ইমেইল বা ফোন নম্বর)</li>
              <li>কোন বিভাগের সাথে সংশ্লিষ্ট (রুহানীর আইটি, রুহানীর স্টোর, বা সাধারণ)</li>
              <li>বিষয়টির বিশদ বিবরণ ও প্রেক্ষাপট</li>
            </ul>
          </section>

          <p className="pt-2 text-sm text-slate-600 italic">
            দ্রষ্টব্য: প্রাপ্ত সকল অভিযোগ ক্রমানুসারে গুরুত্বের সঙ্গে যাচাই করা হয়।
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Ruhanir Engine welcomes constructive feedback and inquiries to maintain the highest standards across its corporate and operational divisions.
          </p>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">How to Submit Feedback or a Complaint</h2>
            <p>
              You can lodge a submission through either of the following channels:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Email our dedicated support address directly: <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline">support@ruhanir.com</a>
              </li>
              <li>
                Submit details via our website&apos;s <Link href="/en/contact/" className="text-[#0E52C3] underline">Contact Form</Link> (selecting the appropriate division).
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">What Information to Include</h2>
            <p>
              To help us evaluate and address your submission accurately, please include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name and contact information (email or phone)</li>
              <li>The relevant division (Ruhanir IT, Ruhanir Store, or General)</li>
              <li>A clear description of the matter and any supporting context</li>
            </ul>
          </section>

          <p className="pt-2 text-sm text-slate-600 italic">
            Note: All submissions are logged and evaluated in order of receipt by authorized personnel.
          </p>
        </div>
      )}
    </LegalLayout>
  );
}
