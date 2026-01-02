"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState  , Suspense} from "react";
import { useFileContext } from "../pdfcompress/FileContext";

export default function UploadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileNameParam = searchParams.get("name") || "document.pdf";
  const fileSizeParam = searchParams.get("size") || "0 MB";

  // Retrieve the actual file from context.
  const { file, setFile } = useFileContext();

  const [progress, setProgress] = useState(0);
  // New state to mark when the upload animation is complete.
  const [uploadComplete, setUploadComplete] = useState(false);
  const [convertingProgress, setConvertingProgress] = useState(0);
  const [showResultImages, setShowResultImages] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [showConvertingProgress, setShowConvertingProgress] = useState(false);
  const [showWordImage, setShowWordImage] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [selectedCompression, setSelectedCompression] = useState("");
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const docxFileName = `${fileNameParam.split(".")[0]}.docx`;

  useEffect(() => {
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setShowProgressBar(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    return () => clearInterval(uploadInterval);
  }, []);

  // This function handles calling the compression API and triggers the download.
  const handleCompression = async () => {
    if (!file) {
      alert("No file available. Please go back and upload again.");
      return;
    }

    console.log("Starting compression for file:", file);

    try {
      // Update UI states to show compression progress components.
      setShowResultImages(true);
      setShowConvertingProgress(true);
      setShowRightPanel(false);

      // Create form data and include the compression level.
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "optimizeLevel",
        selectedCompression === "extreme"
          ? "7"
          : selectedCompression === "recommended"
          ? "5"
          : "3"
      );

      // Start compression progress animation.
      const progressInterval = setInterval(() => {
        setConvertingProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // Make the API request.
      const response = await fetch("/api/pdfcompress", {
        method: "POST",
        body: formData,
      });
      console.log("API response status:", response.status);

      if (!response.ok) {
        clearInterval(progressInterval);
        throw new Error(await response.text());
      }

      const blob = await response.blob();
      console.log("Received blob size:", blob.size);

      if (!blob.size) {
        throw new Error("Received empty file from server");
      }

      setCompressedBlob(blob);
      setPreviewUrl(window.URL.createObjectURL(blob)); // <-- Add this line

      // Complete the compression progress bar.
      clearInterval(progressInterval);
      setConvertingProgress(100);
      setShowWordImage(true);

      // Instead, store the blob:
      setCompressedBlob(blob);

      // Reset file context as the process is finished.
      setFile(null);
    } catch (err) {
      console.error("Compression error:", err);
      alert(err instanceof Error ? err.message : "Failed to compress PDF");
      setConvertingProgress(0);
      setShowConvertingProgress(false);
      setShowResultImages(false);
      setShowProgressBar(true);
      setShowRightPanel(true);
    }
  };

  // This handler is triggered by the "Compress PDF" button.
  const handleCompressClick = () => {
    if (selectedCompression) {
      handleCompression();
    } else {
      alert("Please select a compression level first");
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const downloadUrl = window.URL.createObjectURL(compressedBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = `compressed-${fileNameParam}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(() => {
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadUrl);
    }, 100);
  };

  return (
    <div className="relative w-full  h-screen overflow-hidden  bg-[#e8e8ec] flex flex-col items-center">
      {/* Top White Bar */}
      <div className="w-full bg-white h-10 shadow-md flex items-center justify-start mb-6 px-4">
        <p className="text-sm font-semibold text-black">Compress PDF</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Main Center Content */}
        <div className="flex-1 flex flex-col items-center w-full">
          {/* If compression hasn't been triggered, show upload UI */}
          {!showResultImages && (
            <>
              <img
                src="/pdfformat.png"
                alt="PDF"
                className="w-48 h-60 object-contain mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">
                {fileNameParam} ({fileSizeParam})
              </p>
              {/* Display either 'Uploading…' or 'Upload Complete' based on the uploadComplete state */}
              <p className="text-xl font-medium text-gray-800 mb-4">
                {uploadComplete ? "Upload Complete" : "Uploading..."}
              </p>
            </>
          )}

          {showProgressBar && (
            <div className="w-64 h-3 bg-white rounded-full shadow-inner overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #06044B, #61E987)",
                }}
              />
            </div>
          )}

          {/* When compression begins, display the preview and converting progress */}
          {showResultImages && !showWordImage && (
            <>
              <div className="flex items-center justify-center mb-4 w-full">
                <img
                  src="/priview.png"
                  alt="Preview"
                  className="w-40 h-52 object-contain"
                />
                <div className="w-9 h-9 rounded-full bg-[#2B3F6C] flex items-center justify-center mx-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <img
                  src="/pdfformat.png"
                  alt="PDF"
                  className="w-40 h-52 object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {fileNameParam} ({fileSizeParam})
              </p>
              {showConvertingProgress && (
                <>
                  <p className="text-xl font-medium text-gray-800 mb-2">
                    Compressing PDF
                  </p>
                  <div className="w-64 h-3 bg-white rounded-full shadow-inner overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${convertingProgress}%`,
                        background:
                          "linear-gradient(to right, #06044B, #61E987)",
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showWordImage && (
        <>
          {!previewUrl && (
            <>
              <img
                src="/pdfformat.png"
                alt="PDF"
                className="w-80 h-96 object-contain mt-6"
              />
              <p className="text-sm text-gray-600 mb-2 mt-4">
                {docxFileName} ({fileSizeParam})
              </p>
              <p className="text-xl font-semibold text-black mb-4 text-center">
                PDFs have been compressed!
              </p>
            </>
          )}
        </>
      )}
      {/* Compression Options Panel – Only visible after upload is complete */}
      {showRightPanel && uploadComplete && (
        <div
          className="lg:absolute top-10 right-0 bottom-0 w-full lg:w-[320px] px-4 py-6 shadow-lg rounded-none flex flex-col"
          style={{
            background: "linear-gradient(to bottom, #DFFBE7, #CDCDDB)",
          }}
        >
          <p className="text-lg font-semibold mb-4 text-center">
            Select Compression
          </p>

          {/* Option Boxes */}
          <div className="space-y-3 mb-4 w-full flex flex-col items-center mt-24">
            {["extreme", "recommended", "less"].map((type) => (
              <div key={type} className="w-full bg-white p-4 rounded-md shadow">
                <label className="block">
                  <input
                    type="radio"
                    name="compression"
                    value={type}
                    checked={selectedCompression === type}
                    onChange={(e) => setSelectedCompression(e.target.value)}
                  />
                  <span className="ml-2 font-medium capitalize">
                    {type} Compression
                  </span>
                  <p className="text-sm text-gray-500 ml-6">
                    {type === "extreme"
                      ? "Less quality, high compression"
                      : type === "recommended"
                      ? "Good quality, good compression"
                      : "High quality, less compression"}
                  </p>
                </label>
              </div>
            ))}
          </div>

          {/* Compress Button – triggers the API call */}
          <div className="mt-auto">
            <button
              className={`w-full border border-[#06044B] text-[#06044B] py-2 rounded-md transition duration-200 hover:bg-[#06044B] hover:text-white ${
                !selectedCompression ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedCompression}
              onClick={handleCompressClick}
            >
              Compress PDF ➔
            </button>
          </div>
        </div>
      )}

      {/* Final Export Panel */}
      {showWordImage && (
        <div
          className="lg:absolute top-10 right-0 bottom-0 w-full lg:w-[320px] px-4 py-6 shadow-lg rounded-none"
          style={{
            background: "linear-gradient(to bottom, #DFFBE7, #CDCDDB)",
          }}
        >
          <p className="text-lg font-medium mb-4">{docxFileName}</p>
          <button
            className="w-full bg-[#06044B] text-white py-2 rounded-md mb-2 hover:opacity-90"
            onClick={handleDownload}
            disabled={!compressedBlob}
          >
            ⬇️ DOWNLOAD
          </button>
          <p className="text-center text-sm mb-2">or</p>
          <button className="w-full bg-[#06044B] text-white py-2 rounded-md mb-3 hover:opacity-90">
            🖨️ Print
          </button>
          <button className="w-full border border-[#06044B] py-2 rounded-md mb-3 hover:bg-[#06044B] hover:text-white transition">
            ⬆️ Export As
          </button>
          <div className="flex justify-between">
            <button className="w-[48%] border border-[#06044B] py-2 rounded-md hover:bg-[#06044B] hover:text-white transition">
              🔗 Share
            </button>
            <button className="w-[48%] border border-[#06044B] py-2 rounded-md hover:bg-[#06044B] hover:text-white transition">
              🗑️ Delete
            </button>
          </div>
        </div>
      )}

      {showWordImage && previewUrl && (
        <div className="w-full flex flex-col items-center">
          <iframe
            src={previewUrl}
            title="Compressed PDF Preview"
            className="w-[120vw] max-w-2xl h-[85vh] mb-4" // Removed 'border' and 'rounded' classes
          />
        </div>
      )}
    </div>
   
  );
}
