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
    ...getCommonMetadata(lang as Lang, 'payment-policy'),
    title: lang === 'bn' ? 'পেমেন্ট নীতি' : 'Payment Policy',
  };
}

export default async function PaymentPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'পেমেন্ট নীতি' : 'Payment Policy'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর স্টোর (store.ruhanir.com)-এ ক্রয়কৃত সকল পণ্য ও সেবার পেমেন্ট প্রক্রিয়া স্বচ্ছতা ও সর্বোচ্চ সুরক্ষার সাথে পরিচালিত হয়।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">পেমেন্ট পদ্ধতি</h2>
            <p>
              অর্ডার সমাপ্তির সময় চেকআউট স্ক্রিনে প্রদর্শিত পেমেন্ট মাধ্যমগুলোর সাহায্যে লেনদেন সম্পন্ন হয়। প্রতিটি পণ্যের ক্ষেত্রে প্রযোজ্য পেমেন্ট পদ্ধতি সংশ্লিষ্ট পণ্যের বিবরণ পাতায় এবং চেকআউট প্রক্রিয়ায় প্রদর্শিত হয়।
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">কার্ড তথ্যের নিরাপত্তা</h2>
            <p>
              রুহানীর ইঞ্জিন বা রুহানীর স্টোর গ্রাহকের ক্রেডিট কার্ড, ডেবিট কার্ড বা ব্যাংক একাউন্টের সংবেদনশীল তথ্য নিজস্ব কোনো সার্ভারে সংরক্ষণ করে না। সকল আর্থিক লেনদেন সরাসরি লাইসেন্সপ্রাপ্ত ও এনক্রিপ্টেড পেমেন্ট গেটওয়ের মাধ্যমে প্রক্রিয়াজাত হয়।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            This Payment Policy outlines transactional security measures governing checkouts on Ruhanir Store (store.ruhanir.com).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Payment Processing</h2>
            <p>
              Payments are processed through the payment methods shown at checkout. The applicable terms are stated on the product page and in the order confirmation.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Cardholder Data Security</h2>
            <p>
              Ruhanir Engine does not store payment card numbers, security codes, or banking credentials on its own servers. All electronic transactions are handled directly through licensed, encrypted payment processing gateways.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
