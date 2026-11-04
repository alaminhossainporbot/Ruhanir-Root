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
  return getCommonMetadata(lang as Lang, 'terms-of-sale');
}

export default async function TermsOfSalePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'বিক্রয়ের শর্তাবলী' : 'Terms of Sale'}
      lastUpdated="2026-10-29"
      slug="terms-of-sale"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            এই বিক্রয়ের শর্তাবলী রুহানীর স্টোর (store.ruhanir.com)-এর মাধ্যমে সম্পন্ন সকল বাণিজ্যিক ক্রয়াদেশের ক্ষেত্রে প্রযোজ্য।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">অর্ডার ও চুক্তি</h2>
            <p>
              ওয়েবসাইটে প্রদর্শিত পণ্য এবং মূল্যের ভিত্তিতে অর্ডার প্লেস করার পর প্রাপ্ত অর্ডার কনফার্মেশন বার্তার মাধ্যমে ক্রয় চুক্তি সম্পন্ন হয়। প্রতিটি পণ্যের সুনির্দিষ্ট শর্তাবলী সংশ্লিষ্ট পণ্যের বিবরণ পাতায় এবং অর্ডার নিশ্চিতকরণে উল্লেখ থাকে।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">মূল্য ও কর</h2>
            <p>
              সকল পণ্যের মূল্য চেকআউটের সময় স্পষ্টভাবে প্রদর্শিত হয়। কোনো অতিরিক্ত চার্জ বা শিপিং ফি প্রযোজ্য হলে তা পেমেন্টের পূর্বে দেখানো হয়।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">ক্রেতার দায়িত্ব</h2>
            <p>
              অর্ডার প্রক্রিয়াকরণের সময় সঠিক ডেলিভারি ঠিকানা এবং কার্যকর যোগাযোগের বিবরণ প্রদান করা ক্রেতার দায়িত্ব।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            These Terms of Sale govern commercial purchases placed through Ruhanir Store (store.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Orders and Contract Formation</h2>
            <p>
              An order placed through the online store constitutes an offer to purchase. The commercial contract is confirmed upon dispatch of our official order confirmation notice. The applicable terms are stated on the product page and in the order confirmation.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Pricing and Transparency</h2>
            <p>
              All prices are itemized clearly during the checkout workflow. Any applicable shipping or processing fees are summarized prior to payment completion.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Customer Obligations</h2>
            <p>
              Customers must provide accurate contact and delivery information to facilitate prompt and verifiable order fulfillment.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
