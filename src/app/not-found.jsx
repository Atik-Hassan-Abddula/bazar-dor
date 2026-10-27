
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-green-100 text-7xl shadow-inner">
            🛒
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-green-600 sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          Sorry! The page you are looking for does not exist,
          may have been moved, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-400">
          BazarDor — Your Daily Market Companion
        </p>
      </div>
    </main>
  );
}
