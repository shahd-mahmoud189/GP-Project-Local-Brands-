"use client";

import {
  ShoppingCart,
  Heart,
  UserCircle,
  UserPlus,
  LogIn,
  LogOut,
  Search,
  Menu,
  X,
  Home,
  LayoutGrid,
  Layers,
  PackageSearch
} from "lucide-react";

import { removeBrandRequest, removeTokens, removeUserInfo } from "@/app/server/auth.actions";
import { setAuthInfo } from "@/app/store/slices/auth.slice";
import { AppState } from "@/app/store/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { searchProducts } from "@/app/api/search.api";
import { SearchResponse } from "@/app/types/search.type";

export default function Nav() {
  // --- Redux Selectors ---
  const { isAuthinticated, userInfo } = useSelector((appState: AppState) => appState.auth);
  const { totalItems } = useSelector((appState: AppState) => appState.cart);
  const wishlistItems = useSelector((appState: AppState) => appState.wishlist.items);
  const wishlistCount = wishlistItems?.length || 0;

  // --- Search & Navigation Logic ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // -- Dropdown Logic --
  const [dropdownResults, setDropdownResults] = useState<SearchResponse | null>(null);
  const [isDropdownSearching, setIsDropdownSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchWrapperRefDesktop = useRef<HTMLDivElement>(null);
  const searchWrapperRefMobile = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  // Debounce search for Auto-complete
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setIsDropdownSearching(true);
        setShowDropdown(true);
        try {
          const data = await searchProducts(searchTerm);
          setDropdownResults(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsDropdownSearching(false);
        }
      } else {
        setDropdownResults(null);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRefDesktop.current && !searchWrapperRefDesktop.current.contains(event.target as Node) &&
        searchWrapperRefMobile.current && !searchWrapperRefMobile.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent, searchVal?: string) => {
    e.preventDefault();
    const val = searchVal !== undefined ? searchVal : searchTerm;
    if (val.trim()) {
      router.push(`/search?query=${encodeURIComponent(val)}`);
      setSearchTerm("");
      setShowDropdown(false);
      setIsOpen(false);
    }
  };

  const getAccountLink = (role: string) => {
    if (role === "Admin") return "/adminAccount";
    if (role === "BrandOwner") return "/ownerAccount";
    return "/customerAccount";
  };

  function handleLogOut() {
    removeTokens();
    removeUserInfo();
    removeBrandRequest();
    dispatch(setAuthInfo({ isAuthinticated: false, userInfo: null }));
    toast.success("Logged out successfully");
  }

  const renderDropdown = () => {
    if (!showDropdown || (!isDropdownSearching && !dropdownResults)) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-[100] max-h-96 overflow-y-auto">
        {isDropdownSearching ? (
          <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
        ) : (
          <div className="py-2">
            {(!dropdownResults?.products?.length && !dropdownResults?.brands?.length && !dropdownResults?.categories?.length) ? (
              <div className="p-4 text-center text-sm text-gray-500">No results found</div>
            ) : (
              <>
                {dropdownResults?.products?.length > 0 && (
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Products</h3>
                    <ul className="space-y-1">
                      {dropdownResults.products.slice(0, 3).map(p => (
                        <li key={p.productId}>
                          <button onClick={(e) => handleSearch(e, p.productName)} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-slate-700 truncate line-clamp-1">
                            {p.productName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dropdownResults?.brands?.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-50">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Brands</h3>
                    <ul className="space-y-1">
                      {dropdownResults.brands.slice(0, 3).map(b => (
                        <li key={b.brandId}>
                          <button onClick={(e) => handleSearch(e, b.brandName)} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-slate-700">
                            {b.brandName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="px-4 pt-2 pb-1 border-t border-gray-50">
                  <button onClick={(e) => handleSearch(e, searchTerm)} className="w-full text-center text-sm text-[#864227] font-medium hover:underline">
                    See all results
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        <div>
          <Link href={"/"} className="font-bold text-3xl text-[#864227]">Brandy</Link>
        </div>

        {/* Desktop Search */}
        <div ref={searchWrapperRefDesktop} className="relative hidden lg:block">
          <form onSubmit={handleSearch} className="relative w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim() && setShowDropdown(true)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-[#864227]"
            />
            <button type="submit" className="absolute right-3 top-2.5"><Search className="size-5 text-gray-400" /></button>
          </form>
          {renderDropdown()}
        </div>

        {/* Desktop Icons */}
        <ul className="hidden lg:flex items-center gap-8">
          {userInfo?.userType === "Customer" && (
            <>
              <li>
                <Link href="/cart" className="relative flex flex-col items-center gap-1">
                  <ShoppingCart className="size-6 text-slate-600" />
                  {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-[#864227] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>}
                  <span className="text-xs">Cart</span>
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="relative flex flex-col items-center gap-1">
                  <Heart className="size-6 text-slate-600" />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-[#864227] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
                  <span className="text-xs">Wishlist</span>
                </Link>
              </li>
            </>
          )}
          {isAuthinticated ? (
            <button onClick={handleLogOut} className="flex flex-col items-center gap-1">
              <LogOut className="size-6 text-slate-600" />
              <span className="text-xs">Logout</span>
            </button>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1">
              <LogIn className="size-6 text-slate-600" />
              <span className="text-xs">Login</span>
            </Link>
          )}
        </ul>

        <button className="lg:hidden" onClick={toggle}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggle} />
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-[#FCF9F4] z-[60] p-6 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-2xl text-[#864227]">Brandy</span>
          <X onClick={toggle} className="cursor-pointer" />
        </div>
        
        <div ref={searchWrapperRefMobile} className="relative mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border"
              placeholder="Search..."
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </form>
          {renderDropdown()}
        </div>

        <nav className="space-y-6">
          <Link href="/" onClick={toggle} className="flex items-center gap-3"><Home /> Home</Link>
          <Link href="/products" onClick={toggle} className="flex items-center gap-3"><PackageSearch /> Products</Link>
          {isAuthinticated && (
             <button onClick={() => { handleLogOut(); toggle(); }} className="flex items-center gap-3 text-red-600"><LogOut /> Logout</button>
          )}
        </nav>
      </aside>
    </nav>
  );
}