
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // এখানে তোমার registration logic যুক্ত করবে।
    alert("Sign up authentication এখনো যুক্ত করা হয়নি।");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-600 text-2xl">
            🛒
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Bazar<span className="text-green-600">Dor</span>
          </span>
        </Link>

        <section className="rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
              Join BazarDor
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Create account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              নতুন অ্যাকাউন্ট তৈরি করে বাজারদর সম্পর্কে জানুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 text-sm font-medium text-gray-500 hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Password must contain at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create account <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          By creating an account, you agree to our terms and privacy policy.
        </p>
      </div>
    </main>
  );
}
