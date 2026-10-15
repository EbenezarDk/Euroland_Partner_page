export const NAV_ITEMS = [
  { label: 'Overview', to: '/', hash: 'partner-hero', match: 'partner-hero' },
  {
    label: 'Partner types',
    to: '/',
    hash: 'partner-categories',
    match: 'partner-categories',
  },
  {
    label: 'How it works',
    to: '/',
    hash: 'partner-process',
    match: 'partner-process',
  },
  {
    label: 'Contact',
    to: '/',
    hash: 'partner-enquiry',
    match: 'partner-enquiry',
  },
  { label: 'FAQs', to: '/', hash: 'faqs', match: 'faqs' },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
