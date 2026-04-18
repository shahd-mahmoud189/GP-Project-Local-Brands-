import Link from "next/link";
import React from "react";

export default function AddressCard({isDefault}:{ isDefault: boolean }) {
  return (
    <div className={`border-2 rounded-2xl p-6 ${isDefault? 'bg-[#bc54390d] border-[#bc5439]': 'border-[#EEEEEE]'}`}>
      <div className="flex justify-between gap-5">
        <p className="tracking-wider text-sm font-bold">Home (Maadi)</p>
        {isDefault &&<><span className="text-[10px] font-bold uppercase tracking-widest text-[#bc5439] px-2 py-0.5 border border-[#bc5439] rounded-2xl">
          Default
        </span></>}
      </div>
      <p className="text-sm font-light mt-2 text-[#6b5b54]">Hoor Ahmed</p>
      <h5 className="text-sm font-light text-[#6b5b54]">
        15 Road 9, Maadi
        <br />
        Cairo, Egypt 11728
      </h5>
      <p className="text-sm font-light text-[#6b5b54]">Egypt</p>
      <div className="flex gap-5 mt-4">
        <Link
          href={""}
          className="text-[#BC5439] text-xs uppercase font-bold mt-2 tracking-widest"
        >
          Edit
        </Link>
        <Link
          href={""}
          className="text-[#6b5b54] text-xs uppercase font-bold mt-2 tracking-widest"
        >
          Delete
        </Link>
      </div>
    </div>
  );
}
