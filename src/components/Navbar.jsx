
"use client";

import AuthButton from "@/components/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "All Products",
    href: "/products",
    icon: "🛒",
  },
  {
    name: "Price Up",
    href: "/price-up",
    icon: "📈",
  },
  {
    name: "Price Down",
    href: "/price-down",
    icon: "📉",
  },
];

export default function Navbar() {
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Main Navbar */}
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2"
          aria-label="BazarDor Home"
        >
          <Image
            src="/logo-icon.png"
            alt="BazarDor Logo"
            width={48}
            height={48}
            priority
            className="h-9 w-9 shrink-0 rounded-lg object-contain sm:h-11 sm:w-11"
          />

          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-emerald-600 sm:text-2xl">
              BazarDor
            </h1>

            <p className="hidden text-xs text-gray-500 md:block">
              Your Daily Shopping Partner
            </p>

            <p className="mt-0.5 text-[9px] leading-tight text-gray-500 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation: Laptop/Desktop Only */}
        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold transition xl:px-3 ${
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Authentication Buttons: Always Outside Menu */}
        <div className="ml-auto flex shrink-0 items-center">
          <AuthButton />
        </div>

        {/* Hamburger: Mobile and Tablet Only */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600 sm:h-10 sm:w-10 lg:hidden"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
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
              width="25"
              height="25"
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

      {/* Mobile/Tablet Dropdown Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-100 bg-white px-3 py-3 shadow-md lg:hidden sm:px-5"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-gray-100 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
