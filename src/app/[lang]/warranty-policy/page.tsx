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
    ...getCommonMetadata(lang as Lang, 'warranty-policy'),
    title: lang === 'bn' ? 'ওয়ারেন্টি নীতি' : 'Warranty Policy',
  };
}

export default async function WarrantyPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'ওয়ারেন্টি নীতি' : 'Warranty Policy'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর স্টোর (store.ruhanir.com)-এ বিক্রিত ফিজিক্যাল পণ্যের প্রযোজ্য ওয়ারেন্টি সংক্রান্ত নিয়মাবলী নিচে বিবৃত হলো।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ওয়ারেন্টির প্রযোজ্যতা</h2>
            <p>
              রুহানীর স্টোরে উপলব্ধ হার্ডওয়্যার বা ফিজিক্যাল পণ্যসমূহে প্রস্তুতকারক বা অনুমোদিত আমদানিকারক প্রদত্ত অফিসিয়াল ওয়ারেন্টি প্রযোজ্য হয়। প্রতিটি পণ্যের ক্ষেত্রে সুনির্দিষ্ট ওয়ারেন্টির মেয়াদ এবং আওতা সংশ্লিষ্ট পণ্যের বিবরণ পাতায় এবং অর্ডার নিশ্চিতকরণে স্পষ্টভাবে উল্লেখ থাকে।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ওয়ারেন্টি দাবির প্রক্রিয়া</h2>
            <p>
              পণ্য ত্রুটিপূর্ণ হলে ক্রেতা আমাদের সহায়তা টিমের মাধ্যমে অথবা সংশ্লিষ্ট ব্র্যান্ডের অনুমোদিত সার্ভিস সেন্টারে ওয়ারেন্টির জন্য যোগাযোগ করতে পারেন। ওয়ারেন্টি দাবির সময় ক্রয়ের মূল ইনভয়েস বা ক্যাশ মেমো উপস্থাপন করতে হবে।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            This Warranty Policy sets forth terms governing warranty coverage on physical items sold through Ruhanir Store (store.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Coverage Scope</h2>
            <p>
              Physical hardware products offered by Ruhanir Store carry official manufacturer or authorized distributor warranties where applicable. The applicable terms are stated on the product page and in the order confirmation.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Claim Procedure</h2>
            <p>
              To initiate an authorized service claim during the covered duration, clients may submit an inquiry to our support desk or present the original proof of purchase directly to authorized manufacturer service centers.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
