
import Link from "next/link";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/categories";

export default async function Groceries() {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <p className="px-4 py-6 text-center text-red-600">
        ক্যাটাগরি লোড করা যায়নি। আবার চেষ্টা করুন।
      </p>
    );
  }

  const result = await res.json();
  const categories = Array.isArray(result)
    ? result
    : result.data?.categories ??
      result.data ??
      result.categories ??
      [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        🛒 সব ক্যাটাগরি
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => {
          const slug = category.slug ?? category.id;

          return (
            <Link
              key={category.id ?? category.slug}
              href={`/category/${encodeURIComponent(String(slug))}`}
              className="group flex min-h-24 items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:bg-green-50 hover:shadow-md"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl">
                {category.icon ?? category.categoryIcon ?? "🛒"}
              </span>

              <div className="min-w-0">
                <h3 className="break-words font-semibold text-gray-800 group-hover:text-green-700">
                  {category.nameBn ?? category.name ?? "ক্যাটাগরি"}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  পণ্য দেখুন →
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <p className="py-8 text-center text-gray-500">
          কোনো ক্যাটাগরি পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
