"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutGrid, ShoppingBag, Store, FolderOpen, 
  Wallet, MessageSquare, Printer, Search, 
  Settings, Bell, Calendar, Mic, Send, 
  Plus, Link as LinkIcon, CheckCheck,
  PanelLeftClose, BadgePercent as BadgePercentIcon, Filter
} from 'lucide-react';

// --- HELPER COMPONENTS ---

function NavItem({ icon, label, active = false, badge = null, dropdown = false }: any) {
  return (
    <div className={`
      flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#64748B] hover:bg-gray-50'}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <span className="bg-[#1E1B4B] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{badge}</span>}
        {dropdown && <span className="text-[10px] opacity-50">▼</span>}
      </div>
    </div>
  );
}

function MessageBubble({ type, name, text, time }: any) {
  const isSent = type === 'sent';
  return (
    <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'}`}>
      <span className={`text-[11px] font-bold mb-1 ${isSent ? 'text-blue-600' : 'text-blue-500'}`}>{name}</span>
      <p className="text-sm font-bold text-gray-800 leading-relaxed max-w-[80%]">{text}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[10px] text-gray-400 uppercase">{time}</span>
        {isSent && <CheckCheck size={14} className="text-green-500" />}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function ChatPage() {
  // State for handling messages and input in a working state
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "received", name: "Jay Vasani", text: "Good Morning Ma'am", time: "10:07 AM" },
    { id: 2, type: "sent", name: "Me", text: "Good Morning, I will need those reports bt 3 PM", time: "10:07 AM" },
    { id: 3, type: "received", name: "Jay Vasani", text: "Good Morning Ma'am", time: "10:07 AM" },
    { id: 4, type: "sent", name: "Me", text: "Good Morning, I will need those reports bt 3 PM", time: "10:07 AM" },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for the chat window
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handler to send messages
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: "sent",
      name: "Me",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* 1. SIDEBAR */}
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
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" />
          <NavItem icon={<ShoppingBag size={20} />} label="Orders" badge="10" />
          <NavItem icon={<Store size={20} />} label="Marketplace" dropdown />
          <NavItem icon={<FolderOpen size={20} />} label="Document Vault" />
          <NavItem icon={<BadgePercentIcon size={20} />} label="Services & Pricing" />
          <NavItem icon={<Wallet size={20} />} label="Earnings & Wallet" />
          <NavItem icon={<MessageSquare size={20} />} label="Chat with customer" active badge="5" />
          <NavItem icon={<Printer size={20} />} label="Equipment" />
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

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <header className="flex justify-between items-center p-8 bg-white border-b border-gray-50 flex-shrink-0">
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

        {/* CHAT INTERFACE CONTENT */}
        <div className="p-6 flex-1 flex gap-6 overflow-hidden">
          
          {/* LEFT: CONTACT LIST PORTION */}
          <div className="w-80 bg-white rounded-3xl border border-gray-100 flex flex-col overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-50">
              <h2 className="text-2xl font-bold text-black mb-5 tracking-tight">Chat with Customer</h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Filter
                  <img src="/Tune.png" alt="filter" className="w-4 h-4 object-contain" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4">
              {[1, 2, 3].map((i, index) => (
                <div key={i}>
                  <div className={`p-4 flex gap-3 cursor-pointer rounded-2xl transition-colors ${i === 1 ? 'bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img src="/jay-vasani.png" alt="contact" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-black leading-none">Jay Vasani</span>
                        <span className="text-[11px] text-gray-500 font-medium">10:07 AM</span>
                      </div>
                      <p className="text-[12px] text-gray-500 truncate leading-tight">
                        I hope this message finds you well. Due to ...
                      </p>
                      <div className="flex justify-end mt-1">
                        <CheckCheck size={16} className="text-green-500" />
                      </div>
                    </div>
                  </div>
                  {index !== 2 && (
                    <div className="mx-4 border-b border-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CHAT BOX WORKING STATE */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden relative shadow-sm">
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-gray-50 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                   <img src="/jay-vasani.png" alt="current chat" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">Jay Vasani</h3>
                  <p className="text-xs text-green-500 font-medium leading-none">Available</p>
                </div>
              </div>
              <div className="flex gap-4">
                    <img src="/Pin.png" alt="pin" className="w-5 h-5 object-contain cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="/Ellipsis.png" alt="more" className="w-5 h-5 object-contain cursor-pointer opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 p-6 overflow-y-auto space-y-8 bg-white scroll-smooth">
              {messages.map((msg) => (
                <MessageBubble 
                  key={msg.id}
                  type={msg.type}
                  name={msg.name}
                  text={msg.text}
                  time={msg.time}
                />
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-4">
              <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><Plus size={20} /></button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><LinkIcon size={18} /></button>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message here ..." 
                  className="flex-1 bg-transparent text-sm focus:outline-none" 
                />
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><Mic size={18} /></button>
                <button 
                  onClick={handleSend}
                  className="text-[#0A054F] hover:scale-110 active:scale-95 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}