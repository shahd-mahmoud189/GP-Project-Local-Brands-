"use client"

import { LayoutDashboard, Package, PlusSquare, ShoppingBag, LogOut, Store } from "lucide-react"

export type Tab = "dashboard" | "inventory" | "add-product" | "orders"

const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inventory", label: "My Products", icon: Package },
  { id: "add-product", label: "Add Product", icon: PlusSquare },
  { id: "orders", label: "Orders", icon: ShoppingBag },
]

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-[72px] flex flex-col items-center py-6 gap-2 bg-[#F7F2EA] border-r border-[#864227]">
      {/* Brand mark */}
      <div className="mb-6 flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-xl bg-[#864227] flex items-center justify-center">
          <Store className="w-5 h-5 text-white" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-1 flex-1 w-full px-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            title={label}
            aria-label={label}
            className={`
              w-full flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all duration-150 group
              ${activeTab === id
                ? "bg-[#864227] text-white"
                : "text-black-400 hover:bg-[#864227] hover:text-white"
              }
            `}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-medium tracking-wide leading-tight text-center">
              {label}
            </span>
          </button>
        ))}
      </nav>

      <button
        title="Sign Out"
        aria-label="Sign out"
        className="mt-auto flex flex-col items-center gap-1 py-3 px-1 rounded-lg text-black-400 hover:bg-[#864227] hover:text-white transition-all duration-150 w-full mx-2"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-[9px] font-medium tracking-wide">Logout</span>
      </button>
    </aside>
  )
}
