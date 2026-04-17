import Image from "next/image";
import React from "react";

export default function OrderItem() {
  return (
    <div className="flex gap-4 items-center mb-4">
      <Image
        src="/unnamed (1).png"
        alt=""
        width={500}
        height={500}
        className="size-1/5 object-cover rounded-4xl group-hover:scale-110 transition-all duration-800"
      />
      <div>
        <h3 className="font-bold">Artisan Fired Vase</h3>
        <p className="text-[#54433D] text-sm font-light">brand name</p>
        <p className="text-[#864227] font-light text-lg mt-2">100 EGP</p>
      </div>
    </div>
  );
}
