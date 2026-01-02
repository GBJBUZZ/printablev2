"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import converterConfig from "@/app/(conversion)/config";
import axios from "axios";
import { GoArrowBoth } from "react-icons/go";
import Image from "next/image";
import { CiShare2 } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { PiPrinterBold } from "react-icons/pi";
import { MdOutlineFileDownload } from "react-icons/md";
import DownloadDropdown from "@/components/DropdownDownload";
import Dropdown from "@/components/DropDownfilemanagers";
import {GoArrowRight} from "react-icons/go";
export default function Converter() {
//     const { source, target } = useParams<{ source: string; target: string }>();
//     const [isFileUploaded, setIsFileUploaded] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [mediaFileName, setMediaFileName] = useState("");
//     const [mediaFileBlob, setMediaFileBlob] = useState<Blob | null>(null);
//     const [mediaDownloadLink, setMediaDownloadLink] = useState("");
//     const [fileName, setFileName] = useState<string | null>(null);
//     const [progress, setProgress] = useState(0);
//     const [extension, setExtension] = useState<string | null>(null);
//     const [isOpen2, setIsOpen2] = useState(false);
//     const toggleDropdown2 = () => setIsOpen2(!isOpen2);
//     const [isOpen1, setIsOpen1] = useState(false);
//     const toggleDropdown1 = () => setIsOpen1(!isOpen1);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const dropdownRef = useRef<HTMLDivElement | null>(null);
//     const router = useRouter();
//     const [conversion,setConversion]=useState(false);
//     const [conversionProgress,setConversionProgress]=useState(0);
//  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

//     const key = `${source}-${target}`;
//     const config = converterConfig[key] || {
//         heading: "Unknown Converter",
//         supportedFormats: "",
//         description: "Unsupported conversion type.",
//         allowedExtensions: "",
//         outputExtension: "",
//     };

//     const handleFromDeviceClick = () => {
//         fileInputRef.current?.click();
//         setDropdownOpen(false);
//     };

//     const handleFromDriveClick = () => {
//         alert("Google Drive integration goes here");
//         setDropdownOpen(false);
//     };

//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) {
//             return;
//         }
//          setIsFileUploaded(true);
//          setIsLoading(true)
//          if(conversion){
//         const formData = new FormData();
//         formData.append("fileInput", file);
//         formData.append("outputFormat", config.outputExtension); // or any user-selected format

//         const endpoint = `/api/${source}/to/${target}`;

//         try {
//             const response = await axios.post(endpoint, formData, {
//                 responseType: "blob",
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             const contentDisposition = response.headers["content-disposition"];
//             let filename = "downloaded-file";

//             if (contentDisposition) {
//                 const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
//                 if (match && match[1]) {
//                     filename = decodeURIComponent(match[1]);
//                 }
//             }

//             setMediaFileName(filename);
//             setMediaFileBlob(new Blob([response.data]));
//         } catch (err) {
//             console.error("Failed to convert:", err);
//             alert("Failed to convert");
//         } 
//         finally{
//             setConversion(false);
//         }
//     }
//     };

//     const handleMediaDownload = () => {
//         if (!mediaFileBlob) return;

//         const url = window.URL.createObjectURL(mediaFileBlob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = mediaFileName;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         if (!isLoading) return;

//         setProgress(0);
//         progressIntervalRef.current = setInterval(() => {
//             setProgress((prev) => {
//                 if (prev >= 100) {
//                     clearInterval(progressIntervalRef.current!);
//                     return prev;
//                 }
//                 return prev + 5;
//             });
//         }, 200);

//         return () => {
//             if (progressIntervalRef.current) {
//                 clearInterval(progressIntervalRef.current);
//                 progressIntervalRef.current = null;
//             }
//         };
//     }, [isLoading]);
// useEffect(() => {
//     if (progress >= 100) {
//         setConversion(true);
//         setIsLoading(false); // Optional: stop showing loading UI
//     }
// }, [progress]);
// useEffect(() => {
//     if (!conversion) return;

//     const interval = setInterval(() => {
//       setConversionProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 200);

//     return () => clearInterval(interval);
// }, [conversion]);
const { source, target } = useParams<{ source: string; target: string }>();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFileName, setMediaFileName] = useState("");
  const [mediaFileBlob, setMediaFileBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [extension, setExtension] = useState<string | null>(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [conversion, setConversion] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const key = `${source}-${target}`;
  const config = converterConfig[key] || {
    heading: "Unknown Converter",
    supportedFormats: "",
    description: "Unsupported conversion type.",
    allowedExtensions: "",
    outputExtension: "",
  };

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click();
    setDropdownOpen(false);
  };

  const handleFromDriveClick = () => {
    alert("Google Drive integration goes here");
    setDropdownOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsFileUploaded(true);
    setFileName(file.name);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fileInput", file);
    formData.append("outputFormat", config.outputExtension);
    (window as any).conversionFormData = formData;
  };

  useEffect(() => {
    if (!isLoading) return;

    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current!);
          setConversion(true);
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => {
      clearInterval(progressIntervalRef.current!);
      progressIntervalRef.current = null;
    };
  }, [isLoading]);

  useEffect(() => {
    if (!conversion) return;

    let apiCalled = false;
    const interval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        if (!apiCalled && prev >= 20) {
          apiCalled = true;
          (async () => {
            try {
              const response = await axios.post(
                `/api/${source}/to/${target}`,
                (window as any).conversionFormData,
                {
                  responseType: "blob",
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );

              const contentDisposition = response.headers["content-disposition"];
              let filename = "converted-file";

              if (contentDisposition) {
                const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
                if (match && match[1]) {
                  filename = decodeURIComponent(match[1]);
                }
              }

              setMediaFileName(filename);
              setMediaFileBlob(new Blob([response.data]));
            } catch (error) {
              console.error("Conversion failed", error);
              alert("failed to convertion");
              setConversion(false);
              setIsFileUploaded(false);
            }
          })();
        }

        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [conversion]);

  const handleMediaDownload = () => {
    if (!mediaFileBlob) return;

    const url = window.URL.createObjectURL(mediaFileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mediaFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };


    if (!isFileUploaded) {
        return (
            <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-4 font-[Poppins]">
                {/* Title below the navbar */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#06044B] mb-6 mt-4">{config.heading}</h1>

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
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
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
                                        className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
                                        onClick={handleFromDeviceClick}>
                                        From Device
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#06044B] hover:text-white transition-all duration-500"
                                        onClick={handleFromDriveClick}>
                                        From Google Drive
                                    </button>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept={config.allowedExtensions}
                            onChange={handleFileChange}
                        />

                        <p className="mt-4 text-xs text-gray-500">
                            Supported formats: {config.supportedFormats}
                            <br />
                            Max file size: 50MB
                        </p>
                    </div>
                </div>

                {/* Info paragraph with left alignment */}
                <p className="mt-6 text-left max-w-2xl text-gray-600 text-sm md:text-base">{config.description}</p>
            </div>
        );
    } else if (isFileUploaded && isLoading) {
        return (
            <>
                <h1 className="flex items-center justify-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]">
                    <span className="uppercase">{source}</span>
                    <GoArrowBoth />
                    <span className="uppercase">{target}</span>
                </h1>
                <main className="min-h-screen flex flex-col items-center justify-center bg-[#E6E6ED] p-4">
                    <div className="text-center flex flex-col items-center justify-center">
                         {source === "pdf" && <Image alt="image" src="/pdfformat.png" width={229} height={275} />}
                        {source === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
                        {source === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
                        {source === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
                        {source === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
                        {fileName && <p className="text-[#555555] text-[14px] mb-2">{fileName}</p>}
                        <div className="text-[24px]">Uploading ...</div>
                        <div className="w-[450px] h-[15px] bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
                                style={{ width: `${progress}%` }}></div>
                        </div>

                        <div className="text-sm text-gray-600 mt-2">{progress}%</div>
                    </div>
                </main>
            </>
        );
    } else if(conversion) {
         return (
            <>
            <h1 className='flex items-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px] uppercase'>{source} <GoArrowBoth/><span className='uppercase'>{target}</span></h1>
             <main className="min-h-screen flex flex-col items-center justify-center bg-[#E6E6ED] p-4">
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className='flex items-center gap-4 mb-2'>
                        {source === "pdf" && <Image alt="image" src="/pdfformat.png" width={229} height={275} />}
                        {source === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
                        {source === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
                        {source === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
                        {source === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
                    <div className='bg-[#2B3F6C] rounded-full p-4'><GoArrowRight className='text-white text-[14px]'/></div>
                        {target === "pdf" && <Image alt="image" src="/pdfformat.png" width={229} height={275} />}
                        {target === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
                        {target === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
                        {target === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
                        {target === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
                    </div>
                    {fileName && <p className="text-[#555555] text-[14px] mb-2">{fileName}</p>}
                    <div className="text-[24px] mb-2">converting to <span className='uppercase'>{target}</span></div>
                    <div className="w-[450px] h-[15px] bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
                        style={{ width: `${conversionProgress}%` }}
                      ></div>
                    </div>
            
                    <div className="text-sm text-gray-600 mt-2">{conversionProgress}%</div>
                  </div>
                </main>
                </>
          )
    }
    else if(mediaFileBlob){
         return (
            <>
                <h1 className="flex items-center justify-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]">
                    <span className="uppercase">{source}</span>
                    <GoArrowBoth />
                    <span className="uppercase">{target}</span>
                </h1>
                <div className="flex flex-row bg-[#E6E6ED]">
                    <div className="flex flex-col items-center w-full mt-[130px] ">
                        {target === "word" && <Image alt="image" src="/Worddoc.png" width={229} height={275} />}
                        {target === "ppt" && <Image alt="image" src="/pptformat.png" width={229} height={275} />}
                        {target === "excel" && <Image alt="image" src="/xmlformat.png" width={229} height={275} />}
                        {target === "image" && <Image alt="image" src="/jpgformat.png" width={229} height={275} />}
                        <p className="text-[14px]">{fileName}</p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 w-[480px] h-[930px] bg-[#DFFBE7] pt-24">
                        <p className="">
                            <span className="font-bold border-b-2 border-dashed">{fileName}</span>
                        </p>
                        <div className="flex mt-4">
                            <button
                                onClick={handleMediaDownload}
                                className="cursor-pointer flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white  rounded-l-lg text-[14px] w-[287px] h-[45px]">
                                <MdOutlineFileDownload />
                                Download
                            </button>
                            <button
                                className="w-[50px] h-[45px] bg-[#06044B] text-white rounded-r-lg flex justify-center items-center "
                                onClick={toggleDropdown1}>
                                <SlArrowDown className="hover:rotate-180"></SlArrowDown>
                            </button>
                        </div>
                        <p className="text-center">or</p>
                        <button className="flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white  rounded-lg text-[14px] w-[338px] h-[45px]">
                            <PiPrinterBold />
                            Print
                        </button>
                        <div>
                            <button
                                className="group flex gap-2 items-center justify-center hover:bg-[#06044B] hover:text-white border-2 border-[#06044B]  rounded-lg text-[14px] w-[338px] h-[45px]"
                                onClick={toggleDropdown2}>
                                <MdOutlineFileUpload />
                                Export
                                <SlArrowDown />
                            </button>
                        </div>
                        <div className="flex gap-2 w-[338px]">
                            <button className="border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B]  flex justify-center items-center text-[#06044B] hover:text-white">
                                <CiShare2 className=""></CiShare2>
                            </button>
                            <button className="border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B] text-[#06044B] hover:text-white flex justify-center items-center">
                                <RiDeleteBin5Line className=""></RiDeleteBin5Line>
                            </button>
                        </div>
                        {isOpen1 && <DownloadDropdown />}
                        {isOpen2 && <Dropdown />}
                    </div>
                </div>
            </>
        );
    }
}
