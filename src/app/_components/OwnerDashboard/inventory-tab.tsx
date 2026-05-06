"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppState } from "@/app/store/store";
import api from "@/lib/service";
import { InventoryGrid } from "./Inventory/InventoryGrid";
import { InventoryTable } from "./Inventory/InventoryTable";
import { Product, STATUS_FILTER_TABS } from "./Inventory/inventory.types";
import { toast } from "react-toastify";
import { deleteProductClient } from "@/app/api/product.api";
import { EditProductModal } from "./Inventory/EditProductModal";

async function getMyProductsClient(brandId: number) {
  const { data } = await api.get(`/api/Products/brand/${brandId}`);
  return data;
}

export default function InventoryTap() {
  const queryClient = useQueryClient();
  const { brandId } = useSelector((appState: AppState) => appState.brand);
  
  const [view, setView] = useState<"grid" | "table">("grid");
  const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Pending" | "Rejected">("All");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["myProducts", brandId],
    queryFn: () => getMyProductsClient(brandId!),
    enabled: !!brandId,
  });

  

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProductClient(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["myProducts", brandId] }); // ← بيعمل refetch تلقائي
    },
    onError: (error: any) => {
  const data = error.response?.data;
  const message = Array.isArray(data) ? data[0] : data?.message || "Failed to delete product";
  toast.error(message);
},
  });

  const filtered = statusFilter === "All"
    ? products
    : products.filter((p: Product) => p.approvalStatusText === statusFilter);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

function handleEdit(product: Product) {
  setEditProduct(product);
  setIsEditModalOpen(true);
}

  function handleDelete(id: number) {
    deleteMutation.mutate(id);
  }

  if (!brandId) return <p className="p-8 text-stone-500">No brand found.</p>;
  if (isLoading) return <p className="p-8 text-stone-500">Loading products...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2D2D2D]">My Products</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${view === "grid" ? "bg-[#864227] text-white" : "bg-white border border-[#E8E4E0] text-gray-500"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${view === "table" ? "bg-[#864227] text-white" : "bg-white border border-[#E8E4E0] text-gray-500"}`}
          >
            Table
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${statusFilter === tab.key ? "bg-[#864227] text-white border-[#864227]" : "bg-white text-gray-500 border-[#E8E4E0] hover:border-[#864227]"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-400 text-sm">No products found.</p>
      ) : view === "grid" ? (
        <InventoryGrid products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <InventoryTable products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <EditProductModal
      product={editProduct}
      isOpen={isEditModalOpen}
      onClose={() => {
        setIsEditModalOpen(false);
        setEditProduct(null);
        queryClient.invalidateQueries({ queryKey: ["myProducts", brandId] });
      }}
    />
    </div>
  );
}