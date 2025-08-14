"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    image: "/Electronics.jpg",
    title: "Discover the Latest Electronics",
    subtitle: "Top gadgets just for you",
  },
  {
    image: "/Fashion.jpg",
    title: "Trendy Fashion Collection",
    subtitle: "Upgrade your wardrobe today",
  },
  {
    image: "/Grocery.jpg",
    title: "Fresh Grocery Deals",
    subtitle: "Healthy and organic choices",
  },
];

const categories = [
  { name: "Electronics", image: "electronics.jpg", link: "/categories/electronics" },
  { name: "Fashion", image: "fashion.jpg", link: "/categories/fashion" },
  { name: "Grocery", image: "grocery.jpg", link: "/categories/grocery" },
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);

  // Automatic slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  return (
    <div className="w-full min-h-screen p-1 bg-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full h-96 p-2 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
              <h2 className="text-white text-4xl font-bold mb-2">{banner.title}</h2>
              <p className="text-white text-lg">{banner.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-2xl font-semibold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
