import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow } from "next/font/google";
import "./globals.css";
import MarqueeBackground from "@/components/MarqueeBackground";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "6v1d — Six Voices. One Direction.",
  description:
    "A personal inspirations page. Six people who shaped the creator's creativity and mindset.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${barlow.variable}`}>
      <body>
        <MarqueeBackground />
        {children}
      </body>
    </html>
  );
}
