"use client";

import { Product } from "./inventory.types";
import { ProductDashboardCard } from "./ProductDashboardCard";

interface InventoryGridProps {
    products: Product[];
    onEdit: (p: Product) => void;
    onDelete: (id: number) => void;
}

export function InventoryGrid({ products, onEdit, onDelete }: InventoryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductDashboardCard
                    key={product.productId}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}