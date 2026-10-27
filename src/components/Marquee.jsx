import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <section className=" ">
      <div className="overflow-hidden">
        <MarqueeText duration={30} direction="right">
          <div className="flex min-h-10 items-center">
            {products.map((product) => {
              const isUp = product.change?.dir === "up";

              return (
                <div
                  key={product.id}
                  className="flex shrink-0 items-center gap-2 border-r px-5 py-2 text-sm"
                >
                  <span className="text-base">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>

                  <span className="whitespace-nowrap font-medium text-gray-800">
                    {product.name}
                  </span>

                  <span className="whitespace-nowrap text-gray-700">
                    {product.today} BDT/kg
                  </span>

                  <span
                    className={`whitespace-nowrap font-bold ${
                      isUp ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"} {product.change?.pct ?? 0}%
                  </span>
                </div>
              );
            })}
          </div>
        </MarqueeText>
      </div>

      <div className="h-[3px] w-full" />
    </section>
  );
};

export default Marquee;