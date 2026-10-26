const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Section Heading */}
      <div className="mb-5 flex min-h-10 items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          🛒 সকল পণ্য
        </h2>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
          {products.length} টি পণ্য
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <article
              key={product.id}
              className="flex h-[240px] w-full min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Information */}
              <div className="flex min-h-0 flex-1 items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="shrink-0 text-3xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 break-words font-bold text-gray-800">
                      {product.nameBn || product.name || "পণ্যের নাম"}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {product.categoryNameBn || "নিত্যপ্রয়োজনীয় পণ্য"}
                    </p>
                  </div>
                </div>

                {/* Price Change */}
                {isUp && (
                  <span className="shrink-0 rounded-lg bg-red-50 px-2.5 py-1.5 text-sm font-bold text-red-600">
                    ▲ {product.change?.pct ?? 0}%
                  </span>
                )}

                {isDown && (
                  <span className="shrink-0 rounded-lg bg-green-50 px-2.5 py-1.5 text-sm font-bold text-green-600">
                    ▼ {product.change?.pct ?? 0}%
                  </span>
                )}

                {!isUp && !isDown && (
                  <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-bold text-gray-500">
                    —
                  </span>
                )}
              </div>

              {/* Product Price */}
              <div className="mt-auto shrink-0 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">
                  আজকের বাজারদর
                </p>

                <div className="mt-1 flex items-baseline gap-3">
                  <p className="text-2xl font-extrabold text-gray-900">
                    ৳{product.today ?? "—"}
                  </p>

                  <span className="text-sm text-gray-500">
                    / {product.unit || "kg"}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  গতকাল: ৳{product.yesterday ?? "—"}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <p className="rounded-xl bg-gray-50 py-8 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default AllProducts;