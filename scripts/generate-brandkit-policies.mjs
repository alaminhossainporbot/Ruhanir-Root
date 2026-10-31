import fs from 'fs';
import path from 'path';

const policies = [
  { name: 'privacy-policy', titleEn: 'Privacy Policy', titleBn: 'গোপনীয়তা নীতি' },
  { name: 'terms', titleEn: 'Terms and Conditions', titleBn: 'ব্যবহারের শর্তাবলী' },
  { name: 'cookie-policy', titleEn: 'Cookie and Browser Storage Policy', titleBn: 'কুকি ও ব্রাউজার স্টোরেজ নীতি' },
  { name: 'accessibility', titleEn: 'Accessibility Statement', titleBn: 'অ্যাক্সেসিবিলিটি বিবৃতি' },
  { name: 'security', titleEn: 'Security and Responsible Disclosure', titleBn: 'নিরাপত্তা ও দায়িত্বশীল প্রকাশ নীতি' },
  { name: 'complaints', titleEn: 'Complaints and Feedback', titleBn: 'অভিযোগ ও প্রতিক্রিয়া' },
  { name: 'terms-of-sale', titleEn: 'Terms of Sale', titleBn: 'বিক্রয়ের শর্তাবলী' },
  { name: 'returns-refunds', titleEn: 'Return, Refund and Cancellation Policy', titleBn: 'রিটার্ন, রিফান্ড ও অর্ডার বাতিলকরণ নীতি' },
  { name: 'delivery-shipping', titleEn: 'Delivery and Shipping Policy', titleBn: 'ডেলিভারি ও শিপিং নীতি' },
  { name: 'payment-policy', titleEn: 'Payment Policy', titleBn: 'পেমেন্ট নীতি' },
  { name: 'digital-terms', titleEn: 'Digital License and Software Terms', titleBn: 'ডিজিটাল লাইসেন্স ও সফটওয়্যার শর্তাবলী' },
  { name: 'warranty-policy', titleEn: 'Warranty Policy', titleBn: 'ওয়ারেন্টি নীতি' },
  { name: 'service-terms', titleEn: 'IT Service Terms', titleBn: 'আইটি সেবা শর্তাবলী' },
  { name: 'support-policy', titleEn: 'IT Support Policy', titleBn: 'আইটি সাপোর্ট ও মেইনটেন্যান্স নীতি' },
  { name: 'confidentiality', titleEn: 'Confidentiality and Data Handling', titleBn: 'গোপনীয়তা ও ডেটা ব্যবস্থাপনা' },
];

for (const p of policies) {
  const frontmatterEn = `---
title: "${p.titleEn}"
effectiveDate: "2026-10-29"
language: "en"
---

# ${p.titleEn}

*Effective Date: 29 October 2026*

This document outlines the official policy of Ruhanir Engine and its operational divisions (Ruhanir IT and Ruhanir Store).

The applicable terms and specifications are stated on the product or service page and in the order confirmation.
`;

  const frontmatterBn = `---
title: "${p.titleBn}"
effectiveDate: "2026-10-29"
language: "bn"
---

# ${p.titleBn}

*কার্যকরের তারিখ: ২৯ অক্টোবর ২০২৬*

এই নীতিমালাটি রুহানীর ইঞ্জিন এবং এর পরিচালনাকারী বিভাগসমূহের (রুহানীর আইটি ও রুহানীর স্টোর) আনুষ্ঠানিক নীতি হিসেবে প্রযোজ্য।

সুনির্দিষ্ট নিয়ম ও বিবরণ সংশ্লিষ্ট পণ্য বা সেবা পাতা এবং অর্ডার নিশ্চিতকরণে উল্লেখ থাকে।
`;

  fs.writeFileSync(path.join('brand-kit/legal-content/en', `${p.name}.md`), frontmatterEn);
  fs.writeFileSync(path.join('brand-kit/legal-content/bn', `${p.name}.md`), frontmatterBn);
}

console.log('Generated all markdown policies in brand-kit/legal-content/');
