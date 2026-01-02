"use client";

import { useUser } from "@clerk/nextjs";
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  CloudIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";

type OrderStatus = "Shipped" | "Delivered";
type Priority = "High" | "Normal";

interface Order {
  orderDate: string;
  orderNo: string;
  productName: string;
  shop: string;
  address: string;
  estDelivery?: string;
  priority: Priority;
  status: OrderStatus;
  price: string;
  copies: number;
  progress: number;
  image: string;
}

const orders: Order[] = [
  {
    orderDate: "2025/04/22 11:15:32 am",
    orderNo: "CNF47654448320532",
    productName: "Business Proposal.pdf",
    shop: "Print Master Shop",
    address: "123 Main St, New York, NY 10001",
    estDelivery: "12 minutes",
    priority: "High",
    status: "Shipped",
    price: "2450.00",
    copies: 20,
    progress: 80,
    image: "/pdf-preview.png",
  },
  {
    orderDate: "2025/04/22 11:15:32 am",
    orderNo: "CNF47654448320532",
    productName: "Business Proposal.pdf",
    shop: "Print Master Shop",
    address: "123 Main St, New York, NY 10001",
    priority: "Normal",
    status: "Delivered",
    price: "2450.00",
    copies: 20,
    progress: 100,
    image: "/pdf-preview.png",
  },
];

export default function MyOrders() {
  const { user } = useUser();
  const [filterStatus, setFilterStatus] = useState<"All" | "Shipped" | "Delivered">("All");

  const filteredOrders = filterStatus === "All" ? orders : orders.filter(order => order.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#e9eaf0] py-10 px-10 flex flex-col">
      <div className="flex max-w-7xl mx-auto gap-6">
        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-2xl shadow-md p-6 flex flex-col" style={{ height: "calc(100vh - 5rem)" }}>
          <div className="flex flex-col border-b border-[#e9eaf0] pb-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.imageUrl || "/default-avatar.png"}
                alt={`${user?.firstName || "User"}'s Avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-800 text-base">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
              </div>
            </div>
          </div>
          <div>
            <nav className="flex flex-col gap-1 mt-6">
              <SidebarLink icon={HomeIcon} label="My Account" />
              <SidebarLink icon={DocumentTextIcon} label="My Orders" active />
              <SidebarLink icon={ClockIcon} label="History" />
              <SidebarLink icon={WalletIcon} label="My Wallet" />
              <SidebarLink icon={CloudIcon} label="My Drive" />        
              <hr className="my-4 border-t border-[#C9C9C9]" />
              <SidebarLink icon={ChatBubbleLeftEllipsisIcon} label="Chat" />
            </nav>
            <nav className="flex flex-col gap-1 mt-6">
              <SidebarLink icon={Cog6ToothIcon} label="Settings" />
              <SidebarLink icon={QuestionMarkCircleIcon} label="Help & Support" />
              <SidebarLink icon={TbLogout2} label="Log out" className="text-red-500 bg-red-100 hover:bg-red-200" />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl shadow-md p-8 overflow-y-auto" style={{ height: "calc(100vh - 5rem)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="border-b border-[#e9eaf0] pb-4 mb-6">
              <h1 className="text-2xl font-bold">My Orders</h1>
            </div>
            <div className="flex gap-2 mb-6">
              <OrderTab label="All" active={filterStatus === "All"} onClick={() => setFilterStatus("All")} />
              <OrderTab label="Shipped" active={filterStatus === "Shipped"} onClick={() => setFilterStatus("Shipped")} />
              <OrderTab label="Delivered" active={filterStatus === "Delivered"} onClick={() => setFilterStatus("Delivered")} />
            </div>
            <div className="flex flex-col gap-4">
              {filteredOrders.map((order, idx) => (
                <OrderCard key={idx} {...order} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  icon: Icon,
  label,
  active = false,
  className = "",
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 rounded-lg transition text-base cursor-pointer ${
        active
          ? "bg-[#e9eaf0] text-[#23235b] font-semibold"
          : "text-gray-600 hover:bg-[#f4f5f7]"
      } ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}

function OrderTab({ label, active = false, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition ${
        active
          ? "bg-white border-[#dadce0] text-[#23235b]"
          : "bg-transparent border-transparent text-gray-600 hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}

function OrderCard({
  orderDate,
  orderNo,
  productName,
  shop,
  address,
  estDelivery,
  priority,
  status,
  price,
  copies,
  progress,
  image,
}: Order) {
  return (
    <div className="bg-[#f6f7fb] rounded-xl flex px-5 py-4 gap-4 items-center shadow-sm border border-[#e9eaf0]">
      <img
        src={image}
        alt={productName}
        className="w-20 h-24 rounded-lg border object-cover"
      />
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">
          Order Date & Time : {orderDate} &nbsp; | &nbsp; Order No:{" "}
          <span className="font-semibold text-gray-700">{orderNo}</span>
        </div>
        <div className="font-semibold text-lg text-gray-800 mb-1">{productName}</div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium">{shop}</span>
          <span className="mx-1">•</span>
          <span>{address}</span>
        </div>
        <div className="flex gap-2 mb-2">
          {status === "Shipped" && estDelivery && (
            <span className="bg-[#ededf1] text-gray-700 px-2 py-0.5 rounded text-xs">
              Est. Delivery Time: {estDelivery}
            </span>
          )}
          {status === "Shipped" && (
            <span className="bg-[#ffe69c] text-[#856404] px-2 py-0.5 rounded text-xs font-medium">
              Priority: {priority}
            </span>
          )}
          {status === "Delivered" && (
            <>
              <span className="bg-[#d1f7e5] text-[#1aab6e] px-2 py-0.5 rounded text-xs font-medium">
                Delivered
              </span>
              <span className="bg-[#ededf1] text-[#23235b] px-2 py-0.5 rounded text-xs font-medium">
                Priority: {priority}
              </span>
            </>
          )}
        </div>
        {status === "Shipped" && (
          <div className="mb-1">
            <div className="text-xs text-gray-500 mb-0.5">Delivery Progress:</div>
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 min-w-[150px]">
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800 mb-1">
            ₹{price}
          </div>
          <div className="text-xs text-gray-500">Copies: {copies}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 7V6a2 2 0 012-2h2m0 0h6m-6 0v2m6-2v2m6 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V7m14 0V6a2 2 0 00-2-2h-2"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Store Pickup
          </div>
        </div>
        <div className="flex gap-2">
          <button className="border border-[#dadce0] text-[#23235b] px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 bg-white hover:bg-[#f4f5f7]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
              <path d="M8 2v4M16 2v4M4 10h16" strokeWidth={2} />
            </svg>
            Invoice
          </button>
          <button className="bg-[#23235b] text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-[#19194a]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Track order
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-2 bg-[#e9eaf0] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#1aab6e] transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
