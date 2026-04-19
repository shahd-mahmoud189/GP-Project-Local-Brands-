'use client';
import React, { useState } from "react";

export default function PaymentMethod() {
  const [selected, setSelected] = useState("online");

  return (
    <div className="space-y-4">
      {/* Online Payment Option */}
      <label
        onClick={() => setSelected("online")}
        className={`block border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
          selected === "online" ? "border-[#864227] bg-white shadow-md" : "border-transparent bg-[#F6F3EE]"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`size-5 mt-1 rounded-full border-2 flex items-center justify-center ${selected === "online" ? "border-[#864227]" : "border-gray-400"}`}>
             {selected === "online" && <div className="size-2.5 rounded-full bg-[#864227]" />}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-slate-900">Online Payment</p>
                <p className="text-xs text-gray-500">Credit Card, Apple Pay, or PayPal</p>
              </div>
              <i className="fa-solid fa-credit-card text-xl text-[#864227]"></i>
            </div>

            {/* Credit Card Details - Only show or highlight when active */}
            <div className={`space-y-3 transition-opacity ${selected === "online" ? "opacity-100" : "opacity-50"}`}>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full rounded-xl bg-white border border-gray-200 p-3 focus:ring-2 focus:ring-[#864227] outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="rounded-xl border border-gray-200 p-3 outline-none" />
                <input type="text" placeholder="CVC" className="rounded-xl border border-gray-200 p-3 outline-none" />
              </div>
            </div>
          </div>
        </div>
      </label>

      {/* Cash on Delivery Option */}
      <label
        onClick={() => setSelected("cash")}
        className={`block border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
          selected === "cash" ? "border-[#864227] bg-white shadow-md" : "border-transparent bg-[#F6F3EE]"
        }`}
      >
        <div className="flex items-start gap-4">
           <div className={`size-5 mt-1 rounded-full border-2 flex items-center justify-center ${selected === "cash" ? "border-[#864227]" : "border-gray-400"}`}>
             {selected === "cash" && <div className="size-2.5 rounded-full bg-[#864227]" />}
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when your goods arrive.</p>
            </div>
            <i className="fa-solid fa-money-bill text-xl text-[#864227]"></i>
          </div>
        </div>
      </label>
    </div>
  );
}