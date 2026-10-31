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
    ...getCommonMetadata(lang as Lang, 'digital-terms'),
    title: lang === 'bn' ? 'ডিজিটাল লাইসেন্স ও সফটওয়্যার শর্তাবলী' : 'Digital License and Software Terms',
  };
}

export default async function DigitalTermsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'ডিজিটাল লাইসেন্স ও সফটওয়্যার শর্তাবলী' : 'Digital License and Software Terms'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর স্টোর (store.ruhanir.com)-এর মাধ্যমে পরিবেশিত ডিজিটাল লাইসেন্স কি, সফটওয়্যার ও সাবস্ক্রিপশন সংক্রান্ত শর্তাবলী নিচে প্রদান করা হলো।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">লাইসেন্স হস্তান্তর</h2>
            <p>
              পেমেন্ট যাচাইয়ের পর ডিজিটাল লাইসেন্স কোড বা অ্যাক্টিভেশন নির্দেশনা ক্রেতার নিবন্ধিত ইমেইলে অথবা অ্যাকাউন্ট ড্যাশবোর্ডে ইলেকট্রনিক মাধ্যমে সরবরাহ করা হয়।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ব্যবহারের আওতা</h2>
            <p>
              ডিজিটাল পণ্যসমূহ সংশ্লিষ্ট সফটওয়্যার প্রকাশক বা প্রস্তুতকারকের এন্ড-ইউজার লাইসেন্স চুক্তি (EULA) অনুযায়ী পরিচালিত হয়। প্রতিটি লাইসেন্সের মেয়াদ, সক্রিয়করণের সংখ্যা ও শর্তাবলী সংশ্লিষ্ট পণ্যের বিবরণ পাতায় এবং অর্ডার নিশ্চিতকরণে উল্লেখ থাকে।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ফেরতযোগ্যতা</h2>
            <p>
              ডিজিটাল লাইসেন্স কি একবার সফলভাবে গ্রাহকের কাছে প্রেরিত হলে তা প্রকৃতিগত কারণেই ফেরতযোগ্য নয়, যদি না অ্যাক্টিভেশন কোডটি মূল সিস্টেম দ্বারা পূর্বে ব্যবহৃত বা ত্রুটিপূর্ণ হিসেবে প্রমাণিত হয়।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            These terms govern purchases of digital product keys, electronic software licenses, and online subscriptions distributed via Ruhanir Store (store.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Electronic Delivery</h2>
            <p>
              Following payment authorization, digital licenses and activation guidelines are transmitted electronically to the buyer&apos;s registered email address or customer dashboard.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Scope of License</h2>
            <p>
              Software licenses remain subject to the respective software vendor&apos;s End User License Agreement (EULA). The applicable terms are stated on the product page and in the order confirmation.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Refund Exclusions</h2>
            <p>
              Due to their reproducible electronic nature, delivered digital license keys are strictly non-refundable, unless verifiable system validation proves the key was invalid prior to transmission.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
