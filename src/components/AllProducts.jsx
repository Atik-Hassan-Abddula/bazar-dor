
import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.products)
        ? data.data.products
        : Array.isArray(data?.products)
          ? data.products
          : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Section Heading */}
      <div className="mb-5 flex min-h-10 items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          🛒 সকল পণ্য
        </h2>

        <span className="shrink-0 text-sm font-semibold text-gray-600">
          {products.length} টি পণ্য
        </span>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const productId = product.slug ?? product.id;

            const productName =
              product.nameBn || product.name || "পণ্যের নাম";

            return (
              <Link
                key={product.id ?? product.slug}
                href={`/products/${encodeURIComponent(String(productId))}`}
                aria-label={`${productName} এর সম্পূর্ণ বিস্তারিত দেখুন`}
                className="block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-600"
              >
                <article className="flex h-[240px] w-full min-w-0 flex-col rounded-xl border border-gray-200 p-4 transition duration-200 hover:-translate-y-1 hover:border-lime-500">
                  {/* Product Information */}
                  <div className="flex min-h-0 flex-1 items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      {product.image &&
                      /^https?:\/\//i.test(String(product.image)) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt=""
                          className="h-10 w-10 shrink-0 object-contain"
                        />
                      ) : (
                        <span className="shrink-0 text-3xl">
                          {product.image || product.categoryIcon || "🛒"}
                        </span>
                      )}

                      <div className="min-w-0">
                        <h3 className="line-clamp-2 break-words font-bold text-gray-800">
                          {productName}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {product.categoryNameBn ||
                            product.category ||
                            "নিত্যপ্রয়োজনীয় পণ্য"}
                        </p>
                      </div>
                    </div>

                    {/* Price Change */}
                    {isUp && (
                      <span className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-bold text-red-600">
                        ▲ {String(product.change?.pct ?? 0).replace("-", "")}%
                      </span>
                    )}

                    {isDown && (
                      <span className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-bold text-green-700">
                        ▼ {String(product.change?.pct ?? 0).replace("-", "")}%
                      </span>
                    )}

                    {!isUp && !isDown && (
                      <span className="shrink-0 text-sm font-bold text-gray-500">
                        —
                      </span>
                    )}
                  </div>

                  {/* Product Price */}
                  <div className="mt-auto shrink-0 border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-500">
                      আজকের বাজারদর
                    </p>

                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                      <p className="text-2xl font-extrabold text-gray-900">
                        {product.today !== null &&
                        product.today !== undefined
                          ? `৳${Number(product.today).toLocaleString("en-BD")}`
                          : "—"}
                      </p>

                      <span className="text-sm text-gray-500">
                        / {product.unit || "kg"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      গতকাল:{" "}
                      {product.yesterday !== null &&
                      product.yesterday !== undefined
                        ? `৳${Number(product.yesterday).toLocaleString("en-BD")}`
                        : "—"}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-gray-600">
                      বিস্তারিত দেখুন →
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 py-8 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default AllProducts;
