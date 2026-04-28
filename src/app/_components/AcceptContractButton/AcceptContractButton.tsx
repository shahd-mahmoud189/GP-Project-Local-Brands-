"use client";
import { acceptContract } from "@/app/api/contract.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function AcceptContractButton({ onAccepted }: { onAccepted: () => void }) {
  const mutation = useMutation({
    mutationFn: acceptContract,
    onSuccess: (data) => {
      toast.success(data.message);
      onAccepted(); // ← بتعلم الـ parent إن الـ accept اتعمل
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base"
    >
      {mutation.isPending ? (
        <i className="fa-solid fa-spinner fa-spin" />
      ) : (
        "I Accept & Continue"
      )}
    </button>
  );
}