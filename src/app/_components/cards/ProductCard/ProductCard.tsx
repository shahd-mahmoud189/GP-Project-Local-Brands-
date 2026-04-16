import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({saved, showWishlist}:{saved:boolean, showWishlist:boolean}) {
  return (
    <div className="relative overflow-hidden group transition-all duration-800">
      <div className="absolute top-3 z-50 left-3 right-3">
        <div className="flex justify-between">
          {showWishlist&&<><div className=" w-9 h-9 rounded-full bg-white/60 flex items-center justify-center text-[#864227] border border-[#864227]/30 hover:bg-white transition-colors">
            <i className="fa-regular fa-heart"></i>
          </div></>}
          <div className=" w-9 h-9 rounded-full bg-white/60 flex items-center justify-center text-[#864227] border border-[#864227]/30 hover:bg-white transition-colors">
            <i className={`fa-solid ${saved?'fa-bookmark':'fa-arrow-right-arrow-left'}`}></i>{" "}
          </div>
        </div>
      </div>

      <Link href={`/productDetails`}>
        <div className="overflow-hidden rounded-2xl relative">
          <Image
            src="/unnamed (1).png"
            alt=""
            width={5000}
            height={5000}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-all duration-800"
          />
        </div>
      </Link>

      <div className="py-5">
        <Link
          href={"/brandDetails"}
          className="text-sm font-semibold text-[#864227] block mb-2"
        >
          Terra & Co
        </Link>

        <Link href={`/productDetails`}>
          <h3 className="text-xl text-slate-700 line-clamp-2 mb-2">
            Oatmeal Ribbed Ceramic Vase
          </h3>
        </Link>

        <span className="text-xl font-light text-[#54433D] mb-5 block">100 EGP</span>

        <button className="w-full bg-[#864227] hover:bg-[#9F5538] text-white py-2.5 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2">
          <i className="fa-solid fa-shopping-bag text-sm"></i>
          Add to cart
        </button>
      </div>
    </div>
  );
}
