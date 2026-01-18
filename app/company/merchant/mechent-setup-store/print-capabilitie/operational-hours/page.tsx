"use client";

import { useState } from "react";
import Link from "next/link";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export default function OperationalHours() {
  const [openStates, setOpenStates] = useState<boolean[]>(
    days.map(() => true)
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-10 text-white"
      style={{ backgroundImage: "url(/backgroundMerchant.png)" }}
    >
      {/* Logo */}
      <header className="max-w-[1400px] flex gap-5 pt-8 ml-3">
        <img src="/logom.png" alt="Printable Logo" className="w-10 h-9" />
        <h3 className="text-[30px] font-semibold text-white">Printable</h3>
      </header>

      <div className="mx-auto mt-18 flex h-[calc(100vh-140px)] max-w-[1400px] gap-16 pl-10">
        {/* LEFT */}
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-semibold">Operational Hours</h1>
          <p className="mt-2 mb-8 text-white/70">
            Set your store's operating hours
          </p>

          <div className="flex-1 space-y-4">
            {days.map((day, index) => {
              const isOpen = openStates[index];
              return (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-24">{day}</span>

                  {/* Toggle */}
                  <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isOpen}
                      onChange={() => handleToggle(index)}
                      className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-indigo-500"></span>
                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></span>
                  </label>

                  <span className="text-sm">{isOpen ? "Open" : "Close"}</span>

                  <input
                    type="time"
                    defaultValue="09:00"
                    disabled={!isOpen}
                    className="rounded-lg border border-white bg-transparent px-3 py-2 text-sm text-white focus:outline-none disabled:opacity-50 time-input"
                  />

                  <span className="text-white/70">To</span>

                  <input
                    type="time"
                    defaultValue="18:00"
                    disabled={!isOpen}
                    className="rounded-lg border border-white bg-transparent px-3 py-2 text-sm text-white focus:outline-none disabled:opacity-50 time-input"
                  />
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-10 flex gap-80">
            <Link href="/company/merchant/mechent-setup-store/print-capabilitie">
              <button className="rounded-full border border-white px-7 py-2">
                Back
              </button>
            </Link>

            <button className="rounded-full bg-green-400 px-9 py-2 font-semibold text-black">
              Finish
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[1020px] rounded-2xl bg-white" />
      </div>

      <style jsx>{`
        .time-input::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}
