import OrderSummary from "@/app/_components/cards/OrderSummary/OrderSummary";
import PaymentMethod from "@/app/_components/forms/PaymentMethod/PaymentMethod";
import ShippingDetails from "@/app/_components/forms/ShippingDetails/ShippingDetails";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-12 py-10">
      <div className="grid lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-3 ">
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              1
            </div>
            <p className="text-3xl">Shipping Details</p>
          </div>

          <ShippingDetails />

          <div className="flex items-center gap-2 mb-8 mt-10">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              2
            </div>
            <p className="text-3xl">Payment Method</p>
          </div>

          <PaymentMethod/>

        </div>

        <div className="lg:col-span-2 p-10 rounded-3xl bg-[#F6F3EE]">
          <OrderSummary/>
        </div>

      </div>
    </div>
  );
}
