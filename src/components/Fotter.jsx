
const Fotter = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left Side */}
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
              🛒
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                বাজার দর
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex max-w-md items-start gap-2 rounded-xl bg-amber-50 p-3 sm:max-w-sm">
            <span className="mt-0.5 text-lg" aria-hidden="true">
              ⚠️
            </span>

            <p className="text-sm leading-6 text-gray-600">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
              পরিবর্তিত হয়।
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Fotter;
