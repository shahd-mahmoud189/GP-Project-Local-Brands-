export type ProductStatus = "Approved" | "Pending" | "Rejected";

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    stock: number;
    status: ProductStatus;
    rejectReason?: string;
    price: number;
    imageUrl: string;
}

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

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "P001",
        name: "Indigo Washed Hoodie",
        description: "Premium weight cotton hoodie with vintage wash finish and minimal embroidery.",
        category: "Apparel > Hoodie",
        stock: 42,
        status: "Rejected",
        rejectReason: "Product does not meet quality standards.",
        price: 1450,
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&h=400&auto=format&fit=crop",
    },
    {
        id: "P003",
        name: "Cream Oversized Crewneck",
        description: "Relaxed fit crewneck sweatshirt made from organic cotton fleece.",
        category: "Apparel > Crewneck",
        stock: 18,
        status: "Approved",
        price: 1200,
        imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=300&h=400&auto=format&fit=crop",
    },
    {
        id: "P004",
        name: "Desert Sand Cap",
        description: "Adjustable 6-panel cap with structured crown and curved brim.",
        category: "Accessories > Cap",
        stock: 0,
        status: "Pending",
        price: 450,
        imageUrl: "https://images.unsplash.com/photo-1588850567047-14798529239a?q=80&w=300&h=400&auto=format&fit=crop",
    },
];
