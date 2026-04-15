"use client"

import { useState } from "react"
import { ChevronDown, Package, MapPin, Clock, Scissors, Printer } from "lucide-react"

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered"

interface Order {
  id: string
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

const ORDERS: Order[] = [
  {
    id: "#ORD-4821",
    customer: "Nour El-Din Hassan",
    city: "Cairo",
    product: "Indigo Washed Hoodie",
    details: "Black · Size L",
    customization: "Embroidery on Left Sleeve",
    amount: 1450,
    status: "Processing",
    date: "Apr 13, 2026",
    avatar: "N",
  },
  {
    id: "#ORD-4820",
    customer: "Farah Youssef",
    city: "Alexandria",
    product: "Terracotta Tote Bag",
    details: "Natural · One Size",
    customization: "Screen Print — Custom Logo (Front)",
    amount: 890,
    status: "Shipped",
    date: "Apr 12, 2026",
    avatar: "F",
  },
  {
    id: "#ORD-4819",
    customer: "Karim Selim",
    city: "Giza",
    product: "Cream Oversized Crewneck",
    details: "Cream · Size XL",
    customization: null,
    amount: 2200,
    status: "Delivered",
    date: "Apr 11, 2026",
    avatar: "K",
  },
  {
    id: "#ORD-4818",
    customer: "Sara Mahmoud",
    city: "Cairo",
    product: "Indigo Washed Hoodie",
    details: "Black · Size M",
    customization: "Heat Transfer — Back Print",
    amount: 1650,
    status: "Pending",
    date: "Apr 14, 2026",
    avatar: "S",
  },
  {
    id: "#ORD-4817",
    customer: "Omar Tarek",
    city: "Hurghada",
    product: "Desert Sand Cap",
    details: "Beige · One Size",
    customization: "Embroidery on Front Panel",
    amount: 650,
    status: "Processing",
    date: "Apr 13, 2026",
    avatar: "O",
  },
  {
    id: "#ORD-4816",
    customer: "Hana Mostafa",
    city: "Mansoura",
    product: "Vintage Logo Tee",
    details: "White · Size S",
    customization: null,
    amount: 780,
    status: "Delivered",
    date: "Apr 10, 2026",
    avatar: "H",
  },
]

const LIFECYCLE: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"]

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

const STATUS_DOT: Record<OrderStatus, string> = {
  Pending: "bg-amber-400",
  Processing: "bg-blue-500",
  Shipped: "bg-indigo-500",
  Delivered: "bg-emerald-500",
}

const STATUS_PROGRESS: Record<OrderStatus, number> = {
  Pending: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
}

function StatusDropdown({ orderId, initial }: { orderId: string; initial: OrderStatus }) {
  const [value, setValue] = useState<OrderStatus>(initial)
  const [open, setOpen] = useState(false)

  const allowedNext = LIFECYCLE.filter((s) => LIFECYCLE.indexOf(s) >= LIFECYCLE.indexOf(value))

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${STATUS_COLORS[value]}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[value]}`} />
        {value}
        <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1.5 z-50 bg-white border border-[#E8E4E0] rounded-xl shadow-lg overflow-hidden min-w-[160px]">
          {allowedNext.map((status) => (
            <button
              key={status}
              onClick={() => { setValue(status); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors ${status === value ? "text-[#2D2D2D] bg-gray-50" : "text-[#2D2D2D]"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
              {status}
              {status === value && <span className="ml-auto text-[10px] text-gray-500">(current)</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProgressBar({ status }: { status: OrderStatus }) {
  const step = STATUS_PROGRESS[status]
  return (
    <div className="flex items-center gap-1 mt-1">
      {LIFECYCLE.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full transition-all ${i + 1 <= step ? "bg-[#BC5439]" : "bg-[#E8E4E0]"}`} />
          {i < LIFECYCLE.length - 1 && (
            <div className={`h-0.5 w-5 transition-all ${i + 1 < step ? "bg-[#BC5439]" : "bg-[#E8E4E0]"}`} />
          )}
        </div>
      ))}
      <span className="ml-1 text-[10px] text-gray-500">{status}</span>
    </div>
  )
}

export function OrdersTab() {
  const [filterStatus, setFilterStatus] = useState<"All" | OrderStatus>("All")

  const filtered = filterStatus === "All" ? ORDERS : ORDERS.filter((o) => o.status === filterStatus)

  const totals = {
    All: ORDERS.length,
    Pending: ORDERS.filter((o) => o.status === "Pending").length,
    Processing: ORDERS.filter((o) => o.status === "Processing").length,
    Shipped: ORDERS.filter((o) => o.status === "Shipped").length,
    Delivered: ORDERS.filter((o) => o.status === "Delivered").length,
  }

  return (
    <div className="space-y-5">
      {/* Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["Pending", "Processing", "Shipped", "Delivered"] as OrderStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(filterStatus === s ? "All" : s)}
            className={`
              flex flex-col items-start p-4 rounded-xl border transition-all text-left
              ${filterStatus === s ? "border-[#BC5439]/40 bg-[#BC5439]/5 ring-1 ring-[#BC5439]/20" : "bg-white border-[#E8E4E0] hover:border-[#E8E4E0]/80"}
            `}
          >
            <span className={`w-2 h-2 rounded-full mb-2 ${STATUS_DOT[s]}`} />
            <span className="text-xl font-bold text-[#2D2D2D]">{totals[s]}</span>
            <span className="text-xs text-gray-500 mt-0.5">{s}</span>
          </button>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#E8E4E0] rounded-lg w-fit">
        {(["All", "Pending", "Processing", "Shipped", "Delivered"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`
              text-xs font-medium px-3 py-1.5 rounded-md transition-all
              ${filterStatus === s ? "bg-white text-[#2D2D2D] shadow-sm" : "text-gray-500 hover:text-[#2D2D2D]"}
            `}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white border border-[#E8E4E0] rounded-xl overflow-hidden hover:border-[#E8E4E0]/60 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5">
              {/* Avatar & Customer */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#BC5439]/10 flex items-center justify-center text-[#BC5439] font-bold text-sm shrink-0">
                  {order.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[#2D2D2D]">{order.customer}</p>
                    <span className="text-[10px] font-mono text-gray-500">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                    <span className="text-xs text-gray-500">{order.city}</span>
                    <span className="text-gray-400">·</span>
                    <Clock className="w-3 h-3 text-gray-500 shrink-0" />
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>
                  {/* Progress */}
                  <ProgressBar status={order.status} />
                </div>
              </div>

              {/* Order details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#2D2D2D]">{order.product}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.details}</p>
                    {order.customization && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {order.customization.toLowerCase().includes("embroid") ? (
                          <Scissors className="w-3 h-3 text-[#BC5439] shrink-0" />
                        ) : (
                          <Printer className="w-3 h-3 text-[#BC5439] shrink-0" />
                        )}
                        <span className="text-[11px] text-[#BC5439] font-medium bg-[#BC5439]/10 px-2 py-0.5 rounded-full border border-[#BC5439]/20">
                          {order.customization}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount + Status control */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                <p className="text-base font-bold text-[#2D2D2D]">EGP {order.amount.toLocaleString()}</p>
                <StatusDropdown orderId={order.id} initial={order.status} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center bg-white rounded-xl border border-[#E8E4E0]">
          <Package className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No orders in this category</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-gray-500">Showing {filtered.length} orders</p>
        <button className="text-xs text-[#BC5439] font-medium hover:underline">Export orders</button>
      </div>
    </div>
  )
}
