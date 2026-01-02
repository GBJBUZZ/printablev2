"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchAndFilterProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="w-full mt-6 flex items-center gap-x-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-11/12">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10 py-2 rounded-lg text-sm bg-white w-full focus:ring-2 focus:ring-[#06044B] transition-all duration-200"
          placeholder="Search"
        />
        <Search className="absolute h-4 w-4 top-3 left-3 text-gray-400" />
        {searchText && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSearchText("");
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg flex items-center px-4 py-2 hover:shadow-md transition-all duration-200 cursor-pointer">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <p className="text-black text-sm ml-2">Filter</p>
      </div>
    </motion.div>
  );
};

export default SearchAndFilter;
