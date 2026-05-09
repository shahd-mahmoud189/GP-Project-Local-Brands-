"use client";

import React from "react";
import WishlistCard from "../../_components/wishlist/wishlistCard";
import { useAppSelector } from "../../store/store";

export default function WishlistPage() {
  const { items } = useAppSelector((state) => state.wishlist);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-slate-900">
          My Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <i className="fa-regular fa-heart text-6xl text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 font-medium">
              Your wishlist is empty.
            </p>
            <p className="text-gray-400 mt-2">
              Save items you like and they will show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <WishlistCard key={item.wishlistItemId} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}