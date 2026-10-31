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
    ...getCommonMetadata(lang as Lang, 'legal'),
    title: lang === 'bn' ? 'আইনি ও নীতিমালা কেন্দ্র' : 'Legal & Policies Hub',
  };
}

export default async function LegalHubPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'আইনি ও নীতিমালা কেন্দ্র' : 'Legal & Policies Hub'}
      lastUpdated="2026-10-29"
    >
      <div className="space-y-12">
        <p className="text-[17px] text-[#374151] leading-relaxed">
          {isBn
            ? 'রুহানীর ইঞ্জিন এবং এর বিভাগসমূহের (রুহানীর আইটি ও রুহানীর স্টোর) প্রাতিষ্ঠানিক পরিচালনা, অনলাইন সেবা এবং বাণিজ্যিক কার্যক্রমের যাবতীয় আইনি নীতিমালা নিচে তালিকাভুক্ত করা হলো।'
            : 'Official documentation, legal terms, and operational policies governing Ruhanir Engine and its divisions (Ruhanir IT and Ruhanir Store).'}
        </p>

        {/* Group 1: Website Policies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] border-b border-slate-200 pb-2">
            {isBn ? 'ওয়েবসাইট নীতিমালা' : 'Website Policies'}
          </h2>
          <ul className="divide-y divide-slate-200">
            <li className="py-3">
              <Link href={`/${lang}/privacy-policy/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'যোগাযোগ ফর্মের তথ্য সংগ্রহ, ব্রাউজার স্টোরেজ, ব্যবহারকারীর অধিকার ও ডেটা সুরক্ষার নিয়মাবলী।'
                  : 'Rules on contact form data collection, browser storage, user access rights, and data protection.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/terms/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ব্যবহারের শর্তাবলী (Terms and Conditions)' : 'Terms and Conditions'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইট ব্যবহারের সাধারণ নীতিমালা, মেধা সম্পদ অধিকার এবং আইনি সীমারেখা।'
                  : 'General terms governing access, intellectual property rights, and liability limitations.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/cookie-policy/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'কুকি ও ব্রাউজার স্টোরেজ নীতি (Cookie Policy)' : 'Cookie and Browser Storage Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইটে কুকিহীন ব্রাউজার লোকাল স্টোরেজে ভাষা পছন্দ সংরক্ষণের সুনির্দিষ্ট তথ্য।'
                  : 'Specific disclosure confirming the site uses only functional local storage for language preference and no tracking cookies.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/accessibility/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'অ্যাক্সেসিবিলিটি বিবৃতি (Accessibility Statement)' : 'Accessibility Statement'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইটটির সর্বজনীন ব্যবহারযোগ্যতা, কীবোর্ড নেভিগেশন ও স্ক্রিন রিডার সামঞ্জস্যের বিবরণ।'
                  : 'Our standards for universal access, keyboard navigation, and screen reader compatibility.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/complaints/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'অভিযোগ ও প্রতিক্রিয়া (Complaints and Feedback)' : 'Complaints and Feedback'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'গ্রাহক ও ব্যবহারকারীদের মতামত, পরামর্শ বা অভিযোগ জানানোর প্রক্রিয়া।'
                  : 'Process for users and partners to submit constructive feedback or formal complaints.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/security/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'নিরাপত্তা ও দায়িত্বশীল প্রকাশ নীতি (Security Disclosure)' : 'Security and Responsible Disclosure'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'সুরক্ষা সংক্রান্ত দুর্বলতা দায়িত্বশীলভাবে অবহিত করার নির্দেশিকা এবং security.txt সংযোগ।'
                  : 'Vulnerability reporting guidelines and security contact details.'}
              </p>
            </li>
          </ul>
        </section>

        {/* Group 2: Ruhanir Store Policies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] border-b border-slate-200 pb-2">
            {isBn ? 'রুহানীর স্টোর নীতিমালা (Store Policies)' : 'Ruhanir Store Policies'}
          </h2>
          <ul className="divide-y divide-slate-200">
            <li className="py-3">
              <Link href={`/${lang}/terms-of-sale/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'বিক্রয়ের শর্তাবলী (Terms of Sale)' : 'Terms of Sale'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'অর্ডার প্রক্রিয়া, মূল্যের স্বচ্ছতা এবং ক্রেতার সাধারণ অধিকার।'
                  : 'Commercial order placement terms, pricing transparency, and buyer rights.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/returns-refunds/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'রিটার্ন, রিফান্ড ও বাতিলকরণ নীতি (Return, Refund & Cancellation)' : 'Return, Refund and Cancellation Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'পণ্য ফেরত, মূল্য ফেরত ও অর্ডার বাতিলের সুনির্দিষ্ট পর্যায়ক্রমিক নিয়মাবলী।'
                  : 'Clear separated rules for returning goods, processing refunds, and order cancellations.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/delivery-shipping/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ডেলিভারি ও শিপিং নীতি (Delivery and Shipping)' : 'Delivery and Shipping Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'কুরিয়ারে হস্তান্তর ও দেশজুড়ে ডেলিভারি সময়সীমার সাধারণ বিবরণ।'
                  : 'Logistics fulfillment, dispatch timeframes, and nationwide delivery standards.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/payment-policy/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'পেমেন্ট নীতি (Payment Policy)' : 'Payment Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'নিরাপদ পেমেন্ট গেটওয়ে এবং কার্ড তথ্য নিজস্ব সার্ভারে সংরক্ষণ না করার নীতি।'
                  : 'Checkout processing terms and affirmation that card data is never stored on internal servers.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/digital-terms/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ডিজিটাল লাইসেন্স ও সফটওয়্যার শর্তাবলী (Digital Licenses)' : 'Digital License and Software Terms'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ডিজিটাল লাইসেন্স বিতরণ, অ্যাক্টিভেশন এবং লাইসেন্স অধিকার সংক্রান্ত নিয়ম।'
                  : 'Terms governing digital key distribution, software activation, and license entitlement.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/warranty-policy/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ওয়ারেন্টি নীতি (Warranty Policy)' : 'Warranty Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'প্রযোজ্য ফিজিক্যাল পণ্যে প্রস্তুতকারক বা ডিলার ওয়ারেন্টির শর্তসমূহ।'
                  : 'Scope and claim procedures for manufacturer or brand warranties on physical products.'}
              </p>
            </li>
          </ul>
        </section>

        {/* Group 3: Ruhanir IT Services Policies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] border-b border-slate-200 pb-2">
            {isBn ? 'রুহানীর আইটি সেবা নীতিমালা (IT Services Policies)' : 'Ruhanir IT Services Policies'}
          </h2>
          <ul className="divide-y divide-slate-200">
            <li className="py-3">
              <Link href={`/${lang}/service-terms/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'সেবা শর্তাবলী (Service Terms)' : 'IT Service Terms'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'কাস্টম সফটওয়্যার, ইআরপি ও এন্টারপ্রাইজ সিস্টেম চুক্তির সাধারণ শর্তাবলী।'
                  : 'Commercial engagement frameworks for custom software, ERP, and enterprise setups.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/support-policy/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'সাপোর্ট নীতি (Support Policy)' : 'IT Support Policy'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'প্রযুক্তিগত সহায়তা, যোগাযোগ মাধ্যম এবং রক্ষণাবেক্ষণ সহায়তা সংক্রান্ত নীতি।'
                  : 'Support channels, troubleshooting workflows, and operational maintenance frameworks.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/confidentiality/`} className="text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'গোপনীয়তা ও ডেটা ব্যবস্থাপনা (Confidentiality & Data Handling)' : 'Confidentiality and Data Handling'}
              </Link>
              <p className="text-[15px] text-[#4B5563] mt-1">
                {isBn
                  ? 'প্রাতিষ্ঠানিক ক্লায়েন্ট তথ্যের গোপনীয়তা রক্ষা এবং ডেটা নিরাপত্তা ব্যবস্থা।'
                  : 'Enterprise client confidentiality, data partitioning, and secure system practices.'}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}
