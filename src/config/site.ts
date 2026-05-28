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

  /**
   * Path (relative to site.url) to the logo image used in Schema.org JSON-LD.
   * Google's guidance: PNG/JPG, square-ish, at least 112x112. Our raster export
   * at /logo.png satisfies that. If you ever rename the file, update this.
   */
  logoPath: '/logo.png',

  /** Used verbatim wherever the mission is quoted. */
  mission:
    'Rooted in faith, our mission is to serve women, children, and veterans in East Texas by offering hope, resources, and opportunities that strengthen families and reflect God’s purpose.',

  /** Short tagline for hero / OG description. */
  tagline: 'Hope, resources, and opportunity for women, children, and veterans across East Texas.',

  /** Populations served — keep in sync with mission. */
  servesAudiences: ['women', 'children', 'veterans'] as const,

  /**
   * IRS Employer Identification Number (federal tax ID).
   * Distinct from the Texas Comptroller taxpayer number — donors need
   * the federal EIN, not the state number, to substantiate deductions.
   */
  ein: '41-4375241' as string | null,

  /**
   * Whether the IRS has issued the 501(c)(3) determination letter
   * (Letter 947). The EIN above is just the federal identifier; this
   * flag controls whether the site claims federal tax-exempt status.
   * TODO(owner): flip to true once Letter 947 is received.
   */
  taxExempt501c3: false as boolean,

  /**
   * Mailing/physical address used in footer, contact page, and JSON-LD.
   * Matches the principal office on the Texas Certificate of Formation
   * (filed 2026-02-12) and the address on the Texas Comptroller's
   * Franchise Tax notice (2026-02-27).
   */
  address: {
    street: '6004 South First Street',
    city: 'Lufkin',
    region: 'TX',
    postalCode: '75901-8558',
    country: 'US',
  } as {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  } | null,

  /**
   * Public contact channels. Only render in UI when a value is present.
   */
  contact: {
    email: 'help@chinquapin.foundation' as string | null,
    phone: '936-671-4534' as string | null,
  },

  /**
   * Contact-form delivery. We use Web3Forms (free, no account) — the access
   * key is a public client-side token (safe to commit) that authorizes posts
   * to the foundation's email. Rotate by requesting a new key at web3forms.com.
   */
  contactForm: {
    provider: 'web3forms' as const,
    accessKey: 'c81af3e8-da85-4e51-9527-456cae10c02e' as string | null,
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
   * Board of directors. Names match the initial Board on the Texas
   * Certificate of Formation (filed 2026-02-12).
   * TODO(owner): confirm titles, provide bios + headshots.
   */
  board: [
    { name: 'Eric Estes', title: null as string | null },
    { name: 'Cornelia Estes', title: null as string | null },
    { name: 'Adriana Estes', title: null as string | null },
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
