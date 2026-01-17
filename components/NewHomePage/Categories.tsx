"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Categories() {
  const allCategories = [
    { img: "/H-1.png", content: "Business Cards" },
    { img: "/H-2.png", content: "Post Card & Advertising" },
    { img: "/H-3.png", content: "Banners & Posters" },
    { img: "/H-4.png", content: "Packing" },
    { img: "/H-5.png", content: "Promotional Products" },
    { img: "/H-6.png", content: "Stationary & Invitations" },
    { img: "/H-3.png", content: "Stickers & Labels" },
    { img: "/H-4.png", content: "Calendars" },
    { img: "/H-5.png", content: "Gift Cards" },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? allCategories
    : allCategories.slice(0, 6);

  return (
    <div className="bg-white py-10">
      <div className="lg:pl-[200px] md:pl-[100px] sm:pl-[100px] pl-4">
        <h1 className="text-black text-[32px] text-center lg:text-start">
          Explore all Categories
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-16 mt-10">
          {visibleCategories.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col  items-center w-[150px]"
            >
              <div className="h-[160px] w-[160px] rounded-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.content}
                  height={160}
                  width={160}
                  className="h-full w-full object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
              <p className="text-center mt-4 text-black">
                {item.content}
              </p>
            </div>
          ))}

          {/* View All Button */}
          {!showAll && (
            <div
              onClick={() => setShowAll(true)}
              className="flex flex-col items-center w-[150px] cursor-pointer"
            >
              <div className="h-[160px] w-[160px] rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition">
                <span className="text-black font-semibold text-lg">
                  View All
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
