"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X, Home, Monitor, Shirt, ShoppingBag, LayoutGrid, Gift, LogOut, LogIn, UserPlus } from "lucide-react";


const Header = () => {


  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{ name: string } | null>(null);



  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const dropdownItemClass =
    "block px-4 py-2 text-sm rounded-lg transition bg-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white active:bg-gradient-to-r active:from-blue-600 active:to-purple-600 active:text-white active:scale-95";

  const buttonClass =
    "p-2 rounded-full transition hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white active:bg-gradient-to-r active:from-blue-600 active:to-purple-600 active:text-white active:scale-95";

  // ...existing code...

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="border-b bg-white text-black rounded-xl sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        {/* Left */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl">
                <span className="font-bold text-xl">G</span>
              </div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              G-Kart
            </span>
          </Link>

          <Link
            href="/"
            className={`flex items-center space-x-1 ${buttonClass}`}
            onClick={() => {
              setIsCategoriesOpen(false);
              setIsUserOpen(false);
              setIsMobileMenuOpen(false);
            }} 
          >
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span className="hidden sm:block font-medium">Home</span>
            </span>
          </Link>

          <div ref={categoriesRef} className="relative">
            <button
              onClick={() => {
                setIsCategoriesOpen((prev) => !prev);
                setIsUserOpen(false);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-1 ${buttonClass}`}
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5" />
                <span className="hidden sm:block font-medium">Categories</span>
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isCategoriesOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isCategoriesOpen && (
              <div className="absolute mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link
                    href="/categories/electronics"
                    className={dropdownItemClass}
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    <span className="flex flex-col items-center gap-1">
                      <Monitor className="w-6 h-6" />
                      <span>Electronics</span>
                    </span>
                  </Link>
                  <Link
                    href="/categories/fashion"
                    className={dropdownItemClass}
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    <span className="flex flex-col items-center gap-1">
                      <Shirt className="w-6 h-6" />
                      <span>Fashion</span>
                    </span>
                  </Link>
                  <Link
                    href="/categories/grocery"
                    className={dropdownItemClass}
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    <span className="flex flex-col items-center gap-1">
                      <ShoppingBag className="w-6 h-6" />
                      <span>Grocery</span>
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 px-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border px-4 py-2 bg-transparent focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className={`${buttonClass} absolute right-2 top-1/2 -translate-y-1/2`}
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center space-x-6">
          <Link href="/cart" className={`relative ${buttonClass}`}>
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link href="/wishlist" className={`relative ${buttonClass}`}>
            <Heart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                setIsUserOpen((prev) => !prev);
                setIsCategoriesOpen(false);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center w-10 h-10 rounded-full border ${buttonClass}`}
            >
              {user ? getInitials(user.name) : <User className="h-6 w-6" />}
            </button>
            {isUserOpen && (
              <div className="absolute mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                {user ? (
                  <>
                    <Link href="/orders" className={dropdownItemClass}>
                      <span className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-black" /> My Orders
                      </span>
                    </Link>
                    <button
                      onClick={() => setUser(null)}
                      className={`${dropdownItemClass} w-full text-left`}
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-5 h-5 text-black" /> Logout
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={dropdownItemClass}>
                      <span className="flex items-center gap-2">
                        <LogIn className="w-5 h-5 text-black" /> Login
                      </span>
                    </Link>
                    <Link href="/register" className={dropdownItemClass}>
                      <span className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-black" /> Signup
                      </span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex flex-col bg-white rounded-xl sticky top-0 z-50">
        {/* Top Row */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(true);
                setIsCategoriesOpen(false);
                setIsUserOpen(false);
              }}
              className={buttonClass}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-black p-3 rounded-xl">
                  <span className="font-bold text-white text-xl">G</span>
                </div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                G-Kart
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/cart" className={`relative ${buttonClass}`}>
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/wishlist" className={`relative ${buttonClass}`}>
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Icon with Dropdown (Mobile) */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setIsUserOpen((prev) => !prev)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${buttonClass}`}
              >
                {user ? getInitials(user.name) : <User className="h-6 w-6" />}
              </button>
              {isUserOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                  {user ? (
                    <>
                      <Link href="/orders" className={dropdownItemClass}>
                        <span className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-black" />
                          My Orders
                        </span>
                      </Link>
                      <button
                        onClick={() => setUser(null)}
                        className={`${dropdownItemClass} w-full text-left`}
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-5 h-5 text-black" />
                          Logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className={dropdownItemClass}>
                        <span className="flex items-center gap-2">
                          <LogIn className="w-5 h-5 text-black" />
                          Login
                        </span>
                      </Link>
                      <Link href="/signup" className={dropdownItemClass}>
                        <span className="flex items-center gap-2">
                          <UserPlus className="w-5 h-5 text-black" />
                          Signup
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Below Navbar */}
        <form onSubmit={handleSearch} className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border px-4 py-2 bg-transparent focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className={`${buttonClass} absolute right-2 top-1/2 -translate-y-1/2`}
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white text-black p-3 transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10">
          <span className="font-bold text-xl">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={buttonClass}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col p-2 gap-1">
          <Link href="/" className={dropdownItemClass}>
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </span>
          </Link>
          <div>
            <div className="font-semibold px-4 py-2 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5" />
              Categories
            </div>
            <Link href="/categories/electronics" className={dropdownItemClass}>
              <span className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Electronics
              </span>
            </Link>
            <Link href="/categories/fashion" className={dropdownItemClass}>
              <span className="flex items-center gap-2">
                <Shirt className="w-5 h-5" />
                Fashion
              </span>
            </Link>
            <Link href="/categories/grocery" className={dropdownItemClass}>
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Grocery
              </span>
            </Link>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
