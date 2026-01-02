"use client";
import axios from "axios";

import { PlusCircle, Scissors, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SplitPDFPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State hooks
  const [pageRange, setPageRange] = useState<string>(""); // Page range input
  const [error, setError] = useState<string | null>(null); // Error state
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Selected file state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [click, setClick] = useState(false); // Track button click status

  // Handle page range input change
  const handlePageRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageRange(e.target.value);
  };

  // UseEffect to directly retrieve selected file from localStorage
  useEffect(() => {
    const storedPDF = localStorage.getItem("selectedPDF");
    const fileName = localStorage.getItem("pdfFileName");

    if (storedPDF && fileName) {
      const file = convertBase64ToFile(storedPDF, fileName);
      setSelectedFile(file);
      localStorage.removeItem("selectedPDF");
      localStorage.removeItem("pdfFileName");
    }
  }, []); // Empty dependency array means it runs only once after initial render

  // Convert base64 string to a File object
  const convertBase64ToFile = (base64: string, fileName: string) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeType = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: mimeType });
  };

  // Handle Split Button click (make the API request)
  const handleClick = async () => {
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    const validPageRange =
      /^[\d,-]+$/.test(pageRange.trim()) ||
      pageRange.trim().toLowerCase() === "all";

    if (!validPageRange) {
      setError("Please enter a valid page range (e.g., '1-5,7,10' or 'all').");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fileInput", selectedFile); // Attach file
      formData.append("pageNumbers", pageRange.trim()); // Attach page range or other data

      const response = await axios.post("/api/split", formData, {
        responseType: "blob", // Important to receive file as Blob
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 🔍 Extract filename from Content-Disposition header
      const disposition = response.headers["content-disposition"];
      let filename = "download.zip"; // default filename

      if (disposition) {
        const match = disposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i
        );
        if (match && match[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      // 📦 Create a Blob URL and trigger file download
      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Cleanup
    } catch (err: any) {
      console.error("ZIP download failed:", err.message);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
      router.push("/Organize-Split-PDF/separate-pdf-dpe");
    }
  };

  return (
    <>
      <h1 className="font-bold text-black text-lg bg-[#FFFFFF] shadow-sm border-b border-gray-300">
        Split PDF
      </h1>
      <div className="flex h-screen w-full bg-[#e6e6ee]">
        {/* Left Section */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-start">
            {[1, 2].map((page, index) => (
              <div key={page} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={
                      page === 1
                        ? "/1c0c74195b8f0456799db0c7fff2b50e40390120.png"
                        : "/25fffcd4a257bc280b12a8371b20e0f11de61fc6.png"
                    }
                    alt={`PDF Page ${page}`}
                    className="w-40 h-56 object-cover rounded-md shadow"
                  />
                  <p className="text-sm mt-2">
                    {selectedFile ? selectedFile.name : "No file selected"}{" "}
                    <span className="text-gray-500">(5.1MB)</span>
                  </p>
                </div>
                {index < 2 && (
                  <div className="relative h-56 mb-6 flex items-center">
                    <div className="absolute left-1/2 h-full border-l-2 border-dashed border-[#006ADE4D]"></div>
                    <div className="relative z-10 rounded-full bg-blue-100">
                      <Scissors className="text-white bg-[#006ADE4D] w-8 h-8 p-1 -rotate-90 rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add PDF Card */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 p-4 w-40 h-56 text-center rounded-md hover:bg-blue-50 cursor-pointer ml-4">
              <PlusCircle className="text-blue-400 w-6 h-6 mb-2" />
              <p className="text-sm text-gray-600">
                Add <span className="text-blue-600">PDF</span>,{" "}
                <span className="text-blue-600">Word</span>,<br />
                <span className="text-blue-600">Image</span>,{" "}
                <span className="text-blue-600">Excel</span>
                <br />
                and <span className="text-blue-600">PowerPoint</span> Files
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gradient-to-b from-green-100 to-gray-100 p-6 flex flex-col justify-between w-[350px]">
          <div>
            <h2 className="text-lg font-semibold mb-4">Split PDF</h2>

            {/* Page Range Input */}
            <div className="mb-4">
              <label
                htmlFor="pageRange"
                className="block text-sm font-semibold"
              >
                Enter Page Range (e.g., '1-5' or 'all')
              </label>
              <input
                type="text"
                id="pageRange"
                value={pageRange}
                onChange={handlePageRangeChange}
                className="w-full p-2 border border-gray-300 rounded mt-2 bg-white"
                placeholder="e.g., '1-5,7,10' or 'all'"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Split Button */}
          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 bg-white border border-[#06044B] text-[#06044B] px-4 py-2 rounded transition-all duration-200 hover:bg-[#06044B] hover:text-green-500 cursor-pointer shadow-sm hover:shadow-lg"
          >
            {loading ? "Processing..." : "Split (3 PDFs)"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
