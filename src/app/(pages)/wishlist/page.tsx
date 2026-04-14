
import React from "react";
import WishlistCard from "../../_components/wishlist/wishlistCard";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
      </div>
    </div>
  );
}