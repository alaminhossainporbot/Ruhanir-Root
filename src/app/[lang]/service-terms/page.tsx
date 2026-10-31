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
    ...getCommonMetadata(lang as Lang, 'service-terms'),
    title: lang === 'bn' ? 'আইটি সেবা শর্তাবলী' : 'IT Service Terms',
  };
}

export default async function ServiceTermsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'আইটি সেবা শর্তাবলী' : 'IT Service Terms'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            এই সেবা শর্তাবলী রুহানীর আইটি (it.ruhanir.com)-এর মাধ্যমে বিভিন্ন প্রতিষ্ঠান ও উদ্যোক্তাদের প্রদত্ত সফটওয়্যার আর্কিটেকচার, ইআরপি, স্যাস এবং নেটওয়ার্ক সেটআপ সেবার ক্ষেত্রে প্রযোজ্য।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">চুক্তি ও কাজের পরিধি</h2>
            <p>
              প্রতিটি প্রাতিষ্ঠানিক প্রকল্পের কাজের পরিধি (Scope of Work), মাইলস্টোন, ডেলিভারির সময়সীমা এবং বাণিজ্যিক শর্তাবলী ক্লায়েন্টের সাথে স্বাক্ষরিত সুনির্দিষ্ট প্রজেক্ট চুক্তি এবং সার্ভিস অর্ডার কনফার্মেশনে নির্ধারিত হয়।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">মেধা সম্পদ ও সিস্টেম হস্তান্তর</h2>
            <p>
              কাস্টমাইজড সফটওয়্যারের মেধা সম্পদ অধিকার এবং সিস্টেম হ্যান্ডওভার সংক্রান্ত শর্তাবলী ক্লায়েন্ট চুক্তির নির্ধারিত ক্লজ অনুযায়ী নিয়ন্ত্রিত হয়।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            These Service Terms govern institutional engagements, software architecture, ERP implementations, and network deployments executed by Ruhanir IT (it.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Scope and Commercial Agreements</h2>
            <p>
              Each institutional assignment is defined by a project-specific Scope of Work, milestone schedules, and deliverables. The applicable terms are stated in the service agreement and in the order confirmation.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Intellectual Property and Delivery</h2>
            <p>
              Ownership rights, custom source licensing, and handover protocols are defined individually in mutual corporate service contracts.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
