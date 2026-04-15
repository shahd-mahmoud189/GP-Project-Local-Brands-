"use client"

import { useState } from "react"
import { Sidebar, type Tab } from "../../_components/OwnerDashboard/sidebar"
import { Header } from "../../_components/OwnerDashboard/header"
import { OverviewTab } from "../../_components/OwnerDashboard/overview-tab"
import { InventoryTab } from "../../_components/OwnerDashboard/inventory-tab"
import { AddProductTab } from "../../_components/OwnerDashboard/add-product-tab"
import { OrdersTab } from "../../_components/OwnerDashboard/orders-tab"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Concentric rings watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 800 800" className="w-[800px] h-[800px] opacity-[0.04] text-foreground" fill="none">
          <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="220" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="140" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="60" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content area */}
      <div className="pl-[72px] flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <Header activeTab={activeTab} />

        {/* Page content */}
        <main className="flex-1 p-5 md:p-6 max-w-7xl w-full">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "add-product" && <AddProductTab />}
          {activeTab === "orders" && <OrdersTab />}
        </main>
      </div>
    </div>
  )
}
