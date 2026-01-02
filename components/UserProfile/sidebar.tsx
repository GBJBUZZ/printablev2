// components/UserProfile/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChatBubbleLeftEllipsisIcon,
  CloudIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  MapPinIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { TbLogout2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const links = [
  { icon: HomeIcon, label: "My Account", path: "/myaccount" },
  { icon: DocumentTextIcon, label: "Orders", path: "/orders" },
  { icon: MapPinIcon, label: "Address", path: "/myaddress" },
  { icon: Wallet, label: "Printable Wallet", path: "/wallet" },
  { icon: CreditCardIcon, label: "Payment", path: "/payment" },
  { icon: CloudIcon, label: "My Space", path: "/my-space" },
  { icon: StarIcon, label: "Favorites", path: "/favourite" },
  { icon: ChatBubbleLeftEllipsisIcon, label: "Chat", path: "/chat" },
];

const settings = [
  { icon: Cog6ToothIcon, label: "Settings", path: "/my-setting" },
  { icon: QuestionMarkCircleIcon, label: "Help & Support", path: "/support" },
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-72 bg-white rounded-2xl shadow-md p-6 flex flex-col"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      {/* User Info */}
      <div className="flex flex-col border-b border-[#e9eaf0] pb-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-800 text-base">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-gray-500">{user?.email || "user@email.com"}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 mt-6">
        {links.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#e9eaf0] text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-[#f5f6fa]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-grow"></div>
      <div className="mt-6 flex flex-col gap-1 border-t border-[#e9eaf0] pt-4">
        {settings.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#e9eaf0] text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-[#f5f6fa]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors mt-2">
          <TbLogout2 className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </motion.aside>
  );
}
