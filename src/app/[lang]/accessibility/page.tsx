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
    ...getCommonMetadata(lang as Lang, 'accessibility'),
    title: lang === 'bn' ? 'অ্যাক্সেসিবিলিটি বিবৃতি' : 'Accessibility Statement',
  };
}

export default async function AccessibilityPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isBn = lang === 'bn';

  return (
    <LegalLayout
      lang={lang as Lang}
      title={isBn ? 'অ্যাক্সেসিবিলিটি বিবৃতি' : 'Accessibility Statement'}
      lastUpdated="2026-10-29"
    >
      {isBn ? (
        <div className="space-y-6">
          <p>
            রুহানীর ইঞ্জিন (ruhanir.com) এর সকল ভিজিটর ও ব্যবহারকারীদের জন্য একটি অন্তর্ভুক্তিমূলক এবং সহজগম্য ডিজিটাল পরিবেশ নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">আমাদের প্রযুক্তিগত মানদণ্ড</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>ক্লিয়ার কনট্রাস্ট (AA Standard):</strong> টেক্সট ও ব্যাকগ্রাউন্ডের মধ্যে পর্যাপ্ত দৃশ্যমান বৈসাদৃশ্য রক্ষা করা হয়েছে।</li>
              <li><strong>কীবোর্ড নেভিগেশন:</strong> মাউস ব্যবহার না করেও সম্পূর্ণ ওয়েবসাইট এবং ফর্ম সহজে ব্রাউজ করা যায়।</li>
              <li><strong>সেমান্টিক এইচটিএমএল:</strong> স্ক্রিন রিডার ব্যবহারকারীদের সুবিধার্থে মানসম্মত স্ট্রাকচার নিশ্চিত করা হয়েছে।</li>
              <li><strong>বাংলা টাইপোগ্রাফি:</strong> বাংলা হরফ ও যুক্তাক্ষরের সঠিক রেন্ডারিং নিশ্চিত করা হয়েছে।</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">প্রতিক্রিয়া</h2>
            <p>
              ওয়েবসাইটটি ব্যবহারে কোনো অসুবিধার সম্মুখীন হলে অনুগ্রহ করে আমাদের জানান: <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a>।
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <p>
            Ruhanir Engine (ruhanir.com) is committed to digital accessibility and providing an inclusive experience for all individuals, including people with disabilities.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Accessibility Standards</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contrast Compliance:</strong> Visual elements and text meet WCAG 2.1 AA contrast requirements.</li>
              <li><strong>Keyboard Navigation:</strong> All links, controls, and form fields are fully operable via keyboard with clear focus states.</li>
              <li><strong>Semantic HTML:</strong> Content follows structured semantic hierarchies for assistive technologies.</li>
              <li><strong>Typography &amp; Readability:</strong> Optimized line-heights and self-hosted fonts prevent glyph distortion or truncation.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0B1B3A]">Feedback</h2>
            <p>
              If you encounter accessibility barriers on this website, please reach out to us at <a href="mailto:support@ruhanir.com" className="text-[#0E52C3] underline font-medium">support@ruhanir.com</a>.
            </p>
          </section>
        </div>
      )}
    </LegalLayout>
  );
}
