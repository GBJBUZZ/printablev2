import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen text-black bg-[#E6E6ED]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#E6E6ED] shadow fixed top-0 w-full z-10 h-16">
        <h1 className="text-xlfont-semibold">Generate Questions</h1>
        <button className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-700">
          ⬇ Download
        </button>
      </div>

      {/* Main Content */}
      <div className="flex px-4">
        {/* Left Side (Images) */}
        <div className="flex flex-col gap-6 w-full mt-20 lg:w-[calc(100%-480px)] pr-6 p-6">
          <div className="bg-gray-100 rounded shadow mx-auto">
            <Image
              src="/ppt-to-pdf-2.png"
              alt="Letter 1"
              width={250}
              height={250}
            />
          </div>

          <div className="bg-gray-100 rounded shadow mx-auto">
          <Image
              src="/ppt-to-pdf-2.png"
              alt="Letter 1"
              width={250}
              height={250}
            />
          </div>

          <div className="bg-gray-100 rounded shadow mx-auto">
          <Image
              src="/ppt-to-pdf-2.png"
              alt="Letter 1"
              width={250}
              height={250}
            />
          </div>
        </div>

        {/* Right Side Fixed Panel */}
       
    <div className="h-[500px] w-[600px] bg-gray-100 flex mt-20 flex-col justify-between rounded shadow-md overflow-hidden">
      <div className="p-4 space-y-4 overflow-y-auto">
        {/* Message 1 */}
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white  font-bold">P</span>
          </div>
          <div className="bg-white shadow-md rounded-lg px-4 py-2 max-w-md">
            Generate Multiple-choice questions.
          </div>
        </div>

        {/* Message 2 - Thinking */}
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
  <div className="bg-white shadow-md rounded-lg px-4 py-2 max-w-md flex items-center space-x-2">
  <span>Overthinking...</span>
  <div className="w-6 h-6 border-4 border-solid border-gray-400 rounded-full"></div>
</div>
      

        </div>
      </div>

      {/* Bottom input bar */}
      
      <div className="flex m-3 justify-center rounded-lg items-center bg-gray-200">
      <div className="flex items-center h-10 w-full max-w-4xl px-4 border border-gray-400  rounded-lg bg-gray-200">
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