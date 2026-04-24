import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-stone-900">Admin Dashboard</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Welcome to your marketplace control center.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-stone-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 md:min-w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-4 md:px-6 py-4 text-left text-stone-900 font-semibold text-sm md:text-base">
                  Product
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-stone-900 font-semibold text-sm md:text-base">
                  Brand
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-stone-900 font-semibold text-sm md:text-base">
                  Price
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-stone-900 font-semibold text-sm md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr className="hover:bg-stone-50 transition group">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-100">
                      <Image
                        alt="Product Image"
                        src="/unnamed.png"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-stone-900 font-semibold text-sm md:text-base">
                      Premium Handmade Soap
                    </p>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-stone-700 text-sm md:text-base whitespace-nowrap">
                  Artisan Collection
                </td>
                <td className="px-4 md:px-6 py-4 text-amber-800 font-bold text-sm md:text-base whitespace-nowrap">
                  24.99 EGP
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition">
                      Approve
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-stone-50 transition group">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-100">
                      <Image
                        alt="Product Image"
                        src="/unnamed.png"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-stone-900 font-semibold text-sm md:text-base">
                      Premium Handmade Soap
                    </p>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-stone-700 text-sm md:text-base whitespace-nowrap">
                  Artisan Collection
                </td>
                <td className="px-4 md:px-6 py-4 text-amber-800 font-bold text-sm md:text-base whitespace-nowrap">
                  24.99 EGP
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition">
                      Approve
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}