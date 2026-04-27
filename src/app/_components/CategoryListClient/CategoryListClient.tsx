"use client";
import React, { useState } from "react";
import CategoryCard from "@/app/_components/cards/CategoryCard/CategoryCard";
import AddCategoryForm from "@/app/_components/forms/AddCategoryForm/AddCategoryForm";
import { categoryType } from "@/app/types/category.type";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/app/api/category.api";

export default function CategoryListClient({ initialData }: { initialData?: categoryType[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<categoryType | null>(null);

  const { userInfo } = useSelector((appState: AppState) => appState.auth);

  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategory,
    initialData,
  });

  function handleEdit(category: categoryType) {
    setEditCategoryData(category);
    setShowForm(true);
  }

  function handleCloseForm(val: boolean) {
    setShowForm(val);
    if (!val) setEditCategoryData(null);
  }

  return (
    <>
      {userInfo?.userType === "Admin" ? (
        <>
          <div className="mb-6 px-12">
            <h2 className="text-[#864227] text-4xl font-bold">Manage Categories</h2>
            <p className="text-[#796C63] mt-4 font-light">
              Take control of your product categories. <br />
              Streamline organization, maintain consistency, and optimize your catalog structure.
            </p>
          </div>
          <AddCategoryForm
            showForm={showForm}
            setShowForm={handleCloseForm}
            editCategoryData={editCategoryData}
          />
        </>
      ) : (
        <div className="mb-6 px-12">
          <h2 className="text-[#864227] text-4xl font-bold">Discover Our Collections</h2>
          <p className="text-[#796C63] mt-4 font-light">
            From daily essentials to premium picks, dive into our <br />
            diverse categories and discover a world of quality crafted just for you.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-10">
        {categories?.map((category: categoryType) => (
          <CategoryCard
            key={category.categoryId}
            category={category}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
}