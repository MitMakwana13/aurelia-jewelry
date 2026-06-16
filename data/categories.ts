import type { Category } from "@/lib/commerce/types";

export const categories: Category[] = [
  {
    slug: "rings",
    name: "Rings",
    description: "Stacking bands, signets, and statement rings crafted in solid gold and sterling silver.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1600&q=80",
      alt: "A hand wearing a stack of thin gold rings",
    },
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    description: "Delicate chains and pendants designed to layer.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80",
      alt: "A layered necklace set on a neutral background",
    },
  },
  {
    slug: "earrings",
    name: "Earrings",
    description: "Hoops, studs, and huggies — everyday classics in fine metal.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=1600&q=80",
      alt: "Gold hoop earrings",
    },
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    description: "Cuffs, chains, and bangles built for stacking.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=1600&q=80",
      alt: "A gold bracelet resting on linen",
    },
  },
];
