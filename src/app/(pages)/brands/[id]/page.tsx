import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import { getSingleBrand } from "@/app/api/brand.api";
import { BrandDetailsResponse } from "@/app/types/brand.type";
import { Product } from "@/app/types/product.type";
import Link from "next/link";
import React from "react";
import { Sparkles } from "lucide-react";

export default async function BrandsDetails({ params }: any) {
  const { id } = await params;

  const response: BrandDetailsResponse = await getSingleBrand(id);
  const hasProducts = response.products && response.products.length > 0;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-gray-400 mb-10">
          <Link href="/" className="hover:text-[#864227] transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/brands"
            className="hover:text-[#864227] transition-colors"
          >
            Brands
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#864227] font-bold">{response.brandName}</span>
        </nav>

        {/* Brand Header Section */}
        <div className="relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-12 bg-[#864227]"></span>
              <span className="text-sm font-bold tracking-[3px] text-[#864227] uppercase">
                Official Brand
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
              {response.brandName}
            </h1>

            <p className="mt-6 text-lg text-gray-500 font-light leading-relaxed">
              Discover the art of minimalist design with {response.brandName}.
              Supporting local makers and creators. Every piece is crafted with
              passion to bring elegance to your home.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mt-8">
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {response.productCount}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Products
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">4.9</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Rating
                </p>
              </div>
            </div>
          </div>

          {/* Background Decorative Text */}
          <div className="hidden md:block opacity-5 select-none pointer-events-none translate-y-4">
            <h2 className="text-[140px] font-bold text-[#864227] leading-none uppercase">
              {response.brandName.split(' ')[0]}
            </h2>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium text-slate-800 underline underline-offset-12 decoration-[#864227]/20">
            Collection
          </h2>
          {hasProducts && (
            <span className="text-sm text-gray-400 font-light">
              Showing{" "}
              <span className="text-slate-800 font-medium">
                {response.productCount}
              </span>{" "}
              items
            </span>
          )}
        </div>

        {/* Products Section / Empty State */}
        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {response.products.map((product: Product) => (
              <ProductCard
                key={product.productId}
                product={product}
                // saved={false}
              />
            ))}
          </div>
        ) : (
          /* Empty State Design */
          <div className="flex flex-col items-center justify-center py-24 bg-[#F9F8F6] rounded-[3rem] border border-dashed border-[#E8E4E0] text-center max-w-5xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 animate-pulse">
              <Sparkles className="w-10 h-10 text-[#D1C7BD]" />
            </div>
            <h3 className="text-[#864227] text-3xl font-serif mb-3">
              Curating New Pieces
            </h3>
            <p className="text-[#796C63] font-light max-w-md mx-auto leading-relaxed px-4">
              We are currently working with <span className="font-semibold">{response.brandName}</span> to bring you their latest handcrafted collection. Stay tuned for something extraordinary.
            </p>
            <Link 
              href="/brands"
              className="mt-8 px-8 py-3 bg-[#864227] text-white text-sm tracking-widest uppercase hover:bg-[#6d351f] transition-all rounded-full"
            >
              Explore Other Brands
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}