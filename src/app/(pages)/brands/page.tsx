import Link from "next/link";
import { getAllBrands } from "@/app/api/brand.api";
import BrandListClient from "@/app/_components/BrandListClient/BrandListClient";

export default async function BrandsPage() {
  const response = await getAllBrands();

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute -top-[10%] -right-[10%] h-125 w-125 rounded-full bg-blue-50/50 blur-3xl opacity-60" />

      <div className="relative container mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-gray-400 mb-10">
          <Link href="/" className="hover:text-[#864227] transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#864227] font-bold">All Brands</span>
        </nav>

        <div className="mb-16 border-l-4 border-[#864227] pl-6">
          <h1 className="mt-2 text-4xl md:text-6xl text-[#1f1e1d]">
            Egyptian <br />
            <span className="text-[#864227]">Brands.</span>
          </h1>
        </div>
        <BrandListClient brands={response} />
      </div>
    </main>
  );
}
