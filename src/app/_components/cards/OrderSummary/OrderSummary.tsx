import { Button } from "@/components/ui/button";
import React from "react";
import OrderItem from "../OrderItem/OrderItem";

export default function OrderSummary() {
  return (
    <div className="sticky top-10">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
        Order Summary
        
      </h3>

     
      <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <OrderItem status={false } />
        <OrderItem status={false} />
        <OrderItem status={false} />
      </div>

      <div className="space-y-3 border-t border-dashed border-slate-300 pt-6 mb-6">
        <div className="flex justify-between items-center text-sm">
          <p className="text-[#54433D] font-medium">Subtotal</p>
          <span className="font-bold text-slate-800">100.00 EGP</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-[#54433D] font-medium">Shipping cost</p>
          <span className="font-bold text-green-600">Free</span>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-2xl border border-[#864227]/10 mb-8">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-slate-700">Total Amount</p>
          <div className="text-right">
            <span className="block text-2xl font-black text-[#864227]">100.00 EGP</span>
            <span className="text-[10px] text-gray-400 font-light italic">VAT included</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button className="w-full py-7 rounded-2xl bg-[#864227] hover:bg-[#6d351f] text-white text-md font-bold shadow-lg shadow-[#864227]/20 transition-all active:scale-[0.98]">
          Complete Purchase
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-[#54433D99] text-[10px] uppercase tracking-widest font-semibold">
           <i className="fa-solid fa-lock text-[8px]"></i>
           Secure SSL Checkout
        </div>
      </div>

      <p className="text-[#54433D77] text-[11px] leading-relaxed mt-8 text-center px-2">
        By completing your purchase, you agree to our 
        <a href="#" className="underline ml-1">Terms</a> and 
        <a href="#" className="underline ml-1">Privacy Policy</a>.
      </p>
    </div>
  );
}