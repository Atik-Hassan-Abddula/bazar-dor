
import Link from "next/link";
import { Suspense } from "react";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const englishNames = {
  "স্বর্ণমাছি চাল": "Swarna Machi Rice",
  "মিনিকেট চাল": "Miniket Rice",
  "নাজির চাল": "Nazir Rice",
  "বাটাম সাইজ চাল": "Batam Size Rice",
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (Peeled)",
  "মসুর ডাল": "Red Lentils",
  "মুগ ডাল": "Mung Beans",
  "ছোলা": "Chickpeas",
  "পাম তেল": "Palm Oil",
  "সরিষার তেল": "Mustard Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",
  "কাঁচামরিচ": "Green Chili",
  "কাঁচা মরিচ": "Green Chili",
  "মাখন (১০০ গ্রাম)": "Butter (100g)",
  "মাখন (100 গ্রাম)": "Butter (100g)",
  "পেঁয়াজ": "Onion",
  "পেঁয়াজ": "Onion",
  "আলু": "Potato",
  "রসুন": "Garlic",
  "আদা": "Ginger",
  "টমেটো": "Tomato",
  "বেগুন": "Eggplant",
  "মরিচ": "Chili",
  "মরিচ গুঁড়া": "Chili Powder",
  "ধনেপাতা গুঁড়া": "Coriander Leaf Powder",
  "শসা": "Cucumber",
  "গাজর": "Carrot",
  "ফুলকপি": "Cauliflower",
  "বাঁধাকপি": "Cabbage",
  "লাউ": "Bottle Gourd",
  "মিষ্টি কুমড়া": "Pumpkin",
  "পালং শাক": "Spinach",
  "লাল শাক": "Red Amaranth",
  "ঢেঁড়স": "Okra",
  "করলা": "Bitter Gourd",
  "পটল": "Pointed Gourd",
  "বরবটি": "Yardlong Beans",
  "লেবু": "Lemon",
  "কলা": "Banana",
  "আপেল": "Apple",
  "কমলা": "Orange",
  "আম": "Mango",
  "পেঁপে": "Papaya",
  "আনারস": "Pineapple",
  "তরমুজ": "Watermelon",
  "পেয়ারা": "Guava",
  "গরুর মাংস": "Beef",
  "খাসির মাংস": "Mutton",
  "মুরগির মাংস": "Chicken",
  "মুরগি": "Chicken",
  "সোনালি মুরগি": "Sonali Chicken",
  "ব্রয়লার মুরগি": "Broiler Chicken",
  "হাঁসের মাংস": "Duck Meat",
  "দেশি হাঁসের মাংস": "Local Duck Meat",
  "হাঁস": "Duck",
  "রুই মাছ": "Rohu Fish",
  "কাতলা মাছ": "Catla Fish",
  "ইলিশ মাছ": "Hilsa Fish",
  "তেলাপিয়া": "Tilapia",
  "তেলাপিয়া মাছ": "Tilapia Fish",
  "পাঙ্গাস মাছ": "Pangasius Fish",
  "চিংড়ি": "Shrimp",
  "চিংড়ি মাছ (খোলা)": "Loose Shrimp",
  "ডিম": "Eggs",
  "দুধ": "Milk",
  "দই": "Yogurt",
  "সয়াবিন তেল": "Soybean Oil",
  "লবণ": "Salt",
  "চিনি": "Sugar",
  "আটা": "Wheat Flour",
  "ময়দা": "All-Purpose Flour",
  "হলুদ": "Turmeric",
  "জিরা": "Cumin",
  "ধনিয়া": "Coriander",
};

const englishCategories = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dui": "Eggs & Dairy",
  mosla: "Spices",
  "ডিম-দুধ": "Eggs & Dairy",
  "চাল": "Rice",
  "ডাল": "Lentils",
  "তেল": "Oil",
  "সবজি": "Vegetables",
  "শাকসবজি": "Vegetables",
  "মাছ": "Fish",
  "মাংস": "Meat",
  "মসলা": "Spices",
  "ফল": "Fruits",
  "ফলমূল": "Fruits",
  "মুদি": "Groceries",
  "পানীয়": "Beverages",
  "বেকারি": "Bakery",
  "স্ন্যাকস": "Snacks",
  "হিমায়িত খাবার": "Frozen Food",
};

const englishMarkets = {
  "কারওয়ান বাজার": "Karwan Bazar",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌদগ্রাম বাজার": "Chauddagram Bazar",
  "আমতলী বাজার": "Amtali Bazar",
  "সদর বাজার": "Sadar Bazar",
  "বাসারহাট বাজার": "Basarhat Bazar",
  "মাঠ বাজার": "Math Bazar",
  "চৌর বাজার": "Chour Bazar",
  "বাজারহাট": "Bazarhat",
  "ডবলগেট বাজার": "Double Gate Bazar",
  "আমবাজার": "Am Bazar",
  "চৌরাস্তা বাজার": "Chourasta Bazar",
};

