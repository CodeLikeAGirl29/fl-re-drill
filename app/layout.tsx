import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florida Real Estate Exam Prep | Master Drill",
  description: "Free interactive practice exam for the Florida Real Estate Sales Associate license. Math formulas, law updates, and instant feedback.",
  keywords: ["Florida Real Estate Exam", "FREC", "Real Estate Math", "Sales Associate Practice Test"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* FontAwesome for your icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}