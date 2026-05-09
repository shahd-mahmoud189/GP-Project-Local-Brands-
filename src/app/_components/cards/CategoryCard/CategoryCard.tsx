"use client";
import { categoryType } from "@/app/types/category.type";
import Link from "next/link";
import { Trash2, Edit, ShoppingBag, ArrowRight } from "lucide-react"; // استبدلت الـ FontAwesome بـ Lucide لتوحيد الشكل
import { useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import { deleteCategory } from "@/app/api/category.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface CategoryCardProps {
  category: categoryType;
  onEdit?: (category: categoryType) => void;
}

export default function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const { userInfo } = useSelector((appState: AppState) => appState.auth);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteCategory(category.categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category deleted successfully!");
    },
    onError: (error: any) => {
      const data = error.response?.data;
      const message = Array.isArray(data) ? data[0] : data?.message || "Failed to delete category";
      toast.error(message);
    },
  });

  return (
    <Link href={`/categoryDetails/${category.categoryId}`} className="group block h-full">
      <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
        
        {/* Header Section with Gradient */}
        <div className="relative p-6 sm:p-8 bg-linear-to-br from-sky-600 to-cyan-700 overflow-hidden min-h-35 flex flex-col justify-end">
          {/* Decorative Shapes */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          <div className="absolute top-4 right-4 z-20">
             <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                {category?.productCount} Products
             </div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-3 inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight line-clamp-1">
              {category?.categoryName}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col grow bg-white">
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-2 mb-6 group-hover:text-slate-700 transition-colors">
            {category?.description || "Explore our exclusive collection of products in this category."}
          </p>

          <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-sky-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Collection <ArrowRight size={16} />
                </span>
            </div>

            {/* Admin Actions */}
            {userInfo?.userType === "Admin" && onEdit && (
              <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={() => onEdit(category)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 py-2.5 rounded-xl font-bold transition-all duration-200 text-xs sm:text-sm"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm"
                >
                  <Trash2 size={16} />
                  <span>{deleteMutation.isPending ? "..." : "Delete"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}