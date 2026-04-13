import React from "react";

export default function PaymentMethod() {
  return (
    <div className="space-y-4">
      <label
        className={`block border rounded-3xl p-8 cursor-pointer hover:bg-[#F0EDE8] transition-all duration-200 bg-[#F6F3EE]`}
      >
        <div className="flex items-start gap-4">
          <input
            type="radio"
            name="payment"
            className="mt-1 size-5 accent-[#864227]"
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className=" font-semibold text-slate-900">
                    Online Payment
                  </div>
                  <div className="text-xs text-[#54433D]">
                    Credit Card, Apple Pay, or PayPal. Securely processed.
                  </div>
                </div>
              </div>

              <i className="fa-solid fa-credit-card text-lg text-[#B6ADA7]"></i>
            </div>

            <div className="w-1/2">
              <div className="mt-8 mb-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full rounded-4xl bg-white border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full rounded-4xl bg-white border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full rounded-4xl bg-white border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>

      <label
        className={`block border rounded-3xl p-8 cursor-pointer hover:bg-[#F0EDE8] transition bg-[#F6F3EE]`}
      >
        <div className="flex items-start gap-4">
          <input
            type="radio"
            name="payment"
            className="mt-1 size-5 accent-[#864227]"
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold text-slate-900">
                    Cash on Delivery
                  </div>
                  <div className="text-xs text-[#54433D]">
                    Pay our courier when your artisanal goods arrive.
                  </div>
                </div>
              </div>

              <i className="fa-solid fa-money-bill text-lg text-[#B6ADA7]"></i>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
