export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 rounded-[10px] shadow-sm">
      
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#E8E7FE] px-4 h-10 rounded-full">
        <img src="/searchi.png" alt="search" className="w-5 h-5 opacity-70" />
        <input
          placeholder="Search orders, customers"
          className="bg-transparent outline-none text-sm w-72 placeholder:text-gray-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Date & Time */}
        <span className="text-sm text-gray-600 whitespace-nowrap">
          19 Sept, 2024 · 09:00 AM
        </span>

        {/* Settings */}
        <img src="/settings.png" alt="settings" className="w-5 h-5 cursor-pointer" />

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <img src="/bell.png" alt="notifications" className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src="/avatar.png"
            alt="avatar"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
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
