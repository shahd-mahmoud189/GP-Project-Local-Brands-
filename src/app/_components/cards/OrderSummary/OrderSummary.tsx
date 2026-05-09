import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import Link from "next/link";
import { CartItem } from "@/app/types/cart.type";

export default function OrderSummary({
  showItems,
  subTotal = 0,
  total = 0,
  shipping = 0,
  items = []
}: {
  showItems?: boolean,
  subTotal?: number,
  total?: number,
  shipping?: number,
  items?: CartItem[]
}) {
  return (
    <div className="p-10 rounded-3xl shadow-sm">
      <h3 className="text-xl  text-slate-900 mb-6 flex items-center justify-between">
        Order Summary
      </h3>

      {showItems && items.length > 0 && (
        <div className="space-y-4 mb-8 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <OrderItem key={item.cartItemId} item={item} status={false} />
          ))}
        </div>
      )}

      <div className="space-y-3 border-t border-dashed border-slate-300 pt-6 mb-6">
        <div className="flex justify-between items-center text-sm">
          <p className="text-[#54433D] font-medium">Subtotal</p>
          <span className="font-bold text-slate-800">{subTotal.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-[#54433D] font-medium">Shipping cost</p>
          <span className="font-bold text-green-600">{shipping === 0 ? "Free" : `${shipping.toFixed(2)} EGP`}</span>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-2xl border border-[#864227]/10 mb-8">
        <div className="flex justify-between items-center">
          <p className="text-lg ">Total</p>
          <div className="text-right">
            <span className="block text-lg text-[#864227]">{total.toFixed(2)} EGP</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link href={'/checkout'} className="w-full inline-block bg-[#864227] hover:bg-[#6d351f] text-white rounded-xl border-2 border-[#864227] font-semibold py-3   transition-all duration-200 active:scale-95 text-center">
          {showItems ? 'Complete Purchase' : 'Proceed to Checkout'}
        </Link>

        <Link href={'/products'} className="w-full inline-block bg-white hover:bg-[#FAF8F5] rounded-xl text-[#864227] border-2 border-[#864227] font-semibold py-3 px-2 transition-all duration-200 active:scale-95 text-center">
          Continue Shopping
        </Link>

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
