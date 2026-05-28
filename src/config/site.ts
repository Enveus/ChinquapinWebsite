/**
 * Single source of truth for organization-wide facts.
 *
 * NEVER hardcode any of these values in pages or components. If you need the
 * mission statement in a hero, the phone number in a footer, or the donate
 * URL on a button, import it from here.
 *
 * Owner-controlled facts (EIN, address, contact, donation URL) marked TODO
 * must be supplied by the foundation before launch — never invent placeholders.
 */

export const site = {
  /** Display name shown in chrome and copy. */
  name: 'Chinquapin Ridge Philanthropic',

  /**
   * Exact legal registration name for IRS / Schema.org disclosure.
   * TODO(owner): confirm this matches the 501(c)(3) determination letter.
   */
  legalName: 'Chinquapin Ridge Philanthropic',

  /** Canonical domain. Update astro.config.mjs `site` to match. */
  url: 'https://chinquapin.foundation',

  /** Used verbatim wherever the mission is quoted. */
  mission:
    'Rooted in faith, our mission is to serve women, children, and veterans by offering hope, resources, and opportunities that strengthen families and reflect God’s purpose.',

  /** Short tagline for hero / OG description. */
  tagline: 'Hope, resources, and opportunity for women, children, and veterans.',

  /** Populations served — keep in sync with mission. */
  servesAudiences: ['women', 'children', 'veterans'] as const,

  /**
   * IRS Employer Identification Number.
   * TODO(owner): provide EIN. Required for footer disclosure and JSON-LD.
   */
  ein: null as string | null,

  /**
   * Mailing/physical address used in footer, contact page, and JSON-LD.
   * TODO(owner): provide address. Most donation processors require it.
   */
  address: null as {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  } | null,

  /**
   * Public contact channels. Only render in UI when a value is present.
   * TODO(owner): confirm which contact channels should be public.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  /**
   * Hosted donation platform. We never collect card data ourselves.
   * TODO(owner): create the donation platform account (Every.org recommended
   * for fee-free 501(c)(3) processing) and provide the public donate URL.
   */
  donate: {
    provider: 'every.org' as const,
    url: null as string | null,
  },

  /**
   * Board of directors. Names only until titles/bios are supplied.
   * TODO(owner): confirm titles, provide bios + headshots.
   */
  board: [
    { name: 'Eric Estes', title: null as string | null },
    { name: 'Conni Estes', title: null as string | null },
    { name: 'Audriana Estes', title: null as string | null },
  ],

  /**
   * Public social media presence. TODO(owner): confirm any active accounts.
   * Empty array hides the social row in the footer.
   */
  social: [] as Array<{
    platform: 'facebook' | 'instagram' | 'youtube' | 'linkedin';
    handle: string;
    url: string;
  }>,
} as const;

export type SiteConfig = typeof site;
