
import Link from "next/link";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const englishNames = {
  "পেঁয়াজ": "Onion",
  "পেঁয়াজ": "Onion",
  "আলু": "Potato",
  "রসুন": "Garlic",
  "আদা": "Ginger",
  "টমেটো": "Tomato",
  "কাঁচামরিচ": "Green Chili",
"কাঁচা মরিচ": "Green Chili",
"মাখন (১০০ গ্রাম)": "Butter (100g)",
  "বেগুন": "Eggplant",
  "কাঁচা মরিচ": "Green Chili",
  "মরিচ": "Chili",
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
  "চাল": "Rice",
  "মসুর ডাল": "Red Lentils",
  "মুগ ডাল": "Mung Beans",
  "ছোলা": "Chickpeas",
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
  "তেলাপিয়া মাছ": "Tilapia Fish",
  "পাঙ্গাস মাছ": "Pangasius Fish",
  "চিংড়ি": "Shrimp",
  "ডিম": "Eggs",
  "দুধ": "Milk",
  "সয়াবিন তেল": "Soybean Oil",
  "সরিষার তেল": "Mustard Oil",
  "লবণ": "Salt",
  "চিনি": "Sugar",
  "আটা": "Wheat Flour",
  "ময়দা": "All-Purpose Flour",
  "হলুদ": "Turmeric",
  "জিরা": "Cumin",
  "ধনিয়া": "Coriander",
  "সবজি": "Vegetables",
  "ডিম-দুধ": "Eggs & Dairy",
  "শাকসবজি": "Vegetables",
  "ফল": "Fruits",
  "ফলমূল": "Fruits",
  "মাছ": "Fish",
  "মাংস": "Meat",
  "ডাল": "Lentils",
  "তেল": "Oil",
  "মসলা": "Spices",
  "মুদি": "Groceries",
  "পানীয়": "Beverages",
  "বেকারি": "Bakery",
  "স্ন্যাকস": "Snacks",
  "হিমায়িত খাবার": "Frozen Food",
};

function translateName(name) {
  if (!name) return "Product";

  const normalizedName = name.trim().replace(/\s+/g, " ");

  return englishNames[normalizedName] ?? normalizedName;
}

function getProducts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  if (Array.isArray(data?.products)) return data.products;

  return [];
}

const PriceUp = async () => {
  let priceUpProducts = [];

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    priceUpProducts = getProducts(data)
      .filter((product) => product.change?.dir === "up")
      .sort(
        (a, b) =>
          Number(b.change?.pct ?? 0) -
          Number(a.change?.pct ?? 0)
      )
      .slice(0, 6);
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
            🔺 Products with Increased Prices
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Products whose prices have increased in the market
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          {priceUpProducts.length} Products
        </span>
      </div>

      {priceUpProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priceUpProducts.map((product, index) => (
            <Link
              href={`/products/${product.slug ?? product.id ?? product._id}`}
              key={product.id ?? product._id ?? product.slug ?? index}
              className="flex min-h-[240px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="text-3xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-bold text-gray-800">
                      {translateName(
                        product.name ??
                          product.nameBn ??
                          product.title ??
                          product.titleBn
                      )}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {translateName(
                        product.categoryName ??
                          product.categoryNameBn ??
                          product.category?.name ??
                          product.category?.title ??
                          "Essential Goods"
                      )}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg bg-red-50 px-2 py-1.5 text-sm font-bold text-red-600">
                  ↑ {Math.abs(Number(product.change?.pct ?? 0))}%
                </span>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  Today's Market Price
                </p>

                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  ৳{product.today ?? product.price ?? "—"}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    / {product.unit || "kg"}
                  </span>
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  Yesterday: ৳
                  {product.yesterday ?? product.previousPrice ?? "—"}
                </p>

                <p className="mt-3 text-sm font-semibold text-red-600">
                  View Details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-12 text-center">
          <p className="text-4xl">📊</p>

          <h3 className="mt-3 font-bold text-gray-800">
            No Products with Increased Prices Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Please check the API data and try again.
          </p>
        </div>
      )}
    </section>
  );
};

export default PriceUp;
