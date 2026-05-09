import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import { getSingleCategory } from "@/app/api/category.api";
import { SingleCategoryResponse } from "@/app/types/category.type";
import { Product } from "@/app/types/product.type";
import React from "react";
import { ShoppingBag } from "lucide-react";

export default async function page({ params }: any) {
  const { id } = await params;

  const response: SingleCategoryResponse = await getSingleCategory(id);
  const hasProducts = response.products && response.products.length > 0;

  return (
    <div className="container mx-auto px-4 md:px-12 py-10">
      <div className="mb-16 md:px-10">
        <h2 className="text-[#864227] text-4xl capitalize">{response.categoryName}</h2>
        <p className="text-[#796C63] mt-4 font-light max-w-2xl">
          Dive into our exclusive range of high-quality essentials. Whether
          you're looking for inspiration or a specific must-have, our
          collection offers the perfect balance of variety and excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:px-10 gap-10">
        {/* Sidebar Filters */}
        <div className="col-span-1 space-y-4">
          <h4 className="text-xl mb-5 border-b pb-2">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="radio" name="price" id="low" className="accent-[#864227] size-4 mr-2" />
              <label htmlFor="low" className="text-slate-700 font-light cursor-pointer">Under 200 EGP</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="price" id="medium" className="accent-[#864227] size-4 mr-2" />
              <label htmlFor="medium" className="text-slate-700 font-light cursor-pointer">500 EGP - 1000 EGP</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="price" id="high" className="accent-[#864227] size-4 mr-2" />
              <label htmlFor="high" className="text-slate-700 font-light cursor-pointer">+1000 EGP</label>
            </div>
          </div>

          <h4 className="text-xl mt-10 mb-5 border-b pb-2">Brand</h4>
          <div className="space-y-3">
            {["Terra & Co", "Oak & Embers", "The Modern Weaver"].map((brand, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" id={`brand${index}`} className="accent-[#864227] size-4 mr-2" />
                <label htmlFor={`brand${index}`} className="text-slate-700 font-light cursor-pointer">{brand}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section / Empty State */}
        <div className="md:col-span-2 lg:col-span-3">
          {hasProducts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {response.products.map((product: Product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  saved={false}
                />
              ))}
            </div>
          ) : (
            /* Empty State Styling */
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#F9F8F6] rounded-[2rem] border border-dashed border-[#E8E4E0] text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <ShoppingBag className="w-10 h-10 text-[#D1C7BD]" />
              </div>
              <h3 className="text-[#864227] text-2xl font-semibold mb-2">
                No Products Found
              </h3>
              <p className="text-[#796C63] font-light max-w-sm">
                There are currently no products available in the <span className="font-medium">"{response.categoryName}"</span> category. Please check back later or explore other collections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}