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
  return getCommonMetadata(lang as Lang, 'privacy-policy');
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  const toc = isBn
    ? [
        { id: 'collection', title: '১. আমরা কী তথ্য সংগ্রহ করি' },
        { id: 'storage-browser', title: '২. ব্রাউজার স্টোরেজ ও কুকি' },
        { id: 'purpose', title: '৩. তথ্য ব্যবহারের উদ্দেশ্য' },
        { id: 'sharing', title: '৪. তথ্য অপ্রকাশের নিশ্চয়তা' },
        { id: 'rights', title: '৫. আপনার অধিকার (প্রবেশাধিকার, সংশোধন ও মুছে ফেলা)' },
        { id: 'retention', title: '৬. তথ্য সংরক্ষণের সময়সীমা' },
        { id: 'children', title: '৭. অপ্রাপ্তবয়স্কদের সুরক্ষা' },
        { id: 'legal-framework', title: '৮. প্রযোজ্য আইন' },
      ]
    : [
        { id: 'collection', title: '1. Information We Collect' },
        { id: 'storage-browser', title: '2. Browser Storage & Cookies' },
        { id: 'purpose', title: '3. Purpose of Processing' },
        { id: 'sharing', title: '4. No Sale or Commercial Disclosure' },
        { id: 'rights', title: '5. Your Rights (Access, Correction, Deletion)' },
        { id: 'retention', title: '6. Data Retention' },
        { id: 'children', title: '7. Children\u2019s Privacy' },
        { id: 'legal-framework', title: '8. Governing Legal Framework' },
      ];

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
      lastUpdated="2026-10-29"
      slug="privacy-policy"
      toc={toc}
    >
      {isBn ? (
        <>
          <p>
            রুহানীর ইঞ্জিন (ruhanir.com) ব্যবহারকারীর তথ্যের গোপনীয়তা রক্ষা এবং ডেটা সুরক্ষায় দায়বদ্ধ। এই গোপনীয়তা নীতিতে ব্যাখ্যা করা হয়েছে যখন আপনি আমাদের ওয়েবসাইটে প্রবেশ করেন বা যোগাযোগ ফর্ম ব্যবহার করেন তখন তথ্য কীভাবে ব্যবহৃত হয়।
          </p>

          <section id="collection" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">১. আমরা কী তথ্য সংগ্রহ করি</h2>
            <p>
              ওয়েবসাইটের যোগাযোগ ফর্মের মাধ্যমে প্রেরিত তথ্যসমূহ:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>আপনার নাম</li>
              <li>ফোন নম্বর অথবা ইমেইল ঠিকানা</li>
              <li>উদ্দিষ্ট বিভাগ (রুহানীর আইটি, রুহানীর স্টোর, বা অন্যান্য)</li>
              <li>আপনার প্রেরিত বার্তা</li>
            </ul>
          </section>

          <section id="storage-browser" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">২. ব্রাউজার স্টোরেজ ও কুকি</h2>
            <p>
              আমাদের ওয়েবসাইট ব্রাউজারে কোনো ট্র্যাকিং বা বিজ্ঞাপন কুকি ব্যবহার করে না। সাইটটি শুধুমাত্র আপনার ভাষা নির্বাচন মনে রাখার উদ্দেশ্যে ব্রাউজারের লোকাল স্টোরেজে (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">localStorage</code>) ভাষা পছন্দ সংরক্ষণ করে।
            </p>
          </section>

          <section id="purpose" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৩. তথ্য ব্যবহারের উদ্দেশ্য</h2>
            <p>
              আপনার প্রদত্ত তথ্য শুধুমাত্র আপনার প্রেরিত বার্তার পর্যালোচনা, অনুসন্ধান বা অনুরোধের উত্তর প্রদান এবং প্রয়োজনীয় প্রাতিষ্ঠানিক যোগাযোগ রক্ষার জন্য ব্যবহৃত হয়।
            </p>
          </section>

          <section id="sharing" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৪. তথ্য অপ্রকাশের নিশ্চয়তা</h2>
            <p>
              আমরা কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রয়, ভাড়া বা বাণিজ্য করি না। শুধুমাত্র আপনার অনুসন্ধান নিষ্পত্তির দায়িত্বে থাকা অনুমোদিত প্রতিনিধিরা বার্তা দেখতে পারেন।
            </p>
          </section>

          <section id="rights" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৫. আপনার অধিকার (প্রবেশাধিকার, সংশোধন ও মুছে ফেলা)</h2>
            <p>
              আমাদের কাছে সংরক্ষিত আপনার ব্যক্তিগত তথ্যে প্রবেশাধিকার, ভুল তথ্য সংশোধন বা তা সম্পূর্ণরূপে মুছে ফেলার অনুরোধ জানাতে যেকোনো সময় সরাসরি <a href="mailto:info@ruhanir.com" className="text-[#0E52C3] underline font-medium">info@ruhanir.com</a> ঠিকানায় ইমেইল করুন।
            </p>
          </section>

          <section id="retention" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৬. তথ্য সংরক্ষণের সময়সীমা</h2>
            <p>
              যোগাযোগ ফর্মের মাধ্যমে প্রাপ্ত তথ্য অনুসন্ধানের সন্তোষজনক নিষ্পত্তি এবং প্রাতিষ্ঠানিক রেকর্ড সংরক্ষণের জন্য যতদিন যৌক্তিক প্রয়োজন, ততদিন সংরক্ষণ করা হয়।
            </p>
          </section>

          <section id="children" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৭. অপ্রাপ্তবয়স্কদের সুরক্ষা</h2>
            <p>
              আমাদের ওয়েবসাইট সরাসরি অপ্রাপ্তবয়স্কদের উদ্দেশ্যে পরিচালিত নয় এবং আমরা জেনেশুনে অপ্রাপ্তবয়স্কদের ব্যক্তিগত তথ্য সংগ্রহ করি না।
            </p>
          </section>

          <section id="legal-framework" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৮. প্রযোজ্য আইন</h2>
            <p>
              রুহানীর ইঞ্জিন বাংলাদেশের প্রযোজ্য ডেটা সুরক্ষা আইন (applicable Bangladesh data protection law) অনুসারে তার কার্যক্রম পরিচালনা করে।
            </p>
          </section>
        </>
      ) : (
        <>
          <p>
            Ruhanir Engine (ruhanir.com) is dedicated to safeguarding visitor privacy and ensuring transparent handling of information. This Privacy Policy details our operational practices regarding data submitted through our corporate website.
          </p>

          <section id="collection" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">1. Information We Collect</h2>
            <p>
              We collect personal details submitted voluntarily via our contact form:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name</li>
              <li>Your phone number or email address</li>
              <li>Designated division (Ruhanir IT, Ruhanir Store, or Other)</li>
              <li>The content of your message</li>
            </ul>
          </section>

          <section id="storage-browser" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">2. Browser Storage &amp; Cookies</h2>
            <p>
              The site does not employ advertising, profiling, or third-party tracking cookies. The website stores only your functional language preference in the browser&apos;s local storage (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">localStorage</code>) to maintain language continuity across visits.
            </p>
          </section>

          <section id="purpose" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">3. Purpose of Processing</h2>
            <p>
              Submitted details are processed exclusively to review your communication, respond to business inquiries, and coordinate organizational correspondence.
            </p>
          </section>

          <section id="sharing" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">4. No Sale or Commercial Disclosure</h2>
            <p>
              We do not sell, lease, or distribute your personal details to external commercial entities. Only authorized personnel directly engaged in addressing your inquiry have access to submitted records.
            </p>
          </section>

          <section id="rights" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">5. Your Rights (Access, Correction, Deletion)</h2>
            <p>
              You may exercise your rights to request access to, correction of, or deletion of your submitted personal details at any time by contacting us directly at <a href="mailto:info@ruhanir.com" className="text-[#0E52C3] underline font-medium">info@ruhanir.com</a>.
            </p>
          </section>

          <section id="retention" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">6. Data Retention</h2>
            <p>
              Inquiry records are retained only as long as reasonably required to address the matter and maintain verifiable administrative archives.
            </p>
          </section>

          <section id="children" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">7. Children&apos;s Privacy</h2>
            <p>
              Our website is not designed for children under 13, and we do not knowingly solicit or collect identifiable information from minors.
            </p>
          </section>

          <section id="legal-framework" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">8. Governing Legal Framework</h2>
            <p>
              Ruhanir Engine operates its institutional activities in accordance with applicable Bangladesh data protection law.
            </p>
          </section>
        </>
      )}
    </LegalLayout>
  );
}