const englishDivisions = {
  "ঢাকা": "Dhaka",
  "চট্টগ্রাম": "Chattogram",
  "রাজশাহী": "Rajshahi",
  "ময়মনসিংহ": "Mymensingh",
  "খুলনা": "Khulna",
  "সিলেট": "Sylhet",
  "বরিশাল": "Barishal",
  "রংপুর": "Rangpur",
};

function translateName(name) {
  if (typeof name !== "string" || !name.trim()) {
    return "Product";
  }

  const normalizedName = name.trim().replace(/\s+/g, " ");

  return englishNames[normalizedName] || normalizedName;
}

function translateCategory(category, categoryName) {
  const value =
    typeof categoryName === "string" && categoryName.trim()
      ? categoryName.trim()
      : typeof category === "string"
        ? category.trim()
        : "";

  return englishCategories[category] ||
    englishCategories[value] ||
    translateName(value || "Product");
}

function translateMarket(market) {
  return englishMarkets[market] || market || "Market";
}

function translateDivision(division) {
  return englishDivisions[division] || division || "—";
}

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
          Loading product information...
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
          Product Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Please check the product URL and try again.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border border-gray-300 px-5 py-3 font-semibold transition hover:border-lime-600"
        >
          ← Back to Home
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

  const productName = translateName(
    product.name ?? product.nameBn ?? product.title ?? product.titleBn
  );

  const categoryName = translateCategory(
    product.category,
    product.categoryName ?? product.categoryNameBn
  );

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
    ? "Price Increased"
    : isDown
      ? "Price Decreased"
      : "No Price Change";

  const history = [
    {
      title: "Today's Price",
      price: product.today,
      description: "Current market price",
    },
    {
      title: "Yesterday's Price",
      price: product.yesterday,
      description: "Previous day's market price",
    },
    {
      title: "Last Week's Price",
      price: product.lastWeek,
      description: "Price one week ago",
    },
    {
      title: "Last Month's Price",
      price: product.lastMonth,
      description: "Price one month ago",
    },
  ];

  return (
    <main className="min-h-screen text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-lime-700">
            Home
          </Link>

          <span>/</span>

          <span>{categoryName}</span>

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
                {product.categoryIcon || "🛒"} {categoryName}
              </span>

              <span className="text-sm font-medium text-green-700">
                ● Market Price Information
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
              {productName}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Explore the current market price, historical prices, and
              price comparisons across different markets.
            </p>

            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Today's Market Price
              </p>

              <p className="mt-2 text-4xl font-extrabold sm:text-5xl">
                {formatPrice(product.today)}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Per {product.unit || "unit"}
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
                Price History ↓
              </a>

              <a
                href="#market-comparison"
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-lime-600"
              >
                Compare Markets
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
          <h2 className="text-2xl font-bold">Price History</h2>

          <p className="mt-2 text-sm text-gray-500">
            Compare market prices across different time periods.
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
          <h2 className="text-2xl font-bold">Price Changes</h2>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Price Trend
              </p>

              <p className={`mt-2 text-xl font-bold ${changeColor}`}>
                {changeLabel}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">
                Percentage Change
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
        <section
          id="market-comparison"
          className="scroll-mt-8 py-10 text-gray-900"
        >
          <h2 className="text-2xl font-bold">
            Market Price Comparison
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Compare the minimum, maximum, and average prices across markets.
          </p>

          {markets.length > 0 ? (
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-300">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-5 py-4 font-semibold">Market</th>
                    <th className="px-5 py-4 font-semibold">Division</th>
                    <th className="px-5 py-4 font-semibold">Minimum</th>
                    <th className="px-5 py-4 font-semibold">Maximum</th>
                    <th className="px-5 py-4 font-semibold">Average</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const minValue = getMarketPrice(market, [
                      "min",
                      "minPrice",
                      "priceMin",
                    ]);

                    const maxValue = getMarketPrice(market, [
                      "max",
                      "maxPrice",
                      "priceMax",
                    ]);

                    const min =
                      minValue !== null ? Number(minValue) : NaN;

                    const max =
                      maxValue !== null ? Number(maxValue) : NaN;

                    const hasMin = Number.isFinite(min);
                    const hasMax = Number.isFinite(max);

                    const average =
                      hasMin && hasMax ? (min + max) / 2 : null;

                    const marketName = translateMarket(
                      market.market ??
                        market.nameBn ??
                        market.name ??
                        market.marketName
                    );

                    const divisionName = translateDivision(
                      market.division ??
                        market.divisionNameBn ??
                        market.divisionBn ??
                        market.city
                    );

                    return (
                      <tr
                        key={
                          market.id ||
                          market.market ||
                          market.name ||
                          index
                        }
                        className="border-b border-gray-200 last:border-0"
                      >
                        <td className="px-5 py-4 font-medium">
                          {marketName}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {divisionName}
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
                No Market Data Available
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Market-specific information is not available for this product.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <section className="flex flex-col gap-4 border-t border-gray-300 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">
              Want to explore more products?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Return to the home page to browse all products.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-lime-600"
          >
            ← View All Products
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
