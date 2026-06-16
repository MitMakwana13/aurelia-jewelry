import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "@/app/admin/(dashboard)/products/ProductForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Params) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Edit Product</h1>
        <p className="mt-1 text-sm text-ink/50">{product.title}</p>
      </div>
      <ProductForm
        mode="edit"
        initialData={{
          id: product.id,
          title: product.title,
          handle: product.handle,
          description: product.description,
          categorySlug: product.categorySlug,
          basePrice: String(product.basePrice),
          tags: product.tags.join(", "),
          metals: product.metals.join(", "),
          featured: product.featured,
          trending: product.trending,
          newArrival: product.newArrival,
          bestseller: product.bestseller,
        }}
      />
    </div>
  );
}
