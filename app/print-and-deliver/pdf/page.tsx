"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFilePdf, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  thumbnail: string | null;
  pages?: number;
  file: File;
}

export default function PrintOptionsPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());
  const [isToggled, setIsToggled] = useState(false);
  const [copies, setCopies] = useState<number>(1);
  const [printColor, setPrintColor] = useState<"bw" | "color" | null>(null);
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | null>(
    null
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cleanup thumbnails to prevent memory leaks
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.thumbnail && file.thumbnail.startsWith("blob:")) {
          URL.revokeObjectURL(file.thumbnail);
        }
      });
    };
  }, [files]);

  const handleAddFiles = () => {
    inputRef.current?.click();
  };

  const toggleSelect = (id: string) => {
    setSelectedFileIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isSelected = (id: string) => selectedFileIds.has(id);

  const handleFilesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(selectedFiles)) {
      const size = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      const id = uuidv4();

      if (file.type === "application/pdf") {
        const { thumbnail, pages } = await generatePdfThumbnail(file);
        newFiles.push({ id, name: file.name, size, thumbnail, file, pages });
      } else if (file.type.startsWith("image/")) {
        const thumbnail = URL.createObjectURL(file);
        newFiles.push({ id, name: file.name, size, thumbnail, file });
      }

      // Upload each file to backend
      await handleUploadToBackend(file);
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUploadToBackend = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      // Handle result as needed
    } catch (error) {
      console.error("Error uploading to backend:", error);
    }
  };

  const generatePdfThumbnail = async (
    file: File
  ): Promise<{ thumbnail: string | null; pages: number }> => {
    if (typeof window === "undefined") return { thumbnail: null, pages: 0 };

    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return { thumbnail: null, pages: pdf.numPages };

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      return {
        thumbnail: canvas.toDataURL("image/png"),
        pages: pdf.numPages,
      };
    } catch (err) {
      console.error("PDF render error:", err);
      return { thumbnail: null, pages: 0 };
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove?.thumbnail?.startsWith("blob:")) {
        URL.revokeObjectURL(fileToRemove.thumbnail);
      }
      return prev.filter((file) => file.id !== id);
    });
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleBWClick = () => {
    setPrintColor("bw");
  };

  const handleColorClick = () => {
    setPrintColor("color");
  };

  const handleLandscapeClick = () => {
    setOrientation("landscape");
  };

  const handlePortraitClick = () => {
    setOrientation("portrait");
  };

  const handleAdvancedToggle = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form data to backend or process it
    // Example: Send copies, printColor, orientation, and selected files to backend
  };

  

  const totalPages = files.reduce((sum, file) => sum + (file.pages || 0), 0);
  

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-6 py-10 sm:px-16 ">
      <div className="max-w-6xl mx-aut ml-[250px]">
        <h1 className="text-2xl font-semibold text-black mb-6">Print Options</h1>

      <div className="max-w-4xl flex flex-wrap gap-6">
        {files.map((file) => (
          <div key={file.id} className="flex flex-col">
            <div
              onClick={() => toggleSelect(file.id)}
              className={`relative w-48 h-65 cursor-pointer select-none transition-all duration-200 rounded-xl px-2.5 py-2.5 border border-gray-300 overflow-hidden ${
                isSelected(file.id) ? "bg-[#B2B1C7] outline-[1px] outline-black" : "bg-white"
              }`}
              role="button"
              aria-label={`Select file ${file.name}`}
            >
              {file.thumbnail ? (
                <Image
                  src={file.thumbnail}
                  alt={file.name}
                  width={192}
                  height={288}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <FaFilePdf size={48} className="text-red-600" />
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.id);
                }}
                className="absolute top-0 right-0 w-6 h-7 flex items-center justify-center rounded-tr-xl  rounded-bl-lg bg-white text-black cursor-pointer select-none shadow-[0_0_3px_#000000]"
                aria-label={`Remove file ${file.name}`}
              >
                <IoClose size={20} />
              </button>
            </div>

            <p className="mt-2 text-sm font-semibold text-black truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 self-start mt-1 ml-1">
              {file.size}{" "}
              {file.pages ? (
                <span className="text-gray-400">
                  ({file.pages} page{file.pages > 1 ? "s" : ""})
                </span>
              ) : null}
            </p>
          </div>
        ))}

        {/* Add Files Card */}
        <div
          onClick={handleAddFiles}
          className="w-48 h-65 bg-[#DFFBE7] border-dashed border-2 border-[#93e6c1] flex flex-col items-center justify-center rounded-2xl cursor-pointer hover:bg-[#c9f2da] transition"
          role="button"
          aria-label="Add files"
        >
          <FaPlus className="text-xl text-[#008000]" />
          <span className="mt-2 text-sm font-medium text-[#008000]">
            Add Files
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFilesChange}
            ref={inputRef}
            className="hidden"
            aria-label="Upload files"
          />
        </div>
      </div>
      </div>

      <div className="bg-[#f5f8fa] min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 rounded-t-2xl">
            <div>
              <h2 className="font-semibold text-lg leading-6 text-black">
                Print Options
              </h2>
              <p className="text-xs text-gray-700 mt-1 font-normal">
                Customize your print job settings
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="toggle"
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
                className="appearance-none w-11 h-6 bg-[#94a3b8] rounded-full relative cursor-pointer outline-none transition-colors duration-300 ease-in checked:bg-[#0f172a] before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform before:duration-300 before:ease-in checked:before:translate-x-5 before:shadow-[0_0_2px_rgba(0,0,0,0.2)]"
                aria-label="Apply same setting to all files"
              />
              <label
                className="text-sm font-semibold text-black select-none"
                htmlFor="toggle"
              >
                Apply same setting to all files
              </label>
            </div>
          </div>
          <form
            className="bg-[#f1f6fa] px-6 py-6 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-black font-semibold text-base leading-5">
                  Enter number of copies
                </h2>
                <input
                  id="copies"
                  type="number"
                  min="1"
                  max="25"
                  placeholder="ex. 10"
                  value={copies}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="bg-[#E6F9E9] text-[#4B4B4B] rounded-lg px-8 py-3 text-center text-base font-normal leading-6 border border-[#D1E7D6] focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  aria-label="Number of copies"
                />
              </div>
              <hr className="border-t border-gray-300 mt-3" />
            </div>
            <div className="mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black font-semibold text-base leading-5">
                  Choose print color
                </h2>
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="Black and White"
                      aria-pressed={printColor === "bw"}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border ${
                        printColor === "bw"
                          ? "border-green-500 bg-[#E6F9E9]"
                          : "border-gray-300 bg-gray-100"
                      } shadow-sm hover:bg-[#E6F9E9]`}
                      onClick={handleBWClick}
                    >
                      <div className="relative w-10 h-10">
                        <svg
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M39.1705 27.8764L39.1367 38.9095C39.1324 40.2902 38.0097 41.4061 36.6291 41.4019L11.1839 41.3239C6.75653 41.3104 3.17835 37.7101 3.19186 33.2828C3.20542 28.8554 6.8056 25.2772 11.233 25.2908L36.6782 25.3687C38.0589 25.373 39.1747 26.4957 39.1705 27.8764Z"
                            fill="white"
                            stroke="black"
                          />
                          <path
                            d="M38.6302 16.7533L42.4715 27.2243C42.947 28.5205 42.2817 29.9568 40.9855 30.4323L13.8148 40.4C9.62713 41.9361 4.98708 39.7862 3.45084 35.5986C1.91492 31.4111 4.06404 26.7713 8.2514 25.235L35.4222 15.2673C36.7184 14.7918 38.1547 15.4571 38.6302 16.7533Z"
                            fill="white"
                            stroke="black"
                          />
                          <path
                            d="M7.40426 3.13443C7.68474 1.50149 9.23587 0.405108 10.8688 0.685587L21.8611 2.57366C23.4941 2.85414 24.5905 4.40527 24.31 6.03822L19.398 34.6358C18.5961 39.3042 14.1616 42.4386 9.49322 41.6367V41.6367C4.82483 40.8349 1.69039 36.4004 2.49225 31.732L7.40426 3.13443Z"
                            fill="black"
                          />
                          <circle cx="10.6641" cy="32.7646" r="3" fill="white" />
                        </svg>
                      </div>
                    </button>
                    <span className="mt-1 text-xs text-gray-700 font-sans">
                      B&W
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="Color"
                      aria-pressed={printColor === "color"}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border ${
                        printColor === "color"
                          ? "border-green-500 bg-[#E6F9E9]"
                          : "border-gray-300 bg-white"
                      } shadow-sm hover:bg-[#E6F9E9]`}
                      onClick={handleColorClick}
                    >
                      <div className="relative w-10 h-10">
                        <svg
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M36.6797 24.8687C38.3365 24.8738 39.6756 26.2211 39.6705 27.8779L39.6367 38.9109C39.6316 40.5677 38.2844 41.9067 36.6275 41.9017L11.182 41.8237C6.4785 41.8093 2.67724 37.9847 2.69165 33.2812V33.2812C2.70605 28.5777 6.53069 24.7764 11.2342 24.7908L36.6797 24.8687Z"
                            fill="#CCC514"
                          />
                          <path
                            d="M35.2499 14.7979C36.8054 14.2272 38.529 15.0256 39.0996 16.5811L42.9409 27.052C43.5116 28.6075 42.7132 30.3311 41.1577 30.9017L13.9873 40.8693C9.5403 42.5007 4.61283 40.2182 2.98145 35.7713V35.7713C1.35007 31.3243 3.63254 26.3969 8.07949 24.7655L35.2499 14.7979Z"
                            fill="#3822B8"
                          />
                          <path
                            d="M7.40426 3.13443C7.68474 1.50149 9.23587 0.405108 10.8688 0.685587L21.8611 2.57366C23.4941 2.85414 24.5905 4.40527 24.31 6.03822L19.398 34.6358C18.5961 39.3042 14.1616 42.4386 9.49322 41.6367V41.6367C4.82483 40.8349 1.69039 36.4004 2.49225 31.732L7.40426 3.13443Z"
                            fill="#C53232"
                          />
                          <circle cx="10.6641" cy="32.7646" r="3" fill="black" />
                        </svg>
                      </div>
                    </button>
                    <span className="mt-1 text-xs text-gray-700 font-sans">
                      Color
                    </span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
            <div className="mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-black font-semibold text-base leading-5">
                  Choose print orientation
                </h2>
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="Landscape"
                      aria-pressed={orientation === "landscape"}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border ${
                        orientation === "landscape"
                          ? "border-green-500 bg-[#E6F9E9]"
                          : "border-gray-300 bg-gray-100"
                      } shadow-sm hover:bg-[#E6F9E9]`}
                      onClick={handleLandscapeClick}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg
                          width="41"
                          height="26"
                          viewBox="0 0 41 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1.75"
                            y="1.75"
                            width="37.5"
                            height="22.5"
                            rx="3.75"
                            stroke="black"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>
                    </button>
                    <span className="mt-1 text-xs text-gray-700 font-sans">
                      Landscape
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="Portrait"
                      aria-pressed={orientation === "portrait"}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border ${
                        orientation === "portrait"
                          ? "border-green-500 bg-[#E6F9E9]"
                          : "border-gray-300 bg-white"
                      } shadow-sm hover:bg-[#E6F9E9]`}
                      onClick={handlePortraitClick}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg
                          width="26"
                          height="40"
                          viewBox="0 0 26 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="24.25"
                            y="1.25"
                            width="37.5"
                            height="22.5"
                            rx="3.75"
                            transform="rotate(90 24.25 1.25)"
                            stroke="black"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>
                    </button>
                    <span className="mt-1 text-xs text-gray-700 font-sans">
                      Portrait
                    </span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
            <div className="mx-auto mt-10">
              <button
                type="button"
                className={`w-full flex justify-between items-center bg-[#E6E6ED] border-b border-b-gray-300 py-4 px-6 text-[#1F2937] text-[16px] font-semibold leading-6 hover:bg-[#DDDDE6] transition-all duration-200 ${
                  showAdvanced ? "rounded-t-lg" : "rounded-lg"
                }`}
                aria-expanded={showAdvanced}
                aria-controls="advanced-options-content"
                onClick={handleAdvancedToggle}
              >
                <span>Advanced Print Options</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                  viewBox="0 0 320 512"
                  className={`transition-transform duration-300 ease-in-out ${
                    showAdvanced ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </button>

              <div
                id="advanced-options-content"
                className={`overflow-hidden transition-all duration-2000 ease-in-out ${
                  showAdvanced ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!showAdvanced}
              >
                <div className="bg-[#E6E6ED] w-full py-6 px-6 rounded-b-lg border-t-0">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Pages to Print */}
                    <div className="relative">
                      <label
                        htmlFor="pagesToPrint"
                        className="block font-semibold text-sm mb-1"
                      >
                        Pages to Print
                      </label>
                      <select
                        id="pagesToPrint"
                        className="w-full bg-[#E6F9E9] rounded-lg py-3 px-4 text-sm text-gray-900 appearance-none pr-8"
                        aria-label="Pages to print"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-[38px] text-gray-900">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </div>
                    </div>

                    {/* Pages Per Sheet */}
                    <div className="relative">
                      <label
                        htmlFor="pagesPerSheet"
                        className="block font-semibold text-sm mb-1"
                      >
                        Pages Per Sheet
                      </label>
                      <select
                        id="pagesPerSheet"
                        className="w-full bg-[#E6F9E9] rounded-lg py-3 px-4 text-sm text-gray-900 appearance-none pr-8"
                        aria-label="Pages per sheet"
                      >
                        <option value="odd">Odd pages only</option>
                        <option value="even">Even pages only</option>
                        <option value="all">All pages</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-[38px] text-gray-900">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </div>
                    </div>

                    {/* Paper Size */}
                    <div className="relative">
                      <label
                        htmlFor="paperSize"
                        className="block font-semibold text-sm mb-1"
                      >
                        Paper Size
                      </label>
                      <select
                        id="paperSize"
                        className="w-full bg-[#E6F9E9] rounded-lg py-3 px-4 text-sm text-gray-900 appearance-none pr-8"
                        aria-label="Paper size"
                      >
                        <option value="a4">A4 (8.27” × 11.69”)</option>
                        <option value="letter">Letter (8.5” × 11”)</option>
                        <option value="legal">Legal (8.5” × 14”)</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-[38px] text-gray-900">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </div>
                    </div>

                    {/* Paper Margin */}
                    <div className="relative">
                      <label
                        htmlFor="paperMargin"
                        className="block font-semibold text-sm mb-1"
                      >
                        Paper Margin
                      </label>
                      <select
                        id="paperMargin"
                        className="w-full bg-[#E6F9E9] rounded-lg py-3 px-4 text-sm text-gray-900 appearance-none pr-8"
                        aria-label="Paper margin"
                      >
                        <option value="normal">Normal</option>
                        <option value="narrow">Narrow</option>
                        <option value="wide">Wide</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-[38px] text-gray-900">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="max-w-4xl w-full border border-green-400 rounded-lg bg-green-50 flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <svg
              width="70"
              height="66"
              viewBox="0 0 70 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6247_50110)">
                <path
                  d="M39.8803 0.653712L37.3465 1.31195L6.12992 9.42155L3.59615 10.0798C2.36628 10.4008 1.31303 11.2001 0.667461 12.3024C0.0218944 13.4047 -0.163266 14.72 0.152602 15.9597L11.1396 58.8795C11.4582 60.1184 12.2517 61.1794 13.3459 61.8298C14.4402 62.4801 15.7458 62.6666 16.9764 62.3484L16.9829 62.3467L53.254 52.9241L53.2606 52.9224C54.4904 52.6014 55.5437 51.8021 56.1892 50.6998C56.8348 49.5974 57.02 48.2822 56.7041 47.0425L45.7171 4.12271C45.3985 2.88376 44.605 1.82272 43.5108 1.17238C42.4165 0.522045 41.1109 0.335514 39.8803 0.653712Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M40.2246 1.99869L37.2235 2.77832L6.94142 10.6451L3.94038 11.4248C3.06456 11.6533 2.31451 12.2226 1.85479 13.0075C1.39506 13.7925 1.2632 14.7292 1.48814 15.612L12.4752 58.5318C12.7021 59.414 13.2671 60.1696 14.0463 60.6327C14.8256 61.0959 15.7553 61.2287 16.6316 61.0021L16.6382 61.0004L52.9093 51.5777L52.9159 51.576C53.7917 51.3474 54.5417 50.7782 55.0014 49.9932C55.4611 49.2083 55.593 48.2716 55.3681 47.3888L44.3811 4.46904C44.1542 3.58677 43.5891 2.83118 42.8099 2.36806C42.0307 1.90494 41.1009 1.7721 40.2246 1.99869Z"
                  fill="#F4F7FA"
                />
                <path
                  d="M37.9592 15.8976L19.6105 20.6643C19.4056 20.7175 19.1881 20.6865 19.0058 20.5782C18.8235 20.4699 18.6914 20.293 18.6386 20.0866C18.5857 19.8801 18.6164 19.661 18.724 19.4774C18.8315 19.2937 19.0071 19.1607 19.212 19.1074L37.5607 14.3407C37.7655 14.2877 37.9829 14.3188 38.165 14.4271C38.3472 14.5355 38.4791 14.7122 38.532 14.9186C38.5848 15.1249 38.5541 15.3439 38.4467 15.5275C38.3393 15.7111 38.164 15.8442 37.9592 15.8976Z"
                  fill="#06044B"
                />
                <path
                  d="M41.8185 17.6966L20.2824 23.2913C20.0775 23.3445 19.8599 23.3136 19.6777 23.2053C19.4954 23.0969 19.3633 22.9201 19.3104 22.7136C19.2576 22.5072 19.2883 22.288 19.3959 22.1044C19.5034 21.9208 19.6789 21.7877 19.8839 21.7345L41.42 16.1397C41.6249 16.0865 41.8425 16.1174 42.0247 16.2258C42.207 16.3341 42.3391 16.511 42.392 16.7174C42.4448 16.9239 42.4141 17.143 42.3065 17.3266C42.199 17.5103 42.0235 17.6433 41.8185 17.6966Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M40.9729 27.6712L22.6242 32.4379C22.5227 32.4642 22.4171 32.4702 22.3133 32.4554C22.2096 32.4407 22.1097 32.4055 22.0195 32.3518C21.9292 32.2982 21.8503 32.2272 21.7873 32.1428C21.7243 32.0584 21.6784 31.9624 21.6522 31.8602C21.6261 31.758 21.6201 31.6516 21.6348 31.547C21.6495 31.4425 21.6844 31.3419 21.7377 31.251C21.7909 31.16 21.8614 31.0806 21.9451 31.0171C22.0289 30.9536 22.1242 30.9074 22.2257 30.881L40.5743 26.1143C40.6758 26.088 40.7815 26.082 40.8852 26.0968C40.989 26.1115 41.0888 26.1467 41.1791 26.2004C41.2694 26.254 41.3482 26.3251 41.4112 26.4094C41.4743 26.4938 41.5202 26.5898 41.5463 26.692C41.5725 26.7942 41.5784 26.9007 41.5638 27.0052C41.5491 27.1097 41.5142 27.2103 41.4609 27.3012C41.4077 27.3922 41.3371 27.4716 41.2534 27.5351C41.1697 27.5986 41.0743 27.6448 40.9729 27.6712Z"
                  fill="#06044B"
                />
                <path
                  d="M44.8322 29.47L23.2961 35.0647C23.1946 35.0911 23.089 35.0971 22.9852 35.0823C22.8814 35.0675 22.7816 35.0323 22.6913 34.9787C22.6011 34.9251 22.5222 34.854 22.4592 34.7697C22.3962 34.6853 22.3503 34.5893 22.3241 34.4871C22.2979 34.3848 22.292 34.2784 22.3067 34.1739C22.3213 34.0694 22.3563 33.9688 22.4095 33.8778C22.4628 33.7869 22.5333 33.7075 22.617 33.644C22.7007 33.5805 22.7961 33.5343 22.8976 33.5079L44.4337 27.9132C44.6386 27.8599 44.8561 27.8909 45.0384 27.9992C45.2207 28.1075 45.3528 28.2844 45.4056 28.4908C45.4585 28.6973 45.4278 28.9164 45.3202 29.1001C45.2127 29.2837 45.0371 29.4168 44.8322 29.47Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M43.986 39.4446L25.6374 44.2113C25.4325 44.2644 25.2151 44.2333 25.0329 44.125C24.8507 44.0166 24.7187 43.8398 24.6659 43.6335C24.6131 43.4271 24.6438 43.2081 24.7512 43.0245C24.8586 42.8409 25.034 42.7078 25.2388 42.6545L43.5875 37.8878C43.7924 37.8345 44.01 37.8655 44.1922 37.9738C44.3745 38.0822 44.5066 38.259 44.5595 38.4655C44.6123 38.6719 44.5816 38.891 44.474 39.0747C44.3665 39.2583 44.1909 39.3914 43.986 39.4446Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M47.8465 41.2444L26.3104 46.8392C26.2089 46.8656 26.1032 46.8717 25.9994 46.857C25.8956 46.8423 25.7956 46.8071 25.7053 46.7535C25.615 46.6998 25.536 46.6288 25.473 46.5444C25.4099 46.46 25.364 46.3639 25.3378 46.2617C25.3116 46.1594 25.3057 46.0529 25.3204 45.9483C25.3351 45.8437 25.3701 45.7431 25.4234 45.6521C25.4767 45.5612 25.5473 45.4817 25.6311 45.4183C25.7149 45.3548 25.8104 45.3086 25.9119 45.2823L47.448 39.6876C47.6529 39.6343 47.8705 39.6653 48.0528 39.7736C48.2351 39.882 48.3671 40.0588 48.42 40.2653C48.4728 40.4717 48.4421 40.6909 48.3346 40.8745C48.227 41.0581 48.0515 41.1912 47.8465 41.2444Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M16.4777 25.5521L9.98428 27.239C9.88601 27.2644 9.78176 27.2495 9.69439 27.1975C9.60701 27.1456 9.54365 27.0609 9.51821 26.962L8.02766 21.1392C8.00243 21.0402 8.01722 20.9352 8.06876 20.8472C8.12031 20.7592 8.20442 20.6953 8.30262 20.6697L14.796 18.9828C14.8943 18.9574 14.9986 18.9723 15.0859 19.0242C15.1733 19.0762 15.2367 19.1609 15.2621 19.2598L16.7527 25.0826C16.7779 25.1815 16.7631 25.2866 16.7116 25.3746C16.66 25.4626 16.5759 25.5264 16.4777 25.5521Z"
                  fill="#61E987"
                />
                <path
                  d="M19.4914 37.3255L12.998 39.0124C12.8997 39.0378 12.7954 39.0229 12.7081 38.971C12.6207 38.919 12.5573 38.8343 12.5319 38.7354L11.0413 32.9127C11.0161 32.8137 11.0309 32.7086 11.0824 32.6206C11.134 32.5326 11.2181 32.4688 11.3163 32.4432L17.8097 30.7563C17.908 30.7308 18.0122 30.7457 18.0996 30.7977C18.187 30.8496 18.2503 30.9343 18.2758 31.0333L19.7663 36.856C19.7916 36.955 19.7768 37.06 19.7252 37.148C19.6737 37.236 19.5896 37.2999 19.4914 37.3255Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M22.505 49.0989L16.0116 50.7858C15.9134 50.8112 15.8091 50.7963 15.7217 50.7444C15.6344 50.6925 15.571 50.6078 15.5456 50.5088L14.055 44.6861C14.0298 44.5871 14.0446 44.4821 14.0961 44.3941C14.1477 44.306 14.2318 44.2422 14.33 44.2166L20.8234 42.5297C20.9216 42.5043 21.0259 42.5192 21.1133 42.5711C21.2006 42.623 21.264 42.7078 21.2894 42.8067L22.78 48.6294C22.8052 48.7284 22.7904 48.8334 22.7389 48.9215C22.6873 49.0095 22.6032 49.0733 22.505 49.0989Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M65.187 11.5332H27.7158C26.4453 11.5346 25.2273 12.0437 24.3289 12.9487C23.4306 13.8537 22.9253 15.0807 22.9238 16.3606V60.6845C22.9253 61.9644 23.4306 63.1914 24.3289 64.0964C25.2273 65.0014 26.4453 65.5104 27.7158 65.5119H65.187C66.4575 65.5104 67.6755 65.0014 68.5739 64.0964C69.4722 63.1914 69.9776 61.9644 69.979 60.6845V16.3606C69.9776 15.0807 69.4722 13.8537 68.5739 12.9487C67.6755 12.0437 66.4575 11.5346 65.187 11.5332Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M65.1865 12.9229H27.7152C26.8105 12.9239 25.9431 13.2864 25.3033 13.9309C24.6636 14.5753 24.3038 15.4491 24.3027 16.3605V60.6845C24.3038 61.5959 24.6636 62.4697 25.3033 63.1142C25.9431 63.7586 26.8105 64.1211 27.7152 64.1222H65.1865C66.0912 64.1211 66.9586 63.7586 67.5983 63.1141C68.2381 62.4697 68.5979 61.5959 68.5989 60.6845V16.3605C68.5979 15.4491 68.2381 14.5753 67.5983 13.9309C66.9586 13.2864 66.0912 12.9239 65.1865 12.9229Z"
                  fill="#F4F7FA"
                />
                <path
                  d="M59.5467 37.2787H40.5977C40.4928 37.2788 40.389 37.2581 40.2921 37.2177C40.1951 37.1774 40.1071 37.1182 40.0329 37.0435C39.9587 36.9689 39.8998 36.8802 39.8597 36.7826C39.8195 36.685 39.7988 36.5804 39.7988 36.4748C39.7988 36.3691 39.8195 36.2645 39.8597 36.1669C39.8998 36.0694 39.9587 35.9807 40.0329 35.906C40.1071 35.8314 40.1951 35.7722 40.2921 35.7318C40.389 35.6915 40.4928 35.6708 40.5977 35.6709H59.5467C59.7582 35.6711 59.9609 35.7559 60.1104 35.9067C60.2598 36.0574 60.3438 36.2617 60.3438 36.4748C60.3438 36.6878 60.2598 36.8922 60.1104 37.0429C59.9609 37.1936 59.7582 37.2784 59.5467 37.2787Z"
                  fill="#06044B"
                />
                <path
                  d="M62.8384 39.9916H40.5977C40.4928 39.9917 40.389 39.971 40.2921 39.9306C40.1951 39.8903 40.1071 39.8311 40.0329 39.7564C39.9587 39.6818 39.8998 39.5931 39.8597 39.4955C39.8195 39.3979 39.7988 39.2933 39.7988 39.1877C39.7988 39.082 39.8195 38.9774 39.8597 38.8798C39.8998 38.7822 39.9587 38.6936 40.0329 38.6189C40.1071 38.5443 40.1951 38.4851 40.2921 38.4447C40.389 38.4044 40.4928 38.3837 40.5977 38.3838H62.8384C63.05 38.3838 63.253 38.4685 63.4026 38.6192C63.5523 38.77 63.6364 38.9745 63.6364 39.1877C63.6364 39.4009 63.5523 39.6053 63.4026 39.7561C63.253 39.9069 63.05 39.9916 62.8384 39.9916Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M59.5467 49.4379H40.5977C40.4928 49.438 40.389 49.4173 40.2921 49.3769C40.1951 49.3366 40.1071 49.2774 40.0329 49.2027C39.9587 49.1281 39.8998 49.0394 39.8597 48.9418C39.8195 48.8442 39.7988 48.7396 39.7988 48.634C39.7988 48.5283 39.8195 48.4237 39.8597 48.3261C39.8998 48.2285 39.9587 48.1399 40.0329 48.0652C40.1071 47.9906 40.1951 47.9314 40.2921 47.891C40.389 47.8507 40.4928 47.83 40.5977 47.8301H59.5467C59.7583 47.8301 59.9613 47.9148 60.1109 48.0655C60.2606 48.2163 60.3447 48.4208 60.3447 48.634C60.3447 48.8472 60.2606 49.0516 60.1109 49.2024C59.9613 49.3532 59.7583 49.4379 59.5467 49.4379Z"
                  fill="#06044B"
                />
                <path
                  d="M62.8384 52.1507H40.5977C40.4928 52.1509 40.389 52.1302 40.2921 52.0898C40.1951 52.0495 40.1071 51.9903 40.0329 51.9156C39.9587 51.8409 39.8998 51.7523 39.8597 51.6547C39.8195 51.5571 39.7988 51.4525 39.7988 51.3469C39.7988 51.2412 39.8195 51.1366 39.8597 51.039C39.8998 50.9414 39.9587 50.8528 40.0329 50.7781C40.1071 50.7034 40.1951 50.6443 40.2921 50.6039C40.389 50.5636 40.4928 50.5429 40.5977 50.543H62.8384C62.9433 50.5429 63.0471 50.5636 63.144 50.6039C63.241 50.6443 63.329 50.7034 63.4032 50.7781C63.4774 50.8528 63.5363 50.9414 63.5764 51.039C63.6166 51.1366 63.6373 51.2412 63.6373 51.3469C63.6373 51.4525 63.6166 51.5571 63.5764 51.6547C63.5363 51.7523 63.4774 51.8409 63.4032 51.9156C63.329 51.9903 63.241 52.0495 63.144 52.0898C63.0471 52.1302 62.9433 52.1509 62.8384 52.1507Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M36.3541 41.2236H29.6483C29.5468 41.2235 29.4496 41.1828 29.3778 41.1106C29.3061 41.0383 29.2657 40.9403 29.2656 40.8381V34.8249C29.2657 34.7227 29.3061 34.6247 29.3778 34.5525C29.4496 34.4802 29.5468 34.4396 29.6483 34.4395H36.3541C36.4556 34.4396 36.5528 34.4802 36.6246 34.5525C36.6963 34.6247 36.7366 34.7227 36.7368 34.8249V40.8381C36.7366 40.9403 36.6963 41.0383 36.6246 41.1106C36.5528 41.1828 36.4556 41.2235 36.3541 41.2236Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M36.3541 53.3818H29.6483C29.5468 53.3817 29.4496 53.3411 29.3778 53.2688C29.3061 53.1965 29.2657 53.0985 29.2656 52.9963V46.9831C29.2657 46.8809 29.3061 46.7829 29.3778 46.7107C29.4496 46.6384 29.5468 46.5978 29.6483 46.5977H36.3541C36.4556 46.5978 36.5528 46.6384 36.6246 46.7107C36.6963 46.7829 36.7366 46.8809 36.7368 46.9831V52.9963C36.7366 53.0985 36.6963 53.1965 36.6246 53.2688C36.5528 53.3411 36.4556 53.3817 36.3541 53.3818Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M59.5691 23.7435H45.5988C45.3871 23.7435 45.1842 23.6588 45.0345 23.5081C44.8849 23.3573 44.8008 23.1528 44.8008 22.9396C44.8008 22.7264 44.8849 22.522 45.0345 22.3712C45.1842 22.2204 45.3871 22.1357 45.5988 22.1357H59.5691C59.7807 22.1357 59.9837 22.2204 60.1333 22.3712C60.283 22.522 60.3671 22.7264 60.3671 22.9396C60.3671 23.1528 60.283 23.3573 60.1333 23.5081C59.9837 23.6588 59.7807 23.7435 59.5691 23.7435Z"
                  fill="#06044B"
                />
                <path
                  d="M62.8608 26.4564H45.5988C45.494 26.4564 45.3902 26.4356 45.2934 26.3952C45.1966 26.3548 45.1086 26.2956 45.0345 26.2209C44.9604 26.1463 44.9016 26.0577 44.8615 25.9601C44.8214 25.8626 44.8008 25.7581 44.8008 25.6525C44.8008 25.5469 44.8214 25.4424 44.8615 25.3449C44.9016 25.2474 44.9604 25.1587 45.0345 25.0841C45.1086 25.0094 45.1966 24.9502 45.2934 24.9098C45.3902 24.8694 45.494 24.8486 45.5988 24.8486H62.8608C63.0724 24.8486 63.2754 24.9333 63.425 25.0841C63.5747 25.2348 63.6588 25.4393 63.6588 25.6525C63.6588 25.8657 63.5747 26.0702 63.425 26.2209C63.2754 26.3717 63.0724 26.4564 62.8608 26.4564Z"
                  fill="#C9C9C9"
                />
                <path
                  d="M42.5062 29.7445H29.6268C29.5253 29.7443 29.4281 29.7037 29.3563 29.6314C29.2846 29.5592 29.2443 29.4612 29.2441 29.359V19.2331C29.2443 19.1309 29.2846 19.0329 29.3563 18.9607C29.4281 18.8884 29.5253 18.8478 29.6268 18.8477H42.5062C42.6076 18.8478 42.7049 18.8884 42.7766 18.9607C42.8484 19.0329 42.8887 19.1309 42.8888 19.2331V29.359C42.8887 29.4612 42.8484 29.5592 42.7766 29.6314C42.7049 29.7037 42.6076 29.7443 42.5062 29.7445Z"
                  fill="#61E987"
                />
              </g>
              <defs>
                <clipPath id="clip0_6247_50110">
                  <rect
                    width="70"
                    height="65"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p className="font-inter font-semibold text-gray-700 text-base leading-6">
              Total <span className="font-bold">{totalPages}</span> pages
            </p>
          </div>
          <button
            className="bg-[#0B1446] text-white text-[20px] font-light rounded-md px-5 py-2.5 hover:bg-[#0a103a] transition-colors"
            type="button"
            onClick={handleSubmit}
            aria-label="Select print store"
          >
            Select Print Store
          </button>
        </div>
      </div>
    </div>
  );
}