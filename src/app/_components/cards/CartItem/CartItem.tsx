import Image from "next/image";
import React from "react";

export default function CartItem() {
  return (
    <div className="container w-full p-4 mb-4 border-b border-b-slate-200 flex flex-col sm:flex-row justify-between gap-4">
      {/* Left Section */}
      <div className="flex gap-8  items-start w-full flex-col md:flex-row">
        <div className="rounded-2xl shrink-0">
          <Image
            src={"/unnamed.png"}
            alt="image"
            width={150}
            height={150}
            className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-2xl "
          />
        </div>

        <div className="w-full ">
          <p className="text-[#bb4d00] text-sm uppercase mb-1">
            Artisan Collection
          </p>
          <h3 className="font-semibold text-base sm:text-lg lg:text-xl mb-3">
            Premium Handmade Soap
          </h3>

          <p className="text-[#973c00] text-2xl font-bold my-2">200 EGP </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center  rounded-2xl overflow-hidden bg-white">
          <button className="px-3 py-1 text-[#973c00] ">
            <i className="fa-solid fa-minus text-sm"></i>
          </button>

          <span className="w-12 text-center font-semibold text-slate-900">
            1
          </span>

          <button className="px-3 py-1 text-[#973c00]">
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        </div>


        <button className="w-9 h-9 flex items-center justify-center rounded-lg  hover:text-red-600 transition-colors">
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}
