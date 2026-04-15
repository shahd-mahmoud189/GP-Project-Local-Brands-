"use client"

import { useState } from "react"
import { Pencil, Trash2, Info, AlertTriangle, Package, Search } from "lucide-react"

type ProductStatus = "Approved" | "Pending" | "Rejected"

interface Product {
  id: string
  name: string
  category: string
  stock: number
  status: ProductStatus
  rejectReason?: string
  price: number
}

const PRODUCTS: Product[] = [
  { id: "P001", name: "Indigo Washed Hoodie", category: "Apparel > Hoodie", stock: 42, status: "Approved", price: 1450 },
  { id: "P002", name: "Terracotta Tote Bag", category: "Accessories > Bag", stock: 3, status: "Approved", price: 890 },
  { id: "P003", name: "Cream Oversized Crewneck", category: "Apparel > Crewneck", stock: 18, status: "Approved", price: 1200 },
  { id: "P004", name: "Desert Sand Cap", category: "Accessories > Cap", stock: 0, status: "Pending", price: 450 },
  { id: "P005", name: "Midnight Bomber Jacket", category: "Apparel > Jacket", stock: 8, status: "Pending", price: 3200 },
  { id: "P006", name: "AI-Generated Poster Set", category: "Art > Print", stock: 25, status: "Rejected", rejectReason: "AI-Generated image detected. Please upload original photographs.", price: 650 },
  { id: "P007", name: "Handwoven Keychain Bundle", category: "Accessories > Keychain", stock: 4, status: "Approved", price: 280 },
  { id: "P008", name: "Vintage Logo Tee", category: "Apparel > T-Shirt", stock: 2, status: "Approved", price: 780 },
]

const STATUS_FILTER_TABS: { key: "All" | ProductStatus; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Approved", label: "Approved" },
  { key: "Pending", label: "Pending" },
  { key: "Rejected", label: "Rejected" },
]

const STATUS_BADGE: Record<ProductStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
}

const STATUS_DOT: Record<ProductStatus, string> = {
  Approved: "bg-emerald-500",
  Pending: "bg-amber-400",
  Rejected: "bg-red-500",
}

function StatusBadge({ status, rejectReason }: { status: ProductStatus; rejectReason?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
        {status}
      </span>
      {status === "Rejected" && rejectReason && (
        <div className="relative">
          <button
            aria-label="View rejection reason"
            onClick={() => setShow((s) => !s)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {show && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 w-56 rounded-lg border border-red-200 bg-red-50 p-3 shadow-lg">
              <p className="text-[11px] text-red-700 leading-relaxed">{rejectReason}</p>
              <button onClick={() => setShow(false)} className="text-[10px] text-red-500 mt-1.5 font-medium hover:underline">Dismiss</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function InventoryTab() {
  const [filter, setFilter] = useState<"All" | ProductStatus>("All")
  const [search, setSearch] = useState("")

  const filtered = PRODUCTS.filter((p) => {
    const matchStatus = filter === "All" || p.status === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    All: PRODUCTS.length,
    Approved: PRODUCTS.filter((p) => p.status === "Approved").length,
    Pending: PRODUCTS.filter((p) => p.status === "Pending").length,
    Rejected: PRODUCTS.filter((p) => p.status === "Rejected").length,
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#E8E4E0] rounded-lg">
          {STATUS_FILTER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`
                text-xs font-medium px-3 py-1.5 rounded-md transition-all
                ${filter === key
                  ? "bg-white text-[#2D2D2D] shadow-sm"
                  : "text-gray-500 hover:text-[#2D2D2D]"
                }
              `}
            >
              {label}
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                filter === key ? "bg-[#BC5439] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm bg-white border border-[#E8E4E0] rounded-lg text-[#2D2D2D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC5439]/30 focus:border-[#BC5439] w-52"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E4E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E4E0] bg-gray-50/50">
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Product</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">Category</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Price</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Stock</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">Status</th>
                <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4E0]">
              {filtered.map((product) => {
                const isLowStock = product.stock < 5
                return (
                  <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${isLowStock && product.status === "Approved" ? "bg-amber-50/50" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#E8E4E0] flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2D2D2D]">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs text-gray-500">{product.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-[#2D2D2D]">EGP {product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 5 ? "text-amber-600" : "text-[#2D2D2D]"}`}>
                          {product.stock} units
                        </span>
                        {isLowStock && product.status === "Approved" && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-600 font-medium">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            {product.stock === 0 ? "Out of stock" : "Low Stock — Restock Now"}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={product.status} rejectReason={product.rejectReason} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          aria-label="Edit product"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-[#E8E4E0] hover:text-[#2D2D2D] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          aria-label="Delete product"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No products found</p>
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-[#E8E4E0] bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {PRODUCTS.length} products</p>
          <button className="text-xs text-[#BC5439] font-medium hover:underline">Export CSV</button>
        </div>
      </div>
    </div>
  )
}
