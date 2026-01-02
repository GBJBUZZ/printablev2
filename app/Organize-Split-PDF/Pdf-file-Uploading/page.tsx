"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [progress, setProgress] = useState(0); // Start from 0%
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    // Read file name from session storage
    const storedName = sessionStorage.getItem("selectedFileName");
    if (storedName) {
      setFileName(storedName);
    }

    // Start progress
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        return Math.min(prev+5 , 100);
      });
    }, 300);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      router.push("/Organize-Split-PDF/separate-page-pdf");
    }
  }, [router, progress]);

  return (
    <div>
      <h1 className="ml-4 mt-2 font-bold text-black text-lg">Split PDF</h1>
      <div className="flex items-center justify-center h-screen bg-[#e6e6ee]">
        <div className="flex flex-col items-center gap-6 -mt-12">
          {/* Icon */}
          <button className="cursor-pointer">
            <Image src="/pdfformat.png" alt="DOC" width={220} height={260} />
          </button>

          {/* File name */}
          <p className="text-sm text-gray-600">
            Personal-Account-Matter-letter-upload.doc (1.1 MB)
          </p>

          {/* Uploading Text */}
          <p className="text-xl font-semibold text-black">
            Uploading{".".repeat(progress % 3)}
          </p>

          {/* Progress Bar */}
          <div className="w-[400px] h-4 bg-white rounded-full shadow-inner overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1f2b59] to-[#60d394] transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
