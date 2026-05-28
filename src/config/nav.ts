/**
 * Primary navigation. One entry per top-level page. Order matters.
 *
 * Pages referenced here must exist under src/pages. Keep labels short
 * (one or two words) so the header stays readable at narrow widths.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: readonly NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'What we do', href: '/programs' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const;
