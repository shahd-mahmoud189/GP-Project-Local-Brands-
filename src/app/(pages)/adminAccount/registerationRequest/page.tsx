"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="p-4 md:p-8 max-w-full overflow-hidden">
      <div className="mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
          Registration Requests
        </h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Manage brand registration applications.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">
                  Owner Name
                </th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">
                  Credentials
                </th>
                <th className="px-6 py-4 text-left text-stone-900 font-semibold text-sm uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-4 text-center text-stone-900 font-semibold text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap text-stone-900 font-semibold">
                  Artisan Collection
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-stone-700">
                  Ahlam Reda
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-stone-700">
                  <button
                    onClick={toggle}
                    className="text-amber-800 underline hover:text-amber-900"
                  >
                    View Credentials
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-stone-500 font-mono">
                  05-10-2025
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95">
                      Approve
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm cursor-pointer"
            onClick={toggle}
          ></div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-stone-900">
                  Brand Credentials
                </h3>
                <button
                  onClick={toggle}
                  className="text-stone-400 hover:text-stone-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#6B5B54] tracking-wider">
                    Brand Description
                  </label>
                  <p className="text-stone-700 mt-1 leading-relaxed">
                    Artisan Collection specializes in hand-poured organic soaps
                    and natural skincare crafted with locally sourced essential
                    oils from the Egyptian countryside.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#6B5B54] tracking-wider">
                    Business License
                  </label>
                  <div className="mt-2 relative h-64 w-full rounded-lg border border-stone-200 overflow-hidden bg-stone-50">
                    <Image
                      src="/License.png"
                      alt="Business License"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={toggle}
                className="w-full mt-6 bg-[#864227] hover:bg-[#6d351f] text-white py-3 rounded-xl font-semibold  transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
