import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "اتصل بنا";
const description =
  "تواصل مع TrueCare: العنوان، الهاتف، البريد، وساعات العمل. نحن هنا للإجابة عن استفساراتك الصحية.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "اتصل بنا", "دعم"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/contact", getMetadataBase()),
  }),
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
