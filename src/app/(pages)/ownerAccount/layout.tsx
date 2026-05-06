"use client"

import { usePathname, useRouter } from "next/navigation"
import { Sidebar, Tab } from "../../_components/OwnerDashboard/sidebar"
import { Header } from "../../_components/OwnerDashboard/header"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

const getActiveTab = (): Tab => {
  if (pathname === "/ownerAccount/dashboard") return "dashboard"
  if (pathname === "/ownerAccount/inventory") return "inventory"
  if (pathname === "/ownerAccount/add-product") return "add-product"
  if (pathname === "/ownerAccount/my-brand") return "my-brand"
  if (pathname === "/ownerAccount/orders") return "orders"
  return "dashboard"
}

  const handleTabChange = (tab: Tab) => {
    const routes: Record<Tab, string> = {
      profile: "/ownerAccount/profile",
      dashboard: "/ownerAccount/dashboard",
      inventory: "/ownerAccount/inventory",
      "add-product": "/ownerAccount/add-product",
      "my-brand": "/ownerAccount/my-brand",
      orders: "/ownerAccount/orders",
    }
    router.push(routes[tab])
  }

  const activeTab = getActiveTab()

  return (
    <div className="flex min-h-screen bg-[#FAF8F6]">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="ml-18 flex-1 flex flex-col">
        <Header activeTab={activeTab} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}