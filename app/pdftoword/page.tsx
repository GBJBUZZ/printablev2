'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaFileAlt } from 'react-icons/fa';

export default function PdfToWord() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert('Google Drive integration goes here');
    setDropdownOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = encodeURIComponent(file.name);
      const fileSize = encodeURIComponent((file.size / (1024 * 1024)).toFixed(1));
      router.push(`/upload?name=${fileName}&size=${fileSize} MB`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-4 font-[Poppins]">
      {/* Title below the navbar */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#06044B] mb-6 mt-4">
        PDF to Word Converter
      </h1>

      {/* Upload box */}
      <div className="relative z-20 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
        <div className="bg-[#F3F3F3] border-[3px] border-dashed border-[#06044B] rounded-2xl p-10 text-center">
          <p className="text-gray-700 font-medium mb-6 text-base">Drag & Drop your file here</p>

          <div className="flex items-center justify-center w-full mb-5">
            <div className="border-t border-gray-300 flex-grow mr-2" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="border-t border-gray-300 flex-grow ml-2" />
          </div>

          <div className="relative inline-block" ref={dropdownRef}>
            <button
              className="bg-[#06044B] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaFileAlt />
              Choose Files
              <div className="h-6 border-l border-white mx-2 self-stretch" />
              <FaChevronDown
                className={`text-lg transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
                  onClick={handleFromDeviceClick}
                >
                  From Device
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
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
            accept=".pdf"
            onChange={handleFileChange}
          />

          <p className="mt-4 text-xs text-gray-500">
          Supported formats: .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt<br />
            Max file size: 50MB
          </p>
        </div>
      </div>

      {/* Info paragraph with left alignment */}
      <p className="mt-6 text-left max-w-2xl text-gray-600 text-sm md:text-base">
      Effortlessly convert your PDFs into fully editable Excel spreadsheets online—completely free of charge.
        <br />
        <span className="block mt-1">
        Extract data seamlessly for easy editing, with no sign-ups or downloads required.
        </span>
      </p>
    </div>
  );
}