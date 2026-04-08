import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import ReviewCard from "@/app/_components/cards/ReviewCard/ReviewCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-12 py-10">
      <div className="lg:flex lg:justify-center lg:gap-10 space-y-4 mb-12">
        <div className="lg:w-2/6">
          <Image
            src="/unnamed (1).png"
            alt=""
            className="rounded-4xl"
            width={5000}
            height={5000}
          />
        </div>
        <div className="lg:w-1/3 p-4 space-y-5">
          <Link
            href={"/brandDetails"}
            className="text-sm font-light text-[#864227] block mb-2"
          >
            Terra & Co
          </Link>
          <h1 className="text-5xl">Oatmeal Ribbed Ceramic Vase</h1>
          <span className="text-3xl font-light text-[#54433D] mb-5 block">
            100 EGP
          </span>
          <p className="text-lg font-light text-[#54433D]">
            Each piece is hand-thrown in our coastal workshop using locally
            sourced clay. The rhythmic ribbed texture is carved while the clay
            is leather-hard, creating a tactile dialogue between the artisan's
            hand and the earth's natural grit.
          </p>
          <button className="w-full font-bold bg-[#864227] hover:bg-[#9F5538] text-white py-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2">
            Buy Now
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BC5439]"></span>
            <p className="inline italic text-[#BC5439] text-xs">
              Only 3 pieces left in stock — Order soon
            </p>
          </div>
          <div className="flex justify-between gap-8">
            <button className="w-full bg-[#864227] hover:bg-[#9F5538] text-white p-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2">
              <i className="fa-solid fa-shopping-bag text-sm"></i>
              Add to cart
            </button>
            <button className="w-full bg-[#864227] hover:bg-[#9F5538] text-white p-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-right-arrow-left text-sm"></i>
              Add to compare
            </button>
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-16 mb-12 px-10">
        <div className="lg:col-span-1 p-8">
          <h4 className="italic text-[27px] mb-8">Customer Stories</h4>
          <p className="text-7xl font-bold mb-4">4.9</p>
          <span className="text-[#BC5439] mb-4 text-lg">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </span>
          <p className="uppercase text-[10px] tracking-widest text-[#54433D] opacity-55">
            Based on 124 global reviews
          </p>
        </div>
        <div className="lg:col-span-3 p-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>

        <div className="flex justify-between mb-10 px-10">
          <h4 className="text-3xl italic">You Might Also Like</h4>
          <Link href={"/products"} className="tracking-widest text-xs">
            Explore All <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </div>
  );
}
