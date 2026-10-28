
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
    const query = search.trim().toLowerCase();

    const filtered = list.filter((product) => {
      const englishName = translateProductName(product).toLowerCase();

      const originalName = String(
        product?.nameBn ??
          product?.name ??
          product?.productName ??
          product?.productNameBn ??
          product?.title ??
          ""
      ).toLowerCase();

      return englishName.includes(query) || originalName.includes(query);
    });

    if (sort === "low-high") {
      filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "high-low") {
      filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "name") {
      filtered.sort((a, b) =>
        translateProductName(a).localeCompare(translateProductName(b))
      );
    }

    return filtered;
  }, [products, search, sort]);

  return (
    <section className="w-full min-w-0">
      {/* Responsive heading and controls */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {sortedProducts.length} products found
            </p>
          </div>
        </div>

        {/* Search and sorting */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative min-w-0">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full min-w-0 rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
            className="w-full min-w-0 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">Default sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center sm:px-8">
          <div className="mb-3 text-4xl" aria-hidden="true">
            🔎
          </div>
          <p className="text-lg font-semibold text-gray-800">
            No products found
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try another search term.
          </p>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        /* Responsive product grid */
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product, index) => {
            const name = translateProductName(product);
            const image = getImage(product);
            const unit = translateUnit(product?.unit);
            const price = getPrice(product);
            const yesterday =
              product?.yesterday != null ? Number(product.yesterday) : null;
            const changePct =
              product?.change?.pct != null
                ? Number(product.change.pct)
                : null;

            const changeDir = product?.change?.dir;

            return (
              <article
                key={
                  product?.id ??
                  product?._id ??
                  product?.slug ??
                  `${name}-${index}`
                }
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center overflow-hidden bg-gray-50 p-4 sm:h-44 lg:h-48">
                  <span
                    className="break-words text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl"
                    role="img"
                    aria-label={name}
                  >
                    {image}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="min-h-12 break-words text-base font-semibold leading-6 text-gray-900 sm:text-lg">
                    {name}
                  </h3>

                  {unit && (
                    <p className="mt-1 text-sm text-gray-500">
                      Unit: {unit}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="break-words text-lg font-bold text-green-700">
                      ৳{price.toLocaleString("en-BD")}
                      {unit && (
                        <span className="text-xs font-normal text-gray-500">
                          {" "}/ {unit}
                        </span>
                      )}
                    </p>

                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      Price Today
                    </span>
                  </div>

                  {yesterday !== null && Number.isFinite(yesterday) && (
                    <p className="mt-2 text-sm text-gray-500">
                      Yesterday: ৳{yesterday.toLocaleString("en-BD")}
                    </p>
                  )}

                  {changePct !== null && Number.isFinite(changePct) && (
                    <p
                      className={`mt-1 text-sm font-medium ${
                        changeDir === "up"
                          ? "text-red-600"
                          : changeDir === "down"
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {changeDir === "up"
                        ? "▲ "
                        : changeDir === "down"
                          ? "▼ "
                          : ""}
                      {Math.abs(changePct)}%{" "}
                      {changeDir === "up"
                        ? "increase"
                        : changeDir === "down"
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
