import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "توصيات صحية";
const description =
  "توصيات ومؤشرات يومية لنومك، نشاطك، ومزاجك — أدوات لمساعدتك على اتخاذ قرارات أوضح لصحتك.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "توصيات", "لياقة", "نوم"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/recommendations", getMetadataBase()),
  }),
  alternates: { canonical: "/recommendations" },
};

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
