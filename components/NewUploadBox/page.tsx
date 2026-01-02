"use client";

import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import React from "react";
import { FiFileText } from "react-icons/fi";

type UplodeBoxProps = {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownMenuRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFromDeviceClick: () => void;
  handleFromDriveClick: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // ✅ added
};

export default function UplodeBox({
  dropdownOpen,
  setDropdownOpen,
  dropdownMenuRef,
  fileInputRef,
  handleFromDeviceClick,
  handleFromDriveClick,
  handleFileChange, // ✅ received
}: UplodeBoxProps) {
  return (
    <div className="min-h-[400px] w-full max-w-6xl mx-auto">
      <div>
        <div className="text-black">
          <h1 className="lg:text-[40px] md:text-[32px] text-[24px] font-bold lg:text-start md:text-start text-center  ">
            Print Your Documents
          </h1>

      

          <p className=" font-semibold pb-4 lg:text-start md:text-start text-center">
            Print your , way - upload , customize , and receive
          </p>
        </div>
        <div className="w-full max-w-2xl bg-gray-200 rounded-3xl shadow-2xl p-6 border border-gray-200">
          <div className="flex gap-4 items-center pb-8">
            <div className="h-[70px] w-[70px] rounded-full bg-[#06044B] flex justify-center items-center">
              <FiFileText className="text-white" size={30} />
            </div>
            <div className="text-black">
              <h3 className="lg:text-[24px] text-[20px] font-bold">Upload Your Documents</h3>
              <p className="text-gray-500">Select the file you want to print</p>
            </div>
          </div>
          <div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center">
            <p className="text-gray-700 font-medium mb-6 text-base">
              Drag & Drop your file here
            </p>

            <div className="flex items-center justify-center w-full mb-5">
              <div className="border-t border-gray-300 flex-grow mr-2" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="border-t border-gray-300 flex-grow ml-2" />
            </div>

            <div className="relative inline-block" ref={dropdownMenuRef}>
              <button
                className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium relative hover:cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaFileAlt />
                Choose Files
                <div className="h-6 border-l border-white mx-2 self-stretch" />
                <FaChevronDown
                  className={`text-lg transition-transform duration-300 hover:cursor-pointer ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 transition-all duration-500 hover:bg-[#06044B] hover:text-white"
                    onClick={handleFromDeviceClick}
                  >
                    From Device
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 transition-all duration-500 hover:bg-[#06044B] hover:text-white"
                    onClick={handleFromDriveClick}
                  >
                    From Google Drive
                  </button>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange} // ✅ attached here
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
            />

            <div className="h-auto w-full flex justify-center flex-wrap items-center">
              <p className="mt-4 text-xs text-gray-500 px-2">
                Supported formats:
                .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
                <br />
                Max file size: 50MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
