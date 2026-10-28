
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 text-8xl font-extrabold tracking-tight text-emerald-600">
          404
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mb-8 leading-7 text-gray-500">
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
