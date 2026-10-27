
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const { data: resData, error } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.remember === "on",
          callbackURL:'/'
        });

      if (error) {
        setErrorMessage(
          error.message || "Sign in failed. Please try again."
        );
        return;
      }

      setSuccessMessage("Sign in successful!");
      console.log("Sign In Successful:", resData);

      window.location.href = "/";
    } catch (error) {
      console.error("Sign In Error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
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

        {/* Sign In Form */}
        <section className="rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Sign in
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              আপনার অ্যাকাউন্টে প্রবেশ করুন এবং বাজারদর দেখুন।
            </p>
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              className="mb-5 rounded-xl bg-green-50 p-3 text-sm text-green-700"
            >
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-green-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute inset-y-0 right-4 text-sm font-medium text-gray-500 hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 accent-green-600"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          © BazarDor. All rights reserved.
        </p>
      </div>
    </main>
  );
}
