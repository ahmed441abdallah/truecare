import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "من نحن";
const description =
  "تعرف على TrueCare: رؤيتنا في تحسين تجربة الرعاية الصحية من خلال التكنولوجيا والشفافية والالتزام بصحة المجتمع.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "من نحن", "عن المستشفى"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/about", getMetadataBase()),
  }),
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
