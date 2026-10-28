
import AllProducts from "@/components/AllProducts";

export const metadata = {
  title: "All Products | BazarDor",
  description: "Explore daily essential product prices on BazarDor.",
};

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AllProducts />
    </main>
  );
}
