"use client";

import { useState } from "react";
import BrandCard from "../../_components/cards/BrandCard/BrandCard";
import { ArrowRight } from 'lucide-react';
import Link from "next/link"; 

const brands = [
    { id: 1, name: "Dr Rose", category: "Skin Care", logoUrl: "/logo1.png", description: "Luxury skincare" },
    { id: 2, name: "Taif", category: "Handmade", logoUrl: "/logo2.png", description: "Handmade art" },
    { id: 3, name: "Brand 3", category: "Printing", logoUrl: "/logo3.png", description: "Printing solutions" },
    { id: 4, name: "Brand 4", category: "Fashion", logoUrl: "/logo4.png", description: "Fashion brand" },
    { id: 5, name: "Brand 5", category: "Food", logoUrl: "/logo5.png", description: "Food  brand" },
    { id: 6, name: "Brand 6", category: "Tech", logoUrl: "/logo6.png", description: "Tech brand" },
    { id: 7, name: "Brand 7", category: "Beauty", logoUrl: "/logo7.png", description: "Beauty brand" },
    { id: 8, name: "Brand 8", category: "Art", logoUrl: "/logo8.png", description: "Art brand" },
];

const ITEMS_PER_PAGE = 6; 

export default function BrandsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(brands.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedBrands = brands.slice(startIndex, endIndex);

    return (
        <main className="relative  min-h-screen bg-white overflow-hidden">
          
            <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl opacity-60" />
            <div className="absolute top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-purple-50/50 blur-3xl opacity-60" />

            <div className="relative container mx-auto px-6 py-10">
                
               
                <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-gray-400 mb-10">
                    <Link href="/" className="hover:text-[#864227] transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-[#864227] font-bold">All Brands</span>
                </nav>
               
                <div className="mb-16 border-l-4 border-[#864227] pl-6">
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#864227]/80">
                        Our Partners
                    </span>

                    <h1 className="mt-2 text-4xl md:text-6xl  text-[#1f1e1d]">
                        Egyptian <br />
                        <span className="text-[#864227]">
                            Brands.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-lg text-gray-500 font-light leading-relaxed">
                        Supporting local makers and creators. Discover premium products crafted with passion.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {paginatedBrands.map((brand) => (
                        <BrandCard
                            key={brand.id}
                            id={brand.id}
                            name={brand.name}
                            category={brand.category}
                            logoUrl={brand.logoUrl}
                            description={brand.description}
                        />
                    ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-6 mt-20 border-t border-gray-100 pt-10">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-[#864227] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#864227] hover:text-white hover:border-[#864227] shadow-sm"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </button>

                        <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-400 uppercase tracking-widest">Page</span>
                             <span className="text-lg font-bold text-slate-800">{currentPage}</span>
                             <span className="text-xs text-gray-400 uppercase tracking-widest mx-1">of</span>
                             <span className="text-lg font-bold text-slate-800">{totalPages}</span>
                        </div>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-[#864227] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#864227] hover:text-white hover:border-[#864227] shadow-sm"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}