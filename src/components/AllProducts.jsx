
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (Peeled)",
  "পাম তেল": "Palm Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",
  "তেলাপিয়া": "Tilapia",
  "চিংড়ি মাছ (খোলা)": "Loose Shrimp",
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

function translateName(name) {
  if (typeof name !== "string" || !name.trim()) {
    return "Product";
  }

  const normalizedName = name.trim().replace(/\s+/g, " ");

  return englishNames[normalizedName] || normalizedName;
}

function getProducts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;

  return [];
}

function formatPrice(price) {
  if (
    price === null ||
    price === undefined ||
    price === "" ||
    !Number.isFinite(Number(price))
  ) {
    return "—";
  }

  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getProductName(product) {
  return translateName(
    product.name ??
      product.nameBn ??
      product.title ??
      product.titleBn
  );
}

function getCategoryName(product) {
  const category =
    product.categoryName ??
    product.categoryNameBn ??
    product.category?.name ??
    product.category?.nameBn ??
    product.category;

  if (typeof category === "object" && category !== null) {
    return translateName(category.name ?? category.nameBn);
  }

  return translateName(category ?? "Essential Goods");
}

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setHasError(false);

        const response = await fetch(API_URL, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status}`
          );
        }

        const data = await response.json();

        setProducts(getProducts(data));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("AllProducts API Error:", error);
          setHasError(true);
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Explore Products
          </p>

          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            🛒 All Products
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Check today's prices of essential products.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          {products.length} Products
        </span>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-12 text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"
            role="status"
            aria-label="Loading products"
          />
          <p className="mt-4 text-sm text-gray-500">
            Loading products...
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            const productId =
              product.slug ?? product.id ?? product._id;

            const productName = getProductName(product);
            const categoryName = getCategoryName(product);

            const percentage = Number(product.change?.pct ?? 0);
            const validPercentage = Number.isFinite(percentage)
              ? Math.abs(percentage)
              : 0;

            const imageUrl =
              typeof product.image === "string" &&
              /^https?:\/\//i.test(product.image)
                ? product.image
                : null;

            const icon =
              product.categoryIcon ||
              (typeof product.image === "string" && !imageUrl
                ? product.image
                : "🛒");

            const hasProductId =
              productId !== null &&
              productId !== undefined &&
              String(productId).length > 0;

            const cardContent = (
              <article className="flex h-full min-h-[245px] flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/5">
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={productName}
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-lg object-contain"
                      />
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                        {icon}
                      </span>
                    )}

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 break-words font-bold text-gray-800">
                        {productName}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                        {categoryName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isUp
                      ? `▲ ${validPercentage}%`
                      : isDown
                        ? `▼ ${validPercentage}%`
                        : "—"}
                  </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-500">
                    Today's Market Price
                  </p>

                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <p className="text-2xl font-extrabold text-gray-900">
                      {formatPrice(product.today)}
                    </p>

                    <span className="text-sm text-gray-500">
                      / {product.unit || "kg"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Yesterday: {formatPrice(product.yesterday)}
                  </p>

                  <p className="mt-3 text-sm font-bold text-emerald-700">
                    View Details <span aria-hidden="true">→</span>
                  </p>
                </div>
              </article>
            );

            if (!hasProductId) {
              return (
                <div
                  key={`product-${index}`}
                  className="h-full"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={String(productId)}
                href={`/products/${encodeURIComponent(String(productId))}`}
                aria-label={`View full details for ${productName}`}
                className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-12 text-center">
          <p className="text-4xl">
            {hasError ? "⚠️" : "🛒"}
          </p>

          <h3 className="mt-4 text-lg font-bold text-gray-800">
            {hasError
              ? "Unable to Load Products"
              : "No Products Found"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {hasError
              ? "We couldn't load the products right now. Please try again later."
              : "There are currently no products available."}
          </p>
        </div>
      )}
    </section>
  );
}
