"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";
import { FiFileText } from "react-icons/fi";
import ChooseDropdown from "@/components/DropdownChooseFiles";
const Convertion = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fileName,setFileName]=useState<string>('');
  const toggleDropdown = () => setIsOpen(!isOpen);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  useEffect(() => {
    const file = sessionStorage.getItem('fileName');
  setFileName(`${file}`);
  }, []);
  useEffect(() => {
    if (selectedFile) {
      sessionStorage.setItem("selectedFileName", selectedFile.name);
      sessionStorage.setItem("extenName", fileName);
      router.push("/from-pdf-conversion/loading"); 
    }
  }, [selectedFile, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <><h1 className="font-bold text-black text-lg bg-[#FFFFFF] shadow-sm border-b border-gray-300">
        Marge PDF
      </h1>
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-[42px] font-bold mb-4">PDF to <span className="uppercase">{fileName}</span> Converter</h1>
      <div className="bg-white rounded-[40px] border-[1.5px] border-[#D0D0D0] font-dm px-[15px] py-[30px]">
        <div className="border-[2px] border-dashed border-[#06044B] rounded-[13px] w-[872px]  h-[303px] flex flex-col items-center justify-center text-center  bg-[#F3F3F3] cursor-pointer">
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

          <div className="">
            <div className="flex gap-2 items-center ml-20">
              <div className="w-32 h-[0.5px] bg-gray-700"></div>
              <p>or</p>
              <div className="w-32 h-[0.5px] bg-gray-700"></div>
            </div>
           <div className="flex justify-center mt-4">
      {/* CHOOSE FILES button with routing */}
      <button
        onClick={() => router.push('/Pdf-file-uploading')} // 👈 Route to upload page
        className="flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white rounded-l-lg text-[14px] w-[152px] h-[45px]"
      >
        <FiFileText />
        CHOOSE FILES
      </button>

      {/* Arrow button with dropdown logic */}
      <button
        className="w-[50px] h-[45px] bg-[#06044B] text-white rounded-r-lg flex justify-center items-center"
        onClick={toggleDropdown}
      >
        <SlArrowDown className="hover:rotate-180" />
      </button>
    </div>
            <p className="text-[#555555] text-[14px] text-center mt-[26px]">
              Supported
              formats:.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
              <br/>
              Max file size:50MB
            </p>
          </div>
        </div>
      </div>

      <p className="text-[18px] w-[872px] ">
        Effortlessly convert your PDFs into fully editable Excel spreadsheets
        online—completely free of charge. Extract data seamlessly for easy
        editing, with no sign-ups or downloads required.
      </p>
      {isOpen && <ChooseDropdown />}
    </div>
    </>
  );
};

export default Convertion;
