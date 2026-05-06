"use client"

import { useState, useEffect } from "react"
import { ChevronDown, MapPin, Clock } from "lucide-react"
import { getAllOrders } from '@/app/api/order.api';
import { updateOrderStatus } from "@/app/api/product.api";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

interface Order {
  id: string
  orderId: number
  customer: string
  city: string
  product: string
  details: string
  customization: string | null
  amount: number
  status: OrderStatus
  date: string
  avatar: string
}

const LIFECYCLE: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"]

const STATUS_TO_INT: Record<OrderStatus, number> = {
  Pending: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
  Cancelled: 5,
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
}

const STATUS_DOT: Record<OrderStatus, string> = {
  Pending: "bg-amber-400",
  Processing: "bg-blue-500",
  Shipped: "bg-indigo-500",
  Delivered: "bg-emerald-500",
  Cancelled: "bg-red-500",
}

function StatusDropdown({
  orderId,
  currentStatus,
  onUpdate,
}: {
  orderId: number
  currentStatus: OrderStatus
  onUpdate: (id: number, newStatus: OrderStatus) => void
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const isLocked = currentStatus === "Delivered" || currentStatus === "Cancelled"

  const allowedNext = LIFECYCLE.filter(
    (s) => LIFECYCLE.indexOf(s) > LIFECYCLE.indexOf(currentStatus)
  )

  const handleSelect = async (status: OrderStatus) => {
    setOpen(false)
    setLoading(true)
    try {
      const result = await updateOrderStatus(orderId, STATUS_TO_INT[status])
      onUpdate(orderId, status)
    } catch (err) {
      console.error("Failed to update order status:", err)
    } finally {
      setLoading(false)
    }
  }

  if (isLocked) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${STATUS_COLORS[currentStatus]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[currentStatus]}`} />
        {currentStatus}
      </div>
    )
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading || allowedNext.length === 0}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
          STATUS_COLORS[currentStatus]
        } ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-sm"}`}
      >
        {loading ? (
          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[currentStatus]}`} />
        )}
        {currentStatus}
        {(!loading && allowedNext.length > 0) && <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-100" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 z-110 bg-white border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            {allowedNext.map((status) => (
              <button
                key={status}
                onClick={() => handleSelect(status)}
                className="w-full px-4 py-2.5 text-xs text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
                {status}
              </button>
            ))}
            <button
              onClick={() => handleSelect("Cancelled")}
              className="w-full px-4 py-2.5 text-xs text-left hover:bg-red-50 flex items-center gap-2 text-red-600 border-t border-gray-50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Cancel Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ProgressBar({ status }: { status: OrderStatus }) {
  const step = LIFECYCLE.indexOf(status) + 1
  if (status === "Cancelled") return <div className="mt-2 text-[10px] text-red-500 font-medium">Order Cancelled</div>

  return (
    <div className="flex items-center gap-1 mt-2">
      {LIFECYCLE.map((_, i) => (
        <div key={i} className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              i + 1 <= step ? "bg-[#BC5439]" : "bg-gray-200"
            }`}
          />
          {i < LIFECYCLE.length - 1 && (
            <div
              className={`h-0.5 w-4 ${i + 1 < step ? "bg-[#BC5439]" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filterStatus, setFilterStatus] = useState<"All" | OrderStatus>("All")
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const data = await getAllOrders()
      if (!data) return

      const mapped: Order[] = data.map((o: any) => {
        const item = o.items?.[0]
        return {
          id: `#ORD-${o.orderId}`,
          orderId: o.orderId,
          customer: o.customerName,
          city: o.shippingAddress?.split("-")[1]?.trim() || "N/A",
          product: item?.productName || "Unknown Product",
          details: `${item?.color || ""} · ${item?.size || ""}`,
          customization: item?.customization ? "Customized" : null,
          amount: o.finalTotal,
          status: (o.orderStatusText || "Pending") as OrderStatus,
          date: new Date(o.createdAt).toLocaleDateString(),
          avatar: o.customerName?.[0]?.toUpperCase() || "U",
        }
      })
      setOrders(mapped)
    } catch (err) {
      console.error("Load orders error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleUpdate = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const filtered =
    filterStatus === "All" ? orders : orders.filter((o) => o.status === filterStatus)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
        Loading orders...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-10 space-y-6">
      {/* Filter */}
      <div className="flex items-center gap-1 p-1 bg-[#E8E4E0]/50 rounded-lg w-fit overflow-x-auto">
        {(["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const).map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-4 py-1.5 rounded-md whitespace-nowrap transition-all ${
                filterStatus === s ? "bg-white shadow-sm font-semibold text-[#BC5439]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s}
            </button>
          )
        )}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm bg-white border rounded-2xl border-dashed">
          No orders found in this category.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white border border-[#E8E4E0] rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#BC5439]/10 text-[#BC5439] flex items-center justify-center font-bold text-xs">
                      {order.avatar}
                    </div>
                    <p className="font-bold text-gray-900">{order.customer}</p>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {order.city}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.date}</span>
                    <span className="font-medium text-gray-400">{order.id}</span>
                  </div>
                  <ProgressBar status={order.status} />
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <div className="font-bold text-lg text-gray-900">EGP {order.amount.toLocaleString()}</div>
                  <StatusDropdown
                    orderId={order.orderId}
                    currentStatus={order.status}
                    onUpdate={handleUpdate}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{order.product}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.details}</p>
                  </div>
                  {order.customization && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200 uppercase">
                      {order.customization}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}