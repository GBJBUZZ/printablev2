import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="ml-2 mt-4 w-[248px] h-screen rounded-2xl shadow-sm bg-white border-r border-gray-200 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4">
          <Image src="/projectlogo.png" alt="Logo" width={26} height={26} />
          <span className="text-[17px] font-semibold text-gray-900">Printable</span>
          <div className="ml-auto">
            <img src="/icons/switchicon.png" className="w-6 h-6 opacity-70" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mx-5" />

        {/* Menu */}
        <nav className="flex flex-col text-[14px] text-gray-600 mt-3">
          
          {/* Dashboard */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/dashboardicon.png" className="w-4 h-4 opacity-70" />
            <span>Dashboard</span>
          </div>

          {/* Orders Active */}
          <div className="flex items-center justify-between mx-4 px-4 py-[10px] rounded-lg bg-indigo-100 text-black font-medium">
            <div className="flex items-center gap-3">
              <img src="/icons/ordericon.png" className="w-4 h-4 " />
              <span>Orders</span>
            </div>
            <span className="min-w-[20px] text-center text-[11px] bg-[#06044B] text-white px-2 py-[1px] rounded-full">
              10
            </span>
          </div>

          {/* Marketplace */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/marketplaceicon.png" className="w-4 h-4 opacity-70" />
            <span>Marketplace</span>
            <span className="ml-auto text-gray-400 text-xs">⌄</span>
          </div>

          {/* Document Vault */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/documentvaulticon.png" className="w-4 h-4 opacity-70" />
            <span>Document Vault</span>
          </div>

          {/* Services */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/serviceicon.png" className="w-4 h-4 opacity-70" />
            <span>Services & Pricing</span>
          </div>

          {/* Earnings */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/earningicon.png" className="w-4 h-4 opacity-70" />
            <span>Earnings & Wallet</span>
          </div>

          {/* Chat */}
          <div className="flex items-center justify-between px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-3">
              <img src="/icons/chaticon.png" className="w-4 h-4 opacity-70" />
              <span>Chat with customer</span>
            </div>
            <span className="min-w-[20px] text-center text-[11px] bg-[#06044B] text-white px-2 py-[1px] rounded-full">
              5
            </span>
          </div>

          {/* Equipment */}
          <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
            <img src="/icons/printicon.png" className="w-4 h-4 opacity-70" />
            <span>Equipment</span>
          </div>
        </nav>
      </div>

      {/* Bottom Support */}
      <div className="px-5 pb-5">
        <button className="w-full flex items-center gap-2 border border-gray-200 rounded-[10px] px-4 py-[10px] text-[13px] text-gray-600 hover:bg-gray-50">
          <img src="/icons/supportcentericon.png" className="w-4 h-4 opacity-70" />
          Support Center
        </button>
      </div>
    </aside>
  );
}
