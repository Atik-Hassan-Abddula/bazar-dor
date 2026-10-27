
import { Suspense } from "react";
import Link from "next/link";
import ProductSorting from "@/components/ProductSorting";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

const categoryTranslations = {
  "শাকসবজি": "Vegetables",
  "সবজি": "Vegetables",
  "মাছ": "Fish",
  "মাংস": "Meat",
  "ফল": "Fruits",
  "ফলমূল": "Fruits",
  "চাল": "Rice",
  "ডাল": "Lentils",
  "তেল": "Oil",
  "মসলা": "Spices",
  "মুদি": "Groceries",
  "পানীয়": "Beverages",
  "বেকারি": "Bakery",
  "স্ন্যাকস": "Snacks",
  "হিমায়িত খাবার": "Frozen Food",
};

function translateCategoryName(value) {
  const name = String(value ?? "").trim();
  return categoryTranslations[name] ?? name;
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl p-6">
          <p className="animate-pulse text-gray-500">
            Loading category...
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

  const rawCategoryName =
    category?.nameEn ??
    category?.name ??
    category?.nameBn ??
    products[0]?.categoryNameEn ??
    products[0]?.categoryName ??
    products[0]?.categoryNameBn ??
    categoryId;

  const categoryName = translateCategoryName(rawCategoryName);

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
        ← Back to Home
      </Link>

      <section className="mb-8 rounded-2xl bg-green-50 p-6">
        <p className="mb-2 text-sm text-green-700">
          BazarDor / Category
        </p>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {categoryIcon} {categoryName}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Total Products: {products.length}
        </p>
      </section>

      {apiError ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Failed to load category products.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Please check your internet connection and API endpoint.
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Back to Home
          </Link>
        </section>
      ) : (
        <ProductSorting products={products} />
      )}
    </main>
  );
}
