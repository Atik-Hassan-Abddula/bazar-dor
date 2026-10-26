
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDate(formattedDate);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
       
<Image
  src="/logo-icon.png"
  alt="BazarDor Logo"
  width={48}
  height={48}
  priority
  className="rounded-xl border border-emerald-100 bg-white p-1 object-contain shadow-sm"
/>


          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-600">
              BazarDor
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Your Daily Shopping Partner
            </p>

            <p className="mt-1 text-xs font-medium text-gray-600">
              {date}
            </p>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/sign-in"
            className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:px-5"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:px-5"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
