"use client";

import React from 'react';
import { ChevronDown, FileText, Image as ImageIcon } from 'lucide-react';

export default function PrintModal() {
  return (
    <div className="flex h-screen bg-[#F1F3F9] p-4 font-sans overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">

        {/* LEFT COLUMN: LARGE DOCUMENT PREVIEW (SCROLLABLE) */}
        <div className="flex-[2] overflow-y-auto bg-[#E9EDF5] p-8 custom-scrollbar">
          <div className="flex flex-col items-center gap-8">

            {/* PAGE 1 - LARGE VIEW */}
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-100">
              <img
                src="/10.png"
                alt="Offer Letter Page 1"
                className="w-full h-auto object-contain"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x1100?text=Offer+Letter+PNG+Page+1"; }}
              />
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: ITEM LIST */}
        <div className="w-[280px] border-r border-gray-100 p-6 overflow-y-auto bg-white">
          <h2 className="text-lg font-bold text-[#0F172A]">Order ID: #ORD-7829</h2>

          <div className="mt-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Items</h3>

            <div className="mt-6 space-y-6">
              {/* ITEM 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-square w-full overflow-hidden rounded-xl border-2 border-transparent group-hover:border-indigo-500 transition-all bg-gray-50 shadow-sm">
                  <img src="/10.png" alt="Resume" className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="rounded bg-red-50 p-1.5 text-red-600"><FileText size={14} /></div>
                  <span className="text-[13px] font-bold text-[#0F172A] truncate">My-resume.pdf</span>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#06044B] flex items-center justify-center border-2 border-transparent group-hover:border-indigo-500 transition-all shadow-sm">
                  <img src="/11.png" alt="Logo" className="h-24 w-24 object-contain" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="rounded bg-orange-50 p-1.5 text-orange-600"><ImageIcon size={14} /></div>
                  <span className="text-[13px] font-bold text-[#0F172A] truncate">printable-logo.png</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRINT SETTINGS */}
        <div className="w-[340px] p-8 flex flex-col bg-white border-l border-gray-50">
          <div className="flex items-center gap-3 mb-10 p-4 bg-[#F8FAFC] rounded-2xl border border-gray-100">
            <div className="rounded-xl bg-red-500 p-2.5 text-white shadow-lg shadow-red-100 flex items-center justify-center">
              <FileText size={22} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-black text-[#0F172A] truncate leading-tight">theprojetks-tokens.pdf</p>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-1">0.10 MB • 2 Pages</p>
            </div>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* ALL SETTINGS SET TO ACTIVE STATE */}
            <PrintSetting label="Print Color" value="Black & White" isActive />

            <PrintSetting label="Number of Copies" value="12" isInput isActive />

            <PrintSetting label="Page Orientation" value="Portrait" isActive />

            <PrintSetting label="Pages to Print" value="1" isActive />

            <PrintSetting label="Paper Size" value='A4 (8.27" x 11.69")' isActive />

            <PrintSetting label="Paper Margin" value="Normal" isActive />
          </div>
          <div className="mt-8 flex gap-3 pt-6 border-t border-gray-50">
            <button className="flex-1 rounded-xl border-2 border-gray-200 py-3.5 text-[12px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 rounded-xl bg-[#06044B] py-3.5 text-[12px] font-black text-white shadow-xl shadow-indigo-100 hover:opacity-90 transition-all uppercase tracking-widest">
              Print Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENT: REFINED FOR IMAGE ACCURACY
const PrintSetting = ({ label, value, isInput = false, isActive = false }: any) => (
  <div className="group">
    <label className="text-[11px] font-bold text-[#0F172A] mb-2.5 block px-1 uppercase tracking-tight">{label}</label>
    <div className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 border-2
      ${isActive
        ? 'bg-[#E9FBF1] border-transparent'
        : 'bg-[#F8FAFC] border-transparent hover:bg-gray-100'}`}
    >
      {isInput ? (
        <input
          type="text"
          defaultValue={value}
          className={`bg-transparent text-[13px] font-bold outline-none w-full ${isActive ? 'text-[#15803D]' : 'text-[#0F172A]'}`}
        />
      ) : (
        <>
          <span className={`text-[13px] font-bold ${isActive ? 'text-[#15803D]' : 'text-[#0F172A]'}`}>{value}</span>
          <ChevronDown
            size={18}
            strokeWidth={2.5}
            className={isActive ? "text-[#15803D]" : "text-[#0F172A] opacity-30"}
          />
        </>
      )}
    </div>
  </div>
);