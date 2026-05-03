"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CartItem as CartItemType } from "@/app/types/cart.type";
import Swal from "sweetalert2";
import {
  removeProductFromCart,
  updateProductQuantity,
  getLoggedUserCart,
} from "@/app/api/cart.api";
import { useAppDispatch } from "@/app/store/store";
import { setCart } from "@/app/store/slices/cart.slice";
import { toast } from "react-toastify";

const BASE_URL = "https://brands-system-production-c110.up.railway.app";

export default function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const getImageUrl = (path: string) => {
    if (!path) return "/unnamed.png";
    const firstImage = path.split(",")[0];
    if (firstImage.startsWith("http")) return firstImage;
    return `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;
  };


  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || isUpdating) return;

    setIsUpdating(true);

    try {
      await updateProductQuantity({
        cartItemId: item.cartItemId,
        quantity: newQuantity,
      });

      const updatedCart = await getLoggedUserCart();
      dispatch(setCart(updatedCart));

    } catch (err: any) {
      toast.error(err.message || "Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  
  const handelRemove = async (cartItemId: number, title: string) => {
    const result = await Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Remove <span class="font-semibold text-gray-700">${title.slice(0, 40)}${
        title.length > 40 ? "..." : ""
      }</span>? 
          This action cannot be undone.
        </p>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-3xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions:
          "px-6 pb-6 pt-0 gap-3 flex flex-row-reverse justify-center",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await removeProductFromCart(cartItemId);

        const updatedCart = await getLoggedUserCart();
        dispatch(setCart(updatedCart));

        Swal.fire({
          title: "Deleted!",
          text: "Item has been removed from your cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire("Error", "Failed to remove item", "error");
      }
    }
  };

  return (
    <div className="container w-full p-4 mb-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
      
      {/* LEFT */}
      <div className="flex gap-6 items-start w-full flex-col md:flex-row">
        <div className="rounded-xl shrink-0">
          <Image
            src={getImageUrl(item.productImage)}
            alt={item.productName}
            width={150}
            height={150}
            className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-2xl"
          />
        </div>

        <div className="w-full">
          <p className="text-[#bb4d00] text-sm  mb-1">
            {item.brandName}
          </p>

          <h3 className=" text-base sm:text-sm lg:text-lg mb-1">
            {item.productName}
          </h3>

          {(item.size || item.color) && (
            <p className="text-xs text-slate-500 mb-2">
              {item.size ? `Size: ${item.size}` : ""}
              {item.size && item.color ? " | " : ""}
              {item.color ? `Color: ${item.color}` : ""}
            </p>
          )}

          <p className="text-[#973c00] text-md font-bold">
            {item.unitPrice} EGP
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Item total: {item.subtotal} EGP
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* QUANTITY */}
        <div className="flex items-center rounded-xl overflow-hidden bg-white border border-slate-200">
          
          <button
  disabled={isUpdating || item.quantity === 1}
  onClick={() => handleUpdateQuantity(item.quantity - 1)}
  className={`px-3 py-1 transition-all duration-200 flex items-center justify-center
    ${
      item.quantity === 1
        ? "text-gray-300 cursor-not-allowed bg-gray-100  w-8 h-8"
        : "text-[#973c00] hover:bg-slate-50"
    }`}
>
  <i className="fa-solid fa-minus text-sm"></i>
</button>

          <span className="w-12 text-center font-semibold text-slate-900 border-x border-slate-200 py-1">
            {isUpdating ? "..." : item.quantity}
          </span>

          <button
            disabled={isUpdating}
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            className="px-3 py-1 text-[#973c00] hover:bg-slate-50 disabled:opacity-50"
          >
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        </div>

        {/* DELETE */}
        <button
          onClick={() => handelRemove(item.cartItemId, item.productName)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>

      </div>
    </div>
  );
}