"use client";
import { AppState } from "@/app/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function CustomerAside() {
  const pathName = usePathname();

  const { isAuthinticated, userInfo } = useSelector(
    (appState: AppState) => appState.auth,
  );

  return (
    <nav className="bg-[#FAF9F6] py-4 md:w-70 shrink-0">
      <div className="px-8 py-6 text-center md:text-start">
        <p className="text-[#A4593C] uppercase leading-loose font-semibold text-lg pb-0 ">
          Brandy Member
        </p>
        <p className="text-sm font-light text-[#6B5B54]">{userInfo?.email}</p>
      </div>
      <ul className="py-8 *:cursor-pointer *:transition-all *:uppercase *:text-sm *:tracking-wider *:py-6 *:px-8 *:font-semibold">
        <Link
          href={"profile"}
          className={`w-full ${pathName === "/customerAccount/profile" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-person mr-3"></i>
          <span>Profile</span>
        </Link>
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
          href={"brandRequest"}
          className={`w-full ${pathName === "/customerAccount/brandRequest" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-regular fa-paper-plane mr-3"></i>{" "}
          <span>Brand Request</span>
        </Link>
        <Link
          href={"messages"}
          className={`w-full ${pathName === "/customerAccount/messages" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-message mr-3"></i>{" "}
          <span>Chats</span>
        </Link>
      </ul>
    </nav>
  );
}
