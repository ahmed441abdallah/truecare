import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "المساعد الصحي";
const description =
  "تحدث مع المساعد الذكي لدى TrueCare للإجابات العامة حول الصحة والتنقل في الخدمات — لا يغني عن استشارة طبيب.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "مساعد صحي", "ذكاء اصطناعي"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/chat", getMetadataBase()),
  }),
  alternates: { canonical: "/chat" },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
