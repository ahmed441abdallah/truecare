import type { MetadataRoute } from "next";
import { getMetadataBase } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = getMetadataBase().origin;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/patients/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
