// src/app/_components/products/ProductInteractive/ProductInteractive.tsx
"use client";
import { CustomizationOptions, ProductVariant } from "@/app/types/product.type";
import { useState } from "react";
import { useAppDispatch } from "@/app/store/store";
import { addProductToCart, getLoggedUserCart } from "@/app/api/cart.api";
import { setCart } from "@/app/store/slices/cart.slice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  productId: number;
  basePrice: number;
  variants: ProductVariant[];
  allowsCustomization: boolean;
  customizationOptions: CustomizationOptions | null;
}

export default function ProductInteractive({
  productId,
  basePrice,
  variants,
  allowsCustomization,
  customizationOptions,
}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const sizes = [...new Set(variants.map((v) => v.size))];
  const colors = [...new Set(variants.map((v) => v.color))];

  const hasVariants = variants.length > 0;

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");
  const [customText, setCustomText] = useState("");
  const [customPhoto, setCustomPhoto] = useState<File | null>(null);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  function toggleZone(zone: string) {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone],
    );
  }

  const selectedVariant =
    variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    ) ||
    variants.find((v) => v.size === selectedSize) ||
    variants[0];

  const currentPrice = selectedVariant ? selectedVariant.price : basePrice;
  const currentStock = selectedVariant ? selectedVariant.stockQuantity : null;

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

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addProductToCart({
        productId,
        variantId: selectedVariant ? selectedVariant.variantId : undefined,
        quantity: 1,
      });
      const updatedCart = await getLoggedUserCart();
      if (updatedCart) {
        dispatch(setCart(updatedCart));
        toast.success("Added to cart");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-5">
      {/* السعر */}
      <div>
        <span className="text-[10px] text-[#796C63] uppercase tracking-widest">
          Price
        </span>
        <div className="text-xl font-light text-[#54433D] mt-1">
          {currentPrice} <small className="text-sm font-normal">EGP</small>
        </div>
      </div>

      {/* Stock */}
      {currentStock !== null && (
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${currentStock > 0 ? "bg-[#BC5439]" : "bg-red-500"}`}
          />
          <p
            className={`italic text-xs ${currentStock > 0 ? "text-[#BC5439]" : "text-red-500"}`}
          >
            {currentStock > 0
              ? `Only ${currentStock} pieces left — Order soon`
              : "Out of stock"}
          </p>
        </div>
      )}

      {/* Size */}
      {hasVariants && sizes.length > 0 && (
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${selectedSize === size
                    ? "border-[#864227] bg-[#864227] text-white"
                    : "border-stone-300 text-stone-600 hover:border-[#864227] hover:text-[#864227]"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {hasVariants && colors.length > 0 && (
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider">
            Color —{" "}
            <span className="font-normal normal-case text-[#864227]">
              {selectedColor}
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${selectedColor === color
                    ? "border-[#864227]"
                    : "border-stone-300 hover:border-[#864227]"
                  }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-stone-200"
                  style={{ background: colorMap[color] || "#ccc" }}
                />
                <span
                  className={`text-sm font-medium ${selectedColor === color ? "text-[#864227]" : "text-stone-600"}`}
                >
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Customization */}
      {allowsCustomization && customizationOptions && (
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-4">
          <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider">
            Customization
          </h3>

          {/* Text */}
          {customizationOptions.allowsText && (
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#864227] rounded flex items-center justify-center text-white text-xs">
                  T
                </span>
                Custom Text
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your custom text..."
                maxLength={50}
                className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#864227] focus:border-transparent text-sm"
              />
              <p className="text-xs text-stone-400 mt-1">
                {customText.length}/50
              </p>
            </div>
          )}

          {/* Photo */}
          {customizationOptions.allowsPrinting && (
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#864227] rounded flex items-center justify-center text-white text-xs">
                  <i
                    className="fa-regular fa-image"
                    style={{ fontSize: "10px" }}
                  />
                </span>
                Custom Photo
              </label>
              <label className="block border-2 border-dashed border-stone-300 rounded-xl p-5 text-center cursor-pointer hover:border-[#864227] hover:bg-[#86422710] transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCustomPhoto(e.target.files?.[0] || null)}
                />
                {customPhoto ? (
                  <p className="text-sm text-[#864227] font-medium">
                    {customPhoto.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-stone-500">
                      Click to upload your photo
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

          {/* Print Areas */}
          {customizationOptions.availableZones.length > 0 && (
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">
                Print Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {customizationOptions.availableZones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => toggleZone(zone)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${selectedZones.includes(zone)
                        ? "border-[#864227] bg-[#864227] text-white"
                        : "border-stone-300 text-stone-600 hover:border-[#864227] hover:text-[#864227]"
                      }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
              {selectedZones.length === 0 && (
                <p className="text-xs text-stone-400 mt-2">
                  Select at least one print area
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Buttons */}
      <button
        onClick={handleBuyNow}
        disabled={isAdding}
        className="w-full font-bold bg-[#864227] hover:bg-[#9F5538] text-white py-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-stone-400"
      >
        {isAdding ? "Processing..." : "Buy Now"}
      </button>
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 bg-[#864227] hover:bg-[#9F5538] text-white p-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm disabled:bg-stone-400"
        >
          {isAdding ? (
            <i className="fa-solid fa-spinner fa-spin" />
          ) : (
            <i className="fa-solid fa-shopping-bag text-sm" />
          )}
          Add to cart
        </button>
        <button className="flex-1 bg-[#864227] hover:bg-[#9F5538] text-white p-4 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm">
          <i className="fa-solid fa-arrow-right-arrow-left text-sm" />
          Compare
        </button>
      </div>
    </div>
  );
}
