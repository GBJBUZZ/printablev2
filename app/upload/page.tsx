'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UploadPage() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('name') || 'document.pdf';
  const fileSize = searchParams.get('size') || '0 MB';
  const [progress, setProgress] = useState(0);
  const [convertingProgress, setConvertingProgress] = useState(0);
  const [showResultImages, setShowResultImages] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [showConvertingProgress, setShowConvertingProgress] = useState(false);
  const [showWordImage, setShowWordImage] = useState(false);

  const docxFileName = `${fileName.split('.')[0]}.docx`;

  useEffect(() => {
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setShowResultImages(true);
          setShowProgressBar(false);
          setShowConvertingProgress(true);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    return () => clearInterval(uploadInterval);
  }, []);

  useEffect(() => {
    if (showConvertingProgress) {
      const convertInterval = setInterval(() => {
        setConvertingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(convertInterval);
            setShowWordImage(true);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }
  }, [showConvertingProgress]);

  return (
    <div className="relative w-full min-h-screen bg-[#e8e8ec] flex flex-col items-center">
      {/* Top White Bar (Flush to edges) */}
      <div className="w-full bg-white h-10 shadow-md flex items-center justify-start mb-6 px-4">
        <p className="text-sm font-semibold text-black">PDF ↔ Word</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Main Center Content */}
        <div className="flex-1 flex flex-col items-center w-full">
          {!showResultImages && (
            <>
              <img
                src="/pdfformat.png"
                alt="PDF"
                className="w-48 h-60 object-contain mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">
                {fileName} ({fileSize})
              </p>
              <p className="text-xl font-medium text-gray-800 mb-4">
                Uploading....
              </p>
            </>
          )}

          {showProgressBar && (
            <div className="w-64 h-3 bg-white rounded-full shadow-inner overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #06044B, #61E987)',
                }}
              />
            </div>
          )}

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
                  src="/Worddoc.png"
                  alt="Word Document"
                  className="w-40 h-52 object-contain"
                />
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {fileName} ({fileSize})
              </p>

              {/* Converting Progress Below Images */}
              {showConvertingProgress && (
                <>
                  <p className="text-xl font-medium text-gray-800 mb-2">
                    Converting to Word...
                  </p>
                  <div className="w-64 h-3 bg-white rounded-full shadow-inner overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${convertingProgress}%`,
                        background: 'linear-gradient(to right, #06044B, #61E987)',
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {showWordImage && (
            <>
              <img
                src="/Worddoc.png"
                alt="Word Document"
                className="w-80 h-96 object-contain mt-6"
              />
              <p className="text-sm text-gray-600 mb-2 mt-4">
                {docxFileName} ({fileSize})
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right-Side Panel - Fully Flush */}
      {showWordImage && (
        <div
          className="lg:absolute top-10 right-0 bottom-0 w-full lg:w-[320px] px-4 py-6 shadow-lg rounded-none"
          style={{ background: 'linear-gradient(to bottom, #DFFBE7, #CDCDDB)' }}
        >
          <p className="text-lg font-medium mb-4">{docxFileName}</p>

          <button className="w-full bg-[#1e1c4e] text-white py-2 rounded-md mb-2 hover:opacity-90">
            ⬇️ DOWNLOAD
          </button>

          <p className="text-center text-sm mb-2">or</p>

          <button className="w-full bg-[#1e1c4e] text-white py-2 rounded-md mb-3 hover:opacity-90">
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
    </div>
  );
}