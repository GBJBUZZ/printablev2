import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import React from "react";

type UplodeBoxProps = {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownMenuRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFromDeviceClick: () => void;
  handleFromDriveClick: () => void;
};

export default function UplodeBox({
  dropdownOpen,
  setDropdownOpen,
  dropdownMenuRef,
  fileInputRef,
  handleFromDeviceClick,
  handleFromDriveClick,
}: UplodeBoxProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="rounded-2xl w-full bg-gradient-to-b from-[#DFFBE7] to-[#CDCDDB] min-h-[300px] flex items-center justify-center relative px-4">
        <img
          src="/Left.png"
          alt="Left"
          className="absolute left-0 bottom-0 w-[20%] h-auto object-contain"
        />

        <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 translate-y-20 border border-gray-200">
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
                className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaFileAlt />
                Choose Files
                <div className="h-6 border-l border-white mx-2 self-stretch" />
                <FaChevronDown
                  className={`text-lg transition-transform duration-300 ${
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
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
            />

            <p className="mt-4 text-xs text-gray-500">
              Supported formats:
              .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
              <br />
              Max file size: 50MB
            </p>
          </div>
        </div>

        <img
          src="/Right.png"
          alt="Right"
          className="absolute right-0 bottom-0 w-[20%] h-auto object-contain"
        />
      </div>
    </div>
  );
}
