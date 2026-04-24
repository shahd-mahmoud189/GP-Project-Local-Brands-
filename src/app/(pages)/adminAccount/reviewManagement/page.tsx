import React from "react";

export default function page() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
        Review Management
      </h1>
      <p className="text-stone-600 text-sm sm:text-base mb-6 sm:mb-10">
        Manage customer reviews on brands.
      </p>

      <div className="space-y-3 sm:space-y-4">
        <div className="bg-[#FAFAF9] rounded-lg border border-stone-200 hover:shadow-md transition overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 gap-4 sm:gap-6">
            <div className="flex-1 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">
                Natural Beauty
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-2">
                By Sarah Johnson
              </p>
              <p className="text-sm text-stone-700 mb-3">
                "Premium organic skincare and beauty products handcrafted with
                natural ingredients"
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition">
                <i className="fa-solid fa-trash"></i>

                <span className="">Remove</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAF9] rounded-lg border border-stone-200 hover:shadow-md transition overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 gap-4 sm:gap-6">
            <div className="flex-1 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">
                Natural Beauty
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-2">
                By Sarah Johnson
              </p>
              <p className="text-sm text-stone-700 mb-3">
                "Premium organic skincare and beauty products handcrafted with
                natural ingredients"
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition">
                <i className="fa-solid fa-trash"></i>

                <span className="">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
