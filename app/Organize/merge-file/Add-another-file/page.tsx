'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#EAEAEE] justify-center">
      {/* Left side with files and upload */}
      <div className="flex-1 max-w-6xl p-6">
        <div className="flex flex-wrap gap-4 items-center justify-center">

          {/* Static File 2 */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/Letter.png"
              alt="PDF Preview 2"
              width={150}
              height={200}
              className="rounded shadow"
            />
            <p className="text-sm text-gray-600 text-center">
              personal–letter–template.pdf (5.1 MB)
            </p>
          </div>

          {files.map((file, idx) => (
            <>
              {/* Plus icon between files */}
              <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-black">
                <Plus className="w-4 h-4" />
              </div>

              {/* Uploaded File */}
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-40 h-56 border shadow bg-white flex items-center justify-center text-xs text-center">
                  <span className="px-2">{file.name}</span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {file.name} ({(file.size / 1e6).toFixed(1)} MB)
                </p>
              </div>
            </>
          ))}

          {/* Plus icon before upload box */}
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-black">
            <Plus className="w-4 h-4" />
          </div>

          {/* Upload Box */}
          <label className="w-40 h-56 border-2 border-dashed border-blue-400 text-center flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-50">
            <div>
              <Plus className="mx-auto mb-1" />
              <p className="text-xs leading-4">
                Add PDF, Word,<br /> Image, Excel<br /> and PowerPoint<br /> Files
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.ppt,.pptx"
              />
            </div>
          </label>
        </div>
      </div>

     
    </div>
  );
}
