import type { LeaderMember } from './types';

const leadershipMembersEn: LeaderMember[] = [
  {
    slug: 'ahporbot',
    name: 'AL Amin Hossain Porbot',
    role: 'Managing Director',
    imagePrefix: 'ahporbot',
    bio: 'AL Amin Hossain Porbot is the Founder and Managing Director of Ruhanir Engine. He steers the organization\u2019s executive operations, technology direction, and strategic growth across its two divisions: Ruhanir IT and Ruhanir Store. His focus is on building dependable digital infrastructure, robust enterprise systems, and fair commercial platforms in Bangladesh.',
    github: 'https://github.com/alaminhossainporbot',
    githubLabel: 'GitHub Profile',
    focusAreas: [
      {
        title: 'Institutional Governance',
        description: 'Overseeing organizational strategy, regulatory compliance, and operational integrity across Bangladesh.',
      },
      {
        title: 'Technology & Architecture',
        description: 'Directing engineering standards, system architecture, and technology roadmaps for enterprise deployments.',
      },
      {
        title: 'Division Alignment',
        description: 'Guiding long-term growth and commercial alignment between Ruhanir IT and Ruhanir Store.',
      },
    ],
  },
  {
    slug: 'shakib-hassan',
    name: 'Md Shakib Hassan',
    role: 'Chief Executive Officer (CEO)',
    imagePrefix: 'shakib-hassan',
    bio: 'Md Shakib Hassan is the Chief Executive Officer (CEO) of Ruhanir Engine. He leads organizational execution, executive management, and operational growth across Ruhanir IT and Ruhanir Store. Collaborating with institutional governance, he drives enterprise solutions delivery, business scaling, and service excellence across Bangladesh.',
    focusAreas: [
      {
        title: 'Executive Management & Growth',
        description: 'Directing company-wide operations, organizational performance, and growth initiatives across all operational units.',
      },
      {
        title: 'Enterprise Delivery',
        description: 'Supervising high-standard technical delivery, client satisfaction, and operational rigor for corporate partners.',
      },
      {
        title: 'Operational Scalability',
        description: 'Scaling internal workflows, cross-functional collaboration, and strategic execution throughout Bangladesh.',
      },
    ],
  },
  {
    slug: 'rabiul-kholifa',
    name: 'Rabiul Islam Kholifa',
    role: 'Sales and Compliance Officer',
    imagePrefix: 'rabiul-kholifa',
    bio: 'Rabiul Islam Kholifa serves as the Sales and Compliance Officer at Ruhanir Engine. He oversees commercial sales strategy, business communications, and regulatory compliance for both IT services and digital retail. He ensures that all commercial engagements, customer contracts, and enterprise sales adhere to Bangladesh\u2019s legal standards and fair trade practices.',
    focusAreas: [
      {
        title: 'Commercial Sales',
        description: 'Managing corporate sales pipelines, contract executions, and structured commercial offerings for IT and retail divisions.',
      },
      {
        title: 'Regulatory Compliance',
        description: 'Ensuring full adherence to trade licensing regulations, consumer protection policies, and statutory trade frameworks in Bangladesh.',
      },
      {
        title: 'Fair Trade & Transparency',
        description: 'Safeguarding commercial transparency, pricing ethics, and institutional trust in every business transaction.',
      },
    ],
  },
];

