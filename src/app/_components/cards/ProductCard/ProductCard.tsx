import { Product } from "@/app/types/product.type";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  saved: boolean;
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
  const uniqueColors = product.variants
    ? [...new Set(product.variants.map((v: any) => v.color))]
    : [];

  return (
    <div className="group relative bg-white rounded-3xl p-3 border-2 border-gray-200 transition-all duration-500 hover:shadow-md hover:-translate-y-1">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#F9F8F7]">
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#864227] hover:bg-[#864227] hover:text-white transition-all">
            <i className={`${saved ? "fa-solid" : "fa-regular"} fa-heart text-sm`} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#864227] hover:bg-[#864227] hover:text-white transition-all">
            <i className="fa-solid fa-arrow-right-arrow-left text-sm" />
          </button>
        </div>

        <Link href={`/products/${product.productId}`} className="block w-full h-full">
          <Image
            src={product.imageUrls}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="pt-4 pb-1 px-1 flex flex-col">
        <Link href={"/brandDetails"} className="text-sm font-semibold text-[#864227] block mb-2">
          {product.brandName}
        </Link>

        <Link href={`/products/${product.productId}`}>
          <h3 className="text-lg text-slate-800 font-medium line-clamp-1 group-hover:text-[#864227] transition-colors leading-tight">
            {product.productName}
          </h3>
        </Link>

        {/* الألوان */}
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
              <span className="text-[10px] text-gray-400">+{uniqueColors.length - 5}</span>
            )}
          </div>
        )}

        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-medium">Price</span>
            <span className="text-xl font-bold text-slate-900 leading-none">
              {product.basePrice}{" "}
              <small className="text-[10px] font-normal">EGP</small>
            </span>
          </div>

          <button className="h-10 w-10 rounded-full bg-[#864227] text-white flex items-center justify-center hover:bg-[#6d351f] transition-all shadow-lg active:scale-90">
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}