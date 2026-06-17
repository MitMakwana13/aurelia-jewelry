import type { Product } from "@/lib/commerce/types";

const INR = "INR";
const img = (url: string, alt: string) => ({
  url,
  alt,
});

const metalPricing: Record<string, number> = {
  "18k Yellow Gold": 1,
  "18k Rose Gold": 1,
  "18k White Gold": 1.05,
  "Platinum": 1.4,
};

function makeVariants(base: number, metals: string[], sizes?: string[]) {
  const variants = [];
  for (const metal of metals) {
    const metalPrice = Math.round(base * (metalPricing[metal] ?? 1));
    if (sizes && sizes.length) {
      for (const size of sizes) {
        variants.push({
          id: `${metal}-${size}`.toLowerCase().replace(/\s+/g, "-"),
          title: `${metal} / ${size}`,
          metal,
          size,
          price: { amount: metalPrice, currency: INR },
          available: true,
          sku: `${metal.slice(0, 3).toUpperCase()}-${size}`,
        });
      }
    } else {
      variants.push({
        id: metal.toLowerCase().replace(/\s+/g, "-"),
        title: metal,
        metal,
        price: { amount: metalPrice, currency: INR },
        available: true,
        sku: `${metal.slice(0, 3).toUpperCase()}`,
      });
    }
  }
  return variants;
}

type Seed = {
  handle: string;
  title: string;
  description: string;
  categorySlug: string;
  collectionSlugs: string[];
  tags: string[];
  metals: string[];
  sizes?: string[];
  basePrice: number;
  images: { id: string; alt: string }[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
};

const seeds: Seed[] = [
  {
    handle: "imperial-pukhraj-ring",
    title: "Imperial Pukhraj Ring",
    description: "An exceptional unheated 7.5-carat Yellow Sapphire (Pukhraj) from Sri Lanka, set in an 18k solid gold architectural bezel. GIA Certified for absolute purity and astrological potency.",
    categorySlug: "rings",
    collectionSlugs: ["navratna", "astrological"],
    tags: ["pukhraj", "bespoke", "astrological"],
    metals: ["18k Yellow Gold"],
    sizes: ["12", "14", "16", "18"],
    basePrice: 520000,
    images: [
      { id: "/products/pukhraj_ring_1781727243098.png", alt: "Yellow Sapphire Ring" },
    ],
    bestseller: true,
    trending: true,
  },
  {
    handle: "kundan-emerald-choker",
    title: "Kundan Emerald Choker",
    description: "A breathtaking bridal masterpiece featuring Zambian emeralds and uncut Polki diamonds, handcrafted using ancient Kundan techniques. Takes over 400 hours of master craftsmanship.",
    categorySlug: "necklaces",
    collectionSlugs: ["bridal", "high-jewelry"],
    tags: ["emerald", "kundan", "bridal"],
    metals: ["18k Yellow Gold"],
    basePrice: 2850000,
    images: [
      { id: "/products/kundan_choker_1781727253433.png", alt: "Emerald Kundan Choker" },
    ],
    featured: true,
    trending: true,
  },
  {
    handle: "blood-ruby-manik",
    title: "Burmese Ruby Solitaire",
    description: "A rare 4-carat unheated 'Pigeon Blood' Burmese Ruby (Manik), flanked by flawless VVS1 trillion-cut diamonds. An heirloom piece representing ultimate vitality.",
    categorySlug: "rings",
    collectionSlugs: ["navratna", "high-jewelry"],
    tags: ["ruby", "diamond", "manik"],
    metals: ["18k Yellow Gold", "18k White Gold"],
    sizes: ["10", "12", "14"],
    basePrice: 1800000,
    images: [
      { id: "/products/ruby_manik_1781727266985.png", alt: "Burmese Ruby Ring" },
    ],
    trending: true,
  },
  {
    handle: "polki-diamond-bangles",
    title: "Polki Diamond Bangles",
    description: "A pair of traditional Jadau bangles set with syndicate grade uncut Polki diamonds. Finished with exquisite Meenakari enamel work on the interior.",
    categorySlug: "bracelets",
    collectionSlugs: ["bridal", "heritage"],
    tags: ["polki", "bangles", "meenakari"],
    metals: ["18k Yellow Gold"],
    sizes: ["2.2", "2.4", "2.6"],
    basePrice: 1450000,
    images: [{ id: "/products/polki_bangles_1781727279023.png", alt: "Polki Bangles" }],
    featured: true,
    newArrival: true,
  },
  {
    handle: "royal-neelam-pendant",
    title: "Royal Neelam Pendant",
    description: "A 9-carat vivid blue Kashmir-color Sapphire (Neelam) surrounded by a halo of brilliant-cut diamonds. Known to bring immense prosperity and karmic balance.",
    categorySlug: "necklaces",
    collectionSlugs: ["navratna", "astrological"],
    tags: ["sapphire", "neelam", "diamond"],
    metals: ["18k White Gold", "Platinum"],
    basePrice: 1150000,
    images: [{ id: "/products/neelam_pendant_1781727290147.png", alt: "Blue Sapphire Pendant" }],
    trending: true,
  },
  {
    handle: "navratna-heritage-ring",
    title: "The Navratna Sovereign Ring",
    description: "A flawless integration of the nine cosmic stones, perfectly calibrated to balance planetary energies. Crafted strictly according to Vedic gemological guidelines.",
    categorySlug: "rings",
    collectionSlugs: ["navratna", "astrological"],
    tags: ["navratna", "vedic", "spiritual"],
    metals: ["18k Yellow Gold"],
    sizes: ["14", "16", "18", "20", "22"],
    basePrice: 480000,
    images: [{ id: "/products/navratna_ring_1781727302439.png", alt: "Navratna Ring" }],
    newArrival: true,
  },
  {
    handle: "diamond-tennis-necklace",
    title: "Flawless Tennis Necklace",
    description: "A continuous river of light. 25 carats of VVS1, D-color brilliant diamonds set in a supple articulating platinum mount.",
    categorySlug: "necklaces",
    collectionSlugs: ["high-jewelry"],
    tags: ["diamond", "tennis", "platinum"],
    metals: ["18k White Gold", "Platinum"],
    basePrice: 3500000,
    images: [
      { id: "/products/tennis_necklace_1781727314130.png", alt: "Diamond Tennis Necklace" },
    ],
    bestseller: true,
    trending: true,
  },
];

function toProduct(seed: Seed): Product {
  const variants = makeVariants(seed.basePrice, seed.metals, seed.sizes);
  const prices = variants.map((v) => v.price.amount);
  return {
    id: seed.handle,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    categorySlug: seed.categorySlug,
    collectionSlugs: seed.collectionSlugs,
    tags: seed.tags,
    metals: seed.metals,
    sizes: seed.sizes,
    priceRange: {
      min: { amount: Math.min(...prices), currency: "INR" },
      max: { amount: Math.max(...prices), currency: "INR" },
    },
    images: seed.images.map((i) => img(i.id, i.alt)),
    variants,
    featured: seed.featured,
    trending: seed.trending,
    newArrival: seed.newArrival,
    bestseller: seed.bestseller,
  };
}

export const products: Product[] = seeds.map(toProduct);
