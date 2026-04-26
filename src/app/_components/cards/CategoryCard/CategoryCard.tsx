import { categoryType } from "@/app/types/category.type";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: categoryType;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categoryDetails/${category.categoryId}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div
          className={`bg-linear-to-br from-amber-700 to-amber-800 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-40 sm:min-h-48`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="bg-white bg-opacity-20 p-3  sm:p-4 rounded-full group-hover:bg-opacity-30 transition-all">
              <i className="fa-solid fa-shopping-bag text-amber-800 text-xl sm:w-6 sm:h-6"></i>
            </div>
            <div className="bg-white text-amber-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
              {category?.productCount}
            </div>
          </div>

          <h2 className="text-2xl sm:text-2xl font-bold text-white mt-4 relative z-10 group-hover:text-amber-50 transition">
            {category?.categoryName}
          </h2>
        </div>

        <div className="p-4 sm:p-6 flex flex-col grow">
          <p className="text-stone-600 text-sm sm:text-base mb-6 line-clamp-2 group-hover:text-stone-700 transition grow">
            {category?.description}
          </p>

          <div className="flex items-center gap-2 text-amber-800 font-semibold group-hover:text-amber-900 group-hover:gap-3 transition-all">
            <span className="text-sm sm:text-base">View Products</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>
      </div>
    </Link>
  );
}
