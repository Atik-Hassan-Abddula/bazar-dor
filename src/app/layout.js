
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Fotter from "@/components/Fotter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BazarDor | Online Shopping",
  description: "Shop your favorite products with BazarDor.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>

        <Fotter />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
          closeOnClick
          pauseOnHover
        />
      </body>
    </html>
  );
}
