import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";
import { Cairo } from "next/font/google";
const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap', // لتحسين تجربة المستخدم أثناء التحميل
});


export const metadata: Metadata = {
  title: "Health Care App",
  description: "A comprehensive health care application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}

