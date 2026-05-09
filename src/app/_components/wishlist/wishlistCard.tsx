"use client";

import { WishlistItem } from "@/app/types/wishlist.type";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/app/store/store";
import { removeFromWishlist as removeFromWishlistApi } from "@/app/api/wishlist.api";
import { removeFromWishlist } from "@/app/store/slices/wishlist.slice";
import { addProductToCart, getLoggedUserCart } from "@/app/api/cart.api";
import { setCart } from "@/app/store/slices/cart.slice";
import { toast } from "react-toastify";

const BASE_URL = "https://brands-system-production-c110.up.railway.app";

interface WishlistCardProps {
  item: WishlistItem;
}

export default function WishlistCard({ item }: WishlistCardProps) {
  const dispatch = useAppDispatch();

  const getImageUrl = (path: string) => {
    if (!path) return "/unnamed.png";
    const firstImage = path.split(",")[0];
    if (firstImage.startsWith("http")) return firstImage;
    return `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
   
      await removeFromWishlistApi({ productId: item.productId }); 

      dispatch(removeFromWishlist(item.wishlistItemId));
      
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("REMOVE ERROR:", err);
      toast.error("Failed to remove item");
    }
};
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addProductToCart({
        productId: item.productId,
        quantity: 1,
        variantId: undefined,
        customization: null,
      });
      const updatedCart = await getLoggedUserCart();
      dispatch(setCart(updatedCart));
      toast.success("Added to cart!");

   
      handleRemove(e);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl p-3 border-2 border-gray-200 transition-all duration-500 hover:shadow-md hover:-translate-y-1 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#F9F8F7]">
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleRemove}
            title="Remove from wishlist"
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <i className="fa-solid fa-trash text-sm" />
          </button>
        </div>

        <Link href={`/products/${item.productId}`} className="block w-full h-full">
          <Image
            src={getImageUrl(item.productImage)}
            alt={item.productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* INFO */}
      <div className="pt-4 pb-1 px-1 flex flex-col flex-1">
        <Link href={"/brandDetails"} className="text-sm font-semibold text-[#864227] block mb-2">
          {item.brandName}
        </Link>

        <Link href={`/products/${item.productId}`}>
          <h3 className="text-lg text-slate-800 font-medium line-clamp-1 group-hover:text-[#864227] transition-colors leading-tight">
            {item.productName}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-end justify-between mt-auto pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-medium">
              Price
            </span>
            <span className="text-xl font-bold text-slate-900 leading-none">
              {item.price}{" "}
              <small className="text-[10px] font-normal">EGP</small>
            </span>
          </div>

          {!item.isAvailable ? (
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md mb-1">
              Out of Stock
            </span>
          ) : (
            <button
              onClick={handleAddToCart}
              title="Add to cart"
              className="h-10 w-10 rounded-full bg-[#864227] text-white flex items-center justify-center hover:bg-[#6d351f] transition-all shadow-lg active:scale-90"
            >
              <i className="fa-solid fa-plus" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}