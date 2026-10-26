
"use client";

import { useMemo, useState } from "react";

export default function ProductSorting({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => {
    const items = [...safeProducts];

    switch (sortBy) {
      case "price-low":
        return items.sort(
          (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0)
        );

      case "price-high":
        return items.sort(
          (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0)
        );

      case "name":
        return items.sort((a, b) =>
          (a.nameBn ?? a.name ?? "").localeCompare(
            b.nameBn ?? b.name ?? "",
            "bn"
          )
        );

      case "change-high":
        return items.sort(
          (a, b) =>
            Number(b.change?.pct ?? 0) -
            Number(a.change?.pct ?? 0)
        );

      default:
        return items;
    }
  }, [safeProducts, sortBy]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট {sortedProducts.length}টি পণ্য
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
            <option value="change-high">দামের বৃদ্ধি: বেশি আগে</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <section className="rounded-xl border bg-white p-8 text-center">
          <p className="text-4xl">🛒</p>

          <h2 className="mt-3 font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product, index) => (
            <article
              key={product.id ?? product.slug ?? index}
              className="flex min-h-[280px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3">
                <span
                  className="text-6xl"
                  role="img"
                  aria-label={product.nameBn ?? "পণ্য"}
                >
                  {product.image || "🛍️"}
                </span>
              </div>

              <h2 className="line-clamp-2 font-bold text-gray-800">
                {product.nameBn ?? product.name ?? "পণ্যের নাম"}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                একক: {product.unit ?? "প্রযোজ্য নয়"}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="text-lg font-bold text-green-700">
                  ৳{product.today ?? "—"}
                  {product.unit ? ` / ${product.unit}` : ""}
                </span>

                {product.change && (
                  <span
                    className={`text-sm font-semibold ${
                      product.change.dir === "up"
                        ? "text-red-600"
                        : product.change.dir === "down"
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "↑"
                      : product.change.dir === "down"
                        ? "↓"
                        : ""}
                    {" "}
                    {product.change.pct ?? 0}%
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-gray-400">
                গতকাল: ৳{product.yesterday ?? "—"}
              </p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
