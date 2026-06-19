import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserOrders } from "@/app/api/order.api";
import { Order } from "@/app/types/order.type";

const BASE_URL = "https://graduationprojectclean-production.up.railway.app"; // Adjust this to your actual base URL if needed
const getImageUrl = (path: string) => {
  if (!path) return "/unnamed.png";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default async function DashboardPage() {
  let orders: Order[] = [];
  try {
    const result = await getUserOrders();
    orders = result || [];
    
  } catch (err) {
    
    console.error("Failed to fetch orders in dashboard", err);
  }

  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const activeOrder = sortedOrders.length > 0 ? sortedOrders[0] : null;

  const getStatusLevel = (statusText: string | undefined) => {
    const text = (statusText || "").toLowerCase();
    if (text === "cancelled") return -1;
    if (text === "delivered") return 4;
    if (text === "shipped" || text === "out for delivery") return 3;
    if (text === "processing") return 2;
    return 1; // Placed
  };

  const statusLevel = activeOrder ? getStatusLevel(activeOrder.orderStatusText) : 0;

  return (
    <div className="p-8">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Here’s a snapshot of your curated collection and recent activity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className=" text-[#6B5B54] tracking-wider text-sm font-bold">
            Orders
          </p>
          <h5 className="text-[#0288D1] text-2xl font-bold mt-2">{orders.length}</h5>
          <p className="text-[#4B5946] text-xs mt-2">
            Everything you've bought
          </p>
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className=" text-[#6B5B54] tracking-wider text-sm font-bold">
            Saved Items
          </p>
          <h5 className="text-[#0288D1] text-2xl font-bold mt-2">8</h5>
          <p className="text-[#4B5946] text-xs mt-2">
            Don't let them get away!
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-bold">Latest Order Activity</h4>
          <Link
            href={"/customerAccount/orders"}
            className="tracking-widest text-xs font-bold text-[#0288D1] uppercase hover:underline"
          >
            All History
          </Link>
        </div>

        {!activeOrder ? (
          <div className="border border-[#EEEEEE] rounded-2xl p-10 text-center flex flex-col justify-center items-center">
            <i className="fa-solid fa-box-open text-2xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 font-bold mb-2">No recent orders</p>
            <p className="text-xs text-gray-400">Your latest purchases will appear here.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-12 border border-[#EEEEEE] rounded-2xl p-10">
            <div className="lg:col-span-1 w-48 aspect-4/5">
              <Image
                src={getImageUrl(activeOrder.items?.[0]?.productImage || "")}
                alt={activeOrder.items?.[0]?.productName || "Order"}
                width={800}
                height={800}
                className="rounded-3xl object-cover w-full h-full border border-gray-100"
              />
            </div>

            <div className="lg:col-span-3 px-8">
              <div className="lg:flex justify-between items-start mb-8 lg:mb-0">
                <div className="mb-8">
                  <p className="text-lg mb-1 font-bold ">Order #{activeOrder.orderId}</p>
                  <p className="text-[#6B5B54] text-sm">
                    Placed On:{" "}
                    <span className="font-bold">
                      {new Date(activeOrder.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="text-xl text-[#0288D1] font-bold">
                  {activeOrder.finalTotal} EGP
                </div>
              </div>

              {statusLevel === -1 ? (
                <div className="mt-8 flex items-center gap-3 bg-red-50 text-red-600 px-6 py-4 rounded-xl">
                  <i className="fa-solid fa-ban text-xl"></i>
                  <div>
                    <p className="font-bold text-md">Order Cancelled</p>
                    <p className="text-xs font-medium">This order was cancelled and will not be delivered.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-8 relative mt-10">
                  <div className="w-0.5 bg-[#EEEEEE] h-full absolute left-2 top-4 bottom-4 z-0"></div>

                  {/* Step 1: Placed */}
                  <li className="flex items-center gap-4 relative z-10">
                    <div className="bg-white">
                      <i className={`fa-solid fa-circle-check text-xl ${statusLevel >= 1 ? 'text-[#BC5439]' : 'text-[#D1D1D1]'}`}></i>
                    </div>
                    <div>
                      <p className={`${statusLevel >= 1 ? 'text-[#BC5439]' : 'text-[#D1D1D1]'} tracking-widest text-sm font-bold`}>
                        Order Placed
                      </p>
                      {statusLevel >= 1 && (
                        <p className="text-[10px] text-[#6B5B54]">
                          {new Date(activeOrder.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </li>

                  {/* Step 2: Processing */}
                  <li className="flex items-center gap-4 relative z-10">
                    <div className="bg-white">
                      <i className={`fa-solid ${statusLevel >= 2 ? 'fa-circle-check text-[#BC5439]' : 'fa-circle text-[#D1D1D1]'} text-xl`}></i>
                    </div>
                    <div>
                      <p className={`${statusLevel >= 2 ? 'text-[#BC5439]' : 'text-[#D1D1D1]'} tracking-widest text-sm font-bold`}>
                        Processing
                      </p>
                    </div>
                  </li>

                  {/* Step 3: Shipped / Progress */}
                  <li className="flex items-center gap-4 relative z-10">
                    <div className="bg-white">
                      <i className={`fa-solid ${statusLevel >= 3 ? 'fa-circle-check text-[#BC5439]' : 'fa-circle text-[#D1D1D1]'} text-xl`}></i>
                    </div>
                    <div>
                      <p className={`${statusLevel >= 3 ? 'text-[#BC5439]' : 'text-[#D1D1D1]'} tracking-widest text-sm font-bold`}>
                        Shipped
                      </p>
                    </div>
                  </li>

                  {/* Step 4: Delivered */}
                  <li className="flex items-center gap-4 relative z-10">
                    <div className="bg-white">
                      <i className={`fa-solid ${statusLevel >= 4 ? 'fa-circle-check text-[#BC5439]' : 'fa-circle text-[#D1D1D1]'} text-xl`}></i>
                    </div>
                    <div>
                      <p className={`${statusLevel >= 4 ? 'text-[#BC5439]' : 'text-[#D1D1D1]'} tracking-widest text-sm font-bold`}>
                        Delivered
                      </p>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
