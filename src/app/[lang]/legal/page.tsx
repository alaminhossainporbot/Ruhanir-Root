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
              <Link href={`/${lang}/privacy-policy/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'যোগাযোগ ফর্মের তথ্য সংগ্রহ, ব্রাউজার স্টোরেজ, ব্যবহারকারীর অধিকার ও ডেটা সুরক্ষার নিয়মাবলী।'
                  : 'Rules on contact form data collection, browser storage, user access rights, and data protection.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/terms/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ব্যবহারের শর্তাবলী (Terms and Conditions)' : 'Terms and Conditions'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইট ব্যবহারের সাধারণ নীতিমালা, মেধা সম্পদ অধিকার এবং আইনি সীমারেখা।'
                  : 'General terms governing access, intellectual property rights, and liability limitations.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/cookie-policy/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'কুকি ও ব্রাউজার স্টোরেজ নীতি (Cookie Policy)' : 'Cookie and Browser Storage Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইটে কুকিহীন ব্রাউজার লোকাল স্টোরেজে ভাষা পছন্দ সংরক্ষণের সুনির্দিষ্ট তথ্য।'
                  : 'Specific disclosure confirming the site uses only functional local storage for language preference and no tracking cookies.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/accessibility/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'অ্যাক্সেসিবিলিটি বিবৃতি (Accessibility Statement)' : 'Accessibility Statement'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ওয়েবসাইটটির সর্বজনীন ব্যবহারযোগ্যতা, কীবোর্ড নেভিগেশন ও স্ক্রিন রিডার সামঞ্জস্যের বিবরণ।'
                  : 'Our standards for universal access, keyboard navigation, and screen reader compatibility.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/complaints/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'অভিযোগ ও প্রতিক্রিয়া (Complaints and Feedback)' : 'Complaints and Feedback'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'গ্রাহক ও ব্যবহারকারীদের মতামত, পরামর্শ বা অভিযোগ জানানোর প্রক্রিয়া।'
                  : 'Process for users and partners to submit constructive feedback or formal complaints.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/security/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'নিরাপত্তা ও দায়িত্বশীল প্রকাশ নীতি (Security Disclosure)' : 'Security and Responsible Disclosure'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'নিরাপত্তা দুর্বলতা চিহ্নিতকরণ ও দায়িত্বশীল পদ্ধতিতে জানানোর প্রক্রিয়া।'
                  : 'Guidelines on reporting security vulnerabilities and responsible disclosure protocol.'}
              </p>
            </li>
          </ul>
        </section>

        {/* Group 2: Operational & Division Policies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] border-b border-slate-200 pb-2">
            {isBn ? 'বাণিজ্যিক ও পরিচালনা নীতিমালা' : 'Operations & Commerce Policies'}
          </h2>
          <ul className="divide-y divide-slate-200">
            <li className="py-3">
              <Link href={`/${lang}/terms-of-sale/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'বিক্রয় শর্তাবলী (Terms of Sale)' : 'Terms of Sale'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'পণ্য ও সেবা অর্ডারের শর্ত, মূল্য নির্ধারণ ও প্রাতিষ্ঠানিক ক্রয় নীতি।'
                  : 'Terms governing commercial transactions, purchase orders, pricing, and buyer agreements.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/payment-policy/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'মূল্য পরিশোধ নীতি (Payment Policy)' : 'Payment Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'অনুমোদিত পেমেন্ট মাধ্যম, কারেন্সি ও ইনভয়েসিং প্রক্রিয়া।'
                  : 'Accepted payment methods, official currency, invoicing, and transactional security.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/delivery-shipping/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ডেলিভারি ও শিপিং নীতি (Delivery and Shipping)' : 'Delivery and Shipping Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'ডিজিটাল লাইসেন্স হস্তান্তর এবং ফিজিক্যাল পণ্য সরবরাহের সময়সীমা ও নিয়ম।'
                  : 'Timelines and procedures for physical product shipping and instant digital license delivery.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/returns-refunds/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'রিটার্ন ও রিফান্ড নীতি (Returns and Refunds)' : 'Returns and Refund Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'পণ্য ফেরত, বাতিলকরণ ও রিফান্ডের সুনির্দিষ্ট শর্তাবলী।'
                  : 'Eligibility, non-returnable items, timelines, and refund execution methods.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/warranty-policy/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ওয়ারেন্টি নীতি (Warranty Policy)' : 'Warranty Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'হার্ডওয়্যার ও ডিজিটাল পণ্যের ক্ষেত্রে ওয়ারেন্টির পরিধি ও দাবি প্রক্রিয়া।'
                  : 'Scope of warranty for physical hardware and activation guarantees for software.'}
              </p>
            </li>
          </ul>
        </section>

        {/* Group 3: Technical & Enterprise Policies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1B3A] border-b border-slate-200 pb-2">
            {isBn ? 'প্রযুক্তিগত ও এন্টারপ্রাইজ নীতিমালা' : 'Technical & Enterprise Policies'}
          </h2>
          <ul className="divide-y divide-slate-200">
            <li className="py-3">
              <Link href={`/${lang}/service-terms/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'সেবা শর্তাবলী (Service Terms)' : 'Service Terms'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'রুহানীর আইটির কাস্টম সফটওয়্যার, নেটওয়ার্কিং ও এন্টারপ্রাইজ প্রকল্প পরিচালনার চুক্তি।'
                  : 'Specific terms governing bespoke software architecture, ERP implementations, and SLA commitments.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/support-policy/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'সাপোর্ট নীতি (Support Policy)' : 'Support Policy'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'কারিগরি সহায়তার স্তর, সাড়া দেওয়ার সময়সীমা ও এসএলএ মান।'
                  : 'Support tiers, response time targets, escalation protocol, and maintenance scopes.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/digital-terms/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'ডিজিটাল সামগ্রীর শর্ত (Digital Terms)' : 'Digital Products & Software Terms'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'সফটওয়্যার লাইসেন্সিং, অ্যাক্টিভেশন এবং মেধা সম্পদ ব্যবহারের বিশেষ নির্দেশিকা।'
                  : 'Specific rules on software activation keys, digital asset distribution, and license ownership.'}
              </p>
            </li>
            <li className="py-3">
              <Link href={`/${lang}/confidentiality/`} className="min-h-[44px] inline-flex items-center text-[16px] font-semibold text-[#0E52C3] hover:underline">
                {isBn ? 'গোপনীয়তা ও এনডিএ (Confidentiality & NDA)' : 'Confidentiality and NDA'}
              </Link>
              <p className="text-[16px] text-[#4B5563] mt-1">
                {isBn
                  ? 'প্রাতিষ্ঠানিক ক্লায়েন্ট ডেটা, সোর্স কোড ও ব্যবসায়িক তথ্যের গোপনীয়তা রক্ষা প্রতিশ্রুতি।'
                  : 'Institutional commitments to non-disclosure, client trade secret security, and mutual NDA standards.'}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}
