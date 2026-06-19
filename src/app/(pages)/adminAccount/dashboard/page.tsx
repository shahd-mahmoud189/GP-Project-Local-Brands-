import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-8">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">Admin Dashboard</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Welcome to your marketplace control center.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
            Total Sales
          </p>
          <h5 className="text-[#0288D1] text-3xl font-bold mt-2">125,000</h5>
          <p className="text-[#4B5946] text-xs mt-2">
            EGP
          </p>
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
           New Registrations
          </p>
          <h5 className="text-[#0288D1] text-3xl font-bold mt-2">8</h5>     
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
           Products Pending
          </p>
          <h5 className="text-[#0288D1] text-3xl font-bold mt-2">22</h5>
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
          Total Users
          </p>
          <h5 className="text-[#0288D1] text-3xl font-bold mt-2">1,450</h5>
        </div>
      </div>
    </div>
  );
}
