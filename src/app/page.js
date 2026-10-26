
import { Suspense } from "react";

import AllProducts from "@/components/AllProducts";
import Groceries from "@/components/Groceries";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

function SectionLoading() {
  return (
    <div className="flex justify-center py-8">
      <span className="loading loading-spinner loading-md" />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<SectionLoading />}>
        <Groceries />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Marquee />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <PriceUp />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <PriceDown />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
