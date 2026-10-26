import AllProducts from "@/components/AllProducts";
import Groceries from "@/components/Groceries";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

export default function Home() {
  return (
    <div >
     <Groceries></Groceries>
     <Marquee></Marquee>
     <Hero></Hero>
     <PriceUp></PriceUp>
     <PriceDown></PriceDown>
     <AllProducts></AllProducts>
    </div>
  );
}
