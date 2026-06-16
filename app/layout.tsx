import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { Providers } from "@/components/Providers";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Radharani Gemstone — Divine Energy, Timeless Luxury",
    template: "%s · Radharani Gemstone",
  },
  description:
    "Radharani Gemstone — Exquisite ethically sourced gemstones, diamonds and bespoke jewelry crafted in India. Divine Energy, Timeless Luxury.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://radharanigemstone.com"),
  keywords: [
    "gemstones India", "diamonds India", "custom jewelry India", "Radharani Gemstone",
    "birthstones", "ruby", "emerald", "sapphire", "diamond jewelry", "bespoke jewelry",
    "gemstone shop India", "natural gemstones",
  ],
  authors: [{ name: "Radharani Gemstone" }],
  openGraph: {
    title: "Radharani Gemstone — Divine Energy, Timeless Luxury",
    description: "Exquisite gemstones, diamonds and bespoke jewelry crafted in India.",
    type: "website",
    locale: "en_IN",
    siteName: "Radharani Gemstone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radharani Gemstone",
    description: "Divine Energy, Timeless Luxury. Gemstones & Diamonds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <OrganizationJsonLd />
        <Preloader />
        <Providers>
          <CustomCursor />
          <StorefrontLayout>
            {children}
          </StorefrontLayout>
          <CartDrawer />
          <MobileNav />
          <SearchOverlay />
        </Providers>
      </body>
    </html>
  );
}
