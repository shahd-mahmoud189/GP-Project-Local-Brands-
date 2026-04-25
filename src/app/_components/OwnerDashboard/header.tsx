"use client"

import { Bell, ChevronDown, Search } from "lucide-react"
import { Tab } from "./sidebar"

const TAB_TITLES: Record<Tab, string> = {
  dashboard: "Dashboard ",
  inventory: "My Products",
  "add-product": "Add New Product",
  orders: "Orders Management",
}

interface HeaderProps {
  activeTab: Tab
}

export function Header({ activeTab }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#E8E4E0] sticky top-0 z-30">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        {/* Concentric rings watermark logo */}
        {/* <div className="relative w-9 h-9 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden="true">
            <circle cx="18" cy="18" r="16" fill="none" stroke="#BC5439" strokeWidth="1" opacity="0.2" />
            <circle cx="18" cy="18" r="11" fill="none" stroke="#BC5439" strokeWidth="1" opacity="0.3" />
            <circle cx="18" cy="18" r="6" fill="none" stroke="#BC5439" strokeWidth="1" opacity="0.5" />
            <circle cx="18" cy="18" r="2.5" fill="#BC5439" />
          </svg>
        </div> */}
        <div>

          <h2 className=" font-bold text-[#2D2D2D] text-base leading-tight">Aurelius Studio</h2>
        </div>
      </div>

      {/* Page title */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <h1 className=" text-base font-semibold text-[#2D2D2D]">{TAB_TITLES[activeTab]}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Search"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-[#E8E4E0] hover:text-[#2D2D2D] transition-colors"
        >

        </button>
        <button
          aria-label="Notifications"
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-[#E8E4E0] hover:text-[#2D2D2D] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#BC5439] rounded-full ring-2 ring-white" />
        </button>
        {/* <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#E8E4E0] transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#BC5439] flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="text-sm font-medium text-[#2D2D2D] hidden sm:block">Aurelius</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button> */}
      </div>
    </header>
  )
}
