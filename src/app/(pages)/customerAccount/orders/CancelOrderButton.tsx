"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { cancelOrder } from "@/app/api/order.api";

export default function CancelOrderButton({ orderId }: { orderId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = async () => {
    const result = await Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Cancel Order?</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Cancel <span class="font-semibold text-gray-700">Order #${orderId}</span>? 
          This action cannot be undone.
        </p>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep it",
      customClass: {
        popup: "rounded-3xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex flex-row-reverse justify-center",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        try {
          await cancelOrder(orderId);
          Swal.fire({
            title: "Cancelled!",
            text: "Your order has been cancelled.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          router.refresh();
        } catch (err: any) {
          Swal.fire("Error", err?.message || "Failed to cancel order", "error");
        }
      });
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className={`text-xs ml-3 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 transition-all ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isPending ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <i className="fa-solid fa-ban"></i>
      )}
      {isPending ? "Canceling..." : "Cancel Order"}
    </button>
  );
}
