'use client';
import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen mt-10 bg-[#E6E6ED]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#E6E6ED] shadow fixed top-0 w-full z-10 h-16">
        <h1 className="text-xl font-semibold">Generate Questions</h1>
        <button className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-700">
          ⬇ Download
        </button>
      </div>

      {/* Main Content */}
      <div className="flex px-4 mb-16 mt-20">
        {/* Left Side (Images) */}
        <div className="flex flex-col gap-6 w-full lg:w-[calc(100%-480px)] pr-6 p-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded shadow mx-auto">
              <Image
                src="/ppt-to-pdf-2.png"
                alt={`Letter ${i}`}
                width={250}
                height={250}
              />
            </div>
          ))}
        </div>

        {/* Right Side Panel */}
        <div className="mt-5 rounded-lg bg-white shadow-lg w-full max-w-2xl p-6">

        <div className="mt-5 rounded-lg bg-white shadow-lg w-full max-w-2xl p-6 flex flex-col justify-between h-[700px]">
          {/* Scrollable content */}
          <div className="overflow-y-auto pr-2">
            <h2 className="text-lg font-bold mb-4">Multiple-choice questions</h2>

            {[1, 2].map((num) => (
              <div key={num} className="mb-6">
                <p className="mb-2">
                  {num}. What hobby did Ellis recently pick up?
                </p>
                <ul className="space-y-1 mb-3">
                  <li>A) Cooking</li>
                  <li>B) Gardening</li>
                  <li>C) Painting</li>
                  <li>D) Reading</li>
                </ul>
                <button className="bg-[#2C2B84] text-white text-sm px-3 py-1 rounded-full">
                  Show Answer
                </button>
              </div>
            ))}

            <div className="flex items-center gap-2 text-gray-700 mt-4">
              <span className="text-yellow-400 text-xl">✨</span>
              <span className="font-medium">Further Actions:</span>
              <span className="ml-auto text-gray-500">&#x25BC;</span>
            </div>
          </div>
          </div>

          {/* Bottom input bar */}
          <div className="mt-4">
            <div className="flex items-center h-10 w-full px-4 border border-gray-400 rounded-lg bg-gray-200">
              <input
                type="text"
                placeholder="Stuck? Just ask me anything about your PDF!"
                className="flex-grow bg-gray-200 text-sm text-gray-500 placeholder-gray-500 outline-none"
              />
              <button className="text-blue-500 hover:text-blue-600">
                <Send size={16} />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
