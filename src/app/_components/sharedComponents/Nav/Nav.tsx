"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathName = usePathname();
  console.log(pathName);
  
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="">
      {/* top navbar */}
      <div className="container mx-auto px-12 py-4 flex justify-between items-center bg-white">
        <div>
          <Link href={"/"} className="font-bold text-2xl text-slate-700">
            <span className="text-[#84B179]">Local</span> Brands
          </Link>
        </div>
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="search for products"
            className="w-2xs px-3 py-1.5 rounded-xl text-slate-700 border border-gray-400/40 focus:outline-none focus:border-[#84B179]"
          />
          <i className="fa-brands fa-sistrix absolute right-2 top-3"></i>
        </div>
        <ul className="hidden lg:flex items-center gap-6 *:font-light *:hover:text-[#84B179] *:transition-colors *:duration-200">
          <li className={`${pathName === "/cart" ? "text-[#84B179]" : "text-slate-700"}`}>
            <Link
              href={"/cart"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <span className="text-sm">Cart</span>
            </Link>
          </li>
          <li className={`${pathName === "/account" ? "text-[#84B179]" : "text-slate-700"}`}>
            <Link
              href={"/account"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-regular fa-circle-user text-xl"></i>
              <span className="text-sm">Account</span>
            </Link>
          </li>
          <li className={`${pathName === "/register" ? "text-[#84B179]" : "text-slate-700"}`}>
            <Link
              href={"/register"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-solid fa-user-plus text-xl"></i>
              <span className="text-sm">SignUp</span>
            </Link>
          </li>
          <li className={`${pathName === "/login" ? "text-[#84B179]" : "text-slate-700"}`}>
            <Link
              href={"/login"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-regular fa-address-card text-xl"></i>
              <span className="text-sm">Login</span>
            </Link>
          </li>
          <li className={`${pathName === "" ? "text-[#84B179]" : "text-slate-700"}`}>
            <Link
              href={""}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
              <span className="text-sm">LogOut</span>
            </Link>
          </li>
        </ul>
        <button
          className="lg:hidden bg-[#84B179] px-1.5 py-1 rounded text-white"
          onClick={() => toggle()}
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>
      </div>
      {/* bottom navbar */}
      <div className="hidden lg:block bg-gray-100">
        <div className="container py-3 px-12 mx-auto">
          <ul className="flex items-center gap-5 *:font-light *:hover:text-[#84B179] *:transition-colors *:duration-200">
            <li className={`${pathName === "/" ? "text-[#84B179]" : "text-slate-700"}`}>
              <Link
                href={"/"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li className={`${pathName === "/brands" ? "text-[#84B179]" : "text-slate-700"}`}>
              <Link
                href={"/brands"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Brands</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/categories" ? "text-[#84B179]" : "text-slate-700"}`}
            >
              <Link
                href={"/categories"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">All Categories</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/products" ? "text-[#84B179]" : "text-slate-700"}`}
            >
              <Link
                href={"/products"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Featured Products</span>
              </Link>
            </li>
            <li className={`${pathName === "/orders" ? "text-[#84B179]" : "text-slate-700"}`}>
              <Link
                href={"/orders"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">My Orders</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* offcanvas */}
      <div className={`inset-0 bg-black/50 z-30 ${isOpen?'fixed':'hidden'} cursor-pointer`} onClick={()=>toggle()}></div>
      <div className={`bg-white z-40 top-0 left-0 bottom-0 p-4 w-70 ${isOpen?'fixed':'hidden'} animate-slide-in`}>
        <div className="flex items-center justify-between border-b border-gray-300/50 pb-4">
          <Link href={"/"} className="font-bold text-2xl text-slate-700 block">
            <span className="text-[#84B179]">Local</span> Brands
          </Link>
          <button
            onClick={()=>toggle()}
            className="p-2 rounded-full size-8 flex items-center justify-center bg-gray-200">
            <i className="fa-solid fa-xmark text-sm text-slate-700"></i>
          </button>
        </div>
        <div className="relative my-6">
          <input
            type="text"
            placeholder="search for products"
            className="w-62 px-3 py-1.5 rounded-xl text-slate-700 border border-gray-400/40 focus:outline-none focus:border-[#84B179]"
          />
          <i className="fa-brands fa-sistrix absolute right-2 top-3"></i>
        </div>
        <div className="border-b border-gray-300/50 pb-4">
          <h3 className="font-bold text-xl text-slate-700 mb-5">Main Menu</h3>
          <ul className="text-slate-600 space-y-5 font-light">
              <li className={`${pathName === "/" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/"}
                  className="hover:text-[#84B179] transition-all duration-200 block "
                >
                  <i className="fa-solid fa-home mr-2"></i>
                  <span className="text-sm">Home</span>
                </Link>
              </li>
              <li className={`${pathName === "/brands" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/brands"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-table-cells-large mr-2"></i>
                  <span className="text-sm">Brands</span>
                </Link>
              </li>
              <li className={`${pathName === "/categories" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/categories"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-layer-group mr-2"></i>
                  <span className="text-sm">All Categories</span>
                </Link>
              </li>
              <li className={`${pathName === "/products" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/products"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-boxes-stacked mr-2"></i>
                  <span className="text-sm">Featured Products</span>
                </Link>
              </li>
              <li className={`${pathName === "/orders" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/orders"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-list mr-2"></i>
                  <span className="text-sm">My Orders</span>
                </Link>
              </li>
          </ul>
        </div>
        <div className="pt-4">
          <h3 className="font-bold text-xl text-slate-700 mb-5">Account</h3>
          <ul className="text-slate-600 space-y-5 font-light">
              <li className={`${pathName === "/account" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/account"}
                  className="hover:text-[#84B179] transition-all duration-200 block "
                >
                  <i className="fa-regular fa-circle-user mr-2"></i>
                  <span className="text-sm">My Account</span>
                </Link>
              </li>
              <li className={`${pathName === "/register" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/register"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-user-plus mr-2"></i>
                  <span className="text-sm">SignUp</span>
                </Link>
              </li>
              <li className={`${pathName === "/login" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={"/login"}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-regular fa-address-card mr-2"></i>
                  <span className="text-sm">Login</span>
                </Link>
              </li>
              <li className={`${pathName === "" ? "text-[#84B179]" : "text-slate-700"}`}>
                <Link
                  onClick={()=>toggle()}
                  href={""}
                  className="hover:text-[#84B179] transition-all duration-200 block"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                  <span className="text-sm">LogOut</span>
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
