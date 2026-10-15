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
    id: 'data-providers',
    title: 'Data providers',
    caption: 'Market & financial data',
    description:
      'Organisations that supply share price, financial, analyst, or ownership data that can be delivered through Euroland IR platforms for listed companies.',
    image: '/assets/products/share-graph-card.jpg',
    imageAlt: 'Financial market data visualisation on a laptop',
  },
  {
    id: 'distribution',
    title: 'Distribution networks',
    caption: 'Reach & distribution',
    description:
      'Networks that help distribute investor information and extend the reach of IR communications across markets and audiences.',
    image: '/assets/products/ai-card.jpg',
    imageAlt: 'Abstract digital network visualisation',
  },
  {
    id: 'technology',
    title: 'Technology vendors',
    caption: 'Platform & integration',
    description:
      'Technology partners whose products and services complement Euroland IR solutions for investor relations websites, tools, and digital engagement.',
    image: '/assets/products/iat-card.jpg',
    imageAlt: 'Analytics dashboard with charts and graphs',
  },
  {
    id: 'exchanges',
    title: 'Stock exchanges',
    caption: 'Capital markets',
    description:
      'Exchanges and market infrastructure partners supporting listed companies with data and IR communication across global capital markets.',
    image: '/assets/products/esg-card.jpg',
    imageAlt: 'Corporate reporting and market overview interface',
  },
] as const

export const PARTNER_COLLABORATIONS = [
  {
    id: 'data-layer',
    title: 'Data & market information',
    description:
      'Euroland IR sources share price data, key financials, analyst consensus, and ownership analytics from exchanges and regulatory feeds for use across IR platforms, apps, and investor alerts.',
  },
  {
    id: 'ir-websites',
    title: 'IR websites & disclosure',
    description:
      'Partner alongside solutions that help listed companies meet disclosure expectations across 60+ stock exchanges with responsive, accessible investor relations websites.',
  },
  {
    id: 'digital-ir',
    title: 'Digital IR tools',
    description:
      'Collaborate around Share Graph, Interactive Analysis Tool, and AI-powered investor relations capabilities that help IR teams communicate company information clearly.',
  },
] as const

export const PARTNER_PROCESS = [
  {
    step: '01',
    title: 'Share your enquiry',
    description:
      'Tell us about your organisation, the partner category you represent, and how you would like to collaborate. Use the form below or email partners@euroland.com.',
  },
  {
    step: '02',
    title: 'Talk with our team',
    description:
      'A member of the Euroland IR partnership team will review your enquiry and follow up to learn more about the opportunity.',
  },
  {
    step: '03',
    title: 'Explore the fit',
    description:
      'Together we discuss whether there is a practical collaboration path that supports listed companies and strengthens integrated IR delivery.',
  },
] as const

export const PARTNER_CREDIBILITY = [
  {
    id: 'clients',
    value: '1,400+',
    label: 'Clients',
    detail:
      'Trusted by listed companies worldwide to deliver data-driven storytelling that builds confidence and strengthens investor communication.',
  },
  {
    id: 'support',
    value: '24/7',
    label: 'Support & services',
    detail:
      'Every client is supported by a dedicated Account Manager and a 24/7 global service team for continuity and reliable performance.',
  },
  {
    id: 'security',
    value: 'Bank-grade',
    label: 'Cybersecurity',
    detail:
      'Platforms are built around robust, bank-grade security standards designed to protect data integrity, privacy, and operational resilience.',
  },
  {
    id: 'exchanges',
    value: '60+',
    label: 'Stock exchanges',
    detail:
      'IR website solutions designed to support disclosure requirements across 60+ stock exchanges and the expectations of institutional investors.',
  },
] as const

export const PARTNER_OFFICES =
  'London · Dubai · Tokyo · Shanghai · Hong Kong · Chennai' as const

export const PARTNER_FAQS: FaqItem[] = [
  {
    id: 'who',
    question: 'Who can become a partner with Euroland IR?',
    answer:
      'Euroland IR works with leading data providers, distribution networks, technology vendors, and stock exchanges to deliver integrated IR solutions for listed companies worldwide. If your organisation fits one of these categories, we welcome your enquiry.',
  },
  {
    id: 'how',
    question: 'How do I start a partnership conversation?',
    answer:
      'Submit the partnership enquiry form on this page, or email partners@euroland.com. The partnership team will review your message and follow up.',
  },
  {
    id: 'what',
    question: 'What does Euroland IR provide to listed companies?',
    answer:
      'Euroland IR provides tools and services that help listed companies communicate with investors, analyse market information, and deliver relevant company information efficiently — including Share Graph, Interactive Analysis Tool, and AI-powered IR capabilities.',
  },
  {
    id: 'where',
    question: 'Where does Euroland IR operate?',
    answer:
      'Euroland IR has offices in London, Dubai, Tokyo, Shanghai, Hong Kong, and Chennai, and supports listed companies across Asia, Europe, and the Middle East.',
  },
  {
    id: 'security',
    question: 'How does Euroland IR approach security?',
    answer:
      'Security is a key part of Euroland IR platforms and services. Robust security measures are applied across hosting, access, and operations to help protect data and privacy, with bank-grade security standards designed for data integrity and operational resilience.',
  },
]

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
