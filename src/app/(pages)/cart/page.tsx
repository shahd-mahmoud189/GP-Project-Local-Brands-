'use client';
import CartItem from "@/app/_components/cards/CartItem/CartItem";
import OrderSummary from "@/app/_components/cards/OrderSummary/OrderSummary";
import { useAppSelector, useAppDispatch } from "@/app/store/store";
import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { clearCartApi } from "@/app/api/cart.api";
import { clearCart } from "@/app/store/slices/cart.slice";

export default function Page() {
  const dispatch = useAppDispatch();
  const { items, total, totalItems, subTotal, isLoading } = useAppSelector((state) => state.cart);

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will remove all items from your cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#864227',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        confirmButton: "bg-[#864227] hover:bg-[#6d351f] text-white font-semibold py-3 px-6 rounded-xl transition-all",
        cancelButton: "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      try {
        await clearCartApi();
        dispatch(clearCart());
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart is now empty.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire('Error', 'Failed to clear cart', 'error');
      }
    }
  };

  if (isLoading || !items) {
    return (
      <div className="container mx-auto px-12 py-20 text-center">
        <h2 className="text-2xl font-bold">Loading your cart...</h2>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-12 py-20 text-center">
        <div className="mb-8">
          <i className="fa-solid fa-cart-shopping text-6xl text-slate-200 mb-4"></i>
          <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link
          href="/products"
          className="bg-[#864227] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#6d351f] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 py-10">

      <div className="mb-6 px-12 flex justify-between items-end">
        <div>
          <h2 className="font-bold text-4xl text-[#3d312d]">Shopping Cart</h2>
          <p className="text-[#796C63] mt-2 font-medium">{totalItems} items in your cart</p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-2 transition-colors mb-2"
        >
          <i className="fa-regular fa-trash-can"></i>
          Clear Shopping Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 px-10 items-start">
        <div className="lg:col-span-3">
          <div className=" rounded-xl overflow-hidden shadow-sm">
            {items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <OrderSummary
            showItems={false}
            subTotal={subTotal}
            total={total}
            shipping={0} // Assuming free shipping for now
          />
        </div>
      </div>
    </div>
  );
}
