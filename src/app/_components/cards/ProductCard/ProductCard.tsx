"use client";

import { Product } from "@/app/types/product.type";

import { CartResponse } from "@/app/types/cart.type"; 
import { getImageUrl } from "@/app/utils/imageUrl";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/app/store/store";
import { addProductToCart, getLoggedUserCart } from "../../../api/cart.api";
import { setCart } from "@/app/store/slices/cart.slice";
import { addToCompare } from "@/app/store/slices/compare.slice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/store";
import { addToWishlist as addToWishlistApi, removeFromWishlist as removeFromWishlistApi, getWishlist } from "@/app/api/wishlist.api";
import { addToWishlist, removeFromWishlist, setWishlist } from "@/app/store/slices/wishlist.slice";

const BASE_URL = "https://graduationprojectclean-production.up.railway.app"; // Adjust this to your actual base URL if needed

interface ProductCardProps {
  product: Product;
  saved?: boolean;
}

const colorMap: Record<string, string> = {
  Black: "#111827",
  White: "#F9FAFB",
  Gray: "#9CA3AF",
  Grey: "#9CA3AF",
  Red: "#EF4444",
  Blue: "#3B82F6",
  Green: "#22C55E",
  Brown: "#92400E",
  Navy: "#1E3A5F",
  Beige: "#D4B896",
};

export default function ProductCard({ product, saved }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthinticated } = useAppSelector((state) => state.auth);
  const compareItems = useAppSelector((state) => state.compare.items);
  const isCompared = compareItems.some((item) => item.productId === product.productId);

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const wishlistItem = wishlistItems.find((item) => item.productId === product.productId);
  const isWishlisted = !!wishlistItem;

  const getImageUrlLocal = (path: string) => {
    if (!path) return "/unnamed.png";
    const firstImage = path.split(',')[0];
    if (firstImage.startsWith("http")) return firstImage;
    return `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;
  };

  const uniqueColors = product.variants
    ? [...new Set(product.variants.map((v: any) => v.color))]
    : [];

  const handleAddToCart = async () => {
    if (!isAuthinticated) {
      toast.info("Please login to add items to cart!");
      router.push("/login");
      return;
    }

    try {
      const defaultVariantId = product.variants && product.variants.length > 0
        ? product.variants[0].variantId
        : undefined;

      await addProductToCart({
        productId: product.productId,
        variantId: defaultVariantId,
        quantity: 1,
        customization: null,
      });

      const updatedCart = await getLoggedUserCart();
      if (updatedCart) {
        dispatch(setCart(updatedCart as CartResponse));
        toast.success("Added to cart! ");
      }
   
    } catch (err: any) {
      console.error("ADD FAILED ", err);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleCompare = () => {
    if (isCompared) {
      toast.info("Product is already in comparison list");
      return;
    }
    if (compareItems.length >= 4) {
      toast.warning("You can only compare up to 4 products at once");
      return;
    }
    dispatch(addToCompare(product));
    toast.success("Added to comparison!");
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthinticated) {
      toast.info("Please login to manage wishlist!");
      router.push("/login");
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlistApi({ productId: product.productId });
        dispatch(removeFromWishlist(wishlistItem?.wishlistItemId || product.productId));
        toast.success("Removed from wishlist");
 
      } else {
        await addToWishlistApi({ productId: product.productId });
        const updatedWishlist = await getWishlist();
        if (updatedWishlist && Array.isArray(updatedWishlist)) {
          dispatch(setWishlist(updatedWishlist));
        }
        toast.success("Added to wishlist!");

      }
    } catch (err: any) {
      console.error("WISHLIST TOGGLE FAILED ", err);
      toast.error(`Failed to update wishlist: ${err.message || "Please try again."}`);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl p-3 border-2 border-gray-200 transition-all duration-500 hover:shadow-md hover:-translate-y-1 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#F9F8F7]">
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#0288d1] hover:bg-[#0288d1] hover:text-white transition-all"
          >
            <i className={`${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart text-sm`} />
          </button>

          <button
            onClick={handleCompare}
            title="Add to compare"
            className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${isCompared ? "bg-[#0288d1] text-white" : "bg-white text-[#0288d1] hover:bg-[#0288d1] hover:text-white"
              }`}
          >
            <i className="fa-solid fa-arrow-right-arrow-left text-sm" />
          </button>
        </div>

        <Link href={`/products/${product.productId}`} className="block w-full h-full">
          <Image
            src={getImageUrlLocal(product.imageUrls)}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* INFO */}
      <div className="pt-4 pb-1 px-1 flex flex-col flex-1">
        <Link href={"/brandDetails"} className="text-sm font-semibold text-[#0288d1] block mb-2">
          {product.brandName}
        </Link>

        <Link href={`/products/${product.productId}`}>
          <h3 className="text-lg text-slate-800 font-medium line-clamp-1 group-hover:text-[#0288d1] transition-colors leading-tight">
            {product.productName}
          </h3>
        </Link>

        {/* COLORS */}
        {uniqueColors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {uniqueColors.slice(0, 5).map((color: string) => (
              <span
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ background: colorMap[color] || "#ccc" }}
              />
            ))}
            {uniqueColors.length > 5 && (
              <span className="text-[10px] text-gray-400">
                +{uniqueColors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* PRICE + ADD */}
        <div className="flex items-end justify-between mt-auto pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-medium">
              Price
            </span>
            <span className="text-xl font-bold text-slate-900 leading-none">
              {product.basePrice}{" "}
              <small className="text-[10px] font-normal">EGP</small>
            </span>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="h-10 w-10 rounded-full bg-[#03a9f4] hover:bg-[#0288d1] text-white flex items-center justify-center  transition-all shadow-lg active:scale-90"
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}