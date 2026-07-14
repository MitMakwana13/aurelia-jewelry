interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
}

export function OrganizationJsonLd({
  name = "Radha Rani Heritage Collection",
  url = "https://radharani-jewelry.com",
}: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name,
    url,
    description:
      "Radha Rani Heritage Collection - Exquisite diamonds, emeralds and bespoke masterpieces. The Culture of Craft. Based in India.",
    logo: `${url}/logo.png`,
    image: `${url}/logo.png`,
    telephone: "+91-99999-99999",
    email: "concierge@radharani-jewelry.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Wire Transfer, Bank Transfer, Credit Card",
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
      name: "Radha Rani Heritage Collection",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price,
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "Organization",
        name: "Radha Rani Heritage Collection",
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
