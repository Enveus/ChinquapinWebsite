/**
 * Schema.org JSON-LD builders.
 *
 * Search engines and donation aggregators consume this to identify the
 * organization, its mission, and how to give. Only emit fields we can
 * vouch for — leave fields out rather than fabricate values.
 */

import { site } from '@config/site';

interface NonProfitJsonLd {
  '@context': 'https://schema.org';
  '@type': 'NGO';
  name: string;
  legalName: string;
  url: string;
  description: string;
  taxID?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  email?: string;
  telephone?: string;
  sameAs?: string[];
}

export function buildOrganizationJsonLd(): NonProfitJsonLd {
  const payload: NonProfitJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.mission,
  };

  if (site.ein) {
    payload.taxID = site.ein;
  }

  if (site.address) {
    payload.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    };
  }

  if (site.contact.email) {
    payload.email = site.contact.email;
  }

  if (site.contact.phone) {
    payload.telephone = site.contact.phone;
  }

  if (site.social.length > 0) {
    payload.sameAs = site.social.map((account) => account.url);
  }

  return payload;
}
