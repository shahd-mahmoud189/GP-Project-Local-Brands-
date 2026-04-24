"use client"

import { TrendingUp, ShoppingBag, Package, Award, ArrowUpRight } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Oct", sales: 12400 },
  { month: "Nov", sales: 18900 },
  { month: "Dec", sales: 24100 },
  { month: "Jan", sales: 19800 },
  { month: "Feb", sales: 28300 },
  { month: "Mar", sales: 31500 },
  { month: "Apr", sales: 38700 },
]

const recentOrders = [
  { id: "#ORD-4821", customer: "Nour El-Din", product: "Indigo Hoodie — L / White Embroidery", amount: 1450, status: "Processing" },
  { id: "#ORD-4820", customer: "Farah Youssef", product: "Terracotta Tote Bag — Custom Print", amount: 890, status: "Shipped" },
  { id: "#ORD-4819", customer: "Karim Selim", product: "Cream Crewneck — XL / Sleeve Logo", amount: 2200, status: "Delivered" },
  { id: "#ORD-4818", customer: "Sara Mahmoud", product: "Black Hoodie — M / Back Print", amount: 1650, status: "Pending" },
]

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  highlight,
}: {
  label: string
  value: string
  sub: string
  icon: React.ElementType
  highlight?: boolean
}) {
  return (
    <div className={`rounded-xl border p-5 bg-white flex flex-col gap-3 ${highlight ? "border-[#BC5439]/30 ring-1 ring-[#BC5439]/10" : "border-[#E8E4E0]"}`}>
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${highlight ? "bg-[#BC5439] text-white" : "bg-[#E8E4E0] text-[#2D2D2D]"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
          <ArrowUpRight className="w-3 h-3" />
          +12%
        </span>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#2D2D2D]">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className=" container mx-auto px-12 sm:px-12 py-10 space-y-6 ">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Sales"
          value="EGP 38,700"
          sub="This month"
          icon={TrendingUp}
          highlight
        />
        <MetricCard
          label="Active Orders"
          value="24"
          sub="3 require action"
          icon={ShoppingBag}
        />
        <MetricCard
          label="Stock Value"
          value="EGP 94,200"
          sub="Across 18 products"
          icon={Package}
        />
        <MetricCard
          label="Top Seller"
          value="Indigo Hoodie"
          sub="142 units sold"
          icon={Award}
        />
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E8E4E0] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif font-semibold text-[#2D2D2D] text-base">Sales Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Last 7 months — EGP</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#BC5439]/10 text-[#BC5439] font-medium border border-[#BC5439]/20">
              +23% vs last period
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4e0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fontFamily: "Montserrat", fill: "#888" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fontFamily: "Montserrat", fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e8e4e0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "Montserrat",
                }}
                formatter={(v: any) => [`EGP ${Number(v).toLocaleString()}`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#BC5439"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#BC5439", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#BC5439" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Seller card + mini stats */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 flex gap-4 items-center">
            <div className="w-16 h-16 rounded-lg bg-[#E8E4E0] flex items-center justify-center shrink-0 overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-[#BC5439]/20 to-[#2D2D2D]/10 flex items-center justify-center">
                <Package className="w-7 h-7 text-[#BC5439] opacity-70" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Top Selling Product</p>
              <h4 className="font-serif font-bold text-[#2D2D2D] text-sm mt-0.5">Indigo Hoodie</h4>
              <p className="text-xs text-gray-500 mt-0.5">Apparel &rsaquo; Hoodie</p>
              <p className="text-xs font-semibold text-[#BC5439] mt-1">142 units · EGP 206,900</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E4E0] p-5 flex-1">
            <h3 className="font-serif font-semibold text-[#2D2D2D] text-sm mb-3">Category Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: "Hoodies", pct: 62 },
                { label: "Tote Bags", pct: 21 },
                { label: "Crewnecks", pct: 11 },
                { label: "Other", pct: 6 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#2D2D2D] font-medium">{label}</span>
                    <span className="text-gray-500">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8E4E0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#BC5439] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-[#E8E4E0]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4E0]">
          <h3 className="font-serif font-semibold text-[#2D2D2D]">Recent Orders</h3>
          <button className="text-xs text-[#BC5439] font-medium hover:underline">View all</button>
        </div>
        <div className="divide-y divide-[#E8E4E0]">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8E4E0] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D2D2D]">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.product}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[#2D2D2D] hidden sm:block">
                  EGP {order.amount.toLocaleString()}
                </span>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
