// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NA Albany Retro Site",
  description: "Retro styled NA site design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Fonts import here */}
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Changa+One&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
