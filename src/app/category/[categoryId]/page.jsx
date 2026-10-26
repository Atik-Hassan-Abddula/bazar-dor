
import { Suspense } from "react";
import Link from "next/link";
import ProductSorting from "@/components/ProductSorting";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl p-6">
          <p className="animate-pulse text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }) {
  const { categoryId } = await params;
  const slug = encodeURIComponent(categoryId);

  let category = null;
  let products = [];
  let apiError = false;

  try {
    const [categoryRes, productRes] = await Promise.all([
      fetch(`${BASE_URL}/categories/${slug}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${BASE_URL}/products?category=${slug}`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!categoryRes.ok || !productRes.ok) {
      apiError = true;
    } else {
      const [categoryData, productData] = await Promise.all([
        categoryRes.json(),
        productRes.json(),
      ]);

      category =
        categoryData?.data?.category ??
        categoryData?.data ??
        categoryData?.category ??
        null;

      const productList = Array.isArray(productData)
        ? productData
        : productData?.data?.products ??
          productData?.data ??
          productData?.products ??
          [];

      products = Array.isArray(productList) ? productList : [];
    }
  } catch (error) {
    console.error("Category API error:", error);
    apiError = true;
  }

  const categoryName =
    category?.nameBn ??
    category?.name ??
    products[0]?.categoryNameBn ??
    categoryId;

  const categoryIcon =
    category?.icon ??
    category?.categoryIcon ??
    products[0]?.categoryIcon ??
    "🛒";

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex font-semibold text-green-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mb-8 rounded-2xl bg-green-50 p-6">
        <p className="mb-2 text-sm text-green-700">
          BazarDor / Category
        </p>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {categoryIcon} {categoryName}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          মোট পণ্য: {products.length}
        </p>
      </section>

      {apiError ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            API থেকে ডেটা লোড করা যায়নি।
          </p>

          <p className="mt-2 text-sm text-gray-600">
            ইন্টারনেট সংযোগ এবং API endpoint পরীক্ষা করো।
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            আবার চেষ্টা করো
          </button>
        </section>
      ) : (
        <ProductSorting products={products} />
      )}
    </main>
  );
}
