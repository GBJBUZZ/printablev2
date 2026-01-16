import Image from "next/image";

export default function Topbar() {
  return (
    <header className="mx-6 mt-4 mb-6 bg-white rounded-xl shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Search */}
      <div className="flex items-center gap-3 bg-indigo-50 rounded-full px-4 py-2 w-[420px]">
        <img src="/icons/searchicon.png" className="w-4 h-4 opacity-60" />
        <input
          type="text"
          placeholder="Search orders, customers"
          className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span>19 Sept, 2024 &nbsp; 09:00 AM</span>

        <img src="/icons/setting.png" className="w-10 h-10 cursor-pointer" />
        <img src="/icons/Notification.png" className="w-10 h-10 cursor-pointer" />
        
        <div className="flex items-center gap-3">
          <img
            src="/icons/Merchantprofile.png"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-medium text-gray-800">Print Master Shop</p>
            <p className="text-xs text-gray-500">Merchant</p>
          </div>
        </div>
      </div>
    </header>
  );
}
