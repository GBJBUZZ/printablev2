"use client";

import { useState, useEffect, useRef } from "react";

export default function AIChatPage() {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [showDefaultDropdown, setShowDefaultDropdown] = useState(false);
  const [selectedPage, setSelectedPage] = useState("1 Page");
  const [selectedDefault, setSelectedDefault] = useState("Default");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pageDropdownRef = useRef<HTMLDivElement>(null);
  const defaultDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(event.target as Node)) {
        setShowPageDropdown(false);
      }
      if (defaultDropdownRef.current && !defaultDropdownRef.current.contains(event.target as Node)) {
        setShowDefaultDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      alert(`Searching for: ${inputValue}`);
    }
  };

  return (
    <div className="min-h-[100svh] bg-gray-100 overflow-hidden flex items-center justify-center">
      <div
        className="bg-white border rounded-[26px] w-full max-w-4xl"
        style={{ borderColor: "#9333EA" }}
      >
        {/* INPUT SECTION */}
        <div className="flex items-center gap-3 px-4 py-4">
          {/* PLUS BUTTON */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* INPUT */}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Describe your ideas"
            className="flex-1 outline-none text-base text-gray-900"
          />
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="flex items-center gap-3 px-4 pb-4">
          <button className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-sm">
            Generate PPT
          </button>

          {/* PAGE DROPDOWN */}
          <div className="relative" ref={pageDropdownRef}>
            <button
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              className="px-3 py-1.5 border rounded-lg text-sm"
            >
              {selectedPage}
            </button>
          </div>

          {/* DEFAULT DROPDOWN */}
          <div className="relative" ref={defaultDropdownRef}>
            <button
              onClick={() => setShowDefaultDropdown(!showDefaultDropdown)}
              className="px-3 py-1.5 border rounded-lg text-sm"
            >
              {selectedDefault}
            </button>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="ml-auto w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
