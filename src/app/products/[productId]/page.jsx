
import Link from "next/link";
import { Suspense } from "react";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

async function getProduct(productId) {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.data?.products)
          ? result.data.products
          : Array.isArray(result?.products)
            ? result.products
            : [];

    return (
      products.find(
        (item) =>
          String(item.id) === String(productId) ||
          String(item.slug) === String(productId)
      ) ?? null
    );
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "—";
  }

  const value = Number(price);

  return Number.isNaN(value)
    ? String(price)
    : `৳${value.toLocaleString("en-BD")}`;
}

function getMarketPrice(market, keys) {
  for (const key of keys) {
    if (
      market?.[key] !== null &&
      market?.[key] !== undefined &&
      market?.[key] !== ""
    ) {
      return market[key];
    }
  }

  return null;
}

function PriceCard({ title, price, description }) {
  return (
    <div className="rounded-xl border border-gray-300 p-5 transition hover:border-lime-600">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-3 text-2xl font-bold text-gray-900">
        {formatPrice(price)}
      </p>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function LoadingProduct() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 text-gray-900">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-lime-600"
          role="status"
          aria-label="Loading"
        />

        <p className="mt-4 text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}

function NotFoundProduct() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 text-gray-900">
      <div className="max-w-md text-center">
        <p className="text-6xl">🔎</p>

        <h1 className="mt-5 text-2xl font-bold">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          পণ্যের লিংকটি সঠিক কি না পরীক্ষা করে আবার চেষ্টা করুন।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border border-gray-300 px-5 py-3 font-semibold transition hover:border-lime-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

async function ProductContent({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return <NotFoundProduct />;
  }

  const productName = product.nameBn || product.name || "পণ্য";

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const rawChange = product.change?.pct;
  const hasChange =
    rawChange !== null &&
    rawChange !== undefined &&
    rawChange !== "" &&
    !Number.isNaN(Number(rawChange));

  const change = hasChange ? Number(rawChange) : 0;

  const isUp =
    product.change?.dir === "up" ||
    (!product.change?.dir && change > 0);

  const isDown =
    product.change?.dir === "down" ||
    (!product.change?.dir && change < 0);

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-500";

  const changeLabel = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দামের পরিবর্তন";

  const history = [
    {
      title: "আজকের দাম",
      price: product.today,
      description: "বর্তমান বাজারদর",
    },
    {
      title: "গতকালের দাম",
      price: product.yesterday,
      description: "গত দিনের বাজারদর",
    },
    {
      title: "গত সপ্তাহের দাম",
      price: product.lastWeek,
      description: "এক সপ্তাহ আগের দাম",
    },
    {
      title: "গত মাসের দাম",
      price: product.lastMonth,
      description: "এক মাস আগের দাম",
    },
  ];

  return (
    <main className="min-h-screen text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-lime-700">
            হোম
          </Link>

          <span>/</span>

          <span>
            {product.categoryNameBn || product.category || "পণ্য"}
          </span>

          <span>/</span>

          <span className="font-medium text-gray-900">
            {productName}
          </span>
        </nav>

        {/* Product Information */}
        <section className="grid gap-8 border-b border-gray-300 pb-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gray-300 px-3 py-2 text-sm">
                {product.categoryIcon || "🛒"}{" "}
                {product.categoryNameBn || product.category || "পণ্য"}
              </span>

              <span className="text-sm font-medium text-green-700">
                ● বাজারদরের তথ্য
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
              {productName}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              এই পণ্যের বর্তমান বাজারদর, আগের দামের ইতিহাস এবং
              বিভিন্ন বাজারের দামের তুলনা দেখুন।
            </p>

            <div className="mt-8">
              <p className="text-sm text-gray-500">আজকের বাজারদর</p>

              <p className="mt-2 text-4xl font-extrabold sm:text-5xl">
                {formatPrice(product.today)}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit || "ইউনিট"}
              </p>

              <p className={`mt-4 font-semibold ${changeColor}`}>
                {changeLabel}

                {hasChange && (
                  <span className="ml-2">
                    ({change > 0 ? "+" : ""}
                    {rawChange}%)
                  </span>
                )}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#price-history"
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-lime-600"
              >
                দামের ইতিহাস ↓
              </a>

              <a
                href="#market-comparison"
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-lime-600"
              >
                বাজারের তুলনা
              </a>
            </div>
          </div>

          {/* Product Image or Emoji */}
          <div className="flex min-h-64 items-center justify-center">
            {product.image &&
            /^https?:\/\//i.test(String(product.image)) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={productName}
                className="h-48 w-48 object-contain sm:h-56 sm:w-56"
              />
            ) : (
              <span
                className="text-8xl sm:text-9xl"
                role="img"
                aria-label={productName}
              >
                {product.image || product.categoryIcon || "🛒"}
              </span>
            )}
          </div>
        </section>

        {/* Price History */}
        <section id="price-history" className="scroll-mt-8 py-10">
          <h2 className="text-2xl font-bold">দামের ইতিহাস</h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন সময়ের বাজারদর তুলনা করুন।
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {history.map((item) => (
              <PriceCard
                key={item.title}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
        </section>

        {/* Price Change */}
        <section className="border-y border-gray-300 py-8">
          <h2 className="text-2xl font-bold">দামের পরিবর্তন</h2>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                পরিবর্তনের অবস্থা
              </p>

              <p className={`mt-2 text-xl font-bold ${changeColor}`}>
                {changeLabel}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">
                শতকরা পরিবর্তন
              </p>

              <p className={`mt-2 text-3xl font-extrabold ${changeColor}`}>
                {hasChange
                  ? `${change > 0 ? "+" : ""}${rawChange}%`
                  : "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Market Comparison */}
    
{/* Market Comparison */}
<section
  id="market-comparison"
  className="scroll-mt-8 py-10 text-gray-900"
>
  <h2 className="text-2xl font-bold">
    বাজারভিত্তিক দামের তুলনা
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম দেখুন।
  </p>

  {markets.length > 0 ? (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-300">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-500">
            <th className="px-5 py-4 font-semibold">বাজার</th>
            <th className="px-5 py-4 font-semibold">বিভাগ</th>
            <th className="px-5 py-4 font-semibold">সর্বনিম্ন</th>
            <th className="px-5 py-4 font-semibold">সর্বাধিক</th>
            <th className="px-5 py-4 font-semibold">গড়</th>
          </tr>
        </thead>

        <tbody>
          {markets.map((market, index) => {
            const min = Number(
              getMarketPrice(market, ["min", "minPrice", "priceMin"])
            );

            const max = Number(
              getMarketPrice(market, ["max", "maxPrice", "priceMax"])
            );

            const hasMin = Number.isFinite(min);
            const hasMax = Number.isFinite(max);

            const average =
              hasMin && hasMax ? (min + max) / 2 : null;

            return (
              <tr
                key={market.id || market.name || market.nameBn || index}
                className="border-b border-gray-200 last:border-0"
              >
                <td className="px-5 py-4 font-medium">
                  {market.nameBn ||
                    market.name ||
                    market.marketName ||
                    `বাজার ${index + 1}`}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {market.division ||
                    market.divisionNameBn ||
                    market.divisionBn ||
                    market.city ||
                    "—"}
                </td>

                <td className="px-5 py-4 font-semibold text-green-700">
                  {hasMin ? formatPrice(min) : "—"}
                </td>

                <td className="px-5 py-4 font-semibold text-red-600">
                  {hasMax ? formatPrice(max) : "—"}
                </td>

                <td className="px-5 py-4 font-semibold">
                  {average !== null
                    ? formatPrice(Number(average.toFixed(2)))
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-5 py-10 text-center">
      <p className="text-4xl">🏪</p>

      <h3 className="mt-4 font-bold">
        বাজারের তথ্য পাওয়া যায়নি
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        এই পণ্যের API-তে বাজারভিত্তিক তথ্য নেই।
      </p>
    </div>
  )}
</section>


        {/* Footer */}
        <section className="flex flex-col gap-4 border-t border-gray-300 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">
              আরও পণ্যের দাম দেখতে চান?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              সব পণ্যের তালিকা দেখতে হোম পেজে ফিরে যান।
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-lime-600"
          >
            ← সব পণ্য দেখুন
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <Suspense fallback={<LoadingProduct />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
