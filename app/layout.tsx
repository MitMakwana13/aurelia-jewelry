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
    default: "Radha Rani — The Heritage Collection",
    template: "%s · Radha Rani",
  },
  description:
    "Radha Rani — Exquisite, ethically sourced gemstones, diamonds, and bespoke masterpieces crafted in India. The Heritage Collection. Pure intention. Timeless luxury.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://radharani-jewelry.com"),
  keywords: [
    "Heritage Collection India", "Navratna gemstones", "bespoke jewelry India", "Radha Rani",
    "heritage jewelry", "Navratna ring", "diamond masterpieces", "custom luxury jewelry",
    "bridal jewelry India", "Vedic gemstones", "gemstone consultation",
  ],
  authors: [{ name: "Radha Rani" }],
  openGraph: {
    title: "Radha Rani — The Heritage Collection",
    description: "Exquisite gemstones, diamonds and bespoke masterpieces crafted in India.",
    type: "website",
    locale: "en_IN",
    siteName: "Radha Rani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radha Rani",
    description: "The Culture of Craft. The Heritage Collection.",
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
