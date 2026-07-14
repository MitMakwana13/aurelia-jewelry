import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { Providers } from "@/components/Providers";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Radha Rani Heritage Collection: The Culture of Craft",
    template: "%s · Radha Rani",
  },
  description:
    "Radha Rani Heritage Collection: Exquisite, ethically sourced diamonds, emeralds, and bespoke masterpieces crafted in India. A heritage of pure intention and timeless luxury.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://radharani-jewelry.com"),
  keywords: [
    "Buy Natural Gemstones Online India", "Astrological Gemstones India", "Vedic Astrology Gemstones",
    "Certified Neelam Stone", "Certified Pukhraj Stone", "Natural Unheated Gemstones",
    "Bespoke Jewelry India", "Luxury Custom Jewelry Design", "Ethically Sourced Diamonds",
    "Radha Rani Gemstones", "Premium Gemstone Maison India", "Custom Diamond Rings",
    "Bridal Jewelry", "High-End Gemstones", "Heritage Jewelry India"
  ],
  authors: [{ name: "Radha Rani Heritage Collection" }],
  openGraph: {
    title: "Radha Rani Heritage Collection: The Culture of Craft",
    description: "Exquisite diamonds and bespoke masterpieces crafted in India.",
    type: "website",
    locale: "en_IN",
    siteName: "Radha Rani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radha Rani Heritage Collection",
    description: "The Culture of Craft. Heritage Collection Masterpieces.",
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
          <MobileNav />
          <SearchOverlay />
          <WhatsAppFloat />

        </Providers>
      </body>
    </html>
  );
}
