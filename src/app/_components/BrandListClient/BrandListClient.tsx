"use client";
import { useState } from "react";
import BrandCard from "../../_components/cards/BrandCard/BrandCard";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/app/types/brand.type";

export default function BrandListClient({ brands }: { brands: Brand[] }) {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(brands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBrands = brands.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedBrands.map((brand) => (
          <BrandCard key={brand.brandId} brand={brand} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-20 border-t border-gray-100 pt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-[#0288D1] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0288D1] hover:text-white hover:border-[#0288D1] shadow-sm"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Page
            </span>
            <span className="text-lg font-bold text-slate-800">
              {currentPage}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-widest mx-1">
              of
            </span>
            <span className="text-lg font-bold text-slate-800">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-[#0288D1] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0288D1] hover:text-white hover:border-[#0288D1] shadow-sm"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
