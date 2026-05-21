import type { Metadata } from "next";
import Script from "next/script";
import {
  Anonymous_Pro,
  Source_Code_Pro,
  Montserrat,
  Oxanium,
  Raleway,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ralewayHeading = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
});

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Florida Real Estate Exam Prep | Master Drill",
  description:
    "Free interactive practice exam for the Florida Real Estate Sales Associate license. Math formulas, law updates, and instant feedback.",
  keywords: [
    "Florida Real Estate Exam",
    "FREC",
    "Real Estate Math",
    "Sales Associate Practice Test",
  ],
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const anonPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anon-pro",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        montserrat.variable,
        anonPro.variable,
        sourceCodePro.variable,
        "font-sans",
        oxanium.variable,
        ralewayHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="text-[16px] sm:text-base">
        {children}
        <Script
          src="https://readmecodegen.com/view-tracker.js"
          data-user="user_mpez5xv7_tg0738"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
