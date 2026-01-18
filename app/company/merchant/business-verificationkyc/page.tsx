"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function BusinessVerificationPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/kyc-bg.png')" }}
    >
      {/* Main Card */}
      <div className="w-[700px] bg-white rounded-2xl shadow-xl p-6 h-[800px] flex flex-col mt-6 mb-6">
        {/* Header */}
        <h2 className="text-[25px] font-semibold text-gray-900">
          Business Verification (KYC)
        </h2>
        <p className="text-sm text-gray-800 mt-1">
          Upload the required documents for verification. Current progress: 0 of
          3 document types potentially uploaded.
        </p>

        {/* 🔽 SCROLLABLE CONTENT */}
        <div className="mt-4 flex-1 overflow-y-auto pr-2">
          {/* GSTIN */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              GSTIN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="15-digit GSTIN"
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          {/* Upload Sections */}
          <div className="mt-6 space-y-4">
            <UploadBox
              title="Shop License"
              description="Upload your shop license or business registration certificate"
            />
            <UploadBox
              title="Aadhar Card"
              description="Upload your Aadhaar card for identity verification"
              required
            />
            <UploadBox
              title="PAN Card"
              description="Upload your PAN card"
              required
            />
          </div>
        </div>

        {/* Save Button (FIXED) */}
        <button className="mt-4 self-end rounded-full bg-green-500 px-8 py-2 text-sm font-semibold text-black hover:bg-green-600">
          Save & Continue
        </button>
      </div>
    </main>
  );
}

/* Upload Box */
function UploadBox({
  title,
  description,
  required = false,
}: {
  title: string;
  description?: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {title} {required && <span className="text-red-500">*</span>}
          </p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>

        {file && (
          <span className="text-xs bg-blue-200 text-blue-700 px-3 py-1 rounded-full">
            Uploaded
          </span>
        )}
      </div>

      {/* Upload / Preview */}
      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) {
              setFile(e.dataTransfer.files[0]);
            }
          }}
          className="mt-3 cursor-pointer bg-white border border-dashed border-gray-300 rounded-lg px-4 py-6 text-center"
        >
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) =>
              e.target.files && setFile(e.target.files[0])
            }
          />

          <svg
            className="mx-auto mb-2 h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />
          </svg>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, JPG and PNG (Max 2MB)
          </p>
        </div>
      ) : (
        <div className="mt-3 bg-blue-50 border border-dashed border-blue-300 rounded-lg p-4 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
              📄
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>

          <button onClick={() => setFile(null)}>
            <Image
              src="/dustbinicon.png"
              alt="Delete file"
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
    </div>
  );
}
