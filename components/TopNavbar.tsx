"use client";

import { Search, Bell, Settings } from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl shadow-sm">
      
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search orders, customers"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-gray-600 text-sm">
        <span>19 Sept, 2024 · 09:00 AM</span>

        <Settings size={18} className="cursor-pointer" />
        <Bell size={18} className="cursor-pointer" />

        {/* Profile */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <img
            src="/IMG_73fsge21_3.png"
            alt="Print Master Shop"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-medium text-black">
              Print Master Shop
            </p>
            <p className="text-xs text-gray-500">
              Merchant
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
