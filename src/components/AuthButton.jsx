
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(
          error.message || "Sign out failed. Please try again."
        );
        return;
      }

      toast.success("Signed out successfully!");

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign Out Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-gray-700 sm:block">
          Hi, {session.user.name}
        </span>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-xl border border-green-700 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-50"
      >
        Sign In
      </Link>

      <Link
        href="/sign-up"
        className="rounded-xl bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-800"
      >
        Sign Up
      </Link>
    </div>
  );
}
