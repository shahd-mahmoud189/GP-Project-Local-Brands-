"use client";
import { removeTokens, removeUserInfo } from "@/app/server/auth.actions";
import { setAuthInfo } from "@/app/store/slices/auth.slice";
import { AppState } from "@/app/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Nav() {
  const { isAuthinticated, userInfo } = useSelector(
    (appState: AppState) => appState.auth,
  );

  const getAccountLink = (role: string) => {
    if (role === "admin") return "/adminAccount";
    if (role === "owner") return "/OwnerDashboard";
    return "/customerAccount";
  };
  
  const pathName = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }

  const dispatch = useDispatch();

  function logOut() {
    removeTokens();
    removeUserInfo();
    dispatch(setAuthInfo({ isAuthinticated: false, userInfo: null }));
    toast.success("Logged out successfully");
  }

  return (
    <nav className="">
      {/* top navbar */}
      <div className="container mx-auto px-12 py-4 flex justify-between items-center">
        <div>
          <Link href={"/"} className="font-bold text-3xl text-[#864227]">
            Brandy
          </Link>
        </div>
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="search for products"
            className="w-2xs px-3 py-1.5 rounded-xl text-slate-700 border border-gray-400/40 focus:outline-none focus:border-[#864227]"
          />
          <i className="fa-brands fa-sistrix absolute right-2 top-3"></i>
        </div>
        <ul className="hidden lg:flex items-center gap-6 *:font-light *:hover:text-[#864227] *:transition-colors *:duration-200">
          <li
            className={`${pathName === "/cart" ? "text-[#864227]" : "text-slate-700"}`}
          >
            <Link
              href={"/cart"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <span className="text-sm">Cart</span>
            </Link>
          </li>
          <li
            className={`${pathName === "/wishlist" ? "text-[#864227]" : "text-slate-700"}`}
          >
            <Link
              href={"/wishlist"}
              className="flex flex-col items-center justify-center gap-2"
            >
              <i className="fa-regular fa-heart text-xl"></i>
              <span className="text-sm">Whishlist</span>
            </Link>
          </li>
          {isAuthinticated && (
            <li
              className={`${pathName === "/account" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                href={userInfo ? getAccountLink(userInfo.userType) : "/login"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <i className="fa-regular fa-circle-user text-xl"></i>
                <span className="text-sm">Account</span>
              </Link>
            </li>
          )}
          {!isAuthinticated && (
            <>
              {" "}
              <li
                className={`${pathName === "/register" ? "text-[#864227]" : "text-slate-700"}`}
              >
                <Link
                  href={"/register"}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-user-plus text-xl"></i>
                  <span className="text-sm">SignUp</span>
                </Link>
              </li>
              <li
                className={`${pathName === "/login" ? "text-[#864227]" : "text-slate-700"}`}
              >
                <Link
                  href={"/login"}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <i className="fa-regular fa-address-card text-xl"></i>
                  <span className="text-sm">Login</span>
                </Link>
              </li>
            </>
          )}
          {isAuthinticated && (
            <li
              className={`${pathName === "" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => logOut()}
                href={"/login"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
                <span className="text-sm">LogOut</span>
              </Link>
            </li>
          )}
        </ul>
        <button
          className="lg:hidden bg-[#864227] px-1.5 py-1 rounded text-white"
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
      <div className="hidden lg:block bg-[#F7F2EA]">
        <div className="container py-3 px-12 mx-auto">
          <ul className="flex items-center gap-5 *:font-light *:hover:text-[#864227] *:transition-colors *:duration-200">
            <li
              className={`${pathName === "/" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                href={"/"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/brands" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                href={"/brands"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Brands</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/categories" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                href={"/categories"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">All Categories</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/products" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                href={"/products"}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm">Featured Products</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* offcanvas */}
      <div
        className={`inset-0 bg-black/50 z-30 ${isOpen ? "fixed" : "hidden"} cursor-pointer`}
        onClick={() => toggle()}
      ></div>
      <div
        className={`bg-[#FCF9F4] z-40 top-0 left-0 bottom-0 p-4 w-70 ${isOpen ? "fixed" : "hidden"} animate-slide-in`}
      >
        <div className="flex items-center justify-between border-b border-gray-300/50 pb-4">
          <Link
            onClick={() => toggle()}
            href={"/"}
            className="font-bold text-2xl text-[#864227] block"
          >
            Brandy
          </Link>
          <button
            onClick={() => toggle()}
            className="p-2 rounded-full size-8 flex items-center justify-center bg-[#EFE7E2]"
          >
            <i className="fa-solid fa-xmark text-sm text-[#864227]"></i>
          </button>
        </div>
        <div className="relative my-6">
          <input
            type="text"
            placeholder="search for products"
            className="w-62 px-3 py-1.5 rounded-xl text-slate-700 border border-gray-400/40 focus:outline-none focus:border-[#864227]"
          />
          <i className="fa-brands fa-sistrix absolute right-2 top-3"></i>
        </div>
        <div className="border-b border-gray-300/50 pb-4">
          <h3 className="font-bold text-xl text-slate-700 mb-5">Main Menu</h3>
          <ul className="text-slate-600 space-y-5 font-light">
            <li
              className={`${pathName === "/" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/"}
                className="hover:text-[#864227] transition-all duration-200 block "
              >
                <i className="fa-solid fa-home mr-2"></i>
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/brands" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/brands"}
                className="hover:text-[#864227] transition-all duration-200 block"
              >
                <i className="fa-solid fa-table-cells-large mr-2"></i>
                <span className="text-sm">Brands</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/categories" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/categories"}
                className="hover:text-[#864227] transition-all duration-200 block"
              >
                <i className="fa-solid fa-layer-group mr-2"></i>
                <span className="text-sm">All Categories</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/products" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/products"}
                className="hover:text-[#864227] transition-all duration-200 block"
              >
                <i className="fa-solid fa-boxes-stacked mr-2"></i>
                <span className="text-sm">Featured Products</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-4">
          <h3 className="font-bold text-xl text-slate-700 mb-5">Account</h3>
          <ul className="text-slate-600 space-y-5 font-light">
            {isAuthinticated && (
              <li
                className={`${pathName === "/account" ? "text-[#864227]" : "text-slate-700"}`}
              >
                <Link
                  onClick={() => toggle()}
                  href={userInfo ? getAccountLink(userInfo.userType) : "/login"}
                  className="hover:text-[#864227] transition-all duration-200 block "
                >
                  <i className="fa-regular fa-circle-user mr-2"></i>
                  <span className="text-sm">My Account</span>
                </Link>
              </li>
            )}
            {!isAuthinticated && (
              <>
                {" "}
                <li
                  className={`${pathName === "/register" ? "text-[#864227]" : "text-slate-700"}`}
                >
                  <Link
                    onClick={() => toggle()}
                    href={"/register"}
                    className="hover:text-[#864227] transition-all duration-200 block"
                  >
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    <span className="text-sm">SignUp</span>
                  </Link>
                </li>
                <li
                  className={`${pathName === "/login" ? "text-[#864227]" : "text-slate-700"}`}
                >
                  <Link
                    onClick={() => toggle()}
                    href={"/login"}
                    className="hover:text-[#864227] transition-all duration-200 block"
                  >
                    <i className="fa-regular fa-address-card mr-2"></i>
                    <span className="text-sm">Login</span>
                  </Link>
                </li>
              </>
            )}
            <li
              className={`${pathName === "/cart" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/cart"}
                className="hover:text-[#864227] transition-all duration-200 block"
              >
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                <span className="text-sm">Cart</span>
              </Link>
            </li>
            <li
              className={`${pathName === "/wishlist" ? "text-[#864227]" : "text-slate-700"}`}
            >
              <Link
                onClick={() => toggle()}
                href={"/wishlist"}
                className="hover:text-[#864227] transition-all duration-200 block"
              >
                <i className="fa-regular fa-heart mr-2"></i>
                <span className="text-sm">Whishlist</span>
              </Link>
            </li>
            {isAuthinticated && (
              <>
                <li
                  className={`${pathName === "" ? "text-[#864227]" : "text-slate-700"}`}
                >
                  <Link
                    onClick={() => {
                      toggle();
                      logOut();
                    }}
                    href={"/login"}
                    className="hover:text-[#864227] transition-all duration-200 block"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                    <span className="text-sm">LogOut</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
