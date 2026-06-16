interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
}

export function OrganizationJsonLd({
  name = "Radharani Gemstone",
  url = "https://radharanigemstone.com",
}: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name,
    url,
    description:
      "Radharani Gemstone — Exquisite gemstones, diamonds and bespoke jewelry. Divine Energy, Timeless Luxury. Based in India.",
    logo: `${url}/logo.png`,
    image: `${url}/logo.png`,
    telephone: "+91-99999-99999",
    email: "info@radharanigemstone.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Bank Transfer, Credit Card, Debit Card",
    openingHours: "Mo-Sa 10:00-19:00",
    sameAs: [
      "https://www.instagram.com/radharanigemstone",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  sku?: string;
  url: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "INR",
  sku,
  url,
}: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: "Radharani Gemstone",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price,
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "Organization",
        name: "Radharani Gemstone",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
