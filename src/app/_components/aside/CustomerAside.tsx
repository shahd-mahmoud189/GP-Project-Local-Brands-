"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomerAside() {
  const pathName = usePathname();

  return (
    <nav className="bg-[#FAF9F6] py-4 shrink-0">
      <div className="px-8 py-6 text-center md:text-start">
        <p className="text-[#A4593C] uppercase leading-loose font-semibold text-lg pb-0 ">
          Artisan Member
        </p>
        <p className="text-sm font-light text-[#6B5B54]">shahd@gmail.com</p>
      </div>
      <ul className="py-8 *:cursor-pointer *:transition-all *:uppercase *:text-sm *:tracking-wider *:py-6 *:px-8 *:font-semibold">
        <li
          className={`${pathName === "/customerAccount/dashboard" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <Link href={"dashboard"}>
            <i className="fa-solid fa-chart-line mr-3"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={`${pathName === "/customerAccount/orders" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <Link href={"orders"}>
            <i className="fa-solid fa-bag-shopping mr-3"></i>
            <span>My Orders</span>
          </Link>
        </li>
        <li
          className={`${pathName === "/customerAccount/savedItems" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <Link href={"savedItems"}>
            <i className="fa-regular fa-bookmark mr-3"></i>
            <span>Saved Items</span>
          </Link>
        </li>
        <li
          className={`${pathName === "/customerAccount/shippingAddress" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <Link href={"shippingAddress"}>
            <i className="fa-solid fa-location-dot mr-3"></i>
            <span>Shipping Address</span>
          </Link>
        </li>
        <li
          className={`${pathName === "" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <Link href={""}>
            <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
