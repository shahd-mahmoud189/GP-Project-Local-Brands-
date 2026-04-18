import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import React from "react";

export default function page() {
  return (
    <div className="p-8 flex justify-center">
      <div className="w-3/4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <ProductCard saved={true} showWishlist={false} />
        </div>
        <div className="col-span-1">
          <ProductCard saved={true} showWishlist={false} />
        </div>
        <div className="col-span-1">
          <ProductCard saved={true} showWishlist={false} />
        </div>
      </div>
    </div>
  );
}
