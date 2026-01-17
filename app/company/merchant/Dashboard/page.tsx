"use client";

import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { 
  LayoutDashboard, ShoppingBag, Store, FileLock2, BadgePercent, 
  Wallet, MessageSquareMore, Printer, ChevronDown, 
  PanelLeftClose, Search, Settings, Bell, RefreshCcw
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';

// --- DATA DEFINED EXTERNALLY TO PREVENT SYNTAX ERRORS ---
const chartData = [
  { day: 'Mon', orders: 12, revenue: 1500 },
  { day: 'Tue', orders: 14, revenue: 1700 },
  { day: 'Wed', orders: 18, revenue: 2200 },
  { day: 'Thu', orders: 16, revenue: 2000 },
  { day: 'Fri', orders: 10, revenue: 800 },
  { day: 'Sat', orders: 26, revenue: 1200 },
  { day: 'Sun', orders: 15, revenue: 2400 },
];

const ordersData = [
  { id: "#ORD-7829", name: "Emma Thompson", email: "emma.t@example.com", type: "Flyers", status: "New", date: "Apr 21, 2025", request: "Pending", amount: "₹120.00" },
  { id: "#ORD-7829", name: "Emma Thompson", email: "emma.t@example.com", type: "Business Cards", status: "In Progress", date: "Apr 20, 2025", request: "Approved", amount: "₹245.00" },
  { id: "#ORD-7829", name: "Emma Thompson", email: "emma.t@example.com", type: "Brochures", status: "Ready", date: "Apr 19, 2025", request: "Approved", amount: "₹350.00" },
  { id: "#ORD-7829", name: "Emma Thompson", email: "emma.t@example.com", type: "Posters", status: "Completed", date: "Apr 19, 2025", request: "Approved", amount: "₹175.00" },
  { id: "#ORD-7829", name: "Emma Thompson", email: "emma.t@example.com", type: "Glossy Noice", status: "Completed", date: "Apr 19, 2025", request: "Approved", amount: "₹220.00" },
];

const topSellingData = [
  { name: "3U Cube logo Template", sales: "1520 Sales", stock: "135 Stocks Remaining", color: "bg-[#F1F5F9]", src: "/555.png" },
  { name: "Printable Visiting Card", sales: "151 Sales", stock: "120 Stocks Remaining", color: "bg-[#4ADE80]", src: "/666.png" },
  { name: "Ramu Kaka Ki Chai Logo Template", sales: "235 Sales", stock: "300 Stocks Remaining", color: "bg-white border", src: "/777.png" },
  { name: "realme T300 3d object", sales: "51 Sales", stock: "510 Stocks Remaining", color: "bg-white border", src: "/888.png" }
];

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active = false, badge = null, hasArrow = false }: any) => (
  <div className={`flex items-center justify-between px-4 py-2.5 cursor-pointer rounded-xl transition-all ${active ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#64748B] hover:bg-gray-50'}`}>
    <div className="flex items-center gap-3">
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[14px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && <span className="bg-[#1E1B4B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{badge}</span>}
      {hasArrow && <ChevronDown size={16} className="text-gray-400" />}
    </div>
  </div>
);

const StatCard = ({ title, value, change, subtext, imgSrc, colorClass }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[#64748B] text-sm font-medium">{title}</p>
      <div className={`p-2 rounded-lg ${colorClass} w-10 h-10 flex items-center justify-center overflow-hidden`}>
        <img src={imgSrc} alt="" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <h2 className="text-2xl font-bold text-[#0F172A]">{value}</h2>
      <span className="text-green-500 text-xs font-bold">↑ {change}</span>
    </div>
    <p className="text-[11px] text-[#94A3B8] mt-1">{subtext}</p>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center justify-between border-b border-gray-50 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <img src="/projectlogo.png" alt="logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-[#0F172A]">Printable</span>
          </div>
          <PanelLeftClose size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={ShoppingBag} label="Orders" badge="10" />
          <SidebarItem icon={Store} label="Marketplace" hasArrow />
          <SidebarItem icon={FileLock2} label="Document Vault" />
          <SidebarItem icon={BadgePercent} label="Services & Pricing" />
          <SidebarItem icon={Wallet} label="Earnings & Wallet" />
          <SidebarItem icon={MessageSquareMore} label="Chat with customer" badge="5" />
          <SidebarItem icon={Printer} label="Equipment" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="w-full flex items-center justify-center gap-3 py-3 border-2 border-[#0F172A] rounded-2xl cursor-pointer hover:bg-[#0F172A] hover:text-white group transition-all duration-200">
            <div className="relative">
              <img src="/call.png" alt="call" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-[14px] font-bold text-[#0F172A] group-hover:text-white transition-colors">Support Center</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* TOPBAR */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders, customers" 
              className="w-full pl-12 pr-4 py-2.5 bg-[#EEF2FF] border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-100 outline-none" 
            />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-black-500 font-medium">19 Sept, 2024 09:00 AM</span>
            <div className="flex gap-4 text-gray-400">
              <Settings size={20} className="cursor-pointer hover:text-indigo-600" />
              <div className="relative cursor-pointer hover:text-indigo-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right leading-tight">
                <p className="text-sm font-bold text-[#0F172A]">Print Master Shop</p>
                <p className="text-[10px] font-bold text-black-400 tracking-widest">Merchant</p>
              </div>
              <div className="w-10 h-10 bg-[#E2E8F0] rounded-full overflow-hidden border border-gray-100">
                <img src="/Merchant Profile.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <h1 className="text-2xl font-bold text-[#0F172A] mb-8 relative inline-block">
          Dashboard
          <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-indigo-500 rounded-full"></span>
        </h1>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Orders" value="1200" change="12%" subtext="vs. 210 last month" imgSrc="/111.png" colorClass="bg-blue-50" />
          <StatCard title="Total Revenue" value="₹1,80,425.25" change="8%" subtext="vs. ₹4,205 last month" imgSrc="/222.png" colorClass="bg-green-50" />
          <StatCard title="Today's Pending Orders" value="5" change="5%" subtext="vs. 17 yesterday" imgSrc="/333.png" colorClass="bg-yellow-50" />
          <StatCard title="Accepted Orders" value="8,095" change="20%" subtext="vs. 120 last month" imgSrc="/444.png" colorClass="bg-purple-50" />
        </div>

        {/* MIDDLE SECTION: CHART & TOP SELLING ITEMS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8 items-stretch">
          
          {/* ORDERS OVERVIEW */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[20px] font-bold text-[#0F172A]">Orders Overview</h3>
              <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
                <button className="bg-[#06044B] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm">Weekly</button>
                <button className="text-[#64748B] px-6 py-2 rounded-lg text-sm font-bold hover:bg-white/50">Monthly</button>
              </div>
            </div>
            <div className="h-[380px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#64748B', fontWeight: 500 }} dy={15} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#64748B' }} domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 30]} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#64748B' }} tickFormatter={(val) => `₹${val}`} domain={[0, 3000]} ticks={[0, 500, 1000, 1500, 2000, 3000]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '40px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="orders" name="Orders" stroke="#FF4D4D" strokeWidth={3} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#22D3EE" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TOP SELLING ITEMS */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-[#0F172A]">Top Selling Items</h3>
                <RefreshCcw size={16} className="text-[#3B82F6] cursor-pointer" />
              </div>
              <button className="text-[#3B82F6] text-[14px] font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
              {topSellingData.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-[70px] h-[55px] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5 ${item.color}`}>
                    <img src={item.src} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className="text-[14px] font-bold text-[#0F172A] truncate">{item.name}</p>
                    <p className="text-[12px] text-gray-400 font-medium mt-1">{item.sales}</p>
                  </div>
                  <div className="text-right leading-tight flex-shrink-0">
                    <p className="text-[12px] text-[#22C55E] font-bold flex items-center justify-end gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>Available
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium mt-1">{item.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-[20px] font-bold text-[#0F172A]">Recent Orders</h3>
            <button className="text-[#3B82F6] text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#E9EDF5] text-[#475569] text-[12px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4 text-center">Request Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ordersData.map((order, i) => (
                  <tr key={i} className="text-sm hover:bg-gray-50/50 transition-all">
                    {/* Order ID UPDATED TO BLACK */}
                    <td className="px-6 py-4 font-bold text-[#0F172A] underline cursor-pointer whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex-shrink-0 overflow-hidden">
                          <img src="/999.png" alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/32"; }} />
                        </div>
                        <div className="leading-tight">
                          <p className="text-[13px] font-bold text-[#0F172A]">{order.name}</p>
                          <p className="text-[11px] text-gray-400">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{order.type}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'New' ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 
                        order.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#92400E]' : 
                        order.status === 'Ready' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#F3E8FF] text-[#7E22CE]'
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4">
                      {order.request === 'Pending' ? (
                        <div className="flex justify-center gap-2">
                          <button className="px-3 py-1 border border-[#22C55E] text-[#22C55E] bg-[#F0FDF4] rounded-lg text-[10px] font-bold">Accept?</button>
                          <button className="px-3 py-1 border border-[#F87171] text-[#EF4444] bg-[#FEF2F2] rounded-lg text-[10px] font-bold">Deny?</button>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className="px-4 py-1 border border-[#BBF7D0] text-[#22C55E] bg-[#F0FDF4] rounded-lg text-[10px] font-bold">Approved</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#0F172A] whitespace-nowrap">{order.amount}</td>
            <td className="px-6 py-4 text-center">
 
                       {/* The button acts as the clickable container */}
                        <Link href="/company/merchant/desktop1">
                        <img
                         src="/22.png"
                         className="w-[35px] h-[35px] cursor-pointer hover:opacity-80 transition-opacity"
                         />
    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}