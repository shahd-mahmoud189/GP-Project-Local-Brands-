"use client";

import { AlertTriangle, Pencil, Trash2 } from "lucide-react";
import { Product, ProductStatus } from "./inventory.types";
import { StatusBadge } from "./StatusBadge";
import { getImageUrl } from "@/app/utils/imageUrl";

interface InventoryTableProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export function InventoryTable({
  products,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E8E4E0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E4E0] bg-gray-50/50">
              <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">
                Product
              </th>
              <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5 hidden lg:table-cell">
                Category
              </th>
              <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">
                Price
              </th>
              <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">
                Stock
              </th>
              <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">
                Status
              </th>
              <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E4E0]">
            {products.map((product) => {
              const totalStock = product.variants.reduce(
                (acc, v) => acc + v.stockQuantity,
                0,
              );
              const isLowStock = totalStock < 5;
              return (
                <tr
                  key={product.productId}
                  className={`hover:bg-gray-50 transition-colors ${isLowStock && product.approvalStatusText === "Approved" ? "bg-amber-50/50" : ""}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img
                          src={getImageUrl(product.imageUrls)}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.png";
                          }}
                        />
                      </div>
                      <div className="max-w-50">
                        <p className="text-sm font-bold text-[#2D2D2D] truncate">
                          {product.productName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                          #{product.productId}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-500 font-medium">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-[#BC5439]">
                      EGP {product.basePrice.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-sm font-bold ${totalStock === 0 ? "text-red-600" : totalStock < 5 ? "text-amber-600" : "text-[#2D2D2D]"}`}
                      >
                        {totalStock} units
                      </span>
                      {isLowStock &&
                        product.approvalStatusText === "Approved" && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-600 font-bold uppercase">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            Low Stock
                          </span>
                        )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      status={product.approvalStatusText as ProductStatus}
                      rejectReason={product.rejectionReason}
                    />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#E8E4E0] hover:text-[#2D2D2D] transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product.productId)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
