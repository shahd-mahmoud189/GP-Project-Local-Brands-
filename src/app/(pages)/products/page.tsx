import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-12 py-10">
      <div className="mb-6 px-10">
        <h2 className="text-[#864227] text-4xl ">Shop All Products</h2>
        <p className="text-[#796C63] mt-4 font-light">
          Find exactly what you’re looking for in our diverse catalog. <br />{" "}
          High-quality essentials and the latest trends, all curated in one
          place for a seamless shopping experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-10 space-y-4">
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
        <ProductCard saved={false} showWishlist={true} />
      </div>
    </div>
  );
}
