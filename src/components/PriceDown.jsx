
import Link from "next/link";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

async function getProducts() {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result = await res.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.data?.products)) {
    return result.data.products;
  }
  if (Array.isArray(result.products)) return result.products;

  return [];
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "দাম পাওয়া যায়নি";
  }

  return `৳${Number(price).toLocaleString("en-BD")}`;
}

export default async function PriceDown() {
  const products = await getProducts();

  const reducedProducts = products.filter(
    (product) => product.change?.dir === "down"
  );

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          দাম কমেছে
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          আগের তুলনায় যেসব পণ্যের দাম কমেছে
        </p>
      </div>

      {reducedProducts.length === 0 ? (
        <p className="border border-gray-200 p-6 text-center text-gray-500">
          দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reducedProducts.map((product) => {
            const productId = product.slug ?? product.id;

            return (
              <Link
                key={product.id ?? product.slug}
                href={`/products/${encodeURIComponent(String(productId))}`}
                className="group block border border-gray-200 p-4 transition hover:border-green-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden text-3xl">
                    {typeof product.image === "string" &&
                    /^https?:\/\//.test(product.image) ? (
                      <img
                        src={product.image}
                        alt={product.nameBn ?? product.name ?? "পণ্য"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      product.image || product.categoryIcon || "🛒"
                    )}
                  </div>

                  <span className="border border-green-200 px-2 py-1 text-sm font-semibold text-green-700">
                    ↓ {product.change?.pct ?? 0}%
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-green-700">
                  {product.nameBn ?? product.name ?? "পণ্য"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {product.categoryNameBn ?? product.category ?? "অন্যান্য"}
                </p>

                <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-500">
                      আজকের দাম
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(product.today)}
                      {product.unit ? ` / ${product.unit}` : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-500">
                      গতকালের দাম
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatPrice(product.yesterday)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm font-medium text-green-700">
                  <span>বিস্তারিত দেখুন</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
