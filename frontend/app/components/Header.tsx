'use client';
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // local state
    const [searchQuery, setSearchQuery] = useState('');

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // You can redirect: router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className='border-b bg-relative bg-gradient-to-r from-blue-40 to-purple-800 text-white p-1 rounded-xl sticky top-0 z-50'>
      {/* Desktop Header */}
      <div className='container w-[80%] mx auto hidden lg:flex items-center justify-between p-4'>

        {/* Left Section: Logo + Home */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl">
                <span className="font-bold text-xl">G</span>
              </div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              G-Kart
            </span>
          </Link>
          {/* Home Icon */}
          <Link href="/" className={`flex items-center space-x-1 transition-colors p-2 hover:bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text white rounded-lg`}>

            <span className="hidden sm:block font-medium">Home</span>
          </Link>


          {/* Categories Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"


            onMouseEnter={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}


          >
            <button className="flex items-center space-x-1 transition-colors p-2 hover:bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text white rounded-lg">
              <span className="hidden sm:block font-medium">Categories</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute mt-2 w-40 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text white rounded-lg shadow-lg text-white">
                {['Electronics', 'Fashion', 'Grocery'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 hover:text-white"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Middle Section: Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 px-6">
          <div className="relative">
            <input
              type="text"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border-2 border-white- px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 hover:bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text white rounded-full px-3 py-1"
            >
              <Search className="h-7 w-5"/>
            </button>
          </div>
        </form>

          {/* Right: Cart Icon */}
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {/* Example badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )


}
export default Header;
