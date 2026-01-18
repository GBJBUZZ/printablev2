"use client";

import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="ml-2 mt-4 w-[248px] h-[calc(100vh-32px)] rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        {/* Logo + Printable + l2 icon */}
        <div className="flex items-center gap-2 px-5 py-4">
          {/* Left Logo */}
          <Image
            src="/l1.png"
            alt="Left Logo"
            width={20}
            height={20}
          />

          {/* Printable Text */}
          <span className="text-[17px] font-semibold text-gray-900">
            Printable
          </span>

          {/* Right Icon (l2) */}
          <div className="ml-auto">
            <Image
              src="/l2.png"
              alt="Switch"
              width={24}
              height={24}
              className="opacity-70"
            />
          </div>
        </div>

        <div className="h-px bg-gray-200 mx-5" />

        {/* Menu */}
        <nav className="flex flex-col text-[14px] text-gray-600 mt-3">
          
          {/* Dashboard */}
          <MenuItem icon="/p1.png" label="Dashboard" />

          {/* Orders – now normal like others */}
          <MenuItem icon="/p2.png" label="Orders" badge="10" />

          {/* Marketplace */}
          <MenuItem icon="/p3.png" label="Marketplace" dropdown />

          {/* Document Vault */}
          <MenuItem icon="/p4.png" label="Document Vault" />

          {/* Services & Pricing */}
          <MenuItem icon="/p5.png" label="Services & Pricing" />

          {/* Earnings & Wallet */}
          <MenuItem icon="/p6.png" label="Earnings & Wallet" />

          {/* Chat with customer */}
          <MenuItem icon="/p7.png" label="Chat with customer" badge="5" />

          {/* Equipment */}
          <MenuItem icon="/p8.png" label="Equipment" />
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-5 pb-5">
        <button className="w-full flex items-center gap-2 border border-gray-200 rounded-[10px] px-4 py-[10px] text-[13px] text-gray-600 hover:bg-gray-50">
          <img
            src="call_logo.png"
            className="w-4 h-4 opacity-70"
            alt="Support"
          />
          Support Center
        </button>
      </div>
    </aside>
  );
}

/* ---------- Helper ---------- */

function MenuItem({
  icon,
  label,
  badge,
  dropdown,
}: {
  icon: string;
  label: string;
  badge?: string;
  dropdown?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-[10px] hover:bg-gray-100 cursor-pointer">
      <img src={icon} className="w-4 h-4 opacity-70" alt={label} />
      <span>{label}</span>

      {dropdown && (
        <span className="ml-auto text-gray-400 text-xs">⌄</span>
      )}

      {badge && (
        <span className="ml-auto min-w-[20px] text-center text-[11px] bg-[#06044B] text-white px-2 py-[1px] rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
