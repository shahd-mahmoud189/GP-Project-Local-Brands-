"use client";

import React from "react";

interface Props {
  register: any;
  errors: any;
}

export default function ShippingDetails({ register, errors }: Props) {
  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">

      {/* FIRST + LAST NAME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FIRST NAME */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">
            First Name
          </label>

          <input
            type="text"
            placeholder="Mary"
            {...register("firstName")}
            className="w-full rounded-xl bg-white border border-gray-200 p-4 focus:ring-2 focus:ring-[#0288D1]/150 outline-none transition-all"
          />

          {errors.firstName && (
            <p className="text-red-500 text-xs">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">
            Last Name
          </label>

          <input
            type="text"
            placeholder="John"
            {...register("lastName")}
            className="w-full rounded-xl bg-white border border-gray-200 p-4 focus:ring-2 focus:ring-[#0288D1]/150 outline-none transition-all"
          />

          {errors.lastName && (
            <p className="text-red-500 text-xs">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1">
          Shipping Address
        </label>

        <input
          type="text"
          placeholder="123 Main St, Building, Apt"
          {...register("shippingAddress")}
          className="w-full rounded-xl bg-white border border-gray-200 p-4 focus:ring-2 focus:ring-[#0288D1]/150 outline-none transition-all"
        />

        {errors.shippingAddress && (
          <p className="text-red-500 text-xs">
            {errors.shippingAddress.message}
          </p>
        )}
      </div>

    </div>
  );
}