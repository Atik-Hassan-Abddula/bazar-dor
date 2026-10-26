const Fotter = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Footer Main Content */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Logo and Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🛒
              </span>

              <h2 className="text-xl font-extrabold text-gray-900">
                বাজার <span className="text-green-600">দর</span>
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              প্রয়োজনীয় পণ্যের দাম এক নজরে। প্রতিদিনের বাজারদর জানুন
              সহজেই এবং সচেতনভাবে আপনার কেনাকাটার পরিকল্পনা করুন।
            </p>
          </div>

          {/* Disclaimer */}
          <div className="max-w-md rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">
                ⚠️
              </span>

              <div>
                <h3 className="font-bold text-gray-800">
                  গুরুত্বপূর্ণ তথ্য
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  প্রদর্শিত বাজারদর পরিবর্তনশীল হতে পারে। কেনার আগে
                  স্থানীয় বাজার থেকে পণ্যের প্রকৃত দাম যাচাই করে নিন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          © 2026 বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Fotter;