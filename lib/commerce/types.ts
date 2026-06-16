export type Money = { amount: number; currency: string };

export type Image = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  metal: string;
  size?: string;
  price: Money;
  compareAtPrice?: Money;
  available: boolean;
  sku: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  categorySlug: string;
  collectionSlugs: string[];
  tags: string[];
  metals: string[];
  sizes?: string[];
  priceRange: { min: Money; max: Money };
  images: Image[];
  variants: ProductVariant[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  heroImage: Image;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: Image;
  productHandles: string[];
};

export type LineItem = {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  image: Image;
  price: Money;
  quantity: number;
};

export type Cart = {
  id: string;
  lineItems: LineItem[];
  subtotal: Money;
  itemCount: number;
};

export type Address = {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export type Order = {
  id: string;
  email: string;
  lineItems: LineItem[];
  shipping: Address;
  billing: Address;
  subtotal: Money;
  shippingTotal: Money;
  taxTotal: Money;
  total: Money;
  createdAt: string;
};

export type CommerceAdapter = {
  getProducts(opts?: { category?: string; collection?: string; limit?: number }): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(slug: string): Promise<Collection | null>;
  searchProducts(query: string): Promise<Product[]>;
};
