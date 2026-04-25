"use client";
import { addCategory } from "@/app/api/category.api";
import {addCategoryForm,addCategorySchema} from "@/app/schema/addCategory.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddCategoryForm({showForm,setShowForm,}: {showForm: boolean;setShowForm: React.Dispatch<React.SetStateAction<boolean>>;}) {
  const queryClient = useQueryClient();

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      description: "",
      categoryName: "",
    },
    resolver: zodResolver(addCategorySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category added successfully!");
      reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Something went wrong";
      console.log(msg);
      toast.error(msg);
    },
  });

  async function handleAddCategory(values: addCategoryForm) {
    mutation.mutate(values);
  }

  return (
    <div>
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base"
            >
              <Plus size={18} />
              <span>Add New Category</span>
            </button>
          ) : (
            <div className="bg-white rounded-lg border border-stone-200 p-5 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  Add New Category
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                  }}
                  className="text-stone-600 hover:text-stone-900 transition text-xl"
                >
                  ×
                </button>
              </div>

              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(handleAddCategory)}
              >
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm sm:text-base font-semibold text-stone-900 mb-2"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    placeholder="Enter category name"
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition text-sm sm:text-base"
                    {...register("categoryName")}
                  />
                  {formState.errors.categoryName && (
                    <p className="text-red-500 text-sm font-medium">
                      {formState.errors.categoryName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="categoryDescription"
                    className="block text-sm sm:text-base font-semibold text-stone-900 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="categoryDescription"
                    placeholder="Enter category description"
                    rows={3}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition resize-none text-sm sm:text-base"
                    {...register("description")}
                  />
                  {formState.errors.description && (
                    <p className="text-red-500 text-sm font-medium">
                      {formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base"
                  >
                    {mutation.isPending ? "Adding..." : "Add Category"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                    }}
                    className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}