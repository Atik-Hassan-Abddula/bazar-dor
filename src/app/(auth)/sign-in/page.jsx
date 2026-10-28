"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading || socialLoading) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const { error } = await authClient.signIn.email({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe: formData.get("remember") === "on",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign in failed. Please try again.");
        return;
      }

      toast.success("Sign in successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Sign In Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider) {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || `${provider} sign in failed. Please try again.`
        );
        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} Sign In Error:`, error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setSocialLoading("");
    }
  }

  const isBusy = loading || Boolean(socialLoading);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md min-w-0">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-600 text-2xl">
            🛒
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Bazar<span className="text-green-600">Dor</span>
          </span>
        </Link>

        {/* Sign In Card */}
        <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Sign in
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to your account and explore daily market prices.
            </p>
          </div>

          {/* Email and Password Login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="min-w-0">
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
                disabled={isBusy}
                className="w-full min-w-0 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="min-w-0">
              <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
                <label
                  htmlFor="password"
                  className="shrink-0 text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="shrink-0 whitespace-nowrap text-xs font-medium text-green-700 hover:underline sm:text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative min-w-0">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isBusy}
                  className="w-full min-w-0 rounded-xl border border-gray-300 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isBusy}
                  className="absolute inset-y-0 right-4 text-sm font-medium text-gray-500 hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                disabled={isBusy}
                className="h-4 w-4 accent-green-600"
              />
              Remember me
            </label>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-400">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={isBusy}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.7-3.6-11.3-8.4H5.9v5.3A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.7 27.7a12 12 0 0 1 0-7.4V15H5.9a20 20 0 0 0 0 18Z"
              />
              <path
                fill="#EA4335"
                d="M24 11.9c3 0 5.7 1 7.8 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.9 15l6.8 5.3c1.6-4.8 6-8.4 11.3-8.4Z"
              />
            </svg>

            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          {/* GitHub Sign In */}
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={isBusy}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.73 2.03 3.1 1.54.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "Continue with GitHub"}
          </button>

          {/* Sign Up Link */}
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

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © BazarDor. All rights reserved.
        </p>
      </div>
    </main>
  );
}