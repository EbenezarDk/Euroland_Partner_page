import type { FaqItem } from './faqs'

/**
 * Partner page copy is limited to statements already published by Euroland IR
 * (site About, Partners overview, Contact, Platform). No invented benefits,
 * stats, certifications, or commercial commitments.
 */

export const PARTNER_META = {
  title: 'Become a Partner | Euroland IR',
  description:
    'Partner with Euroland IR — collaborate as a data provider, distribution network, technology vendor, or stock exchange to deliver integrated investor relations solutions for listed companies worldwide.',
  path: '/',
  contactEmail: 'partners@euroland.com',
} as const

export const PARTNER_HERO = {
  eyebrow: 'Partnerships',
  title: 'Become a Partner',
  subtitle:
    'Let’s team up to build the future of IR. Euroland IR works with leading data providers, distribution networks, technology vendors, and stock exchanges to deliver a complete, integrated IR solution for listed companies worldwide.',
  primaryCta: { label: 'Start a conversation', href: '#partner-enquiry' },
  secondaryCta: { label: 'Explore partner types', href: '#partner-categories' },
} as const

export const PARTNER_VALUES = [
  {
    id: 'integrated',
    title: 'Integrated IR delivery',
    description:
      'Collaborate on solutions that help listed companies present financial and corporate information clearly and engage investors more effectively.',
    icon: 'integrated',
  },
  {
    id: 'global',
    title: 'Global market reach',
    description:
      'Connect with a network that supports listed companies across Asia, Europe, and the Middle East, with offices in London, Dubai, Tokyo, Shanghai, Hong Kong, and Chennai.',
    icon: 'global',
  },
  {
    id: 'long-term',
    title: 'Long-term collaboration',
    description:
      'Euroland IR works in long-term partnership with listed companies and industry partners, with a focus on reliability, clarity, service, and continuous improvement.',
    icon: 'long-term',
  },
  {
    id: 'technology',
    title: 'IR technology & data',
    description:
      'Combine best-practice investor relations solutions with innovative financial technology — from share performance tools to AI-powered IR capabilities.',
    icon: 'technology',
  },
] as const

export const PARTNER_CATEGORIES = [
  {
    id: 'expand-offering',
    title: 'Expand Your Offering',
    description:
      'Add innovative Investor Relations solutions, such as an IR website solution for listed companies, to your existing services.',
  },
  {
    id: 'revenue',
    title: 'Create New Revenue Opportunities',
    description:
      'Grow through flexible partnership models, as a referral partner, IR software reseller or IR software channel partner.',
  },
  {
    id: 'client-value',
    title: 'Deliver More Client Value',
    description:
      'Help your clients strengthen investor communication and engagement with a professional investor relations website and IR tools.',
  },
  {
    id: 'grow-confidence',
    title: 'Grow with Confidence',
    description:
      'Benefit from our technology, training, marketing resources and dedicated support as an investor relations SaaS partner.',
  },
] as const

export const PARTNER_COLLABORATIONS = [
  {
    id: 'years',
    value: '40+',
    label: 'Years of Investor Relations expertise',
  },
  {
    id: 'clients',
    value: '1,400+',
    label: 'Clients worldwide',
  },
  {
    id: 'countries',
    value: '11',
    label: 'Countries with a local presence',
  },
  {
    id: 'technology',
    value: 'Award-winning',
    label: 'IR technology and investor relations software',
  },
  {
    id: 'employees',
    value: '200+',
    label: 'Employees with global IR expertise',
  },
  {
    id: 'support',
    value: '24/7',
    label: 'Global service and support',
  },
] as const

export const PARTNER_PROCESS = [
  {
    step: '01',
    title: 'Referral Model',
    description:
      'Identify and introduce a qualified opportunity. Receive an agreed referral fee or commission for eligible business.',
  },
  {
    step: '02',
    title: 'Reseller Model',
    description:
      'Through our investor relations reseller program, purchase/resell Euroland solutions under agreed partner commercial terms and retain the applicable reseller margin.',
  },
  {
    step: '03',
    title: 'Strategic Partnership Model',
    description:
      'Individually negotiated commercial terms based on scope, volumes, market opportunity, customer access and joint business plan.',
  },
] as const

export const PARTNER_OFFICES =
  'London · Dubai · Tokyo · Shanghai · Hong Kong · Chennai' as const

export const PARTNER_FAQS: FaqItem[] = [
  {
    id: 'reseller',
    question: 'What is an investor relations software reseller?',
    answer:
      'An IR software reseller buys investor relations software, such as IR websites and IR tools, and resells it to listed companies under agreed commercial terms, keeping a reseller margin.',
  },
  {
    id: 'program',
    question: 'How does an IR partner program work?',
    answer:
      'Partners join through a referral, reseller or strategic partnership model. Each model comes with its own commercial terms, and partners get support from Euroland IR.',
  },
  {
    id: 'listed-companies',
    question: 'What do listed companies need from an investor relations platform?',
    answer:
      'They need a reliable investor relations website, tools for communicating with investors, and a provider with proven IR expertise and round-the-clock support.',
  },
  {
    id: 'agencies',
    question: 'How can agencies add IR software to their services?',
    answer:
      'Financial communications agencies and IR consultancies can partner with Euroland IR to offer investor relations software alongside their existing services. They can either refer clients or resell the solutions.',
  },
  {
    id: 'reseller-vs-referral',
    question: 'What is the difference between a reseller and a referral partner?',
    answer:
      'A referral partner introduces qualified opportunities and earns a referral fee or commission. A reseller buys and resells the solutions under agreed terms and keeps the reseller margin.',
  },
]

export const PARTNER_GROW = {
  title: "Let's Grow Together",
  description:
    'At Euroland IR, we believe successful partnerships are built on shared expertise, trust and long-term growth. Join our international partner network, whether as part of our financial communications agency partner program, our IR consultancy partner programme or our reseller program for investor relations tools, and discover how we can create new opportunities together.',
  image: '/assets/Professionals_shaking_hands_2K_20261016154222.jpg',
  imageAlt: 'Business partners shaking hands',
  primaryCta: { label: 'Become a Partner', href: '#partner-enquiry' },
  secondaryCta: { label: 'Contact Our Team', href: 'mailto:partners@euroland.com' },
} as const

export const PARTNER_FINAL_CTA = {
  title: 'Ready to partner with Euroland IR?',
  description:
    'Let’s team up to build the future of IR. Reach the partnership team at partners@euroland.com or send an enquiry below.',
  primaryCta: { label: 'Send an enquiry', href: '#partner-enquiry' },
  secondaryCta: { label: 'Email partners@euroland.com', href: 'mailto:partners@euroland.com' },
} as const

export const PARTNER_TYPE_OPTIONS = [
  { id: 'data-providers', label: 'Data provider' },
  { id: 'distribution', label: 'Distribution network' },
  { id: 'technology', label: 'Technology vendor' },
  { id: 'exchanges', label: 'Stock exchange' },
  { id: 'other', label: 'Other / not sure yet' },
] as const
