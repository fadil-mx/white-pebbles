import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

// Inter from Google Fonts — clean modern sans for body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fraunces from Google Fonts — warm retro-modern serif (free, commercial-licensed)
// Closest free alternative to Recoleta (~82% visual similarity)
// Variable font: includes all weights + italics in a single download
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "White Pebbles — Where Pastry Begins | Premium Bakery Supplies Dubai",
  description:
    "Dubai's trusted source for premium bakery ingredients, pastry tools, chocolate, and cake decorations. Trusted by 5-star kitchens since 2014.",
  keywords: [
    "bakery supplies Dubai",
    "pastry ingredients UAE",
    "chocolate Dubai",
    "Callebaut UAE",
    "Silikomart",
    "cake decorations Dubai",
  ],
  openGraph: {
    title: "White Pebbles — The Art of Pastry Begins Here",
    description: "Premium bakery and pastry supplies, trusted by Dubai's finest kitchens.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
