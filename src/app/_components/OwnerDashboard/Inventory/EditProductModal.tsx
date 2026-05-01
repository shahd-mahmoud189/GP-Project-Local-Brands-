// "use client";

// import { X } from "lucide-react";
// import { Product } from "./inventory.types";
// import { AddProductTab } from "../AddProduct";

// interface EditProductModalProps {
//     product: Product | null;
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function EditProductModal({ product, isOpen, onClose }: EditProductModalProps) {
//     if (!isOpen || !product) return null;

//     // Map Product type to CreateProductForm
//     const initialData: Partial<CreateProductForm> = {
//         productName: product.name,
//         description: product.description,
//         imageUrls: product.imageUrl,
//         basePrice: product.price,
//         stockQuantity: product.stock,
//         // Note: In a real app, categoryId would be mapped from the category string/ID
//         categoryId: 1,
//         variants: [], // Initializing as empty for now
//         customization: null
//     };

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//             {/* Backdrop */}
//             <div
//                 className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//                 onClick={onClose}
//             />

//             {/* Modal Content */}
//             <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#F8F7F5] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#E8E4E0]">
//                     <div>
//                         <h2 className="text-xl font-bold text-[#2D2D2D]">Edit Product</h2>
//                         <p className="text-xs text-gray-500 mt-0.5">Update the details for "{product.name}"</p>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#2D2D2D] transition-colors"
//                     >
//                         <X className="w-5 h-5" />
//                     </button>
//                 </div>

//                 {/* Form Area */}
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                     <AddProductTab initialData={initialData} onSuccess={onClose} />
//                 </div>
//             </div>
//         </div>
//     );
// }
