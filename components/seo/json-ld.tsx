import { getMetadataBase, siteConfig } from "@/lib/seo/site-config";

export function OrganizationJsonLd() {
  const base = getMetadataBase().origin;
  const payload = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: siteConfig.name,
    url: base,
    description: siteConfig.defaultDescription,
    inLanguage: siteConfig.language,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export function WebSiteJsonLd() {
  const base = getMetadataBase().origin;
  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: base,
    description: siteConfig.defaultDescription,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
