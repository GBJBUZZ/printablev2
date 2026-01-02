"use client";
import { Download, Printer, Trash2, Share } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';
import { FiUpload } from "react-icons/fi";
export default function PDFViewer() {
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [hoveredDownloadItem, setHoveredDownloadItem] = useState<string | null>(null);
  const [hoveredExportItem, setHoveredExportItem] = useState<string | null>(null);

  const toggleDownloadDropdown = () => {
    setIsDownloadDropdownOpen(!isDownloadDropdownOpen);
    setIsExportDropdownOpen(false);
  };

  const toggleExportDropdown = () => {
    setIsExportDropdownOpen(!isExportDropdownOpen);
    setIsDownloadDropdownOpen(false);
  };

  const downloadItems = [
    'Compress (.pdf)',
    'Word (.docx)',
    'Excel (.xlsx)',
    'Power Point (.pptx)',
    'Image (.jpg)'
  ];

  const exportItems = [
    'PDF (.pdf)',
    'Word (.docx)',
    'Excel (.xlsx)',
    'PowerPoint (.pptx)',
    'Image (.png)'
  ];

  return (
    <>
       <h1 className='font-bold text-black text-lg bg-[#FFFFFF] shadow-sm border-b border-gray-300'>Split PDF</h1>
    <div className="flex h-screen w-full  bg-[#e6e6ee]">
       
      
    
      {/* Main content area */}
     <div className="flex-1  p-6 m-12 mt-24">
        

        {/* File Box 1 */}
        <div className="bg-white p-4 rounded-xl shadow mb-4 flex items-center h-[120px]">
          <Image
            src="/1c0c74195b8f0456799db0c7fff2b50e40390120.png"
            alt="Page 1"
            width={80}
            height={0} 
            className="rounded shadow-sm border  border-black h-[100px]"
          />
          <div className="ml-4 flex-1  ">
            <p className="font-medium border-b-2 border-dashed border-gray-500 w-[270px]">personal-letter-template-page-1.pdf</p>
            <p className="text-green-500 text-sm my-1">Done</p>
          </div>
         <div className="flex space-x-2">
  <button className="p-2 rounded group hover:bg-[#06044B]">
    <Download className="w-5 h-5 text-black group-hover:text-white" />
  </button>
  <button className="p-2 rounded group hover:bg-[#06044B]">
    <Printer className="w-5 h-5 text-black group-hover:text-white" />
  </button>
</div>

        </div>

        {/* File Box 2 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center h-[120px]">
          <Image
            src="/25fffcd4a257bc280b12a8371b20e0f11de61fc6.png"
            alt="Page 2"
            width={80}
            height={0}
            className="rounded shadow-sm border  border-black h-[100px]"
          />
          <div className="ml-4 flex-1 ">
            <p className="font-medium border-b-2 border-dashed border-gray-500 w-[270px]">personal-letter-template-page-2.pdf</p>
            <p className="text-green-500 text-sm my-1">Done</p>
          </div>
          <div className="flex space-x-2">
  <button className="p-2 rounded group hover:bg-[#06044B]">
    <Download className="w-5 h-5 text-black group-hover:text-white" />
  </button>
  <button className="p-2 rounded group hover:bg-[#06044B]">
    <Printer className="w-5 h-5 text-black group-hover:text-white" />
  </button>
</div>

        </div>
      </div>

      {/* Sidebar */}
      <div className="w-72 bg-green-100 p-4 flex flex-col">
        {/* File name header */}
        <div className="mb-6">
          <h3 className="text-[16px] font-semibold border-b-2 border-dashed border-gray-500">
            Personal-letter-template.pdf
          </h3>
        </div>

        {/* Download button with dropdown */}
        <div className="relative mb-4">
          <button
            className="w-full bg-[#06044B] text-white rounded-md py-3 px-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
            onClick={toggleDownloadDropdown}
          >
            <div className="flex items-center ml-12">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span >DOWNLOAD</span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${isDownloadDropdownOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {/* Download Dropdown menu */}
          {isDownloadDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 overflow-hidden">
              <ul>
                {downloadItems.map((item) => (
                  <li
                    key={item}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${hoveredDownloadItem === item ? 'bg-[#06044B] text-white' : 'text-gray-700'}`}
                    onMouseEnter={() => setHoveredDownloadItem(item)}
                    onMouseLeave={() => setHoveredDownloadItem(null)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* "or" text */}
        <div className="text-center text-gray-600 text-sm mb-4">or</div>

        {/* Print button */}
        <button className="w-full bg-[#06044B] text-white rounded-md py-3 px-4 flex items-center justify-center hover:bg-gray-800 transition-colors mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>Print</span>
        </button>

        {/* Export As button with dropdown */}
        <div className="relative mb-4">
  <button
    className="w-full border border-gray-800 rounded-md py-2 px-4 flex items-center justify-between hover:bg-[#06044B] hover:text-white transition-colors"
    onClick={toggleExportDropdown}
  >
    {/* Upload icon + Label aligned together */}
    <div className="flex items-center gap-3 ml-16">
      <FiUpload className="transition-transform duration-200" />
      <span>Export As</span>
    </div>

    {/* Dropdown arrow */}
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 mr-10 ${isExportDropdownOpen ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>

  {/* Export Dropdown menu */}
  {isExportDropdownOpen && (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 overflow-hidden">
      <ul>
        {exportItems.map((item) => (
          <li
            key={item}
            className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
              hoveredExportItem === item ? 'bg-[#06044B] text-white' : 'text-gray-700'
            }`}
            onMouseEnter={() => setHoveredExportItem(item)}
            onMouseLeave={() => setHoveredExportItem(null)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>


        {/* Action buttons */}
        <div className="flex gap-2 mb-24">
          <button className="flex-1 border border-gray-800 rounded-md py-2 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
          <button className="flex-1 border border-gray-800 rounded-md py-2 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}