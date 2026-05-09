"use client";
import { AppState } from "@/app/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function AdminAside() {
  const pathName = usePathname();

    const { isAuthinticated, userInfo } = useSelector(
    (appState: AppState) => appState.auth,
  );

  return (
    <nav className="bg-[#FAF9F6] py-4 md:w-70 shrink-0">
      <div className="px-8 py-6 text-center md:text-start">
        <p className="text-[#A4593C] uppercase leading-loose font-semibold text-lg pb-0 ">
          Brandy Admin
        </p>
        <p className="text-sm font-light text-[#6B5B54]">{userInfo?.email}</p>
      </div>
      <ul className="py-8 *:cursor-pointer *:transition-all *:uppercase *:text-sm *:tracking-wider *:py-6 *:px-8 *:font-semibold">
        <Link
          href={"profile"}
          className={`w-full ${pathName === "/adminAccount/profile" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-chart-line mr-3"></i>
          <span>Profile</span>
        </Link>
        <Link
          href={"dashboard"}
          className={`w-full ${pathName === "/adminAccount/dashboard" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-chart-line mr-3"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          href={"registerationRequest"}
          className={`w-full ${pathName === "/adminAccount/registerationRequest" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-user-check mr-3"></i>
          <span>Brand Request</span>
        </Link>
        <Link
          href={"reviewManagement"}
          className={`w-full ${pathName === "/adminAccount/reviewManagement" ? "text-[#1c1c19] bg-white border-l-4 border-[#A4593C]" : "text-[#6B5B54]"}`}
        >
          <i className="fa-solid fa-comments mr-3"></i>
          <span>Review Management</span>
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
