
import Link from "next/link";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const englishNames = {
  "কাঁচামরিচ": "Green Chili",
  "কাঁচা মরিচ": "Green Chili",
  "মাখন (১০০ গ্রাম)": "Butter (100g)",
  "মাখন (100 গ্রাম)": "Butter (100g)",
  "মাখন (১০০গ্রাম)": "Butter (100g)",
  "পেঁয়াজ": "Onion",
  "পেঁয়াজ": "Onion",
  "আলু": "Potato",
  "রসুন": "Garlic",
  "স্বর্ণমাছি চাল": "Swarna Machi Rice",
  "মিনিকেট চাল": "Miniket Rice",
  "নাজির চাল": "Nazir Rice",
  "বাটাম সাইজ চাল": "Batam Size Rice",

  // Lentils
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (Peeled)",

  // Oil
  "পাম তেল": "Palm Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",

  // Fish
  "তেলাপিয়া": "Tilapia",
  "চিংড়ি মাছ (খোলা)": "Loose Shrimp",

  // Spices
  "মরিচ গুঁড়া": "Chili Powder",
  "ধনেপাতা গুঁড়া": "Coriander Leaf Powder",
  "আদা": "Ginger",
  "টমেটো": "Tomato",
  "বেগুন": "Eggplant",
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

const translateName = (name) => {
  if (typeof name !== "string" || !name.trim()) {
    return "Product";
  }

  const normalizedName = name.trim().replace(/\s+/g, " ");

  return englishNames[normalizedName] || normalizedName;
};

const getProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  if (Array.isArray(data?.products)) return data.products;

  return [];
};

const AllProducts = async () => {
  let products = [];

  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    products = getProducts(data);
  } catch (error) {
    console.error("AllProducts API Error:", error);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Section Heading */}
      <div className="mb-5 flex min-h-10 items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          🛒 All Products
        </h2>

        <span className="shrink-0 text-sm font-semibold text-gray-600">
          {products.length} Products
        </span>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            const productId =
              product.slug ?? product.id ?? product._id;

            const productName = translateName(
              product.name ??
                product.nameBn ??
                product.title ??
                product.titleBn
            );

            const rawCategory =
              product.categoryName ??
              product.categoryNameBn ??
              product.category?.name ??
              product.category?.nameBn ??
              product.category;

            const categoryName = translateName(
              typeof rawCategory === "object"
                ? rawCategory?.name ?? rawCategory?.nameBn
                : rawCategory ?? "Essential Goods"
            );

            return (
              <Link
                key={product.id ?? product.slug ?? product._id ?? index}
                href={`/products/${encodeURIComponent(String(productId))}`}
                aria-label={`View full details for ${productName}`}
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
                          alt={productName}
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
                          {categoryName}
                        </p>
                      </div>
                    </div>

                    {/* Price Change */}
                    {isUp && (
                      <span className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-bold text-red-600">
                        ▲ {Math.abs(Number(product.change?.pct ?? 0))}%
                      </span>
                    )}

                    {isDown && (
                      <span className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-bold text-green-700">
                        ▼ {Math.abs(Number(product.change?.pct ?? 0))}%
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
                      Today&apos;s Market Price
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
                      Yesterday:{" "}
                      {product.yesterday !== null &&
                      product.yesterday !== undefined
                        ? `৳${Number(product.yesterday).toLocaleString("en-BD")}`
                        : "—"}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-gray-600">
                      View Details →
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 py-8 text-center text-gray-500">
          No products found.
        </p>
      )}
    </section>
  );
};

export default AllProducts;
