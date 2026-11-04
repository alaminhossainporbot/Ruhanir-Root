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
  return getCommonMetadata(lang as Lang, 'terms');
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  const toc = isBn
    ? [
        { id: 'acceptance', title: '১. শর্তাবলীর গ্রহণযোগ্যতা' },
        { id: 'intellectual-property', title: '২. মেধা সম্পদ' },
        { id: 'accuracy', title: '৩. তথ্যের নির্ভুলতা ও দাবিত্যাগ' },
        { id: 'subdomains', title: '৪. সাবডোমেন ও বহিঃসংযোগ' },
        { id: 'liability', title: '৫. দায়বদ্ধতার সীমাবদ্ধতা' },
        { id: 'governing-law', title: '৬. প্রযোজ্য আইন' },
      ]
    : [
        { id: 'acceptance', title: '1. Acceptance of Terms' },
        { id: 'intellectual-property', title: '2. Intellectual Property' },
        { id: 'accuracy', title: '3. Accuracy and Disclaimer' },
        { id: 'subdomains', title: '4. Subdomains and External Links' },
        { id: 'liability', title: '5. Limitation of Liability' },
        { id: 'governing-law', title: '6. Governing Law' },
      ];

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms and Conditions'}
      lastUpdated="2026-10-29"
      slug="terms"
      toc={toc}
    >
      {isBn ? (
        <>
          <section id="acceptance" className="space-y-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">১. শর্তাবলীর গ্রহণযোগ্যতা</h2>
            <p>
              রুহানীর ইঞ্জিনের ওয়েবসাইট (ruhanir.com) ব্রাউজ করার মাধ্যমে আপনি এই শর্তাবলী মেনে নিচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে অনুগ্রহ করে ওয়েবসাইটটি ব্যবহার থেকে বিরত থাকুন।
            </p>
          </section>

          <section id="intellectual-property" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">২. মেধা সম্পদ</h2>
            <p>
              এই ওয়েবসাইটের নাম, রুহানীর ইঞ্জিন লোগো, ব্র্যান্ডিং, ডিজাইন টোকেন এবং প্রকাশিত সকল টেক্সট রুহানীর ইঞ্জিনের নিজস্ব মেধা সম্পদ। প্রতিষ্ঠানের লিখিত পূর্বানুমতি ব্যতিরেকে এগুলো পুনরুৎপাদন বা ব্যবহার করা নিষিদ্ধ।
            </p>
          </section>

          <section id="accuracy" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৩. তথ্যের নির্ভুলতা ও দাবিত্যাগ</h2>
            <p>
              ওয়েবসাইটের তথ্যসমূহ সাধারণ পরিচিতি ও প্রাতিষ্ঠানিক সমন্বয়ের উদ্দেশ্যে প্রদান করা হয়েছে। আমরা তথ্য হালনাগাদ রাখার সর্বোচ্চ চেষ্টা করি, তবে কোনো প্রকার প্রকাশ্য বা পরোক্ষ নিশ্চয়তা প্রদান করা হয় না।
            </p>
          </section>

          <section id="subdomains" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৪. সাবডোমেন ও বহিঃসংযোগ</h2>
            <p>
              এই ওয়েবসাইটে আমাদের দুটি সহযোগী প্রতিষ্ঠান রুহানীর আইটি (it.ruhanir.com) ও রুহানীর স্টোর (store.ruhanir.com)-এর সংযোগ রয়েছে। প্রতিটি সাবডোমেনের নির্দিষ্ট নীতিমালা ও শর্তাবলী প্রযোজ্য হতে পারে।
            </p>
          </section>

          <section id="liability" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৫. দায়বদ্ধতার সীমাবদ্ধতা</h2>
            <p>
              আইন দ্বারা অনুমোদিত সর্বোচ্চ সীমা পর্যন্ত, এই ওয়েবসাইটের ব্যবহার বা ব্যবহারে অক্ষমতার কারণে সৃষ্ট কোনো প্রত্যক্ষ বা পরোক্ষ ক্ষতির জন্য রুহানীর ইঞ্জিন দায়ী থাকবে না।
            </p>
          </section>

          <section id="governing-law" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">৬. প্রযোজ্য আইন</h2>
            <p>
              এই ব্যবহারের শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুসারে পরিচালিত ও ব্যাখ্যায়িত হবে।
            </p>
          </section>
        </>
      ) : (
        <>
          <section id="acceptance" className="space-y-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ruhanir.com, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue using the website.
            </p>
          </section>

          <section id="intellectual-property" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">2. Intellectual Property</h2>
            <p>
              The name Ruhanir Engine, the segmented R logo mark, typography, design tokens, and written materials displayed on this site are the intellectual property of Ruhanir Engine. Unauthorized copying or redistribution is prohibited.
            </p>
          </section>

          <section id="accuracy" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">3. Accuracy and Disclaimer</h2>
            <p>
              Information on this website is provided for general institutional and informational purposes. While we strive to maintain accurate information, we make no representations or warranties of any kind regarding completeness or reliability.
            </p>
          </section>

          <section id="subdomains" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">4. Subdomains and External Links</h2>
            <p>
              This site provides links to our operating divisions: Ruhanir IT (it.ruhanir.com) and Ruhanir Store (store.ruhanir.com). Each subdomain may be governed by its own independent service terms and policies.
            </p>
          </section>

          <section id="liability" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Ruhanir Engine shall not be liable for any damages arising out of the use or inability to use this website.
            </p>
          </section>

          <section id="governing-law" className="space-y-2 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">6. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of Bangladesh.
            </p>
          </section>
        </>
      )}
    </LegalLayout>
  );
}
