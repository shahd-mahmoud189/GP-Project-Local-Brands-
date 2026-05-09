"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { removeFromCompare, toggleDrawer, clearCompare } from "@/app/store/slices/compare.slice";
import Image from "next/image";
import { X, ArrowRightLeft, Trash2, LayoutGrid, LayoutPanelLeft } from "lucide-react";
import Swal from "sweetalert2"; 

const BASE_URL = "https://brands-system-production-c110.up.railway.app";

export default function CompareDrawer() {
    const dispatch = useAppDispatch();
    const { items, isOpen } = useAppSelector((state) => state.compare);

    const getImageUrl = (path: string) => {
        if (!path) return "/unnamed.png";
        const firstImage = path.split(",")[0];
        if (firstImage.startsWith("http")) return firstImage;
        return `${BASE_URL}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;
    };


    const handleClearCompare = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to clear your compare list?",
            icon: "question", 
            showCancelButton: true,
            confirmButtonColor: "#13A619", 
            cancelButtonColor: "#D62833", 
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "No, keep it",
            reverseButtons: true,
            customClass: {
                popup: 'rounded-[2rem]', 
                confirmButton: 'rounded-xl px-6 py-2 font-bold',
                cancelButton: 'rounded-xl px-6 py-2 font-bold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearCompare());
                
          
                Swal.fire({
                    title: "Cleared!",
                    text: "Your list is now empty.",
                    icon: "success",
                    confirmButtonColor: "#13A619",
                    customClass: { popup: 'rounded-[2rem]' }
                });
            }
        });
    };

    if (items.length === 0 && !isOpen) return null;

    return (
        <>
            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-l border-gray-100 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full bg-gray-50/20">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                                <LayoutPanelLeft className="text-[#864227]" size={24} />
                                Compare List
                            </h2>
                            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter mt-1">
                                {items.length} of 4 slots filled
                            </p>
                        </div>
                        <button
                            onClick={() => dispatch(toggleDrawer(false))}
                            className="p-2 hover:bg-red-50 rounded-full transition-all text-gray-400 hover:text-red-500"
                        >
                            <X size={26} />
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-20">
                                <LayoutGrid size={80} strokeWidth={1} />
                                <p className="text-sm font-bold tracking-widest uppercase">Empty List</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-5">
                                {items.map((product) => (
                                    <div 
                                        key={product.productId} 
                                        className="group relative flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden  hover:-translate-y-1 transition-all duration-500"
                                    >
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                                            <Image
                                                src={getImageUrl(product.imageUrls)}
                                                alt={product.productName}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3">
                                                <button
                                                    onClick={() => dispatch(removeFromCompare(product.productId))}
                                                    className="bg-white/90 backdrop-blur-md text-red-600 p-2 rounded-full shadow-xl hover:bg-red-600 hover:text-white transition-all transform scale-75 group-hover:scale-100"
                                                >
                                                    <X size={16} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 flex flex-col items-center text-center">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#864227] font-black mb-1">
                                                {product.brandName}
                                            </span>
                                            <h3 className="text-xs font-bold text-slate-800 line-clamp-1 mb-2">
                                                {product.productName}
                                            </h3>
                                            <div className="w-8 h-[2px] bg-gray-100 mb-2"></div>
                                            <p className="text-sm font-black text-slate-900">
                                                {product.basePrice} <span className="text-[10px] text-gray-400">EGP</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                 
                         
                            <button
                                onClick={handleClearCompare}
                                className="w-full text-gray-600 mt-4 py-1 text-[14px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                                Reset Selection
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Side Floating Badge */}
            {!isOpen && items.length > 0 && (
                <button
                    onClick={() => dispatch(toggleDrawer(true))}
                    className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#864227] text-white py-6 px-3 rounded-l-[2rem] z-[90]  group transition-all duration-500 "
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <ArrowRightLeft size={22} className="group-hover:rotate-180 transition-transform duration-700" />
                            <span className="absolute -top-4 -right-4 bg-white text-[#864227] text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#864227] shadow-lg">
                                {items.length}
                            </span>
                        </div>
                        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-black uppercase tracking-[0.3em]">
                            Compare
                        </span>
                    </div>
                </button>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-[6px] z-[95] transition-opacity duration-700"
                    onClick={() => dispatch(toggleDrawer(false))}
                />
            )}
        </>
    );
}