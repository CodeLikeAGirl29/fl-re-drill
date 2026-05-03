import type { Metadata } from "next";
import { Anonymous_Pro, Source_Code_Pro, Montserrat } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Florida Real Estate Exam Prep | Master Drill",
  description: "Free interactive practice exam for the Florida Real Estate Sales Associate license. Math formulas, law updates, and instant feedback.",
  keywords: ["Florida Real Estate Exam", "FREC", "Real Estate Math", "Sales Associate Practice Test"],
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const anonPro = Anonymous_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anon-pro',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${anonPro.variable} ${sourceCodePro.variable}`} suppressHydrationWarning>
      <body className="text-[16px] sm:text-base">{children}</body>
    </html>
  );
}