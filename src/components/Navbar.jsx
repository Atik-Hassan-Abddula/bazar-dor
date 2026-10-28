
"use client";

import AuthButton from "@/components/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const today = new Date();

    setDate(
      today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="container mx-auto flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo-icon.png"
            alt="BazarDor Logo"
            width={48}
            height={48}
            priority
            className="h-10 w-10 shrink-0 rounded-xl border border-emerald-100 bg-white p-1 object-contain shadow-sm sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-emerald-600 sm:text-2xl">
              BazarDor
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Your Daily Shopping Partner
            </p>

            <p className="mt-1 text-[10px] font-medium leading-tight text-gray-600 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        {/* Desktop Authentication Buttons */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <AuthButton />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600 sm:hidden"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-sm sm:hidden">
          <div
            className="flex flex-col gap-3"
            onClick={(event) => {
              if (event.target.closest("a")) {
                setMenuOpen(false);
              }
            }}
          >
            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
