
import Link from "next/link";

const PriceUp = async () => {
  let priceUpProducts = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    const products = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.data?.products)
          ? data.data.products
          : Array.isArray(data.products)
            ? data.products
            : [];

    priceUpProducts = products
      .filter((product) => product.change?.dir === "up")
      .sort(
        (a, b) =>
          Number(b.change?.pct ?? 0) -
          Number(a.change?.pct ?? 0)
      );
  } catch (error) {
    console.error("PriceUp API Error:", error);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-red-600">
            PRICE INCREASE
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
            🔺 যেসব পণ্যের দাম বেড়েছে
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            বাজারে দাম বৃদ্ধি পাওয়া পণ্যের তালিকা
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          {priceUpProducts.length} টি পণ্য
        </span>
      </div>

      {priceUpProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priceUpProducts.slice(0, 6).map((product, index) => (
            <Link
              href={`/products/${product.slug ?? product.id}`}
              key={product.id ?? product.slug ?? index}
              className="flex min-h-[240px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="text-3xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-bold text-gray-800">
                      {product.nameBn ?? product.name ?? "পণ্যের নাম"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryNameBn ?? "নিত্যপ্রয়োজনীয় পণ্য"}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg bg-red-50 px-2 py-1.5 text-sm font-bold text-red-600">
                  ↑ {product.change?.pct ?? 0}%
                </span>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  আজকের বাজারদর
                </p>

                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  ৳{product.today ?? "—"}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    / {product.unit || "kg"}
                  </span>
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  গতকাল: ৳{product.yesterday ?? "—"}
                </p>

                <p className="mt-3 text-sm font-semibold text-green-700">
                  বিস্তারিত দেখুন →
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-12 text-center">
          <p className="text-4xl">📊</p>
          <h3 className="mt-3 font-bold text-gray-800">
            দাম বেড়েছে এমন পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            API-এর ডেটা পরীক্ষা করে আবার চেষ্টা করো।
          </p>
        </div>
      )}
    </section>
  );
};

export default PriceUp;
