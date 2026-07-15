import type { Collection } from "@/lib/commerce/types";

export const collections: Collection[] = [
  {
    slug: "rare",
    name: "Rare & Precious",
    tagline: "The finest gemstones",
    description: "Exceptional unheated rubies, yellow sapphires, and red coral sourced from around the world.",
    heroImage: {
      url: "/products/rubies/IMG_7489.JPG",
      alt: "Rare vivid pigeon blood ruby",
    },
    productHandles: ["ruby-gem-7489", "yellow-sapphire-7524"],
  },
  {
    slug: "bespoke-rings",
    name: "Bespoke Rings",
    tagline: "Exclusive custom designs",
    description: "Commanding solitaires, vintage halos, and architectural masterpieces crafted specifically for our clients.",
    heroImage: {
      url: "/products/rings/IMG_7583.JPG",
      alt: "Bespoke heritage ring",
    },
    productHandles: ["ring-bespoke-7580", "ring-bespoke-7581", "ring-bespoke-7582"],
  },
  {
    slug: "bespoke-necklaces",
    name: "Bespoke Necklaces",
    tagline: "Unparalleled elegance",
    description: "From delicate celestial chains to dramatic imperial collars, each necklace is an exhibition of bespoke luxury.",
    heroImage: {
      url: "/products/necklaces/IMG_7607.JPG",
      alt: "Bespoke heritage necklace",
    },
    productHandles: ["necklace-bespoke-7368", "necklace-bespoke-7600"],
  },
  {
    slug: "bespoke-bracelets",
    name: "Bespoke Bracelets",
    tagline: "Woven brilliance",
    description: "Tactile marvels ranging from supple royal mesh to solid sovereign links.",
    heroImage: {
      url: "/products/bracelets/IMG_7636.JPG",
      alt: "Bespoke heritage bracelet",
    },
    productHandles: ["bracelet-bespoke-7632", "bracelet-bespoke-7633"],
  },
  {
    slug: "bespoke-bangles",
    name: "Bespoke Bangles",
    tagline: "Heritage meets modern",
    description: "Intricate filigree bangles and timeless kadas that celebrate historical craftsmanship and regal elegance.",
    heroImage: {
      url: "/products/bangles/IMG_7652.JPG",
      alt: "Bespoke heritage bangle",
    },
    productHandles: ["bangle-bespoke-7649", "bangle-bespoke-7650"],
  },
];

