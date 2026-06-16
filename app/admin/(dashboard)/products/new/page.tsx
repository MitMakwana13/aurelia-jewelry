import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Add New Product</h1>
        <p className="mt-1 text-sm text-ink/50">Fill in the details below to add a product to your catalog.</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
