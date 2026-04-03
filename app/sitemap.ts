import type { MetadataRoute } from "next";
import { getMetadataBase } from "@/lib/seo/site-config";

const ROUTES: { path: string; priority: number; change: "weekly" | "monthly" }[] =
  [
    { path: "", priority: 1, change: "weekly" },
    { path: "/services", priority: 0.9, change: "monthly" },
    { path: "/doctors", priority: 0.9, change: "monthly" },
    { path: "/about", priority: 0.85, change: "monthly" },
    { path: "/contact", priority: 0.85, change: "monthly" },
    { path: "/getstart", priority: 0.8, change: "monthly" },
    { path: "/recommendations", priority: 0.75, change: "monthly" },
    { path: "/chat", priority: 0.7, change: "monthly" },
  ];

const PUBLIC_PATHS: MetadataRoute.Sitemap = ROUTES.map(({ path, priority, change }) => ({
  url: `${getMetadataBase().origin}${path || "/"}`,
  lastModified: new Date(),
  changeFrequency: change,
  priority,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS;
}
