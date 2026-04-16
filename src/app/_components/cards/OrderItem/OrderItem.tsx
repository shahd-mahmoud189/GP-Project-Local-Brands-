import Image from "next/image";
import React from "react";

export default function OrderItem({status}:{ status: boolean }) {
  return (
    <div className="flex gap-4 items-center justify-between mb-4 border border-[#EEEEEE] rounded-4xl p-4">
      <div className="flex items-center gap-4">
        <Image
          src="/unnamed (1).png"
          alt=""
          width={500}
          height={500}
          className="size-1/5 object-cover rounded-4xl"
        />
        <div>
          <h3 className="font-bold">Artisan Fired Vase</h3>
          <p className="text-[#54433D] text-sm font-light">
            Ochre Glaze / Large
          </p>
          <p className="text-[#864227] font-light text-lg mt-2">100 EGP</p>
        </div>
      </div>
      {status && <><div className="rounded-2xl py-1 px-3 bg-[#F8EEEB] text-xs uppercase text-[#BC5439]">
        processing
      </div></>}
    </div>
  );
}
