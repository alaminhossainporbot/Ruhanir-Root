/**
 * Ruhanir Organization - Single Source of Truth
 * Shared configuration across root, IT, and store sites.
 */

export const company = {
  name: {
    en: 'Ruhanir Engine',
    bn: 'রুহানীর ইঞ্জিন',
  },
  legalName: {
    en: 'Ruhanir Engine',
    bn: 'রুহানীর ইঞ্জিন',
  },
  tagline: {
    en: "A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce.",
    bn: 'বাংলাদেশের ডিজিটাল অবকাঠামো ও আধুনিক বাণিজ্যের জন্য কাজ করা একটি প্রযুক্তিভিত্তিক প্রতিষ্ঠান।',
  },
  // Brand tagline (optional) - used across footer brand blocks, email templates, and invoice footers
  taglineEn: 'Fair for you. Fair for us.',
  taglineBn: 'আপনার জন্য ন্যায্য, আমাদের জন্যও।',
  operatingModel: {
    en: 'Ruhanir Engine operates online and serves customers across Bangladesh.',
    bn: 'রুহানীর ইঞ্জিন অনলাইনে পরিচালিত এবং সারা বাংলাদেশে সেবা প্রদান করে।',
  },
  tradeLicense: {
    numberEn: '3401322207',
    numberBn: '৩৪০১৩২২২০৭',
    labelEn: 'Trade License No: 3401322207',
    labelBn: 'ট্রেড লাইসেন্স নং: ৩৪০১৩২২২০৭',
  },
  contact: {
    generalEmail: 'info@ruhanir.com',
    supportEmail: 'support@ruhanir.com',
    phone: '+880 1570225573',
    phoneTel: '+8801570225573',
  },
  sites: {
    root: {
      name: { en: 'Ruhanir Engine', bn: 'রুহানীর ইঞ্জিন' },
      url: 'https://ruhanir.com',
      subdomain: '',
    },
    it: {
      name: { en: 'Ruhanir IT', bn: 'রুহানীর আইটি' },
      url: 'https://it.ruhanir.com',
      subdomain: 'it',
    },
    store: {
      name: { en: 'Ruhanir Store', bn: 'রুহানীর স্টোর' },
      url: 'https://store.ruhanir.com',
      subdomain: 'store',
    },
  },
} as const;

export type CompanyConfig = typeof company;
