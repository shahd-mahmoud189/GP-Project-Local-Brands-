"use client"

import { useState } from "react"
import { ChevronDown, MapPin, Clock} from "lucide-react"

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

const INITIAL_ORDERS: Order[] = [
  { id: "#ORD-4821", customer: "Nour El-Din Hassan", city: "Cairo", product: "Indigo Washed Hoodie", details: "Black · Size L", customization: "Embroidery on Left Sleeve", amount: 1450, status: "Processing", date: "Apr 13, 2026", avatar: "N" },
  { id: "#ORD-4820", customer: "Farah Youssef", city: "Alexandria", product: "Terracotta Tote Bag", details: "Natural · One Size", customization: "Screen Print — Custom Logo (Front)", amount: 890, status: "Shipped", date: "Apr 12, 2026", avatar: "F" },
  { id: "#ORD-4819", customer: "Karim Selim", city: "Giza", product: "Cream Oversized Crewneck", details: "Cream · Size XL", customization: null, amount: 2200, status: "Delivered", date: "Apr 11, 2026", avatar: "K" },
  { id: "#ORD-4818", customer: "Sara Mahmoud", city: "Cairo", product: "Indigo Washed Hoodie", details: "Black · Size M", customization: "Heat Transfer — Back Print", amount: 1650, status: "Pending", date: "Apr 14, 2026", avatar: "S" },
  { id: "#ORD-4817", customer: "Omar Tarek", city: "Hurghada", product: "Desert Sand Cap", details: "Beige · One Size", customization: "Embroidery on Front Panel", amount: 650, status: "Processing", date: "Apr 13, 2026", avatar: "O" },
]

const LIFECYCLE: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"]
const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
}
const STATUS_DOT: Record<OrderStatus, string> = {
  Pending: "bg-amber-400", Processing: "bg-blue-500", Shipped: "bg-indigo-500", Delivered: "bg-emerald-500",
}

function StatusDropdown({ 
  orderId, currentStatus, onUpdate, onToggle 
}: { 
  orderId: string; currentStatus: OrderStatus; onUpdate: (id: string, s: OrderStatus) => void; onToggle: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false)
  const allowedNext = LIFECYCLE.filter((s) => LIFECYCLE.indexOf(s) >= LIFECYCLE.indexOf(currentStatus))

  const handleOpen = () => {
    const newState = !open
    setOpen(newState)
    onToggle(newState)
  }

  return (
    <div className="relative  inline-block">
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${STATUS_COLORS[currentStatus]} hover:brightness-95`}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[currentStatus]}`} />
        {currentStatus}
        <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => { setOpen(false); onToggle(false); }} />
          <div className="absolute right-0 top-full mt-2 w-44 z-[110] bg-white border border-gray-200 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="py-1">
              {allowedNext.map((status) => (
                <button
                  key={status}
                  onClick={() => { onUpdate(orderId, status); setOpen(false); onToggle(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-left hover:bg-gray-50 border-b border-gray-50 last:border-0 ${status === currentStatus ? "bg-gray-50 text-[#BC5439]" : "text-gray-700"}`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
                  {status}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ProgressBar({ status }: { status: OrderStatus }) {
  const step = LIFECYCLE.indexOf(status) + 1
  return (
    <div className="flex items-center gap-1 mt-2">
      {LIFECYCLE.map((_, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-[#BC5439]" : "bg-gray-200"}`} />
          {i < LIFECYCLE.length - 1 && <div className={`h-0.5 w-4 transition-all duration-500 ${i + 1 < step ? "bg-[#BC5439]" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )
}

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [filterStatus, setFilterStatus] = useState<"All" | OrderStatus>("All")
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)

  const handleUpdate = (id: string, s: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: s } : o))
  }

  const filtered = filterStatus === "All" ? orders : orders.filter((o) => o.status === filterStatus)

  const totals = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    Processing: orders.filter((o) => o.status === "Processing").length,
    Shipped: orders.filter((o) => o.status === "Shipped").length,
    Delivered: orders.filter((o) => o.status === "Delivered").length,
  }

  return (
    <div className="container mx-auto px-12 py-10 space-y-6">
      

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#E8E4E0]/50 rounded-lg w-fit">
        {(["All", "Pending", "Processing", "Shipped", "Delivered"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`text-xs font-medium px-4 py-1.5 rounded-md transition-all ${filterStatus === s ? "bg-white text-[#2D2D2D] shadow-sm" : "text-gray-500 hover:text-[#2D2D2D]"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 3. Orders List */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div 
            key={order.id} 
            className={`bg-white border border-gray-200 rounded-2xl p-5 transition-all relative ${activeOrderId === order.id ? 'z-[50] shadow-xl' : 'z-[10]'}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Customer */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#BC5439]/10 flex items-center justify-center text-[#BC5439] font-bold shrink-0">
                  {order.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 truncate">{order.customer}</p>
                    <span className="text-[10px] font-mono text-gray-400">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3" /> {order.city} • <Clock className="w-3 h-3" /> {order.date}
                  </div>
                  <ProgressBar status={order.status} />
                </div>
              </div>

              {/* Product */}
              <div className="hidden lg:block flex-1 min-w-0 border-x border-gray-100 px-6">
                <p className="text-sm font-semibold text-gray-800 truncate">{order.product}</p>
                <p className="text-xs text-gray-500 mt-0.5">{order.details}</p>
                {order.customization && (
                   <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium text-[#BC5439] bg-[#BC5439]/5 px-2 py-0.5 rounded-full border border-[#BC5439]/10">
                      {order.customization}
                   </span>
                )}
              </div>

              {/* Price & Dropdown */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                <div className="text-lg font-black text-gray-900">EGP {order.amount.toLocaleString()}</div>
                <StatusDropdown 
                  orderId={order.id} 
                  currentStatus={order.status} 
                  onUpdate={handleUpdate}
                  onToggle={(isOpen) => setActiveOrderId(isOpen ? order.id : null)} 
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500 text-sm">
            No orders found in this category
          </div>
        )}
      </div>
    </div>
  )
}