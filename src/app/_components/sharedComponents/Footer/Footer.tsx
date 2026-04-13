import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#F7F2EA]">
      <div className="">
        <div className="container  px-12 py-8 lg:flex lg:items-start lg:justify-between lg:gap-16 space-y-5">
          <div className="lg:w-1/3">
            <h1 className="font-bold text-3xl text-[#864227] mb-3">
              Brandy
            </h1>
            <p className="font-light text-slate-600 text-sm leading-loose">
              Supporting local creativity by connecting you with unique products
              from passionate local brands. Shop authentic, shop local.
            </p>
          </div>
          <div className="lg:w-1/3">
            <h3 className="text-slate-700 text-xl font-bold mb-3">
              Quick Links
            </h3>
            <ul className="text-slate-600 space-y-3 *:text-slate-700 font-light">
              <li>
                <Link
                  href={"/"}
                  className="hover:text-[#864227] transition-all duration-200 hover:transform hover:translate-x-1 block "
                >
                  <i className="fa-solid fa-angle-right"></i>
                  <span className="text-sm">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/brands"}
                  className="hover:text-[#864227] transition-all duration-200 hover:transform hover:translate-x-1 block"
                >
                  <i className="fa-solid fa-angle-right"></i>
                  <span className="text-sm">Brands</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/categories"}
                  className="hover:text-[#864227] transition-all duration-200 hover:transform hover:translate-x-1 block"
                >
                  <i className="fa-solid fa-angle-right"></i>
                  <span className="text-sm">All Categories</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/products"}
                  className="hover:text-[#864227] transition-all duration-200 hover:transform hover:translate-x-1 block"
                >
                  <i className="fa-solid fa-angle-right"></i>
                  <span className="text-sm">Featured Products</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/3">
            <h3 className="text-slate-700 text-xl font-bold mb-3">Follow Us</h3>
            <ul className="flex space-y-4 gap-5 *:text-xl *:hover:text-[#864227] *:transition-colors *:duration-200 *:text-slate-700">
              <li>
                <i className="fa-brands fa-facebook-f"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 text-center font-light text-sm border-y border-gray-300/50">
        <p>© 2026 Brandy Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
}
