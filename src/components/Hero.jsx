import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-8 lg:gap-14 lg:px-8 lg:py-20">
        {/* Hero Content */}
        <div className="min-w-0 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur sm:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            Bangladesh Daily Market Prices
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            Shop Smarter.
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Save More.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 md:mx-0 lg:text-lg">
            Stay ahead of daily market prices. Explore essential groceries,
            compare prices, and discover what is getting cheaper or more
            expensive before your next shopping trip.
          </p>

          {/* One Unique CTA Button */}
          <div className="mt-7 flex justify-center md:justify-start sm:mt-8">
            <Link
              href="#সব-পণ্য"
              className="group inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 sm:w-auto sm:max-w-none sm:text-base"
            >
              <span>Explore Market Prices</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-gray-600 sm:text-sm md:justify-start">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                ✓
              </span>
              Daily Price Tracking
            </span>

            <span className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                ✓
              </span>
              Smarter Shopping
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full min-w-0 max-w-lg md:max-w-none">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-200/50 to-lime-100/50 blur-2xl" />

          <div className="relative rounded-3xl border border-white/80 bg-white/80 p-3 shadow-2xl shadow-emerald-950/10 backdrop-blur sm:p-4">
            <div className="overflow-hidden rounded-2xl bg-emerald-50">
              <img
                src="/bazar-hero.png"
                alt="Fresh groceries and essential market products"
                fetchPriority="high"
                className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-105 sm:aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]"
              />
            </div>

            {/* Floating Price Card */}
            <div className="absolute -left-2 top-8 max-w-[170px] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-5 sm:top-10 sm:max-w-[190px] sm:p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                  🛒
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500">
                    Your Daily Market
                  </p>
                  <p className="text-sm font-bold text-gray-900 sm:text-base">
                    All in one place
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Feature Card */}
            <div className="absolute -bottom-4 right-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:bottom-5 sm:right-5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl">
                  📊
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Price Insights
                  </p>
                  <p className="text-xs text-gray-500">
                    Compare before you buy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}