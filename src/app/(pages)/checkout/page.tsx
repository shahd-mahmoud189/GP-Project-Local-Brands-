"use client";
import OrderSummary from "@/app/_components/cards/OrderSummary/OrderSummary";
import PaymentMethod from "@/app/_components/forms/PaymentMethod/PaymentMethod";
import ShippingDetails from "@/app/_components/forms/ShippingDetails/ShippingDetails";
import { useAppSelector } from "@/app/store/store";

export default function CheckoutPage() {
  const { items, subTotal, total } = useAppSelector((state) => state.cart);

  return (
    <div className="container mx-auto px-4 md:px-12 py-10">
      <div className="grid lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              1
            </div>
            <p className="text-3xl text-[#3d312d] font-bold">Shipping Details</p>
          </div>

          <ShippingDetails />

          <div className="flex items-center gap-2 mb-8 mt-10">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              2
            </div>
            <p className="text-3xl text-[#3d312d] font-bold">Payment Method</p>
          </div>

          <PaymentMethod />
        </div>

        <div className="lg:col-span-2">
          <OrderSummary
            showItems={true}
            items={items}
            subTotal={subTotal}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
