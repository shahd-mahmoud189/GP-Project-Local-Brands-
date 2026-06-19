import OrderItem from '@/app/_components/cards/OrderItem/OrderItem';
import React from 'react';
import { getUserOrders } from '@/app/api/order.api';
import { CartItem } from '@/app/types/cart.type';
import { Order } from '@/app/types/order.type';
import CancelOrderButton from './CancelOrderButton';

export default async function OrdersPage() {
  let orders: Order[] = [];
  try {
    orders = (await getUserOrders()) ?? [];
  } catch (err) {
    console.error("Failed to load orders", err);
  }

  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className='w-full max-w-7xl px-4 md:px-12 py-10 mx-auto '>
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Order History</h2>
        <p className="text-gray-500 text-sm font-medium mt-2">
          Track and manage your recent artisan acquisitions.
        </p>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center mt-10">
          <div className="size-28 bg-[#F8EEEB] rounded-[2rem] flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-all duration-300">
            <i className="fa-solid fa-box-open text-5xl text-[#0288D1]"></i>
          </div>
          <p className="text-2xl font-black text-slate-800">No orders yet</p>
          <p className="text-gray-500 mt-3 max-w-md text-sm leading-relaxed">
            Looks like you haven't made your first artisan purchase yet. When you do, it will show up right here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedOrders.map((order) => {
            const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: 'numeric', month: 'long', day: 'numeric'
            });

            const isDelivered = order.orderStatusText?.toLowerCase() === 'delivered';
            const isCancelled = order.orderStatusText?.toLowerCase() === 'cancelled';

            return (
              <div
                key={order.orderId}
                className="bg-white p-6 md:p-8  rounded-[2rem] border border-gray-100 shadow-sm  flex flex-col lg:flex-row gap-8 lg:gap-12"
              >
                {/* Left side: Order Info */}
                <div className="lg:w-[40%] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <p className="text-xs text-gray-400  uppercase tracking-wider mb-1">Order Code</p>
                        <p className="text-xl  text-slate-800">#{order.orderId}</p>
                      </div>
                      <div className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 ${isDelivered ? 'bg-green-50 text-green-700' :
                        isCancelled ? 'bg-red-50 text-red-700' :
                          'bg-[#fff7f5] text-[#BC5439]' // Processing/Default
                        }`}>
                        <i className={`fa-solid ${isDelivered ? 'fa-check-circle' : isCancelled ? 'fa-times-circle' : 'fa-clock'}`}></i>
                        {order.orderStatusText || 'Processing'}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4 text-sm group">
                        <div className="size-12 bg-gray-50 group-hover:bg-[#F8EEEB] transition-colors flex items-center justify-center rounded-2xl text-gray-400 group-hover:text-[#0288D1]">
                          <i className="fa-regular fa-calendar-days text-lg"></i>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Placed On</p>
                          <p className="font-bold text-slate-700">{dateStr}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm group">
                        <div className="size-12 bg-gray-50 group-hover:bg-[#F8EEEB] transition-colors flex items-center justify-center rounded-2xl text-gray-400 group-hover:text-[#0288D1]">
                          <i className="fa-solid fa-wallet text-lg"></i>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Payment Strategy</p>
                          <p className="font-bold text-slate-700">{order.paymentMethodText || 'Cash'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm group">
                        <div className="size-12 bg-gray-50 group-hover:bg-[#F8EEEB] transition-colors flex items-center justify-center rounded-2xl text-gray-400 group-hover:text-[#0288D1]">
                          <i className="fa-solid fa-paper-plane text-lg"></i>
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-xs text-gray-500 font-medium">Delivering To</p>
                          <p className="font-bold text-slate-700 truncate" title={order.shippingAddress}>{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-black-400 font-bold uppercase tracking-wider mb-1">Total Paid</p>
                      <p className="text-xl text-[#0288D1] leading-none mb-0">
                        {order.finalTotal} <span className="text-lg font-bold text-black-400 ml-1">EGP</span>
                      </p>
                    </div>

                    {!isDelivered && !isCancelled && (
                      <CancelOrderButton orderId={order.orderId} />
                    )}
                  </div>
                </div>

                {/* Right side: Items */}
                <div className="lg:w-[60%] border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-12 flex flex-col">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                      <i className="fa-solid fa-basket-shopping"></i>
                    </div>
                    Items in this Order
                    <span className="ml-auto text-xs font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full">
                      {order.items?.length || 0}
                    </span>
                  </h4>

                  <div className="flex-1 space-y-3 max-h-100 overflow-y-auto pr-2 overflow-x-hidden">
                    {order.items?.map((item) => (
                      <div
                        key={item.orderItemId}
                        className="p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
                      >
                        <OrderItem
                          item={{
                            ...item,
                            hasCustomization: !!item.customization
                          } as unknown as CartItem}
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
