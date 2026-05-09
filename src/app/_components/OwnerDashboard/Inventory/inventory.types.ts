import { Product as ApiProduct } from "@/app/types/product.type";

export type ProductStatus = "Approved" | "Pending" | "Rejected";

export type Product = ApiProduct;
export type ProductList = Product[];

export const STATUS_BADGE: Record<ProductStatus, string> = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
};

export const STATUS_DOT: Record<ProductStatus, string> = {
    Approved: "bg-emerald-500",
    Pending: "bg-amber-400",
    Rejected: "bg-red-500",
};

export const STATUS_FILTER_TABS: { key: "All" | ProductStatus; label: string }[] = [
    { key: "All", label: "All" },
    { key: "Approved", label: "Approved" },
    { key: "Pending", label: "Pending" },
    { key: "Rejected", label: "Rejected" },
];
