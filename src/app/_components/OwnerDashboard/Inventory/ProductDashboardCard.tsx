// "use client";

// import { Pencil, Trash2 } from "lucide-react";
// import { Product } from "./inventory.types";
// import { StatusBadge } from "./StatusBadge";

// interface ProductDashboardCardProps {
//     product: Product;
//     onEdit: (p: Product) => void;
//     onDelete: (id: string) => void;
// }

// export function ProductDashboardCard({
//     product,
//     onEdit,
//     onDelete,
// }: ProductDashboardCardProps) {
//     const isLowStock = product.stock < 5 && product.status === "Approved";

//     return (
//         <div
//             className={`group bg-white rounded-2xl border border-[#E8E4E0] overflow-hidden transition-all hover:shadow-md ${isLowStock ? "ring-1 ring-amber-200" : ""
//                 }`}
//         >
//             {/* Image Area */}
//             <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
//                 <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                 />
//                 <div className="absolute top-3 left-3">
//                     <StatusBadge status={product.status} size="sm" />
//                 </div>
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                     <button
//                         type="button"
//                         onClick={() => onEdit(product)}
//                         className="w-9 h-9 rounded-full bg-white text-[#2D2D2D] flex items-center justify-center hover:bg-[#BC5439] hover:text-white transition-all shadow-lg"
//                     >
//                         <Pencil className="w-4 h-4" />
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => onDelete(product.id)}
//                         className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg"
//                     >
//                         <Trash2 className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>

//             {/* Info Area */}
//             <div className="p-4 space-y-3">
//                 <div>
//                     <div className="flex items-start justify-between gap-2">
//                         <h4 className="text-sm font-bold text-[#2D2D2D] line-clamp-1">
//                             {product.name}
//                         </h4>
//                         <span className="text-xs font-semibold text-[#BC5439] shrink-0">
//                             EGP {product.price.toLocaleString()}
//                         </span>
//                     </div>
//                     <p className="text-[11px] text-gray-500 mt-0.5">{product.category}</p>
//                 </div>

//                 <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed h-8">
//                     {product.description}
//                 </p>

//                 <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
//                     <div className="flex flex-col">
//                         <span className="text-[10px] text-gray-400 uppercase font-medium">
//                             Inventory
//                         </span>
//                         <span
//                             className={`text-xs font-bold ${product.stock === 0
//                                     ? "text-red-600"
//                                     : product.stock < 5
//                                         ? "text-amber-600"
//                                         : "text-[#2D2D2D]"
//                                 }`}
//                         >
//                             {product.stock} units
//                         </span>
//                     </div>
//                     {isLowStock && (
//                         <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
//                             LOW
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Product, ProductStatus } from "./inventory.types";
import { StatusBadge } from "./StatusBadge";
import { getImageUrl } from "@/app/utils/imageUrl";
import Link from "next/link";

interface ProductDashboardCardProps {
    product: Product;
    onEdit: (p: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductDashboardCard({ product, onEdit, onDelete }: ProductDashboardCardProps) {
    const totalStock = product.variants.reduce((acc, v) => acc + v.stockQuantity, 0);
    const isLowStock = totalStock < 5 && product.approvalStatusText === "Approved";

    return (
        <div className={`group bg-white rounded-2xl border border-[#E8E4E0] overflow-hidden transition-all hover:shadow-md ${isLowStock ? "ring-1 ring-amber-200" : ""}`}>
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                    src={getImageUrl(product.imageUrls)}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />
                <div className="absolute top-3 left-3">
                    <StatusBadge status={product.approvalStatusText as ProductStatus} size="sm" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="w-9 h-9 rounded-full bg-white text-[#2D2D2D] flex items-center justify-center hover:bg-[#BC5439] hover:text-white transition-all shadow-lg"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(product.productId)}
                        className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <Link href={`/products/${product.productId}`} className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#2D2D2D] line-clamp-1">{product.productName}</h4>
                        <span className="text-xs font-semibold text-[#BC5439] shrink-0">
                            EGP {product.basePrice.toLocaleString()}
                        </span>
                    </Link>
                    <p className="text-[11px] text-gray-500 mt-0.5">{product.categoryName}</p>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed h-8">{product.description}</p>

                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-medium">Inventory</span>
                        <span className={`text-xs font-bold ${totalStock === 0 ? "text-red-600" : totalStock < 5 ? "text-amber-600" : "text-[#2D2D2D]"}`}>
                            {totalStock} units
                        </span>
                    </div>
                    {isLowStock && (
                        <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">LOW</span>
                    )}
                </div>
            </div>
        </div>
    );
}