import { Button } from "@/components/ui/button";
import React from "react";
import OrderItem from "../OrderItem/OrderItem";

export default function OrderSummary() {
  return (
    <div>
      <h3 className="text-2xl font-semibold pb-3 border-b border-b-slate-200 mb-5">
        Order Summary
      </h3>

      <div className="mb-10">
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
      </div>

      <div className="border-b pb-3 border-b-slate-200 mb-5">
        <div className="flex justify-between items-center">
          <p className="text-[#54433D]">Subtotal :</p>
          <span className="text-lg font-semibold">100 EGP</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#54433D]">Shipping :</p>
          <span className="text-lg font-semibold">Free</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">Total Price :</p>
        <span className="text-xl font-semibold text-[#864227]">100 EGP</span>
      </div>
      <div className="flex flex-col gap-3 my-5">
        <Button className="w-full py-6 px-4 rounded-3xl bg-[#864227] hover:bg-[#9F5538] transition-all duration-200 text-white font-semibold shadow-md hover:shadow-lg   flex items-center justify-center gap-2">
          <i className="fa-solid fa-credit-card text-sm"></i>
          Proceed to payment
        </Button>
      </div>
      <p className="text-[#54433D99] text-xs leading-relaxed mt-6 px-4 text-center">By completing your purchase, you agree to our Terms of Service and Privacy Policy regarding artisanal small-batch commerce.</p>
    </div>
  );
}
