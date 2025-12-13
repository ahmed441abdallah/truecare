import { SimpleHeader } from "@/components/ui/simple-header";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "عن الموقع", href: "/about" },
  { label: "الخدمات", href: "/services" },
  { label: "الأطباء", href: "/doctors" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "التوصيات اليومية", href: "/recommendations" },
];

export default function Header({
  bgImage,
  fullHeight,
}: {
  bgImage?: string;
  fullHeight?: boolean;
}) {
  return <SimpleHeader links={navLinks} />;
}

