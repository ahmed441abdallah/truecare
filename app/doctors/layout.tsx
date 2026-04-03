import type { Metadata } from "next";
import { buildOpenGraph, getMetadataBase, siteConfig } from "@/lib/seo/site-config";

const title = "الأطباء والتخصصات";
const description =
  "تصفح أطباء TrueCare حسب التخصص، واعثر على الطبيب المناسب لحجز موعدك أو استشارته.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [...siteConfig.keywords, "أطباء", "تخصصات طبية"],
  openGraph: buildOpenGraph({
    title: `${title} | ${siteConfig.name}`,
    description,
    url: new URL("/doctors", getMetadataBase()),
  }),
  alternates: { canonical: "/doctors" },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
