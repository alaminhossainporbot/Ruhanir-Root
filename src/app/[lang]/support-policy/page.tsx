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
  return getCommonMetadata(lang as Lang, 'support-policy');
}

export default async function SupportPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'আইটি সাপোর্ট ও মেইনটেন্যান্স নীতি' : 'IT Support Policy'}
      lastUpdated="2026-10-29"
      slug="support-policy"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর আইটি (it.ruhanir.com) কর্তৃক প্রদত্ত সফটওয়্যার ও নেটওয়ার্ক অবকাঠামোর চলমান সহায়তা ও রক্ষণাবেক্ষণ সংক্রান্ত নির্দেশনা।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">সাপোর্ট চ্যানেলসমূহ</h2>
            <p>
              প্রাতিষ্ঠানিক ক্লায়েন্টগণ তাদের নির্ধারিত প্রজেক্ট সাপোর্ট পোর্টাল অথবা অফিসিয়াল ইমেইল <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a>-এর মাধ্যমে টেকনিক্যাল সহায়তা অনুরোধ জমা দিতে পারেন।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">সার্ভিস লেভেল এবং রক্ষণাবেক্ষণ</h2>
            <p>
              সাপোর্টের সময়সূচী, প্রতিক্রিয়া কাঠামো এবং নিয়মিত সিস্টেম রক্ষণাবেক্ষণ ক্লায়েন্টের সাথে স্বাক্ষরিত বার্ষিক রক্ষণাবেক্ষণ চুক্তি (AMC) বা সার্ভিস লেভেল চুক্তিতে (SLA) নির্ধারিত হয়।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Operational framework governing maintenance and technical support services delivered by Ruhanir IT (it.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Support Channels</h2>
            <p>
              Corporate clients access technical assistance via designated ticketing infrastructure or through direct communication at <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a>.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Service Levels and Availability</h2>
            <p>
              Maintenance windows, escalation matrices, and response parameters are established in individual Annual Maintenance Contracts (AMC) or project SLAs. The applicable terms are stated in the service agreement and in the order confirmation.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
