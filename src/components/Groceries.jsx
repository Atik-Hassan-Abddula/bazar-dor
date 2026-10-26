
import React from "react";

const Groceries = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch grocery categories");
  }

  const data = await res.json();

  const categories = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <section className="container mx-auto px-4 py-5">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <span className="text-2xl" aria-hidden="true">
              {category.icon}
            </span>

            <h2 className="whitespace-nowrap font-semibold text-gray-800">
              {category.nameBn}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Groceries;
