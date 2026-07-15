interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
}

export function OrganizationJsonLd({
  name = "Radharani Gemstone",
  url = "https://radharanigemstone.com",
}: OrganizationJsonLdProps) {
  const storeData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name,
    url,
    description:
      "Radha Rani Heritage Collection - Exquisite diamonds, emeralds and bespoke masterpieces. The Culture of Craft. Based in India.",
    logo: `${url}/logo.png`,
    image: `${url}/logo.png`,
    telephone: "+91-79840-62415",
    email: "concierge@radharanigemstone.com",
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

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Radharani Gemstone",
    url: "https://radharanigemstone.com/",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
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
