// "use client";

// import { useState } from "react";
// import {
//   Package,
//   Search,
//   LayoutGrid,
//   List,
// } from "lucide-react";

// import { Product, MOCK_PRODUCTS, STATUS_FILTER_TABS, ProductStatus } from "./Inventory/inventory.types";
// import { InventoryGrid } from "./Inventory/InventoryGrid";
// import { InventoryTable } from "./Inventory/InventoryTable";
// // import { EditProductModal } from "./Inventory/EditProductModal";

// export function InventoryTab() {
//   const [filter, setFilter] = useState<"All" | ProductStatus>("All");
//   const [search, setSearch] = useState("");
//   const [view, setView] = useState<"table" | "grid">("table");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const handleEdit = (product: Product) => {
//     setSelectedProduct(product);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       alert(`Deleted product with ID: ${id}`);
//       // Logic to delete product from database/state
//     }
//   };

//   const filtered = MOCK_PRODUCTS.filter((p) => {
//     const matchStatus = filter === "All" || p.status === filter;
//     const matchSearch =
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase()) ||
//       p.description.toLowerCase().includes(search.toLowerCase());
//     return matchStatus && matchSearch;
//   });

//   const counts = {
//     All: MOCK_PRODUCTS.length,
//     Approved: MOCK_PRODUCTS.filter((p) => p.status === "Approved").length,
//     Pending: MOCK_PRODUCTS.filter((p) => p.status === "Pending").length,
//     Rejected: MOCK_PRODUCTS.filter((p) => p.status === "Rejected").length,
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-12 py-10 space-y-6">
//       {/* Toolbar */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         {/* Status Filter Tabs */}
//         <div className="flex items-center gap-1 p-1 bg-[#E8E4E0] rounded-xl">
//           {STATUS_FILTER_TABS.map(({ key, label }) => (
//             <button
//               key={key}
//               onClick={() => setFilter(key)}
//               className={`
//                 text-xs font-semibold px-4 py-2 rounded-lg transition-all
//                 ${filter === key
//                   ? "bg-white text-[#2D2D2D] shadow-sm"
//                   : "text-gray-500 hover:text-[#2D2D2D]"
//                 }
//               `}
//             >
//               {label}
//               <span
//                 className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${filter === key
//                     ? "bg-[#BC5439] text-white"
//                     : "bg-gray-200 text-gray-500"
//                   }`}
//               >
//                 {counts[key]}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Actions & Search */}
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           {/* Search Bar */}
//           <div className="relative flex-1 sm:w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E4E0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BC5439]/20 transition-all"
//             />
//           </div>

//           {/* View Toggle */}
//           <div className="flex items-center p-1 bg-[#E8E4E0] rounded-xl">
//             <button
//               onClick={() => setView("table")}
//               className={`p-2 rounded-lg transition-all ${view === "table"
//                   ? "bg-white text-[#BC5439] shadow-sm"
//                   : "text-gray-500 hover:text-[#2D2D2D]"
//                 }`}
//               title="Table View"
//             >
//               <List className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => setView("grid")}
//               className={`p-2 rounded-lg transition-all ${view === "grid"
//                   ? "bg-white text-[#BC5439] shadow-sm"
//                   : "text-gray-500 hover:text-[#2D2D2D]"
//                 }`}
//               title="Grid View"
//             >
//               <LayoutGrid className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="min-h-[400px]">
//         {filtered.length > 0 ? (
//           view === "grid" ? (
//             <InventoryGrid
//               products={filtered}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ) : (
//             <InventoryTable
//               products={filtered}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           )
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
//             <Package className="w-12 h-12 text-gray-200 mb-4" />
//             <p className="text-gray-500 font-medium">No products found matching your search</p>
//             <button
//               onClick={() => { setSearch(""); setFilter("All"); }}
//               className="mt-4 text-[#BC5439] text-sm font-bold hover:underline"
//             >
//               Clear all filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {/* <EditProductModal
//         product={selectedProduct}
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedProduct(null);
//         }}
//       /> */}
//     </div>
//   );
// }

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

  function handleEdit(product: Product) {
    console.log("Edit:", product);
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
    </div>
  );
}