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
import { getOrCreateSession, trackEvent } from "@/app/api/userBehavior.api"; // ✅ أضفنا trackEvent

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

  // ✅ دالة مساعدة لتتبع البحث
  const sendSearchEvent = async (searchQuery: string) => {
    const sessionId = await getOrCreateSession();
    if (!sessionId || !searchQuery.trim()) return;
    await trackEvent({
      sessionId,
      actionType: "search",
      searchQuery: searchQuery.trim(),
      sourcePage: "nav",
    });
  };

  // ✅ تعديل handleSearch لتصبح async وتستدعي sendSearchEvent
  const handleSearch = async (e: React.FormEvent, searchVal?: string) => {
    e.preventDefault();
    const val = searchVal !== undefined ? searchVal : searchTerm;
    if (val.trim()) {
      await sendSearchEvent(val);      // إرسال حدث البحث
      router.push(`/search?query=${encodeURIComponent(val)}`);
      setSearchTerm("");
      setShowDropdown(false);
      setIsOpen(false);
    }
  };

  const renderDropdown = () => {
    if (!showDropdown || (!isDropdownSearching && !dropdownResults)) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-100 max-h-[80vh] sm:max-h-96 overflow-y-auto">
        {isDropdownSearching ? (
          <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
        ) : (
          <>
            {(!dropdownResults?.products?.length && !dropdownResults?.brands?.length && !dropdownResults?.categories?.length) ? (
              <div className="p-4 text-center text-sm text-gray-500">No results found</div>
            ) : (
              <div className="py-2">
                {dropdownResults?.products && dropdownResults.products.length > 0 && (
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Products</h3>
                    <ul className="space-y-1">
                      {dropdownResults.products.slice(0, 3).map(p => (
                        <li key={`prod-${p.productId}`}>
                          <button type="button" onClick={(e) => handleSearch(e, p.productName)} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-slate-700 truncate line-clamp-1">
                            {p.productName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dropdownResults?.brands && dropdownResults.brands.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-50">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Brands</h3>
                    <ul className="space-y-1">
                      {dropdownResults.brands.slice(0, 3).map(b => (
                        <li key={`brand-${b.brandId}`}>
                          <button type="button" onClick={(e) => handleSearch(e, b.brandName)} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-slate-700 truncate line-clamp-1">
                            {b.brandName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dropdownResults?.categories && dropdownResults.categories.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-50">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h3>
                    <ul className="space-y-1">
                      {dropdownResults.categories.slice(0, 3).map(c => (
                        <li key={`cat-${c.categoryId}`}>
                          <button type="button" onClick={(e) => handleSearch(e, c.categoryName)} className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-slate-700 truncate line-clamp-1">
                            {c.categoryName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="px-4 pt-2 pb-1 border-t border-gray-50">
                  <button type="button" onClick={(e) => handleSearch(e, searchTerm)} className="w-full text-center text-sm text-[#864227] font-medium hover:underline">
                    See all results for "{searchTerm}"
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
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
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* --- Top Navbar --- */}
      <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href={"/"} className="font-bold text-3xl text-[#03a9f4]">
            Brandy
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div ref={searchWrapperRefDesktop} className="relative hidden lg:block z-50">
          <form onSubmit={(e) => handleSearch(e)} className="relative w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => { if (searchTerm.trim()) setShowDropdown(true); }}
              placeholder="search for products, brands..."
              className="w-full px-4 py-2 rounded-xl text-slate-700 border border-gray-200 focus:outline-none focus:border-[#03a9f4] transition-all"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-[#03a9f4] transition-colors">
              <Search className="size-5" />
            </button>
          </form>
          {renderDropdown()}
        </div>

        {/* Desktop Icons */}
        <ul className="hidden lg:flex items-center gap-8">
          {userInfo?.userType === "Customer" && (
            <>
              {/* Cart */}
              <li>
                <Link href="/cart" className={`relative flex flex-col items-center gap-1 group ${pathName === "/cart" ? "text-[#03a9f4]" : "text-slate-600"}`}>
                  <div className="relative">
                    <ShoppingCart className="size-6 stroke-[1.5px] group-hover:text-[#03a9f4] transition-colors" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-[#03a9f4] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium">Cart</span>
                </Link>
              </li>

              {/* Wishlist */}
              <li>
                <Link href="/wishlist" className={`relative flex flex-col items-center gap-1 group ${pathName === "/wishlist" ? "text-[#03a9f4]" : "text-slate-600"}`}>
                  <div className="relative">
                    <Heart className="size-6 stroke-[1.5px] group-hover:text-[#03a9f4] transition-colors" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-[#03a9f4] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium">Wishlist</span>
                </Link>
              </li>
            </>
          )}

          {isAuthinticated ? (
            <>
              {/* Account */}
              <li>
                <Link href={userInfo ? getAccountLink(userInfo.userType) : "/login"} className={`flex flex-col items-center gap-1 group ${pathName.includes("Account") ? "text-[#03a9f4]" : "text-slate-600"}`}>
                  <UserCircle className="size-6 stroke-[1.5px] group-hover:text-[#03a9f4] transition-colors" />
                  <span className="text-xs font-medium">Account</span>
                </Link>
              </li>
              {/* Logout */}
              <li>
                <button onClick={handleLogOut} className="flex flex-col items-center gap-1 text-slate-600 hover:text-red-600 transition-colors">
                  <LogOut className="size-6 stroke-[1.5px]" />
                  <span className="text-xs font-medium">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* SignUp */}
              <li>
                <Link href="/register" className="flex flex-col items-center gap-1 text-slate-600 hover:text-[#03a9f4]">
                  <UserPlus className="size-6 stroke-[1.5px]" />
                  <span className="text-xs font-medium">SignUp</span>
                </Link>
              </li>
              {/* Login */}
              <li>
                <Link href="/login" className="flex flex-col items-center gap-1 text-slate-600 hover:text-[#03a9f4]">
                  <LogIn className="size-6 stroke-[1.5px]" />
                  <span className="text-xs font-medium">Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-[#03a9f4] p-2" onClick={toggle}>
          {isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {/* --- Bottom Navbar (Categories) - Desktop --- */}
      <div className="hidden lg:block bg-[#F9FAFB]">
        <div className="container py-3 px-12 mx-auto">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><Link href="/" className={`hover:text-[#03a9f4] transition-colors ${pathName === "/" ? "text-[#03a9f4]" : ""}`}>Home</Link></li>
            <li><Link href="/brands" className={`hover:text-[#03a9f4] transition-colors ${pathName === "/brands" ? "text-[#03a9f4]" : ""}`}>Brands</Link></li>
            <li><Link href="/categories" className={`hover:text-[#03a9f4] transition-colors ${pathName === "/categories" ? "text-[#03a9f4]" : ""}`}>Categories</Link></li>
            <li><Link href="/products" className={`hover:text-[#03a9f4] transition-colors ${pathName === "/products" ? "text-[#03a9f4]" : ""}`}>Products</Link></li>
          </ul>
        </div>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggle}
      />
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-[#FCF9F4] z-60 p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <span className="font-bold text-2xl text-[#03a9f4]">Brandy</span>
          <button onClick={toggle} className="p-2 bg-white rounded-full shadow-sm">
            <X className="size-5 text-[#03a9f4]" />
          </button>
        </div>

        {/* Mobile Search */}
        <div ref={searchWrapperRefMobile} className="relative mb-8 lg:hidden z-50">
          <form onSubmit={(e) => handleSearch(e)} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => { if (searchTerm.trim()) setShowDropdown(true); }}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-xl text-slate-700 border border-gray-200 focus:outline-none focus:border-[#03a9f4]"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
              <Search className="size-5" />
            </button>
          </form>
          {renderDropdown()}
        </div>

        <nav className="space-y-8 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* Main Menu Section */}
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Main Menu</p>
            <ul className="space-y-4 text-slate-700">
              <li><Link onClick={toggle} href="/" className="flex items-center gap-3 hover:text-[#03a9f4]"><Home className="size-5 stroke-[1.5px]" /> Home</Link></li>
              <li><Link onClick={toggle} href="/brands" className="flex items-center gap-3 hover:text-[#03a9f4]"><LayoutGrid className="size-5 stroke-[1.5px]" /> Brands</Link></li>
              <li><Link onClick={toggle} href="/categories" className="flex items-center gap-3 hover:text-[#03a9f4]"><Layers className="size-5 stroke-[1.5px]" /> Categories</Link></li>
              <li><Link onClick={toggle} href="/products" className="flex items-center gap-3 hover:text-[#03a9f4]"><PackageSearch className="size-5 stroke-[1.5px]" /> Products</Link></li>
            </ul>
          </div>

          {/* Shop Section */}
          {userInfo?.userType === "Customer" && (
            <div className="pt-2">
              <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">My Shop</p>
              <ul className="space-y-4 text-slate-700">
                <li>
                  <Link onClick={toggle} href="/cart" className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 group-hover:text-[#03a9f4]">
                      <ShoppingCart className="size-5 stroke-[1.5px]" />
                      <span>Cart</span>
                    </div>
                    {totalItems > 0 && (
                      <span className="bg-[#03a9f4] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link onClick={toggle} href="/wishlist" className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 group-hover:text-[#03a9f4]">
                      <Heart className="size-5 stroke-[1.5px]" />
                      <span>Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-[#03a9f4] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Account Section */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider pt-4">Account</p>
            <ul className="space-y-4 text-slate-700">
              {isAuthinticated ? (
                <>
                  <li><Link onClick={toggle} href={userInfo ? getAccountLink(userInfo.userType) : "/login"} className="flex items-center gap-3 hover:text-[#03a9f4]"><UserCircle className="size-5 stroke-[1.5px]" /> My Account</Link></li>
                  <li><button onClick={() => { toggle(); handleLogOut(); }} className="flex items-center gap-3 text-red-600 hover:text-red-700"><LogOut className="size-5 stroke-[1.5px]" /> Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link onClick={toggle} href="/login" className="flex items-center gap-3 hover:text-[#03a9f4]"><LogIn className="size-5 stroke-[1.5px]" /> Login</Link></li>
                  <li><Link onClick={toggle} href="/register" className="flex items-center gap-3 hover:text-[#03a9f4]"><UserPlus className="size-5 stroke-[1.5px]" /> Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </aside>
    </nav>
  );
}