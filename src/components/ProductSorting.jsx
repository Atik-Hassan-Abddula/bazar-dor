
"use client";

import { useMemo, useState } from "react";

const productTranslations = {
  "কাঁচামরিচ": "Green Chili",
  "কাঁচা মরিচ": "Green Chili",
  "মাখন (১০০ গ্রাম)": "Butter (100g)",
  "মাখন (100 গ্রাম)": "Butter (100g)",
  "মাখন (১০০গ্রাম)": "Butter (100g)",
  "আলু": "Potato",
  "পেঁয়াজ": "Onion",
  "পেঁয়াজ": "Onion",
  "রসুন": "Garlic",
  "স্বর্ণমাছি চাল": "Swarna Machi Rice",
  "মিনিকেট চাল": "Miniket Rice",
  "নাজির চাল": "Nazir Rice",
  "বাটাম সাইজ চাল": "Batam Size Rice",
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (Peeled)",
  "পাম তেল": "Palm Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",
  "তেলাপিয়া": "Tilapia",
  "তেলাপিয়া": "Tilapia",
  "চিংড়ি মাছ (খোলা)": "Loose Shrimp",
  "চিংড়ি মাছ (খোলা)": "Loose Shrimp",
  "মরিচ গুঁড়া": "Chili Powder",
  "মরিচ গুঁড়া": "Chili Powder",
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
  "পেয়ারা": "Guava",
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
  "ময়দা": "All-Purpose Flour",
  "হলুদ": "Turmeric",
  "জিরা": "Cumin",
  "ধনিয়া": "Coriander",
};

const unitTranslations = {
  kg: "kg",
  kilogram: "kg",
  g: "g",
  gram: "g",
  liter: "liter",
  litre: "liter",
  ml: "ml",
  piece: "piece",
  pieces: "pieces",
  dozen: "dozen",
  packet: "packet",
  bottle: "bottle",
  bag: "bag",
  "কেজি": "kg",
  "কিলোগ্রাম": "kg",
  "গ্রাম": "g",
  "লিটার": "liter",
  "মিলিলিটার": "ml",
  "পিস": "piece",
  "টি": "piece",
  "ডজন": "dozen",
  "হালি": "4 pieces",
  "প্যাকেট": "packet",
  "বোতল": "bottle",
  "বস্তা": "bag",
};

function translateProductName(product) {
  const rawName =
    product?.nameEn ??
    product?.nameBn ??
    product?.name ??
    product?.productName ??
    product?.productNameBn ??
    product?.title ??
    "Product";

  const name = String(rawName).trim();

  return productTranslations[name] ?? name;
}

function translateUnit(value) {
  const unit = String(value ?? "").trim();

  return unitTranslations[unit] ?? unit;
}

function getPrice(product) {
  const value =
    product?.today ??
    product?.price ??
    product?.currentPrice ??
    product?.pricePerUnit ??
    product?.sellingPrice ??
    0;

  const price = Number(value);

  return Number.isFinite(price) ? price : 0;
}

function getImage(product) {
  return product?.image ?? product?.categoryIcon ?? "🛒";
}

export default function ProductSorting({ products = [] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = Array.isArray(products) ? [...products] : [];

    const filtered = list.filter((product) => {
      const englishName = translateProductName(product).toLowerCase();

      const originalName = String(
        product?.nameBn ??
          product?.name ??
          product?.productName ??
          product?.title ??
          ""
      ).toLowerCase();

      const query = search.trim().toLowerCase();

      return (
        englishName.includes(query) ||
        originalName.includes(query)
      );
    });

    if (sort === "low-high") {
      filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "high-low") {
      filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "name") {
      filtered.sort((a, b) =>
        translateProductName(a).localeCompare(
          translateProductName(b)
        )
      );
    }

    return filtered;
  }, [products, search, sort]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {sortedProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-green-600 sm:w-64"
          />

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-green-600"
          >
            <option value="default">Default sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-gray-800">
            No products found
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Try another search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product, index) => {
            const name = translateProductName(product);
            const image = getImage(product);
            const unit = translateUnit(product?.unit);
            const price = getPrice(product);

            return (
              <article
                key={
                  product?.id ??
                  product?._id ??
                  product?.slug ??
                  `${name}-${index}`
                }
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-48 items-center justify-center overflow-hidden bg-gray-50 p-4">
                  <span
                    className="text-7xl transition-transform duration-300 group-hover:scale-110"
                    role="img"
                    aria-label={name}
                  >
                    {image}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="min-h-12 text-lg font-semibold text-gray-900">
                    {name}
                  </h3>

                  {unit && (
                    <p className="mt-1 text-sm text-gray-500">
                      Unit: {unit}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-lg font-bold text-green-700">
                      ৳{price.toLocaleString("en-BD")}
                      {unit && (
                        <span className="text-xs font-normal text-gray-500">
                          {" "}/ {unit}
                        </span>
                      )}
                    </p>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Price Today
                    </span>
                  </div>

                  {product?.yesterday != null && (
                    <p className="mt-2 text-sm text-gray-500">
                      Yesterday: ৳
                      {Number(product.yesterday).toLocaleString("en-BD")}
                    </p>
                  )}

                  {product?.change?.pct != null && (
                    <p
                      className={`mt-1 text-sm font-medium ${
                        product.change.dir === "up"
                          ? "text-red-600"
                          : product.change.dir === "down"
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {product.change.dir === "up" ? "▲" : ""}
                      {product.change.dir === "down" ? "▼" : ""}
                      {" "}
                      {Math.abs(Number(product.change.pct))}%
                      {" "}
                      {product.change.dir === "up"
                        ? "increase"
                        : product.change.dir === "down"
                          ? "decrease"
                          : "change"}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
