"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import OrderSummary from "@/app/_components/cards/OrderSummary/OrderSummary";
import PaymentMethod from "@/app/_components/forms/PaymentMethod/PaymentMethod";
import ShippingDetails from "@/app/_components/forms/ShippingDetails/ShippingDetails";

import { useAppSelector, useAppDispatch } from "@/app/store/store";
import { clearCart } from "@/app/store/slices/cart.slice";

import { placeOrder } from "../../api/order.api";
import { checkoutSchema, CheckoutForm } from "../../schema/checkout.schema";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, subTotal, total } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 1,
    },
  });

  const paymentMethod = watch("paymentMethod"); // ← هنا في الـ parent عشان يتعمل re-render صح

  const onSubmit = async (data: CheckoutForm) => {
    console.log("✅ onSubmit fired! Raw form data:", data);

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        shippingAddress: data.shippingAddress,
        paymentMethod: Number(data.paymentMethod),
        creditCard:
          Number(data.paymentMethod) === 2 && data.creditCard
            ? {
              cardNumber: data.creditCard.cardNumber ?? "",
              expiryDate: data.creditCard.expiryDate ?? "",
              cvc: data.creditCard.cvc ?? "",
              cardHolderName: data.creditCard.cardHolderName ?? "",
            }
            : null,
      };

      console.log("📦 Payload being sent to API:", JSON.stringify(payload, null, 2));

      const result = await placeOrder(payload);

      console.log("🎉 Order placed successfully! Response:", result);
      toast.success("Order placed successfully 🎉");
      dispatch(clearCart());
      router.push("/customerAccount/orders");

    } catch (err: any) {
      console.error("❌ Order failed! Error:", err);
      console.error("❌ Error message:", err?.message);
      toast.error(err.message || "Order failed");
    }
  };

  // Debug: log whenever form validation fails silently
  const onError = (errors: any) => {
    console.warn("⚠️ Form validation errors (form did NOT submit):", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto px-4 md:px-12 py-10"
    >
      <div className="grid lg:grid-cols-5 gap-16 items-start">

        {/* LEFT */}
        <div className="lg:col-span-3">

          {/* SHIPPING */}
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              1
            </div>
            <p className="text-3xl font-bold">Shipping Details</p>
          </div>

          <ShippingDetails register={register} errors={errors} />

          {/* PAYMENT */}
          <div className="flex items-center gap-2 mb-8 mt-10">
            <div className="size-8 rounded-full bg-[#FFDBCF] flex items-center justify-center text-[#864227]">
              2
            </div>
            <p className="text-3xl font-bold">Payment Method</p>
          </div>

          <PaymentMethod
            register={register}
            paymentMethod={Number(paymentMethod ?? 1)}
            errors={errors}
            setValue={setValue}
          />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <OrderSummary
            showItems={true}
            items={items}
            subTotal={subTotal}
            total={total}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-[#864227] text-white py-3 rounded-xl hover:bg-[#6d351f] disabled:opacity-60 transition-all"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2" />
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>

      </div>
    </form>
  );
}