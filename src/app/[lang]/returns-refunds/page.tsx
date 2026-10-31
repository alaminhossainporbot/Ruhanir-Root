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
    ...getCommonMetadata(lang as Lang, 'returns-refunds'),
    title: lang === 'bn' ? 'রিটার্ন, রিফান্ড ও অর্ডার বাতিলকরণ নীতি' : 'Return, Refund and Cancellation Policy',
  };
}

export default async function ReturnsRefundsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  const toc = isBn
    ? [
        { id: 'returns', title: '১. পণ্য ফেরত (Return Policy)' },
        { id: 'refunds', title: '২. মূল্য ফেরত (Refund Policy)' },
        { id: 'cancellations', title: '৩. অর্ডার বাতিলকরণ (Cancellation Policy)' },
      ]
    : [
        { id: 'returns', title: '1. Product Returns' },
        { id: 'refunds', title: '2. Refund Processing' },
        { id: 'cancellations', title: '3. Order Cancellations' },
      ];

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'রিটার্ন, রিফান্ড ও অর্ডার বাতিলকরণ নীতি' : 'Return, Refund and Cancellation Policy'}
      lastUpdated="2026-10-29"
      toc={toc}
    >
      {isBn ? (
        <>
          <p>
            রুহানীর স্টোর (store.ruhanir.com)-এর মাধ্যমে ক্রয়কৃত পণ্য এবং ডিজিটাল সেবার ক্ষেত্রে প্রযোজ্য রিটার্ন, মূল্য ফেরত ও বাতিলকরণ সংক্রান্ত সুস্পষ্ট শর্তাবলী নিচে বর্ণনা করা হলো।
          </p>

          <section id="returns" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">১. পণ্য ফেরত (Return Policy)</h2>
            <p>
              ত্রুটিপূর্ণ, ক্ষতিগ্রস্ত বা ভুল পণ্য প্রাপ্তির ক্ষেত্রে ক্রেতা পণ্য ফেরতের আবেদন করতে পারেন। পণ্যটি তার মূল প্যাকেজিং ও অব্যবহৃত অবস্থায় থাকতে হবে। প্রতিটি ফিজিক্যাল পণ্যের সুনির্দিষ্ট ফেরতের যোগ্যতা ও সময়সীমা সংশ্লিষ্ট পণ্যের বিবরণ পাতা এবং অর্ডার নিশ্চিতকরণে স্পষ্টভাবে উল্লেখ থাকে।
            </p>
          </section>

          <section id="refunds" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">২. মূল্য ফেরত (Refund Policy)</h2>
            <p>
              যদি কোনো নিশ্চিত অর্ডার অনিবার্য কারণে সরবরাহ করা সম্ভব না হয়, তবে ১০ (দশ) কার্যদিবসের মধ্যে সম্পূর্ণ অর্থ ফেরত প্রদান করা হবে। অনুমোদিত পণ্য ফেরতের ক্ষেত্রে পণ্যটি আমাদের ওয়্যারহাউসে পৌঁছানো ও যাচাইকরণ শেষে একই সময়সীমার মধ্যে রিফান্ড প্রক্রিয়া সম্পন্ন করা হয়।
            </p>
          </section>

          <section id="cancellations" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৩. অর্ডার বাতিলকরণ (Cancellation Policy)</h2>
            <p>
              অর্ডার বাতিলের নিয়মাবলী তিনটি প্রধান পর্যায়ে বিভক্ত:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>কুরিয়ারে হস্তান্তরের পূর্বে:</strong> কুরিয়ারে পণ্য পাঠানোর পূর্বে অর্ডার বাতিলের আবেদন গ্রহণ সাপেক্ষে প্রক্রিয়া করা হয়।</li>
              <li><strong>কুরিয়ারে হস্তান্তরের পরে:</strong> পণ্য শিপমেন্টে হস্তান্তরিত হয়ে গেলে সরাসরি বাতিল সম্ভব নয়; পণ্য প্রাপ্তির পর রিটার্ন নীতিমালা প্রযোজ্য হবে।</li>
              <li><strong>ডিজিটাল লাইসেন্স:</strong> ডিজিটাল লাইসেন্স বা সফটওয়্যার কোড একবার ইমেইল বা অ্যাকাউন্টে সফলভাবে হস্তান্তরিত হলে তা বাতিল বা প্রত্যাহারযোগ্য নয়।</li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <p>
            This policy outlines clearly separated terms for product returns, monetary refunds, and order cancellations for transactions conducted through Ruhanir Store (store.ruhanir.com).
          </p>

          <section id="returns" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">1. Product Returns</h2>
            <p>
              Returns may be requested for physical products received in damaged, defective, or incorrect condition. Returned items must remain in their original packaging with all accompanying accessories. The applicable terms and eligibility conditions are stated on the product page and in the order confirmation.
            </p>
          </section>

          <section id="refunds" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">2. Refund Processing</h2>
            <p>
              Where a confirmed order cannot be delivered, a full refund will be processed within 10 days. For approved product returns, refund processing commences following receipt and inspection of the item within the same standard timeframe.
            </p>
          </section>

          <section id="cancellations" className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">3. Order Cancellations</h2>
            <p>
              Order cancellation requests are managed according to order processing stages:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Before Dispatch:</strong> Cancellation requests submitted prior to fulfillment handover are reviewed and processed directly.</li>
              <li><strong>After Dispatch:</strong> Once physical consignments are transferred to the delivery carrier, in-transit cancellation is not permitted; standard return procedures apply upon delivery.</li>
              <li><strong>Delivered Digital Licenses:</strong> Digital product keys and downloadable licenses that have already been transmitted and delivered are strictly non-cancellable.</li>
            </ul>
          </section>
        </>
      )}
    </LegalLayout>
  );
}
