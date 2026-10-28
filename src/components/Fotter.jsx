const Fotter = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: Logo and Description */}
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              🛒
            </span>

            <p className="text-sm font-medium text-gray-700">
              BazarDor — Essential product prices at a glance.
            </p>
          </div>

          {/* Right: Price Disclaimer */}
          <p className="max-w-xl text-sm leading-6 text-gray-500 md:text-right">
            All prices are indicative and may vary depending on market
            conditions.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          © 2026 BazarDor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Fotter;