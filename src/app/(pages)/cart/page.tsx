import CartItem from "@/app/_components/cards/CartItem/CartItem";
import OrderSummary from "@/app/_components/cards/OrderSummary/OrderSummary";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-12 py-10">
      
      <div className="mb-6 px-12">
        <h2 className="font-bold text-4xl">Shopping Cart</h2>
        <p className="text-[#796C63] mt-4 font-semibold">3 items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 p-10 items-start">
        <div className="lg:col-span-3 ">
          <div className="bg-[#FAF8F5] rounded-2xl shadow">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className="lg:col-span-2">
          <OrderSummary showItems={false}/>
        </div>
      </div>
    </div>
  );
}
