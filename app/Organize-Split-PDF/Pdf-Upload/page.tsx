'use client'

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";
import { FiFileText } from "react-icons/fi";
import ChooseDropdown from "@/components/DropdownChooseFiles";

const Genarate_quest = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Debugging line to check the selectedFile prop
  console.log('Selected File:', selectedFile);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        console.log("File dropped:", file); // Debugging line
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        console.log("File selected:", file); // Debugging line
      } else {
        alert("Only PDF files are supported.");
      }
      // Reset the input value so the same file can be re-selected
      e.target.value = "";
    }
  };

// Component A - Update the useEffect
useEffect(() => {
  if (selectedFile) {
    // Store file in localStorage before navigation
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('selectedPDF', reader.result as string);
      localStorage.setItem('pdfFileName', selectedFile.name);
      router.push(`/Organize-Split-PDF/pdf-file-uploading`);
    };
    reader.readAsDataURL(selectedFile);
  }
}, [selectedFile]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-[42px] font-bold mb-4">Split PDF</h1>
      <div className="bg-white rounded-[40px] border-[1.5px] border-[#D0D0D0] font-dm px-[15px] py-[30px]">
        <div className="border-[2px] border-dashed border-[#06044B] rounded-[13px] w-[872px]  h-[303px] flex flex-col items-center justify-center text-center  bg-[#F3F3F3]">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
          >
            {selectedFile ? (
              <p className="text-gray-700">{selectedFile.name}</p>
            ) : (
              <p className="font-bold text-[20px] p-[26px]">
                Drag & drop your files here
              </p>
            )}
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>

          <div className="mt-4">
            <div className="flex gap-2 items-center ml-20">
              <div className="w-32 h-[0.5px] bg-[#0000004D]"></div>
              <p>or</p>
              <div className="w-32 h-[0.5px] bg-[#0000004D]"></div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClick}
                className="flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white rounded-l-lg text-[14px] w-[152px] h-[45px] transition-all duration-200 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <FiFileText />
                CHOOSE FILES
              </button>

              <button
                className="w-[50px] h-[45px] bg-[#06044B] text-white rounded-r-lg flex justify-center items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <SlArrowDown className="hover:rotate-180" />
              </button>
            </div>
            <p className="text-[#555555] text-[14px] text-center mt-[26px]">
              Supported formats: .pdf
              <br />
              Max file size: 50MB
            </p>
          </div>
        </div>
      </div>

      <p className="text-[18px] w-[872px] ">
        Need to split a large PDF into smaller files? Our online PDF Splitter lets you extract, split, and
        save pages as separate documents in seconds. Free to try, no downloads.
      </p>

      {isOpen && <ChooseDropdown />}


    </div>
  );
};

export default Genarate_quest;
