"use client";
import { addCategory, editCategory } from "@/app/api/category.api";
import { addCategoryForm, addCategorySchema } from "@/app/schema/addCategory.schema";
import { categoryType } from "@/app/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddCategoryForm({
  showForm,
  setShowForm,
  editCategoryData,
}: {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  editCategoryData?: categoryType | null;
}) {
  const queryClient = useQueryClient();
  const isEditing = !!editCategoryData;

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: { categoryName: "", description: "" },
    resolver: zodResolver(addCategorySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (editCategoryData) {
      reset({
        categoryName: editCategoryData.categoryName,
        description: editCategoryData.description,
      });
    } else {
      reset({ categoryName: "", description: "" });
    }
  }, [editCategoryData, reset]);

  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category added successfully!");
      reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const editMutation = useMutation({
    mutationFn: (values: addCategoryForm) =>
      editCategory(editCategoryData!.categoryId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category updated successfully!");
      reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  function handleSubmitForm(values: addCategoryForm) {
    if (isEditing) {
      editMutation.mutate(values);
    } else {
      addMutation.mutate(values);
    }
  }

  const isPending = addMutation.isPending || editMutation.isPending;

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
                  {isEditing ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-stone-600 hover:text-stone-900 transition text-xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
                <div>
                  <label htmlFor="categoryName" className="block text-sm sm:text-base font-semibold text-stone-900 mb-2">
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
                    <p className="text-red-500 text-sm font-medium">{formState.errors.categoryName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="categoryDescription" className="block text-sm sm:text-base font-semibold text-stone-900 mb-2">
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
                    <p className="text-red-500 text-sm font-medium">{formState.errors.description.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base"
                  >
                    {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Category"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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