export const en = {
  meta: {
    siteName: 'Ruhanir Engine',
    siteDescription:
      "A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce.",
    siteUrl: 'https://ruhanir.com',
  },

  nav: {
    about: 'About',
    businesses: 'Businesses',
    news: 'News',
    contact: 'Contact',
    store: 'Store',
    itServices: 'IT Services',
  },

  home: {
    heading: 'Ruhanir Engine',
    subline:
      "A technology-driven organization working on Bangladesh's digital infrastructure and modern commerce.",
    buttons: {
      divisions: 'Our divisions',
      contact: 'Contact',
    },
    atAGlance: {
      divisionsLabel: 'Divisions',
      divisionsValue: 'Ruhanir IT and Ruhanir Store',
      coverageLabel: 'Coverage',
      coverageValue: 'All of Bangladesh',
      registrationLabel: 'Registration',
      registrationValue: 'Trade License No. 3401322207',
    },
    divisionsSection: {
      heading: 'Our Divisions',
      subheading: 'Two specialized operating divisions delivering institutional infrastructure and modern digital commerce.',
      it: {
        ordinal: '01',
        name: 'Ruhanir IT',
        sentence: 'Custom software architecture and enterprise solutions for organizations.',
        offerings: [
          'ERP',
          'SaaS',
          'Customized applications',
          'Network setup',
        ],
        link: 'https://it.ruhanir.com',
        linkText: 'Visit Ruhanir IT',
      },
      store: {
        ordinal: '02',
        name: 'Ruhanir Store',
        sentence: 'An online store for digital licenses and premium physical products.',
        offerings: [
          'Digital licenses',
          'Premium physical products',
        ],
        link: 'https://store.ruhanir.com',
        linkText: 'Visit Ruhanir Store',
      },
    },
    aboutSummary: {
      heading: 'About the Organization',
      paragraph:
        'Ruhanir Engine is a technology-driven parent organization working on Bangladesh\u2019s digital infrastructure and modern commerce. We deliver institutional and commercial services through two divisions, Ruhanir IT and Ruhanir Store.',
      principles: [
        {
          term: 'Engineering precision',
          detail: 'We design and build with care and keep systems simple.',
        },
        {
          term: 'Current technology',
          detail: 'We use up-to-date tools and practices.',
        },
        {
          term: 'Transparency',
          detail: 'We are clear about what we offer, how we work and what it costs.',
        },
        {
          term: 'Compliance',
          detail: "We operate within Bangladesh's legal and regulatory framework.",
        },
      ],
      buttonText: 'Read more about us',
    },
    contactBand: {
      headline: 'Talk to us about software, networks or products.',
      supporting: 'Write to info@ruhanir.com or use the contact form.',
      buttonText: 'Contact us',
    },
  },

  about: {
    heading: 'About',
    description:
      'Ruhanir Engine is a technology-driven parent organization working on Bangladesh\u2019s digital infrastructure and modern commerce. We deliver institutional and commercial services through two divisions, Ruhanir IT and Ruhanir Store.',
    principlesHeading: 'Our principles',
    principles: [
      {
        title: 'Engineering precision',
        description:
          'We design and build with care and keep systems simple.',
      },
      {
        title: 'Current technology',
        description: 'We use up-to-date tools and practices.',
      },
      {
        title: 'Transparency',
        description:
          'We are clear about what we offer, how we work and what it costs.',
      },
      {
        title: 'Compliance',
        description:
          "We operate within Bangladesh's legal and regulatory framework.",
      },
    ],
    leadershipSection: {
      heading: 'Leadership & Governance',
      description:
        'The executive direction guiding Ruhanir Engine\u2019s technology standards, commercial platforms, and institutional development across Bangladesh.',
      buttonText: 'View Leadership Profile',
    },
  },

  leadership: {
    heading: 'Leadership',
    subline: 'Executive direction and governance for Ruhanir Engine.',
    backToList: 'Back to Leadership',
    aboutLink: 'About Ruhanir Engine',
    viewProfile: 'View executive profile',
    profileHeading: 'Executive Profile',
    focusAreasHeading: 'Key Focus Areas',
    members: leadershipMembersEn,
    member: leadershipMembersEn[0],
  },

  businesses: {
    heading: 'Our Businesses',
    it: {
      name: 'Ruhanir IT',
      description:
        'Custom software architecture and enterprise solutions for organizations: ERP, SaaS, customized applications and network setup.',
      servicesHeading: 'Services',
      services: [
        'ERP',
        'SaaS',
        'Customized applications',
        'Network setup',
      ],
      linkText: 'Visit Ruhanir IT',
      link: 'https://it.ruhanir.com',
    },
    store: {
      name: 'Ruhanir Store',
      description: 'An online store for digital licenses and premium physical products.',
      linkText: 'Visit Ruhanir Store',
      link: 'https://store.ruhanir.com',
    },
  },

  news: {
    heading: 'News',
    subline: 'Official announcements and updates from Ruhanir Engine.',
    readMore: 'Read announcement',
    backToList: 'Back to all news',
    noNews: 'No news published yet.',
  },

  contact: {
    heading: 'Contact',
    statement:
      'Ruhanir Engine operates online and serves customers across Bangladesh.',
    channels: {
      generalEmail: 'info@ruhanir.com',
      generalLabel: 'General inquiries',
      supportEmail: 'support@ruhanir.com',
      supportLabel: 'Support',
      phone: '+880 1570225573',
      phoneLabel: 'Phone',
    },
    form: {
      heading: 'Send us a message',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      contactLabel: 'Phone or email',
      contactPlaceholder: 'Your phone number or email address',
      divisionLabel: 'Division',
      divisionOptions: ['IT', 'Store', 'Other'],
      divisionPlaceholder: 'Select a division',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message',
      submitLabel: 'Send message',
      privacy:
        'Your information will only be used to respond to your inquiry.',
      successMessage:
        'Your message has been sent. We will get back to you.',
      errorMessage:
        'Something went wrong. Please try again or email us directly.',
      fallbackNote:
        'Your email client will open with a pre-filled message.',
    },
  },

  footer: {
    description:
      "A technology-driven parent organization working on Bangladesh's digital infrastructure and modern commerce. Operates online and serves customers across Bangladesh.",
    tradeLicense: 'Trade License No: 3401322207',
    copyright: '© {year} Ruhanir Engine. All rights reserved.',
    columns: {
      divisions: 'Divisions',
      company: 'Company',
      contact: 'Contact',
      legal: 'Legal',
    },
    itLink: 'Ruhanir IT',
    storeLink: 'Ruhanir Store',
    legalLinks: {
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      cookies: 'Cookie and Storage',
      allPolicies: 'All policies',
    },
  },

  notFound: {
    heading: 'Page not found',
    description: 'The page you are looking for does not exist.',
    homeLink: 'Go to homepage',
  },
};
