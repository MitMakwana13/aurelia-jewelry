import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetails } from "@/components/product/ProductDetails";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export async function generateStaticParams() {
  const products = await commerce.getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) return { title: "Not Found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) notFound();

  const all = await commerce.getProducts();
  const related = all
    .filter((p) => p.handle !== product.handle && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  const category = (await commerce.getCategory(product.categorySlug))?.name ?? product.categorySlug;

  return (
    <>
      <div className="container-x pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category, href: `/shop/${product.categorySlug}` },
            { label: product.title },
          ]}
        />
      </div>

      <section className="container-x py-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ProductDetails product={product} />
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </>
  );
}
