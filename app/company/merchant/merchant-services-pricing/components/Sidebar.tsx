export default function Sidebar() {
  return (
    <aside className="w-64 bg-white px-4 py-6 rounded-[20px] flex flex-col justify-between h-[670px]">
      
      {/* Top */}
      <div className="space-y-6">
        
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logosidebar.png" alt="logo" className="w-7 h-7" />
            <span className="text-lg font-semibold text-gray-900">
              Printable
            </span>
          </div>
          <img src="/menu.png" alt="menu" className="w-7 h-7 cursor-pointer" />
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-sm">
          
          {/* Dashboard */}
          <SidebarItem icon="/dashboard.png" label="Dashboard" />

          {/* Orders */}
          <SidebarItem
            icon="/orders.png"
            label="Orders"
           
          />

          {/* Marketplace */}
          <SidebarItem
            icon="/marketplace.png"
            label="Marketplace"
          
          />

          {/* Document Vault */}
          <SidebarItem icon="/vault.png" label="Document Vault" />

          {/* Active */}
          <SidebarItem
            icon="/pricing.png"
            label="Services & Pricing"
            active
          />

          {/* Earnings */}
          <SidebarItem icon="/wallet.png" label="Earnings & Wallet" />

          {/* Chat */}
          <SidebarItem
            icon="/chat.png"
            label="Chat with customer"
            
          />

          {/* Equipment */}
          <SidebarItem icon="/equipment.png" label="Equipment" />
        </nav>
      </div>

      {/* Bottom */}
      <button className="flex items-center gap-3 border rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
        <img src="/support.png" alt="support" className="w-5 h-5" />
        Support Center
      </button>
    </aside>
  );
}

/* Reusable Item */
function SidebarItem({ icon, label, badge, rightIcon, active }) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
        ${
          active
            ? "bg-indigo-50 text-[#08055b] font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <img src={icon} alt="" className="w-5 h-5" />
        <span>{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-xs bg-[#08055b] text-white px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {rightIcon && <img src={rightIcon} alt="" className="w-4 h-4" />}
      </div>
    </div>
  );
}
