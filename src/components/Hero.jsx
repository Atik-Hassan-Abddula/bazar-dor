
import Image from "next/image";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const Hero = async () => {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch BazarDor products");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <section className="mx-auto max-w-7xl px-3 py-2 sm:px-5 pt-7">
      <div className="flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-[#f8fcf9] px-5 py-5 sm:flex-row sm:items-center sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold text-green-700">
            BazarDor • Daily Market Prices
          </p>

          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
            Today's Market Prices at a Glance
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Discover the latest prices of rice, lentils, oil,
            vegetables, fish, and meat in one place. Make
            informed shopping decisions at the right prices.
          </p>

          <p className="mt-2 text-xs text-green-700">
            Information available for {products.length} products
          </p>

          <a
            href="#products"
            className="mt-4 inline-flex rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            View All Prices
          </a>
        </div>

        <div className="mt-4 flex justify-center sm:ml-6 sm:mt-0">
          <Image
            src="/bazar-hero.png"
            width={300}
            height={100}
            alt="BazarDor Market"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
