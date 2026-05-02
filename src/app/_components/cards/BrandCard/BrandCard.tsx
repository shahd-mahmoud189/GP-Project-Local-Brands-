import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/app/types/brand.type";
import { getImageUrl } from "@/app/utils/imageUrl";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <div className="group  relative flex flex-col h-full items-center justify-between text-center overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md  hover:-translate-y-2">
      <div className="flex flex-col items-center gap-4 w-full grow">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-transform duration-500 ">
          <Image
            src={getImageUrl(brand.logoUrl)}
            alt={`${brand.brandName} logo`}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <h3 className="text-xl font-bold text-gray-950 tracking-tight group-hover:text-[#864227] transition-colors leading-tight line-clamp-1">
            {brand.brandName}
          </h3>

          <span className="inline-block text-[9px] font-black tracking-[0.2em] text-[#864227] bg-[#864227]/15 px-3 py-1 rounded-full uppercase">
            {brand.ownerName}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-gray-400 font-light leading-relaxed px-1">
          {brand.description}
        </p>
      </div>

      <div className="w-full mt-8">
        <Link
          href={`/brands/${brand.brandId}`}
          className="group/btn relative flex items-center justify-center gap-2 w-full overflow-hidden rounded-full border border-1.5 border-[#864227] py-3.5 text-[11px] font-bold uppercase tracking-widest text-[#864227] transition-all duration-300 hover:bg-[#864227] hover:text-white hover:border-[#864227] active:scale-[0.96]"
        >
          View Brand
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default BrandCard;
