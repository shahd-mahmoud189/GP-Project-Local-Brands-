"use client";

import { useState } from "react";
import { Product } from "@/app/types/product.type";
import { BrandList } from "@/app/types/brand.type";
import Filter from "@/app/_components/Filter/Filter";
import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import { ShoppingBag } from "lucide-react";

interface Props {
  products: Product[];
  brands: BrandList;
  categoryName: string;
}

export default function ProductsClient({ products, brands, categoryName }: Props) {
  const [price, setPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  const filtered = products.filter((p) => {
    if (price === "low" && p.basePrice >= 200) return false;
    if (price === "medium" && (p.basePrice < 500 || p.basePrice > 1000)) return false;
    if (price === "high" && p.basePrice <= 1000) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(Number(p.brandId))) return false;    
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:px-10 gap-10">
      <Filter
        brands={brands}
        selectedPrice={price}
        selectedBrands={selectedBrands}
        onPriceChange={setPrice}
        onBrandsChange={setSelectedBrands}
      />

      <div className="md:col-span-2 lg:col-span-3">
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.productId} product={product} saved={false} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#F0F9FF] rounded-[2rem] border border-dashed text-slate-600 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <ShoppingBag className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-[#03A9F4] text-2xl font-semibold mb-2">
              No Products Found
            </h3>
            <p className="text-slate-600 font-light max-w-sm">
              No products match your selected filters in{" "}
              <span className="font-medium">"{categoryName}"</span>. Try
              adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}