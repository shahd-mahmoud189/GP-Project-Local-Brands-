import Image from "next/image";
import React from "react";
import { CartItem } from "@/app/types/cart.type";

const BASE_URL = "https://graduationprojectclean-production.up.railway.app";

export default function OrderItem({ item, status }: { item?: CartItem, status?: boolean }) {
  if (!item) return null;

  const getImageUrl = (path: string) => {
    if (!path) return "/unnamed (1).png";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      <Image
        src={getImageUrl(item.productImage)}
        alt={item.productName}
        width={100}
        height={100}
        className="w-16 h-16 object-cover rounded-xl"
      />
      <div className="flex-1">
        <h3 className="font-bold text-sm">{item.productName}</h3>
        <p className="text-[#54433D] text-xs font-light">
          {item.size || item.color ? `${item.size || ''} ${item.color || ''}` : item.brandName}
        </p>
        {item.hasCustomization && (
          <p className="text-[10px] text-[#0288D1] italic font-medium">Customized</p>
        )}
        <p className="text-[#0288D1] font-medium text-sm mt-1">{item.unitPrice} EGP x {item.quantity}</p>
      </div>
      {status && (
        <div className="rounded-2xl py-1 px-3 bg-[#F8EEEB] text-[10px] uppercase text-[#BC5439] font-bold">
          processing
        </div>
      )}
    </div>
  );
}
