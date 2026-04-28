import Link from "next/link";
import CategoryCard from "../../cards/CategoryCard/CategoryCard";
import { categoryType } from "@/app/types/category.type";
import { getAllCategory } from "@/app/api/serverFunction/serverFunctions.api";
export default async function Category() {
  const categories = await getAllCategory(); 
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

 
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl  text-[#2D3A30]">
              Explore Our <span className=" text-[#864227]">Categories</span>
            </h2>
            <div className="h-0.5 w-16 bg-[#864227]" />
          </div>

          <Link href='/categories' className="text-sm font-bold tracking-widest uppercase text-[#864227] hover:opacity-70 transition-opacity">
            View All
          </Link>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories?.slice(0, 4).map((category: categoryType) => (
            <CategoryCard
              key={category.categoryId} category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}