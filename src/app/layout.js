
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Groceries from "@/components/Groceries";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import PriceUp from "@/components/PriceUp";
import PriceDown from "@/components/PriceDown";
import Fotter from "@/components/Fotter";
import AllProducts from "@/components/AllProducts";

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
      <body className="min-h-screen flex flex-col">
        <Navbar />
       

        <main className="">
          {children}
           <Fotter></Fotter>
        </main>
      </body>
    </html>
  );
}
