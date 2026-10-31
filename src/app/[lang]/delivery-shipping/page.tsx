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
    ...getCommonMetadata(lang as Lang, 'delivery-shipping'),
    title: lang === 'bn' ? 'ডেলিভারি ও শিপিং নীতি' : 'Delivery and Shipping Policy',
  };
}

export default async function DeliveryShippingPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'ডেলিভারি ও শিপিং নীতি' : 'Delivery and Shipping Policy'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর স্টোর (store.ruhanir.com) সারা বাংলাদেশে গ্রাহকদের নিকট নির্ভরযোগ্য লজিস্টিকস নেটওয়ার্কের মাধ্যমে ফিজিক্যাল পণ্য পৌঁছে দিতে কাজ করে।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">শিপমেন্ট ও কুরিয়ারে হস্তান্তর</h2>
            <p>
              পেমেন্ট নিশ্চিত হওয়ার ৪৮ ঘণ্টার মধ্যে অর্ডার প্রক্রিয়াজাত করে অনুমোদিত কুরিয়ার সার্ভিসের নিকট হস্তান্তর করা হয়।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">আনুমানিক ডেলিভারি সময়সীমা</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>একই শহরের মধ্যে (Inside city): সাধারণত ৫ দিনের মধ্যে ডেলিভারি সম্পন্ন হয়।</li>
              <li>শহরের বাইরে বা দূরবর্তী এলাকা (Outside city): সর্বোচ্চ ১০ দিনের মধ্যে ডেলিভারি সম্পন্ন হয়।</li>
            </ul>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">শিপিং চার্জ</h2>
            <p>
              ডেলিভারি এলাকা ও পণ্যের ওজনের ভিত্তিতে প্রযোজ্য শিপিং চার্জ চেকআউট স্ক্রিনে স্পষ্টভাবে প্রদর্শিত হয়। নির্দিষ্ট অর্ডারের প্রযোজ্য শর্তাবলী সংশ্লিষ্ট পণ্যের বিবরণ পাতা এবং অর্ডার নিশ্চিতকরণে উল্লেখ থাকে।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Ruhanir Store (store.ruhanir.com) facilitates nationwide order fulfillment across Bangladesh using authorized courier partners.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Carrier Handover</h2>
            <p>
              Orders are packaged and handed over to carrier services within 48 hours of confirmed payment.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Estimated Delivery Timeframes</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Same-city deliveries: typically completed within 5 days.</li>
              <li>Outside-city / nationwide deliveries: completed within up to 10 days.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Delivery Fees and Conditions</h2>
            <p>
              Applicable freight charges are summarized transparently prior to checkout completion. The applicable terms are stated on the product page and in the order confirmation.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
