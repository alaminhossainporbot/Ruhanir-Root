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
  return getCommonMetadata(lang as Lang, 'confidentiality');
}

export default async function ConfidentialityPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'গোপনীয়তা ও ডেটা ব্যবস্থাপনা' : 'Confidentiality and Data Handling'}
      lastUpdated="2026-10-29"
      slug="confidentiality"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর আইটি (it.ruhanir.com) প্রাতিষ্ঠানিক সমাধান ও এন্টারপ্রাইজ সিস্টেম নির্মাণকালে ক্লায়েন্টের সংবেদনশীল তথ্য ও ডেটার পূর্ণ নিরাপত্তা এবং গোপনীয়তা রক্ষা করতে দায়বদ্ধ।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">গোপনীয়তার প্রতিশ্রুতি (Non-Disclosure)</h2>
            <p>
              প্রকল্প বাস্তবায়নকালে ক্লায়েন্টের ব্যবসায়িক তথ্য, সোর্স ডেটা এবং অভ্যন্তরীণ প্রক্রিয়া কঠোর গোপনীয়তার সাথে সংরক্ষণ করা হয় এবং লিখিত অনুমতি ব্যতীত প্রকাশ করা হয় না।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ডেটা সুরক্ষা ও হ্যান্ডলিং</h2>
            <p>
              সিস্টেম ডেভেলপমেন্ট ও ডিপ্লয়মেন্টের সময় ডেটা আইসোলেশন ও অ্যাক্সেস কন্ট্রোল কঠোরভাবে প্রয়োগ করা হয়। প্রযোজ্য ক্ষেত্রে পৃথক নন-ডিসক্লোজার চুক্তি (NDA)-এর মাধ্যমে প্রাতিষ্ঠানিক সুরক্ষা সুনিশ্চিত করা হয়।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Ruhanir IT (it.ruhanir.com) maintains rigorous enterprise protocols to ensure the confidentiality, partition, and security of client data during custom architectural engagements.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Non-Disclosure Commitments</h2>
            <p>
              All proprietary materials, database schemas, operational processes, and business intelligence shared during institutional projects are protected under strict professional non-disclosure obligations.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Data Protection in Implementations</h2>
            <p>
              System deployments employ least-privilege administrative access and data segregation. Formal bilateral Non-Disclosure Agreements (NDAs) govern specific client engagements.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
