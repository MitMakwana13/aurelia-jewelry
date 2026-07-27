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
    default: "Radha Rani Gemstone | Certified Natural Gemstones & Bespoke Jewelry India",
    template: "%s | Radha Rani Gemstone",
  },
  description:
    "Radha Rani Gemstone offers certified natural gemstones — Ruby, Emerald, Blue Sapphire, Yellow Sapphire — and bespoke fine jewelry, ethically sourced and lab-tested in India.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radharanigemstone.com"),
  alternates: {
    canonical: "https://www.radharanigemstone.com",
  },
  keywords: [
    "Radha Rani Gemstone", "Radharani Gemstone", "Buy Natural Gemstones Online India", "Astrological Gemstones India", "Vedic Astrology Gemstones",
    "Certified Neelam Stone", "Certified Pukhraj Stone", "Natural Unheated Gemstones",
    "Bespoke Jewelry India", "Luxury Custom Jewelry Design", "Ethically Sourced Diamonds",
    "Premium Gemstone Maison India", "Custom Diamond Rings",
    "Bridal Jewelry", "High-End Gemstones", "Heritage Jewelry India"
  ],
  authors: [{ name: "Radha Rani Gemstone" }],
  openGraph: {
    title: "Radha Rani Gemstone | Certified Natural Gemstones & Bespoke Jewelry",
    description: "Ethically sourced certified natural gemstones and bespoke high-end luxury jewelry by Radha Rani Gemstone.",
    type: "website",
    locale: "en_IN",
    siteName: "Radha Rani Gemstone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radha Rani Gemstone | Certified Natural Gemstones & Bespoke Jewelry",
    description: "Certified natural gemstones & bespoke luxury fine jewelry by Radha Rani Gemstone.",
  },
  verification: {
    google: [
      "f1QlccW8yLJqzKH3186pgAxrOBLPOx2a3dEaXFm3sRc",
      "R3UrqYhF250O2pvX_ITufJ2JRBE9bktmDUN-I_zVCOU",
    ],
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
