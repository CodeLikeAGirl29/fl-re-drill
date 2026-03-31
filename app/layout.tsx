import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florida Real Estate Master Drill",
  description: "Prepare for your FL state exam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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