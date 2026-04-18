import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-8">
      <div className="mb-10">
        <h2 className="text-5xl font-bold">Welcome back, Shahd Mahmoud</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Here’s a snapshot of your curated collection and recent activity.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
            Orders
          </p>
          <h5 className="text-[#864227] text-4xl font-bold mt-2">12</h5>
          <p className="text-[#4B5946] text-xs mt-2">
            Everything you've bought
          </p>
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
            Saved Items
          </p>
          <h5 className="text-[#864227] text-4xl font-bold mt-2">8</h5>
          <p className="text-[#4B5946] text-xs mt-2">
            Don't let them get away!
          </p>
        </div>
        <div className="md:col-span-1 border border-[#EEEEEE] rounded-2xl p-4">
          <p className="uppercase text-[#6B5B54] tracking-wider text-sm font-bold">
            Default Address
          </p>
          <h5 className="text-sm font-light mt-2">
            15 Road 9, Maadi
            <br />
            Cairo, Egypt 11728
          </h5>
          <Link href={'/customerAccount/shippingAddress'} className="text-[#BC5439] text-xs uppercase font-bold mt-2 tracking-widest">
            View All
          </Link>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-2xl font-bold">Active Order</h4>
          <Link
            href={"/customerAccount/orders"}
            className="tracking-widest text-xs font-bold text-[#864227] uppercase"
          >
            All History
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 gap-12 border border-[#EEEEEE] rounded-2xl p-10">
          <div className="lg:col-span-1 w-48 aspect-4/5">
            <Image
              src={"/unnamed.png"}
              alt=""
              width={2000}
              height={5000}
              className="rounded-3xl object-cover w-full h-full"
            />
          </div>

          <div className="lg:col-span-3 px-8">
            <div className="lg:flex justify-between items-start mb-8 lg:mb-0">
              <div className="mb-8">
                <p className="text-xl mb-1 font-bold ">Order #BR-92834</p>
                <p className="text-[#6B5B54] text-sm">
                  Estimated delivery:{" "}
                  <span className="font-bold">Oct 28, 2023</span>
                </p>
              </div>
              <div className="text-3xl text-[#864227] font-bold">7,500 EGP</div>
            </div>

            <ul className="space-y-8 relative">
              <div className="w-0.5 bg-[#EEEEEE] h-[200] top-3 absolute"></div>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#BC5439] text-lg"></i>
                <div>
                  <p className="text-[#BC5439] tracking-widest text-sm font-bold">
                    Order Placed
                  </p>
                  <p className="text-[10px] text-[#6B5B54]">
                    Oct 20, 2023 • 10:45 AM
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#BC5439] text-lg"></i>
                <div>
                  <p className="text-[#BC5439] tracking-widest text-sm font-bold">
                    Processing
                  </p>
                  <p className="text-[10px] text-[#6B5B54]">
                    Oct 21, 2023 • 02:30 PM
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-[#BC5439] text-lg"></i>
                <div>
                  <p className="text-[#BC5439] tracking-widest text-sm font-bold">
                    Estimated Oct 24
                  </p>
                  <p className="text-[10px] text-[#6B5B54]">Estimated Oct 24</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-regular fa-circle text-[#D1D1D1] text-lg"></i>
                <div>
                  <p className="text-[#D1D1D1] tracking-widest text-sm font-bold">
                    Delivered
                  </p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}
