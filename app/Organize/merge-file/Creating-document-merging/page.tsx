'use client';

import { useEffect, useState } from 'react';

export default function MergeProgressPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="font-bold text-black text-lg bg-white shadow-sm border-b border-gray-300 px-4 py-2">
        Merge PDF
      </h1>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6">
          <img src="/pdfformat.png" alt="PDF Icon" className="w-28 h-36 mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            personal-scanned-letter-template.pdf (5.1 MB)
          </p>
        </div>

        <h2 className="font-semibold text-gray-700 mb-4">
          {progress < 100 ? 'Creating Document…' : 'Document Created ✅'}
        </h2>

        <div className="w-64 h-2 bg-white rounded-full border border-gray-300 overflow-hidden shadow-sm">
          <div
            className="h-full transition-all duration-100 ease-linear rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #0C0C79, #22C55E)',
            }}
          />
        </div>
      </div>
    </>
  );
}
