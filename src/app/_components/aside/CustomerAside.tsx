"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomerAside() {
  const pathName = usePathname();

  return (
    <nav className="bg-[#FAF9F6] py-4 md:w-70 shrink-0">
      <div className="px-8 py-6 text-center md:text-start">
        <p className="text-[#A4593C] uppercase leading-loose font-semibold text-lg pb-0 ">
          Artisan Member
        </p>
        <p className="text-sm font-light text-[#6B5B54]">shahd@gmail.com</p>
      </div>
      <ul className="py-8 *:cursor-pointer *:transition-all *:uppercase *:text-sm *:tracking-wider *:py-6 *:px-8 *:font-semibold">
        <Link
          href={"dashboard"}
          className={`w-full ${pathName === "/customerAccount/dashboard" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-chart-line mr-3"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          href={"orders"}
          className={`w-full ${pathName === "/customerAccount/orders" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-bag-shopping mr-3"></i>
          <span>My Orders</span>
        </Link>
        <Link
          href={"whishlist"}
          className={`w-full ${pathName === "/customerAccount/whishlist" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-regular fa-heart mr-3"></i>
          <span>Whishlist</span>
        </Link>
        <Link
          href={"shippingAddress"}
          className={`w-full ${pathName === "/customerAccount/shippingAddress" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-location-dot mr-3"></i>
          <span>Shipping Addresses</span>
        </Link>
        <Link
          href={""}
          className={`w-full ${pathName === "" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
          <span>Logout</span>
        </Link>
      </ul>
    </nav>
  );
}
