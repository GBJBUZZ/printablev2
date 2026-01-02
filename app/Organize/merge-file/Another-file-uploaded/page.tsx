'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <>
    <h1 className="font-bold text-black text-lg bg-[#FFFFFF] shadow-sm border-b border-gray-300">
        Marge PDF
      </h1>
    <div className="flex w-full min-h-screen bg-[#EAEAEE] justify-center">
      {/* Left side with files and upload */}
      <div className="flex-1 max-w-6xl p-6">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Static File 1 */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/Letter.png"
              alt="PDF Preview 1"
              width={150}
              height={200}
              className="rounded shadow"
            />
            <p className="text-sm text-gray-600 text-center">
              personal–letter–template.pdf (5.1 MB)
            </p>
          </div>

          {/* Plus icon */}
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-black">
            <Plus className="w-4 h-4" />
          </div>

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

      {/* Right fixed panel */}
      <div className="w-96 bg-gradient-to-b from-green-100 to-white p-8 flex flex-col justify-between border-l">
        <div>
          <h2 className="text-lg font-semibold mb-4">Merge PDF</h2>
        </div>
         <button
      onClick={() => router.push('/Orgnaize/merge-file/Creating-document-merging')}
      className="mt-auto w-full border border-blue-900 text-blue-900 rounded-lg px-4 py-2 flex justify-center items-center transition hover:bg-blue-900 hover:text-green-500"
    >
      <span className="flex items-center gap-2">
        Merge PDF <ArrowRight className="w-6 h-4" />
      </span>
    </button>
      </div>
    </div>
    </>
  );
}
