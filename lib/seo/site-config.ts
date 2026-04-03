import type { Metadata } from "next";

/**
 * Set in production (e.g. Vercel): NEXT_PUBLIC_SITE_URL=https://your-domain.com
 * Falls back to VERCEL_URL or localhost for dev.
 */
export function getMetadataBase(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const normalized = explicit.replace(/\/$/, "");
    return new URL(normalized);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const siteConfig = {
  name: "TrueCare",
  defaultTitle: "TrueCare — رعاية صحية ذكية وحجز مواعيد",
  defaultDescription:
    "منصة رعاية صحية: اكتشف الأطباء، احجز المواعيد، تابع صحتك، واحصل على دعم وإرشادات في مكان واحد.",
  keywords: [
    "رعاية صحية",
    "حجز موعد طبي",
    "أطباء",
    "صحة",
    "عيادة",
    "TrueCare",
    "healthcare",
    "medical appointment",
  ],
  locale: "ar_SA",
  language: "ar",
} as const;

export function buildOpenGraph(
  overrides: Partial<NonNullable<Metadata["openGraph"]>> = {}
): Metadata["openGraph"] {
  const base = getMetadataBase();
  return {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    ...overrides,
    images: overrides.images ?? [
      {
        url: new URL("/logo.png", base),
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  };
}
