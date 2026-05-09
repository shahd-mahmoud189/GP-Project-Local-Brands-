"use client";

import { BrandList } from "@/app/types/brand.type";

interface FilterProps {
  brands: BrandList;
  selectedPrice: string;
  selectedBrands: number[];
  onPriceChange: (price: string) => void;
  onBrandsChange: (brands: number[]) => void;
}

export default function Filter({
  brands,
  selectedPrice,
  selectedBrands,
  onPriceChange,
  onBrandsChange,
}: FilterProps) {
const toggleBrand = (brandId: number) => {
  const id = Number(brandId);
  if (selectedBrands.includes(id)) {
    onBrandsChange(selectedBrands.filter((b) => b !== id));
  } else {
    onBrandsChange([...selectedBrands, id]);
  }
};


  const handlePrice = (value: string) => {
    onPriceChange(selectedPrice === value ? "" : value);
  };

  return (
    <div className="col-span-1 space-y-4">
      <h4 className="text-xl mb-5 border-b pb-2">Price Range</h4>
      <div className="space-y-3">
        {[
          { id: "low", label: "Under 200 EGP" },
          { id: "medium", label: "500 EGP - 1000 EGP" },
          { id: "high", label: "+1000 EGP" },
        ].map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="radio"
              name="price"
              id={option.id}
              checked={selectedPrice === option.id}
              onChange={() => handlePrice(option.id)}
              className="accent-[#864227] size-4 mr-2"
            />
            <label htmlFor={option.id} className="text-slate-700 font-light cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <h4 className="text-xl mt-10 mb-5 border-b pb-2">Brand</h4>
      <div className="space-y-3">
        {brands.map((brand) => (
          <div key={brand.brandId} className="flex items-center">
            <input
              type="checkbox"
              id={`brand${brand.brandId}`}
              checked={selectedBrands.includes(brand.brandId)}
              onChange={() => toggleBrand(brand.brandId)}
              className="accent-[#864227] size-4 mr-2"
            />
            <label htmlFor={`brand${brand.brandId}`} className="text-slate-700 font-light cursor-pointer">
              {brand.brandName}
            </label>
          </div>
        ))}
      </div>

      {(selectedPrice || selectedBrands.length > 0) && (
        <button
          onClick={() => { onPriceChange(""); onBrandsChange([]); }}
          className="text-xs text-[#864227] underline mt-4"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}