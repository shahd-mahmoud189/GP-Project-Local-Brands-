"use client";

import { useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { CheckoutForm } from "@/app/schema/checkout.schema";

type Props = {
  register: UseFormRegister<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
  paymentMethod: number;         
  setValue: UseFormSetValue<CheckoutForm>;
};

export default function PaymentMethod({
  register,
  errors,
  paymentMethod,
  setValue,
}: Props) {
  const selected = paymentMethod; // 1 = cash, 2 = online

  // Clear card fields when switching to cash
  useEffect(() => {
    if (selected === 1) {
      setValue("creditCard", undefined);
    }
  }, [selected, setValue]);

  const selectCash = () =>
    setValue("paymentMethod", 1); 

  const selectOnline = () =>
    setValue("paymentMethod", 2);

  return (
    <div className="space-y-4">
      {/* CASH ON DELIVERY */}
      <div
        role="button"
        tabIndex={0}
        onClick={selectCash}
        onKeyDown={(e) => e.key === "Enter" && selectCash()}
        className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${selected === 1
            ? "border-[#864227] bg-white shadow-md"
            : "border-transparent bg-[#F6F3EE]"
          }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`size-5 mt-1 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected === 1 ? "border-[#864227]" : "border-gray-400"
              }`}
          >
            {selected === 1 && (
              <div className="size-2.5 rounded-full bg-[#864227]" />
            )}
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-900">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when your goods arrive.</p>
            </div>
            <i className="fa-solid fa-money-bill text-xl text-[#864227]" />
          </div>
        </div>
      </div>

      {/* ONLINE PAYMENT */}
      <div
        role="button"
        tabIndex={0}
        onClick={selectOnline}
        onKeyDown={(e) => e.key === "Enter" && selectOnline()}
        className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${selected === 2
            ? "border-[#864227] bg-white shadow-md"
            : "border-transparent bg-[#F6F3EE]"
          }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`size-5 mt-1 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected === 2 ? "border-[#864227]" : "border-gray-400"
              }`}
          >
            {selected === 2 && (
              <div className="size-2.5 rounded-full bg-[#864227]" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-slate-900">Online Payment</p>
                <p className="text-xs text-gray-500">
                  Credit Card, Apple Pay, or PayPal
                </p>
              </div>
              <i className="fa-solid fa-credit-card text-xl text-[#864227]" />
            </div>

            {/* Credit card fields */}
            <div
              className={`space-y-3 transition-opacity duration-200 ${selected === 2 ? "opacity-100" : "opacity-40 pointer-events-none"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  maxLength={16}
                  disabled={selected !== 2}
                  {...register("creditCard.cardNumber")}
                  className="w-full rounded-xl bg-white border border-gray-200 p-3 focus:ring-2 focus:ring-[#864227] outline-none"
                />
                {selected === 2 && errors.creditCard?.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.creditCard.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    disabled={selected !== 2}
                    {...register("creditCard.expiryDate")}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#864227]"
                  />
                  {selected === 2 && errors.creditCard?.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.creditCard.expiryDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="CVC"
                    maxLength={4}
                    disabled={selected !== 2}
                    {...register("creditCard.cvc")}
                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#864227]"
                  />
                  {selected === 2 && errors.creditCard?.cvc && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.creditCard.cvc.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  disabled={selected !== 2}
                  {...register("creditCard.cardHolderName")}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#864227]"
                />
                {selected === 2 && errors.creditCard?.cardHolderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.creditCard.cardHolderName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
