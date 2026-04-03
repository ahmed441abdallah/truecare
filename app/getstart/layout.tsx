import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "ابدأ معنا";
const description =
  "سجّل في TrueCare لإنشاء حسابك، إكمال ملفك الصحي، والبدء في حجز المواعيد بسهولة.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "تسجيل", "حساب جديد"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/getstart", getMetadataBase()),
  }),
  alternates: { canonical: "/getstart" },
};

export default function GetStartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
